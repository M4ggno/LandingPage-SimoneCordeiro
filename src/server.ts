import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/* ------------------------------------------------------------------ */
/*  Segurança: headers via Helmet                                      */
/* ------------------------------------------------------------------ */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", 'https://www.google.com', 'https://maps.google.com'],
        frameSrc: ["'self'", 'https://www.google.com', 'https://maps.google.com'],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'sameorigin' },
    hidePoweredBy: true,
    hsts: { maxAge: 63_072_000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true,
  }),
);

/* ------------------------------------------------------------------ */
/*  Compressão gzip                                                    */
/* ------------------------------------------------------------------ */
app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) return false;
      return compression.filter(req, res);
    },
  }),
);

/* ------------------------------------------------------------------ */
/*  Detecção de ataque: monitora requisições suspeitas                 */
/* ------------------------------------------------------------------ */
interface ClientData {
  requests: number[];
  blocked: boolean;
  blockUntil: number;
  suspiciousScore: number;
}

const clients = new Map<string, ClientData>();

const SUSPICIOUS_PATHS = [
  '.well-known',
  'wp-admin',
  'wp-login',
  'wp-content',
  'wp-includes',
  'xmlrpc.php',
  'administrator',
  'phpmyadmin',
  'server-status',
  'server-info',
  '.env',
  '.git',
  '.svn',
  'config.json',
  'package.json',
  'package-lock.json',
  'yarn.lock',
  'composer.json',
  '.htaccess',
  '.htpasswd',
  'web.config',
  'crossdomain.xml',
  'clientaccesspolicy.xml',
  'sitemap.xml',
  'robots.txt',
  'favicon.ico',
];

const SUSPICIOUS_PATTERNS = [
  /(\.\.\/|%2e%2e%2f|%2e%2e\/|\.\.%2f)/i, // path traversal
  /(<script|javascript:|on\w+\s*=)/i, // XSS básico
  /(union\s+select|insert\s+into|delete\s+from|drop\s+table)/i, // SQL injection
  /(eval\s*\(|expression\s*\(|url\s*\()/i, // CSS injection
  /(\/etc\/passwd|\/proc\/self|\/windows\/win\.ini)/i, // file inclusion
];

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded) && forwarded.length > 0) return forwarded[0];
  return req.ip ?? req.socket.remoteAddress ?? 'unknown';
}

function isSuspiciousRequest(req: Request): { suspicious: boolean; reason: string } {
  const path = req.path.toLowerCase();
  const query = JSON.stringify(req.query).toLowerCase();
  const userAgent = (req.headers['user-agent'] ?? '').toLowerCase();

  for (const suspiciousPath of SUSPICIOUS_PATHS) {
    if (path.includes(suspiciousPath)) {
      return { suspicious: true, reason: `blocked_path: ${suspiciousPath}` };
    }
  }

  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(path) || pattern.test(query)) {
      return { suspicious: true, reason: `pattern_match: ${pattern.toString()}` };
    }
  }

  const emptyUa = userAgent === '' || userAgent === '-';
  const botUa = /(sqlmap|nikto|nmap|masscan|dirbuster|gobuster|wfuzz|burp|zgrab)/i.test(userAgent);
  if (emptyUa || botUa) {
    return { suspicious: true, reason: `bad_user_agent: ${userAgent || 'empty'}` };
  }

  return { suspicious: false, reason: '' };
}

function recordRequest(ip: string): ClientData {
  const now = Date.now();
  const windowStart = now - 60_000;

  let data = clients.get(ip);
  if (!data) {
    data = { requests: [], blocked: false, blockUntil: 0, suspiciousScore: 0 };
    clients.set(ip, data);
  }

  data.requests = data.requests.filter((t) => t > windowStart);
  data.requests.push(now);

  if (data.requests.length > 300 && !data.blocked) {
    data.blocked = true;
    data.blockUntil = now + 300_000;
    data.suspiciousScore += 50;
  }

  if (data.suspiciousScore >= 100 && !data.blocked) {
    data.blocked = true;
    data.blockUntil = now + 600_000;
  }

  return data;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of clients) {
    if (data.blockUntil < now && data.requests.length === 0) {
      clients.delete(ip);
    } else if (data.blockUntil < now) {
      data.blocked = false;
      data.blockUntil = 0;
      data.suspiciousScore = Math.max(0, data.suspiciousScore - 10);
    }
  }
}, 60_000).unref();

/* ------------------------------------------------------------------ */
/*  Attack Mode: ativação automática sob ataque detectado             */
/* ------------------------------------------------------------------ */
let attackMode = false;
let attackModeUntil = 0;

function activateAttackMode(durationMs: number): void {
  if (!attackMode) {
    console.warn(`[SECURITY] Attack mode ativado por ${durationMs / 1000}s`);
  }
  attackMode = true;
  attackModeUntil = Date.now() + durationMs;
}

function isAttackMode(): boolean {
  if (attackMode && Date.now() > attackModeUntil) {
    attackMode = false;
    attackModeUntil = 0;
    console.warn('[SECURITY] Attack mode desativado');
  }
  return attackMode;
}

let recentRequests: number[] = [];
let requestRate = 0;

setInterval(() => {
  const now = Date.now();
  recentRequests = recentRequests.filter((t) => t > now - 10_000);
  requestRate = recentRequests.length;
}, 10_000).unref();

function checkDDoS(): boolean {
  if (requestRate > 500) {
    activateAttackMode(60_000);
    return true;
  }

  const now = Date.now();
  recentRequests = recentRequests.filter((t) => t > now - 10_000);
  recentRequests.push(now);

  if (recentRequests.length > 500) {
    activateAttackMode(60_000);
    return true;
  }

  return false;
}

/* ------------------------------------------------------------------ */
/*  Middleware de segurança geral                                      */
/* ------------------------------------------------------------------ */
app.use((req: Request, res: Response, next: NextFunction) => {
  const ip = getClientIp(req);

  const clientData = recordRequest(ip);
  if (clientData.blocked) {
    res.status(429).json({
      error: 'Too Many Requests',
      message: 'Você foi temporariamente bloqueado por atividade suspeita.',
      retryAfter: Math.ceil((clientData.blockUntil - Date.now()) / 1000),
    });
    return;
  }

  if (checkDDoS()) {
    res.status(503).json({
      error: 'Service Unavailable',
      message: 'Sobrecarga temporária. Tente novamente em instantes.',
      retryAfter: 30,
    });
    return;
  }

  const { suspicious, reason } = isSuspiciousRequest(req);
  if (suspicious) {
    clientData.suspiciousScore += 20;
    console.warn(`[SECURITY] Request suspeito de ${ip}: ${reason}`);

    if (clientData.suspiciousScore >= 60) {
      activateAttackMode(30_000);
    }

    if (clientData.suspiciousScore >= 100) {
      clientData.blocked = true;
      clientData.blockUntil = Date.now() + 600_000;
    }

    res.status(403).json({ error: 'Forbidden', message: 'Requisição bloqueada por segurança.' });
    return;
  }

  if (isAttackMode()) {
    const staticPaths = ['/favicon.ico', '/icons/', '/photos/'];
    const isStatic = staticPaths.some((p) => req.path.startsWith(p));

    if (!isStatic && req.path !== '/' && !req.path.match(/\.(js|css|woff2?|webp|png|jpg|jpeg|svg|ico)$/)) {
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Sistema temporariamente indisponível sob carga elevada.',
        retryAfter: 30,
      });
      return;
    }
  }

  next();
});

/* ------------------------------------------------------------------ */
/*  Rate limiting                                                      */
/* ------------------------------------------------------------------ */
const generalLimiter = rateLimit({
  windowMs: 60_000,
  limit: 120,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'Too Many Requests',
    message: 'Muitas requisições. Aguarde um momento e tente novamente.',
  },
  keyGenerator: (req: Request) => getClientIp(req),
  skip: (req: Request) => {
    const staticPaths = ['/favicon.ico', '/icons/', '/photos/'];
    return staticPaths.some((p) => req.path.startsWith(p));
  },
});

const apiLimiter = rateLimit({
  windowMs: 60_000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'Too Many Requests',
    message: 'Limite de requisições excedido.',
  },
  keyGenerator: (req: Request) => getClientIp(req),
});

if (isAttackMode()) {
  app.use(generalLimiter);
}

app.use('/api', apiLimiter);
app.use(generalLimiter);

/* ------------------------------------------------------------------ */
/*  Servir arquivos estáticos com cache                                */
/* ------------------------------------------------------------------ */
app.use(
  express.static(browserDistFolder, {
    index: false,
    redirect: false,
    maxAge: '1y',
    immutable: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    },
  }),
);

/* ------------------------------------------------------------------ */
/*  Health check endpoint                                              */
/* ------------------------------------------------------------------ */
app.get('/_health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    attackMode: isAttackMode(),
    requestRate,
  });
});

/* ------------------------------------------------------------------ */
/*  Handler principal do Angular                                       */
/* ------------------------------------------------------------------ */
app.use((req: Request, res: Response, next: NextFunction) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/* ------------------------------------------------------------------ */
/*  Tratamento de erros                                                */
/* ------------------------------------------------------------------ */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

/* ------------------------------------------------------------------ */
/*  Inicialização do servidor                                          */
/* ------------------------------------------------------------------ */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Security layers: active`);
    console.log(`Attack mode monitoring: active`);
  });
}

export const reqHandler = createNodeRequestHandler(app);

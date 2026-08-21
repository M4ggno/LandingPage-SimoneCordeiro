import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Profile {
  nome = 'Simone Cordeiro';
  profissao = 'Psicóloga Clínica';
  crp = 'CRP 13/7004';
  whatsapp = '5583999063132';
  instagramProfissional = 'https://instagram.com/psico.simonecordeiro';
  // ... resto dos dados do briefing
}

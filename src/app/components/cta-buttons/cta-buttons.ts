import { Component, ElementRef, HostListener, ViewChild, PLATFORM_ID, Inject, ChangeDetectionStrategy, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Profile } from '../../core/profile';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-cta-buttons',
  imports: [AnimateOnScroll],
  templateUrl: './cta-buttons.html',
  styleUrl: './cta-buttons.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaButtons {
  @ViewChild('dotsLayer') dotsLayer?: ElementRef<HTMLElement>;
  private isBrowser: boolean;

  protected readonly profile = inject(Profile);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get whatsappLink(): string {
    return `https://wa.me/${this.profile.whatsapp}?text=${encodeURIComponent('Olá, gostaria de agendar uma consulta')}`;
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser || !this.dotsLayer) return;

    const el = this.dotsLayer.nativeElement.parentElement;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offset = rect.top * 0.7;
    this.dotsLayer.nativeElement.style.transform = `translateY(${offset}px)`;
  }
}

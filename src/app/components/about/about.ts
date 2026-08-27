import { Component, ElementRef, HostListener, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Profile } from '../../core/profile';
import { Intro } from '../../core/intro';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-about',
  imports: [NgTemplateOutlet, AnimateOnScroll],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  @ViewChild('heroImage') heroImage?: ElementRef<HTMLElement>;
  private isBrowser: boolean;

  constructor(
    public profile: Profile,
    public intro: Intro,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser || !this.heroImage) return;
    const offset = window.scrollY * 0.3;
    this.heroImage.nativeElement.style.transform = `translateY(${offset}px)`;
  }
}

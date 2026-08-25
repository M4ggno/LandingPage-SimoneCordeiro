import { Component, ElementRef, HostListener, ViewChild, PLATFORM_ID, Inject, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgTemplateOutlet } from '@angular/common';
import { Profile } from '../../core/profile';
import { Intro } from '../../core/intro';

@Component({
  selector: 'app-about',
  imports: [NgTemplateOutlet],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  @ViewChild('heroImage') heroImage?: ElementRef<HTMLElement>;
  @ViewChild('heroContentMobile') heroContentMobile?: ElementRef<HTMLElement>;
  @ViewChild('heroContentDesktop') heroContentDesktop?: ElementRef<HTMLElement>;
  private isBrowser: boolean;
  private observersStarted = false;

  constructor(
    public profile: Profile,
    @Inject(PLATFORM_ID) platformId: Object,
    private intro: Intro
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      if (this.isBrowser && this.intro.finished() && !this.observersStarted) {
        this.observersStarted = true;
        this.setupObservers();
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser || !this.heroImage) return;
    const offset = window.scrollY * 0.3;
    this.heroImage.nativeElement.style.transform = `translateY(${offset}px)`;
  }

  private setupObservers() {
    const setup = (el?: ElementRef<HTMLElement>) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const items = el.nativeElement.querySelectorAll('.anim-item');
            if (entry.isIntersecting) {
              items.forEach((item) => item.classList.add('play-anim'));
            } else {
              items.forEach((item) => item.classList.remove('play-anim'));
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el.nativeElement);
    };

    setup(this.heroContentMobile);
    setup(this.heroContentDesktop);
  }
}

import { Directive, ElementRef, AfterViewInit, OnChanges, SimpleChanges, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimateOnScroll]'
})
export class AnimateOnScroll implements AfterViewInit, OnChanges {
  @Input() threshold = 0.2;
  @Input() enabled = true;
  private isBrowser: boolean;
  private viewReady = false;
  private started = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    this.viewReady = true;
    if (this.enabled) this.start();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['enabled'] && this.enabled && this.viewReady && !this.started) {
      this.start();
    }
  }

  private start() {
    if (!this.isBrowser || this.started) return;
    this.started = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const items = this.el.nativeElement.querySelectorAll('.anim-item');
          if (entry.isIntersecting) {
            items.forEach((item) => item.classList.add('play-anim'));
          } else {
            items.forEach((item) => item.classList.remove('play-anim'));
          }
        });
      },
      { threshold: this.threshold }
    );

    observer.observe(this.el.nativeElement);
  }
}

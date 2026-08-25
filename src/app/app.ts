import { Component, OnInit, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Intro } from './core/intro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  showIntro = signal(true);
  introExiting = signal(false);
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private intro: Intro
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) {
      this.showIntro.set(false);
      this.intro.finished.set(true);
      return;
    }

    setTimeout(() => {
      this.introExiting.set(true);
    }, 2000);
  }

onWipeEnd(event: AnimationEvent) {
  if (event.animationName.includes('wipe-up')) {
    this.showIntro.set(false);
    this.intro.finished.set(true);
  }
}
}

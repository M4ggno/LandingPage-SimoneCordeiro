import { Component } from '@angular/core';
import { Profile } from '../../core/profile';
import { Intro } from '../../core/intro';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-about',
  imports: [AnimateOnScroll],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  constructor(public profile: Profile, public intro: Intro) {}
}

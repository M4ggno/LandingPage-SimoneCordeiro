import { Component } from '@angular/core';
import { Profile } from '../../core/profile';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-cta-buttons',
  imports: [AnimateOnScroll],
  templateUrl: './cta-buttons.html',
  styleUrl: './cta-buttons.css'
})
export class CtaButtons {
  constructor(public profile: Profile) {}
}

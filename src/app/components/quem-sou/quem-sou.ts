import { Component } from '@angular/core';
import { Profile } from '../../core/profile';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-quem-sou',
  imports: [AnimateOnScroll],
  templateUrl: './quem-sou.html',
  styleUrl: './quem-sou.css'
})
export class QuemSou {
  constructor(public profile: Profile) {}
}

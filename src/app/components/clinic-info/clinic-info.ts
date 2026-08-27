import { Component } from '@angular/core';
import { Profile } from '../../core/profile';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-clinic-info',
  imports: [AnimateOnScroll],
  templateUrl: './clinic-info.html',
  styleUrl: './clinic-info.css'
})
export class ClinicInfo {
  constructor(public profile: Profile) {}
}

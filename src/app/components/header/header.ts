import { Component } from '@angular/core';
import { Profile } from '../../core/profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(public profile: Profile) {}
}

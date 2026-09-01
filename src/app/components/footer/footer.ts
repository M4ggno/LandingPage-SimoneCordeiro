import { Component } from '@angular/core';
import { Profile } from '../../core/profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  ano = new Date().getFullYear();
  constructor(public profile: Profile) {}
}

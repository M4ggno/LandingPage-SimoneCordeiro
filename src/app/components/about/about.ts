import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Profile } from '../../core/profile';

@Component({
  selector: 'app-about',
  imports: [NgTemplateOutlet],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  constructor(public profile: Profile) {}
}

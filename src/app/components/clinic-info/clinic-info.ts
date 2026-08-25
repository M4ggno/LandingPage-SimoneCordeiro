import { Component } from '@angular/core';
import { Profile } from '../../core/profile';

@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.html',
  styleUrl: './clinic-info.css'
})
export class ClinicInfo {
  constructor(public profile: Profile) {}
}

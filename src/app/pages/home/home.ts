import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { About } from '../../components/about/about';
import { ClinicInfo } from '../../components/clinic-info/clinic-info';

@Component({
  selector: 'app-home',
  imports: [Header, About, ClinicInfo],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}

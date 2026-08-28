import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { About } from '../../components/about/about';
import { QuemSou } from '../../components/quem-sou/quem-sou';
import { CtaButtons } from '../../components/cta-buttons/cta-buttons';
import { LocationMap } from '../../components/location-map/location-map';

@Component({
  selector: 'app-home',
  imports: [Header, About, QuemSou, CtaButtons, LocationMap],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}

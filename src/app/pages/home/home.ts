import { Component } from '@angular/core';
import { Header, About, QuemSou,CtaButtons, LocationMap, ComoAjudo, Faq, Footer } from '../../components';

@Component({
  selector: 'app-home',
  imports: [Header, About, QuemSou, ComoAjudo, CtaButtons, LocationMap, Faq, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}

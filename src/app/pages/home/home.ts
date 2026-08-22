import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { About } from '../../components/about/about';

@Component({
  selector: 'app-home',
  imports: [Header, About],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}

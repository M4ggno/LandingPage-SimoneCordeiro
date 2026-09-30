import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Simone Cordeiro | Psicóloga Clínica em Patos - PB' },
  { path: '**', redirectTo: '' },
];

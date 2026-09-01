import { Component } from '@angular/core';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-como-ajudo',
  imports: [AnimateOnScroll],
  templateUrl: './como-ajudo.html',
  styleUrl: './como-ajudo.css'
})
export class ComoAjudo {
  demandas = [
    'Ansiedade no dia a dia',
    'Autoestima e autoconfiança',
    'Momentos de tristeza e desânimo',
    'Relacionamentos e vínculos',
    'Medos e pensamentos que insistem',
    'TDAH e desenvolvimento infantil',
    'Mudanças e novas fases da vida',
    'Desafios em casa, na escola ou no trabalho',
    'Vontade de se conhecer melhor'
  ];
}

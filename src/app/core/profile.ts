import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Profile {
  readonly nome = 'Simone Cordeiro';
  readonly profissao = 'Psicóloga Clínica';
  readonly crp = 'CRP 13/7004';
  readonly whatsapp = '5583999063132';
  readonly instagramProfissional = 'https://instagram.com/psico.simonecordeiro';
  readonly cidade = 'Patos - PB';
  readonly clinica = 'Centro clínico Humanizzar';
  readonly googleMaps = 'https://maps.app.goo.gl/1dM4fcKCRP431rNMA';
  readonly lattes = 'http://lattes.cnpq.br/1214158577530395';
}

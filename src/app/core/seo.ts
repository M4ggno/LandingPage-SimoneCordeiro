import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class Seo {
  private title = inject(Title);
  private meta = inject(Meta);

  setTags() {
    const title = 'Simone Cordeiro | Psicóloga Clínica em Patos - PB';
    const description = 'Psicóloga clínica com mais de 10 anos de experiência. Atendimento presencial e online com base na Terapia Cognitivo-Comportamental (TCC), para crianças, adolescentes e adultos.';

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: 'psicóloga, psicóloga Patos PB, terapia cognitivo comportamental, TCC, psicoterapia, saúde mental' });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://simonecordeiro.vercel.app/images/icons/logo.svg' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }
}

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Profile } from '../../core/profile';
import { Intro } from '../../core/intro';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-about',
  imports: [AnimateOnScroll],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly profile = inject(Profile);
  protected readonly intro = inject(Intro);

  get whatsappLink(): string {
    return `https://wa.me/${this.profile.whatsapp}?text=${encodeURIComponent('Olá, gostaria de agendar uma consulta')}`;
  }
}

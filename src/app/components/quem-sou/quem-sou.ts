import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Profile } from '../../core/profile';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-quem-sou',
  imports: [AnimateOnScroll],
  templateUrl: './quem-sou.html',
  styleUrl: './quem-sou.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuemSou {
  protected readonly profile = inject(Profile);

  get whatsappLink(): string {
    return `https://wa.me/${this.profile.whatsapp}?text=${encodeURIComponent('Olá, gostaria de agendar uma consulta')}`;
  }
}

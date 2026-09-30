import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Profile } from '../../core/profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly profile = inject(Profile);

  get whatsappLink(): string {
    return `https://wa.me/${this.profile.whatsapp}?text=${encodeURIComponent('Olá, gostaria de agendar uma consulta')}`;
  }
}

import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Profile } from '../../core/profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly profile = inject(Profile);
  protected readonly currentYear = signal(new Date().getFullYear());

  get whatsappLink(): string {
    return `https://wa.me/${this.profile.whatsapp}`;
  }
}

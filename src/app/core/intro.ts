import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Intro {
  readonly finished = signal(false);
}

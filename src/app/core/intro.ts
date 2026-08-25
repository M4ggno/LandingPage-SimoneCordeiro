import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Intro {
  finished = signal(false);
}

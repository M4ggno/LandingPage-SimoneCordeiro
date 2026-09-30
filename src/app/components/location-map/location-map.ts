import { Component, PLATFORM_ID, Inject, ChangeDetectionStrategy, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Profile } from '../../core/profile';
import { AnimateOnScroll } from '../../core/animate-on-scroll';

@Component({
  selector: 'app-location-map',
  imports: [AnimateOnScroll],
  templateUrl: './location-map.html',
  styleUrl: './location-map.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationMap {
  protected readonly profile = inject(Profile);
  mapUrl: SafeResourceUrl;
  directionsUrl: string;

  private readonly lat = -7.0244498;
  private readonly lng = -37.2746537;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    const embedUrl = `https://www.google.com/maps?q=${this.lat},${this.lng}&z=17&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);

    const isBrowser = isPlatformBrowser(platformId);
    const isIOS = isBrowser && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    this.directionsUrl = isIOS
      ? 'https://maps.apple/r/Yob8zdKdny4zdB'
      : this.profile.googleMaps;
  }
}

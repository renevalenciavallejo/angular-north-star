import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-north-star';
  private supportedLangs = ['en', 'es'];
  private defaultLang = 'en';
  private translocoService = inject(TranslocoService);
  private document: Document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit() {
    const lang = this.getPreferredLanguage();
    this.setLanguage(lang);
  }

  private getPreferredLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('userPreferredLang');
      if (savedLang && this.supportedLangs.includes(savedLang)) {
        return savedLang;
      }

      const browserLang = navigator.language.split('-')[0];
      if (this.supportedLangs.includes(browserLang)) {
        return browserLang;
      }
    }

    return this.defaultLang;
  }

  private setLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
    this.document.documentElement.lang = lang;
  }
}

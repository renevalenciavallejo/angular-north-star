import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-north-star';
  private readonly document: Document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly supportedLangs = ['es', 'en'];

  constructor() {
    this.translate.addLangs(this.supportedLangs);
  }

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

    return this.translate.getDefaultLang();
  }

  private setLanguage(lang: string) {
    this.translate.use(lang);
    this.document.documentElement.lang = lang;
  }
}

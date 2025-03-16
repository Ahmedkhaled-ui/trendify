import { TranslateService } from '@ngx-translate/core';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly renderer = inject(RendererFactory2).createRenderer(
    null,
    null
  );

  constructor(private translateService: TranslateService) {
    if (isPlatformBrowser(PLATFORM_ID)) {
      // set defuilt lang
      let savelang = localStorage.getItem('lang');

      // get lang from localStorage
      this.translateService.setDefaultLang('en');

      //  use lang
      if (savelang) {
        this.translateService.use(savelang);
      }
      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') == 'en') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
    } else if (localStorage.getItem('lang') == 'ar') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
    }
  }

  changeLang(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    this.changeDirection();
  }
}

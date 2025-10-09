import { Injectable } from '@angular/core';

// declare function customInitFunctions(): any;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // todo informacion de manera global

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url =
      localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach((elem: any) => {
      elem.classList.remove('working');
      // todos tienee data-theme
      const btnTheme = elem.getAttribute('data-theme');
      // este tiene el enlace que se clickeo
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      // esto this.linkTheme? tiene el enlace que se selecciono
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        // agreagar la clase
        elem.classList.add('working');
      }
    });
  }
}

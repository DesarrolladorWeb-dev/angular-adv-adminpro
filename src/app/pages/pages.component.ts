import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { ModalImagenComponent } from '../components/modal-imagen/modal-imagen.component';

// lo declaro porque se que esta funcion existe y esta  de manera global
// src\assets\js\custom.js  , lo cree porque no se volvia a cargar el js cuando daba la segunda renderizacion al dar login
// declare sirve para llamar un codigo js desde angular
// declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  standalone: true,
  // puedo importar modulos
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ModalImagenComponent,
  ],

  templateUrl: './pages.component.html',
  styles: ``,
})
export class PagesComponent implements OnInit {
  // injecto mi servicio
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    // funciona porque la funcion existe de manera global (es la que esta importada en el index al final)
    // customInitFunctions();
  }
}

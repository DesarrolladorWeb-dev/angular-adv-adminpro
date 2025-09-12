import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './pages.component.html',
  styles: ``,
})
export class PagesComponent {}

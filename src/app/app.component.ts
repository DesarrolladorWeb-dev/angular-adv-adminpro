import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // HeaderComponent,
    // SidebarComponent,
    // BreadcrumbsComponent,

    // solo lo coloque para usar modulos , pero no es necesario
    PagesModule,
    AuthModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'adminpro';
}

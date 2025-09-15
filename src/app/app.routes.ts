import { Routes } from '@angular/router';

import { pagesRoutes } from './pages/pages.routing';
import { authRoutes } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

export const routes: Routes = [
  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting
  // {
  //   path: 'dashboard',
  //   children: pagesRoutes,
  // },
  ...authRoutes,
  ...pagesRoutes, // incluir aquí tus rutas 'pages'
  // {
  //   path: 'pages',
  //   children: pagesRoutes,
  // },

  // { NO FUNCIONA , ESTE CODIGO ES EL ERROR
  //   path: 'pages',
  //   loadChildren: () =>
  //     import('./pages/pages.routing').then((m) => m.pagesRoutes),
  // },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  //   cualquier otro path que no este definido
  { path: '**', component: NopagefoundComponent },
];

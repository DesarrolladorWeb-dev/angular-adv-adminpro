import { Routes } from '@angular/router';

import { authGuard } from '../guard/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guard/admin.guard';

// const authGuard = new AuthGuard();

export const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [authGuard], //si es true pasa
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'ProgressBar' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Grafica #1' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajuste de Cuenta' },
      },
      {
        path: 'buscar/:termino',
        component: BusquedaComponent,
        data: { titulo: 'Busquedas' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },

      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil de Usuario' },
      },

      // Mantenimientos
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Hopitales de aplicacion' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Medicos de aplicacion' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Medicos de aplicacion' },
      },
      // Rutas de Admin
      {
        path: 'usuarios',
        canActivate: [adminGuard],
        component: UsuariosComponent,
        data: { titulo: 'Usuarios de aplicacion' },
      },
    ],
  },
];

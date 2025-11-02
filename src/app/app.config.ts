import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // importProvidersFrom(HttpClientModule : agregar para usar el Http
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule)],
};

// Providers: Aquí defines los servicios y módulos que quieres que estén disponibles globalmente
//  toda la app. Por ejemplo, el proveedor de rutas con provideRouter(routes)
// facilita la navegación interna entre componentes a través de URLs.

// Al poner providers: [provideRouter(routes)], indicas que
// quieres que el router maneje las rutas definidas en app.routes.ts
// para toda la aplicación instalando los proveedores que gestionan
//  el enrutamiento.

// En Angular 17 con standalone components y sin NgModules,
// el appConfig es la forma moderna de decirle a Angular: "Aquí
// están las configuraciones y servicios globales que deben estar
//  disponibles desde el inicio".

// Si usas servicios que requieren módulos específicos,
// como HttpClient para hacer peticiones HTTP, debes incluirlos
// en los providers globales con importProvidersFrom(HttpClientModule)
// dentro del arreglo providers. Esto hace que el HttpClient esté inyectable
// en cualquier servicio o componente.

// Esto permite que tus componentes y servicios standalone
// no tengan que cargar estos módulos por separado,
// favoreciendo un diseño modular y eficiente en la aplicación.

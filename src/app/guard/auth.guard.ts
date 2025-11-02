// el archivo me ayuda a defenderme cuando ingresan al dashboard y no tienen el token

import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

// TODO Usa inject() para obtener servicios en functional guards
// No uses constructor ni OnInit en functional guards

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectar los servicios necesarios
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  // usuarioService.validarToken().subscribe((resp) => {
  //   console.log(resp);
  // });

  // console.log('paso por el guard');
  return usuarioService.validarToken().pipe(
    tap((estaAutenticado: any) => {
      if (!estaAutenticado) {
        router.navigateByUrl('/login');
      }
    })
  );
};

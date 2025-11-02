import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../Interfaces/register-form.interface';
import { LoginForm } from '../Interfaces/login-form.interface';

// declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public recarga: any;

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    // ngZone : esto es lo unico que quiero que se ejecute
    // this.ngZone.run(() => {
    // this.signOut();

    (window as any).signOut = () => {
      this.router.navigateByUrl('/login');
      this.recarga = 2;
    };
    this.recarga = 2;

    this.router.navigateByUrl('/login');
  }

  // tema con el guard el guard
  // Usaremos este servicio en el guard
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          // renovar el token
          localStorage.setItem('token', resp.token);
        }),
        // map es para pasar por los elementos
        map((resp) => true),
        // el of crea un nuevo observable para no romper el ciclo
        // regresa el observable  con el valor de false y no se mostrara el dashboard
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  login(formData: LoginForm) {
    this.recarga = 1;
    if (formData.remember) {
      localStorage.setItem('email', formData.email!);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${base_url}/login`, formData).pipe(
      map((resp: any) => {
        // localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        // porque almacena string
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        return true;
      })
    );
  }
  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}

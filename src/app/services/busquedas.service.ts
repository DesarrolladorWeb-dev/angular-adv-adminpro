import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  public transformarUsuarios(resultados: any[]): Usuario[] {
    // esto soluciona cuando no se mostraba la imagen del usuario al buscar
    // aqui colocamos los datos al objeto para que tambien se ingrese la img y su datos
    return resultados.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        )
    );
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    // this.http.get<any[]> significa que devuelve un arreglo de any(contendra cualquier datos)
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            // resp.resultados  : es un arreglo
            return this.transformarUsuarios(resp.resultados);

          default:
            return [];
        }
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  standalone: true,
  imports: [],
  templateUrl: './promesas.component.html',
  styles: ``,
})
export class PromesasComponent implements OnInit {
  ngOnInit(): void {
    this.getUsuarios().then((usuario) => {
      console.log(usuario);
    });

    // es secuencial
    //   const promesa = new Promise((resolve, reject) => {
    //     if (false) {
    //       resolve('Hola mundo');
    //     } else {
    //       reject('Algo salio mal');
    //     }
    // la resolucion es la parte asincrona
    //   });
    //   promesa
    //     .then((mensaje) => {
    // se mostrara despues de fin del init en consola
    //       console.log(mensaje);
    //     })
    //     .catch((error) => console.log('Error en mi promesa'));
    //   console.log('fin del init');
  }
  // usuarios: any[] = [];
  // async ngOnInit(): Promise<void> {
  //   try {
  //     const usuarios = await this.getUsuarios();
  //     this.usuarios = usuarios;
  //     console.log(this.usuarios);
  //   } catch (error) {
  //     console.error('Error al obtener usuarios:', error);
  //   }
  // }

  getUsuarios(): Promise<any[]> {
    return fetch('https://jsonplaceholder.typicode.com/users').then((resp) =>
      resp.json()
    );
    // return new Promise((resolve, reject) => {
    //   fetch('https://jsonplaceholder.typicode.com/users')
    //     .then((resp) => resp.json())
    //     .then((body) => resolve(body.data))
    //     .catch((error) => reject(error));
    // });
  }
}

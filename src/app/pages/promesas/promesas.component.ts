import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  standalone: true,
  imports: [],
  templateUrl: './promesas.component.html',
  styles: ``,
})
export class PromesasComponent implements OnInit {
  constructor() {}

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

  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}

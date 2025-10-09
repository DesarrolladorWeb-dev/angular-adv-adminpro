import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [],
  templateUrl: './rxjs.component.html',
  styles: ``,
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(
    //     // pipe: cambia la informacion la que fluye del observable
    //     // retry : si se ejecuta (  observer.error('i llego al valor de 2')) pasara por retry y entonces comienca desde el observable otra vez
    //     //  solo se detiene si llega aqui observer.complete();
    //     retry(2) //elnumero es para quepase solounavez por el retry
    //   )
    //   .subscribe(
    //     (valor) => console.log('Subs:', valor),
    //     (error) => console.warn('Error:', error),
    //     () => console.info('Obs terminado')
    //   );

    // intervalSubs  :sera el producto de toda la subscripcion del lo que retorne el subscribe
    this.intervalSubs = this.retornaIntervalo().subscribe(
      // (valor) => console.log(valor)
      console.log
    );
  }

  // en el momento que cambie de pagina al dashboard porejemplo (cambio de componente) se desusbcribe
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    // este interval es un observable que por el momento emite numeros de 1 al infinito en enteros
    // y retorna numeros ,
    //  el 1000 (es el periodo de tiempo)
    return interval(500).pipe(
      // take: cuantas emisiones del observable se quiere emitir
      // map : transformar la informacion que recibe el observavle y mutralo de la manera que to necesite
      take(10), //para que pase 10 veces sin el take pasaria infinitas veces numeros enteros
      map(
        (valor) => valor + 1
        // return 'hola mundo' + valor;
      ), //0 => 1 (del 0 al 1 )
      // map((valor) => valor + 1), // 1 => 2(del 1 al 2 ) porque es consecutiva
      filter((valor) => (valor % 2 === 0 ? true : false)) //true pasa y false no pasa
      // cuando es false lo que esta aqui abajo no se ejecutara
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    // el observable no trabaja(no mostrara la imagen) si nadie lo escucha(nadie se suscribe a el: subscribe())
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        // el console.log no es un valor de retorno por eso en la variable de abajo "valor" no se muestra nada
        // console.log('tick');

        i++;
        // next (siguiente valor a emitir)
        observer.next(i);

        if (i === 4) {
          // para cancelar intervalos
          clearInterval(intervalo);
          // para terminar el observable
          observer.complete();
        }

        if (i === 2) {
          console.log('i = 2 ------ error');
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}

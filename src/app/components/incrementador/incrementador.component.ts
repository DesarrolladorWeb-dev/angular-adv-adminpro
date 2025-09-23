import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-incrementador',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './incrementador.component.html',
  styles: ``,
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }
  // Recibir: desde el input puede recibir una propiedad desde el padre llamada progreso
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn btn-primary';

  // Emitir: son de tipo event emiter : disparando un evento y esperando que el otro responde este evento disparado (como el evento click)
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number): any {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100); //emitimos 100
      return (this.progreso = 100);
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0); //emitimos 0
      return (this.progreso = 0);
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }
  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      // si se pasa al scribir en el input  lo cambiamos a 100
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }
}

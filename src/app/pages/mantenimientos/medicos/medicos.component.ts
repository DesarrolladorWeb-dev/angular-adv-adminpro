import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { RouterLink } from '@angular/router';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay, Subscription } from 'rxjs';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [NgIf, NgFor, ImagenPipe, RouterLink],
  templateUrl: './medicos.component.html',
  styles: ``,
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;

      this.medicos = medicos;
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarMedicos();
      return;
    }

    this.busquedasService.buscar('medicos', termino).subscribe((resultados) => {
      this.medicos = resultados;
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id!).subscribe((resp) => {
          // se carga y actualiza la tabla y ahi mismo sin recargar la pagina
          this.cargarMedicos();
          Swal.fire(
            'Usuario borrado',
            `${medico.nombre} fue eliminado correctamente `,
            'success'
          );
        });
      }
    });
  }
}

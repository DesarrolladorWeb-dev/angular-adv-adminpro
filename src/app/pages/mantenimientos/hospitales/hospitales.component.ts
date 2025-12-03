import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { NgFor, NgIf } from '@angular/common';
import { Hospital } from '../../../models/hospital.model';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  standalone: true,
  imports: [NgIf, NgFor, ImagenPipe, FormsModule],
  templateUrl: './hospitales.component.html',
  styles: ``,
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs!.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarHospitales(); //para regrese  como lo tenia en un inicio
      return;
    }

    this.busquedasService
      .buscar('hospitales', termino)
      .subscribe((resultados) => {
        this.hospitales = resultados;
      });
  }

  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }
  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id!).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital ',
      showCancelButton: true,
    });
    // para ver si tiene texto
    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value!).subscribe((resp: any) => {
        // ahora el hopital para no llamar otra vez a cargarhospital()
        // lo puedo ingresar directamente al arreglo
        this.hospitales.push(resp.hospital);

        // console.log(resp);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    console.log(hospital);
    // el id  y la imagen que puede tener el hospital o no en caso que lo tenga
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id!,
      hospital.img!
    );
  }
}

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  // FormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, ImagenPipe],
  templateUrl: './medico.component.html',
  styles: ``,
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado!: Medico | undefined;
  public hospitalSeleccionado!: Hospital | undefined;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // obtener el id de la url
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
      // console.log('tick') vemos que solo se lanza una vez el subscribe y esta bien
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargarHospitales();

    // CAMBIAR LA IMAGEN DEL HOSPITAL en tiempo real
    // creamos un observable que este pendiente del campo hospital
    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (h) => h._id === hospitalId
      );
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService
      .obtenerMedicoPorId(id)
      .pipe(delay(100)) //para que se cargue la imagen primero  de hospitales
      .subscribe((medico: any) => {
        if (!medico) {
          this.router.navigateByUrl(`/dashboard/medicos`);
          return;
        }

        const {
          nombre,
          hospital: { _id },
        } = medico;
        this.medicoSeleccionado = medico;
        //  hospital: { _id }
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      // actualizar
      this.medicoService.actualizarMedico(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
      this.router.navigateByUrl(`/dashboard/medicos`);
    } else {
      //crear
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');

          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';
import { NgIf } from '@angular/common';

import Swal from 'sweetalert2';
// TODO IMPORTANTE PARA QUE SE MUESTRE EL MUESTRE EL SWEETALERT y tambien los paquetes del index.html
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './perfil.component.html',
  styles: ``,
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup | any;
  public usuario?: Usuario;
  public imagenSubir?: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    // si yo modifico aqui el usuario  , todos los archivos que use el objeto usuario se veran afectados
    // (porque el objeto usuario lo usan todos los archivos y como esta en un servicio se actualizara en todos)
    this.usuario = usuarioService.usuario;
  }
  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      (resp) => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario!.nombre = nombre;
        this.usuario!.email = email;
        // console.log(resp);
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  cambiarImagen($event: any) {
    const input = $event.target;
    const file: File = input.files![0];

    this.imagenSubir = file;

    if (!file) {
      this.imgTemp = null;
      return this.imgTemp;
    }

    // si tenemos una imagen seleccionada
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;

      // debemos ver un string en base 64(es la imagen)
      // me ayuda a cambiar la vista previa
      // console.log(reader.result);
    };
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario!.uid!)
      .then((img: any) => {
        this.usuario!.img! = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}

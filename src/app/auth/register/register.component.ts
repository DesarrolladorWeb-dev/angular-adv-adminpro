import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
//Importar sweetalert2
import Swal from 'sweetalert2';
// TODO IMPORTANTE PARA QUE SE MUESTRE EL MUESTRE EL SWEETALERT y tambien los paquetes del index.html
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  // styles: ``,
})
export class RegisterComponent {
  public formSubmitted = false;

  // como quiero que lusca mi formulario
  public registerForm = this.fb.group(
    {
      nombre: ['Fernando', Validators.required],
      // !RECORDAR : si hay dos validaciones encerrarlos en otras llaves porque te dara un error de promesa en consola
      email: ['test100@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      password2: ['123456', Validators.required],
      // los terminos el es Check
      terminos: [true, Validators.required],
    }, //tener validaciones al enviar el formulario (personalizadas)
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  crearUsuario() {
    this.formSubmitted = true; //para saber cuando el formulario se envio o no
    console.log(this.registerForm.value);
    // podremos imprimir el formulario  y dentro de la propiedad password2 tendremos el Error
    // console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        //Si sucede un error
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Cool',
        });
        // Swal.fire('Error',  'error');
      }
    );
  }
  campoNoValido(campo: string): boolean {
    // si no esta lleno sera true y esta posteado el formulario
    if (this.registerForm.get(campo)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;

    // que las contraseñas sean diferentes y que hallan sido posteados
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    // si los terminos esta en falso y mando el posteo del formulario
    //entonces lo mostaria como un error
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    // necesitamos retornar una funcion
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        // setErrors : es mostrarnos el error que tenemos
        pass2Control?.setErrors(null); //no hay ningun error
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}

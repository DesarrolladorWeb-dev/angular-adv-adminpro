import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
//Importar sweetalert2
import Swal from 'sweetalert2';
// TODO IMPORTANTE PARA QUE SE MUESTRE EL MUESTRE EL SWEETALERT y tambien los paquetes del index.html
import 'sweetalert2/src/sweetalert2.scss';
import { LoginForm } from '../../Interfaces/login-form.interface';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  styles: ``,
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    // Hacer la función handleCredentialResponse disponible globalmente
    (window as any).handleCredentialResponse = (response: any) =>
      this.handleCredentialResponse(response);
  }

  public formSubmitted = false;

  // como quiero que lusca mi formulario 'test100@gmail.com'
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['123456', Validators.required],
    remember: [true],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    if (this.usuarioService.recarga === 2) {
      window.location.reload();
      console.log(this.usuarioService.recarga);
    }
    this.usuarioService.recarga = 1;
    console.log(this.usuarioService.recarga);
  }
  login() {
    // as LoginForm: Es una forma de decirle a TypeScript:
    //  "Confía en mí,yo sé que este valor es de tipo LoginForm, aunque tú no puedas verificarlo".
    // as LoginForm le dice a TypeScript: "Trata este valor como si fuera de tipo LoginForm"
    this.usuarioService.login(this.loginForm.value as LoginForm).subscribe(
      (correcto) => this.router.navigateByUrl('/'),

      (err) => {
        console.log(err);
      }
    );
  }

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token:', response.credential);

    // Decodificar el JWT token (parte del payload)
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    console.log('Payload:', payload);

    // Mostrar información del usuario
    // const userNameElement = document.getElementById('userName');
    // const userEmailElement = document.getElementById('userEmail');
    // const userInfoElement = document.getElementById('userInfo');

    // if (userNameElement)
    //   userNameElement.textContent = 'Nombre: ' + payload.name;
    // if (userEmailElement)
    //   userEmailElement.textContent = 'Email: ' + payload.email;
    // if (userInfoElement) userInfoElement.style.display = 'block';

    this.usuarioService.loginGoogle(response.credential).subscribe(
      (correcto) => {
        // this.router.navigate(['/dashboard']);
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    );
  }
}

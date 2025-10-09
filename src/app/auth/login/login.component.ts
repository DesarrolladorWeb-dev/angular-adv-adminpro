import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  styles: ``,
})
export class LoginComponent {
  constructor(private router: Router) {}
  login() {
    // para movernos
    this.router.navigateByUrl('/');
  }
}

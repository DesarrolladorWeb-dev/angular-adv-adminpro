import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { SlicePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//  ReactiveFormsModule, FormsModule se agregaron estas librerias para que al dar enter en el input no se recarga
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SlicePipe, ReactiveFormsModule, FormsModule],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  public usuario?: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }
  buscar(termino: string) {
    // console.log(termino);
    if (termino.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}

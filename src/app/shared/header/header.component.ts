import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  constructor(private usuarioService: UsuarioService) {}

  logout() {
    this.usuarioService.logout();
  }
}

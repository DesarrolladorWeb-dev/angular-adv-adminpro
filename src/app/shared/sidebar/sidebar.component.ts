import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  menuItems: any[] | any;
  public usuario?: Usuario;

  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    // this.menuItems = sidebarService.menu;
    // console.log(sidebarService);
    // this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
    // Esto asegura que el menú esté cargado
    this.menuItems = this.sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
    // console.log(this.menuItems);
  }
}

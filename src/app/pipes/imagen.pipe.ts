import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen',
  standalone: true,
})
// LOS PIPES NO MODIFICAN EL OBJETO SOLO LO MUESTRA DE FORMA VISUAL , Y SE USA EN EL HTML en  este caso lo use en hospitales.component
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      return `${base_url}/upload/usuarios/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${base_url}/upload/${tipo}/${img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}

import { Component } from '@angular/core';
import { DonaComponent } from '../../components/components/dona/dona.component';

@Component({
  selector: 'app-grafica1',
  standalone: true,
  imports: [DonaComponent],
  templateUrl: './grafica1.component.html',
  styles: ``,
})
export class Grafica1Component {
  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];

  public data1 = [
    {
      data: [10, 15, 40],
      label: 'Series A',
      backgroundColor: ['#6857E6', '#009FFE', '#F02059'],
    },
  ];
}

import { Component } from '@angular/core';
import { IncrementadorComponent } from '../../components/incrementador/incrementador.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [IncrementadorComponent, NgClass],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progreso1: number = 25;
  progreso2: number = 35;

  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  get getProgreso2() {
    return `${this.progreso2}%`;
  }
}

import { Component, Input } from '@angular/core';
// https://www.npmjs.com/package/ng2-charts/v/5.0.1   : Stackblitz Starting Templates
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dona.component.html',
  styles: ``,
})
export class DonaComponent {
  @Input() title: string = 'Sin titulo';

  //labels
  @Input('labels') doughnutChartLabels: string[] = [
    'Label1',
    'Labal2',
    'Label3',
  ];
  @Input('data')
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [350, 450, 100],
      label: 'Series A',
      backgroundColor: ['#6857E6', '#009FFE', '#F02059'],
    },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };
}

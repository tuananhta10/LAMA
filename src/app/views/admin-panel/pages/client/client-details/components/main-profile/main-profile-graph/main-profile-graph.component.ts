import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'client-main-profile-graph',
  animations: [mainAnimations],
  templateUrl: './main-profile-graph.component.html',
  styleUrls: ['./main-profile-graph.component.scss']
})
export class MainProfileGraphComponent implements OnInit {
  /* LINE CHART */
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  };

  public lineChartType: any = 'line';
  public lineChartLegend = false;

  public lineChartData: any[] = [
    {
      label: 'Budget',
      // January, Feb, Mar, Apr, May, Jun
      data: [0, 0, 0, 0, 0, 0, 0], // January - June
      fill: false,
      borderColor: 'rgba(64, 187, 234, 1)',
      pointBackgroundColor: 'rgba(64, 187, 234, 1)',
      pointBorderWidth: 0,
      tension: 0,
      borderWidth: 4.5,
      borderDash: [10,5]
    },
    {
      //type: 'bar',
      label: 'Planned',
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      //borderColor: '#FFD910',
      //pointBackgroundColor: '#FFD910',
      backgroundColor: '#FEC040',
      hoverBackgroundColor: 'rgba(254,192,64, 0.5)',
      borderColor: '#FEC040',
      pointBackgroundColor: '#FEC040',
      pointBorderWidth: 0,
      borderWidth: 3,
      tension: 0.4
    },
    {
      //type: 'bar',
      label: 'Utilised Total',
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      //borderColor: '#5D1676',
      //pointBackgroundColor: '#5D1676',
      backgroundColor: '#EF5DA8',
      hoverBackgroundColor: 'rgba(239,93,168, 0.5)',
      borderColor: '#EF5DA8',
      pointBackgroundColor: '#EF5DA8',
      pointBorderWidth: 0,
      borderWidth: 3,
      tension: 0.4
    },

    {
      label: 'Balance',
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      //borderColor: '#5D1676',
      //pointBackgroundColor: '#5D1676',
      borderColor: '#8C7FF9',
      pointBackgroundColor: '#8C7FF9',
      pointBorderWidth: 0,
      borderWidth: 3,
      tension: 0.4
    },
  ];

  public lineChartLabels: string[] = ['June', 'July', 'August', 'September', 'October', 'November'];

  constructor() { }

  ngOnInit(): void {
  }

}

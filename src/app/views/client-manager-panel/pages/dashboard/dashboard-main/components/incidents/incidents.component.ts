import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'admin-dashboard-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  @Input() incidentGraphData: any;

  public summaryData = [];
  public openData = [];
  public resolvedData = [];
  public withdrawnData = [];
  public undecidedData = [];
  public barChartLabels: string[] = [];


  /* PIE CHART */
  public pieChartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          /*boxWidth: 20,
          boxHeight: 18,*/

          fontColor: '#333',
          pointStyle: 'circle',
          usePointStyle: true,
          padding: 30
        }
      },
    },
    maintainAspectRatio: false,
  };
  
  public pieChartType: any = 'pie';
  public pieChartLegend = true;

  public pieChartData: any[] = [
    { 
      label: 'My First Dataset',
      data: [15, 15, 15, 55],
      backgroundColor: [
        'rgba(226, 137, 242)',
        'rgb(80, 55, 149)',
        'rgba(176, 133, 255)',
        'rgba(133, 92, 248)'
      ],
      borderWidth: 0,
      hoverOffset: 4,
      //radius: '45%',
      //circumference: 45
    },

  ];
  public pieChartLabels: string[] = ['Open', 'Closed', 'Urgent', 'Withdrawn'];


  /* BAR CHART */
  public barChartOptions: any = {
    plugins: {
      title: {
        //display: true,
        //text: 'Chart.js Bar Chart - Stacked'
      },

      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          boxHeight: 12,
          fontColor: '#333',
          //pointStyle: 'circle',
          //usePointStyle: true,
          padding: 10,
          font: {
            family: 'Noto Sans'
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: true
        },
      },
      y: {
        grid: {
          display: false
        },
      }
    }
  };

  public barChartType: any = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {
      type: 'line',
      label: 'Summary',
      hoverBackgroundColor: 'rgb(133,92,248, 1)',
      backgroundColor: 'rgba(94, 78, 160, 0.01)',
      fill: true,
      borderWidth: 2,
      borderColor: '#755CA7',
      pointBorderWidth: 0,
      pointBackgroundColor: '#755CA7',
      pointStyle: 'crossRot',
      tension: 0.3,
      data: this.summaryData,
    },
    {
      label: 'Open',
      data: this.openData,
      /*hoverBackgroundColor: '#977ff9',
      backgroundColor: 'rgba(226, 137, 242)',
      borderColor: 'rgba(226, 137, 242)',*/
      hoverBackgroundColor: 'rgba(31, 178, 161, 0.8)',
      backgroundColor: 'rgba(31, 178, 161, 1)',
      borderColor: 'rgba(31, 178, 161, 1)',
    },
    {
      label: 'Resolved',
      data: this.resolvedData,
      /*hoverBackgroundColor: '#fed485',
      backgroundColor: 'rgb(80, 55, 149)',
      borderColor: 'rgb(80, 55, 149)',*/
      hoverBackgroundColor: 'rgba(0, 110, 229, 0.8)',
      backgroundColor: 'rgba(0, 110, 229, 1)',
      borderColor: 'rgba(0, 110, 229, 1)',
    },
    {
      label: 'Withdrawn',
      data: this.withdrawnData,
      /*hoverBackgroundColor: '#e65143',
      backgroundColor: 'rgba(176, 133, 255)',
      borderColor: 'rgba(176, 133, 255)',*/
      hoverBackgroundColor: 'rgb(255,99,132, 1)',
      backgroundColor: '#E5505D',
      borderColor: '#E5505D',
    },

    {
      label: 'Undecided',
      data: this.undecidedData,
      /*hoverBackgroundColor: '#f7ceb6',
      backgroundColor: 'rgba(133, 92, 248)',
      borderColor: 'rgba(133, 92, 248)',*/
      hoverBackgroundColor: 'rgba(179, 171, 213, 0.8)',
      backgroundColor: 'rgba(179, 171, 213, 1)',
      borderColor: 'rgba(179, 171, 213, 1)',
    },
  ];


  constructor() { }

  ngOnInit(): void {
    if(this.incidentGraphData.length > 0){
      this.incidentGraphData.forEach(element => {
        let sum = element.open + element.resolved + element.undecided + element.withdrawn;
        this.summaryData.push(sum);
        this.openData.push(element.open);
        this.resolvedData.push(element.resolved);
        this.undecidedData.push(element.undecided);
        this.withdrawnData.push(element.withdrawn);

        var dateString = moment.unix(element.date_updated).format("MMM DD");
        this.barChartLabels.push(dateString)
      });
    }
  }

}

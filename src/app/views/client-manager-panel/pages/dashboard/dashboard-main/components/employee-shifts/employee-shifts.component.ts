import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard-employee-shifts',
  templateUrl: './employee-shifts.component.html',
  styleUrls: ['./employee-shifts.component.scss']
})
export class EmployeeShiftsComponent implements OnInit {
  @Input() dashboardData: any;
  totalShift: number = 0;
  /* PIE CHART */
  public doughnutChartOptions: any = {
    responsive: true,
    plugins: {
      
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          boxHeight: 18,
          fontColor: '#333',
          //pointStyle: 'circle',
          //usePointStyle: true,
          padding: 10
        }
      },
    },
    maintainAspectRatio: false,
  };
  
  public doughnutChartType: any = 'doughnut';
  public doughnutChartLegend = false;

  public doughnutChartData: any[] = [
    { 
      label: 'My First Dataset',
      data: [],
      backgroundColor: [
        '#5E4EA0',
        '#755CA7',
        '#8575B3',
        '#B3ABD5',
        '#DEE1F9',
      ],
      hoverBackgroundColor: [
        'rgba(226, 137, 242)',
        'rgb(80, 55, 149)',
        'rgba(176, 133, 255)',
        'rgba(133, 92, 248)', 
        'rgba(254,147,147)',
      ],
      borderWidth: [5, 5, 5, 5, 0],
      hoverOffset: 6,
      borderJoinStyle: 'miter',
      borderAlign: 'center',
      offset: [0, 0, 0, 0, 8],
      cutout: ['70%', '70%', '70%', '50%'],
      //weight: [5, 1, 1, 1],
      //radius: '45%',
      //circumference: 45,  
      animation: {
        animateRotate: true,
      },
      //clip: {left: 5, top: false, right: -2, bottom: 0},
      spacing: 0
    },

  ];
  public doughnutChartLabels: string[] = ['Setup', 'Scheduled', 'Available', 'Completed', 'Cancelled'];

  constructor() { }

  ngOnInit(): void {
    if(this.dashboardData?.client_service_schedule){
      let data = this.dashboardData.client_service_schedule;
      this.doughnutChartData[0].data = [data.client_service_schedule_total_available, data.client_service_schedule_total_scheduled, 
        data.client_service_schedule_total_setup, data.client_service_schedule_total_cancelled, data.client_service_schedule_total_completed];
      
      this.totalShift = data.client_service_schedule_total_available + data.client_service_schedule_total_scheduled + 
      data.client_service_schedule_total_setup + data.client_service_schedule_total_cancelled + data.client_service_schedule_total_completed;
      
    }
  }

}

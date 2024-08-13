import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard-total-enquiry-and-approval',
  templateUrl: './total-enquiry-and-approval.component.html',
  styleUrls: ['./total-enquiry-and-approval.component.scss']
})
export class TotalEnquiryAndApprovalComponent implements OnInit {
  @Input() dashboardData: any;
  @Input() referralData: any;
  
  public defaultImage: string = '/assets/images/icons/user-placeholder.png';
  public totalLeave: number = 0;
  
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
      data: [0,0,0,0],
      backgroundColor: [
        '#5E4EA0',
        '#755CA7',
        '#8575B3',
        '#B3ABD5'
      ],
      hoverBackgroundColor: [
        'rgba(226, 137, 242)',
        'rgb(80, 55, 149)',
        'rgba(176, 133, 255)',
        'rgba(133, 92, 248)'
      ],
      borderWidth: [5, 5, 5, 0],
      hoverOffset: 6,
      borderJoinStyle: 'miter',
      borderAlign: 'center',
      offset: [0, 0, 0, 5],
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
  public doughnutChartLabels: string[] = ['Unpaid', 'Annual', 'Personal', 'Long Service'];

  /* BAR CHART */
  public lineChartOptions: any = {
    plugins: {
      title: {
        //display: true,
        //text: 'Chart.js Bar Chart - Stacked'
      },

      /*tooltips: {
          callbacks: {
              label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`, 
              title: () => null,
          }
      },*/
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      y: {
          display: false // Hide Y axis labels
      },
      x: {
          display: false // Hide X axis labels
      }
    }
  };

  public lineChartType: any = 'line';
  public lineChartLegend = false;

  public lineChartData: any[] = [
    {
      label: 'Rejected',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      fill: true,
      hoverBackgroundColor: 'rgb(255,99,132, 1)',
      backgroundColor: 'rgb(255,99,132, 0.6)',
      borderColor: 'rgb(255,99,132, 1)',
      borderWidth: 1.5,
      pointBorderWidth: 0,
      pointBackgroundColor: 'rgb(255,99,132, 1)',
      pointStyle: 'crossRot',
      tension: 0.3,
    },

    {
      label: 'Approved',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      fill: true,
      //hoverBackgroundColor: 'rgb(255, 215, 16, 1)',
      //backgroundColor: 'rgb(255, 215, 16, 0.7)',
      //borderColor: 'rgb(255, 215, 16, 1)',
      //pointBackgroundColor: 'rgb(255, 215, 16, 1)',

      hoverBackgroundColor: 'rgb(254, 192, 64, 1)',
      backgroundColor: 'rgb(254, 192, 64, 0.7)',
      borderColor: 'rgb(254, 192, 64, 1)',
      pointBackgroundColor: 'rgb(254, 192, 64, 1)',
      borderWidth: 1.5,
      
      pointBorderWidth: 0,
      
      pointStyle: 'crossRot',
      tension: 0.3,
    },

    
  ];

  public lineChartLabels: string[] = ['Jan 1', 'Jan 4', 'Jan 8', 'Jan 12', 'Jan 16', 'Jan 20', 'Jan 24', 'Jan 28', 'Jan 31'];


  constructor() { }

  ngOnInit(): void {
    if(this.dashboardData?.employee_leave){
      let data = this.dashboardData?.employee_leave;
      console.log("GRAPH DATA",data)
      if(data){
        console.log("GRAPH DATA",data)
        this.doughnutChartData[0].data = [data.employee_leave_total_unpaid, data.employee_leave_total_annual, data.employee_leave_total_personal, data.employee_leave_total_long_service]
        this.totalLeave = data.employee_leave_total_unpaid + data.employee_leave_total_annual + data.employee_leave_total_personal + data.employee_leave_total_long_service;
        
      }
    }
  }

}

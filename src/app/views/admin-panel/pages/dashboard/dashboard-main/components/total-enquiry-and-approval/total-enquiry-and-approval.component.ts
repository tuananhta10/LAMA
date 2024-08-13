import { Component, Input, OnInit } from '@angular/core';
import { addDays, format } from 'date-fns';
@Component({
  selector: 'admin-dashboard-total-enquiry-and-approval',
  templateUrl: './total-enquiry-and-approval.component.html',
  styleUrls: ['./total-enquiry-and-approval.component.scss']
})
export class TotalEnquiryAndApprovalComponent implements OnInit {
  @Input() dashboardData: any;
  @Input() referralsData: any;
  @Input() leaveData: any;
  
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
      data: [0.0000000001, 0, 0, 0, 0],
      backgroundColor: [
        '#B3ABD5',
        '#755CA7',
        '#8575B3',
        '#5E4EA0',
        '#abb0d9',
      ],
      hoverBackgroundColor: [
        'rgba(226, 137, 242)',
        'rgb(80, 55, 149)',
        'rgb(176, 133, 255)',
        'rgb(133, 92, 248)',
        'rgb(171, 176, 217)'
      ],
      borderWidth: [5, 5, 5, 5, 0],
      hoverOffset: 6,
      borderJoinStyle: 'miter',
      borderAlign: 'center',
      offset: [0, 0, 0, 5],
      cutout: ['70%', '70%', '70%', '50%', '50%'],
      animation: {
        animateRotate: true,
      },
      spacing: 0
    },

  ];
  public doughnutChartLabels: string[] = ['Unpaid', 'Annual', 'Personal', 'Long Service', 'Sick'];

  constructor() { }

  ngOnInit(): void {

    console.log(this.leaveData)

    
  }

  calculateTotalLeave(leaveData){
    this.totalLeave = leaveData?.annual_leave +
    leaveData?.long_service_leave +
    leaveData?.personal_leave +
    leaveData?.sick_leave +
    leaveData?.unpaid_leave 

    if(this.leaveData && this.totalLeave > 0){
      let data = this.leaveData;

      this.doughnutChartData[0].data = [
        data?.unpaid_leave, 
        data?.annual_leave, 
        data?.personal_leave, 
        data?.long_service_leave, 
        data?.sick_leave, 
      ]; 
    }
  }
}

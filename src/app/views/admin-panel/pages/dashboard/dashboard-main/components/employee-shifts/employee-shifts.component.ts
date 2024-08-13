import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { DashboardActionTypes } from '@main/views/admin-panel/store/actions/admin-dashboard.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

@Component({
  selector: 'admin-dashboard-employee-shifts',
  templateUrl: './employee-shifts.component.html',
  styleUrls: ['./employee-shifts.component.scss']
})
export class EmployeeShiftsComponent implements OnInit {
  @Input() dashboardData: any;

  public totalShift: number = 0;

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
      label: 'Employee Shift',
      data: [0.0000000001, 0, 0, 0],
      backgroundColor: [
        '#B3ABD5',
        '#755CA7',
        '#8575B3',
        '#5E4EA0',
      ],
      hoverBackgroundColor: [
        'rgba(226, 137, 242, 1)',
        'rgba(80, 55, 149, 1)',
        'rgba(176, 133, 255, 1)',
        'rgba(133, 92, 248, 1)', 
      ],
      borderWidth: [5, 5, 5, 0],
      hoverOffset: 6,
      borderJoinStyle: 'miter',
      borderAlign: 'center',
      offset: [0, 0, 0, 8],
      cutout: ['70%', '70%', '70%', '50%'],
      animation: {
        animateRotate: true,
      },
      spacing: 0
    },

  ];
  public doughnutChartLabels: string[] = ['Scheduled', 'Unassigned', 'Completed', 'Cancelled'];

  /* CLIENT/ PARTICIPANTS */
  public totalClient: number = 0;

  /* PIE CHART */
  public doughnutChartClientOptions: any = {
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
  
  public doughnutChartClientType: any = 'doughnut';
  public doughnutChartClientLegend = false;
  public doughnutChartClientData: any[] = [
    { 
      label: 'Employee Shift',
      data: [0.0000000001, 0, 0],
      backgroundColor: [
        '#B3ABD5',
        '#755CA7',
        '#8575B3',
        '#5E4EA0',
      ],
      hoverBackgroundColor: [
        'rgba(226, 137, 242, 1)',
        'rgba(80, 55, 149, 1)',
        'rgba(176, 133, 255, 1)',
        'rgba(133, 92, 248, 1)', 
      ],
      borderWidth: [5, 5, 5, 0],
      hoverOffset: 6,
      borderJoinStyle: 'miter',
      borderAlign: 'center',
      offset: [0, 0, 0, 8],
      cutout: ['70%', '70%', '70%', '50%'],
      animation: {
        animateRotate: true,
      },
      spacing: 0
    },

  ];
  public doughnutChartClientLabels: string[] = ['Active', 'Pending', 'Inactive'];
  public loadingClient: boolean = true;

  constructor(private router: Router, private adminTaskDashboard: Store<AdminProfileState>) { 
    this.shiftData$ = this.adminTaskDashboard.pipe(select(state => state));

  }

  ngOnInit(): void {
    //console.log("SCHEDULE", this.dashboardData)

    this.subscribeToShift();

    this.adminTaskDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT
    });

    this.adminTaskDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS
    });
  }

  private shiftData$: any
  private req: Subscription;
  public loading: any;
  public shiftData: any;
  public clientData: any;

  subscribeToShift(){
    this.req =  this.shiftData$.subscribe((result: any) => {
      this.loading = result?.dashboard?.pendingShift;
      this.loadingClient = result?.dashboard?.clientPending;

      if (result?.dashboard?.employeeShift?.length > 0) {
        let data = result?.dashboard?.employeeShift[0];

        if(data?.total_schedule > 0){
          this.shiftData = data;
          this.doughnutChartData[0].data = [data?.scheduled, data?.unassigned, data?.completed, data?.cancelled];  
          this.totalShift = this.doughnutChartData[0]?.data?.reduce((a,b) => a + b);
        }
      }

      //console.log(result?.dashboard)

      if (result?.dashboard?.clientSummary?.length > 0) {
        let data = result?.dashboard?.clientSummary[0];

        if(data?.total_client > 0){
          this.clientData = data;
          this.doughnutChartClientData[0].data = [data?.active, data?.pending, data?.inactivate];  
          this.totalClient = this.doughnutChartClientData[0]?.data?.reduce((a,b) => a + b);
        }
        
      }
    })

    /**/
  }


  redirectToScheduleBoard(){
    sessionStorage.setItem('groupingSchedule', "Employee");
    // this.router.navigate(['/admin/schedule'])
    this.router.navigate(['/admin/employees/employee-shift'])
  }

  redirect(route:string){
    sessionStorage.setItem('groupingSchedule', "Employee");
    // this.router.navigate(['/admin/schedule'])
    this.router.navigate([route])
  }
}

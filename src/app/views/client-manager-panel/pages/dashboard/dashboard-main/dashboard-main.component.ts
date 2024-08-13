import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { DashboardActionTypes } from '@main/views/admin-panel/store/actions/admin-dashboard.action';
import { Subject, Subscription } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-dashboard-main',
  animations: [mainAnimations],
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  public loading: boolean = true;
  public selected: Date | null;
  public defaultImage: string = '/assets/images/icons/user-placeholder.png';
  public dateToday: any = new Date();
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  private dashboardData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  dashboardData: any = {};
  incidentGraphData: any = {};
  taskData: any = {};
  referralsData: any = {};
  
  private currentDate = moment();
  public dateRange: any = {
    start_date: moment(this.currentDate.startOf('week').isoWeekday('Monday')).format("X"),  
    end_date: moment(this.currentDate.endOf('week').isoWeekday('Sunday')).format("X")
  }
  
  constructor(private adminDashboard: Store<AdminProfileState>) { }

  ngOnInit(): void {
    this.getDashboard();
    this.dashboardData$ = this.adminDashboard.pipe(select(state => state.dashboard));

    this.req =  this.dashboardData$.subscribe((dashboard: any) => {
      this.loading = dashboard.pending;
      
      if(Object.keys(dashboard.statistics).length > 0){
        this.dashboardData = dashboard.statistics;
      }

      if(Object.keys(dashboard.incident).length > 0){
        this.incidentGraphData = dashboard.incident;
      }
    })
  }

  getDashboard(){
    var date = new Date();

    this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_STATISTIC,
      payload: {
        year: date.getFullYear(),
        month: date.getMonth() + 1
      }
    }); 

    this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_INCIDENT,
    }); 

    this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_REFERRALS,
      payload: {
        year: date.getFullYear(),
        month: date.getMonth() + 1
      }
    }); 
  }
}

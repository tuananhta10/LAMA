import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { DashboardActionTypes } from '@main/views/admin-panel/store/actions/admin-dashboard.action';
import { Subject, Subscription } from 'rxjs';
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { WelcomeDialogComponent } from './components/welcome-dialog/welcome-dialog.component';
import moment from 'moment';
import {format} from 'date-fns'
import { OrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-organization.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { AdminXeroAuthService } from '@main/shared/services/admin-panel/admin-xero-auth.service';

@Component({
  selector: 'app-dashboard-main',
  animations: [mainAnimations],
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public selected: Date | null;
  public defaultImage: string = '/assets/images/icons/user-placeholder.png';
  public dateToday: any = new Date();
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  private dashboardData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public dashboardData: any = {};
  public incidentGraphData: any = {};
  public taskData: any = {};
  public referralsData: any = {};
  
  private currentDate = moment();
  public dateRange: any = {
    start_date: moment(this.currentDate.startOf('week').isoWeekday('Monday')).format("X"),  
    end_date: moment(this.currentDate.endOf('week').isoWeekday('Sunday')).format("X")
  }

  public supportWorkerMetrics: any;  
  public IncidentMetrics: any;  
  public fundingMetrics: any;
  public leaveData: any;
  public screenWidth: any;

  public subscriptionStatus:any = {}
  public organizationSubscriptionStatus:any = {}

  private organizationData$: any;
  public organizationData: any = {};
  private orgId:number

  public orgLoading:boolean = false

  private organizationStatus = {
    1: "Founder",
    2: "Early adopter",
    3: "Regular",
    4: "Trial",
  }
  
  constructor(private loginService: LoginAuthenticationService,
    private subscriptionXeroService:AdminXeroAuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminDashboard: Store<AdminProfileState>) { 
    this.screenWidth = window.innerWidth;
    this.orgId = this.loggedUser?.organization_id;
  }

  // on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  groupByStatus(arr: any[]){
    return [...arr].reduce((acc, obj) => {
      const { status } = obj;
      // Check if the status exists as a key in the accumulator
      if (!acc[status?.split(/\s/gi).join('_')?.toLowerCase()]) {
        // If it doesn't exist, create a new array with the current object
        acc[status?.split(/\s/gi).join('_')?.toLowerCase()] = [obj];
      } else {
        // If it exists, push the current object to the existing array
        acc[status?.split(/\s/gi).join('_')?.toLowerCase()].push(obj);
      }

      return acc;
    }, {});

  }

  ngOnInit(): void {
    this.getDashboard();
    this.subscribeOrganization()
    this.dashboardData$ = this.adminDashboard.pipe(select(state => state.dashboard));

    this.req =  this.dashboardData$.subscribe((dashboard: any) => {
      setTimeout(() => {
        this.loading = dashboard.pending;
      }, 2000);

      // Leave Period
      if(Object.keys(dashboard?.leavePeriod)?.length > 0){
        console.log("LEAVE", dashboard?.leavePeriod)
        this.leaveData = dashboard?.leavePeriod[0];
      }

      // FUNDING METRIC
      if(Object.keys(dashboard?.statistics)?.length > 0){
        let funding_budget = dashboard?.statistics.filter(el => {
          let start_date = new Date(el?.date_updated * 1000);
          const currentYear = new Date().getFullYear();

          return start_date.getFullYear() === currentYear;
        });

        let currentMonth = funding_budget.filter(el => {
          let start_date = new Date(el?.date_updated * 1000);
          let end_date = new Date(el?.date_updated * 1000);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          return ((start_date.getMonth() === currentMonth /*&& end_date.getMonth() <= currentMonth*/)) && start_date.getFullYear() === currentYear;
        });

        let total_publish = funding_budget?.length //.map(el => el?.budget).reduce((a,b) => a + b);  
        let current_month_publish = currentMonth?.length //.map(el => el?.budget).reduce((a,b) => a + b);
        let funding_percent = (current_month_publish / total_publish) * 100;
        let fundingMetrics = {
          total_publish: total_publish,
          current_month_publish: current_month_publish,
          funding_percent: funding_percent
        }

        this.fundingMetrics = fundingMetrics;
      }

      if(Object.keys(dashboard?.SupportWorkerMetric)?.length > 0){
        this.supportWorkerMetrics = dashboard?.SupportWorkerMetric[0];
      }

      // INCIDENT METRIC
      if(Object.keys(dashboard?.incidentMetric)?.length > 0){
        //Incidents = Number of open Incidents | % = Open Incidents / Total incidents for the month
        const currentMonthIncident = dashboard.incidentMetric.filter(el => {
          let date_received = new Date(el?.date_received * 1000);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          return (date_received.getMonth() >= currentMonth) && date_received.getFullYear() === currentYear;
        });

        const groupedData = this.groupByStatus(currentMonthIncident);
        let total = 0;

        // count total
        Object.keys(groupedData).forEach(key => total += groupedData[key].length || 0);

        let incidentMetric;

        if(!isNaN(total)){
          incidentMetric = {
            open: `${(groupedData?.open?.length || 0)}/${total}`,
            percentage: ((groupedData?.open?.length || 0) / total) * 100,  
            total_incident: total
          }
        }

        else {
          incidentMetric = {
            open: `0/0`,
            percentage: 0,  
            total_incident: 0
          }
        }

        this.IncidentMetrics = incidentMetric;
      }

      // INCIDENT GRAPH
      if(Object.keys(dashboard?.incidentMetric)?.length > 0){
        const currentMonthIncident = dashboard.incidentMetric
        .filter(el => el?.status !== 'Referred' && el?.status !== 'No Actions Required')
        .filter(el => {
          let date_received = new Date(el?.date_received * 1000);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          return (date_received.getMonth() >= currentMonth) && date_received.getFullYear() === currentYear;
        })
        .sort((a, b) => {
          let dateA: any = new Date(a.date_received * 1000);
          let dateB: any = new Date(b.date_received * 1000);
          
          return dateA - dateB;
        });

        const groupedData = this.groupByStatus(currentMonthIncident.map(el => {
          return {
            id: el?.id,  
            status: el?.status,  
            date_updated: el?.date_updated,  
            date_received: el?.date_received
          }
        }));

        // Create an empty object to store the regrouped data
        const regroupedData = {};

        // Iterate over the original data object
        for (const status in groupedData) {
          if (groupedData.hasOwnProperty(status)) {
            const entries = groupedData[status?.toLowerCase()];
            // Iterate over the entries for each status
            for (const entry of entries) {
              const dateReceived = format(new Date(entry.date_received * 1000), 'MMM dd');
              // Check if the dateReceived key exists in the groupedData object
              if (!regroupedData[dateReceived]) {
                // If the key doesn't exist, create a new object to store the status counts
                regroupedData[dateReceived] = {};
              }
              // Get the status of the current entry
              const currentStatus = entry.status?.toLowerCase();
              // Check if the status key exists within the date entry
              if (!regroupedData[dateReceived][currentStatus]) {
                // If the key doesn't exist, initialize the count to 1
                regroupedData[dateReceived][currentStatus] = 1;
              } else {
                // If the key exists, increment the count
                regroupedData[dateReceived][currentStatus]++;
              }
            }
          }
        }

        this.incidentGraphData = regroupedData;
      }

      this.referralsData = dashboard?.referrals;
    });

    // sync
    this.syncDefaultValue();
    //this.openWelcomeDialog();
  }

  openWelcomeDialog(){
    if(this.loggedUser?.new_organization === 'Newly Registered'){
      let dialog = this.dialog.open(
        WelcomeDialogComponent,
        { 
          width: '65vw',
          data: {}
        }
      );

      dialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
      localStorage.setItem('welcomeDialogOpened', 'true')
    }
  }

  syncDefaultValue(){
    if(!this.loggedUser?.organization_is_completed && this.loggedUser?.role_title === 'Lama Admin'){
      this.snackBar.open(`Please wait while we sync the default settings or value for this newly setup organization.`, ' ', {
        panelClass: 'success-snackbar'
      });

      // refresh page if data cannot be sync
      setTimeout(() => {
        if(!this.loggedUser['organization_is_completed']){
          window.location.reload();
        }
      }, 5000);

      this.loginService.syncDefaultValue().subscribe((result) => {
        if(result?.data?.is_completed){ // missing on first call
          this.loggedUser['organization_is_completed'] = true;
          localStorage.setItem('loggedUserData', JSON.stringify(this.loggedUser));

          setTimeout(() => {
            this.snackBar.open(`Default settings has been successfully setup. You can now start using LAMA`, ' ', {
              panelClass: 'success-snackbar',
              duration: 5000
            });

            window.location.reload();
          }, 2000)
        }
      }, err => {
        this.snackBar.open(`There has been an error with syncing to default settings. Please contact your database administrator.`, ' ', {
            panelClass: 'danger-snackbar',
            duration: 5000
          });
      });
    }

    else {
      const isAlreadyOpened = localStorage.getItem('welcomeDialogOpened') || false
      

      if(!!isAlreadyOpened) return
      
      this.openWelcomeDialog();
      
    }
  }

  getOrganizationById(){
    this.adminDashboard.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION,
      payload: this.orgId
    }); 
  }

  subscribeOrganization(){
    this.organizationData$ = this.adminDashboard.pipe(select(state => state.organization));

    this.organizationData$.pipe(takeUntil(this.unsubscribe$)).subscribe((organization: any) => {
      this.orgLoading = organization.pending;

      if(organization.organization){
        this.organizationData = organization.organization;
        this.organizationSubscriptionStatus = this.organizationStatus[organization?.organization.subscription_type ? organization?.organization.subscription_type : 4]
        if(this.organizationSubscriptionStatus === 'Trial'){
          this.trialLogic(this.organizationData)
        }
      }


      if(organization.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminDashboard.dispatch({
          type: OrganizationActionTypes.SAVE_ORGANIZATION_FAIL,
          payload: null
        }); 

        this.adminDashboard.dispatch({
          type: OrganizationActionTypes.EDIT_ORGANIZATION_FAIL,
          payload: null
        }); 
      }
    })
  }

  trialLogic(data:any){
    const dateExpiration = data?.expiration_date ? data?.expiration_date : this.getPlusDateByStartDate(data?.date_added) ;

    const currentDate = new Date().getTime();
    const msInDay = 24 * 60 * 60 * 1000;
    let daysLeft:number = 0

    if(typeof dateExpiration === 'number'){
      daysLeft =  Math.ceil(((dateExpiration * 1000) - currentDate) / msInDay);
    }

    if(typeof dateExpiration === 'string'){
      const expiryAsDate = convertTimestampUtc(new Date(dateExpiration)) 
      daysLeft =  Math.ceil(((expiryAsDate * 1000) - currentDate) / msInDay);
    }

    if (daysLeft <= 5 && daysLeft > 0) {
        this.subscriptionStatus = {status: 'expiring', daysLeft:daysLeft};
    } else if (daysLeft === 0) {
        this.subscriptionStatus = {status: 'expired', daysLeft:daysLeft};
    } else if (daysLeft < 0) {
        this.subscriptionStatus = {status: 'expired', daysLeft:daysLeft};
    } else {
        this.subscriptionStatus = {status: 'active', daysLeft:daysLeft};
    }
  }

  getPlusDateByStartDate(dateAdded:any){

    
    // const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const additionalDaysInSeconds = 14 * 24 * 60 * 60;

    const newTimestamp = dateAdded + additionalDaysInSeconds;


    return newTimestamp
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getDashboard(){
    var date = new Date();

    this.getOrganizationById()
    
    this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_STATISTIC,
      payload: {
        year: date.getFullYear(),
        month: date.getMonth() + 1
      }
    }); 

    // Incident Metrics
    this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS,
    }); 

    // Careworker Metrics
    this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_SW_METRICS,
    }); 

    this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD,
    }); 

    // Incident Graph
    /*this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_INCIDENT,
    }); */

    // Referrals Graph
    this.adminDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_REFERRALS,
      payload: {
        year: date.getFullYear(),
        month: date.getMonth() + 1
      }
    }); 
  }

  upgradePlan(): void {
    this.snackBar.open(`Upgrading in progress, please wait.`, ' ', {
      panelClass: 'success-snackbar'
    });
    this.subscriptionXeroService.xeroUpgradePlan(this.organizationData.id ? this.organizationData.id : this.orgId)
      .subscribe({
        next:(value:any) => {
          console.log(value)


          if(value && (value?.invoiceUrl && !value?.hasErrors)) {
            this.snackBar.open(`You will now redirecting to upgrade page.`, `Upgrade page not loading?, try to temporarily disable your ad blocker and try again`, {
              panelClass: 'success-snackbar'
            });
            setTimeout(() => {
              window.open(value?.invoiceUrl, '_blank')
            }, 1000);
          }else{
            this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
              duration: 4000,
              panelClass:'danger-snackbar'
            });
          }

          
        },
        error:err => {
          console.log(err)
          this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
            duration: 4000,
            panelClass:'danger-snackbar'
          });
        }
      })
  }
}

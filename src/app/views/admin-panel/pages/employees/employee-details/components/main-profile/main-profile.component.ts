import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';

import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import moment from 'moment';

interface NavChildLink{
  routerLink: string,
  title: string
}

@Component({
  selector: 'employee-main-profile',
  animations: [mainAnimations],
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss']
})
export class MainProfileComponent implements OnInit {
  @Input() loading: boolean = true;
  private employeesData$: any;
  private employee$: any;
  private req: Subscription;
  
  public employeeData: any = null;
  public employeeDataMain: any = {};
  public id: any = '';
  public childLinks: NavChildLink[] = [];

  private currentDate = moment().add(7, 'days');
  public dateRange: any = {
    start_range: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
    end_range: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
  }

  constructor(private employeeListStore: Store<EmployeeListState>,
    private employeeStore: Store<EmployeeState>,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }

  setDate(date){
    return new Date(date)
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
    this.subscribeEmployee();
    this.getEmployee();
    this.getEmployeeStats();

    // check for roles update
    if(sessionStorage.getItem('passwordChange')){
      this.snackBar.open("Successfully updated the access of this employee!", "", {
        duration: 4000,
        panelClass:'success-snackbar'
      });
      sessionStorage.removeItem('passwordChange');
    }

    this.childLinks = [
      {
        routerLink: `/admin/employees/details/${this.id}/careworker-client`,
        title: 'Participants',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/service-details`,
        title: 'Employment',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/workdays`,
        title: 'Availability',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/contact-details`,
        title: 'Contact Details',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/related-documents`,
        title: 'Documents',
      },
    ];
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // employee details
  getEmployeeDetails(): void{
    // extract id
    this.req = this.route.params.subscribe((params: any) => this.id = params['id']);

    this.childLinks = [
      {
        routerLink: `/admin/employees/details/${this.id}/careworker-client`,
        title: 'Current Clients',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/service-details`,
        title: 'Service Details',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/workdays`,
        title: 'Availability',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/contact-details`,
        title: 'Contact Details',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/related-documents`,
        title: 'Documents',
      },
    ];
  }

  subscribeEmployee(){
    this.employeesData$.subscribe((results) => {
      this.employeeDataMain = results?.employees?.employeeList[0];
      //console.log("details", this.employeeDataMain )
    });

    this.req = this.employee$.subscribe((results: any) => {
      //console.log("Profile Details", results?.employee)
      this.loading = results?.pending;
      if(results?.employee?.profileEmployeeDetail){
        this.employeeData = results?.employee?.profileEmployeeDetail;
      }

      if(results?.successPassword){
        setTimeout(() => {
          sessionStorage.setItem('passwordChange', "true");
          window.location.reload();
        }, 200);
      }

      if(results?.successQualification){
        this.snackBar.open(results.successQualification, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.employeeStore.dispatch({
          type: EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION_SUCCESS,
          payload: {message: null}
        }); 

        this.getEmployee();
        this.getEmployeeStats();
      }

      if(results.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.employeeStore.dispatch({
          type: EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION_FAIL,
          payload: null
        }); 
      }

      this.loading = results?.pending;
    });
  }

  getEmployee(){
    let data = {
      type: 'profile-employee-detail',
      id: this.id,
      key: 'profileEmployeeDetail'
    }
    this.employeeStore.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: data
    });
  }

  getEmployeeStats(){
    let data = {
      range_start: convertTimestampUtc(this.dateRange.start_range),
      id: this.id,
      range_end: convertTimestampUtc(this.dateRange.end_range)
    }
    this.employeeStore.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE_STATS,
      payload: data
    });
  }
}

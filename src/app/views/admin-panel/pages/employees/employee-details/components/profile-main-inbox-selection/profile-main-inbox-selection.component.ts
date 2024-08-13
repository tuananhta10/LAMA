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
import { EmployeeList } from '../../../employee-main/utils/employee-list-model';
import { displayedColumnsClients,
  selectedColumnsClients,
  selectedColumnsMobileClients,
  tableController
 } from '../../../employee-main/utils/employee-list-actions-model';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import moment from 'moment';
import { Location } from '@angular/common';
import { AddProfileEmailComponent } from '../../dialogs/add-profile-email/add-profile-email.component';  
import { AddProfileSmsComponent } from '../../dialogs/add-profile-sms/add-profile-sms.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

interface NavChildLink{
  step: number,
  title: string
}

@Component({
  selector: 'app-profile-main-inbox-selection',
  animations: [mainAnimations],
  templateUrl: './profile-main-inbox-selection.component.html',
  styleUrls: ['./profile-main-inbox-selection.component.scss']
})
export class ProfileMainInboxSelectionComponent implements OnInit {
  private employeesData$: any;
  private employee$: any;
  private clientsData$: any;
  private req: Subscription;
  private currentDate = moment().add(7, 'days');
  private unsubscribe$ = new Subject<void>();

  public employeeData: any;
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public childLinks: NavChildLink[] = [ ];
  public stepper: number = 1;
  public contactDetails: any = {};
  public dateRange: any = {
    start_range: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
    end_range: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
  }

  constructor(private employeeListStore: Store<EmployeeListState>,
    private employeeStore: Store<EmployeeState>,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) { 
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));

    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  back(){
    this.location.back();
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
    this.subscribeEmployee();
    this.getEmployee();

    this.childLinks = [
      {
        step: 1,
        title: 'Email',
      },

      {
        step: 2,
        title: 'SMS',
      },
    ];
  }

  // employee details
  getEmployeeDetails(): void{
    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      if(results){
        // from ngrx store
        this.employeeData = results?.employees.employeeList.find(el => el?.id == this.id);
      }
    });
  }

  subscribeEmployee(){
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    this.req = this.employee$.subscribe((results: any) => {
      if(results?.employee?.contactDetail){
        this.contactDetails = results?.employee?.contactDetail;
      }
      this.loading = results?.pending;
    })
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

  addNewEmail(){
    let dialog = this.dialog.open(
      AddProfileEmailComponent,
      { 
        minWidth: '85vw',
        data: {
          employee: this.employeeData
        }
      }
    );

    dialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  addNewSms(){
    let dialog = this.dialog.open(
      AddProfileSmsComponent,
      { 
        minWidth: '75vw',
        data: {
          employee: this.employeeData
        }
      }
    );

    dialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}

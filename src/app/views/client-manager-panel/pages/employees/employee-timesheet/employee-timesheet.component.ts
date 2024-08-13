import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
  Observable,
  forkJoin,
  combineLatest,
  zip
} from 'rxjs';
import {
  select,
  Store
} from '@ngrx/store';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState } from '@app-admin-store/reducers/admin-employees.reducer';
import {
  displayedColumns,
  TableHeader,
  employeeTimesheetList,
  selectedColumns,
  EmployeeTimesheet
} from './utils/employee-timesheet-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { AddTimesheetComponent } from './dialogs/add-timesheet/add-timesheet.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeTimesheetActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-timesheet.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';

@Component({
  selector: 'app-employee-timesheet',
  animations: [mainAnimations],
  templateUrl: './employee-timesheet.component.html',
  styleUrls: ['./employee-timesheet.component.scss']
})
export class EmployeeTimesheetComponent implements OnInit {


  // private employeesData$: any;
  employeeList: any[];
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  // public employeeTimesheetData$: any;
  public employeeData: any;
  public displayedColumns: TableHeader[] = displayedColumns;
  public employeeTimesheetList: EmployeeTimesheet[] = [];
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id,
      employee_name: el.employee_name,
      timesheet_from: el.timesheet_from,
      timesheet_to: el.timesheet_to,
      timesheet_reason: el.timesheet_reason,
      status: el.status,
    };
  }
  employeeTimesheetData$ = this.adminEmployeeTimesheet.pipe(select(state => state.employeeTimesheet));

  employeesData$ : Observable<any> = this.employeeListStore.pipe(select(state => state));
  

  constructor(private employeeListStore: Store<EmployeeListState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private adminEmployeeTimesheet: Store<AdminProfileState>,
    private route: ActivatedRoute) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];


    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getEmployeeTimesheets();
    this.getEmployeeList();
    this.getClientList();
    
 
    this.req = this.employeeTimesheetData$.subscribe((employeeTimesheet: any) => {
      this.loading = employeeTimesheet?.pending;

     

      if (employeeTimesheet?.employeeTimesheetList.length > 0) {
        // employeeTimesheet.employeeTimesheetList.forEach(element => {
        //   element.start_date = this.convertToDate(element.start_date);
        //   element.end_date = this.convertToDate(element.end_date);
        // });
        this.employeeTimesheetList = employeeTimesheet.employeeTimesheetList;
      }

      if (employeeTimesheet?.success) {
        this.snackBar.open(employeeTimesheet.success, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });

        this.adminEmployeeTimesheet.dispatch({
          type: EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET_SUCCESS,
          payload: { message: null }
        });

        this.adminEmployeeTimesheet.dispatch({
          type: EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET_SUCCESS,
          payload: { message: null }
        });

        this.getEmployeeTimesheets();
      }

      if (employeeTimesheet?.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        this.adminEmployeeTimesheet.dispatch({
          type: EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET_FAIL,
          payload: null
        });

        this.adminEmployeeTimesheet.dispatch({
          type: EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET_FAIL,
          payload: null
        });
      }
    })

    // //Subscribe to storage
    // this.req = this.employeesData$.subscribe((results: any) => {
    //   console.log(results)

    //   if(results){
    //    // from ngrx store
    //     this.employeeData = results?.employees.employeeList.find(el => el?.id ==  this.id);

    //     if(this.employeeData){
    //       this.employeeTimesheetList = this.employeeTimesheetList.map((el: any) => {
    //         el["employee_name"] = `${this.employeeData.first_name} ${this.employeeData.last_name}`;

    //         return el;
    //       });
    //     }

    //     setTimeout(() => {
    //       this.loading = false;
    //     }, 1000);
    //   }
    // });

  }


  getData(event) {
    this.employeeList = event.employees.employeeList.map(emp => {
      return {
        ...emp, employee_name: emp.first_name + ' ' + emp.last_name
      }
    });
  }


  convertToDate(dateTime) {
    return new Date(dateTime * 1000)
  }


  getEmployeeTimesheets() {
    this.adminEmployeeTimesheet.dispatch({
      type: EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST
    });
  }

  getEmployeeList(){
    this.adminEmployeeTimesheet.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
  }

  getClientList(){
    this.adminEmployeeTimesheet.dispatch({
      type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST
    });
  }

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event) {
    if (event) {
      this.openAddEmployeeTimesheet(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog(event) {
    if (event) {
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        {
          minWidth: '30vw',
          data: event?.data,
        }
      );

      deleteDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.data || (result && !result.cancel && event?.data)) {
            this.adminEmployeeTimesheet.dispatch({
              type: EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET,
              payload: [result?.data || event?.data]
            });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }


  openAddEmployeeTimesheet(data?: any) {
    let addEmployeeTimesheet = this.dialog.open(
      AddTimesheetComponent,
      {
        minWidth: '45vw',
        //maxHeight: '95vh',
        data: data
      }
    );

    addEmployeeTimesheet
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        console.log(result)
      });
  }

}

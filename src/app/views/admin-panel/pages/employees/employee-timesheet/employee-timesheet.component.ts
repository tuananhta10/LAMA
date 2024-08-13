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
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { format } from 'date-fns';

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
  public loadingSchedule: boolean = true;
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
  
  private clientScheduleList$: any;

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
        employeeTimesheet.employeeTimesheetList.forEach(element => {
          element.time_in = this.convertTo12Hrs(element?.employee_timesheet_start_time);
          element.time_out = this.convertTo12Hrs(element?.employee_timesheet_end_time);

          let start_date = new Date(element?.client_service_schedule_start_date * 1000)
          let start_time = this.convertTo12Hrs(element?.client_service_schedule_start_time);
          let end_time = this.convertTo12Hrs(element?.client_service_schedule_end_time);

          element.calendar_schedule = `${format(start_date, 'MMM dd,yyyy')}, ${start_time} - ${end_time}`;
        });
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
    });

    this.clientScheduleList$ = this.adminEmployeeTimesheet.pipe(select(state => state.clientServiceSchdule.clientServiceScheduleList))
    .subscribe((serviceSchedule: any) => {
      this.loadingSchedule = serviceSchedule.pending;
    });
  }

  convertTo12Hrs(time) {
    if(!time) return;

    // Check correct time format and split into components
    time = time?.substr(0,5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
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
          console.log(result)

          if (result?.data || (result && !result.cancel && event?.data)) {
            this.adminEmployeeTimesheet.dispatch({
              type: EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET,
              payload: [result?.data?.employee_timesheet_id || event?.data?.employee_timesheet_id]
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
        width: '100vw',
        //maxWidth: '800px',
        maxHeight: '95vh',
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

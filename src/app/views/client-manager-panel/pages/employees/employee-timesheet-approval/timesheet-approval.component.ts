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
  EmployeeTimesheet,
  selectedColumns,
  employeeTimesheetList
} from './utils/timesheet-approval-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { ViewTimesheetComponent } from './dialogs/view-timesheet/view-timesheet.component';
import { ApproveDeclineTimesheetComponent } from './dialogs/approve-decline-timesheet/approve-decline-timesheet.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { TimesheetApprovalActionTypes } from '@main/views/admin-panel/store/actions/admin-timesheet-approval.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { format } from 'date-fns';

@Component({
  selector: 'app-timesheet-approval',
  animations: [mainAnimations],
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss']
})
export class TimesheetApprovalComponent implements OnInit {
// private employeesData$: any;
  employeeList: any[];
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public loadingSchedule: boolean = true;
  public id;

  // public timesheetApprovalData$: any;
  public employeeData: any;
  public displayedColumns: TableHeader[] = displayedColumns;
  public timesheetApprovalList: EmployeeTimesheet[] = [];
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

  timesheetApprovalData$ = this.adminTimesheetApproval.pipe(select(state => state.timesheetApproval));
  //employeesData$ : Observable<any> = this.employeeListStore.pipe(select(state => state));
  
  private clientScheduleList$: any;

  constructor(private employeeListStore: Store<EmployeeListState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private adminTimesheetApproval: Store<AdminProfileState>,
    private route: ActivatedRoute) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];


    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getTimesheetApprovals();
 
    this.req = this.timesheetApprovalData$.subscribe((timesheetApproval: any) => {
      this.loading = timesheetApproval?.pending;

      if (timesheetApproval?.timesheetApprovalList.length > 0) {
        timesheetApproval.timesheetApprovalList.forEach(element => {
          element.time_in = this.convertTo12Hrs(element?.employee_timesheet_start_time);
          element.time_out = this.convertTo12Hrs(element?.employee_timesheet_end_time);

          let start_date = new Date(element?.client_service_schedule_start_date * 1000)
          let start_time = this.convertTo12Hrs(element?.client_service_schedule_start_time);
          let end_time = this.convertTo12Hrs(element?.client_service_schedule_end_time);

          element.calendar_schedule = `${format(start_date, 'MMM dd,yyyy')}, ${start_time} - ${end_time}`;
        });
        this.timesheetApprovalList = timesheetApproval.timesheetApprovalList;

        if(this.id){
          console.log(this.id)
          this.timesheetApprovalList = this.timesheetApprovalList.filter(el => this.id == el?.employee_id);
        }
      }

      if (timesheetApproval?.success) {
        this.snackBar.open(timesheetApproval.success, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });

        this.adminTimesheetApproval.dispatch({
          type: TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_SUCCESS,
          payload: { message: null }
        });

        this.adminTimesheetApproval.dispatch({
          type: TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_SUCCESS,
          payload: { message: null }
        });

        this.getTimesheetApprovals();
      }

      if (timesheetApproval?.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        this.adminTimesheetApproval.dispatch({
          type: TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_FAIL,
          payload: null
        });

        this.adminTimesheetApproval.dispatch({
          type: TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_FAIL,
          payload: null
        });
      }
    });

    this.clientScheduleList$ = this.adminTimesheetApproval.pipe(select(state => state.clientServiceSchdule.clientServiceScheduleList))
    .subscribe((serviceSchedule: any) => {
      this.loadingSchedule = serviceSchedule.pending;
    });
  }


  getData(event) {
    this.employeeList = event.employees.employeeList.map(emp => {
      return {
        ...emp, employee_name: emp.first_name + ' ' + emp.last_name
      }
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

  convertToDate(dateTime) {
    return new Date(dateTime * 1000)
  }


  getTimesheetApprovals() {
    this.adminTimesheetApproval.dispatch({
      type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST
    });
  }

  getEmployeeList(){
    this.adminTimesheetApproval.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
  }

  getClientList(){
    this.adminTimesheetApproval.dispatch({
      type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST
    });
  }

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event) {
    if (event) {
      this.openAddTimesheetApproval(event?.data);
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
            // this.adminTimesheetApproval.dispatch({
            //   type: TimesheetApprovalActionTypes.,
            //   payload: [result?.data || event?.data]
            // });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }


  openAddTimesheetApproval(data?: any) {
    console.log(data)

    let addTimesheetApproval = this.dialog.open(
      ViewTimesheetComponent,
      {
        minWidth: '75vw',
        maxWidth: '800px',
        maxHeight: '95vh',
        data: data
      }
    );

    addTimesheetApproval
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

        console.log(result)
      });
  }


  approveDeclineTimesheet(data?: any) {
    let approveDeclineTimesheet = this.dialog.open(
      ApproveDeclineTimesheetComponent,
      {
        //minWidth: '30vw',
        maxHeight: '95vh',
        data: data
      }
    );

    approveDeclineTimesheet
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          let body = {
            "id": result?.data[0]?.employee_timesheet_id,  
            "employee-timesheet": {
              "update": [
                ...result?.data.map(el => {
                  return {
                    "id": el?.employee_timesheet_id,  
                    "client_service_schedule_id": el?.client_service_schedule_id,
                    "approved": result?.approved_decline === 'approve' ? true : false,
                    "update_shift_time": el?.update_shift_time,
                    "update_transport_km": el?.update_transport_km,
                    "update_travel_km": el?.update_travel_km,
                    "update_travel_time": el?.update_travel_time,
                    "used_company_car": el?.used_company_car,
                  }
                })
              ]
            }
          }

          console.log(body)

          this.adminTimesheetApproval.dispatch({
            type: TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET,
            payload: body
          });
        }
      });
  }
}

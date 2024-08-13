import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
import { 
  displayedColumns,
  TableHeader,
  EmployeeShift,
  selectedColumns,
  employeeShiftList 
} from './utils/employee-shift-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { AddEmployeeShiftComponent } from './dialogs/add-employee-shift/add-employee-shift.component';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeShiftActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-shift.action';
import { parseArrayObject } from '@main/shared/utils/parse.util';
import { Location } from '@angular/common';
import { format } from 'date-fns';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/employee-shift-report-model-interface';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
import { NameFormatPipe } from '@main/shared/pipes/name-format.pipe';

@Component({
  selector: 'app-employee-shift',
  animations: [mainAnimations],
  templateUrl: './employee-shift.component.html',
  styleUrls: ['./employee-shift.component.scss'],
  providers:[NameFormatPipe]
})
export class EmployeeShiftComponent implements OnInit, OnDestroy {

  private employeeShift$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public employeeShiftList: EmployeeShift[] = [];
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
        id: el.id, 
        employee_name: el.employee_name, 
        type: el.type, 
        calendar_schedule: el.calendar_schedule,
        name: el.name, 
        status: el.status, 
        week_day: el.week_day, 
        start_day: el.start_day,
        time_from: el.time_from,
        time_to: el.time_to,
        total_hours: el.total_hours,
        group: el.group,
      };
  }

  constructor(
    private employeeListStore: Store<EmployeeListState>,
    private adminEmployeeShift: Store<AdminProfileState>,
    private adminClientFunding: Store<AdminProfileState>,
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private nameFormatPipe:NameFormatPipe
    ) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getEmployeeShifts();
    this.employeeShift$ = this.adminEmployeeShift.pipe(select(state => state.employeeShift));

    this.req = this.employeeShift$.subscribe((employeeShift: any) => {
      this.loading = employeeShift.pending;

      if (employeeShift.employeeShiftList.length > 0) {
        this.employeeShiftList = employeeShift.employeeShiftList.filter(el => el?.employee?.length > 0);
        [...employeeShift.employeeShiftList].forEach((el: any) => {
          el['client_name'] = el.hasOwnProperty('client_service_schedule') ? parseArrayObject(el['client_service_schedule'], 'client')[0]['name'] : '';
          el['employee_name'] = this.nameFormatPipe.transform(parseArrayObject(el['employee'], 'name'));
          el['name'] = el.hasOwnProperty('client_service_schedule') ? `${el['weekday']}, ${parseArrayObject(el['client_service_schedule'], 'activity')}` : '';
          el['type'] = el.hasOwnProperty('client_service_schedule') ? parseArrayObject(el['client_service_schedule'], 'type')  : '';
          el['activity'] = el.hasOwnProperty('client_service_schedule') ? parseArrayObject(el['client_service_schedule'], 'activity') : '';
          el['start_day'] = el.hasOwnProperty('client_service_schedule') ? this.convertToDateFormat(parseArrayObject(el['client_service_schedule'], 'start_date')) : '';
          
          // set schedule
          let calendar_schedule: any = parseArrayObject(el['client_service_schedule'], 'start_date');
          el['calendar_schedule'] =  `${format(new Date((calendar_schedule * 1000)), 'EEE - MMM dd,yyyy')}`; 
          
          el['time_from'] = AdminHelper.convert24Hour(parseArrayObject(el['client_service_schedule'], 'start_time'));
          el['time_to'] = AdminHelper.convert24Hour(parseArrayObject(el['client_service_schedule'], 'end_time'));
          el['total_hours'] = el.hasOwnProperty('total_hours') ? `${el['total_hours'].replace(':','.')}` : ''
          //el['end_date'] = this.convertToDateFormat(el['start_date']);
          //el['start_date'] = this.convertToDateFormat(el['start_date']);
          el['status'] = parseArrayObject(el['client_service_schedule'], 'status');
        });

        console.log(employeeShift.employeeShiftList)
      }

      if (employeeShift.success) {
        this.snackBar.open(employeeShift.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        // this.adminEmployeeShift.dispatch({
        //   type: EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT_SUCCESS,
        //   payload: { message: null }
        // });

        // this.adminEmployeeShift.dispatch({
        //   type: EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT_SUCCESS,
        //   payload: { message: null }
        // });

        // this.getEmployeeShifts();
      }

      if (employeeShift.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        // this.adminEmployeeShift.dispatch({
        //   type: EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT_FAIL,
        //   payload: null
        // });

        // this.adminEmployeeShift.dispatch({
        //   type: EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT_FAIL,
        //   payload: null
        // });
      }
    })
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

  getEmployeeShifts() {
    this.adminEmployeeShift.dispatch({
      type: EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  editDataDialog(event) {
    if (event) {
      this.openAddShift(event?.data);
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
            this.adminEmployeeShift.dispatch({
              type: EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT,
              payload: [result?.data || event?.data]
            }); 
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }

  convertToDateFormat(dateTime){
    const dateObject = new Date(dateTime * 1000)
    return dateObject.toLocaleDateString('en-US');
  }

  convert(dateTime){
    const dateObject = new Date(dateTime * 1000)
    return dateObject.toDateString();
  }


  openAddShift(data?: any){
    console.log(data)

    let addShiftDialog = this.dialog.open(
      AddEmployeeShiftComponent,
      {
        minWidth: '54vw',
        maxWidth: '900px',
        data: data,
      }
    );

    addShiftDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  // Generate Report
  public reportColumn = reportColumn;
  public reportSelectedColumn = reportSelectedColumn;

  generateReport(){
    let reportDialog = this.dialog.open(
      GenerateReportGlobalComponent,
      { 
        minWidth: '423px',
        maxHeight: '97vh',
        maxWidth: '98vw',
        data: {
          data_list: this.employeeShiftList,  
          title: "Generate Employee Shift Report",
          sub_title: "Employee Shift",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Start Date',
          dateSearch: {
            dateFrom: 'Start Date',  
            dateTo: 'Start Date'
          },
          groupItems: true,  
          groupBy: 'Employee Name'
        },
      }
    );
  }

  back(){
    this.location.back();
  }
}

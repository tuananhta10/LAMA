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
import { EmployeeListState } from '@app-admin-store/reducers/admin-employees.reducer';
import {
  displayedColumns,
  TableHeader,
  EmployeeShift,
  selectedColumns,
  employeeShiftList
} from '../../utils/employee-shift-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEmployeeShiftComponent } from '../../../employee-shift/dialogs/add-employee-shift/add-employee-shift.component';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeShiftActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-shift.action';
import { parseArrayObject } from '@main/shared/utils/parse.util';

@Component({
  selector: 'employee-employee-shift',
  animations: [mainAnimations],
  templateUrl: './employee-shift.component.html',
  styleUrls: ['./employee-shift.component.scss']
})
export class EmployeeShiftComponent implements OnInit, OnDestroy {

  private employeeShift$: any;
  private employeesData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public employeeShiftList: EmployeeShift[] = employeeShiftList;
  public selectedColumns: string[] = selectedColumns;
  public employeeData: any = {};
  public searchSource: any = (el) => {
    return {
      id: el.id,
      name: el.name,
      type: el.type,
      work_schedule: el.work_schedule,
      employee: el.employee,
      status: el.status,
      week_day: el.week_day,
      start_day: el.start_day,
      time_from: el.time_from,
      time_to: el.time_to,
      total_hours: el.total_hours,
      group: el.group,
    };
  }

  constructor(private employeeListStore: Store<EmployeeListState>,
    private adminEmployeeShift: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getEmployeeShifts();
    this.employeeShift$ = this.adminEmployeeShift.pipe(select(state => state.employeeShift));

    this.req = this.employeeShift$.subscribe((employeeShift: any) => {
      this.loading = employeeShift.pending;
      const filtered = employeeShift.employeeShiftList.filter(emp => emp.employee_id == this.id)
      if (filtered.length > 0) {
        this.employeeShiftList = filtered;
        [...filtered].forEach((el: any) => {
          el['employee_name'] = parseArrayObject(el['employee'], 'name');
          el['name'] = `${el['weekday']}, ${parseArrayObject(el['client_service_schedule'], 'activity')}`;
          el['type'] = parseArrayObject(el['client_service_schedule'], 'type');
          el['start_day'] = this.convertToDateFormat(parseArrayObject(el['client_service_schedule'], 'start_date'));
          el['time_from'] = this.convertTo12Hrs(parseArrayObject(el['client_service_schedule'], 'start_time'));
          el['time_to'] = this.convertTo12Hrs(parseArrayObject(el['client_service_schedule'], 'end_time'));
          //el['end_date'] = this.convertToDateFormat(el['start_date']);
          //el['start_date'] = this.convertToDateFormat(el['start_date']);
          el['status'] = parseArrayObject(el['client_service_schedule'], 'status');
        });

        console.log(this.employeeShiftList)
      }

      if (employeeShift.success) {
        this.snackBar.open(employeeShift.success, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });
      }

      if (employeeShift.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });
      }

      // // Subscribe to storage
      // this.req = this.employeesData$.subscribe((results: any) => {
      //   console.log("RESULT")

      //   if(results){
      //     // from ngrx store
      //     this.employeeData = results?.employees.employeeList.find(el => el?.id ==  this.id);

      //     if(this.employeeData){
      //       this.employeeShiftList = this.employeeShiftList.map((el: EmployeeShift) => {
      //         el["employee"] = `${this.employeeData.first_name} ${this.employeeData.last_name}`;

      //         return el;
      //       });

      //       this.loading = this.employeeData ? false : true;
      //     }
      //   }
      // });

    })
  }

  getEmployeeShifts() {
    this.adminEmployeeShift.dispatch({
      type: EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST
    });
  }


  ngOnDestroy(): void {

    if (this.req) this.req.unsubscribe();
  }

  editDataDialog(event) {
    if (event) {
      this.openAddShift(event?.data);
    }
  }


  convertTo12Hrs(time) {
    if (!time) return;

    // Check correct time format and split into components
    time = time?.substr(0, 5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  convertToDateFormat(dateTime) {
    const dateObject = new Date(dateTime * 1000)
    return dateObject.toLocaleDateString('en-US');
  }

  openAddShift(data?: any) {
    console.log(data, "hello")
    let addShiftDialog = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '875px',
        data: data
      }
    );

      addShiftDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {

        });
    }
  }

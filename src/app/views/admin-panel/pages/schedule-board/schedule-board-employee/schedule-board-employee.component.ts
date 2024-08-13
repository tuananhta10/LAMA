import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import {
  ScheduleBoardEmployee,  
  employeeProfileSchedule,
  TableHeader,
  displayedColumns,
  displayedColumnsFortnightly
} from '../utils/schedule-board-employee-model-interface';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  addDays, 
  addHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  sub 
} from 'date-fns';
import { AddEmployeeShiftComponent } from '../dialogs/add-employee-shift/add-employee-shift.component';
import { AssignEmployeeComponent } from '../dialogs/assign-employee/assign-employee.component';
import { FilterMultipleComponent } from '../dialogs/filter-multiple/filter-multiple.component';

import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { DateRangeSelectionStrategy } from '../utils/date-selection-strategy.service';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

@Component({
  selector: 'app-schedule-board-employee',
  animations: [mainAnimations],
  templateUrl: './schedule-board-employee.component.html',
  styleUrls: ['./schedule-board-employee.component.scss']
})
export class ScheduleBoardEmployeeComponent implements OnInit {
  private employeesData$: any;
  private scheduleBoard$: any;
  private serviceSchedule$:any;
  private serviceReq: Subscription;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public id: string = '';
  public loading: boolean = true;
  public loadingChild: boolean = true;
  public employeeProfileSchedule: ScheduleBoardEmployee[] = [];
  public filteredBoardListEmployee: ScheduleBoardEmployee[] = this.employeeProfileSchedule;
  public displayedColumns: TableHeader[] = [...displayedColumns].filter(el => el.col_name !== 'employee');
  public showStatus: boolean = false;
  public employeeData: any;
  private currentDate = moment();
  public dateRange: any = {
    start_date: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
    end_date: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
  }

  public searchBy: string = '';
  public defaultImg: string = '/assets/images/icons/user-placeholder.png';
  public addDays: any = addDays;
  public thisWeekActive: boolean = true;
  public groupBy: string = 'Employee';
  public filterBy: string = '';
  public defaultImage = '/assets/images/placeholder/default-avatar.png';
  private params: any | undefined;
  public viewSelection: string = 'This Week > Weekly';
  public numberOfScheduleShown: number = 7;


  constructor(
    private adminScheduleBoard: Store<AdminProfileState>,
    private employeeListStore: Store<EmployeeListState>,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) { 
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
    this.scheduleBoard$ = this.adminScheduleBoard.pipe(select(state => state.scheduleBoard));

    // check for parameter and adjust date range
    this.route.queryParams
      .subscribe(params => {
        console.log(params, isNaN(params?.range_start))
        if(isNaN(params?.range_start)){
          this.dateRange =  {
            start_date: new Date(this.currentDate.startOf('week').isoWeekday(1).toString()),  
            end_date: new Date(this.currentDate.endOf('week').isoWeekday(7).toString())
          }
        } 
        else {
          this.dateRange =  {
            start_date: params?.range_start * 1000,
            end_date: params?.range_end * 1000
          }

          this.params = params;
        }
      }
    );
  }

    public mouseDown = false;
    public startX: any;
    public scrollLeft: any;
    public slider = document.querySelector<HTMLElement>('.parent');


    startDragging(e, flag, el) {
      this.mouseDown = true;
      this.startX = e.pageX - el.offsetLeft;
      this.scrollLeft = el.scrollLeft;
    }

    stopDragging(e, flag) {
      e.stopPropagation();
      e.preventDefault();
      this.mouseDown = false;
    }

    moveEvent(e, el) {
      //e.preventDefault();
      //e.stopPropagation();
      if (!this.mouseDown) {
        return;
      }
      
      if(this.mouseDown){
        console.log(e);
        const x = e.pageX - el.offsetLeft;
        const scroll = x - this.startX;
        el.scrollLeft = this.scrollLeft - scroll;
      }
    }

  
  ngOnInit(): void {
    if(!this.params){
      this.addWeek();
      this.thisWeekActive = true;
      
    } 
    else 
      this.getScheduleBoard();

    this.getEmployeeDetails();
    this.subscribeClientServiceSchedule();
    this.setToFortnightly();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // employee details
  getEmployeeDetails(): void{
    // extract id
    this.req = this.route.params.subscribe((params: any) => this.id = params['id']);
    
    this.employeeListStore.dispatch({ type: EmployeeListActionTypes.GET_EMPLOYEE_LIST, payload: this.id });

    // Subscribe to storage
    this.req.add(
      this.employeesData$.subscribe((results: any) => {
        if(results){
          // from ngrx store
          this.employeeData = results?.employees.employeeList.find(el => el?.id == this.id);
          this.getScheduleBoardInit();
        }
      })
    ) 
  }

  subscribeClientServiceSchedule(){
    this.serviceSchedule$ = this.adminScheduleBoard.pipe(select(state => state.clientServiceSchdule));
    this.serviceReq = this.serviceSchedule$.subscribe((serviceSchedule: any) => {
      this.loading = serviceSchedule.pending;

      if(serviceSchedule.success){
        this.snackBar.open(serviceSchedule.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminScheduleBoard.dispatch({
          type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_SUCCESS,
          payload: {message: null}
        });

        this.adminScheduleBoard.dispatch({
          type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_SUCCESS,
          payload: {message: null}
        });

        this.getScheduleBoard();
      }

      if(serviceSchedule.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminScheduleBoard.dispatch({
          type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_FAIL,
          payload: null
        });

        this.adminScheduleBoard.dispatch({
          type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_FAIL,
          payload: null
        });
      }
    })
  }

  getScheduleBoard(){
    let data = {...this.dateRange}

    data.start_date = convertTimestampUtc(data.start_date);
    data.end_date = convertTimestampUtc(data.end_date);
    data.content = this.groupBy.toLowerCase();

    this.adminScheduleBoard.dispatch({
      type: ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST,
      payload: data,
      grouping: this.groupBy
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

  navigateToProfile(){
    this.router.navigate([`/admin/employees/details/${this.employeeData?.id}`])
  }

  getScheduleBoardInit(): void {
    this.req.add(this.scheduleBoard$.subscribe((scheduleBoard: any) => {
        this.loading = scheduleBoard.pending;
      
        if(scheduleBoard.scheduleBoardList.length > 0){
          console.log("EMPLOYEE SCHEDULE", scheduleBoard.scheduleBoardList)
          this.employeeProfileSchedule = scheduleBoard.scheduleBoardList.filter(el => el?.employee?.id === this.employeeData?.id);
          this.filteredBoardListEmployee = this.employeeProfileSchedule;
        }
      
        if(scheduleBoard.success){
          this.snackBar.open(scheduleBoard.success, "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
      
          this.adminScheduleBoard.dispatch({
            type: ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD_SUCCESS,
            payload: {message: null}
          });
      
          this.adminScheduleBoard.dispatch({
            type: ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD_SUCCESS,
            payload: {message: null}
          });
        }
      
        if(scheduleBoard.error){
          this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
            duration: 4000,
            panelClass:'danger-snackbar'
          });
      
          this.adminScheduleBoard.dispatch({
            type: ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD_FAIL,
            payload: null
          });
      
          this.adminScheduleBoard.dispatch({
            type: ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD_FAIL,
            payload: null
          });
        }

        this.loadingChild = scheduleBoard.pendingSchedule;
      })
    )
  }

  // add week from current date
  addWeek(): void {
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, 1),  
      end_date: addWeeks(this.dateRange.end_date, 1)
    }

    this.loadingChild = true;  
    this.thisWeekActive = false;
    this.employeeProfileSchedule = [];
    this.filteredBoardListEmployee = [];

    this.getScheduleBoard();
  }


  // subtract date from current date
  subtractWeek(): void {
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, -1),  
      end_date: addWeeks(this.dateRange.end_date, -1)
    }

    this.loadingChild = true;  
    this.thisWeekActive = false;
    this.employeeProfileSchedule = [];
    this.filteredBoardListEmployee = [];

    this.getScheduleBoard();
  }

  // return to current date
  setToThisWeek(): void {
    this.currentDate = moment();
    this.dateRange = {
      start_date: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
      end_date: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
    }

    this.addWeek();
    this.thisWeekActive = true;
    this.displayedColumns = [...displayedColumns].filter(el => el.col_name !== 'employee');;
    this.loading = true;
    this.viewSelection = 'This Week > Weekly';
    this.numberOfScheduleShown = 7;
  }

  // set to fortnightly 14 days
  setToFortnightly(){
    this.currentDate = moment();
    this.dateRange = {
      start_date: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
      end_date: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
    }

    let subtractFromStartDay = new Date(sub(this.dateRange.start_date, { days: 1 }))
    this.dateRange.end_date = new Date(addWeeks(subtractFromStartDay, 2));  

    this.addWeek();
    this.thisWeekActive = true;
    this.displayedColumns = [...displayedColumns].filter(el => el.col_name !== 'employee');;
    this.loading = true;
    this.viewSelection = 'This Week > Fortnightly';
    this.numberOfScheduleShown = 14;
  }

  getWeekCalendar(){
    this.loading = true;  

    setTimeout(() => {
      if(this.viewSelection !== 'This Week > Fortnightly'){
        this.thisWeekActive = false;
        this.employeeProfileSchedule = [];
        this.filteredBoardListEmployee = [];
        // this.scheduleBoardListEmployee = [];
        // this.filteredBoardListEmployee = [];
        this.getScheduleBoard();
      }

      else {
        let subtractFromStartDay = new Date(sub(this.dateRange.start_date, { days: 1 }))
        this.dateRange.end_date = new Date(addWeeks(subtractFromStartDay, 2));  
        this.thisWeekActive = false;
        this.employeeProfileSchedule = [];
        this.filteredBoardListEmployee = [];
        this.displayedColumns = [...displayedColumns].filter(el => el.col_name !== 'employee');;
        this.getScheduleBoard();
      }
    }, 1000);
  }

  onlyMonday(d: Date): any {
    let day = new Date(d).getDay();

    return day === 1;
  }


  // filter by shift 
  filterByShiftStatus(status: string){
    this.filterBy = status;
    this.searchBy = undefined;

    // remove filtering
    if(status === null || !status){
      this.filteredBoardListEmployee = [...this.employeeProfileSchedule];
      return;
    }

    const searchClient = [...this.employeeProfileSchedule]
      .map(el => {
        return {
          schedule: el.schedule.map(_el => {
            if(_el.status && _el.status.toLowerCase() === status.toLowerCase() && !_el[0]?.status)
              return _el;

            else if(_el[0]?.status)
              return [..._el].filter(__el => __el.status.toLowerCase() === status.toLowerCase());
            
            else 
              return {};
          }),
          employee: el.employee,
          start_date: el.start_date,  
          end_date: el.end_date
        }
      });  

      this.filteredBoardListEmployee = [...searchClient]
      .filter(el => 
        el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
      );
  }

  /*
    list table filter
  */
  searchByEmployee(): void {
    const searchEmployee = [...this.employeeProfileSchedule].filter(el => {
      return JSON.stringify(el.employee)
        .toLowerCase()
        .includes(this.searchBy.toLowerCase());
    });

    this.filteredBoardListEmployee = searchEmployee;
  }

  // EDIT/CREATE SERVICE SCHEDULE
  openServiceSchedule(details?: any, scheduleType?: any, dateRange?: any, client?: any){
    console.log(details, scheduleType)

    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '53vw',
        maxWidth: '90vw',
        data: {
          schedule: details,  
          grouping: this.groupBy,
          client: client,
          range: {
            start_date: dateRange,  
            end_date: dateRange
          }
        }
      }
    );

    openShiftSchedule
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  convertToDateTime(dateVal: Date){
    /*let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;*/

    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }
}

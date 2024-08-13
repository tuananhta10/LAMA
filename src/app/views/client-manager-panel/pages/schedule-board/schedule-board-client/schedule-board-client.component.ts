import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import {
  ScheduleBoardClient,  
  clientProfileSchedule,
  TableHeader,
  displayedColumns
} from '../utils/schedule-board-client-model-interface';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ScheduleBoardEmployee,  
  scheduleBoardListEmployee
} from '../utils/schedule-board-employee-model-interface';

import { 
  addDays, 
  addHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate 
} from 'date-fns';
import { AddEmployeeShiftComponent } from '../dialogs/add-employee-shift/add-employee-shift.component';
import { AddEmployeeShiftSimpleComponent } from '../dialogs/add-employee-shift-simple/add-employee-shift-simple.component';
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
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';

@Component({
  selector: 'app-schedule-board-client',
  animations: [mainAnimations],
  templateUrl: './schedule-board-client.component.html',
  styleUrls: ['./schedule-board-client.component.scss']
})
export class ScheduleBoardClientComponent implements OnInit {
  private clientsData$: any;
  private scheduleBoard$: any;
  private employeesData$: any;
  private serviceSchedule$:any;
  private serviceReq: Subscription;
  private req: Subscription;
  public id: string = '';
  private unsubscribe$ = new Subject<void>();
  public loading: boolean = true;
  public loadingChild: boolean = true;
  public clientProfileSchedule: ScheduleBoardClient[] = clientProfileSchedule;
  public filteredBoardListClient: ScheduleBoardClient[] = this.clientProfileSchedule;
  public displayedColumns: TableHeader[] = [...displayedColumns].filter(el => el.col_name !== 'client');
  public showStatus: boolean = false;
  public clientData;
  private currentDate = moment();
  public dateRange: any = {
    start_date: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
    end_date: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
  }
        
  public searchBy: string = '';
  public defaultImg: string = '/assets/images/icons/user-placeholder.png';
  public addDays: any = addDays;
  public thisWeekActive: boolean = true;
  public groupBy: string = 'Client';
  public filterBy: string = '';
  public defaultImage = '/assets/images/placeholder/default-avatar.png';
  private params: any | undefined;
  public assign: boolean = false;


  constructor(
    private adminScheduleBoard: Store<AdminProfileState>,
    private clientListStore: Store<ClientListState>,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) { 
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
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
      /*if(e.target.classList.contains('parent')){
        this.mouseDown = true;
        this.startX = e.pageX - el.offsetLeft;
        this.scrollLeft = el.scrollLeft;
        console.log(el)
      }
  */
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

    this.getClientDetails();
    this.subscribeClientServiceSchedule();
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

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // client details
  getClientDetails(): void{
    // extract id
    this.req = this.route.params.subscribe((params: any) => this.id = params['id']);
    
    this.clientListStore.dispatch({ type: ClientListActionTypes.GET_CLIENT_LIST, payload: this.id });

    // Subscribe to storage
    this.req.add(
      this.clientsData$.subscribe((results: any) => {
        if(results){
          // from ngrx store
          this.clientData = results?.clients.clientList.find(el => el?.id == this.id);
          this.loading = results?.pending;
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

    data.start_date = this.convertToDateTime(data.start_date);
    data.end_date = this.convertToDateTime(data.end_date);
    data.content = this.groupBy.toLowerCase();

    console.log(data)

    this.adminScheduleBoard.dispatch({
      type: ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST,
      payload: data
    });
  }

  getScheduleBoardInit(): void {
    this.req.add(this.scheduleBoard$.subscribe((scheduleBoard: any) => {
        this.loading = scheduleBoard.pending;
      
        if(scheduleBoard.scheduleBoardList.length > 0){
          console.log(scheduleBoard.scheduleBoardList)
          this.clientProfileSchedule = scheduleBoard.scheduleBoardList.filter(el => el?.client?.id === this.clientData?.id);
          this.filteredBoardListClient = this.clientProfileSchedule;
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
    this.clientProfileSchedule = [];
    this.filteredBoardListClient = [];

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
    this.clientProfileSchedule = [];
    this.filteredBoardListClient = [];

    this.getScheduleBoard();
  }

  // return to current date
  setToThisWeek(): void {
    this.currentDate = moment();
    this.dateRange = {
      start_date: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
      end_date: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
    }

    this.thisWeekActive = true;
    this.loadingChild = true;  
    this.clientProfileSchedule = [];
    this.filteredBoardListClient = [];

    this.getScheduleBoard();
  }

  // filter by shift 
  filterByShiftStatus(status: string){
    this.filterBy = status;
    this.searchBy = undefined;

    // remove filtering
    if(status === null || !status){
      this.filteredBoardListClient = [...this.clientProfileSchedule];
      return;
    }

    const searchEmployee = [...this.clientProfileSchedule]
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
        client: el.client,
        start_date: el.start_date,  
        end_date: el.end_date
      }
    });  

    this.filteredBoardListClient = [...searchEmployee]
    .filter(el => 
      el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
    );
  }

  /*
    list table filter
  */
  searchByClient(): void {
    const searchClient = [...this.clientProfileSchedule].filter(el => {
      return JSON.stringify(el.client)
        .toLowerCase()
        .includes(this.searchBy.toLowerCase());
    });

    this.filteredBoardListClient = searchClient;
  }

  // EDIT/CREATE SERVICE SCHEDULE
  /*openServiceSchedule(details?: any, scheduleType?: any, dateRange?: any, client?: any){
    console.log(details, scheduleType)

    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '90vw',
        data: {
          schedule: details,  
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
  }*/

  // EDIT/CREATE SERVICE SCHEDULE
  openServiceSchedule(details?: any, scheduleType?: any, dateRange?: any, client?: any, index?: number){
    console.log(details, scheduleType, client)

    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '872px',
        data: {
          schedule: details,  
          grouping: this.groupBy,
          client: client,
          range: {
            start_date: dateRange,  
            end_date: dateRange
          },
          index: index
        }
      }
    );

    openShiftSchedule
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  openServiceScheduleSimple(details?: any, scheduleType?: any, dateRange?: any, client?: any, index?: number){
    console.log(details, scheduleType, client)

    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftSimpleComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '872px',
        data: {
          schedule: details,  
          grouping: this.groupBy,
          client: client,
          range: {
            start_date: dateRange,  
            end_date: dateRange
          },
          index: index
        }
      }
    );

    openShiftSchedule
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  private click: number = 0;
  private timeout: any;

  // double click trigger
  makeDoubleClick(item, dateRange, data, i) {
    this.click++;

    if (this.click == 1) {
      this.timeout = setTimeout(() => {
        if(!this.assign){
          console.log("Single Click");
          this.openServiceScheduleSimple(undefined, undefined, addDays(dateRange?.start_date, i), data?.client, i);
        }

        this.click = 0;
      }, 300);
    } 

    else if(this.click > 1) {
      clearTimeout(this.timeout);
      console.log("Double Clicks")
      this.openServiceSchedule(item, 'Employee');
      this.click = 0;
    }
  }
  


  // ASSIGN EMPLOYEE
  assignEmployee(details?: any){
    this.assign = true;

    let openAssignEmployee = this.dialog.open(
      AssignEmployeeComponent,
      { 
        minWidth: '33vw',
        maxWidth: '90vw',
        data: details
      }
    );

    openAssignEmployee
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.assign = false;
    });
  }

  convertToDateTime(dateVal: Date){
    /*let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;*/

    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }
}

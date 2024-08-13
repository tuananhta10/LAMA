import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import {
  ScheduleBoardClient,  
  scheduleBoardListClient,
  TableHeader,
  displayedColumns
} from '../utils/schedule-board-client-model-interface';
import { Router, ActivatedRoute } from '@angular/router';

import {
  ScheduleBoardEmployee,  
  scheduleBoardListEmployee
} from '../utils/schedule-board-employee-model-interface';

import {
  ScheduleBoardGroup,
  scheduleBoardListGroup
} from '../utils/schedule-board-group-model-interface';

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
import { AdminProfileState } from '@main/views/admin-panel/store/index';

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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';
import moment from 'moment';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-schedule-board-main',
  animations: [mainAnimations],
  templateUrl: './schedule-board-main.component.html',
  styleUrls: ['./schedule-board-main.component.scss']
})
export class ScheduleBoardMainComponent implements OnInit {
  private scheduleBoard$: any;
  private serviceSchedule$:any;
  private serviceReq: Subscription;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public loading: boolean = true;
  
  public adminAccess:any = ['Admin', 'Scheduler'];
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  public scheduleBoardListClient: ScheduleBoardClient[] = [];
  public filteredBoardListClient: ScheduleBoardClient[] = this.scheduleBoardListClient;
  public scheduleBoardListEmployee: ScheduleBoardEmployee[] = [];
  public filteredBoardListEmployee: ScheduleBoardEmployee[] = this.scheduleBoardListEmployee;
  public scheduleBoardListGroup: ScheduleBoardGroup[] = [];
  public filteredBoardListGroup: ScheduleBoardGroup[] = this.scheduleBoardListGroup;
  public displayedColumns: TableHeader[] = displayedColumns;
  public showStatus: boolean = false;

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
  public assign: boolean = false;

  constructor(private router: Router,
    private adminScheduleBoard: Store<AdminProfileState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) { 
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
    this.scheduleBoard$ = this.adminScheduleBoard.pipe(select(state => state.scheduleBoard));
    this.addWeek();
    this.thisWeekActive = true;
    this.subscribeClientServiceSchedule();

    this.req =  this.scheduleBoard$.subscribe((scheduleBoard: any) => {
      this.loading = scheduleBoard.pendingSchedule;

      if(scheduleBoard.scheduleBoardList.length > 0 && this.groupBy === 'Client'){
        this.scheduleBoardListClient = scheduleBoard.scheduleBoardList;
        this.scheduleBoardListClient.forEach(el => el.schedule.slice(0, 7)) // return 7 days only
        this.filteredBoardListClient = this.scheduleBoardListClient//.filter(el => el.client_id !== 91)
      }

      else if(scheduleBoard.scheduleBoardList.length > 0 && this.groupBy === 'Employee'){
        let unassigned = scheduleBoard.scheduleBoardList.filter(el => el.employee?.name.toLowerCase() === 'unassigned');  
        let assigned = scheduleBoard.scheduleBoardList.filter(el => el.employee?.name.toLowerCase() !== 'unassigned');  

        this.scheduleBoardListEmployee = [...unassigned, ...assigned];
        this.scheduleBoardListEmployee.forEach(el => el.schedule.slice(0, 7)) // return 7 days only
        this.filteredBoardListEmployee = this.scheduleBoardListEmployee;
      }

      else if(this.groupBy === 'Group'){
        this.scheduleBoardListGroup = scheduleBoard.scheduleBoardList;
        this.scheduleBoardListGroup.forEach(el => el.schedule.slice(0, 7)) // return 7 days only
        this.filteredBoardListGroup = this.scheduleBoardListGroup//.filter(el => el.client_id !== 91)
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
        
        this.getScheduleBoard();

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
    });
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

  convertToDateTime(dateVal: Date){
    /*let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;*/

    return Math.trunc(new Date(dateVal).getTime() / 1000);
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

  regroupItems(group): void {
    this.groupBy = group;  
    this.loading = true;  
    this.filterBy = undefined;
    this.searchBy = undefined;

    if(this.groupBy === 'Employee') this.filteredBoardListEmployee = [...this.scheduleBoardListEmployee];
    else if(this.groupBy === 'Client') this.filteredBoardListClient = [...this.scheduleBoardListClient];
    else if(this.groupBy === 'Group') this.filteredBoardListGroup = [...this.scheduleBoardListGroup];

    this.getScheduleBoard()

    setTimeout(() => this.loading = false, 1500);
  }

  // add week from current date
  addWeek(): void {
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, 1),  
      end_date: addWeeks(this.dateRange.end_date, 1)
    }

    this.loading = true;  
    this.thisWeekActive = false;
    this.scheduleBoardListClient = [];
    this.filteredBoardListClient = [];

    // this.scheduleBoardListEmployee = [];
    // this.filteredBoardListEmployee = [];
    this.getScheduleBoard();
  }

  // subtract date from current date
  subtractWeek(): void {
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, -1),  
      end_date: addWeeks(this.dateRange.end_date, -1)
    }

    this.loading = true;  
    this.thisWeekActive = false;
    this.scheduleBoardListClient = [];
    this.filteredBoardListClient = [];
    // this.scheduleBoardListEmployee = [];
    // this.filteredBoardListEmployee = [];
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
  }

  navigateToEmployee(data){
    if(data?.employee?.name !== 'Unassigned'){
      //routerLink="/staff/schedule/details/client/{{data?.client?.id}}"
      this.router.navigate([`/staff/schedule/details/employee/${data}`], 
        { 
          queryParams: { 
            'range_start': convertTimestampUtc(this.dateRange?.start_date),
            'range_end': convertTimestampUtc(this.dateRange?.end_date)
          }
        }
      );
    }
  }

  navigateToClient(data){
    //routerLink="/staff/schedule/details/client/{{data?.client?.id}}"
    this.router.navigate([`/staff/schedule/details/client/${data}`], 
      { 
        queryParams: { 
          'range_start': convertTimestampUtc(this.dateRange?.start_date),
          'range_end': convertTimestampUtc(this.dateRange?.end_date)
        }
      }
    );
  }

  // filter by shift 
  filterByShiftStatus(status: string){
    this.filterBy = status;
    this.searchBy = undefined;

    // remove filtering
    if(status === null || !status){
      if(this.groupBy === 'Employee') this.filteredBoardListEmployee = [...this.scheduleBoardListEmployee];
      else if(this.groupBy === 'Client') this.filteredBoardListClient = [...this.scheduleBoardListClient];
      else if(this.groupBy === 'Group') this.filteredBoardListGroup = [...this.scheduleBoardListGroup];
      return;
    }

    // filter status of shift by employee shifts
    if(this.groupBy === 'Employee'){
      const searchClient = [...this.scheduleBoardListEmployee]
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

    // filter status of shift by clients shifts
    else if(this.groupBy === 'Client'){
      const searchClient = [...this.scheduleBoardListClient]
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

      this.filteredBoardListClient = [...searchClient]
      .filter(el => 
        el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
      );
    }

    else if(this.groupBy === 'Group'){
      const searchGroup = [...this.scheduleBoardListGroup]
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
          group: el.group,
          start_date: el.start_date,  
          end_date: el.end_date
        }
      });  

      this.filteredBoardListGroup = [...searchGroup]
      .filter(el => 
        el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
      );
    }
  }

  /*
    list table filter
  */
  searchByClient(): void {
    const searchClient = [...this.scheduleBoardListClient].filter(el => {
      return JSON.stringify(el.client)
        .toLowerCase()
        .includes(this.searchBy.toLowerCase());
    });

    this.filteredBoardListClient = searchClient;
  }

  searchByEmployee(): void {
    const searchEmployee = [...this.scheduleBoardListEmployee].filter(el => {
      return JSON.stringify(el.employee)
        .toLowerCase()
        .includes(this.searchBy.toLowerCase());
    });

    this.filteredBoardListEmployee = searchEmployee;
  }


  searchByGroup(): void {
    const searchGroup = [...this.scheduleBoardListGroup].filter(el => {
      return JSON.stringify(el.group)
        .toLowerCase()
        .includes(this.searchBy.toLowerCase());
    });

    this.filteredBoardListGroup = searchGroup;
  }

  // EDIT/CREATE SERVICE SCHEDULE
  openServiceSchedule(details?: any, scheduleType?: any, dateRange?: any, client?: any, index?: number){
    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '872px',
        maxHeight: '97vh',
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
    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftSimpleComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '872px',
        maxHeight: '97vh',
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
          this.openServiceScheduleSimple(undefined, undefined, addDays(dateRange?.start_date, i), data?.client, i);
        }

        this.click = 0;
      }, 300);
    } 

    else if(this.click > 1) {
      clearTimeout(this.timeout);
      this.openServiceSchedule(item, 'Employee');
      this.click = 0;
    }
  }


  // ASSIGN EMPLOYEE
  assignEmployee(details?: any, day?: any){
    this.assign = true;

    let openAssignEmployee = this.dialog.open(
      AssignEmployeeComponent,
      { 
        minWidth: '33vw',
        maxWidth: '872px',
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

  //
  filterByCheckList(){
    let openFilterChecklist = this.dialog.open(
      FilterMultipleComponent,
      { 
        minWidth: '33vw',
        maxWidth: '872px',
        data: {
          groupBy: this.groupBy,
          list: this.groupBy === 'Employee' ? this.scheduleBoardListEmployee 
          : this.groupBy === 'Client' ? this.scheduleBoardListClient
          : this.scheduleBoardListGroup,
          filteredList: this.groupBy === 'Employee' ? this.filteredBoardListEmployee 
          : this.groupBy === 'Client' ? this.filteredBoardListClient
          : this.filteredBoardListGroup
        }
      }
    );

    openFilterChecklist
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result?.filteredList?.length > 0){
        if(this.groupBy === 'Client')
          this.filteredBoardListClient = result?.filteredList;

        else if(this.groupBy === 'Employee')
          this.filteredBoardListEmployee = result?.filteredList;

        else if(this.groupBy === 'Group')
          this.filteredBoardListGroup = result?.filteredList;
      }
    });
  }
}

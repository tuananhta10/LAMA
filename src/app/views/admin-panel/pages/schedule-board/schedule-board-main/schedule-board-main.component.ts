import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import {
  ScheduleBoardClient,  
  scheduleBoardListClient,
  TableHeader,
  displayedColumns,
  displayedColumnsFortnightly
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
  sub,
  startOfDay, 
  endOfDay,
  toDate 
} from 'date-fns';
import { AddEmployeeShiftComponent } from '../dialogs/add-employee-shift/add-employee-shift.component';
import { AddEmployeeShiftSimpleComponent } from '../dialogs/add-employee-shift-simple/add-employee-shift-simple.component';
import { ViewClientScheduleListComponent } from '../dialogs/view-client-schedule-list/view-client-schedule-list.component';
import { ViewClientFundingListComponent } from '../dialogs/view-client-funding-list/view-client-funding-list.component';
import { AssignEmployeeComponent } from '../dialogs/assign-employee/assign-employee.component';
import { FilterMultipleComponent } from '../dialogs/filter-multiple/filter-multiple.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';
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
import { PublicHolidayActionTypes } from '@main/views/admin-panel/store/actions/admin-public-holiday.action';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';
import moment from 'moment';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { DateRangeSelectionStrategy } from '../utils/date-selection-strategy.service';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { environment } from 'src/environments/environment';
import { NameFormatPipe } from '@main/shared/pipes/name-format.pipe';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
declare const gapi: any;

@Component({
  selector: 'app-schedule-board-main',
  animations: [mainAnimations],
  templateUrl: './schedule-board-main.component.html',
  styleUrls: ['./schedule-board-main.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DateRangeSelectionStrategy,
    },
    NameFormatPipe
  ],
})
export class ScheduleBoardMainComponent implements OnInit,OnDestroy {
  private scheduleBoard$: any;
  private serviceSchedule$:any;
  private publicHoliday$: any;
  private routeSub: Subscription;
  private serviceReq: Subscription;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public loading: boolean = true;
  public branchStatesSet: Set<string> = new Set();

  public scheduleBoardListClient: ScheduleBoardClient[] = [];
  public filteredBoardListClient: ScheduleBoardClient[] = this.scheduleBoardListClient;
  public scheduleBoardListEmployee: ScheduleBoardEmployee[] = [];
  public filteredBoardListEmployee: ScheduleBoardEmployee[] = this.scheduleBoardListEmployee;
  public filteredListEmployeeRole: ScheduleBoardEmployee[] = [];
  public filteredListEmployeeStatus: ScheduleBoardEmployee[] = [];

  public scheduleBoardListGroup: ScheduleBoardGroup[] = [];
  public filteredBoardListGroup: ScheduleBoardGroup[] = this.scheduleBoardListGroup;
  public displayedColumns: TableHeader[] = displayedColumns;
  public showStatus: boolean = true;
  public showRoles: boolean = true;
  public showShift: boolean = true;

  public fortnightly: boolean = false;
  private params: any | undefined;
  private currentDate = moment();
  public dateRange: any = {
    start_date: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
    end_date: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
  }

  public filterRoleList:Array<any> = [
    {role: 'Self-Service Portal - Coordinator', title:'Coordinator'},
    {role: 'Self-Service Portal - Facilitator', title:'Facilitator'},
    {role: 'Support Worker App', title:'Worker'},
    {role: 'Admin', title:'Admin'},
  ]

  public filterByShift:Array<any> = [
    'Shift',
    'No Shift'
  ]

  public searchBy: string = '';
  public defaultImg: string = '/assets/images/icons/user-placeholder-2.png';
  public addDays: any = addDays;
  public thisWeekActive: boolean = true;
  public groupBy: string = sessionStorage.getItem('groupingSchedule') || 'Client';
  public filterBy: string = '';
  public filterRole: string = '';
  public shiftFilter: string = '';

  public assign: boolean = false;
  public viewSelection: string = 'This Week > Weekly';
  public numberOfScheduleShown: number = 7;
  public showAdd: any = {
    id: 0,  
    show: false
  };
  public googleHolidayList: any[] = [];
  public googleFilteredHolidayList: any = [];
  public env: any = environment;
  public branches: any[] = [];

  constructor(private router: Router,
    private adminScheduleBoard: Store<AdminProfileState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private nameFormatPipe:NameFormatPipe
    ) { 

    // check for parameter and adjust date range
    this.routeSub = this.route.queryParams
      .subscribe(params => {
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

  addNewTrigger(id){
    this.showAdd = { id: id,  show: true }
  }

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
    if (!this.mouseDown) 
      return;
    
    if(this.mouseDown){
      const x = e.pageX - el.offsetLeft;
      const scroll = x - this.startX;
      el.scrollLeft = this.scrollLeft - scroll;
    }
  }

  calculateTotalHours(data, billable?: boolean){
    let schedule = data?.schedule;    
    
    let totalHours = 0;

    if(!!billable) {
      const billableTasks = schedule.map((daySchedule) =>{
          if(daySchedule?.length > 0){
            return [...daySchedule]?.filter((task) => task.billable)
          }

          else return []
        }
      );

      for (const daySchedule of billableTasks) {
        for (const task of daySchedule) {
          totalHours += task.total_hours;
        }
      }
    }

    else {
      for (const daySchedule of schedule) {
        for (const task of daySchedule) {
          totalHours += task.total_hours;
        }
      }
    }
    
    return (Math.round(totalHours * 100) / 100)?.toFixed(2)
  }

  calculateTravelTransport(data, key){
    let schedule = data?.schedule;
    let totalTravel = 0;

    if(schedule?.length > 0){
      for (const daySchedule of schedule) {
        if(daySchedule?.length > 0){
          for (const item of daySchedule) {
            totalTravel += item[key];
          }
        }
      }
      
      return totalTravel?.toFixed(1)
    }

    else return 0;
  }

  getGoogleServiceHoliday(){
    this.publicHoliday$ = this.adminScheduleBoard.pipe(select(state => state.publicHoliday));
    this.googleFilteredHolidayList = [];
    this.req =  this.publicHoliday$.subscribe((publicHoliday: any) => {      
      let holidays = publicHoliday?.publicHolidayList;            
      if(holidays?.length > 0){
        this.googleHolidayList = [];
        holidays.forEach((el) => {
          this.googleHolidayList.push({
            id: el?.id,
            date: new Date(el?.date * 1000),  
            branches: 1,
            start:  new Date(el?.start_date * 1000),
            end:  new Date(el?.end_date * 1000),
            name: el?.name,
            description: el?.description,
            color: {
              primary: 'rgba(251, 191, 36, 1)',
              secondary: 'rgb(251,245,228, 1)',
            },
            bg_color_code: el?.bg_color_code,
            state: el?.state,
          })
        });  


        this.googleFilteredHolidayList = [...this.googleHolidayList].filter(el => el?.start >= this.dateRange?.start_date && el?.end * 1000 <= this.dateRange?.end_date)
      }  
    });

    this.adminScheduleBoard.dispatch({
      type: PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST
    });
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();
    if(this.routeSub) this.req.unsubscribe();

    // clear data
    sessionStorage.removeItem('createSchedule');
    sessionStorage.removeItem('groupingSchedule')
    this.googleHolidayList = [];
    this.googleFilteredHolidayList = []
  }

  ngOnInit(): void {
    //public holiday init
    this.getGoogleServiceHoliday();

    this.scheduleBoard$ = this.adminScheduleBoard.pipe(select(state => state.scheduleBoard));

    let isFortnightly = localStorage.getItem("isFortnightly");
    if(isFortnightly === "true"){
      this.setToFortnightly();
    }

    // check params for dynamic date range
    if(!this.params)
      this.addWeek();

    else {
      this.loading = true;  
      this.thisWeekActive = false;
      this.scheduleBoardListClient = [];
      this.filteredBoardListClient = [];
    }

    this.thisWeekActive = true;
    this.subscribeClientServiceSchedule();

    if(sessionStorage.getItem('createSchedule')){
      this.openServiceScheduleSimple();
    }

    // call displaying of calendar
    this.subscribeScheduleDisplay();
    // this.getLocation()
  }



  // subscription to schedule board for mapping data
  subscribeScheduleDisplay(){
    // on subscribe for schedule board
    this.req =  this.scheduleBoard$.subscribe((scheduleBoard: any) => {
      this.loading = scheduleBoard.pendingSchedule;

      if(scheduleBoard.scheduleBoardList.length > 0 && this.groupBy === 'Client'){
        this.scheduleBoardListClient = scheduleBoard.scheduleBoardList;
        this.scheduleBoardListClient.forEach(el => el.schedule.slice(0, 7)) // return 7 days only
        let _scheduleBoardListClient = AdminHelper.deepCopy(this.scheduleBoardListClient)
        _scheduleBoardListClient.map((list:any) => {
          list.client.name = this.nameFormatPipe.transform(list.client.name)
          return list.schedule.map(sorts => {
            return sorts.sort((a, b) => {
              const nameA = a.start_time.toLowerCase();
              const nameB = b.start_time.toLowerCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });
          })
        })
        _scheduleBoardListClient.sort((a, b) => {
          const nameA = a.client.name.toLowerCase();
          const nameB = b.client.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        }); 
        this.filteredBoardListClient = _scheduleBoardListClient //.filter(el => el.client_id !== 91)

        // set public holiday
        setTimeout(() => {
          this.googleFilteredHolidayList = [];
          this.googleFilteredHolidayList = [...this.googleHolidayList].filter(el => (el?.start >= this.dateRange?.start_date) && (el?.end <= this.dateRange?.end_date))
          this.groupPublicHolidayArr();
        }, 500)

        // set selected style
        if(this.params){
          this.filteredBoardListClient.forEach(el => {
            let item = el?.schedule.flat().find(_el => _el?.id == this.params?.calendar_id);
            let index = el?.schedule.flat().findIndex(_el => _el?.id == this.params?.calendar_id);
            
            if(index !== 1){
              this.timeout = setTimeout(() => {
                let targetDiv = document.getElementById('client-schedule-' + item?.id);
                let index = this.selectedScheduleBoard.findIndex(el => el?.id === item?.id);
                  
                if(targetDiv.classList.contains(item?.status?.toLowerCase() + '-active')){
                  this.selectedScheduleBoard.splice(index, 1);
                  targetDiv.classList.remove(item?.status?.toLowerCase() + '-active');
                }

                else if(index === -1){
                  this.selectedScheduleBoard.push(item);
                  targetDiv.classList.add(item?.status?.toLowerCase() + '-active');
                } 

                this.click = 0;
              }, 300);
            }
          });

          this.filteredBoardListClient = this.filteredBoardListClient.filter((el:any) => el?.client?.id == this.params?.client_id);
        }
      }

      else if(scheduleBoard.scheduleBoardList.length > 0 && this.groupBy === 'Employee'){
        let unassigned = scheduleBoard.scheduleBoardList.filter(el => el.employee?.name.toLowerCase() === 'unassigned');  
        let assigned = scheduleBoard.scheduleBoardList.filter(el => el.employee?.name.toLowerCase() !== 'unassigned');  

        this.scheduleBoardListEmployee = [...unassigned, ...assigned];
        this.scheduleBoardListEmployee.forEach(el => el.schedule.slice(0, 7))// return 7 days only
        this.scheduleBoardListEmployee.map((employee:any) => {
          if(employee.employee.name.toLowerCase() === 'unassigned'){
            return 
          }
          employee.employee.name = this.nameFormatPipe.transform(employee.employee.name)
          return ;
        }); 
          
        this.filteredBoardListEmployee = this.scheduleBoardListEmployee
        .sort((a, b) => {
          const nameA = a.employee.name.toLowerCase();
          const nameB = b.employee.name.toLowerCase();
          if (nameA === 'unassigned' && nameB !== 'unassigned') return -1;
          else if (nameA !== 'unassigned' && nameB === 'unassigned')  return 1;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
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

  // selection of client tab on initial load of schedule
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
        this.snackBar.open(
            serviceSchedule?.error?.error?.message.replace('[Request Error]','') 
            || "Something went wrong please try again later or contact your administrator"
            , "", 
          {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.selectedScheduleBoard = [];

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


  public publicHolidayDisplayed: any = [];
  
  // getBackgroundColor(schedule: any, index: number): string {
  //   const holidays = this.publicHolidayDisplayed[this.checkIndexWeekDay(index)];
  //   const hasHoliday = holidays && holidays.length > 0;
  //       if (hasHoliday) {
  //     return '#f4efd5'; 
  //   }
  //   return schedule && schedule[0]?.status ? '#f0f0f0' : ''; 
  // }
  

  getBackgroundColor(schedule: any, index: number): string {
    const holidays = this.publicHolidayDisplayed[this.checkIndexWeekDay(index)];
    const hasHoliday = holidays && holidays.length > 0;
  
    if (hasHoliday && schedule && schedule[0]?.client?.state) {
      const clientState = schedule[0].client.state.toUpperCase();
      console.log(`Client State: ${clientState}`); 
  
      for (const holiday of holidays) {
        if (holiday.state.includes(clientState)) {
          return '#f4efd5'; 
        }
      }
    }
      return '';
  }

  // getBackgroundColorEmployee(schedule: any, index: number): string {

  //   const filterEmployee = [...this.scheduleBoardListEmployee];
  //   console.log(filterEmployee);
    
  //   const holidays = this.publicHolidayDisplayed[this.checkIndexWeekDay(index)];
  //   const hasHoliday = holidays && holidays.length > 0;
  //     if (hasHoliday && schedule && schedule[0]?.employee?.state) {
  //     const employeeState = schedule[0].employee.state.toUpperCase();
  
  //     for (const holiday of holidays) {
  //       if (holiday.state.includes(employeeState)) {
  //         return holiday.bg_color_code; 
  //       }
  //     }
  //   }
  //     return '';
  // }
  
  
  
  getScheduleBoard(){
    let data = {...this.dateRange}

    data.start_date = convertTimestampUtc(data.start_date);
    data.end_date = convertTimestampUtc(data.end_date);
    data.content = this.groupBy.toLowerCase();
    data.filter = this.shiftFilter || ""
    data.billable = 1;
    this.selectedScheduleBoard = [];
    this.googleFilteredHolidayList = [...this.googleHolidayList].filter(el => (el?.start >= this.dateRange?.start_date) && (el?.end <= this.dateRange?.end_date))
    this.groupPublicHolidayArr();
    
    this.adminScheduleBoard.dispatch({
      type: ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST,
      payload: data,
      grouping: this.groupBy
    });
  }

  public allHoliday: any[];

  groupPublicHolidayArr(){
    // group public holiday
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const holidayGroups = daysOfWeek.reduce((groups, day) => {
      groups[day] = [];
      return groups;
    }, {});

    this.googleFilteredHolidayList.forEach(holiday => {
      const dayOfWeek = new Date(holiday.start).toLocaleDateString('en-US', { weekday: 'long' });
      if (dayOfWeek in holidayGroups) {
        holidayGroups[dayOfWeek].push(holiday);
      }
    });

    this.publicHolidayDisplayed = Object.values(holidayGroups);        
    // for upcomming holiday
    const allHoliday = daysOfWeek.reduce((groups, day) => {
      groups[day] = [];
      return groups;
    }, {});

    this.googleHolidayList.forEach(holiday => {
      const dayOfWeek = new Date(holiday.start).toLocaleDateString('en-US', { weekday: 'long' });
      if (dayOfWeek in allHoliday) {
        allHoliday[dayOfWeek].push(holiday);
      }
    });

    this.allHoliday = Object.values(allHoliday);
  }

  checkIndexWeekDay(i: number): number{
    return i > 7 ? (i-7) : i
  }

  checkPublicHoliday(day, holidays): boolean{
    const date = addDays(new Date(this.dateRange.start_date), day).setHours(0,0,0,0);
    const public_holiday = new Date(holidays[0]?.date).setHours(0,0,0,0);

    if(date === public_holiday)
      return false;

    else 
      return true;
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

  weeksToAdd(direction: string): void{
    this.params = undefined;
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, direction === 'add' ? 1 : -1),  
      end_date: addWeeks(this.dateRange.end_date, direction === 'add' ? 1 : -1)
    }

    this.loading = true;  
    this.thisWeekActive = false;
    this.scheduleBoardListClient = [];
    this.filteredBoardListClient = [];

    this.getScheduleBoard();
  }

  // add week from current date
  addWeek(): void {
    this.weeksToAdd('add');
  }

  // subtract date from current date
  subtractWeek(): void {
    this.weeksToAdd('subtract');
  }

  getWeekCalendar(){
    this.loading = true;  

    setTimeout(() => {
      if(this.viewSelection !== 'This Week > Fortnightly'){
        this.thisWeekActive = false;
        this.scheduleBoardListClient = [];
        this.filteredBoardListClient = [];
        this.getScheduleBoard();
      }

      else {
        let subtractFromStartDay = new Date(sub(this.dateRange.start_date, { days: 1 }))
        this.dateRange.end_date = new Date(addWeeks(subtractFromStartDay, 2));  
        this.thisWeekActive = false;
        this.scheduleBoardListClient = [];
        this.filteredBoardListClient = [];
        this.displayedColumns = displayedColumnsFortnightly;
        this.getScheduleBoard();
      }
    }, 1000);
  }

  // set to this week 7 days
  setToThisWeek(): void {
    this.currentDate = moment();
    this.dateRange = {
      start_date: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
      end_date: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
    }

    this.addWeek();
    this.thisWeekActive = true;
    this.displayedColumns = displayedColumns;
    this.loading = true;
    this.fortnightly = false
    this.viewSelection = 'This Week > Weekly';
    this.numberOfScheduleShown = 7;

    let isFortnightly = localStorage.getItem("isFortnightly");

    if(isFortnightly){
      localStorage.removeItem("isFortnightly")
    }
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
    this.displayedColumns = displayedColumnsFortnightly;
    this.loading = true;
    this.fortnightly = true
    this.viewSelection = 'This Week > Fortnightly';
    this.numberOfScheduleShown = 14;

    let isFortnightly = localStorage.getItem("isFortnightly");

    if(!isFortnightly){
      localStorage.setItem("isFortnightly", "true")
    }
    
  }

  onlyMonday(d: Date): any {
    let day = new Date(d).getDay();

    return day === 1;
  }

  navigateToEmployee(data){
    if(data?.employee?.name !== 'Unassigned'){
      /*this.router.navigate([`/admin/schedule/details/employee/${data}`], 
        { 
          queryParams: { 
            'range_start': convertTimestampUtc(this.dateRange?.start_date),
            'range_end': convertTimestampUtc(this.dateRange?.end_date)
          }
        }
      );*/

      this.router.navigate([`/admin/employees/details/${data}/employee-shift`]);
    }
  }

  navigateToClient(data){
    /*this.router.navigate([`/admin/schedule/details/client/${data}`], 
      { 
        queryParams: { 
          'range_start': convertTimestampUtc(this.dateRange?.start_date),
          'range_end': convertTimestampUtc(this.dateRange?.end_date)
        }
      }
    );*/

    this.router.navigate([`/admin/clients/details/${data}/service-schedule`]);
  }

  // filter by shift 
  filterByShiftStatus(status: string){
    this.filterBy = status;
    this.searchBy = undefined;

    // remove filtering
    if(status === null || !status){
      if(status === null || !status){
        switch(this.groupBy) {
          case 'Employee':
            this.filteredBoardListEmployee = this.isRoleFiltered() ? [...this.filteredListEmployeeRole] : [...this.scheduleBoardListEmployee]
            this.filteredListEmployeeStatus = []
            break;
          case 'Client':
            this.filteredBoardListClient = [...this.scheduleBoardListClient];
            break;
          case 'Group':
            this.filteredBoardListGroup = [...this.scheduleBoardListGroup];
            break;
          default:
            break;
        }
        return;
      }
    }

    const groupByStatusHelper = (el) => {
      return el?.schedule?.map(_el => {
        if(status === 'unassigned' && this.groupBy === 'Employee' ){
          if(_el?.employee_id === null)
          return _el;

          else if(_el.length > 0)

            return [..._el]?.filter(__el => __el?.employee_id === null && (__el.status != 'scheduled' && __el.status != 'completed'));
          
          else 
            return {};
        }
        if(_el?.status && _el?.status?.toLowerCase() === status?.toLowerCase() && !_el[0]?.status)
          return _el;

        else if(_el[0]?.status)
          return [..._el]?.filter(__el => __el?.status?.toLowerCase() === status?.toLowerCase());
        
        else 
          return {};
      });
    }

    // filter status of shift by employee shifts
    if(this.groupBy === 'Employee'){
      const filterEmployee = this.isRoleFiltered() ?  [...this.filteredListEmployeeRole] : [...this.scheduleBoardListEmployee]

      const searchClient = [...filterEmployee]
      .map(el => {
        return {
          schedule: groupByStatusHelper(el),
          employee: el.employee,
          start_date: el.start_date,  
          end_date: el.end_date
        }
      });  

      this.filteredListEmployeeStatus = [...searchClient]
      .filter(el => 
        el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
      );

      this.filteredBoardListEmployee = [...searchClient]
      .filter(el => 
        el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
      );

      if(this.filteredBoardListEmployee.length <= 0) this.showAlertFilter('status', status)

    }

    // filter status of shift by clients shifts
    else if(this.groupBy === 'Client'){
      const searchClient = [...this.scheduleBoardListClient]
      .map(el => {
        return {
          schedule: groupByStatusHelper(el),
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
          schedule: groupByStatusHelper(el),
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

  private isRoleFiltered(): boolean{
    return this.filterRole && this.filteredListEmployeeRole.length > 0
  }

  filterByRole(role: string){
    this.searchBy = undefined;
    this.filterRole = role

    const groupByStatusHelper = (el) => {
      return el?.schedule?.map(_el => {
        if(_el?.employee_position && _el?.employee_position?.name?.toLowerCase() === role?.toLowerCase() && !_el[0]?.employee_position)
          return _el;

        else if(_el[0]?.employee_position)
          return [..._el]?.filter(__el => __el?.employee_position?.name?.toLowerCase() === role?.toLowerCase());
        
        else 
          return {};
      });
    }
    
    switch(this.groupBy){
      case 'Employee':
        if (role) {
          if (this.filterBy) {
            this.filterByShiftStatus(this.filterBy);
          }
          const filterEmployee = this.isStatusFiltered() ? [...this.filteredListEmployeeStatus] : [...this.scheduleBoardListEmployee];
          this.filteredListEmployeeRole = filterEmployee.filter(res => res.employee.employee_position === role && res?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0);
          this.filteredBoardListEmployee = this.filteredListEmployeeRole;
          if (this.filteredBoardListEmployee.length <= 0) {
            this.showAlertFilter('role', role);
          }
        } else {
          this.filteredBoardListEmployee = this.isStatusFiltered() ? [...this.filteredListEmployeeStatus] : [...this.scheduleBoardListEmployee];
          this.filteredListEmployeeRole = [];
        }
        break;
      case 'Client':
        const filterEmployee:any = this.isStatusFiltered() ? [...this.filteredBoardListClient] : [...this.scheduleBoardListClient]
          let test = filterEmployee.map(el => {
              return {
                schedule: el.schedule.map((res:any) => {
                  return res.filter((filt:any) => filt.employee_position.name == role)
                  
                }),
                client: el.client,
                start_date: el.start_date,  
                end_date: el.end_date
              }
            });  

          this.filteredBoardListClient = test
          .filter(el => 
            el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
          );
        break


    }
  }

  filterShift(shift:string){

    this.shiftFilter = shift
    this.getScheduleBoard()
    // if(!shift){
    //   this.filteredBoardListClient = [...this.scheduleBoardListClient]
    //   return
    // }

    // switch(this.groupBy){
    //   case "Client":
    //     const filterEmployee:any = [...this.scheduleBoardListClient]

    //     let test = filterEmployee.map(el => {
    //           if(shift === 'No Shift'){
    //             return {
    //               schedule: el.schedule.map((res:any) => {
    //                 return res.filter((filt:any) => (!filt.hasOwnProperty('employee_id') && !filt.employee_id) || filt.status == 'unassigned')
                    
    //               }),
    //               client: el.client,
    //               start_date: el.start_date,  
    //               end_date: el.end_date
    //             }
    //           }else{
    //             return {
    //               schedule: el.schedule.map((res:any) => {
    //                 return res.filter((filt:any) => (filt.hasOwnProperty('employee_id') && filt.employee_id) && filt.status != 'unassigned')
                    
    //               }),
    //               client: el.client,
    //               start_date: el.start_date,  
    //               end_date: el.end_date
    //             }
    //           }
    //         });  
    //       this.filteredBoardListClient = [...test]
    //       .filter(el => 
    //         el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
    //       );
    //     break
    //     case "Employee":
    //       // const filterEmployeeWithShift:any = [...this.scheduleBoardListClient]
  
    //       // let _filterEmployeeWithShift = filterEmployeeWithShift.map(el => {
    //       //       return {
    //       //         schedule: el.schedule.map((res:any) => {
    //       //           return res.filter((filt:any) => (filt.hasOwnProperty('employee_id') && filt.employee_id) && filt.status != 'unassigned')
                    
    //       //         }),
    //       //         client: el.client,
    //       //         start_date: el.start_date,  
    //       //         end_date: el.end_date
    //       //       }
    //       //     });  
  
    //       //   this.filteredBoardListClient = [..._filterEmployeeWithShift]
    //       //   .filter(el => 
    //       //     el?.schedule?.filter(_el => Object.keys(_el).length > 0).length > 0
    //       //   );
    //       break
  
    // }

  }

  private isStatusFiltered(): boolean{
    return this.filterBy && this.filteredListEmployeeStatus.length > 0
  }

  private isShiftFiltered(): boolean{
    return this.filterBy && this.filteredListEmployeeStatus.length > 0
  }

  private showAlertFilter(type:string, body?:string){
    const content = type === 'status' ? `${body} status` : `${body} role`

    this.snackBar.open(`No schedules for ${content}`, "", {
      duration: 4000,
      panelClass:'success-snackbar'
    });
  }

  searchSchedule(schedule){
    return JSON.stringify(schedule)?.toLowerCase()?.match(this.searchBy?.toLowerCase()) || !this.searchBy
  }

  /*
    SEARCH SCHEDULE BOARD BY CLIENT SCHEDULE
  */
  searchByClient(): void {
    const searchClient = [...this.scheduleBoardListClient].filter(el => {
      let obj = {
        client: JSON.stringify(el?.client),  
        schedule: el?.schedule?.filter(_el => _el?.length > 0).map(_el => {
          let scheduleData = _el[0];  
          let cond_a = (JSON.stringify(el?.client).toLowerCase()).includes(this.searchBy.toLowerCase()) ;
          let cond_b = (JSON.stringify({
            funding_code: scheduleData?.client_funding_code,
            employee: scheduleData?.employee?.name, 
            activity: scheduleData?.activity,  
            status: scheduleData?.status,  
            total_transport: scheduleData?.total_transport,  
            total_travel_km: scheduleData?.total_travel_km,  
            calendar_start_date: new Date(scheduleData?.calendar_start_date * 1000)?.toLocaleString(),
          }).toLowerCase()).includes(this.searchBy.toLowerCase());

          if(cond_a || cond_b) return scheduleData;  
          else return {};
        })
      }

      return (JSON.stringify(obj).toLowerCase()).includes(this.searchBy.toLowerCase()) 
    });



    this.filteredBoardListClient = [...searchClient];
  }

  /*
    SEARCH SCHEDULE BOARD BY EMPLOYEE SCHEDULE
  */
  searchByEmployee(): void {
    const searchEmployee = [...this.scheduleBoardListEmployee].filter(el => {
      let obj = {
        employee: JSON.stringify(el?.employee),  
        schedule: el?.schedule?.filter(_el => _el?.length > 0).map(_el => {
          let scheduleData = _el[0];  
          let cond_a = (JSON.stringify(el?.employee).toLowerCase()).includes(this.searchBy.toLowerCase()) ;
          let cond_b = (JSON.stringify({
            funding_code: scheduleData?.client_funding_code,
            client_name: scheduleData?.client_name, 
            activity: scheduleData?.activity,  
            status: scheduleData?.status,  
            total_transport: scheduleData?.total_transport,  
            total_travel_km: scheduleData?.total_travel_km,  
            calendar_start_date: new Date(scheduleData?.calendar_start_date * 1000)?.toLocaleString(),
          }).toLowerCase()).includes(this.searchBy.toLowerCase());

          if(cond_a || cond_b) return scheduleData;  
          else return {};
        })
      }

      return (JSON.stringify(obj).toLowerCase()).includes(this.searchBy.toLowerCase()) 
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

  openClientScheduleList(data): void{
    let openShiftSchedule = this.dialog.open(
      ViewClientScheduleListComponent,
      { 
        minWidth: '98vw',
        maxWidth: '98vw',
        maxHeight: '97vh',
        height: '97vh',
        data: {
          ...data,  
          publicHoliday: this.publicHolidayDisplayed
        }
      }
    );
  }

  openClientFundingList(data): void{
    // console.log(data)
    let openShiftSchedule = this.dialog.open(
      ViewClientFundingListComponent,
      { 
        minWidth: '98vw',
        maxWidth: '98vw',
        maxHeight: '97vh',
        height: '97vh',
        data: data
      }
    );
  }

  // EDIT/CREATE SERVICE SCHEDULE
  openServiceSchedule(details?: any, scheduleType?: any, dateRange?: any, client?: any, index?: number){
    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '1500px',
        maxHeight: '97.5vh',
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
  }

  openServiceScheduleSimple(details?: any, scheduleType?: any, dateRange?: any, client?: any, index?: number){
    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftSimpleComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '91vw',
        maxHeight: '97vh',
        data: {
          schedule: details,  
          grouping: this.groupBy,
          client: client,
          range: {
            start_date: dateRange,  
            end_date: dateRange
          },
          publicHoliday: this.allHoliday,
          index: index
        }
      }
    );
  }

  private click: number = 0;
  private timeout: any;
  public selectedScheduleBoard: any[] = [];

  // double click trigger
  makeDoubleClick(item, dateRange, data, i, event) {
    this.click++;

    if (this.click == 1) {
      this.timeout = setTimeout(() => {
        let targetDiv = document.getElementById(event);
        let index = this.selectedScheduleBoard.findIndex(el => el?.id === item?.id);
          
        if(targetDiv.classList.contains(item?.status?.toLowerCase() + '-active')){
          this.selectedScheduleBoard.splice(index, 1);
          targetDiv.classList.remove(item?.status?.toLowerCase() + '-active');
        }

        else if(index === -1){
          this.selectedScheduleBoard.push(item);
          targetDiv.classList.add(item?.status?.toLowerCase() + '-active');
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
        maxWidth: '650px',
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

  filterByCheckList(){
    let openFilterChecklist = this.dialog.open(
      FilterMultipleComponent,
      { 
        minWidth: '33vw',
        maxWidth: '1000px',
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

  convertToDateTime(dateVal: Date){
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

}

import { 
  Component, 
  EventEmitter, 
  Input, 
  OnDestroy, 
  OnInit, 
  Output, 
  ViewChild, 
  ElementRef, 
  AfterViewInit, 
  ChangeDetectorRef, 
  Inject 
} from '@angular/core';
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

import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CalendarModel, WorkDaysModel } from './model';
import { weekdays } from './workday-week';

import { MatCalendar } from '@angular/material/datepicker';
import { DOCUMENT } from '@angular/common';
import moment from 'moment';

class CustomDateAdapter extends MomentDateAdapter {
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  getFirstDayOfWeek(): number {
    return 1;
  }
};

const MATERIAL_DATEPICKER_FORMATS = {
  parse: {
    dateInput: 'DD/MMM/YYYY', 
  },
  display: {
    dateInput: 'DD/MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MMM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'employee-workdays',
  animations: [mainAnimations],
  templateUrl: './workdays.component.html',
  styleUrls: ['./workdays.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MATERIAL_DATEPICKER_FORMATS },
  ]
})
export class WorkdaysComponent implements OnInit {

  private employeesData$: any;
  private clientsData$: any;
  private req: Subscription;

  public employeeData: EmployeeList;
  private monthList = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  @ViewChild('time') time: HTMLInputElement;
  @ViewChild('calendar') calendarRef: MatCalendar<Date>


  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public employee$: any;
  public searchBy: string = '';
  public workDaysData: any;
  public isChecked = false;
  public isLinear = false;
  public weekdays: WorkDaysModel[] = weekdays;
  public selectedDates: any[] = [];
  public deletedDates:any[] = [];

  public titleOptions:any[] = [ "Available", "Not Available"];
  daysSelected: any[] = [];
  constructor(private employeeListStore: Store<EmployeeListState>,
    private employeeStore: Store<EmployeeState>,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));

    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
    this.subscribeEmployee();
    this.getEmployee();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  editEmployee(){
    sessionStorage.setItem('employeeFormStep', '5');
    this.router.navigate([`/admin/employees/edit/${this.employeeData?.id}`])
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
      if( results?.employee?.workDays){
        this.workDaysData = results?.employee?.workDays;
        this.weekdays =this.workDaysData["employee_week_schedule"] ? this.workDaysData["employee_week_schedule"] : weekdays;
        this.isChecked = true || this.workDaysData["employee_calendar_schedule"]?.length > 0 ? true : false;

        let _this = this;
        setTimeout( function() { 
          if(_this.workDaysData["employee_calendar_schedule"]?.length > 0){
            _this.workDaysData["employee_calendar_schedule"].forEach(element => {
              let date = _this.convertToDateFormat(element?.date);
              let date$ = moment(date);
              _this.selectDate(date$, _this.calendarRef, element);
            });
          }
        }, 100);

      }
      this.loading = results?.pending;
    })
  }

  getEmployee(){
    let data = {
      type: 'employee-work-schedule',
      id: this.id,
      key: 'workDays'
    }
    this.employeeStore.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: data
    });
  }


  /*WORKDAYS FUNCTION HERE*/
  public upWeek(event: MouseEvent, id: string, index: any, field: any): void {
    (document.getElementById(id) as HTMLInputElement).stepUp(60);
    let value = document.getElementById(id)["value"];
    this.weekdays[index][field] = value;
  }

  public downWeek(event: MouseEvent, id: string, index, field: any): void {
    (document.getElementById(id) as HTMLInputElement).stepDown(60);    
    let value = document.getElementById(id)["value"];
    this.weekdays[index][field] = value;
  }

  public upCalendar(event: MouseEvent, id: string, index: any, field: any): void {
    (document.getElementById(id) as HTMLInputElement).stepUp(60);
    let value = document.getElementById(id)["value"];
    this.selectedDates[index][field] = value;
  }

  public downCalendar(event: MouseEvent, id: string, index, field: any): void {
    (document.getElementById(id) as HTMLInputElement).stepDown(60);    
    let value = document.getElementById(id)["value"];
    this.selectedDates[index][field] = value;
  }

  public selectDate(event: any, calendar: any, data?: any) {
    const date =
      event?._d.getFullYear() +
      "-" +
      ("00" + (event?._d.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event?._d.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);


    if (index == -1 ) {
      this.daysSelected.push(date);
      this.mapAllDates(date, data);
    } 
    else if(!data){
      if(this.workDaysData["employee_calendar_schedule"].length > 0){
        this.workDaysData["employee_calendar_schedule"].forEach(element => {
          let baseDate =  this.convertToDateFormat(element.date).toString()
          let date$ = moment(baseDate);
          let stringDate = this.convertMomentToString(date$);
          if(stringDate === this.daysSelected[index]){
            this.deletedDates.push(element)
          }
        });
      }
      this.daysSelected.splice(index, 1);
    
      let dateIndex = this.selectedDates.findIndex(x => x.date == date);
      if(dateIndex != -1){
        this.selectedDates.splice(dateIndex, 1)
      }
    }

    calendar.updateTodaysDate();
    this.changeDetection.detectChanges();
  }
  
  private mapAllDates(date: any, data?: any): void {
    let found = false;
    const newDate = new Date(date);
    console.log(newDate.getFullYear());
    const formattedDate = this.monthList[newDate.getMonth()] +
    " " +
    ("00" + newDate.getDate()).slice(-2) +
    ", " +
    newDate.getFullYear();
    const formatDate: any = {
      label: formattedDate,
      date: date,
      availability: data ? data.availability : 'Not Available',
      is_available:  data ? data.is_available : true,
      time_start: data ? data.time_start :"09:00",
      time_end:  data ? data.time_end : "10:00",
    };


    if(this.workDaysData["employee_calendar_schedule"]){

      this.workDaysData["employee_calendar_schedule"].forEach(el => {
        let baseDate =  this.convertToDateFormat(el.date).toString()
        let date$ = moment(baseDate);
        let stringDate = this.convertMomentToString(date$);
        if(stringDate === date){
          found = true
        }
      });
      if(!found){
        formatDate.isAdd = true;
      } else {
        formatDate.isUpdate = true;
        formatDate.id = data.id;
      }
    } else {
      formatDate.isAdd = true;
    } 
    

    this.selectedDates.push(formatDate);
    this.changeDetection.detectChanges();
  }

  convertMomentToString(event){
   return  event?._d.getFullYear() +
      "-" +
      ("00" + (event?._d.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event?._d.getDate()).slice(-2);
  }

  isSelected = (event: any) => {
    const date =
      event?._d.getFullYear() +
      "-" +
      ("00" + (event?._d.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event?._d.getDate()).slice(-2);

    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  convertToDate(date){
    return Math.trunc(new Date(date).getTime() / 1000);
  }

  convertToDateFormat(dateTime){
    return new Date(dateTime * 1000)
  }
}

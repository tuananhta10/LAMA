import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CalendarModel, WorkDaysModel } from './model';
import { weekdays } from './workday-week';
import moment from 'moment'
import { Location } from '@angular/common';
import { EmployeeConstants } from '../../../constants';
import { MatCalendar } from '@angular/material/datepicker';
import { DOCUMENT } from '@angular/common';

class CustomDateAdapter extends MomentDateAdapter {
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  getFirstDayOfWeek(): number {
    return 1;
  }
};

export const MATERIAL_DATEPICKER_FORMATS = {
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
  selector: 'app-work-days',
  animations: [mainAnimations],
  templateUrl: './work-days.component.html',
  styleUrls: ['./work-days.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MATERIAL_DATEPICKER_FORMATS },
  ]
})
export class WorkDaysComponent implements OnInit, OnDestroy {

  private monthList = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  @ViewChild('time') time: HTMLInputElement;
  @ViewChild('calendar') calendarRef: MatCalendar<Date>

  @Input() navigation: any = {};
  @Input() isUpdate: boolean = false;
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  deletedDates:any[] = [];

  isChecked = false;
  isLinear = false;
  weekdays: any[] = weekdays;
  selectedDates: any[] = [];

  public titleOptions:any[] = [ "Available", "Not Available"];
  public toBeUpdated: boolean = false;
  
  @Input() workDaysData: any = {};
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();

  loading:boolean = false;
  daysSelected: any[] = [];
  event: any;
  
  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private changeDetection: ChangeDetectorRef) {
   
  }

  ngOnInit(): void {
    this.weekdays =this.workDaysData["employee_week_schedule"] && this.workDaysData["employee_week_schedule"].length > 0? this.workDaysData["employee_week_schedule"] : weekdays;
    this.isChecked = this.workDaysData["employee_calendar_schedule"]?.length > 0 ? true : false;

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
    this.formStep.emit(EmployeeConstants.workdays);
  }


  subscribeAutoSave(){
    this.weekdays
    let previous = weekdays;  
    let current = this.weekdays;  
  }

  public upWeek(event: MouseEvent, id: string, index: any, field: any): void {
    (document.getElementById(id) as HTMLInputElement).stepUp(60);
    let value = document.getElementById(id)["value"];

    console.log(value)

    this.weekdays[index][field] = value;

    console.log(`THERE'S A CHANGE WITH THE FORMS`)
    this.toBeUpdated = true;
  }

  public downWeek(event: MouseEvent, id: string, index, field: any): void {
    (document.getElementById(id) as HTMLInputElement).stepDown(60);    
    let value = document.getElementById(id)["value"];
    this.weekdays[index][field] = value;

    console.log(`THERE'S A CHANGE WITH THE FORMS`)
    this.toBeUpdated = true;
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
            //this.deletedDates.push(element)
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
      } 

      else {
        formatDate.isUpdate = true;
        formatDate.id = data.id;
      }
    } 

    else {
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

  back(){
    if(sessionStorage.getItem('employeeFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.navigation?.previous);
  }

  public submitting: boolean = false;

  submit(){
    let employeeCalendarSchedule: any = {
      add: [],
      update: [],
      delete: this.toBeUpdated ? this.deletedDates : []
    };

    let updateWeekSchedule: any = {
      delete: !this.workDaysData["employee_week_schedule"] || this.workDaysData["employee_week_schedule"].length === 0 ? [] : [...this.weekdays],
      add:[...this.weekdays]
    };

    // this.selectedDates.forEach(element => {
    //   if(element.isAdd){
    //     element.date = this.convertToDate(element.date);
    //     employeeCalendarSchedule.add.push(element)
    //   } else if(element.isUpdate){
    //     element.date = this.convertToDate(element.date);
    //     employeeCalendarSchedule.update.push(element)
    //   }
    // });

    let data:any = {
      "employee-week-schedule": updateWeekSchedule,
      "employee-calendar-schedule": employeeCalendarSchedule
    }

    this.submitting = true;
    this.submitData.emit(data);
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  next(){
    this.updateStepper.emit(this.navigation?.next);
  }

  convertToDate(date){
    return Math.trunc(new Date(date).getTime() / 1000);
  }

  convertToDateFormat(dateTime){
    return new Date(dateTime * 1000)
  }

  @Output() saveEmployeeAsDraft: EventEmitter<any> = new EventEmitter<any>();
  @Input() currentStatus: string = '';

  saveAsDraft(){
    let employeeCalendarSchedule: any = {
      add: [],
      update: [],
      delete: this.toBeUpdated ? this.deletedDates : []
    };

    let updateWeekSchedule: any = {
      delete: !this.workDaysData["employee_week_schedule"] || this.workDaysData["employee_week_schedule"].length === 0 ? [] : [...this.weekdays],
      add:[...this.weekdays]
    };

    // this.selectedDates.forEach(element => {
    //   if(element.isAdd){
    //     element.date = this.convertToDate(element.date);
    //     employeeCalendarSchedule.add.push(element)
    //   } else if(element.isUpdate){
    //     element.date = this.convertToDate(element.date);
    //     employeeCalendarSchedule.update.push(element)
    //   }
    // });

    let data:any = {
      "employee-week-schedule": updateWeekSchedule,
      "employee-calendar-schedule": employeeCalendarSchedule
    }

    this.submitData.emit(data);
    this.saveEmployeeAsDraft.emit(true);
  }


  ngOnDestroy(): void {
    let employeeCalendarSchedule: any = {
      add: [],
      update: [],
      delete: this.toBeUpdated ? this.deletedDates : []
    };
    
    // this.selectedDates.forEach(element => {
    //   if(element.isAdd){
    //     element.date = this.convertToDate(element.date);
    //     employeeCalendarSchedule.add.push(element)
    //   } else if(element.isUpdate){
    //     element.date = this.convertToDate(element.date);
    //     employeeCalendarSchedule.update.push(element)
    //   }
    // });
    
    
    let updateWeekSchedule: any = {
      delete: !this.workDaysData["employee_week_schedule"] || this.workDaysData["employee_week_schedule"].length === 0 ? [] : [...this.weekdays],
      add:[...this.weekdays]
    };
    
    let data:any = {
      "employee-week-schedule": updateWeekSchedule,
      "employee-calendar-schedule": employeeCalendarSchedule
    }

    // AUTO SAVE
    if(this.toBeUpdated && !this.submitting) {
      this.submitData.emit(data);
    }

    this.isValid.emit({formStep: this.isUpdate ? 5 : 4, isValid: true})
    if(!this.isUpdate){
      this.submitData.emit(data);
    }
  }

}

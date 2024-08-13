import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-time-analog',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeAnalogComponent),
      multi: true
    }
  ],
  templateUrl: './time-analog.component.html',
  styleUrls: ['./time-analog.component.scss']
})
export class TimeAnalogComponent implements OnInit {

  @Input() label: string;
  @Input() subLabel: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() initialVal: string = '';
  @Input() icon: string = 'event';
  @Input() img_icon: string = '/assets/images/icons/clock-input-icon.png';
  @Input() info: boolean = false;
  @Input() infoTitle: string = 'Your title here';
  @Input() maxDate: any = null;
  @Input() labelTop: boolean = false;
  @Input() minTime:any = "12:00 AM";
  @Input() maxTime:any = "11:59 PM";
  @Input() value24Hour :boolean = true;
  @Input() defaultTime: string = '12:00 AM';
  @Input() isOvernight:boolean = false
  color: string ="#8C7FF9"

  @ViewChild('picker') picker;
  isTouched:boolean = false;

  control: AbstractControl;

  onChange: (value: any) => {};
  onTouched: () => {};

  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  public hours: any;  
  public minutes: any;
  public am_pm: any;

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
  ) { }



  hoursChange(){
    if((this.hours + '').length === 1) {
      this.hours = '0' + this.hours;
    }

    else if(this.hours >= 10){
      this.hours = (this.hours + '')?.replace(/^0+/, '')
    }

    if(this.hours > 23){
      if(this.isOvernight){
        this.hours = 0;
      }else{
        this.hours = 23
      }
    }
  }

  minutesChange(){
    if((this.minutes + '').length === 1) {
      this.minutes = '0' + this.minutes;
    }

    else if(this.minutes >= 10){
      this.minutes = (this.minutes + '')?.replace(/^0+/, '')
    }

    if(this.minutes > 59){
      this.minutes = 59;
    }
  }

  triggerEvent(){
    setTimeout(() => {
      if(this.minutes && this.hours && this.value24Hour){
        let value = `${this.hours}:${this.minutes}`
        this.onValueChanged(value);  
      }
      else if(this.minutes && this.hours && !this.value24Hour && this.am_pm){
        let value = `${this.hours}:${this.minutes} ${this.am_pm}`
        this.onValueChanged(value); 
      }
    }, 200);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onTouch(event){
    if(this.required && !event.target.value){
      this.isTouched = true;
    } else {
      this.isTouched = false;
    }
  }

  convert24Hour(time12h: any){
    return moment(time12h, 'hh:mm A').format('HH:mm')
  }

  convert12Hour(time12h: any){
    return moment(time12h, 'HH:mm').format('hh:mm A')
  }

  onFocus(event){
    this.focus.emit(event);
  }

  writeValue(value: any) {
    this.initialVal = this.convert12Hour(value);
    this.keyevents.emit(value);
    this.control.updateValueAndValidity();
  }

  onValueChanged(value){
    //console.log(value)
    if(this.convert24Hour){
      this.writeValue(this.convert24Hour(value));
      this.onChange(this.convert24Hour(value));
    } else {
      this.writeValue(this.convert24Hour(value));
      this.onChange(this.convert24Hour(value));
    }
  }

  up(event: MouseEvent, id: string): void {
    (document.getElementById(id) as HTMLInputElement).stepUp(60);
  }

  down(event: MouseEvent, id: string): void {
    (document.getElementById(id) as HTMLInputElement).stepDown(60);
  }

  ngOnInit(): void {
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
    
    if(this.control.value){
      let value: any = this.convert24Hour(this.control?.value);

      let hours = value?.split(':')[0] * 1;
      let minutes = (value?.split(':')[1])?.split(' ')[0] * 1;   
      let am_pm = value?.split(' ')[1];  

      this.hours = hours;
      this.minutes = minutes; 
      this.am_pm = am_pm;

      this.minutesChange();
      this.hoursChange();
    }

    else {
      this.hours = '00';  
      this.minutes = '00';  
      //this.am_pm = 'AM';
    }
  }


}

import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true
    }
  ],
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements ControlValueAccessor, OnInit {

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
  @Input() value24Hour :boolean = false;
  @Input() defaultTime: string = '12:00 AM';
  color: string ="#8C7FF9"

  @ViewChild('picker') picker;
  isTouched:boolean = false;

  control: AbstractControl;

  onChange: (value: any) => {};
  onTouched: () => {};

  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
  ) { }

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
      this.writeValue(value);
      this.onChange(value);
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
  }

}

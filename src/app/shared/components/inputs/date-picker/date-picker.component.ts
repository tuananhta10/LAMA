import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { 
  format, 
  formatDistance, 
  formatRelative, 
  subDays 
} from 'date-fns'
import { NativeDateAdapter } from "@angular/material/core";

/* CUSTOM DATE ADAPTER */
export class CustomDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {

    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
       const str = value.split('/');
      const year_now = Number(new Date().getFullYear())
      const get_last_two_dg = year_now % 100
      const final_year = year_now - get_last_two_dg
      const year = str[2].length <= 3 ? final_year + Number(str[2]) : Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);

      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: Object): string {
    date = new Date(Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
      date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });

    const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
    return dtf.format(date).replace(/[\u200e\u200f]/g, '');
  }
}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  styleUrls: ['./date-picker.component.scss']
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {

  @Input() label: string;
  @Input() subLabel: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() initialVal: string = '';
  @Input() icon: string = 'event';
  @Input() img_icon: string = '/assets/images/icons/calendar-input-icon.png';
  @Input() info: boolean = false;
  @Input() infoTitle: string = 'Your title here';
  @Input() maxDate: any = null;
  @Input() minDate: any = null;
  @Input() labelTop: boolean = false;
  @Input() datepickerFilter: any;

  @ViewChild('picker') picker;
  isTouched:boolean = false;
  control: AbstractControl;

  onChange: (value: any) => {};
  onTouched: () => {};

  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dateAdapter: DateAdapter<Date>,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
  ) { 
    this.dateAdapter.setLocale('en-GB');
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

  writeValue(value: any) {
    this.initialVal = value;
    this.keyevents.emit(value);
    this.control.updateValueAndValidity();
  }

  onValueChanged(event){
    //console.log(event)
    if(event){
      let date = format(new Date(event.target.value), 'dd/mm/yyyy');

      this.writeValue(event.target.value);
      this.onChange(event.target.value);
    }
  }

  ngOnInit(): void {
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
  }

}

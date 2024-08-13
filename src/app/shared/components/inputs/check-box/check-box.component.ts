import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  styleUrls: ['./check-box.component.scss']
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {

  @Input() label: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() initialVal: any;
  @Input() info: boolean = false;
  @Input() labelTop: boolean = false;
  @Input() infoTitle: string = 'Your title here';
  @Input() checked: boolean;

  control: AbstractControl;
  isTouched:boolean = false;

  onChange: (value: any) => {};
  onTouched: () => {};

  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();

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
    if(this.required && (this.initialVal === null || this.initialVal === '')){
      this.isTouched = true;
    } else {
      this.isTouched = false;
    }
  }

  writeValue(event: any) {
    let ret = {
      value: event.source.value,
      checked: event.checked
    }
    this.initialVal = event.source.value;
    this.keyevents.emit(ret);
    this.control.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
  }

}

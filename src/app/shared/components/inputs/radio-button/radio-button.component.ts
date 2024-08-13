import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ],
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements ControlValueAccessor, OnInit {

  @Input() label: string;
  @Input() isVertical: boolean = false;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() initialVal: any;
  @Input() options: any = [];
  @Input() info: boolean = false;
  @Input() labelTop: boolean = false;
  @Input() infoTitle: string = 'Your title here';

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

  writeValue(value: any) {
    this.initialVal = value;
    this.keyevents.emit(value);
    this.control.updateValueAndValidity();
  }

  onSelectionChange(event){
    this.writeValue(event.value?.value);
    this.onChange(event.value?.value);
  }

  objectComparisonFunction(item) {
    return item.value == this.initialVal ? true : item.id == this.initialVal ? true : false;
  }

  ngOnInit(): void {
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
    //console.log(this.initialVal);
    //console.log(this.options);
  }

}

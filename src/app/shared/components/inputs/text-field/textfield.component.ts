import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true
    }
  ],
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements ControlValueAccessor, OnInit {
  @Input() inputType: string = "text";
  @Input() label: string;
  @Input() subLabel: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() classType: string = "";
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() initialVal: string = '';
  @Input() icon: string = '';
  @Input() img_icon: string = '';
  @Input() labelTop: boolean = false;
  @Input() info: boolean = false;
  @Input() infoTitle: string = 'Your title here';
  @Input() errorMessage: string = '';
  @Input() max: number = null;
  @Input() maxLength: number = 10;
  @Input() min: number = null;
  @Input() step:number = null

  public inputType_temp: string;

  control: AbstractControl;
  isTouched: boolean = false;

  onChange: (value: any) => {};
  onTouched: () => {
  
  };
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
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
    if(this.required && !event.target.value){
      this.isTouched = true;
    } else {
      this.isTouched = false;
    }
  }

  onFocus(event){
    this.focus.emit(event);

    if(this.inputType === 'tel'){
      let tel = event.target.value.replace(/[A-Za-z]/gi, '');

      this.writeValue(tel);
      this.onChange(tel);
      this.initialVal = tel;
      this.control.setValue(tel)
    }
  }

  writeValue(value: any) {
    this.initialVal = value;
    this.keyevents.emit(value);
    this.control.updateValueAndValidity();
    return;
  }


  replaceText(){
    if(this.inputType === 'tel'){
      let tel = [...this.control?.value]?.filter((el) => !el?.match(/[A-Za-z]/gi)).join('');

      this.initialVal = tel;
      this.control.setValue(tel);
      this.writeValue(tel);
      this.onChange(tel);
    }
  }

  onValueChanged(event){
    this.writeValue(event?.target?.value);
    this.onChange(event?.target?.value);
  }

  ngOnInit(): void {
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
  
    if(this.inputType === 'password')  this.inputType_temp = 'password';
  }

}

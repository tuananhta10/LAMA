import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Host, Input, OnChanges, OnInit, Optional, Output, SimpleChanges, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-autocomplete-chip',
  templateUrl: './autocomplete-chip.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteChipComponent),
      multi: true
    }
  ],
  styleUrls: ['./autocomplete-chip.component.scss']
})
export class AutocompleteChipComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() label: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() initialVal: string = 'test';
  @Input() options: any = [];
  @Input() addOption: boolean = false;
  @Input() info: boolean = false;
  @Input() labelTop: boolean = false;
  @Input() infoTitle: string = 'Your title here';
  @Input() objectReturn: boolean = false;
  @Input() isTextArea:boolean = false
  
  selectedValues: any[] = [];
  separatorKeysCodes: any[] = [ENTER, COMMA];


  control: AbstractControl;
  filteredOptions: Observable<any[]>;
  inputControl = new FormControl();
  notInList:boolean = false;
  img_icon: string = '/assets/images/icons/search-input-icon.png';

  onChange: (value: any) => {};
  onTouched: () => {};
  isTouched: boolean = false;

  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();
  @Output() addMethod: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
  ) { }

  ngOnChanges(changes: SimpleChanges) {  
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map(value => this._filter(value)),
    );
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

  transmitData(){
    this.writeValue(this.selectedValues);
    this.onChange(this.selectedValues);
  }

  onValueChanged(val){
    if(val){
      console.log(val)
      let index = this.options.findIndex(el => el === val);

      this.selectedValues.push(val);
      this.options.splice(index, 1);
      this.inputControl.setValue(null);
    }
    this.transmitData();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      let val = {
        name: value,
        id: -1
      }
      this.selectedValues.push(val);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }



    this.inputControl.setValue(null);
    this.transmitData();
  }

  remove(val: any): void {
    const index = this.selectedValues.indexOf(val);

    if (index >= 0) {
      this.selectedValues.splice(index, 1);
      this.options.push(val);
    }
    this.transmitData();
  }

  ngOnInit(): void {
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
  }

  private _filter(value: string): any[] {
    const filterValue = value?.toLowerCase();
    let ret = value ? this.options.filter(option => option?.name?.toLowerCase().includes(filterValue)) : this.options;
    return ret;
  }
}

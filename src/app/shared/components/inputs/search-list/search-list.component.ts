import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Host, Input, OnChanges, OnInit, Optional, Output, SimpleChanges, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchListComponent),
      multi: true
    }
  ],
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements ControlValueAccessor, OnInit, OnChanges {

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
  @Input() rows: number = 2;
  @Input() newOption: boolean = false;
  @Input() newOptionLabel: string = "Option";
  @Input() newOptionRoute: string;
  @Input() value: string;
  @Input() toolTipData: any[];
  @Input() withSubtoolTip: boolean = false;

  control: AbstractControl;
  filteredOptions: Observable<any[]>;
  inputControl = new FormControl();
  notInList:boolean = false;
  img_icon: string = '/assets/images/icons/search-input-icon.png';

  onChange: (value: any) => {};
  onTouched: () => {};
  isTouched: boolean = false;

  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() addMethod: EventEmitter<any> = new EventEmitter<any>();

  public inputForm: FormGroup;

  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
  ) { }

  ngOnChanges(changes: SimpleChanges) {  
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map(value => this._filter(value)),
    );
  }

  navigateToOption(){
    this.dialog.closeAll();
    this.router.navigate([this.newOptionRoute])
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

  clearTextBox(){
    this.writeValue(null);
    this.setInputValue(null);
  }

  onValueChanged(val){
    let retVal = this.objectReturn ? val : val.id
    if(this.formControlName){
      if(val != "addValue"){
        this.setInputValue(val);
        this.writeValue(retVal);
        this.onChange(retVal);
        this.notInList = false;
        
      } else {
        this.inputControl.setValue("");
        this.writeValue("");
        this.onChange("");
        this.addMethod.emit(true);
      }
    } else {
      this.valueChange.emit(retVal);
      this.setInputValue(val);
      this.writeValue(retVal);
      this.notInList = false;
    }
  }

  displayFn(value): string | undefined {
    return value ? (value || value?.name) : undefined;
  }

  setInputValue(data){
    if(typeof data === 'object' && data !== null ){
      this.inputControl.setValue(
        data?.name || data?.first_name);
    } else {
      this.inputControl.setValue(data);
    } 
  }

  checkInput(event){
    let options = this._filter(event.target.value);
    if(options.length === 0){
      this.notInList = true;
    } else {
      this.notInList = false;
    }
  }

  ngOnInit(): void {
    if(this.formControlName){
      this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
      if(this.control.value){
        let obj = this.options.find(o => o.id == this.control.value);
        this.setInputValue(obj);
      }
    } else {
      
      this.inputForm = this.formBuilder.group({
        inputValue: [''],
      });

      this.control = this.inputForm.controls['inputValue'];
      this.setInputValue(this.value);
    }
    
  }

  private _filter(value: string): any[] {
    const filterValue = value?.toLowerCase();
    let ret = value ? this.options.filter(option => option?.name?.toLowerCase().includes(filterValue)) : this.options;

    return ret;
  }

  formatToolTipMessage(data: any): string{
    let filteredData = [...this.toolTipData].filter(el => el.client_funding_id == data.id);
    let message = '';

    filteredData.forEach(element => {
      message = `${message} 
      
      ${element.name}`;
    });
    
    return message;
  }
}

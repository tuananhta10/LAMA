import { Component, ViewChild, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, ChangeDetectorRef  } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
 
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() isMultiple:any;
  @Input() initialVal: any;
  @Input() options: any = [];
  @Input() info: boolean = false;
  @Input() labelTop: boolean = false;
  @Input() infoTitle: string = 'Your title here';
  @Input() isObjectValue: boolean = false;
  @Input() multiple: boolean = false;
  @Input() fromObjectOptions: boolean = false;
  @Input() classType: string = '';
  @Input() customErrorMessage:string = ''
  @Input() showError:boolean = false
  @Input() newOption: boolean = false;
  @Input() newOptionLabel: string = "Option";
  @Input() newOptionRoute: string;
  @Input() maxSelection: number = 5;
  @Input() removableMultiple: boolean = false;
  @Input() showChip: boolean = true;
  control: AbstractControl;

  onChange: (value: any) => {};
  onTouched: () => {};
  isTouched:boolean = false;
  @ViewChild('mySelect') mySelect: MatSelect;
  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();

  public filterControl = new FormControl();
  public filteredOptions: Subscription;
  public optionSearch: any[];
  public img_icon: string = '/assets/images/icons/search-input-icon.png';

  constructor(private router: Router,
    private dialog: MatDialog,
    private cdr : ChangeDetectorRef ,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
  ) { 

  }
  
  navigateToOption(){
    this.dialog.closeAll();
    this.router.navigate([this.newOptionRoute])
  }

  onPanelClose() {
    this.filterControl.setValue('');
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onTouch(){
    if(this.required && !this.initialVal){
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
    console.log(this.initialVal)
    let onSelect = () => {
      this.initialVal = event.value;
      this.writeValue(event.value);
      this.onChange(event.value);
    }

    if(this.isMultiple && this.initialVal?.length < this.maxSelection){
      onSelect();
    }  

    else {
      onSelect();
    }

    // disabled
    const selectedOptions = this.mySelect.selected as MatOption[];

    if (selectedOptions.length > this.maxSelection) {
      this.mySelect.disabled = true;
    } else {
      this.mySelect.disabled = false;
    }

    // Select All
    if(event?.value && JSON.stringify(event?.value)?.toLowerCase()?.match('all') && this.initialVal?.length > 0 && this.initialVal?.findIndex(el => el?.toLowerCase()?.match('all')) > -1){
      this.initialVal = this.optionSearch.slice()
      this.writeValue(this.initialVal);
      this.onChange(this.initialVal);
    }

    // DESELECT
    if (Array.isArray(this.initialVal) && this.initialVal.length > 0 && this.initialVal.findIndex(el => el?.toLowerCase()?.includes('all')) > -1) {
      console.log("DESELECT OPTION");
    }
  }

  objectComparisonFunction = function( option, value ) : boolean {
    return this.isObjectValue ? option.id == value.id : option == value;
  }

  removeItem(i) {
    let object = { value: []};
    this.initialVal.splice(i, 1);
    object.value = this.initialVal;
    
    const selectedOptions:any = this.mySelect.selected; // array of selected options
    const optionToDeselect = selectedOptions?.find((option, index) => index === i); // get option with index 1
    if (optionToDeselect) {
      optionToDeselect.deselect(); // deselect the option
    }
  }

  ngOnInit(): void {
    this.optionSearch = this.options;
    this.initialVal = this.isMultiple ? [] : "";
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
    
    // check subscription
    this.filteredOptions = this.filterControl.valueChanges
    .subscribe((value) => {
      this.optionSearch = value ? [...this.options].filter(el => el?.toLocaleLowerCase().includes(value?.toLowerCase())) : this.options;
    });
  }

  checkOptions(){
    if(this.optionSearch?.length === 0) 
      this.optionSearch = this.options;
  }

  ngOnDestroy(): void {
    if(this.filteredOptions)
      this.filteredOptions.unsubscribe();
  }
}

import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-google-places-input.',
  templateUrl: './google-places-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GooglePlacesInputComponent),
      multi: true
    }
  ],
  styleUrls: ['./google-places-input.component.scss']
})
export class GooglePlacesInputComponent implements ControlValueAccessor, OnInit {
  @Input() inputType: string = "text";
  @Input() label: string;
  @Input() subLabel: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() initialVal: string = '';
  @Input() icon: string = '';
  @Input() img_icon: string = '';
  @Input() labelTop: boolean = false;
  @Input() info: boolean = false;
  @Input() infoTitle: string = 'Your title here';
  @Output() addressChange: EventEmitter<any> = new EventEmitter();

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  options:any ={
    types: [],
    componentRestrictions: { country: 'AU' }
  };


  control: AbstractControl;
  isTouched: boolean = false;

  onChange: (value: any) => {};
  onTouched: () => {
  
  };

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

  writeValue(value: any) {
    this.initialVal = value;
    this.keyevents.emit(value);
    this.control.updateValueAndValidity();
    return;
  }

  onValueChanged(event){
    this.writeValue(event.target.value);
    this.onChange(event.target.value);
  }

  ngOnInit(): void {
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
  }

  handleAddressChange(address: any) {
    let addressBreak = this.getAddressBreakdown(address);
    this.addressChange.emit(addressBreak);
  }

  private getAddressBreakdown(googleAddress: any) {
    let address: any = {};
    googleAddress.address_components.forEach((add) => {
        address[add.types[0]] = add.long_name;
        if (add.types[0] === "administrative_area_level_1") {
            address[add.types[0] + "_short"] = add.short_name;
        }
    });
    return {
        address1: `${address.street_number ?? ''} ${address.route}`,
        suburb: address.locality,
        postcode: address.postal_code,
        country: address.country,
        state: address.administrative_area_level_1,
        full: googleAddress.formatted_address,
        name: googleAddress.name
    };
  }

}

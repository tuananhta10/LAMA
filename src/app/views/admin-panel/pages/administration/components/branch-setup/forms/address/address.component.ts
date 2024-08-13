import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'admin-branch-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() addressForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private req: Subscription;
  private enum$: any;
  public countriesEnums: any;
  public loading:boolean = true;
  public stateObj: any[] = [
    {
      title: "Western Australia",
      state: "WA"
    },

    {
      title: "Victoria",
      state: "VIC"
    },

    {
      title: "New South Wales",
      state: "NSW"
    },

    {
      title: "Australian Capital Territory",
      state: "ACT"
    },

    {
      title: "South Australia",
      state: "SA"
    },

    {
      title: "Queensland",
      state: "QLD"
    },

    {
      title: "Tasmania",
      state: "TAS"
    },

    {
      title: "Northern Territory",
      state: "NT"
    },

    { title: "Remote", state: "Remote" },
    { title: "Very Remote", state: "Very Remote" },
  ];
  public stateOptions: string[] = this.stateObj.map(el => el.state);

  constructor(private adminEnumStore: Store<AdminProfileState>) {
    this.enum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
  }

  ngOnInit(){
    this.req = this.enum$.subscribe((results: any) => {
      this.countriesEnums = results.countries.map(el => el.name);
      this.loading = results.pending;
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_COUNTRIES
    });
  }

  onAddressChange(event:any){
    console.log(event);
    if(event){
      console.log(this.countriesEnums?.find(el => el?.name == event?.country))

      this.addressForm.patchValue({
        address_a: !event?.name?.match('undefined') ? event?.name : event?.suburb,
        suburb: event?.suburb,
        post_code: event?.postcode,
        state: this.stateObj.find(el => el.title.toLowerCase() == event?.state?.toLowerCase())['state'],
        country: this.countriesEnums?.find(el => el == event?.country)
      });
    }
  }

  ngOnDestroy(){
    this.isValid.emit({formStep: 3, isValid: this.addressForm.valid})
  }
}

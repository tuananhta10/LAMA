import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExternalProviderActionTypes } from '@main/views/admin-panel/store/actions/admin-external-provider.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { mainAnimations } from '@app-main-animation';
import { MatDialog } from '@angular/material/dialog';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-external-providers',
  animations: [mainAnimations],
  templateUrl: './add-external-providers.component.html',
  styleUrls: ['./add-external-providers.component.scss']
})
export class AddExternalProvidersComponent implements OnInit {

  private employeePosition$: any;
  private req: Subscription;
  private enum$: any;  
  private unsubscribe$ = new Subject<void>();

  public newExternalProvidersForm!: FormGroup;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public loading: boolean = false;
  public stepper: number = 1;
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
  public type: string[] = ['External Provider', 'Practitioner', 'Other'];  
  public rateType: string[] = ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Other'];

  constructor(
    public dialogRef: MatDialogRef<AddExternalProvidersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminExternalProviders: Store<AdminProfileState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private adminEnumStore: Store<AdminProfileState>
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    let stateIndex = this.stateObj?.findIndex(el => el?.state?.toLowerCase() == this.data?.data?.state.toLowerCase())

    // Employee Position Form
    this.newExternalProvidersForm = this.formBuilder.group({
      full_name: [this.data ? this.data?.full_name : ''],
      abn: [this.data ? this.data?.abn : ''],
      primary_contact_name: [this.data ? this.data?.primary_contact_name : ''],
      primary_contact_position: [this.data ? this.data?.primary_contact_position : ''],
      type: [this.data ? this.data?.type : ''],
      services_provided: [this.data ? this.data?.services_provided : ''],
      rate_type: [this.data ? this.data?.rate_type : ''],
      rate: [this.data ? this.data?.rate : ''],  

      address_a: [this.data ? this.data?.address_a : ''],
      address_b: [this.data ? this.data?.address_b : ''],
      suburb: [this.data ? this.data?.suburb : ''],
      state: [this.data ? this.data?.state : this.stateObj[stateIndex]?.state],
      post_code: [this.data ? this.data?.post_code : ''],  

      phone: [this.data ? this.data?.phone : ''],
      email: [this.data ? this.data?.email : ''],
      after_hours_phone: [this.data ? this.data?.after_hours_phone : ''],
      mobile: [this.data ? this.data?.mobile : ''],
      website: [this.data ? this.data?.website : ''],

      bsb: [this.data ? this.data?.bsb : ''],
      account_number: [this.data ? this.data?.account_number : '']
    });

  }

  checkStepOneValidity(){
    let name = this.newExternalProvidersForm.controls['full_name'].value;  
    let type = this.newExternalProvidersForm.controls['type'].value;  
    let services_provided = this.newExternalProvidersForm.controls['services_provided'].value;  
    let rate_type = this.newExternalProvidersForm.controls['rate_type'].value;  

    if(name === '' && type === '' && services_provided === '' && rate_type === '') return true;
    else return false;
  }

  onAddressChange(event:any){
    console.log(event);
    if(event){

      this.newExternalProvidersForm.patchValue({
        address_a: event?.address1,
        suburb: event?.suburb,
        post_code: event?.postcode,
        state: this.stateObj.find(el => el.title.toLowerCase() == event?.state?.toLowerCase())['state'],
      });
    }
  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newExternalProvidersForm.valid && !this.data){
      this.adminExternalProviders.dispatch({
        type: ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER,
        payload: this.newExternalProvidersForm.value 
      });

      this.close();
    }
    else if(this.newExternalProvidersForm.valid && this.data) {

      let editData = {
        id: this.data.id,
        ...this.newExternalProvidersForm.value
      }
      this.adminExternalProviders.dispatch({
        type: ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER,
        payload: editData
      });

      this.close();
    }
  }

}

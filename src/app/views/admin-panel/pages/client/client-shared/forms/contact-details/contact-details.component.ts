import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ClientConstants } from '../../../constants';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientNotesModalComponent } from '../../modals/client-notes/client-notes-modal.component';
import { MedicationModalComponent } from '../../modals/medications-modal/medication-modal.component';
import { EmergencyContactModalComponent } from '../../modals/emergency-contact-modal/emergency-contact-modal.component';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-contact-details',
  animations: [mainAnimations],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  public contactDetailsForm!: FormGroup;

  @Input() navigation: any = {};
  @Input() contactDetailsData: any;
  @Input() clientId: any;
  @Input() isUpdate:boolean = false;
  @Input() currentStatus: string = '';
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  public errorMessage:string = '';
  public isFirstLoad:boolean = true;
  private unsubscribe$ = new Subject<void>();
  private toBeUpdated: boolean = false;
  public stateOption: string[] = ["WA", "VIC", "NSW", "ACT", "QLD", "TAS", "NT"];
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
  ];

  public emergencyContactListColumn: any[] = [{name: 'Contact Name', field: 'emergency_contact_name'}, {name: 'Contact Number', field: 'emergency_contact_no'}, {name: 'Contact Relationship', field: 'emergency_contact_relationship'} ];
  public emergencyContactListData: any[] = [];
  public editemergencyContactListData: any = {
    add: [],
    update: [],
    delete:[]
  }

  constructor(private formBuilder: FormBuilder, 
    private location: Location, 
    private clientStore: Store<AdminProfileState>,  
    private loginAuthentication: LoginAuthenticationService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.contactDetailsForm = this.formBuilder.group({
      address_a: [this.contactDetailsData ? this.contactDetailsData.address_a : "", [Validators.required]],
      address_b: [this.contactDetailsData ? this.contactDetailsData.address_b : ""],
      suburb:[this.contactDetailsData ? this.contactDetailsData.suburb : "", [Validators.required]],
      state: [this.contactDetailsData ? this.stateObj.find(el => el.state.toLowerCase() == this.contactDetailsData.state?.toLowerCase())?.state : '', [Validators.required]],
      post_code: [this.contactDetailsData ? this.contactDetailsData.post_code : "", [Validators.required]],
      email_address: [this.contactDetailsData ? this.contactDetailsData.email_address : "", [Validators.required]],
      home_phone_no:[this.contactDetailsData ? this.contactDetailsData.home_phone_no : ""],
      mobile_phone_no: [this.contactDetailsData ? this.contactDetailsData.mobile_phone_no : ""],
      work_phone_no: [this.contactDetailsData ? this.contactDetailsData.work_phone_no : ""],
      fax: [this.contactDetailsData ? this.contactDetailsData.fax : ""],
      //emergency_contact_name: [this.contactDetailsData ? this.contactDetailsData.emergency_contact_name : ""],
      //emergency_contact_no: [this.contactDetailsData ? this.contactDetailsData.emergency_contact_no : ""],
      //emergency_contact_relationship: [this.contactDetailsData ? this.contactDetailsData.emergency_contact_relationship : ""],
    });
    this.formStep.emit(ClientConstants.contactDetails);
    this.generateEmergencyContactTable();
    this.subscribeAutoSave();
    this.contactDetailsForm.get("email_address").valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(res=> {
      if(!this.isFirstLoad){
        this.validateEmail(res);
      }
      this.isFirstLoad = false;
    });

  }

  generateEmergencyContactTable(){
    if(this.isUpdate){
      if(this.contactDetailsData?.emergency_contacts?.length > 0){
        this.emergencyContactListData = this.contactDetailsData?.emergency_contacts;
      }
      console.log(this.contactDetailsData)
    }
  }

  subscribeAutoSave(){
    /* VALUE CHANGE */
    this.contactDetailsForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        address_a: this.contactDetailsData ? this.contactDetailsData.address_a : "", 
        address_b: this.contactDetailsData ? this.contactDetailsData.address_b : "",
        suburb:this.contactDetailsData ? this.contactDetailsData.suburb : "", 
        state: this.contactDetailsData ? this.stateObj.find(el => el.state.toLowerCase() == this.contactDetailsData.state?.toLowerCase())?.state : '', 
        post_code: this.contactDetailsData ? this.contactDetailsData.post_code : "", 
        email_address: this.contactDetailsData ? this.contactDetailsData.email_address : "", 
        home_phone_no:this.contactDetailsData ? this.contactDetailsData.home_phone_no : "",
        mobile_phone_no: this.contactDetailsData ? this.contactDetailsData.mobile_phone_no : "",
        work_phone_no: this.contactDetailsData ? this.contactDetailsData.work_phone_no : "",
        fax: this.contactDetailsData ? this.contactDetailsData.fax : "",
        //emergency_contact_name: this.contactDetailsData ? this.contactDetailsData.emergency_contact_name : "",
        //emergency_contact_no: this.contactDetailsData ? this.contactDetailsData.emergency_contact_no : "",
        //emergency_contact_relationship: this.contactDetailsData ? this.contactDetailsData.emergency_contact_relationship : "",      
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
  }

  onAddressChange(event:any){
    console.log(event);
    this.contactDetailsForm.patchValue({
      address_a: !event?.name?.match('undefined') ? event?.name : event?.suburb,
      suburb: event?.suburb,
      post_code: event?.postcode,
      state: this.stateObj.find(el => el.title.toLowerCase() == event?.state.toLowerCase())['state'],
    });
  }

  validateEmail(email: any){
    this.loginAuthentication
    .validateEmail(email)
    .subscribe((result: any) => {
      if(result?.data.existing_user && this.contactDetailsData?.email_address != email){
        this.contactDetailsForm.controls['email_address'].setErrors({'incorrect': true});
        this.errorMessage="Email already exists"
      } else {
        this.contactDetailsForm.controls['email_address'].setErrors(null);
        this.errorMessage=""
      }
    },
    (err: any) => {

    });    
  }

  // Health Provider Modal
  openEmergencyContactModal(event){
    if(!event){
      let emergencyContactDialog = this.dialog.open(
        EmergencyContactModalComponent,
        {
          panelClass: "dialog-responsive",
          width: '35vw',
          //height: '720px',
          data: {
            client_id: this.contactDetailsData?.id,
          },
        }
      );

      emergencyContactDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          let data = {
            client_id: parseInt(this.clientId),  
            ...result
          }
          
          this.clientStore.dispatch({
            type: ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT,
            payload: data
          }); 
          this.emergencyContactListData.push(data);
        }
      });
    }

    else {
      let emergencyContactDialog = this.dialog.open(
        EmergencyContactModalComponent,
        {
          panelClass: "dialog-responsive",
          width: '35vw',
          //height: '720px',
          data: {
            client_id: parseInt(this.clientId),
            data: event
          },
        }
      );

      emergencyContactDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          let data = {
            id: event?.id,  
            client_id: parseInt(this.clientId),
            ...result
          }

          let index = this.emergencyContactListData.findIndex(el => el?.id === data?.id); 
          this.emergencyContactListData[index] = data;
          this.clientStore.dispatch({
            type: ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT,
            payload: data//sdf
          });
        }
      });
    }
  }

  deleteEmergencyContactRow(index){
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: index,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          //this.emergencyContactListData.splice(index, 1)
          let indexData = this.emergencyContactListData.find(el => el === this.emergencyContactListData[index]); 

          if(indexData?.id){
            this.clientStore.dispatch({
              type: ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT,
              payload: { id: indexData?.id }
            });

            this.emergencyContactListData.splice(index, 1)
          }
        }
      });
  }

  back(){
    if(sessionStorage.getItem('clientFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.isUpdate ? this.navigation?.previous - 1 : this.navigation?.previous);
  }

  public submitting: boolean = false;

  submit(){
    if(this.contactDetailsForm.valid){
      let data = {
        //"id": this.serviceDetailsData?.id,
        ...this.contactDetailsForm.value,
        'emergency-contacts' : {
          ...this.editemergencyContactListData
        },
      }

      this.submitting = true;
      this.submitData.emit(data);
    }
  }

  next(){
    if(this.contactDetailsForm.valid){
      this.submitData.emit(this.contactDetailsForm.value);
      this.updateStepper.emit(this.isUpdate ? this.navigation?.next - 1 : this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next - 1);
  }

  @Output() saveClientAsDraft: EventEmitter<any> = new EventEmitter<any>();

  saveAsDraft(){
    this.submitData.emit(this.contactDetailsForm.value);
    this.saveClientAsDraft.emit(true);
  }

  ngOnDestroy(): void {
    // AUTO SAVE
    if(this.toBeUpdated && !this.submitting){
      this.submitData.emit(this.contactDetailsForm.value);
    }

    this.isValid.emit({formStep: this.isUpdate ? 7 : 6, isValid: this.contactDetailsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.contactDetailsForm.value);
    }
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ClientConstants } from '../../../constants';

@Component({
  selector: 'app-contact-details',
  animations: [mainAnimations],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contactDetailsForm!: FormGroup;
  preferredCareworkerOptions:any[] = [{name:"Gaston"}];

  @Input() navigation: any = {};
  @Input() contactDetailsData: any;
  @Input() isUpdate:boolean = false;
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  errorMessage:string = '';
  isFirstLoad:boolean = true;
  
  constructor(private formBuilder: FormBuilder, private loginAuthentication: LoginAuthenticationService) { }

  ngOnInit(): void {
    this.contactDetailsForm = this.formBuilder.group({
      address_a: [this.contactDetailsData ? this.contactDetailsData.address_a : "", [Validators.required]],
      address_b: [this.contactDetailsData ? this.contactDetailsData.address_b : ""],
      suburb:[this.contactDetailsData ? this.contactDetailsData.suburb : "", [Validators.required]],
      state: [this.contactDetailsData ? this.contactDetailsData.state : "", [Validators.required]],
      post_code: [this.contactDetailsData ? this.contactDetailsData.post_code : "", [Validators.required]],
      email_address: [this.contactDetailsData ? this.contactDetailsData.email_address : "", [Validators.required]],
      home_phone_no:[this.contactDetailsData ? this.contactDetailsData.home_phone_no : ""],
      mobile_phone_no: [this.contactDetailsData ? this.contactDetailsData.mobile_phone_no : ""],
      work_phone_no: [this.contactDetailsData ? this.contactDetailsData.work_phone_no : ""],
      fax: [this.contactDetailsData ? this.contactDetailsData.fax : ""],
      emergency_contact_name: [this.contactDetailsData ? this.contactDetailsData.emergency_contact_name : ""],
      emergency_contact_no: [this.contactDetailsData ? this.contactDetailsData.emergency_contact_no : ""],
      emergency_contact_relationship: [this.contactDetailsData ? this.contactDetailsData.emergency_contact_relationship : ""],
    });
    this.formStep.emit(ClientConstants.contactDetails);

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

  onAddressChange(event:any){
    console.log(event);
    this.contactDetailsForm.patchValue({
      address_a: event?.address1,
      suburb: event?.suburb,
      post_code: event?.postcode,
      state: event?.state,
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

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  submit(){
    if(this.contactDetailsForm.valid){
      this.submitData.emit(this.contactDetailsForm.value);
    }
  }

  next(){
    if(this.contactDetailsForm.valid){
      this.submitData.emit(this.contactDetailsForm.value);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: this.isUpdate ? 8 : 7, isValid: this.contactDetailsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.contactDetailsForm.value);
    }
  }
}

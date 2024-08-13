import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';

import { EmployeeConstants } from '../../../constants';

@Component({
  selector: 'app-employee-contact-detail',
  animations: [mainAnimations],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  isLinear = false;
  contactDetailForm!: FormGroup;

  travelTimeEnums:any = [{id: '1', value:"Morning"}, {id: '2', value:"Afternoon"}, {id: '3', value:"Night"}]
  travelTimeOptions: string[] = ["Morning", "Afternoon", "Night"];

  @Input() navigation: any = {};
  @Input() contactDetailData: any;
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Input() isUpdate: boolean = false;
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  loading:boolean = false;
  
  constructor(private formBuilder: FormBuilder) {
   
  }

  ngOnInit(): void {
    this.contactDetailForm = this.formBuilder.group({
      address_a: [this.contactDetailData ? this.contactDetailData.address_a : '', [Validators.required]],
      address_b: [this.contactDetailData ? this.contactDetailData.address_b : ''],
      suburb: [this.contactDetailData ? this.contactDetailData.suburb : '', [Validators.required]],
      state: [this.contactDetailData ? this.contactDetailData.state : '', [Validators.required]],
      post_code: [this.contactDetailData ? this.contactDetailData.post_code : '', [Validators.required]],
      travel_distance: [this.contactDetailData ? this.contactDetailData.travel_distance : ''],
      travel_time: [this.contactDetailData ? this.contactDetailData.travel_time : ''],
      mobile_phone_no: [this.contactDetailData ? this.contactDetailData.mobile_phone_no : ''],
      home_phone_no: [this.contactDetailData ? this.contactDetailData.home_phone_no : ''],
      work_phone_no: [this.contactDetailData ? this.contactDetailData.work_phone_no : ''],
      emergency_contact_name: [this.contactDetailData ? this.contactDetailData.emergency_contact_name : ''],
      emergency_contact_relationship: [this.contactDetailData ? this.contactDetailData.emergency_contact_relationship : ''],
      emergency_contact_email: [this.contactDetailData ? this.contactDetailData.emergency_contact_email : ''],
      emergency_contact_mobile_phone_no: [this.contactDetailData ? this.contactDetailData.emergency_contact_mobile_phone_no : ''],
      emergency_contact_home_phone_no: [this.contactDetailData ? this.contactDetailData.emergency_contact_home_phone_no : ''],
      emergency_contact_work_phone_no: [this.contactDetailData ? this.contactDetailData.emergency_contact_work_phone_no : ''],
    });
    this.formStep.emit(EmployeeConstants.contactDetails);
  }

  onAddressChange(event:any){
    console.log(event);
    this.contactDetailForm.patchValue({
      address_a: event?.address1,
      suburb: event?.suburb,
      post_code: event?.postcode,
      state: event?.state,
    });
  }

  openAddTravelTime(e){

  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  submit(){
    if(this.contactDetailForm.valid){
      this.submitData.emit(this.contactDetailForm.value);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  next(){
    if(this.contactDetailForm.valid){
      this.submitData.emit(this.contactDetailForm.value);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: this.isUpdate ? 6 : 5, isValid: this.contactDetailForm.valid})
  }

}

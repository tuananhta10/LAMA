import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StepperConstants } from '../../stepper-constants';

@Component({
  selector: 'app-sign-up-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {

  organizationDetailForm!: FormGroup;

  @Input() organizationDetailData: any;
  @Input() navigation: any = {};
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  formArray:any;
  imgSrc: any;

  radioOptions: any = [{id:1, value: true, name: "Yes"}, {id:2, value: false, name:"No"}]

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.organizationDetailForm = this.formBuilder.group({
      logo: [this.organizationDetailData ? this.organizationDetailData?.logo : ""],
      organization_register: [this.organizationDetailData ? this.organizationDetailData.organization_register : ""],

      trading_name: [this.organizationDetailData ? this.organizationDetailData.trading_name : ""],
      abn: [this.organizationDetailData ? this.organizationDetailData.abn : ""],

      is_ndis_provider: [this.organizationDetailData ? this.organizationDetailData.is_ndis_provider : false],
      organization_registration_number: [this.organizationDetailData ? this.organizationDetailData.organization_register : ""],
      
      website: [this.organizationDetailData ? this.organizationDetailData.website : ""],
      primary_address: [this.organizationDetailData ? this.organizationDetailData.primary_address : ""],
      phone: [this.organizationDetailData ? this.organizationDetailData.phone : ""],
      primary_email: [this.organizationDetailData ? this.organizationDetailData.primary_email : ""],
      //support: [this.organizationDetailData ? this.organizationDetailData.support : ""],
      
      about_us: [this.organizationDetailData ? this.organizationDetailData.about_us : ""],
      //youngest_client: [this.organizationDetailData ? this.organizationDetailData.youngest_client : ""],
      //support_needs: [this.organizationDetailData ? this.organizationDetailData.support_needs : ""],
      //client_information: [this.organizationDetailData ? this.organizationDetailData.client_information : ""]
    });

    

    this.imgSrc = this.organizationDetailData.logo?.file;
    this.formStep.emit(StepperConstants.overview);
  }


  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  onUpload(file: any) {
    this.imgSrc = file.file;
    this.organizationDetailForm.get('logo').setValue(file);
  }

  next(){
    if(this.organizationDetailForm.valid){
      this.submitData.emit(this.organizationDetailForm.value);
      this.updateStepper.emit(this.navigation?.next);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    }
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: 1, isValid: this.organizationDetailForm.valid})
    this.submitData.emit(this.organizationDetailForm.value); 
  }

}

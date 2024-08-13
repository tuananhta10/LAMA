import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StepperConstants } from '../../stepper-constants';

@Component({
  selector: 'app-sign-up-understanding-needs',
  templateUrl: './understanding-needs.component.html',
  styleUrls: ['./understanding-needs.component.scss']
})
export class UnderstandingNeedsComponent implements OnInit {
  public understandingNeedForm!: FormGroup;
  @Input() organizationData: any = {};
  @Input() understandingNeedData: any;
  @Input() navigation: any = {};
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  public formArray:any;
  public useLamaOptions: any = [
    {id:1, value: "Schedule and fill shifts", name: "Schedule and fill shifts"}, 
    {id:2, value: "Track referral pipeline", name:"Track referral pipeline"},
    {id:3, value: "Manage employee and participant data", name:"Manage employee and participant data"},
    {id:4, value: "Replace our current CMS", name:"Replace our current CMS"}, 
    {id:5, value: "All of the above", name:"All of the above"},
    {id:6, value: "Other", name:"Other"}
  ];
  
  public participantNumberOptions: any = [
    {id:1, value: "Schedule and fill shifts", name: "Schedule and fill shifts"}, 
    {id:2, value: "Track referral pipeline", name:"Track referral pipeline"},
    {id:3, value: "Manage employee and participant data", name:"Manage employee and participant data"},
    {id:4, value: "Replace our current CMS", name:"Replace our current CMS"}, 
    {id:5, value: "All of the above", name:"All of the above"},
    {id:6, value: "Other", name:"Other"}
  ];
  
  public checkBoxOptions:any = [
    {label: "Client's private home", checked: false}, 
    {label: "Client's accommodation with another provider", checked: false}, 
    {label: "Our accommodation - SDA", checked: false},
    {label: "Our accommodation - SIL", checked: false}, 
    {label: "Our accommodation - MTA/respite/short term", checked: false}, 
    {label: "Our day centre", checked: false},
    {label: "Out and about in the community", checked: false},
    {label: "Other", checked: false}
  ];
  submitting: boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.understandingNeedForm = this.formBuilder.group({
      use_lama: [this.understandingNeedData ? this.understandingNeedData?.use_lama : ''],
      use_lama_other: [this.understandingNeedData ? this.understandingNeedData?.use_lama_other : ''],
      participant_number: [this.understandingNeedData ? this.understandingNeedData?.participant_number : 0],

      lama_workers_support: this.formBuilder.array(this.understandingNeedData && this.understandingNeedData?.lama_workers_support ? this.understandingNeedData?.lama_workers_support : []),
      lama_workers_support_other: [this.understandingNeedData ? this.understandingNeedData?.lama_workers_support_other : ''],  
    });

    if(this.understandingNeedData?.lama_workers_support?.length){
      this.checkBoxOptions.forEach(element => {
        this.understandingNeedData?.lama_workers_support?.forEach(val => {
          if(element.label === val){
            element.checked = true;
          }
        });
      });
    }
    
    this.formStep.emit(StepperConstants.understandingYourNeeds);
  }

  onChangeCheckbox(ret:any, index){
    const lama_workers_support = this.understandingNeedForm.get('lama_workers_support') as FormArray;
    if(ret.checked){
      this.checkBoxOptions[index].checked = ret.checked;
      lama_workers_support.push(new FormControl(ret.value))
    } else {
      const i = lama_workers_support.controls.findIndex(x => x.value === ret.value);
      this.checkBoxOptions[index].checked = false;
      lama_workers_support.removeAt(i);
    }
  }

  back(){
    this.updateStepper.emit(1);
    this.isValid.emit({formStep: 2, isValid: this.understandingNeedForm.valid})
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }

  next(){
    if(this.understandingNeedForm.valid){
      this.submitData.emit(this.understandingNeedForm.value);
      this.isValid.emit({formStep: 2, isValid: this.understandingNeedForm.valid})
      this.updateStepper.emit(3);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    }
  }

  save(){
    if(this.understandingNeedForm.valid){
      this.submitting = true;
      this.submitData.emit(this.understandingNeedForm.value);
      //this.updateStepper.emit(this.navigation?.next);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
      setTimeout(() => this.submitting = false, 5000);
    }
  }

  ngOnDestroy(): void {
    this.submitData.emit(this.understandingNeedForm.value);
    this.isValid.emit({formStep: 2, isValid: this.understandingNeedForm.valid})
  }

}

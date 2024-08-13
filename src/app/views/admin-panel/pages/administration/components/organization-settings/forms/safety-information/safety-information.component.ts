import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepperConstants } from '../../stepper-constants';

@Component({
  selector: 'app-sign-up-safety-information',
  templateUrl: './safety-information.component.html',
  styleUrls: ['./safety-information.component.scss']
})
export class SafetyInformationComponent implements OnInit {

  safetyInformationForm!: FormGroup;
  @Input() organizationData: any = {};
  @Input() safetyInformationData: any;
  @Input() navigation: any = {};
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  
  submitting: boolean = false;
  public emergency_process_file
  public incident_process_file

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.safetyInformationForm = this.formBuilder.group({
      emergency_process: [this.safetyInformationData ? this.safetyInformationData.emergency_process : ''],
      emergency_contact_name: [this.safetyInformationData ? this.safetyInformationData.emergency_contact_name : ''],
      emergency_contact_role: [this.safetyInformationData ? this.safetyInformationData.emergency_contact_role : ''],
      emergency_contact_phone: [this.safetyInformationData ? this.safetyInformationData.emergency_contact_phone : ''],
      emergency_contact_email: [this.safetyInformationData ? this.safetyInformationData.emergency_contact_email : ''],
      incident_process: [this.safetyInformationData ? this.safetyInformationData.incident_process : ''],
      //incident_contact_name: [this.safetyInformationData ? this.safetyInformationData.incident_contact_name : ''],
      //incident_contact_role: [this.safetyInformationData ? this.safetyInformationData.incident_contact_role : ''],
      //incident_contact_phone: [this.safetyInformationData ? this.safetyInformationData.incident_contact_phone : ''],
      //escalation_contact_name: [this.safetyInformationData ? this.safetyInformationData.escalation_contact_name : ''],
      //escalation_contact_role: [this.safetyInformationData ? this.safetyInformationData.escalation_contact_role : ''],
      //escalation_contact_email: [this.safetyInformationData ? this.safetyInformationData.escalation_contact_email : ''],
      //escalation_contact_phone: [this.safetyInformationData ? this.safetyInformationData.escalation_contact_phone : ''],
    });

    this.emergency_process_file = this.safetyInformationData?.emergency_process_file;
    this.incident_process_file = this.safetyInformationData.incident_process_file;
    this.formStep.emit(StepperConstants.safetyInformation);
  }

  onUpload(file: any, control: string) {
    let controlVal = {
      attachment: [
        file
      ]
    }

    console.log(controlVal)

    this.safetyInformationForm.get(control).setValue(controlVal);
  }

  back(){
    this.updateStepper.emit(2);
    this.isValid.emit({formStep: 3, isValid: this.safetyInformationForm.valid})
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }

  next(){
    if(this.safetyInformationForm.valid){
      this.submitData.emit(this.safetyInformationForm.value);
      this.isValid.emit({formStep: 3, isValid: this.safetyInformationForm.valid})
      this.updateStepper.emit(4);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    }
  }

  ngOnDestroy(): void {
    this.submitData.emit(this.safetyInformationForm.value);
    this.isValid.emit({formStep: 3, isValid: this.safetyInformationForm.valid})
  }
}

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

  @Input() safetyInformationData: any;
  @Input() navigation: any = {};
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  public emergency_process_file
  public incident_process_file

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.safetyInformationForm = this.formBuilder.group({
      emergency_contact_name: [this.safetyInformationData ? this.safetyInformationData.emergency_contact_name : ''],
      emergency_contact_role: [this.safetyInformationData ? this.safetyInformationData.emergency_contact_role : ''],
      emergency_contact_phone: [this.safetyInformationData ? this.safetyInformationData.emergency_contact_phone : ''],
      emergency_contact_email: [this.safetyInformationData ? this.safetyInformationData.emergency_contact_email : ''],
      
      emergency_process: [this.safetyInformationData ? this.safetyInformationData.emergency_process : ''],
      incident_process: [this.safetyInformationData ? this.safetyInformationData.incident_process : ''],

      incident_process_file: [''],
      emergency_process_file: [''],
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
    this.updateStepper.emit(this.navigation?.previous);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }

  next(){
    if(this.safetyInformationForm.valid){
      this.submitData.emit(this.safetyInformationForm.value);
      this.updateStepper.emit(this.navigation?.next);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    }
  }

  ngOnDestroy(): void {
    this.submitData.emit(this.safetyInformationForm.value);
    this.isValid.emit({formStep: 3, isValid: this.safetyInformationForm.valid})
  }
}

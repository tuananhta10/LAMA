import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { select, Store } from '@ngrx/store';
import { AddIncidentStepperConstants } from './add-incident-stepper-constant';
import { addIncidentSteps } from './add-incident-stepper-tabs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { IncidentActionTypes } from '@main/views/admin-panel/store/actions/admin-incident.action';
import { Subscription } from 'rxjs';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.scss']
})
export class AddIncidentComponent implements OnInit {
  public steps: any = addIncidentSteps;
  public navigation: any = {};
  @ViewChild('stepper') incidentStepper: MatStepper;
  public formStep: number = 1;

  public generalForm: FormGroup;
  public detailsForm: FormGroup;
  public notificationForm: FormGroup;
  public actionsTakenForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddIncidentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private adminIncident: Store<AdminProfileState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.data)

    this.generalForm = this.formBuilder.group({
      type: [this.data ? this.data.type : '', [Validators.required]],
      severity: [this.data ? this.data.severity : '', [Validators.required]],  
      client_id: [this.data ? this.data.client_id : ''],  
      employee_id: [this.data ? this.data.employee_id : ''],  
      service_provider: [this.data ? this.data.service_provider : ''],  
      reported_by: [this.data ? this.data.reported_by : '', [Validators.required]],  
      phone: [this.data ? this.data.phone : ''],
      date_received: [this.data ? this.convertToDateFormat(this.data.date_received) : '', [Validators.required]]
    });

    this.detailsForm = this.formBuilder.group({
      status: [this.data ? this.data.status : '', [Validators.required]],  
      description: [this.data ? this.data.description : '', [Validators.required]],  
      location: [this.data ? this.data.location : ''],
      date_signed: [this.data ? this.convertToDateFormat(this.data.date_signed) : new Date()],  
      time_of_incident: [this.data ? this.data?.time_of_incident : '00:00:00'],  
      allow_staff_access: [this.data ? this.data.allow_staff_access : undefined],  
      allow_client_access: [this.data ? this.data.allow_client_access : undefined],  
      event_before: [this.data ? this.data.event_before : ''],  
      event_after: [this.data ? this.data.event_after : ''],  
      event_during: [this.data ? this.data.event_during : '']
    });

    this.notificationForm = this.formBuilder.group({
      notified_management: [this.data ? this.data.notified_management : undefined, [Validators.required]],  
      notified_staff: [this.data ? this.data.notified_staff : undefined, [Validators.required]],
      notified_guardian: [this.data ? this.data.notified_guardian : undefined, [Validators.required]],  
      notified_police: [this.data ? this.data.notified_police : undefined, [Validators.required]],  
      notified_email: [this.data ? this.data.notified_email : undefined, [Validators.required, Validators.email]],
      notified_phone: [this.data ? this.data.notified_phone : undefined, [Validators.required, Validators.maxLength(13)]],
      notified_insurance: [this.data ? this.data.notified_insurance : undefined, [Validators.required]],  
      witnesses: [this.data ? this.data.witnesses : ''],  
      examined_by_doctor: [this.data ? this.data.examined_by_doctor : undefined, [Validators.required]],  
      hospitalised: [this.data ? this.data.hospitalised : undefined, [Validators.required]],  
    });

    this.actionsTakenForm = this.formBuilder.group({
      action_date: [this.data ? this.convertToDateFormat(this.data.action_date) : new Date()],  
      further_action_required: [this.data ? this.data.further_action_required : undefined, [Validators.required]],
      assigned_to: [this.data ? this.data?.assigned_to : ''],  
    });

    this.stepperNavigation();
  }

  stepperNavigation(){
    if(this.formStep === 1){
      this.getNavigation(AddIncidentStepperConstants.generalDetails)
    } 

    else if (this.formStep === 2) {
      this.getNavigation(AddIncidentStepperConstants.detailsOfIncident)
    } 

    else if (this.formStep === 3) {
      this.getNavigation(AddIncidentStepperConstants.notifications)
    }

    else if (this.formStep === 4) {
      this.getNavigation(AddIncidentStepperConstants.actionsTaken)
    }
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;

    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }
  convertToDateFormat(dateTime){
    return new Date(dateTime * 1000)
  }

  public updateStepper(step: number): void {
    this.formStep < step ? this.incidentStepper.next() : this.incidentStepper.previous();
    this.formStep = step;

    this.stepperNavigation();
  }

  updateStepperClick(step: number): void{
    this.formStep = step;
    this.stepperNavigation();
  }

  next(){
    this.updateStepper(this.navigation?.next);
  }

  back(){
    this.updateStepper(this.navigation?.previous);
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.generalForm.valid && !this.data){

      let data = {
        ...this.generalForm.value,
        ...this.detailsForm.value,
        ...this.notificationForm.value,
        ...this.actionsTakenForm.value
      }

      data.action_date = convertTimestampUtc(data.action_date);
      data.date_signed = convertTimestampUtc(data.date_signed);
      data.date_received = convertTimestampUtc(data.date_received);
      
      
      this.adminIncident.dispatch({
        type: IncidentActionTypes.SAVE_INCIDENT,
        payload: data
      });

      this.close()
    } else if (this.generalForm.valid && this.data) {
      
      let data = {
        ...this.generalForm.value,
        ...this.detailsForm.value,
        ...this.notificationForm.value,
        ...this.actionsTakenForm.value,
        id: this.data.id
      }

      data.action_date = data.action_date ? convertTimestampUtc(data.action_date) : null;
      data.date_signed = convertTimestampUtc(data.date_signed);
      data.date_received = convertTimestampUtc(data.date_received);
      
      
      this.adminIncident.dispatch({
        type: IncidentActionTypes.EDIT_INCIDENT,
        payload: data
      });

      this.close()
    }
  }

  checkFormValidity(e){
    this.steps[e.formStep -1].isStepValid = e.isValid;
  }
}

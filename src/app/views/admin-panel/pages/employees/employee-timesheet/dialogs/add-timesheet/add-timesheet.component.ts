import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { EmployeeTimesheetActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-timesheet.action';
import { Store } from '@ngrx/store';
import { AddTimesheetStepperConstant } from './add-timesheet-stepper-constant';
import { addEmployeeSteps } from './add-timesheet-stepper-tabs';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.scss']
})
export class AddTimesheetComponent implements OnInit {

  public steps: any = addEmployeeSteps;
  public navigation: any = {};
  @ViewChild('stepper') branchStepper: MatStepper;
  formStep: number = 1;

  timesheetDetailsForm!: FormGroup;
  timeLoggedForm!: FormGroup;
  isReadOnly:boolean = false;

  constructor(
    private adminEmployeeTimesheet: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<AddTimesheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) { 

  }

  ngOnInit(): void {
    this.timesheetDetailsForm = this.formBuilder.group({
      employee_id: [this.data ? this.data?.employee_id : '', [Validators.required]],  
      service_schedule: [this.data ? this.data.client_service_schedule_id : ''],  
      service_type: [this.data ? this.data?.service_type : ''],  
      service_type_id: [this.data ? this.data?.service_type_id : ''],  
      approved: [this.data ? this.data?.employee_timesheet_approved : true],  
      paid: [this.data ? this.data?.employee_timesheet_paid : true],  
      batch_number: [this.data ? this.data?.employee_timesheet_batch_number : '']
    });

    this.timeLoggedForm = this.formBuilder.group({
      start_date: [this.data?.employee_timesheet_start_date ? this.convertToDateFormat(this.data.employee_timesheet_start_date) : '', [Validators.required]],
      start_time: [this.data ? this.data.employee_timesheet_start_time : ''],
      end_date: [this.data?.employee_timesheet_end_date ? this.convertToDateFormat(this.data.employee_timesheet_end_date) : '', [Validators.required]],
      end_time: [this.data ? this.data.employee_timesheet_end_time : ''],
      total_hours: [this.data ? this.data?.employee_timesheet_total_hours : 0],
      break_hours: [this.data ? this.data?.employee_timesheet_break_hours : 0],
      travel_time: [this.data ? this.data?.employee_timesheet_travel_time : 0],  
      travel_mileage: [this.data ? this.data?.employee_timesheet_travel_mileage : 0],
      transport_mileage: [this.data ? this.data?.employee_timesheet_transport_mileage : 0],
      comment: [this.data ? this.data?.employee_timesheet_comment : '']
    });


    this.stepperNavigation();
    //this.isReadOnly = this.data?.isReadOnly ? this.data?.isReadOnly : false;
    this.isReadOnly = false;
  }

  stepperNavigation(){
    if(this.formStep === 1){
      this.getNavigation(AddTimesheetStepperConstant.timesheetDetails)
    } else if (this.formStep === 2) {
      this.getNavigation(AddTimesheetStepperConstant.timeLogged)
    }
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  public updateStepper(step: number): void {
    this.formStep < step ? this.branchStepper.next() : this.branchStepper.previous();
    this.formStep = step;

    if(this.formStep !== step){
      this.stepperNavigation();
    }
  }

  updateStepperClick(step: number): void{
    let form = this.formStep === 1 ? this.timesheetDetailsForm : this.timeLoggedForm;
    this.steps[this.formStep - 1].isStepValid = form.valid;
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
    let client_service_schedule = this.timesheetDetailsForm.get('service_schedule').value

    if(/*this.timesheetDetailsForm.valid && this.timeLoggedForm.valid &&*/ !this.data){
      let data = {
        ...this.timesheetDetailsForm.value,
        client_service_schedule_id: client_service_schedule ? client_service_schedule?.id : '',
        ...this.timeLoggedForm.value
      }

      //delete data['service_schedule'];
      delete data['service_schedule'];
      delete data['service_type'];
      delete data['service_type_id'];
      
      let start_date_string = new Date(data?.start_date).toLocaleDateString();  
      let start_date = new Date(`${start_date_string}, ${data?.start_time}`);  

      let end_date_string = new Date(data?.end_date).toLocaleDateString();  
      let end_date = new Date(`${end_date_string}, ${data?.end_time}`);  

      data.start_date = convertTimestampUtc(start_date);
      data.end_date = convertTimestampUtc(end_date);

      console.log(data)

      this.adminEmployeeTimesheet.dispatch({
        type: EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET,
        payload: data
      });

      this.close();
    }

    else if (this.timesheetDetailsForm.valid && this.timeLoggedForm.valid && this.data){
      let data = {

        ...this.timesheetDetailsForm.value,
        client_service_schedule_id: client_service_schedule ? client_service_schedule?.id : '',
        id: this.data.employee_timesheet_id,
        ...this.timeLoggedForm.value
      }

      //delete data['service_schedule'];
      delete data['service_type_id'];

      let start_date_string = new Date(data?.start_date).toLocaleDateString();  
      let start_date = new Date(`${start_date_string}, ${data?.start_time}`);  

      let end_date_string = new Date(data?.end_date).toLocaleDateString();  
      let end_date = new Date(`${end_date_string}, ${data?.end_time}`);  

      data.start_date = convertTimestampUtc(start_date);
      data.end_date = convertTimestampUtc(end_date);

      this.adminEmployeeTimesheet.dispatch({
        type: EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET,
        payload: data
      });
      this.close();
    }
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }
  convertToDateFormat(dateTime){
    return new Date(dateTime * 1000)
  }

  convert(dateTime) {
    const dateObject = new Date(dateTime * 1000)
    return dateObject.toLocaleTimeString('en-US', { hour12: false }) }

}

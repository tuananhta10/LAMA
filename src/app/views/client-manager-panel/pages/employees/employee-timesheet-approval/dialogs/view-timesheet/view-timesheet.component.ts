import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { EmployeeTimesheetActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-timesheet.action';
import { Store } from '@ngrx/store';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-view-timesheet',
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.scss']
})
export class ViewTimesheetComponent implements OnInit {

  public navigation: any = {};
  @ViewChild('stepper') branchStepper: MatStepper;
  formStep: number = 1;

  timesheetDetailsForm!: FormGroup;
  timeLoggedForm!: FormGroup;
  isReadOnly:boolean = false;

  constructor(
    private adminEmployeeTimesheet: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<ViewTimesheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) { 
    this.data = data?.data;

    console.log(data)
  }

  ngOnInit(): void {
    // service_schedule: [this.data ? this.data.client_service_schedule_id : ''],  

    this.timesheetDetailsForm = this.formBuilder.group({
      employee_name: [this.data ? this.data?.employee_name : '', [Validators.required]],  
      service_type: [this.data ? this.data?.service_type : ''],  
      service_type_id: [this.data ? this.data?.service_type_id : ''],  
      approved: [this.data ? this.data?.employee_timesheet_approved : true],  
      paid: [this.data ? this.data?.employee_timesheet_paid : true],  
      batch_number: [this.data ? this.data?.employee_timesheet_batch_number : ''],
      client_total: [this.data ? this.data?.client_service_schedule_client_total: 0],  
      approved_total: [this.data ? this.data?.employee_timesheet_total_hours * this.data?.client_service_schedule_editable_rate_value : 0]
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


    //this.isReadOnly = this.data?.isReadOnly ? this.data?.isReadOnly : false;
    this.isReadOnly = false;
  }


  close() {
    this.dialogRef.close(null);
  }

  save(){
    let client_service_schedule = this.timesheetDetailsForm.get('service_schedule').value

    if (this.timesheetDetailsForm.valid && this.timeLoggedForm.valid && this.data){
      let data = {
        approved: this.timesheetDetailsForm.controls['approved'].value,
        paid: this.timesheetDetailsForm.controls['paid'].value,
        id: this.data.employee_timesheet_id,
      }

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

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
  selector: 'app-approve-decline-timesheet',
  templateUrl: './approve-decline-timesheet.component.html',
  styleUrls: ['./approve-decline-timesheet.component.scss']
})
export class ApproveDeclineTimesheetComponent implements OnInit {
  public differentTime: boolean = false;  
  public differentTimeArray: any[] = [];

  constructor(private adminEmployeeTimesheet: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<ApproveDeclineTimesheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.data?.data?.forEach((el, i) => {
      if((el['employee_timesheet_start_time'] !== el['client_service_schedule_start_time']) 
        || (el['employee_timesheet_end_time'] !== el['client_service_schedule_end_time'])){
        console.log("DIFFERENT TIME")
        this.differentTime = true;
        
        /*
          <th>Update Shift Time</th>
          <th>Update Transport Km's</th>
          <th>Update Travel Km's</th>
          <th>Update Travel Time</th>
          <th>Used Company Car?</th>`
        */

        el['update_shift_time'] = "No";
        el['update_transport_km'] = "No";
        el['update_travel_km'] = "No";
        el['update_travel_time'] = "No";
        el['used_company_car'] = "No";

        this.differentTimeArray.push(el);

      }
    });
  }

  updateShiftTime(data, field){
    console.log(data, field)
  }

  closeSaveDialog(){
    console.log(this.data)
    this.dialogRef.close(this.data)
  }
}

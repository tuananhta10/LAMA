import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { EmployeeLeaveActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-leave.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-add-employee-leave',
  templateUrl: './add-employee-leave.component.html',
  styleUrls: ['./add-employee-leave.component.scss']
})
export class AddEmployeeLeaveComponent implements OnInit {
  public leavePeriodForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeLeaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminEmployeeLeave: Store<AdminProfileState>,
  ) { }

  ngOnInit(): void {
    this.leavePeriodForm = this.formBuilder.group({
      employee_id: [this.data ? this.data.employee_id : '', [Validators.required]],
      reasons: [this.data ? this.data.reasons : ''],
      status: [this.data ? this.data?.status : ''],
      start_date: [this.data ? this.convertToDateFormat(this.data.start_date) : '', [Validators.required]],
      start_time: [this.data ? this.data?.start_time : '00:00'],
      end_date: [this.data ? this.convertToDateFormat(this.data.end_date) : '', [Validators.required]],
      end_time: [this.data ? this.data?.end_time : '23:59'],
      comment: [this.data ? this.data.comment : ''],
      manager_comment: [this.data ? this.data.manager_comment : ''],
    });
   
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }
  convertToDateFormat(dateTime){
    return new Date(dateTime * 1000)
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.leavePeriodForm.valid && !this.data){

      let data = {
        ...this.leavePeriodForm.value,
      }

      data.start_date = convertTimestampUtc(data.start_date);
      data.end_date = convertTimestampUtc(data.end_date);
      
      this.adminEmployeeLeave.dispatch({
        type: EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE,
        payload: data
      });

      this.close()
    } else if (this.leavePeriodForm.valid && this.data) {
      
      let data = {
        ...this.leavePeriodForm.value,
        id: this.data.id
      }

      data.start_date = convertTimestampUtc(data.start_date);
      data.end_date = convertTimestampUtc(data.end_date);
      
      
      this.adminEmployeeLeave.dispatch({
        type: EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE,
        payload: data
      });

      this.close()
    }
  }

}

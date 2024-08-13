import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeePayRateLoadingActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-pay-rate-loading.action';

@Component({
  selector: 'app-add-payrate-loading',
  templateUrl: './add-payrate-loading.component.html',
  styleUrls: ['./add-payrate-loading.component.scss']
})
export class AddPayrateLoadingComponent implements OnInit {

  newPayrateLoadingForm!: FormGroup;
  employmentTypeOptions: any[] =["Casual", "Contractor", "Part-Time / Full-Time"];
  applicableDayOptions: any[] = ["Weekday", "Weekday Afternoon", "Weekday Evening", "Weekday Night", "Saturday", "Sunday", "Public Holiday"];
  payItemOptions: any[] =["Adjustment", "Annual Leave Loading", "Annual Leave Pay", "AS Car Allowance", "Back Pay", "Base Hourly", "Base Hourly Lvl 1 - PM", "Base Hourly Lvl 1 - PUB HOL",];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  constructor(
    public dialogRef: MatDialogRef<AddPayrateLoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminPayRateLoading: Store<AdminProfileState>,
  ) { }

  ngOnInit(): void {
    this.newPayrateLoadingForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      employment_type: [this.data ? this.data?.employment_type : '', [Validators.required]],
      applicable_day: [this.data ? this.data?.applicable_day : '', [Validators.required]],
      start_time: [this.data ? this.data?.start_time : '00:00:00', [Validators.required]],
      end_time: [this.data ? this.data?.end_time : '23:59:00', [Validators.required]],
      loading_rate: [this.data ? this.data?.loading_rate : '', [Validators.required]],
      pay_item: [this.data ? this.data?.pay_item : '']
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newPayrateLoadingForm.valid && !this.data){
      this.adminPayRateLoading.dispatch({
        type: EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING,
        payload: this.newPayrateLoadingForm.value 
      });

      this.close();
    } else if(this.newPayrateLoadingForm.valid && this.data){
      let editData = {
        id: this.data.id,
        ...this.newPayrateLoadingForm.value
      }
      this.adminPayRateLoading.dispatch({
        type: EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING,
        payload: editData
      });

      this.close();
    }
  }

}

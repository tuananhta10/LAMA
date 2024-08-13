import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeePayRateActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-pay-rate.action';
import { debounceTime, distinctUntilChanged, pairwise, takeUntil } from 'rxjs/operators';
import { AlertComponent } from '@main/shared/components';
//import { SosNumberActionTypes } from '@main/views/admin-panel/store/actions/admin-sosNumber.action';

@Component({
  selector: 'app-update-employee-payrate',
  templateUrl: './update-employee-payrate.component.html',
  styleUrls: ['./update-employee-payrate.component.scss']
})
export class UpdateEmployeePayrateComponent implements OnInit {
  private req: Subscription;
  public updatePayRateForm!: FormGroup;
  public rateType: string[] = ["Fixed Rate", "Hourly Rate", "Per Day", "Per Week", "Per Year"];
  public type: string[] = ["Individual", "Group"];
  private unsubscribe$ = new Subject<void>();
  
  /*
    E = Fixed Rate
    H = Hourly Rate
    D = Per Day 
    WK = Per Week 
    YR = Per Year 
  */

  constructor(
    public dialogRef: MatDialogRef<UpdateEmployeePayrateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminPricelist: Store<AdminProfileState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.updatePayRateForm = this.formBuilder.group({
      award_code: [this.data ? this.data?.award_code : ''],
      classification: [this.data ? this.data?.classification : ''],
      category: [this.data ? this.data?.category : ''],
      weekly_pay_rate: [this.data ? this.data?.weekly_pay_rate : 0],
      hourly_pay_rate: [this.data ? this.data?.hourly_pay_rate : 0],
      saturday_rate: [this.data ? this.data?.saturday_rate : 0],
      sunday_rate: [this.data ? this.data?.sunday_rate : 0], 
      public_holiday_rate: [this.data ? this.data?.public_holiday_rate : 0],
      afternoon_rate: [this.data ? this.data?.afternoon_rate : 0],
      night_rate: [this.data ? this.data?.night_rate : 0],
      overtime_monday_saturday_first_two: [this.data ? this.data?.overtime_monday_saturday_first_two : 0],  
      overtime_monday_saturday_after_two: [this.data ? this.data?.overtime_monday_saturday_after_two : 0], 
      overtime_public_holiday: [this.data ? this.data?.overtime_public_holiday : 0],
      less_than_10_hour_break: [this.data ? this.data?.less_than_10_hour_break : 0], 
      broken_shift: [this.data ? this.data?.broken_shift : 0],
      twentyfour_hour_shift: [this.data ? this.data?.twentyfour_hour_shift : 0]
    });

    //this.maxValueAlerts();
    //this.maxValueAlertsTTP();
  }

  maxValidatorMessage(value: number, max: number) { 
    return value > max ? 'Cannot exceed more than ' + max : null;
  }

  /* for STANDARD RATE */
  maxValueAlerts(){
    let rateObjects = [
      {
        id: 'standard_rate',
        max: 'standard_rate_max',  
        title: 'Standard Rate'
      },  

      {
        id: 'afternoon_rate',
        max: 'afternoon_rate_max',  
        title: 'Afternoon Rate'
      },  

      {
        id: 'night_rate',
        max: 'night_rate_max',  
        title: 'Night Rate'
      },  

      {
        id: 'evening_rate',
        max: 'evening_rate_max',  
        title: 'Evening Rate'
      },  

      {
        id: 'saturday_rate',
        max: 'saturday_rate_max',  
        title: 'Saturday Rate'
      },  

      {
        id: 'sunday_rate',
        max: 'sunday_rate_max',  
        title: 'Sunday Rate'
      },  

      {
        id: 'public_holiday_rate',
        max: 'public_holiday_rate_max',  
        title: 'Public Holiday Rate'
      },  
    ];

    this.generateKeyEventTrigger(rateObjects);
  }

  /* FOR TTP RATES */
  maxValueAlertsTTP(){
    let rateObjects = [
      {
        id: 'standard_rate_ttp',
        max: 'standard_rate_ttp_max',  
        title: 'Standard Rate TTP'
      },  

      {
        id: 'afternoon_rate_ttp',
        max: 'afternoon_rate_ttp_max',  
        title: 'Afternoon Rate TTP'
      },  

      {
        id: 'night_rate_ttp',
        max: 'night_rate_ttp_max',  
        title: 'Night Rate TTP'
      },  

      {
        id: 'evening_rate_ttp',
        max: 'evening_rate_ttp_max',  
        title: 'Evening Rate TTP'
      },  

      {
        id: 'saturday_rate_ttp',
        max: 'saturday_rate_ttp_max',  
        title: 'Saturday Rate TTP'
      },  

      {
        id: 'sunday_rate_ttp',
        max: 'sunday_rate_ttp_max',  
        title: 'Sunday Rate TTP'
      },  

      {
        id: 'public_holiday_rate_ttp',
        max: 'public_holiday_rate_ttp_max',  
        title: 'Public Holiday Rate TTP'
      },  
    ];

    this.generateKeyEventTrigger(rateObjects);
  }

  generateKeyEventTrigger(rateObjects: any[]): void{
    // loop to all rate object
    [...rateObjects].forEach((el, i) => {
      //to get updated value only
      this.updatePayRateForm.controls[el?.id].valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        pairwise() 
      )
      // gets a pair of old and new value
      .subscribe(([oldValue, newValue])=>{
        // if new value is greater than max rate value
        if(parseFloat(newValue) > this.data.details[`${el?.max}`]){
          // show alert
          this.openAlertDialog(this.data.details[`${el?.max}`],
            oldValue, 
            this.updatePayRateForm.controls[el?.id],
            el?.title
          );
        }
      });
    });
  }

  openAlertDialog(maxValue, oldValue, control_name, title){
    let alertDialog = this.dialog.open(
      AlertComponent,
      { 
        maxWidth: '35vw',
        data: {
          title: 'Maximum Rate Exceeded!',
          details: `The rate of $${control_name?.value} exceed the maximum "${title}" value of $${maxValue}.<br><br> By clicking continue it will override the maximum rate for "Self Funded" clients. `
        },
      }
    );

    alertDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(!result){
        control_name.setValue(maxValue);
      }
    });

  }



  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.updatePayRateForm.valid  && !this.data){
      let data = {
        id: this.data?.id,
        ...this.updatePayRateForm.value,
      }
      this.adminPricelist.dispatch({
        type: EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE,
        payload: this.updatePayRateForm.value
      }); 

      this.close();
    }  

    else if(this.updatePayRateForm.valid  && this.data){
      let editData = {
        ...this.updatePayRateForm.value,
        id: this.data?.id
      }

      this.adminPricelist.dispatch({
        type: EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE,
        payload: editData
      }); 

      this.close();
    }

    this.close();
  }

}

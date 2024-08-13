import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { debounceTime, distinctUntilChanged, pairwise, takeUntil } from 'rxjs/operators';
import { AlertComponent } from '@main/shared/components';
//import { SosNumberActionTypes } from '@main/views/admin-panel/store/actions/admin-sosNumber.action';


@Component({
  selector: 'app-update-price-list',
  templateUrl: './update-price-list.component.html',
  styleUrls: ['./update-price-list.component.scss']
})
export class UpdatePriceListComponent implements OnInit {

  private pricelist$: any;
  private req: Subscription;
  public updatePriceListForm!: FormGroup;
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
    public dialogRef: MatDialogRef<UpdatePriceListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminPricelist: Store<AdminProfileState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.updatePriceListForm = this.formBuilder.group({
      service_type_support_item_number: [this.data ? this.data?.details?.service_type_support_item_number : ''],
      rate_type: [this.data ? this.data?.details?.rate_type : ''],
      service_type_support_item_name: [this.data ? this.data?.details?.service_type_support_item_name : ''],
      service_type_support_category_name: [this.data ? this.data?.details?.service_type_support_category_name : ''],
      standard_rate: [this.data ? this.data?.details?.standard_rate : ''],
      afternoon_rate: [this.data ? this.data?.details?.afternoon_rate : ''],
      evening_rate: [this.data ? this.data?.details?.evening_rate : ''],
      night_rate: [this.data ? this.data?.details?.night_rate : ''],
      saturday_rate: [this.data ? this.data?.details?.saturday_rate : ''],
      sunday_rate: [this.data ? this.data?.details?.sunday_rate : ''],
      public_holiday_rate: [this.data ? this.data?.details?.public_holiday_rate : ''],

      standard_rate_ttp: [this.data ? this.data?.details?.standard_rate_ttp : ''],
      afternoon_rate_ttp: [this.data ? this.data?.details?.afternoon_rate_ttp : ''],
      evening_rate_ttp: [this.data ? this.data?.details?.evening_rate_ttp : ''],
      night_rate_ttp: [this.data ? this.data?.details?.night_rate_ttp : ''],
      saturday_rate_ttp: [this.data ? this.data?.details?.saturday_rate_ttp : ''],
      sunday_rate_ttp: [this.data ? this.data?.details?.sunday_rate_ttp : ''],
      public_holiday_rate_ttp: [this.data ? this.data?.details?.public_holiday_rate_ttp : ''],

      branch_state: [this.data ? this.data?.details?.branch_state : ''],

      max_employee: [this.data ? this.data?.max_employee || 1 : 1], 
      max_client: [this.data ? this.data?.max_client || 1 : 1], 
      service_type: [this.data ? this.data?.service_type : ''], 
    });

    this.maxValueAlerts();
    this.maxValueAlertsTTP();
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
      this.updatePriceListForm.controls[el?.id].valueChanges.pipe(
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
            this.updatePriceListForm.controls[el?.id],
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
    if(this.updatePriceListForm.valid  && !this.data){
      let data = {
        ...this.updatePriceListForm.value,
      }
      this.adminPricelist.dispatch({
        type: PriceListActionTypes.SAVE_PRICE_LIST,
        payload: this.updatePriceListForm.value
      }); 

      this.close();
    }  

    else if(this.updatePriceListForm.valid  && this.data){
      let editData = {
        ...this.updatePriceListForm.value,
        id: this.data?.details?.id
      }

      this.adminPricelist.dispatch({
        type: PriceListActionTypes.EDIT_PRICE_LIST,
        payload: editData
      }); 

      this.close();
    }

    this.close();
  }


}

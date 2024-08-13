import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-charge-rate-modal',
  templateUrl: './charge-rate-modal.component.html',
  styleUrls: ['./charge-rate-modal.component.scss']
})
export class ChargeRateModalComponent implements OnInit {

  public chargeRateForm!: FormGroup;
  priceListOptions: any[] = ["Type 1"];
  priceListPeriodOptions: any[] = ["Type 1"];
  serviceTypeOptions: any[] = ["Type 1"];
  rateTypeOptions: any[] = ["Hourly Rate", "Fixed Rate", "Per Day", "Hourly Rate - Apportion", "Fixed Rate - Apportion"];
  payItemOptions: any[] = ["Type 1"];
  payItemAhOptions: any[] = ["Type 1"];
  payItemSatOptions: any[] = ["Type 1"];
  payItemSunOptions: any[] = ["Type 1"];
  
  constructor(
    public dialogRef: MatDialogRef<ChargeRateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.chargeRateForm = this.formBuilder.group({
      price_list: ['', [Validators.required]],
      price_list_period: [''],
      service_type: ['', [Validators.required]],
      rate_type: ['', [Validators.required]],
      afternoon_rate: ['', [Validators.required]],
      night_rate: ['', [Validators.required]],
      saturday_rate: ['', [Validators.required]],
      sunday_rate: ['', [Validators.required]],
      public_holiday_rate: ['', [Validators.required]],
      pay_item: [''],
      pay_item_ah: [''],
      pay_item_sat: [''],
      pay_item_sun: [''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.chargeRateForm.valid){
      this.dialogRef.close(this.chargeRateForm.value);
    }
  }
}

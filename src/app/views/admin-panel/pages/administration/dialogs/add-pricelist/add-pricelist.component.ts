import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { PricelistStepperConstants } from './pricelist-stepper-constants';
import { pricelistSteps } from './pricelist-stepper-tabs';
import { AddPricelistPeriodComponent } from '../add-pricelist-period/add-pricelist-period.component';  
import { AddPricelistRatesComponent } from '../add-pricelist-rates/add-pricelist-rates.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-pricelist',
  templateUrl: './add-pricelist.component.html',
  styleUrls: ['./add-pricelist.component.scss']
})
export class AddPricelistComponent implements OnInit {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public priceListForm!: FormGroup;
  public priceDetailsColumns:any[] =  [
    {name: 'Name', field: 'name'}, {name: 'Pricelist', field: 'price_list'}, {name: 'Effective From', field: 'effective_from'},  {name: 'Effective To', field: 'effective_to'}
  ]
  public priceDetailsdata:any[] = [];
  public priceRateColumns:any[] =  [
    {name: 'Code', field: 'code'}, {name: 'Name', field: 'name'}, {name: 'Rate Type', field: 'rate_type'}, 
    {name: 'Rate', field: 'rate'}, {name: 'Afternoon Rate', field: 'afternoon_rate'}, {name: 'Night Rate', field: 'night_rate'}, {name: 'Saturday Rate', field: 'saturday_rate'}, {name: 'Sunday Rate', field: 'sunday_rate'}, 
    {name: 'Public Holiday Rate', field: 'public_holiday_rate'}
  ]
  public priceRatedata:any[] = [];
  public formStep: any = 1;
  public pricelistSteps$: any = pricelistSteps;
  public navigation: any = {};
  @ViewChild('pricelistStepper') pricelistStepper: MatStepper;

  constructor(    
    public dialogRef: MatDialogRef<AddPricelistComponent>,
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.priceListForm = this.formBuilder.group({
      name: [this.data ? this.data?.details?.name : '', [Validators.required]],
      type: [this.data ? this.data?.details?.type : ''],
      effective_date_from: [this.data ? new Date(this.data?.details?.effective_date_from) : '', [Validators.required]],
      effective_time_from: [this.data ? this.data?.details?.effective_time_from : ''],
      effective_date_to: [this.data ? new Date(this.data?.details?.effective_date_to) : '', [Validators.required]],
      effective_time_to: [this.data ? this.data?.details?.effective_time_to : ''],
    });

    this.priceListStepperNavigation();
  }

  priceListStepperNavigation(){
    if(this.formStep === 1){
      this.getNavigationPricelist(PricelistStepperConstants.pricelistDetails)
    } else if (this.formStep === 2) {
      this.getNavigationPricelist(PricelistStepperConstants.pricelistRates)
    }
  }

  public updateStepperPricelist(step: number): void {
    this.formStep < step ? this.pricelistStepper.next() : this.pricelistStepper.previous();
    this.formStep = step;

    this.priceListStepperNavigation();
  }

  public getNavigationPricelist(e: string): void {
    const stepIndex = this.pricelistSteps$.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  openPriceDetailsModal(e, data?) {
    let createClientDialog = this.dialog.open(
      AddPricelistPeriodComponent,
      { 
        minWidth: '30vw',
        data: {
          details: data.details,  
          pricelist: data?.pricelist
        },
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  openPriceRateModal(e, data?) {
    let createClientDialog = this.dialog.open(
      AddPricelistRatesComponent,
      { 
        minWidth: '70vw',
        data: {
          details: data.details,  
          pricelist: data?.pricelist
        },
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }
  
  next(){
    this.updateStepperPricelist(this.navigation?.next);
  }

  back(){
    this.updateStepperPricelist(this.navigation?.previous);
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.priceListForm.valid){
      this.dialogRef.close(this.priceListForm.value);
    }
  }
}

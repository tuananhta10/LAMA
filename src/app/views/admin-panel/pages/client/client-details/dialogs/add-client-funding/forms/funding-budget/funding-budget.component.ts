import { Component, Input, OnInit,  ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { mainAnimations } from '@app-main-animation';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-funding-budget',
  animations: [mainAnimations],
  templateUrl: './funding-budget.component.html',
  styleUrls: ['./funding-budget.component.scss']
})
export class FundingBudgetComponent implements OnInit, OnDestroy {

  @Input() fundingBudgetForm: FormGroup;
  @Input() data: any = {};
  @Input() stepper: number = 1;
  @Input() isDisabled: boolean = false;

  private unsubscribe$ = new Subject<void>()
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  enum$: any;  
  private req: Subscription;

  clientLoading: boolean = false;
  fundingSourceLoading: boolean = false;
  priceListLoading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private adminEnumStore: Store<AdminProfileState>
  ) {}

  ngOnInit(): void {
    this.subscribeEnums();
  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));

    this.req = this.enum$.subscribe((results: any) => {
      this.priceListLoading = results.fundingSource.pending || results.clients.clientListPending || results.priceList.pending;
    });

    this.calculateBudget()
    // balance = budget - utilized total
    // this.fundingBudgetForm.controls['budget']
    // .valueChanges.pipe(takeUntil(this.unsubscribe$))
    // .subscribe((result) => {
    //   if(result){
    //     let utilised_total = (this.fundingBudgetForm.controls['utilise_total'].value * 1) || 0;
    //     let utilise_running_total = (this.fundingBudgetForm.controls['utilise_running_total'].value * 1) || 0
    //     // let allocated =  this.fundingBudgetForm.controls['allocated'].value * 1;
    //     let budget = result * 1;  
    //     let balance = Math.round ((budget - ((utilised_total + utilise_running_total) )) * 100) / 100;
    //     this.fundingBudgetForm.controls['balance'].setValue(balance);
    //   }
    // });

    // this.fundingBudgetForm.controls['utilise_running_total']
    // .valueChanges.pipe(takeUntil(this.unsubscribe$))
    // .subscribe((result) => {
    //   if(result){
    //     let utilised_total = (this.fundingBudgetForm.controls['utilise_total'].value * 1) || 0;
    //     let utilise_running_total = (this.fundingBudgetForm.controls['utilise_running_total'].value * 1) || 0
    //     // let allocated =  this.fundingBudgetForm.controls['allocated'].value * 1;
    //     let budget = this.fundingBudgetForm.controls['budget'].value * 1;
    //     let balance = Math.round ((budget - ((utilised_total + utilise_running_total) )) * 100) / 100;
    //     this.fundingBudgetForm.controls['balance'].setValue(balance);
    //   }
    // });

    // this.fundingBudgetForm.controls['utilise_total']
    // .valueChanges.pipe(takeUntil(this.unsubscribe$))
    // .subscribe((result) => {
    //   if(result){
    //     let utilised_total = (result * 1) || 0;  
    //     let utilise_running_total = (this.fundingBudgetForm.controls['utilise_running_total'].value * 1) || 0
    //     // let allocated =  this.fundingBudgetForm.controls['allocated'].value * 1;
    //     let budget = this.fundingBudgetForm.controls['budget'].value * 1;  
    //     let balance = Math.round ((budget - ((utilised_total + utilise_running_total) )) * 100) / 100;
    //     this.fundingBudgetForm.controls['balance'].setValue(balance);
    //   }
    // });

    // this.fundingBudgetForm.controls['allocated']
    // .valueChanges.pipe(takeUntil(this.unsubscribe$))
    // .subscribe((result) => {
    //   if(result){
    //     let utilised_total = (this.fundingBudgetForm.controls['utilise_total'].value * 1) || 0;  
    //     let utilise_running_total = (this.fundingBudgetForm.controls['utilise_running_total'].value * 1) || 0
    //     // let allocated =  result * 1;
    //     let budget = this.fundingBudgetForm.controls['budget'].value * 1;  
    //     let balance = Math.round ((budget - ((utilised_total + utilise_running_total) )) * 100) / 100;
    //     this.fundingBudgetForm.controls['balance'].setValue(balance);
    //   }
    // });
  }

  calculateBudget(){
    combineLatest([
      this.fundingBudgetForm.controls['budget'].valueChanges,
      this.fundingBudgetForm.controls['utilise_running_total'].valueChanges,
      this.fundingBudgetForm.controls['utilise_total'].valueChanges,
      this.fundingBudgetForm.controls['allocated'].valueChanges
    ])
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(([budget, utiliseRunningTotal, utiliseTotal, allocated]) => {
      if (budget) {
        let utilisedTotal = (utiliseTotal * 1) || 0;
        let utilisedRunningTotal = (utiliseRunningTotal * 1) || 0;
        let balance = Math.round((budget - (utilisedTotal + utilisedRunningTotal)) * 100) / 100;
        this.fundingBudgetForm.controls['balance'].setValue(balance);
      }
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.req.unsubscribe();
    this.unsubscribe$?.next()
    this.unsubscribe$?.complete();
  }

}

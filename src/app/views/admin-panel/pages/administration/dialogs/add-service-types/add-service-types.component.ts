import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChargeRateModalComponent } from './sub-modal/charge-rate-modal/charge-rate-modal.component';
import { FundingCodeComponent } from './sub-modal/funding-code-modal/funding-code-modal.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Store } from '@ngrx/store';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';

@Component({
  selector: 'app-add-service-types',
  templateUrl: './add-service-types.component.html',
  styleUrls: ['./add-service-types.component.scss']
})
export class AddServiceTypesComponent implements OnInit {

  public serviceTypeForm!: FormGroup;
  typeOptions: any[] = ["Group", "Transport", "Individual", "Expense"];
  categoryOptions: any[] = ["Finding and keeping a job"]
  jobTypeOptions: any[] = ["Maintenance", "Domestic", "Care Services", "Nursing Services"];
  serviceLocationOptions: any[] = ["In-Home Service", "Center-based Service", "Community-based Service"];
  claimTypeOptions: any[] = ["Non Face to face", "Telehealth", "Irregular SIL Supports"];
  calculationMethodOptions: any[] = ["Type 1"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  chargeRateColumns:any[] =  [
    {name: 'Name', field: 'name'}, {name: 'Pricelist', field: 'price_list'}, {name: 'Service Type', field: 'service_type'}, {name: 'Rate Type', field: 'rate_type'}, 
    {name: 'Rate', field: 'rate'}, {name: 'After Hour Rate', field: 'after_hour_rate'}, {name: 'Saturday Rate', field: 'saturday_rate'}, {name: 'Sunday Rate', field: 'sunday_rate'}, 
    {name: 'Holiday rate', field: 'holiday_rate'}, {name: 'Effective From', field: 'effective_from'},  {name: 'Effective To', field: 'effective_to'}
  ]
  chargeRateTableData:any[] = [];

  fundingCodeColumns:any[] = [
    {name: 'Name', field: 'name'}, {name: 'Funding Source', field: 'funding_source'}, {name: 'Group Service', field: 'group_service'}, {name: 'Service Type', field: 'service_type'}, 
    {name: 'Code', field: 'code'}, {name: 'Has A/H Rate', field: 'has_ah_rate'}, {name: 'After Hour Rate Code', field: 'after_hour_rate_code'}, {name: 'Saturday Rate Code', field: 'saturday_rate_code'}, 
    {name: 'Sunday Rate Code', field: 'sunday_rate_code'}, {name: 'Public Holiday rate', field: 'public_holiday_rate'}
  ]
  fundingCodeTableData:any[] = [];

  isUpdate:boolean = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<AddServiceTypesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private adminServiceType: Store<AdminProfileState>,
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.serviceTypeForm = this.formBuilder.group({
      code: [this.data ? this.data.code : '', [Validators.required]],
      name: [this.data ? this.data.name : '', [Validators.required]],
      type: [this.data ? this.data.type : '', [Validators.required]],
      category: [this.data ? this.data.category : '', [Validators.required]],
      job_type: [this.data ? this.data.job_type : '', [Validators.required]],
      service_location: [this.data ? this.data.service_location : '', [Validators.required]],
      taxable: [''],
      claim_type: ['', [Validators.required]],
      pay_travel: [''],
      care_worker_management: [''],
      min_employees: ['', [Validators.required]],
      max_employees: ['', [Validators.required]],
      max_travel_time: ['', [Validators.required]],
      allowance_pay_type: [''],
      max_travel_mileage: ['', [Validators.required]],
      max_transport_mileage: ['', [Validators.required]],
      override_pay_rate: ['', [Validators.required]],
      color_code: [''],
      sil_code: [''],
      restrict_by_qualification: [''],
      override_minimum_classification: [''],
      override_maximum_classification: [''],
      after_hour_calculation_method: ['', [Validators.required]],
      after_hour_start: ['', [Validators.required]],
      after_hour_end: ['', [Validators.required]],
    });
  }

  openChargeRateModal(e){
    let preDefinedProviderDialog = this.dialog.open(
      ChargeRateModalComponent,
      {
        data: {
        },
      }
    );

    preDefinedProviderDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        this.chargeRateTableData.push(result);
      }
    });
  }

  openFundingCodeModal(e){
    let preDefinedProviderDialog = this.dialog.open(
      FundingCodeComponent,
      {
        data: {
        },
      }
    );

    preDefinedProviderDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        this.fundingCodeTableData.push(result);
      }
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.serviceTypeForm.valid && !this.data){
      this.adminServiceType.dispatch({
        type: ServiceTypeActionTypes.SAVE_SERVICE_TYPE,
        payload: this.serviceTypeForm.value 
      });

      this.close();
    }
    else if(this.serviceTypeForm.valid && this.data) {

      let editData = {
        id: this.data.id,
        ...this.serviceTypeForm.value
      }
      this.adminServiceType.dispatch({
        type: ServiceTypeActionTypes.EDIT_SERVICE_TYPE,
        payload: editData
      });

      this.close();
    }
  }

}

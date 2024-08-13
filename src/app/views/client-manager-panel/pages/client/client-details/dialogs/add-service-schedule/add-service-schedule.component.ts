import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { steps } from './stepper-tabs';
import { StepModel } from '@app-shared/components/stepper/model';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';
import { Subscription } from 'rxjs';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';

@Component({
  selector: 'app-add-service-schedule',
  templateUrl: './add-service-schedule.component.html',
  styleUrls: ['./add-service-schedule.component.scss']
})
export class AddServiceScheduleComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  public steps: any = steps;

  public partnerDetailsForm: FormGroup;
  public serviceTaskForm: FormGroup;
  public serviceTravelForm: FormGroup;
  public formStep: number = 1;

  clientEnums$: any;
  clientEnums: any;
  clientFundingEnums$: any;
  clientFundingEnums: any;
  priceListEnums$: any;
  priceListEnums: any;
  serviceTypeEnums: any;
  serviceTypeEnums$: any;
  loading: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<AddServiceScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private adminserviceSchedule: Store<AdminProfileState>,
  ) {}

  ngOnInit(): void {

    this.partnerDetailsForm = this.formBuilder.group({
      type: [this.data ? this.data.type : '', [Validators.required]],
      client: [this.data ? this.data.client : '',],
      client_funding: [this.data ? this.data.client_funding : '',],
      pricelist: [this.data ? this.data.pricelist : '',],
      service_type_id: [this.data ? this.data.service_type_id : '',],
      activity: [this.data ? this.data.activity : '',],
      additional_roster_comments: [this.data ? this.data.additional_roster_comments : '',],
      ah_calculation: [this.data ? this.data.ah_calculation : '', [Validators.required]],
      status: [this.data ? this.data.status : 'Setup', [Validators.required]],
      billable: [this.data ? this.data.billable : true, [Validators.required]],
      override_availability: [this.data ? this.data.override_availability : true, [Validators.required]],
      override_qualifications: [this.data ? this.data.override_qualifications : true],
      override_qualification_reason: [this.data ? this.data.override_qualification_reason : ''],
    });

    this.serviceTaskForm = this.formBuilder.group({
      completed_tasks: [this.data ? this.data.completed_tasks : ''],
      total_tasks: [this.data ? this.data.total_tasks : ''],
      start_time: [this.data ? this.data.start_time : '', [Validators.required]],
      end_time: [this.data ? this.data.end_time : '', [Validators.required]],
      start_date: [this.data ? new Date(this.data.start_date * 1000) : '', [Validators.required]],
      end_date: [this.data ?  new Date(this.data.end_date * 1000) : '', [Validators.required]],
      total_hours: [this.data ? this.data.total_hours : 0],
      admin_hours: [this.data ? this.data.admin_hours : 0],
      service_hours: [this.data ? this.data.service_hours : 0],
      break_hours: [this.data ? this.data.break_hours : 0],
      calculated_cost: [this.data ? this.data.calculated_cost : 0],
      expenses_total: [this.data ? this.data.expenses_total : 0],
      service_fees: [this.data ? this.data.service_fees : 0],
      travel_total: [this.data ? this.data.travel_total : 0],
      client_total: [this.data ? this.data.client_total : 0],
    })

    this.serviceTravelForm = this.formBuilder.group({
      shift_address: [this.data ? this.data.shift_address : ''],
      end_shift_address: [this.data ? this.data.end_shift_address : ''],
      charge_travel_to_client: [this.data ? this.data.charge_travel_to_client : ''],
      travel_hours: [this.data ? this.data.travel_hours : ''],
      travel_distance: [this.data ? this.data.travel_distance : ''],
      travel_distance_rate: [this.data ? this.data.travel_distance_rate : ''],
      total_travel_km: [this.data ? this.data.total_travel_km : ''],
      transport_distance: [this.data ? this.data.transport_distance : ''],
      transport_distance_rate: [this.data ? this.data.transport_distance_rate : ''],
      total_transport: [this.data ? this.data.total_transport : ''],
      travel_time_rate: [this.data ? this.data.travel_time_rate : ''],
      shift_notes: [this.data ? this.data.shift_notes : ''],
    })
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  public updateStepper(step: number): void {
    // this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;
  }

  checkFormDisabled(){
    return this.formStep === 1 ? this.partnerDetailsForm.valid 
    : this.formStep === 2 ? this.serviceTaskForm.valid 
    : this.formStep === 3 ? this.serviceTravelForm.valid 
    : false;
  }

  save() {
    if(this.partnerDetailsForm.valid && this.serviceTaskForm.valid && this.serviceTravelForm.valid && !this.data){
      let data = {
        ...this.partnerDetailsForm.value,
        ...this.serviceTaskForm.value,
        ...this.serviceTravelForm.value
      }
      this.adminserviceSchedule.dispatch({
        type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE,
        payload: data
      });

    } else if (this.partnerDetailsForm.valid && this.serviceTaskForm.valid && this.serviceTravelForm.valid && this.data) {
 
      let editData= {
        id: this.data.id,
        ...this.partnerDetailsForm.value,
        ...this.serviceTaskForm.value,
        ...this.serviceTravelForm.value
      }
      this.adminserviceSchedule.dispatch({
        type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE,
        payload: editData 
      });

    }
  }

  next(){
    if(this.formStep != 3){
      this.formStep = this.formStep + 1;
    }
  }

  back(){
    if(this.formStep != 1){
      this.formStep = this.formStep - 1;
    }
  }

}

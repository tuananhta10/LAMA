import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientGoalDetailsComponent } from '../../components/goals/goals-form/client-goal-details/client-goal-details.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';

@Component({
  selector: 'app-add-client-funding',
  templateUrl: './add-client-funding.component.html',
  styleUrls: ['./add-client-funding.component.scss']
})
export class AddClientFundingComponent implements OnInit {

  public partnerDetailsForm: FormGroup;

  public type: string[] = [
    "Individual",
    "Group",
    "Group/Individual"
  ];

  public clients: any[] = [];
  public fundingSource: any[] = [];
  public priceList: any[] = [];

  public serviceTypes: any[] = [
    "Activity Based Transport",
    "Activity Community, Social, and Rec Activities ",
    "Assessment Recommendation, Theraphy And/Or Training"
  ];

  public invoiceTo: any[] = [
    "John Mackovich",
    "James Martin",
    "Eileen Johnson"
  ];

  public statusOptions:any[] = ["Setup"];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  enum$: any;  
  private req: Subscription;

  clientLoading: boolean = false;
  fundingSourceLoading: boolean = false;
  priceListLoading: boolean = false;

  
  @ViewChild(ClientGoalDetailsComponent) clientGoalDetails: ClientGoalDetailsComponent;

  constructor(
    public dialogRef: MatDialogRef<ClientGoalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private adminEnumStore: Store<AdminProfileState>
  ) {}

  ngOnInit(): void {
    this.partnerDetailsForm = this.formBuilder.group({
      funding_type: [this.data ? this.data.funding_type : '', [Validators.required]],
      client_id: [this.data ? this.data.client_id : ''],
      funding_source_id: [this.data ? this.data.funding_source_id : '', [Validators.required]],
      registration_no: [this.data ? this.data.registration_no : ''],
      price_list_id: [this.data ? this.data.price_list : '', [Validators.required]],
      invoice_to: [this.data ? this.data.invoice_to : ''],
      
      start_date: [this.data ? this.convertToDate(this.data.start_date) : '', [Validators.required]],
      end_date: [this.data ? this.convertToDate(this.data.end_date) : '', [Validators.required]],
      budget: [this.data ? this.data.budget : '', [Validators.required]],
      allocated: [this.data ? this.data.allocated : ''],
      utilise_total: [this.data ? this.data.utilise_total : '', [Validators.required]],
      used_to_date: [this.data ? this.convertToDate(this.data.used_to_date) : ''],
      balance: [this.data ? this.data.balance : ''],
    });

    this.subscribeEnums();
    
    this.adminEnumStore.dispatch({
      type: ClientListActionTypes.GET_CLIENT_LIST
    });

    this.adminEnumStore.dispatch({
      type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST
    });

    this.adminEnumStore.dispatch({
      type: PriceListActionTypes.GET_PRICE_LIST_LIST
    });

  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));

    this.req = this.enum$.subscribe((results: any) => {
      this.clients = results.clients.clientList;

      if(results.priceList.priceListList){
        results.priceList.priceListList.forEach(element => {
          element.name = element.type
        });
        this.priceList = results.priceList.priceListList.filter(el => el?.id !== 1);
      }

      if(results.fundingSource.fundingSourceList){
        results.fundingSource.fundingSourceList.forEach(element => {
          element.name = element.full_name
        });
        this.fundingSource = results.fundingSource.fundingSourceList
      }

      //this.priceListLoading = results.priceList.pending;
      this.clientLoading = results.clients.clientListPending;
      this.fundingSourceLoading = results.fundingSource.pending;
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  checkFormDisabled(){
    return this.partnerDetailsForm.valid 
  }

  convertToDateTime(dateVal: Date){
    return Math.ceil(new Date(dateVal).getTime() / 1000);
  }

  convertToDate(dateTime){
    return new Date(dateTime * 1000)
  }

  save() {
    if(this.partnerDetailsForm.valid && !this.data){
      let data = {...this.partnerDetailsForm.value};
      data.start_date = this.convertToDateTime(data.start_date);
      data.end_date = this.convertToDateTime(data.end_date)

      this.adminEnumStore.dispatch({
        type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING,
        payload: data
      });

      this.close();
    }
    else if(this.partnerDetailsForm.valid && this.data) {
      let editData = {
        id: this.data.id,
        ...this.partnerDetailsForm.value
      }
      
      editData.start_date = this.convertToDateTime(editData.start_date);
      editData.end_date = this.convertToDateTime(editData.end_date)

      this.adminEnumStore.dispatch({
        type: ClientFundingActionTypes.EDIT_CLIENT_FUNDING,
        payload: editData
      });

      this.close();
    }
  }

  close() {
    this.dialogRef.close(null);
  }


}

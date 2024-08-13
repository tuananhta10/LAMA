import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientGoalDetailsComponent } from '../../components/goals/goals-form/client-goal-details/client-goal-details.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { Subject, Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { select, Store } from '@ngrx/store';
import { StepModel } from '@main/shared/components/stepper/model';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { AddClientFundingStepperConstants } from './add-client-funding-stepper-constant';
import { addClientFundingSteps } from './add-client-funding-stepper-tabs';
import { ClientFundingState } from '@main/views/admin-panel/store/reducers/admin-client-funding.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { PriceListService } from '@main/shared/services/admin-panel/admin-price-list.service';

@Component({
  selector: 'app-add-client-funding',
  templateUrl: './add-client-funding.component.html',
  styleUrls: ['./add-client-funding.component.scss']
})
export class AddClientFundingComponent implements OnInit {
  public partnerDetailsForm: FormGroup;
  public publishForm: FormGroup;
  public fundingBudgetForm: FormGroup;

  public steps: any = addClientFundingSteps;
  public navigation: any = {};
  @ViewChild('stepper') scheduleStepper: MatStepper;
  formStep: number = 1;
  stepper: number = 1;

  enum$: any;  
  private req: Subscription;
  public priceListLoading: boolean = false;
  public saveLoading: boolean = false;
  public loading: boolean = true;

  fundingSourceLoading: boolean = false
  supportItemDataFromAPI: any

  private clientFundingData$: any;
  private clientFundingReq: Subscription;
  private unsubscribe$ = new Subject<void>();
  public radioOptions:any[] = [{id: true, name: "Published", value: true}, {id: false, name:"Unpublished", value: false}];
  clientId:any = ''

  @ViewChild(ClientGoalDetailsComponent) clientGoalDetails: ClientGoalDetailsComponent;

  constructor(
    public dialogRef: MatDialogRef<ClientGoalDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private adminEnumStore: Store<AdminProfileState>,
    private priceListService: PriceListService,

    private snackBar: MatSnackBar,
    private route:ActivatedRoute
  ) {
    // console.log("FUNDING DATA", data)
    this.clientId = this.route.snapshot.paramMap.get('id');


  }

  ngOnInit(): void {    

    if(this.data?.transactionType === 'create'){
      this.subscribeClientFunding();
    }

    this.subscribeEnums();
    this.formControlPatch()
    
    if(this.data?.to_publish){
      setTimeout(() => this.loading = false, 1200);
    }
  }

  private formControlPatch():void {

    this.partnerDetailsForm = this.formBuilder.group({
      funding_type: [this.data ? this.data.funding_type : '', [Validators.required]],
      client_id: [this.data ? this.data.client_id : ''],
      funding_source_id: [this.data ? this.data.funding_source_id : '', [Validators.required]],
      registration_no: [this.data ? this.data.registration_no || '': ''],
      service_location: [this.data ? (this.data.service_location || 'ACT') : 'ACT', [Validators.required]],
      support_items: [null],
      version_items: [null],
      main_branch_id: [this.data ? this.data.main_branch_id : ''],
      invoice_to: [this.data ? this.data.invoice_to || '' : '']
    });

    this.fundingBudgetForm = this.formBuilder.group({
      start_date: [this.data?.start_date ? this.convertToDate(this.data.start_date) : '', [Validators.required]],
      end_date: [this.data?.end_date ? this.convertToDate(this.data.end_date) : '', [Validators.required]],
      budget: [this.data ? this.data.budget || 0 : 0, [Validators.required]],
      allocated: [this.data ? this.data.allocated || 0 : 0],

      utilise_total: [this.data ? this.data?.utilise_total || 0 : 0],
      utilise_running_total: [this.supportItemDataFromAPI ? this.supportItemDataFromAPI?.utilise_running_total || 0 : 0],
            //used_to_date: [this.data ? (this.data.used_to_date || 0) : 0],
      balance: [this.data ? this.data.balance || 0 : 0],
    });
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();
    if(this.req) this.req.unsubscribe();
  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));

    this.req = this.enum$.subscribe((results: any) => {
        this.priceListLoading = results.fundingSource.pending || results.clients.clientListPending || results.priceList.pending  ;   
    });

    if(this.data?.id){
      this.getSupportItemsData();      
    }else{
      this.formControlPatch()
    }
  }

  subscribeClientFunding(){
    this.clientFundingData$ = this.adminEnumStore.pipe(select(state => state.clientFunding));

      this.clientFundingReq =  this.clientFundingData$.subscribe((clientFunding: ClientFundingState) => {
        this.saveLoading = clientFunding.pending;

        if(clientFunding.clientFundingReturn){
          this.data.id = clientFunding.clientFundingReturn[0].id;

          this.snackBar.open("Successfully saved client funding", "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
        }
        // console.log(clientFunding.clientFundingReturn);

      })
  }

  private getSupportItemsData(): void{
    this.adminEnumStore.dispatch({
      type: ClientFundingActionTypes.GET_CLIENT_FUNDING,
      payload: {
        id: this.data?.id
      }
    });

    this.clientFundingReq = this.enum$?.subscribe((clientFunding: any) => {
      let data = clientFunding?.clientFunding?.clientFunding;
      
      this.fundingSourceLoading = clientFunding?.clientFunding?.pendingDetails;

      if(data?.length > 0){
        this.supportItemDataFromAPI = {};
        const lastIndex = data[0]?.client_funding_price_list.length - 1;        
        // generate support item list 
        this.supportItemDataFromAPI = data[0];
        this.fundingBudgetForm.controls['utilise_running_total'].setValue(data[0]?.utilise_running_total)
        const priceListData = data[0]?.client_funding_price_list[lastIndex]?.price_list[0];
        if (priceListData) {
          this.partnerDetailsForm.patchValue({
            version_items: priceListData.version,
          });
        }
        // this.partnerDetailsForm.controls['version_items'].setValue(data[0]?.client_funding_price_list[0].price_list[0].version)
        // this.formControlPatch()
      }

    //   if(data?.length > 0){
    //     this.supportItemDataFromAPI = {};
    //     const lastIndex = data.length - 1;
    //     this.supportItemDataFromAPI = data[lastIndex];
    //     this.fundingBudgetForm.controls['utilise_running_total'].setValue(data[lastIndex]?.utilise_running_total);
    
    //     const priceListData = data[lastIndex]?.client_funding_price_list[0]?.price_list[0];
    //     console.log(priceListData);
        
    //     if (priceListData) {
    //         this.partnerDetailsForm.patchValue({
    //             version_items: priceListData.service_type_support_version,
    //         });
    //     }
    //     // this.partnerDetailsForm.controls['version_items'].setValue(data[lastIndex]?.client_funding_price_list[0].price_list[0].version)
    //     // this.formControlPatch()
    // }
    });
  }


  close() {
    this.displayedFundingSupport = [];
    this.dialogRef.close(null);
  }

  checkFormDisabled(){
    if(this.data){
      return this.partnerDetailsForm.valid && this.fundingBudgetForm.valid  && this.data?.status !== 'Published'
    }else{
      return this.partnerDetailsForm.valid && this.fundingBudgetForm.valid
    }
  }

  convertToDateTime(dateVal: Date){
    return Math.ceil(new Date(dateVal).getTime() / 1000);
  }

  convertToDate(dateTime){
    if(typeof dateTime === 'string'){
      return new Date(dateTime)
    }
    return new Date(dateTime * 1000)
  }

  save() {
    if(!this.data?.fromProfile){
      if(this.partnerDetailsForm.valid && !this.data){
        let data = {
          ...this.partnerDetailsForm.value,
          ...this.fundingBudgetForm.value,  
          "client-funding-price-list": this.client_funding_price_list,
          status: "Unpublished"
        };
        delete data['']

        data.start_date = this.convertToDateTime(data.start_date);
        data.end_date = this.convertToDateTime(data.end_date);
        data.client_id = data?.client_id?.id ? data?.client_id?.id : this.partnerDetailsForm.value.client_id;

        // console.log(data)

        delete data['support_items'];

        this.adminEnumStore.dispatch({
          type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING,
          payload: data
        });

        this.close();

      }
      else if(this.partnerDetailsForm.valid && this.data) {
        let editData = {
          id: this.data.id,
          ...this.partnerDetailsForm.value,
          ...this.fundingBudgetForm.value,  
          "client-funding-price-list": this.client_funding_price_list
        }
        
        editData.start_date = this.convertToDateTime(editData.start_date);
        editData.end_date = this.convertToDateTime(editData.end_date)
        editData.client_id = +this.data?.client_id;

        delete editData['support_items'];

        this.adminEnumStore.dispatch({
          type: ClientFundingActionTypes.EDIT_CLIENT_FUNDING,
          payload: editData
        });

        this.close();
      }
    }

    else {

      if(this.data?.id){
        let data = {
          ...this.partnerDetailsForm.value,
          ...this.fundingBudgetForm.value,
          "client-funding-price-list": this.client_funding_price_list,
          id: this.data?.id
        }
  
        data.client_id = data?.client_id?.id;

        this.adminEnumStore.dispatch({
          type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING_SUCCESS,
          payload: {
            message: null,
            data: null
          }
        });
  
        this.dialogRef.close(data);
      } else {
        let data = {
          ...this.partnerDetailsForm.value,
          ...this.fundingBudgetForm.value,  
          "client-funding-price-list": this.client_funding_price_list,
          status: "Unpublished"
        };
        delete data['']

        data.start_date = this.convertToDateTime(data.start_date);
        data.end_date = this.convertToDateTime(data.end_date);
        data.client_id = data?.client_id?.id ? data?.client_id?.id : this.partnerDetailsForm.value.client_id;

        // console.log(data)

        delete data['support_items'];

        this.adminEnumStore.dispatch({
          type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING,
          payload: data
        });
      }
      
    }
  }

  publishFunding(){
    if(this.partnerDetailsForm.valid && this.data && this.displayedFundingSupport?.length > 0) {
      let editData = {
        id: this.data.id,
        status: this.data?.status === 'Published' ? 'Unpublished' : 'Published'
      }
      this.adminEnumStore.dispatch({
        type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING_SUCCESS,
        payload: {
          message: null,
          data: null
        }
      });
      this.adminEnumStore.dispatch({
        type: ClientFundingActionTypes.EDIT_CLIENT_FUNDING,
        payload: editData
      });
      setTimeout(() => {
        this.loading = false
        window.location.reload()
      }, 1000);

      this.close();
    } 
    else {
      this.data.to_publish = false;
      this.stepper = 3;
    }
  }

  onChangeCheckbox(ret:any, index){
    // this.publishForm.controls['status'].setValue(ret.checked)
    this.publishFundingAlert(true)
  }

  publishFundingAlert(event){
    // console.log(event)
    if(event){
      this.dialogRef.close()
      let createClientDialog = this.dialog.open(
        AddClientFundingComponent,
        {
          minWidth: '25vw',
          maxWidth: '1100px',
          maxHeight: '96vh',
          data: {
            ...this.data,  
            to_publish: true
          }
        }
      );
    }
  }

  public client_funding_price_list;
  public displayedFundingSupport: any[] = []

  getClientFundingPriceList(event){
    // console.log("EVENT", event)
    this.client_funding_price_list = event;
  }

  getDisplayedFundingSupport(event){
    // console.log(event)
    this.displayedFundingSupport = event;
  }
}

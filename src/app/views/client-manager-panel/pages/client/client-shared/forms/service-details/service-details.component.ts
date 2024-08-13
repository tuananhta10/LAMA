import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { ProgramModalComponent } from '../../modals/program-modal/program-modal.component';
import { MinimumClassificationModalComponent } from '../../modals/minimum-classification-modal/minimum-classification-modal.component';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { ClientFundingModalComponent } from '../../modals/client-funding-modal/client-funding-modal.component';
import { ServiceTemplateModalComponent } from '../../modals/service-template/service-template-modal.component';
import { PlanReviewModalComponent } from '../../modals/plan-review/plan-review-modal.component';
import { ClientGoalModalComponent } from '../../modals/client-goal-modal/client-goal-modal.component';

import { ClientConstants } from '../../../constants';
import { DatePipe } from '@angular/common';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { parseArrayObject } from '@main/shared/utils/parse.util';
import { getUnixTime } from 'date-fns';

@Component({
  selector: 'app-service-details.',
  animations: [mainAnimations],
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {
  isLinear = false;
  serviceDetailsForm!: FormGroup;
  required:boolean = true;
  serviceRequiredOptions:any[] = ["Permanent care", "Respite Care", "Community services"];
  serviceLocationOptions:any[] = ["Client Direct Service", "Centre/Community Based Service"];

  @Input() navigation: any = {};
  @Input() serviceDetailsData: any;
  @Input() isUpdate: boolean = false;
  
  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe$ = new Subject<void>();
  private req: Subscription;

  enum$: any;
  fundingSource$: any;
  fundingSourceReq: any;
  programsEnum: any;
  classificationsEnums: any;
  loading:boolean = true;

  clientFundingColumns: any[] = [{name: 'Name',field: 'name'},{name: 'Funding Source',field: 'funding_source_code'},{name: 'Type',field: 'funding_type'},{name: 'Start Date',field: 'start_date'},
    { name: 'End Date', field: 'end_date' }, {name: 'Budget', field: 'budget'}, {name: 'Allocated', field: 'allocated'}, {name: 'Utilise Total', field: 'utilise_total'},
    {name: 'Balance', field: 'balance'}, {name: 'Registration No', field: 'registration_no'}, {name: 'Main Branch', field: 'main_branch_name'}
  ]
  clientFundingData:any[] = [];
  editClientFundingData: any = {
    add: [],
    delete:[]
  }

  serviceTemplateColumns: any[] = [{name: 'Assigned to',field: 'name'}, {name: 'Main Branch',field: 'main_branch_name'}, {name: 'Group',field: 'group'}, 
    {name: 'End Of Service Date', field: 'end_of_service_date'}
  ]
  serviceTemplateData:any[] = [];
  editServiceTemplateData: any = {
    add: [],
    delete:[]
  }

  planReviewColumns: any[] = [{name: 'Assigned to', field: 'name'}, {name: 'Client', field: 'client_name'}, {name: 'Due Date',field: 'due_date'}
  ]
  planReviewData:any[] = [];
  editPlanReviewData: any = {
    add: [],
    delete:[]
  }

  /*clientGoalColumns: any[] = [{name: 'Name', field: 'name'}, {name: 'Goal Client', field: 'goal_client'}, {name: 'Goal', field: 'goal'},
  {name: 'Goal Type', field: 'goal_type'}, {name: 'Status', field: 'status'}, {name: 'Start Date', field: 'start_date'}, {name: 'End Date', field: 'end_date'},
  {name: 'Description', field: 'description'}
  ]*/
  clientGoalColumns: any[] = [
    {name: 'Client', field: 'client_name'}, 
    {name: 'Goal Name', field: 'goal_name'}, 
    {name: 'Goal Type', field: 'type'},
    {name: 'Assigned To', field: 'assigned_to'}, 
    {name: 'Duration', field: 'duration'}, 
    {name: 'Description', field: 'description'},
    {name: 'Status', field: 'status'}, 
  ]
  clientGoalData:any[] = [];
  editClientGoalData: any = {
    add: [],
    delete:[]
  }
  
  public modifiedClientFundingData: any = [];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private adminEnumStore: Store<AdminProfileState>, private datePipe : DatePipe) { 
    this.enum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
    this.fundingSource$ = this.adminEnumStore.pipe(select(state => state.fundingSource));
  }
  ngOnInit(): void {
    if(this.isUpdate){
      // additional checking
      this.clientFundingData = this.serviceDetailsData['client_funding'] ? this.serviceDetailsData['client_funding'] : [];
      this.serviceTemplateData = this.serviceDetailsData['client_service_template'] ? this.serviceDetailsData['client_service_template'] : [];
      this.planReviewData = this.serviceDetailsData['client_plan_review'] ? this.serviceDetailsData['client_plan_review'] : [];
      this.clientGoalData = this.serviceDetailsData['client_goals'] ? this.serviceDetailsData['client_goals'] : [];
    

      this.modifiedClientFundingData = [...this.clientFundingData];

      // additional checking - client funding
      [...this.modifiedClientFundingData].forEach((el: any) => {
        el['funding_source_code'] = parseArrayObject(el['funding_source'], 'full_name');
        el['name'] = `${this.serviceDetailsData?.first_name} ${this.serviceDetailsData?.last_name}`;
        el['main_branch_name'] = parseArrayObject(el['branch'], 'name');
      });

      // additional checking - service template
      [...this.serviceTemplateData].forEach((el: any) => {
        el['main_branch_name'] = parseArrayObject(el['branch'], 'name');
      });

    }

    this.serviceDetailsForm = this.formBuilder.group({
      program_id: [this.serviceDetailsData?.funding_source ? this.serviceDetailsData?.funding_source[0]?.id : null],
      entry_date:[this.serviceDetailsData['entry_date'] ? new Date(this.serviceDetailsData.entry_date * 1000) : null],
      service_required: [this.serviceDetailsData ? this.serviceDetailsData.service_required : ''],
      service_location: [this.serviceDetailsData ? this.serviceDetailsData.service_location : ''],
      ndis_plan_start_date : [this.serviceDetailsData?.ndis_plan_start_date ? new Date(this.serviceDetailsData.ndis_plan_start_date * 1000) : ''],
      ndis_plan_end_date : [this.serviceDetailsData?.ndis_plan_end_date ? new Date(this.serviceDetailsData.ndis_plan_end_date * 1000) : ''],
      
      last_service_date: [this.serviceDetailsData['last_service_date'] ? new Date(this.serviceDetailsData.last_service_date * 1000) : null],
      end_service_date: [this.serviceDetailsData['end_service_date'] ? new Date(this.serviceDetailsData.end_service_date * 1000) : null],
      min_class:[this.serviceDetailsData?.min_class ? this.serviceDetailsData?.min_class[0]?.id : null],
      exit_date:[this.serviceDetailsData['exit_date'] ? new Date(this.serviceDetailsData.exit_date * 1000) : null],
      risk_notification:[this.serviceDetailsData ? this.serviceDetailsData.risk_notification : '']
    });

    console.log(this.serviceDetailsData)

    this.subscribeEnum();

    this.adminEnumStore.dispatch({
      type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_CLASSIFICATIONS
    });
    this.formStep.emit(ClientConstants.serviceDetails);
  }

  

  openAddProgram(e){
    let programDialog = this.dialog.open(
      ProgramModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '400px',
        data: {
        },
      }
    );

    programDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {

      let newProgram ={
        id: Math.random(),
        value: res.program
      }

      this.adminEnumStore.dispatch({
        type: AdminEnumsActionTypes.ADD_PROGRAM,
        payload: newProgram
      });
  
    });
  }

  openAddMinimumClassification(e){
    let minimumClassificationDialog = this.dialog.open(
      MinimumClassificationModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '400px',
        data: {
        },
      }
    );

    minimumClassificationDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {

      let newClassification ={
        id: Math.random(),
        value: res.minimumClassificationForm
      }

      this.adminEnumStore.dispatch({
        type: AdminEnumsActionTypes.ADD_CLASSIFICATION,
        payload: newClassification
      });
  
    });
  }

  subscribeEnum(){
    let optionsEnum = this.enum$;
    this.req = optionsEnum.subscribe((results: any) => {
      this.classificationsEnums = results.classifications;
      //this.loading = results.pending;
    })

    this.fundingSourceReq = this.fundingSource$.subscribe((results: any) => {
      if(results.fundingSourceList.length > 0){
        results.fundingSourceList.forEach(element => {
          element.name = element.code;
        });
        this.programsEnum = results.fundingSourceList;
      }
      this.loading = results.pending;
    })
  }

  openClientFundingModal(e){
    let clientFundingDialog = this.dialog.open(
      ClientFundingModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '45vw',
        //disableClose: true,
        //height: '720px',
        data: {
          client: `${this.serviceDetailsData?.first_name} ${this.serviceDetailsData?.last_name}`,
          client_id: this.serviceDetailsData?.id,
          fundingSource: this.programsEnum,  
          serviceDetails: this.serviceDetailsData,
        },
      }
    );

    clientFundingDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      result.end_date =  result?.end_date ? this.convertToDateTime(result?.end_date) : '';
      result.start_date =  result?.start_date ? this.convertToDateTime(result?.start_date) : '';
      result.name = result?.client_id;
      result.funding_source_id = result?.funding_source_obj?.id;
      result.main_branch_id = result?.main_branch_obj?.id;
      result.main_branch_name = result?.main_branch_obj?.name;
      result.funding_source_code = result?.funding_source_obj?.code;

      this.editClientFundingData.add.push(result);
      this.modifiedClientFundingData.push(result);
    });
  }

  openServiceTemplateModal(e){
    let serviceTemplateDialog = this.dialog.open(
      ServiceTemplateModalComponent,
      {
        width: '400px',
        //height: '720px',
        data: {
        },
      }
    );

    serviceTemplateDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      result.main_branch_name = result.main_branch_obj.name;
      result.main_branch_id = result.main_branch_obj.id;
      result.end_of_service_date = result?.end_of_service_date ? this.convertToDateTime(result?.end_of_service_date) : '';
      this.editServiceTemplateData.add.push(result);
      this.serviceTemplateData.push(result);
    });
  }

  openPlanReviewModal(e){
    let planReviewDialog = this.dialog.open(
      PlanReviewModalComponent,
      {
        width: '400px',
        data: {
          client: `${this.serviceDetailsData?.first_name} ${this.serviceDetailsData?.last_name}`,
          client_id: this.serviceDetailsData?.id,
          //fundingSource: this.programsEnum,  
          //serviceDetails: this.serviceDetailsData,
        },
      }
    );

    planReviewDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      result.due_date = result?.due_date ? this.convertToDateTime(result?.due_date) : '';
      this.editPlanReviewData.add.push(result);
      this.planReviewData.push(result);
    });
  }

  openClientGoalModal(e){
    let clientGoalDialog = this.dialog.open(
      ClientGoalModalComponent,
      {
        //height: '820px',
        width: '45vw',
        data: {
          client: this.serviceDetailsData
        },
      }
    );

    clientGoalDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      result.start_date = result?.start_date ? this.convertToDateTime(result?.start_date): '';
      result.end_date = result?.end_date ? this.convertToDateTime(result?.end_date): '';
      this.editClientGoalData.add.push(result);
      this.clientGoalData.push(result);
    });
  }

  deleteClientFundingRow(index){
    console.log(index)
    this.editClientFundingData.delete.push(this.clientFundingData[index]);
    this.modifiedClientFundingData.splice(index, 1)
  }

  deleteServiceTemplateRow(index) {
    this.editServiceTemplateData.delete.push(this.serviceTemplateData[index]);
    this.serviceTemplateData.splice(index, 1)
  }

  deletePlanReviewRow(index) {
    this.editPlanReviewData.delete.push(this.planReviewData[index]);
    this.planReviewData.splice(index, 1)
  }

  deleteClientGoalRow(index){
    this.editClientGoalData.delete.push(this.clientGoalData[index]);
    this.clientGoalData.splice(index, 1)
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  next(){
    if(this.serviceDetailsForm.valid){
      this.submitData.emit(this.serviceDetailsForm.value);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  convertToDateTime(dateVal: Date){
    return Math.ceil(new Date(dateVal).getTime() / 1000);
  }

  submit(){
    if(this.serviceDetailsForm.valid){

      let data = {
        //"id": this.serviceDetailsData?.id,
        ...this.serviceDetailsForm.value,
        'client-funding' : {
          ...this.editClientFundingData
        },
        'client-service-template': {
          ...this.editServiceTemplateData
        },
        'client-plan-review': {
          ...this.editPlanReviewData
        },
        'client-goals': {
          ...this.editClientGoalData
        }
      }

      
      console.log(data)

      this.submitData.emit(data);
    }
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: this.isUpdate ? 6 : 5, isValid: this.serviceDetailsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.serviceDetailsForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }
}

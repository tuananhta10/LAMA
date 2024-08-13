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
import { AddClientFundingComponent } from '../../../client-details/dialogs/add-client-funding/add-client-funding.component';
import { ServiceTemplateModalComponent } from '../../modals/service-template/service-template-modal.component';
import { PlanReviewModalComponent } from '../../modals/plan-review/plan-review-modal.component';
import { ClientGoalModalComponent } from '../../modals/client-goal-modal/client-goal-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientConstants } from '../../../constants';
import { DatePipe } from '@angular/common';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { parseArrayObject } from '@main/shared/utils/parse.util';
import { getUnixTime } from 'date-fns';
import { Location } from '@angular/common';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';

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
  serviceRequiredOptions:any[] = ["Permanent care", "Respite Care", "Community services", "Support Coordination"];
  serviceLocationOptions:any[] = ["Client Direct Service", "Centre/Community Based Service", "Remote Support"];

  @Input() navigation: any = {};
  @Input() serviceDetailsData: any;
  @Input() isUpdate: boolean = false;
  @Input() currentStatus: string = '';

  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  private toBeUpdated: boolean = false;

  enum$: any;
  fundingSource$: any;
  fundingSourceReq: any;
  programsEnum: any;
  classificationsEnums: any;
  loading:boolean = true;

  clientFundingColumns: any[] = [{name: 'Participant',field: 'name'},{name: 'Funding Source',field: 'funding_source_code'},{name: 'Type',field: 'funding_type'},{name: 'Start Date',field: 'start_date',type:'date'},
    { name: 'End Date', field: 'end_date' ,type:'date'}, {name: 'Budget', field: 'budget'}, {name: 'Planned', field: 'allocated' , type: 'number'}, {name: 'Utilise Total', field: 'utilise_running_total', type: 'number'},
    {name: 'Balance', field: 'balance'}, {name: 'Registration No', field: 'registration_no'}, {name: 'Main Branch', field: 'main_branch_name'}
  ]
  clientFundingData:any[] = [];
  editClientFundingData: any = {
    add: [],
    update: [],
    delete:[]
  }
  fundTypeOptions:any[] = ["Self managed", "Plan managed", "NDIA managed"];

  serviceTemplateColumns: any[] = [{name: 'Assigned to',field: 'name'}, {name: 'Main Branch',field: 'main_branch_name'}, {name: 'Group',field: 'group'},
    {name: 'End Of Service Date', field: 'end_of_service_date'}
  ];
  serviceTemplateData:any[] = [];
  editServiceTemplateData: any = {
    add: [],
    update: [],
    delete:[]
  }

  planReviewColumns: any[] = [{name: 'Assigned to', field: 'name'}, {name: 'Client', field: 'client_name'}, {name: 'Due Date',field: 'due_date'}
  ];
  planReviewData:any[] = [];
  editPlanReviewData: any = {
    add: [],
    update: [],
    delete:[]
  }

  clientGoalColumns: any[] = [
    //{name: 'Client', field: 'client_name'},
    {name: 'Goal Name', field: 'goal'},
    {name: 'Goal Type', field: 'goal_type'},
    {name: 'Description', field: 'description'},
    {name: 'Assigned To', field: 'employee_name'},
    {name: 'Duration', field: 'duration'},
    {name: 'Status', field: 'status'},
  ];
  clientGoalData:any[] = [];
  editClientGoalData: any = {
    add: [],
    update: [],
    delete:[]
  }

  public modifiedClientFundingData: any = [];

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private location: Location,
    private adminEnumStore: Store<AdminProfileState>,
    private snackBar: MatSnackBar,
    private datePipe : DatePipe) {
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
        el['funding_source_code'] = parseArrayObject(el['funding_source'], 'code');
        el['name'] = `${this.serviceDetailsData?.first_name} ${this.serviceDetailsData?.last_name}`;
        el['main_branch_name'] = parseArrayObject(el['branch'], 'name');
      });

      // additional checking - service template
      [...this.serviceTemplateData].forEach((el: any) => {
        el['main_branch_name'] = parseArrayObject(el['branch'], 'name');
      });
    }

    // date validation
    let entry_date = this.isUpdate ? this.serviceDetailsData.entry_date * 1000 : this.serviceDetailsData.entry_date;
    let ndis_plan_start_date = this.isUpdate ? this.serviceDetailsData.ndis_plan_start_date * 1000 : this.serviceDetailsData.ndis_plan_start_date;
    let ndis_plan_end_date = this.isUpdate ? this.serviceDetailsData.ndis_plan_end_date * 1000 : this.serviceDetailsData.ndis_plan_end_date;
    let last_service_date = this.isUpdate ? this.serviceDetailsData.last_service_date * 1000 : this.serviceDetailsData.last_service_date;
    let end_service_date = this.isUpdate ? this.serviceDetailsData.end_service_date * 1000 : this.serviceDetailsData.end_service_date;
    let exit_date = this.isUpdate ? this.serviceDetailsData.exit_date * 1000 : this.serviceDetailsData.exit_date;


    this.serviceDetailsForm = this.formBuilder.group({
      program_id: [this.serviceDetailsData?.funding_source ? this.serviceDetailsData?.funding_source[0]?.id : null],
      service_required: [this.serviceDetailsData ? this.serviceDetailsData.service_required : ''],
      service_location: [this.serviceDetailsData ? this.serviceDetailsData.service_location : ''],

      funding_type:[this.serviceDetailsData ? this.serviceDetailsData?.funding_type : ''],
      plan_manager_full_name: [this.serviceDetailsData ? this.serviceDetailsData?.plan_manager_full_name : ''],
      plan_manager_key_contact: [this.serviceDetailsData ? this.serviceDetailsData?.plan_manager_key_contact : ''],
      plan_manager_work_phone: [this.serviceDetailsData ? this.serviceDetailsData?.plan_manager_work_phone : ''],
      plan_manager_email: [this.serviceDetailsData ? this.serviceDetailsData?.plan_manager_email : ''],


      //min_class:[this.serviceDetailsData?.min_class ? this.serviceDetailsData?.min_class[0]?.id : null],
      entry_date:[this.serviceDetailsData['entry_date'] ? new Date(entry_date) : null],
      ndis_plan_start_date : [this.serviceDetailsData?.ndis_plan_start_date ? new Date(ndis_plan_start_date) : ''],
      ndis_plan_end_date : [this.serviceDetailsData?.ndis_plan_end_date ? new Date(ndis_plan_end_date) : ''],
      last_service_date: [this.serviceDetailsData['last_service_date'] ? new Date(last_service_date) : null],
      end_service_date: [this.serviceDetailsData['end_service_date'] ? new Date(end_service_date) : null],
      exit_date:[this.serviceDetailsData['exit_date'] ? new Date(exit_date) : null],
      risk_notification:[this.serviceDetailsData ? this.serviceDetailsData.risk_notification : '']
    });

    /// AUTO SAVE
    this.subscribeAutoSave();
    this.subscribeEnum();

    this.adminEnumStore.dispatch({
      type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_CLASSIFICATIONS
    });
    this.formStep.emit(ClientConstants.serviceDetails);
  }

  subscribeAutoSave(){
    /* VALUE CHANGE */
    this.serviceDetailsForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        program_id: this.serviceDetailsData?.funding_source ? this.serviceDetailsData?.funding_source[0]?.id : null,
        service_required: this.serviceDetailsData.service_required,
        service_location: this.serviceDetailsData.service_location,
        funding_type: this.serviceDetailsData?.funding_type,
        plan_manager_full_name: this.serviceDetailsData?.plan_manager_full_name,
        plan_manager_key_contact: this.serviceDetailsData?.plan_manager_key_contact,
        plan_manager_work_phone: this.serviceDetailsData?.plan_manager_work_phone,
        plan_manager_email: this.serviceDetailsData?.plan_manager_email,
        entry_date: this.serviceDetailsData['entry_date'] ? new Date(this.serviceDetailsData.entry_date * 1000) : null,
        ndis_plan_start_date : this.serviceDetailsData?.ndis_plan_start_date ? new Date(this.serviceDetailsData.ndis_plan_start_date * 1000) : '',
        ndis_plan_end_date : this.serviceDetailsData?.ndis_plan_end_date ? new Date(this.serviceDetailsData.ndis_plan_end_date * 1000) : '',
        last_service_date: this.serviceDetailsData['last_service_date'] ? new Date(this.serviceDetailsData.last_service_date * 1000) : null,
        end_service_date: this.serviceDetailsData['end_service_date'] ? new Date(this.serviceDetailsData.end_service_date * 1000) : null,
        exit_date: this.serviceDetailsData['exit_date'] ? new Date(this.serviceDetailsData.exit_date * 1000) : null,
        risk_notification: this.serviceDetailsData.risk_notification
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
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

  /* FOR CLIENT FUNDING EDIT */
  editClientFundingModal(event){
    let clientFundingDialog = this.dialog.open(
      AddClientFundingComponent,
      {
        panelClass: "dialog-responsive",
        minWidth: '40vw',
        maxWidth: '78vw',
        data: {
          ...event,

          fromProfile: true
        }
      }
    );

    clientFundingDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        result.end_date =  result?.end_date ? this.convertToDateTime(result?.end_date) : '';
        result.start_date =  result?.start_date ? this.convertToDateTime(result?.start_date) : '';

        let data = {
          id: event?.id,
          ...result
        }

        this.editClientFundingData.update.push(data);
        this.submit();
      }
    });
  }

  // Client Funding
  openClientFundingModal(e){
    let clientFundingDialog = this.dialog.open(
      AddClientFundingComponent,
      {
        panelClass: "dialog-responsive",
        minWidth: '40vw',
        maxWidth: '78vw',
        data: {
          fromProfile: true,
          transactionType: "create",
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
      if(result){
        result.end_date =  result?.end_date ? this.convertToDateTime(result?.end_date) : '';
        result.start_date =  result?.start_date ? this.convertToDateTime(result?.start_date) : '';

        let data = {
          id: result.id,
          ...result
        }

        this.editClientFundingData.update.push(data);
        this.submit();
      }
    });
  }

  // Service Template
  openServiceTemplateModal(event){
    if(!event){
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
        if(result){
          result.main_branch_name = result.main_branch_obj.name;
          result.main_branch_id = result.main_branch_obj.id;
          result.end_of_service_date = result?.end_of_service_date ? this.convertToDateTime(result?.end_of_service_date) : '';
          this.editServiceTemplateData.add.push(result);
          this.serviceTemplateData.push(result);
          this.submit();
        }
      });
    }

    else {
      let serviceTemplateDialog = this.dialog.open(
        ServiceTemplateModalComponent,
        {
          width: '400px',
          //height: '720px',
          data: event
        }
      );

      serviceTemplateDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          result.main_branch_name = result.main_branch_obj.name;
          result.main_branch_id = result.main_branch_obj.id;
          result.end_of_service_date = result?.end_of_service_date ? this.convertToDateTime(result?.end_of_service_date) : '';

          let data = {
            id: event?.id,
            ...result
          }

          this.editServiceTemplateData.update.push(data);
          this.submit();
        }
      });
    }
  }

  // Plan Review
  openPlanReviewModal(event){
    if(!event){
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
        if(result){
          result.due_date = result?.due_date ? this.convertToDateTime(result?.due_date) : '';
          this.editPlanReviewData.add.push(result);
          this.planReviewData.push(result);
          this.submit();
        }
      });
    }

    else {
      let planReviewDialog = this.dialog.open(
        PlanReviewModalComponent,
        {
          width: '400px',
          data: {
            client: `${this.serviceDetailsData?.first_name} ${this.serviceDetailsData?.last_name}`,
            client_id: this.serviceDetailsData?.id,
            data: event,
            //fundingSource: this.programsEnum,
            //serviceDetails: this.serviceDetailsData,
          },
        }
      );

      planReviewDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          result.due_date = result?.due_date ? this.convertToDateTime(result?.due_date) : '';

          let data = {
            id: event?.id,
            ...result
          }

          this.editPlanReviewData.update.push(data);
          this.submit();
        }
      });
    }
  }

  openClientGoalModal(event){
    if(!event){
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
        if(result){
          result.start_date = result?.start_date ? this.convertToDateTime(result?.start_date): '';
          result.end_date = result?.end_date ? this.convertToDateTime(result?.end_date): '';
          this.editClientGoalData.add.push(result);
          this.clientGoalData.push(result);
          this.submit();
        }
      });
    }

    else {
      let clientGoalDialog = this.dialog.open(
        ClientGoalModalComponent,
        {
          //height: '820px',
          width: '45vw',
          data: {
            data: event,
            client: this.serviceDetailsData
          },
        }
      );

      clientGoalDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          result.start_date = result?.start_date ? this.convertToDateTime(result?.start_date): '';
          result.end_date = result?.end_date ? this.convertToDateTime(result?.end_date): '';

          let data = {
            id: event?.id,
            ...result
          }

          this.editClientGoalData.update.push(data);
          this.submit();
        }
      });
    }
  }

  deleteClientFundingRow(index){
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: index,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          this.editClientFundingData.delete.push(this.clientFundingData[index]);
          this.modifiedClientFundingData.splice(index, 1);

          this.submit();
        }
      });
  }

  deleteServiceTemplateRow(index) {
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: index,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          this.editServiceTemplateData.delete.push(this.serviceTemplateData[index]);
          this.serviceTemplateData.splice(index, 1)

          this.submit();
        }
      });
  }

  deletePlanReviewRow(index) {
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: index,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          this.editPlanReviewData.delete.push(this.planReviewData[index]);
          this.planReviewData.splice(index, 1)

          this.submit();
        }
      });
  }

  deleteClientGoalRow(index){
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: index,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          this.editClientGoalData.delete.push(this.clientGoalData[index]);
          this.clientGoalData.splice(index, 1)

          this.submit();
        }
      });
  }

  back(){
    if(sessionStorage.getItem('clientFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.isUpdate ? this.navigation?.previous - 1 : this.navigation?.previous);
  }

  next(){
    if(this.serviceDetailsForm.valid){
      this.submitData.emit(this.serviceDetailsForm.value);
      this.updateStepper.emit(this.isUpdate ? this.navigation?.next - 1 : this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next - 1);
  }

  convertToDateTime(dateVal: Date){
    return Math.ceil(new Date(dateVal).getTime() / 1000);
  }

  public submitting: boolean = false;

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

      this.submitting = true;
      this.submitData.emit(data);
    }
  }

  // balance = budget - utilized total

  @Output() saveClientAsDraft: EventEmitter<any> = new EventEmitter<any>();

  saveAsDraft(){
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

    this.submitData.emit(data);
    this.saveClientAsDraft.emit(true);
  }

  ngOnDestroy(): void {
    // AUTO SAVE
    if(this.toBeUpdated && !this.submitting){
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

      this.submitData.emit(data);
      this.submitting = true;
    }

    this.isValid.emit({formStep: this.isUpdate ? 6 : 5, isValid: this.serviceDetailsForm.valid})

    if(!this.isUpdate){
      this.submitData.emit(this.serviceDetailsForm.value);
    }

    if(this.req) this.req.unsubscribe();
  }
}

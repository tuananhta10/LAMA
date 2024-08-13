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
  serviceRequiredOptions:any[] = [{id:"1", name:"Care"}];
  serviceLocationOptions:any[] = [{id:"1", name:"Philippines"}];

  @Input() serviceDetailsData: any;
  @Input() isUpdate: boolean = false;
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  enum$: any;
  programsEnum: any;
  classificationsEnums: any;
  loading:boolean = true;

  clientFundingColumns: any[] = [{name: 'Name',field: 'name'},{name: 'Funding Source',field: 'fundingSource'},{name: 'Type',field: 'type'},{name: 'Start Date',field: 'startDate'},
    { name: 'End Date', field: 'endDate' }, {name: 'Budget', field: 'budget'}, {name: 'Allocated', field: 'allocated'}, {name: 'Utilise Total', field: 'utiliseTotal'},
    {name: 'Balance', field: 'balance'}, {name: 'Registration No', field: 'registrationNo'}, {name: 'Main Branch', field: 'Main Branch'}
  ]
  clientFundingData:any[] = [];

  serviceTemplateColumns: any[] = [{name: 'Name',field: 'name'}, {name: 'Main Branch',field: 'mainBranch'}, {name: 'Group',field: 'group'}, 
    {name: 'End Of Service Date', field: 'endOfServiceDate'}
  ]
  serviceTemplateData:any[] = [];

  planReviewColumns: any[] = [{name: 'Name', field: 'name'}, {name: 'Client', field: 'client'}, {name: 'Due Date',field: 'dueDate'}
  ]
  planReviewData:any[] = [];

  clientGoalColumns: any[] = [{name: 'Name', field: 'name'}, {name: 'Goal Client', field: 'goalClient'}, {name: 'Goal', field: 'goal'},
  {name: 'Goal Type', field: 'goalType'}, {name: 'Status', field: 'status'}, {name: 'Start Date', field: 'startDate'}, {name: 'End Date', field: 'endDate'},
  {name: 'Description', field: 'description'}
  ]
  clientGoalData:any[] = [];
  
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private adminEnumStore: Store<AdminProfileState>) { 
    this.enum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
  }
  ngOnInit(): void {
    this.serviceDetailsForm = this.formBuilder.group({
      program: [this.serviceDetailsData ? this.serviceDetailsData.program : ''],
      entryDate:[this.serviceDetailsData ? this.serviceDetailsData.entryDate : ''],
      serviceRequired: [this.serviceDetailsData ? this.serviceDetailsData.serviceRequired : ''],
      serviceLocation: [this.serviceDetailsData ? this.serviceDetailsData.serviceLocation : ''],
      lastServiceDate: [this.serviceDetailsData ? this.serviceDetailsData.lastServiceDate : ''],
      endOfServiceDate: [this.serviceDetailsData ? this.serviceDetailsData.endOfServiceDate : ''],
      minimumClassification:[this.serviceDetailsData ? this.serviceDetailsData.minimumClassification : ''],
      exitDate:[this.serviceDetailsData ? this.serviceDetailsData.exitDate : ''],
      riskNotification:[this.serviceDetailsData ? this.serviceDetailsData.riskNotification : '']
    });

    this.subscribeEnum();

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_PROGRAMS
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_CLASSIFICATIONS
    });
  }

  openAddProgram(e){
    let programDialog = this.dialog.open(
      ProgramModalComponent,
      {
        height: '320px',
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
        height: '320px',
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
      this.programsEnum = results.programs;
      this.loading = results.pending;
    })
  }

  openClientFundingModal(e){

  }

  openServiceTemplateModal(e){

  }

  openPlanReviewModal(e){

  }

  openClientGoalModal(e){

  }

  back(){
    this.updateStepper.emit(this.isUpdate ? 'step5' : 'step4');
  }

  submit(){
    if(this.serviceDetailsForm.valid){
      this.submitData.emit(this.serviceDetailsForm.value);
      this.updateStepper.emit(this.isUpdate ? 'step7' : 'step6');
    }
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }
}

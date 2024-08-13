import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrokerageModalComponent } from '../../modals/brokerage-modal/brokerage-modal.component';
import { CareWorkerModalComponent } from '../../modals/care-worker-modal/care-worker-modal.component';
import { InternalExternalLookupComponent } from '../../modals/internal-external-lookup/internal-external-lookup.component';
import { LanguageModalComponent } from '../../modals/language-modal/language-modal.component';
import { ClientConstants } from '../../../constants';
import { Location } from '@angular/common';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';

@Component({
  selector: 'app-care-workers',
  animations: [mainAnimations],
  templateUrl: './care-workers.component.html',
  styleUrls: ['./care-workers.component.scss']
})
export class CareWorkersComponent implements OnInit, OnDestroy {
  careWorkersForm!: FormGroup;
  preferredCareworkerOptions:any[] = [];

  @Input() navigation: any = {};
  @Input() careWorkersData: any;
  @Input() isUpdate: boolean = false;
  @Input() formStepVal: number = 0;
  @Input() currentStatus: string = '';
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  private employeesData$: any;
  employeeOptions:any;

  enum$: any;
  languagesEnums: any;
  loading:boolean = true;

  careWorkersTableData: any[] = [];
  careWorkersColumns:any[] = [
    {name: 'Name', field: 'name'}, {name: 'Type', field: 'type'}, {name: 'Job Type', field: 'job_type'}, {name: 'Email', field: 'email_address'}, {name: 'Mobile Phone', field: 'mobile_phone_no'},
    /*{name: 'Home Phone', field: 'home_phone_no'},*/ {name: 'Suburb', field: 'suburb'}, /*{name: 'Date Started', field: 'date_added'},*/ /*{name: 'Pricelist', field: 'pricelist'},*/
    {name: 'Employment Type', field: 'employment_type'},{name: 'Preferred', field: 'preferred_careworker', type: 'favorite'}
  ];

  careworkerNotToUse: any[] = [
    {name: 'Name', field: 'name'}, {name: 'Type', field: 'type'}, {name: 'Job Type', field: 'job_type'}, {name: 'Email', field: 'email_address'}, {name: 'Mobile Phone', field: 'mobile_phone_no'},
    /*{name: 'Home Phone', field: 'home_phone_no'}, */{name: 'Suburb', field: 'suburb'}, {name: 'Date Started', field: 'date_added'}, /*{name: 'Pricelist', field: 'pricelist'},*/
    {name: 'Employment Type', field: 'employment_type'}
  ];

  careWorkersNotToUseTableData: any[] = [];
  brokerageTableData: any[] = [];
  brokerageColumns:any[] = [
    {name: 'Default', field: 'default'}, {name: 'Brokerage No.', field: 'brokerage_number'}, {name: 'Name', field: 'name'}, 
    {name: 'Contact Name', field: 'contact_name'}, {name: 'Contact No.', field: 'contact_number'}
  ];  

  clientEmployee:any = {
    add: [],
    delete: []
  }

  clientBrokerage: any = {
    add: [],
    update: [],
    delete: []
  }

  private fromAssignToProfile: string = sessionStorage.getItem('assignTo');
  public teamLeaderCoordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    private location: Location, 
    private employeeListStore: Store<EmployeeListState>,
    private adminEnumStore: Store<AdminProfileState>) {
    this.enum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
   }

  ngOnInit(): void {
    this.careWorkersForm = this.formBuilder.group({
      preferred_employee_id: [this.careWorkersData ? this.careWorkersData.preferred_employee_id : ''],
      careWorkers: [this.careWorkersData ? this.careWorkersData.careWorkers : ''],
      careWorkersNotToUse: [this.careWorkersData ? this.careWorkersData.careWorkersNotToUse : ''],
      brokerageNumbers:[this.careWorkersData ? this.careWorkersData.brokerageNumbers : ''],
      //preferred_language_id: [this.careWorkersData ? this.careWorkersData.preferred_language_id : ''],
      medications: [this.careWorkersData ? this.careWorkersData.medications : ''],
      clientNotes: [this.careWorkersData ? this.careWorkersData.clientNotes : ''],
    });

    this.teamLeaderCoordForm = this.formBuilder.group({
      team_leader: [this.careWorkersData ? this.careWorkersData?.team_leader_name : ''],  
      coordinator: [this.careWorkersData ? this.careWorkersData?.coordinator_name : '']
    });

    this.subscribeEnum();

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_LANGUAGES
    });

    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
    
    this.formStep.emit(ClientConstants.careWorkers);

    if(this.isUpdate){
      //console.log(this.careWorkersData)
      if(this.careWorkersData['client_employee']){
        this.careWorkersData['client_employee'].forEach(element => {

          if(element?.employee_id && element?.employee?.length > 0 
            && element?.employee_not_use == "0") {

            this.careWorkersTableData.push({
              ...element.employee[0],  
              preferred_careworker: element?.preferred_careworker
            })
            //console.log(element)
          }

          if(element?.employee_id && element?.employee?.length > 0 
            && element?.employee_not_use == "1"){
            this.careWorkersNotToUseTableData.push({
              ...element.employee[0],  
              preferred_careworker: element?.preferred_careworker
            })
            //console.log(element)
          }
        });
      }

      if(this.careWorkersData?.['client_brokerage']){
        this.brokerageTableData = this.careWorkersData?.['client_brokerage'];
      }


      if(this.fromAssignToProfile){
        this.openCareWorkerModal(true);
      }
    }
  }

  openAddlanguage(e){
    let languageDialog = this.dialog.open(
      LanguageModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '450px',
        data: {
        },
      }
    );

    languageDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      let newLanguage ={
        id: Math.random(),
        value: res.language
      }

      if(this.fromAssignToProfile){
        sessionStorage.removeItem('assignTo');
      }

      this.adminEnumStore.dispatch({
        type: AdminEnumsActionTypes.ADD_LANGUAGE,
        payload: newLanguage
      });
    });
  }

  back(){
    if(sessionStorage.getItem('clientFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.isUpdate ? this.navigation?.previous - 1 : this.navigation?.previous);
  }

  subscribeEnum(){
    let optionsEnum = this.enum$;

    this.req = optionsEnum.subscribe((results: any) => {
      this.languagesEnums = results.languages;
      //this.loading = results.pending;
    });

    this.req.add(
      this.employeesData$.subscribe((results: any) => {
       this.employeeOptions = results?.employees.employeeList;
       this.loading = results?.employees.employeeListPending;
      })
    )
  }

  submit(){
    if(this.careWorkersForm.valid){
      let data = {
        "client-employee": {
          ...this.clientEmployee
        },
        "client-brokerage": {
          ...this.clientBrokerage
        },
        //'preferred_language_id': this.careWorkersForm.controls['preferred_language_id'].value
      }
      this.submitData.emit(data);
    }
  }

  next(){
    if(this.careWorkersForm.valid){
      this.submitData.emit(this.careWorkersForm.value)
      this.updateStepper.emit(this.navigation?.next - 1);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next - 1);
  }

  removePerson(title){
    let data = {
      //...result
      id: this.careWorkersData?.id,
      //...this.careWorkersData
    };

    
    if(title === 'Team Leader'){
     this.teamLeaderCoordForm.controls['team_leader'].setValue(null);
     data['team_leader_id'] = null;
     data['team_leader_external_id'] = null;
     data['team_leader_name'] = null;
    }

    else {
      this.teamLeaderCoordForm.controls['coordinator'].setValue(null);
      data['coordinator_id'] = null;
      data['coordinator_external_id'] = null;
      data['coordinator_name'] = null;
    }

    this.submitData.emit(data);
  }

  openInternalExternalModal(event, title){
    console.log("INTERNAL EXTERNAL", title)
    let careWorkerDialog = this.dialog.open(
      InternalExternalLookupComponent,
      {
        //height: '920px',
        width: '45vw',
        data: {
          careWorkersData: this.careWorkersData,
          title: title
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      console.log(result)

      /*
        {
          id: 492, 
          team_leader_id: 314, // employee id
          team_leader_external_id: null, 
          team_leader_name: "First Name, Last Name",
          is_team_leader_external: false,
          coordinator_id: 314, // employee id
          coordinator_external_id: null, 
          coordinator_name: "First Name, Last Name",
          is_coordinator_external: false,
        }
      */

        if(result){
          let data = {
            ...result
          };

          
          if(title === 'Team Leader'){
            this.teamLeaderCoordForm.controls['team_leader'].setValue(result?.team_leader_name)
          }

          else {
            this.teamLeaderCoordForm.controls['coordinator'].setValue(result?.coordinator_name)
          }

          this.submitData.emit(data);
        }
      }
    )
  }

  openCareWorkerModal(event){
    let careWorkerDialog = this.dialog.open(
      CareWorkerModalComponent,
      {
        //height: '920px',
        width: '45vw',
        data: {
          careworkers_added: [...this.careWorkersTableData, ...this.careWorkersNotToUseTableData].map(el => el.id)
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
        if(result){
          let cwObj = {
            employee_id: result.employee.id,
            employee_not_use: 0,
            preferred_careworker: result.preferred_careworker
          }

          let objectData = {
            preferred_careworker: result.preferred_careworker,
            ...result.employee
          }

          this.clientEmployee.add.push(cwObj)
          this.careWorkersTableData.push(objectData);
          this.submit();
        }
      }
    )
  }

  openCareWorkerNotToUseModal(event){
    let notToUse = false;
    let careWorkerDialog = this.dialog.open(
      CareWorkerModalComponent,
      {
        //height: '920px',
        width: '45vw',
        data: {
          isCareNotUse: true,
          careworkers_added: [...this.careWorkersTableData, ...this.careWorkersNotToUseTableData].map(el => el.id)
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
        if(result){
          let cwObj = {
            employee_id: result.employee.id,
            employee_not_use: 1,
            preferred_careworker: false,
          }
          this.clientEmployee.add.push(cwObj)
          this.careWorkersNotToUseTableData.push(result.employee)
          this.submit();
        }
      }
    )
  }

  openBrokerageModal(event){
    let brokerageDialog = this.dialog.open(
      BrokerageModalComponent,
      {
        //height: '720px',
        width: '45vw',
        data: {
        },
      }
    );

    brokerageDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
        if(result){
          this.brokerageTableData.push(result);
          this.clientBrokerage.add.push(result);
          this.submit();
        }
      }
    )
  }

  editBrokerageModal(event){
    let brokerageDialog = this.dialog.open(
      BrokerageModalComponent,
      {
        //height: '720px',
        width: '45vw',
        data: event
      }
    );

    brokerageDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
        if(result){
          let data = {
            id: event?.id, 
            ...result
          }
          this.clientBrokerage.update.push(data);
          this.submit();
        }
      }
    )
  }

  deleteCareWorkerToUse(index: number){
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
          let id = this.careWorkersData?.client_employee?.find(el => el.employee_id === this.careWorkersTableData[index].id)['id'];

          let cwObj = {
            client_id: this.careWorkersData?.id,
            id: id
          }

          this.clientEmployee.delete.push(cwObj)
          this.careWorkersTableData.splice(index, 1);
          this.submit();
        }
      });
  }

  deleteCareWorkerNotToUse(index: number){
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
          let id = this.careWorkersData?.client_employee?.find(el => el.employee_id === this.careWorkersNotToUseTableData[index].id)['id'];

          let cwObj = {
            client_id: this.careWorkersData?.id,
            id: id
          }
          this.clientEmployee.delete.push(cwObj)
          this.careWorkersNotToUseTableData.splice(index, 1);
          this.submit();
        }
      });
  }

  deleteBrokerage(index: number){
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
          let id = this.brokerageTableData.find((el, i) => i === index);  

          this.clientBrokerage.delete.push(id);
          this.brokerageTableData.splice(index, 1);

          this.submit();
        }
      });
  }

  @Output() saveClientAsDraft: EventEmitter<any> = new EventEmitter<any>();

  saveAsDraft(){
    let data = {
      "client-employee": {
        ...this.clientEmployee
      },
      "client-brokerage": {
        ...this.clientBrokerage
      },
      //'preferred_language_id': this.careWorkersForm.controls['preferred_language_id'].value
    }
    this.submitData.emit(data);
    this.saveClientAsDraft.emit(true);
  }


  ngOnDestroy(): void {
    this.isValid.emit({formStep: 4, isValid: this.careWorkersForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.careWorkersForm.value);
    }

    if(this.req) this.req.unsubscribe();
    sessionStorage.removeItem('assignTo');
  }
}

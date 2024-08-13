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
import { LanguageModalComponent } from '../../modals/language-modal/language-modal.component';
import { ClientConstants } from '../../../constants';

import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';

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
    /*{name: 'Home Phone', field: 'home_phone_no'},*/ {name: 'Suburb', field: 'suburb'}, {name: 'Date Started', field: 'date_added'}, /*{name: 'Pricelist', field: 'pricelist'},*/
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
    delete: []
  }
  
  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
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

    this.subscribeEnum();

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_LANGUAGES
    });

    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
    
    this.formStep.emit(ClientConstants.careWorkers);

    if(this.isUpdate){
      console.log(this.careWorkersData)
      if(this.careWorkersData['client_employee']){
        this.careWorkersData['client_employee'].forEach(element => {

          if(element?.employee_id && element?.employee?.length > 0 
            && element?.employee_not_use == "0") {

            this.careWorkersTableData.push(element.employee[0])
            //console.log(element)
          }

          if(element?.employee_id && element?.employee?.length > 0 
            && element?.employee_not_use == "1"){
            this.careWorkersNotToUseTableData.push(element.employee[0])
            //console.log(element)
          }
        });
      }

      if(this.careWorkersData?.['client_brokerage']){
        this.brokerageTableData = this.careWorkersData?.['client_brokerage'];
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

      this.adminEnumStore.dispatch({
        type: AdminEnumsActionTypes.ADD_LANGUAGE,
        payload: newLanguage
      });
    });
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
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
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
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
            employee_not_use: 0
          }

          let objectData = {
            preferred_careworker: result.preferred_careworker,
            ...result.employee
          }

          this.clientEmployee.add.push(cwObj)
          this.careWorkersTableData.push(objectData);
          
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
          isCareNotUse: notToUse,
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
            employee_not_use: 1
          }
          this.clientEmployee.add.push(cwObj)
          this.careWorkersNotToUseTableData.push(result.employee)
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
      this.brokerageTableData.push(result);
      this.clientBrokerage.add.push(result);
      }
    )
  }

  deleteCareWorkerToUse(index: number){
    console.log(this.careWorkersData)
    let id = this.careWorkersData?.client_employee?.find(el => el.employee_id === this.careWorkersTableData[index].id)['id'];

    let cwObj = {
      client_id: this.careWorkersData?.id,
      id: id
    }

    this.clientEmployee.delete.push(cwObj)
    this.careWorkersTableData.splice(index, 1);
  }

  deleteCareWorkerNotToUse(index: number){
    console.log(this.careWorkersData)
    let id = this.careWorkersData?.client_employee?.find(el => el.employee_id === this.careWorkersNotToUseTableData[index].id)['id'];

    let cwObj = {
      client_id: this.careWorkersData?.id,
      id: id
    }
    this.clientEmployee.delete.push(cwObj)
    this.careWorkersNotToUseTableData.splice(index, 1);
  }

  deleteBrokerage(index: number){
    let id = this.brokerageTableData.find((el, i) => i === index);  

    this.clientBrokerage.delete.push(id);
    this.brokerageTableData.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: 4, isValid: this.careWorkersForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.careWorkersForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }
}

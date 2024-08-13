import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { LanguageActionTypes } from '@main/views/admin-panel/store/actions/admin-language.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RosteringBranchModalComponent } from '../..';
import { EmployeeConstants } from '../../../constants';
import { BrokerageModalComponent } from '../../modals/brokerage-modal/brokerage-modal.component';
import { CareWorkerModalComponent } from '../../modals/care-worker-modal/care-worker-modal.component';
import { Location } from '@angular/common';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';

@Component({
  selector: 'app-careworker-clients',
  animations: [mainAnimations],
  templateUrl: './careworker-clients.component.html',
  styleUrls: ['./careworker-clients.component.scss']
})
export class CareworkerClientsComponent implements OnInit {
  public careWorkersForm!: FormGroup;
  public preferredCareworkerOptions:any[] = [{id:"1",name:"Gaston"}];

  @Input() navigation: any = {};
  @Input() careWorkersData: any;
  @Input() isUpdate: boolean = false;
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private toBeUpdated: boolean = false;
  private req: Subscription;
  private enum$: any;

  public languagesEnums: any;
  public loading:boolean = false;
  public careWorkersTableData: any[] = [];
  public careWorkersColumns:any[] = [
    {name: 'Name', field: 'name'}, {name: 'Email', field: 'email_address'}, {name: 'Mobile Phone', field: 'mobile_phone_no'},
    {name: 'Home Phone', field: 'home_phone_no'}, {name: 'Suburb', field: 'suburb'}, {name: 'Date Added', field: 'date_added'},
    {name: 'Disability Type', field: 'disability_type'}
  ];
  public languagesColumns:any[] = [{name: 'Code', field: 'code'}, {name: 'Name', field: 'name'}]
  public languagesTableData: any[] = [];
  public rosteringBranchColumns:any[] = [{name: 'Name', field: 'name'}, {name: 'Code', field: 'code'}, {name: 'Mobile Phone', field: 'code'}, {name: 'Email', field: 'email'}]
  public rosteringBranchTableData: any[] = [];
  public careWorkerClient: any = {
    add: [],
    delete: []
  }

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    private location: Location,
    private adminEnumStore: Store<AdminProfileState>) {
    this.enum$ = this.adminEnumStore.pipe(select(state => state.language));
   }

  ngOnInit(): void {
    this.adminEnumStore.dispatch({
      type: LanguageActionTypes.GET_LANGUAGE_LIST
    }); 

    if(this.careWorkersData?.client_employee?.length > 0){
      let tempClientTableata = [];

      this.careWorkersData.client_employee.forEach(element => {
        element.client[0].name = element.client[0].first_name + " " + element.client[0].last_name;
        tempClientTableata.push(element.client[0])
      });

      this.careWorkersTableData = tempClientTableata
    }

    this.careWorkersForm = this.formBuilder.group({
      //clients: [this.careWorkersData ? this.careWorkersData.careWorkers : ''],
      preferred_language_id: [this.careWorkersData ? this.careWorkersData.preferred_language_id : ''],
      careworker_client_comment: [this.careWorkersData ? this.careWorkersData.careworker_client_comment : ''],
    });

    this.formStep.emit(EmployeeConstants.careworkerClients);
    this.subscribeAutoSave();
    this.subscribeEnum();
  }

  subscribeAutoSave(){
    /* VALUE CHANGE */
    this.careWorkersForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        preferred_language_id: this.careWorkersData ? this.careWorkersData.preferred_language_id : '',
        careworker_client_comment: this.careWorkersData ? this.careWorkersData.careworker_client_comment : '',
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
  }

  subscribeEnum(){
    this.req = this.enum$.subscribe((results: any) => {
      this.languagesEnums = results.languageList;
      this.loading = results.pending;
    })
  }

  openCareWorkerModal(event){
    let careWorkerDialog = this.dialog.open(
      CareWorkerModalComponent,
      {
        //height: '920px',
        width: '45vw',
        data: {
          client_added: [...this.careWorkersTableData].map(el => el.id)
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        let cwObj = {
          client_id: result.client?.id,
          employee_not_use: 0,
          preferred_careworker: false,
        }
        this.careWorkerClient.add.push(cwObj)
        this.careWorkersTableData.push(result.client);

        setTimeout(() => {
          this.submit();
        }, 500);
      }
    })
  }

  openRosteringBranchModal(event){
    let rosteringBranchDialog = this.dialog.open(
      RosteringBranchModalComponent,
      {
        //height: '920px',
        // width: '45vw',
        data: {
        },
      }
    );

    rosteringBranchDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      
      }
    )
  }

  public submitting: boolean = false;

  submit(){
    let data = {
      "client-employee": {
        ...this.careWorkerClient
      },
      preferred_language_id: this.careWorkersForm.value["preferred_language_id"],
      careworker_client_comment: this.careWorkersForm.value["careworker_client_comment"],
    }
    this.submitting = true;
    this.submitData.emit(data);
  }

  deleteCareWorker(index: number){
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
          let id = this.careWorkersData?.client_employee.find(el => el?.client_id === this.careWorkersTableData[index]?.id)['id'];

          let cwObj = {
            id: id
          };

          this.careWorkerClient.delete.push(cwObj)
          this.careWorkersTableData.splice(index, 1);

          this.submit();
        }
      });
  }

  back(){
    if(sessionStorage.getItem('employeeFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.navigation?.previous);
  }
  
  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  next(){
    if(this.careWorkersForm.valid){
      this.submitData.emit(this.careWorkersForm.value);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  @Output() saveEmployeeAsDraft: EventEmitter<any> = new EventEmitter<any>();
  @Input() currentStatus: string = '';

  saveAsDraft(){
    let data = {
      "client-employee": {
        ...this.careWorkerClient
      },
      preferred_language_id: this.careWorkersForm.value["preferred_language_id"],
      careworker_client_comment: this.careWorkersForm.value["careworker_client_comment"],
    }
    this.submitData.emit(data);
    this.saveEmployeeAsDraft.emit(true);
  }


  ngOnDestroy(): void {
    // AUTO SAVE
    if(this.toBeUpdated && !this.submitting) {
      this.submitData.emit(this.careWorkersForm.value);
    }

    this.isValid.emit({formStep: 3, isValid: this.careWorkersForm.valid})
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { MainBranchModalComponent } from '@main/views/admin-panel/pages/client/client-shared';
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { AdminProfileState } from '@main/views/admin-panel/store/index';;
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmploymentTypeModalComponent } from '../../modals/employment-type/employment-type-modal.component';
import { PositionModalComponent } from '../../modals/position-modal/position-modal.component';
import {PricelistModalComponent} from '../../modals/pricelist-modal/pricelist-modal.component'

import { EmployeeConstants } from '../../../constants';
import { EmployeePositionActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-position.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';

@Component({
  selector: 'app-employee-service-detail',
  animations: [mainAnimations],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  isLinear = false;
  serviceDetailForm!: FormGroup;

  @Input() navigation: any = {};
  @Input() serviceDetailData: any;
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Input() isUpdate: boolean = false;
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  mainBranchEnum:any;
  positionEnum:any;
  managerEnum:any;
  employmentTypeEnum:any;
  priceListEnum:any;

  employementTypeOption: string[] = ["Casual", "Part Time", "Contractor", "Full Time"];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  jobTypeEnum:any = ["Support Service", "Support Coordination", "Domestic", "Maintenance", "Operations"];
  
  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  private employeeReq: Subscription;
  private positionReq: Subscription;
  private priceListReq: Subscription;
  enum$: any;

  branchLoading:boolean = false;
  priceListLoading:boolean = false;
  employeeLoading:boolean = false;
  positionLoading:boolean = false;

  
  constructor(private formBuilder: FormBuilder, private adminEnumStore: Store<AdminProfileState>, public dialog: MatDialog) {
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    console.log(this.serviceDetailData)

    this.serviceDetailForm = this.formBuilder.group({
      main_branch_id: [this.serviceDetailData ? this.serviceDetailData.main_branch_id : '', [Validators.required]],
      date_started: [this.serviceDetailData["date_started"] ? new Date(this.serviceDetailData.date_started * 1000) : null],
      date_left: [this.serviceDetailData["date_left"] ? new Date(this.serviceDetailData.date_left * 1000) : null],
      last_roster_date: [this.serviceDetailData["last_roster_date"] ? new Date(this.serviceDetailData.last_roster_date * 1000) : null],
      job_type: [this.serviceDetailData ? this.serviceDetailData.job_type : ''],
      position_id: [this.serviceDetailData ? this.serviceDetailData.position_id : ''],
      //['']
      manager:[this.serviceDetailData ? this.serviceDetailData.manager : ''],
      on_hold:[this.serviceDetailData ? this.serviceDetailData.on_hold : ''],
      volunteer: [this.serviceDetailData ? this.serviceDetailData.volunteer : ''],
      member: [this.serviceDetailData ? this.serviceDetailData.member : ''],
      risk_asses_roles: [this.serviceDetailData ? this.serviceDetailData.risk_asses_roles : ''],
      employment: [this.serviceDetailData ? this.serviceDetailData.employment : ''],
      employment_type: [this.serviceDetailData ? this.serviceDetailData.employment_type : '', [Validators.required]],
      hourly_rate: [this.serviceDetailData ? this.serviceDetailData.hourly_rate : ''],
      price_list: [this.serviceDetailData ? this.serviceDetailData.price_list : ''],
      pay_travel_time: [false],
      pay_travel_mileage: [false]
    });
    this.formStep.emit(EmployeeConstants.serviceDetails);

    this.subscribeEnum();
    
    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_BRANCHES
    });

    this.adminEnumStore.dispatch({
      type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST
    });

    this.adminEnumStore.dispatch({
      type: PriceListActionTypes.GET_PRICE_LIST_LIST
    });

    this.adminEnumStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
  }

  subscribeEnum(){
    this.req = this.enum$.subscribe((results: any) => {
      this.mainBranchEnum = results?.adminEnums.branches;
      this.branchLoading = results?.adminEnums.pending;
    })

    this.employeeReq  = this.enum$.subscribe((results: any) => {
      this.managerEnum =  results?.employees.employeeList;
      this.employeeLoading = results?.employees.employeeListPending;
    })

    this.positionReq  = this.enum$.subscribe((results: any) => {
      this.positionEnum = results?.employeePosition.employeePositionList;
      this.positionLoading = results.employeePosition.pending;
    })

    this.priceListReq  = this.enum$.subscribe((results: any) => {
      if(results.priceList.priceListList){
        results.priceList.priceListList.forEach(element => {
          element.name = element.type
        });
        this.priceListEnum = results.priceList.priceListList;
      }
      this.priceListLoading = results.priceList.pending;
    })

  }

  openAddMainBranch(e){
    let mainBranchDialog = this.dialog.open(
      MainBranchModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '450px',
        data: {
        },
      }
    );

    mainBranchDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      let newBranch ={
        id: Math.random(),
        value: res.mainBranch
      }

      this.adminEnumStore.dispatch({
        type: AdminEnumsActionTypes.ADD_BRANCH,
        payload: newBranch
      });
  
    });
  }

  openAddPosition(e){
    let positionDialog = this.dialog.open(
      PositionModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '450px',
        data: {
        },
      }
    );

    positionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      let newPosition ={
        id: Math.random(),
        value: res.position
      }

      this.adminEnumStore.dispatch({
        type: AdminEnumsActionTypes.ADD_POSITION,
        payload: newPosition
      });
  
    });

  }

  openAddManager(e){

  }

  openAddEmploymentType(e){
    let employmenTypeDialog = this.dialog.open(
      EmploymentTypeModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '450px',
        data: {
        },
      }
    );

    employmenTypeDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      let newEmploymentType ={
        id: Math.random(),
        value: res.position
      }

      this.adminEnumStore.dispatch({
        type: AdminEnumsActionTypes.ADD_EMPLOYMENT_TYPE,
        payload: newEmploymentType
      });
  
    });
  }

  openAddPriceList(e){
    let priceListDialog = this.dialog.open(
      PricelistModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '450px',
        data: {
        },
      }
    );

    priceListDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      let priceList ={
        id: Math.random(),
        value: res.position
      }

      this.adminEnumStore.dispatch({
        type: AdminEnumsActionTypes.ADD_EMPLOYMENT_TYPE,
        payload: priceList
      });
  
    });
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  submit(){
    let data = {
      ...this.serviceDetailForm.value,
      "employee-qualification": {
        add: [],
        delete: this.serviceDetailData.hasOwnProperty("employee-qualification") ? this.serviceDetailData["employee-qualification"] : []
      }
    }
    if(this.positionEnum.length > 0){
      let position = this.positionEnum.find(x => x.id === this.serviceDetailForm.value.position_id)
      let qualificationId = []
      if(Array.isArray(position?.employee_position_qualification)){
        position.employee_position_qualification.forEach(element => {
          let q = {qualification_id: null}
          q.qualification_id = element.id;

          qualificationId.push(q);
        });
      }
      data["employee-qualification"].add = qualificationId;
    }

    if(this.serviceDetailForm.valid){
      this.submitData.emit(data);
    }
  }

  updateQualification(event: any): void {
    console.log(event, this.positionEnum)
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  next(){
    if(this.serviceDetailForm.valid){
      let data = {
        ...this.serviceDetailForm.value,
        "employee-qualification": {
          add: []
        }
      }
      if(this.positionEnum.length > 0){
        let position = this.positionEnum.find(x => x.id === this.serviceDetailForm.value.position_id)
        let qualificationId = []
        if(Array.isArray(position?.employee_position_qualification)){
          position.employee_position_qualification.forEach(element => {
            let q = {qualification_id: null}
            q.qualification_id = element.id;

            qualificationId.push(q);
          });
        }
        data["employee-qualification"].add = qualificationId;
      }

      this.submitData.emit(data);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: this.isUpdate ? 4 : 3, isValid: this.serviceDetailForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.serviceDetailForm.value);
    }
  }


}

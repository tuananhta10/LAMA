import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { 
  addDays, 
  addHours,
  subHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  format,
  differenceInHours,
  differenceInMinutes
} from 'date-fns';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';

@Component({
  selector: 'app-search-client-modal',
  templateUrl: './search-client-modal.component.html',
  styleUrls: ['./search-client-modal.component.scss'],
})
export class SearchClientModalComponent implements OnInit {

  clientForm!: FormGroup;
  employeeForm!: FormGroup;
  localData:any;

  public loading: boolean = true;
  private req: Subscription;
  private clientFundingReq: Subscription;
  private clientsData$: any;
  private clientFundingData$: any;
  public clientFundingEnum: any = [];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  clientOptions:any;

  constructor(
    public dialogRef: MatDialogRef<SearchClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private adminClientServiceSchedule: Store<AdminProfileState>,
    private adminEnumStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder,
    private adminClientFunding: Store<AdminProfileState>,
    private clientListStore: Store<ClientListState>,
  ) {
    this.localData = data;
    //this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.clientFundingData$ = this.adminClientFunding.pipe(select(state => state.clientFunding));

  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      client: ['', [Validators.required]],
    });

    this.employeeForm = this.formBuilder.group({
      employee: ['', [Validators.required]],
    });

    if(this.data?.schedule?.type === 'Group'){
      this.getEmployee();
    }

    this.subscribeEnum();
  }

  getEmployee(){
    let objectBody = {
      page: 'vacant',  
      view: 'creation',
      filter: 'all',
      date:  convertTimestampUtc(new Date(this.data?.start_date)), 
      start_time: this.data?.schedule?.start_time ? this.convertTimeFull(this.data?.schedule?.start_time) : '00000',  
      end_time: this.data?.schedule?.end_time ? this.convertTimeFull(this.data?.schedule?.end_time) : '2359', 
      price_list_id: this.data?.schedule?.price_list_id,
      client_id: this.data?.schedule?.client_id,
    }

    this.adminEnumStore.dispatch({
      type: ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE,
      payload: {
        data: { ...objectBody }
      }
    });
  }

  convertTimeFull(amPmString) { 
    let d = new Date("1/1/2013 " + amPmString); 

    let hour = (d.getHours() + '').length === 2 ? d.getHours() : '0' + d.getHours();
    let minute =  (d.getMinutes() + '').length === 2 ? d.getMinutes() : '0' + d.getMinutes();

    return `${hour}${minute}`; 
  }

  private reqEmployee: Subscription;
  private employeeEnums$: any;

  public employeeEnums: any;
  public employeeEnumFiltered: any;

  subscribeEnum(){
    console.log(this.data?.client_added)

    this.clientOptions = this.data?.clients?.filter(el => this.data?.client_added?.findIndex(_el => _el?.id === el?.id) === -1);;
    // client funding
    this.clientFundingReq = this.clientFundingData$.subscribe((clientFunding: any) => {
      this.loading = clientFunding?.clientFundingList.pending;
    });

    // EMPLOYEE  ENUM
    this.employeeEnums$ = this.adminClientServiceSchedule.pipe(select(state => state));
    this.reqEmployee = this.employeeEnums$.subscribe((results: any) => {
      this.loading = results.scheduleBoard.pendingVacantEmployees;
      
      if(this.loading){
        this.employeeEnums = [];
        this.employeeEnumFiltered = [];
      }

      if(results?.scheduleBoard.vacantEmployees.length > 0){
        this.employeeEnums = results?.scheduleBoard.vacantEmployees.filter(el => this.data?.employee_added?.findIndex(_el => _el?.id === el?.id) === -1)//.map(el => el?.name);
        this.employeeEnumFiltered = results?.scheduleBoard.vacantEmployees.filter(el => this.data?.employee_added?.findIndex(_el => _el?.id === el?.id) === -1).map(el => el?.name);
      }
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.clientForm.valid){
      this.dialogRef.close(this.clientForm.value);
    }

    if(this.employeeForm.valid){
      let selectedEmployee = this.employeeEnums.filter(el => !!this.employeeForm.controls['employee'].value?.find(_el => _el === el?.name))
      this.dialogRef.close(selectedEmployee);
    }
  }
}

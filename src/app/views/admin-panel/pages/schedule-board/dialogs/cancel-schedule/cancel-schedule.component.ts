import { Component, OnDestroy, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CancellationPolicyActionTypes } from '@main/views/admin-panel/store/actions/admin-cancellation-policy.action';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
  Observable,
  forkJoin,
  combineLatest
} from 'rxjs';
import {
  select,
  Store
} from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-cancel-schedule',
  templateUrl: './cancel-schedule.component.html',
  styleUrls: ['./cancel-schedule.component.scss']
})
export class CancelScheduleComponent implements OnInit {
  public loading: boolean = true;
  private cancellationPolicy$: any;
  private req: Subscription;
  private reqEmployee: Subscription;
  private employeeEnums$: any;
  private unsubscribe$ = new Subject<void>();

  public employeeEnums: any;
  public employeeEnumFiltered: any;
  public selection: string = '';
  public cancellationReason!: FormGroup;
  public cancellationPolicyOption: any[] = [];  
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  constructor(
    private adminCancellationPolicy: Store<AdminProfileState>,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminEnumStore: Store<AdminProfileState>,
    private adminClientServiceSchedule: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<CancelScheduleComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE CANCELLED", data)
  }

  ngOnInit(): void {
    this.employeeEnums$ = this.adminEnumStore.pipe(select(state => state));
    this.cancellationReason = this.formBuilder.group({
      cancellation_policy_id: [''],
      cancellation_reason: [''],  
      cancellation_comments: [''],
      cancellation_percent: [''],

      cancelled_by: [''],  
      cancellation_received_type: [null],
      charge_to_client: [null],  
      pay_employees: [null],  
      inform_employees: [null],  
      is_this_a_once_off_cancellation: [null],
      name_of_staff_allocated: [''],
      date_of_cancellation_received: [new Date()],  
      time_of_cancellation_received: [new Date()],  
    });

    this.subscribeEnums();
    this.subscribeEmployee();
    this.getEmployees();
  }

  ngOnDestroy(): void{
    this.cancellationPolicyOption = [];
    if(this.req) this.req.unsubscribe();
  }


  /* FOR CHECKIGN VACANT EMPLOYEE */
  getEmployees(){
    this.adminClientServiceSchedule.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
  }

  subscribeEmployee(){
    this.employeeEnums$ = this.adminClientServiceSchedule.pipe(select(state => state));
    this.reqEmployee = this.employeeEnums$.subscribe((results: any) => {
      //this.loading = results.employees.employeeListPending;
      if(results?.employees.employeeList.length > 0){
        results.employees.employeeList.forEach(element => {
          results.employees.employeeList.name = element.last_name + ", " +  element.first_name;
        });
      }
      this.employeeEnums = results.employees.employeeList;
    })

  }

  convertTo12Hrs(time) {
    if(!time) return;

    // Check correct time format and split into components
    time = time?.substr(0,5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }


  subscribeEnums(){
    this.cancellationPolicy$ = this.adminCancellationPolicy.pipe(select(state => state.cancellationPolicy));

    this.req = this.cancellationPolicy$.subscribe((cancellationPolicy: any) => {
      this.loading = cancellationPolicy.pending;

      if (cancellationPolicy.cancellationPolicyList.length > 0 && this.cancellationPolicyOption?.length === 0) {      
        this.cancellationPolicyOption = [];
        this.cancellationPolicyOption = cancellationPolicy.cancellationPolicyList;

        this.cancellationPolicyOption.forEach(el => {
          el['name'] = `${el?.name}`;
        });
      } 
    });


    this.cancellationReason.controls['cancellation_policy_id']
    .valueChanges.subscribe((value) => {
      if(value){
        let policy = this.cancellationPolicyOption.find(el => el?.id == value);

        console.log(policy)

        this.cancellationReason.controls['cancellation_reason'].setValue(policy?.description);
        this.cancellationReason.controls['cancellation_percent'].setValue(policy?.charge_percentage);
        this.cancellationReason.controls['charge_to_client'].setValue(policy?.charge_to_clients);
        this.cancellationReason.controls['pay_employees'].setValue(policy?.pay_employees);
      }
    });

    this.adminCancellationPolicy.dispatch({
      type: CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST
    });
  }

  closeSaveDialog(): void {
    //console.log(this.cancellationPolicyOption, this.cancellationReason.value)
    this.dialogRef.close({
      arrayData: this.data,
      cancellation_data: this.cancellationReason.value,
      cancel: false
    });
  }
}

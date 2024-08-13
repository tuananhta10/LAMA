import { Component, Input, OnInit } from '@angular/core';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ClientServiceScheduleState } from '@main/views/admin-panel/store/reducers/admin-client-service-schedule.reducer';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeListState } from '@main/views/admin-panel/store/reducers/admin-employees.reducer';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.scss']
})
export class ApprovalDetailsComponent implements OnInit {

  @Input() data;
  @Input() timesheetDetailsForm: FormGroup;
  @Input() timeLoggedForm!: FormGroup; 
  @Input() isReadOnly: boolean = true;
  
  public serviceSchedule: any[];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  private enum$: any;  
  private clientReq: Subscription;
  private clientFundingReq: Subscription;
  private priceListReq: Subscription;
  private serviceTypeReq: Subscription;

  public serviceDetailsForm: FormGroup;

  servicecTypeEnum: any = [];
  serviceTypeLoading: boolean = false;


  constructor(private adminEnumStore: Store<AdminProfileState>,
    private employeeState: Store<any>,
    private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.serviceDetailsForm = this.formBuilder.group({
      status: [this.data ? this.data?.client_service_schedule_status : ''],  
      support_worker_case_notes: [this.data ? this.data?.client_service_schedule_support_worker_case_notes : ''],
      support_coordinator_case_notes: [this.data ? this.data?.client_service_schedule_support_coordinator_case_notes : ''],
      service_facilitator_case_notes: [this.data ? this.data?.client_service_schedule_service_facilitator_case_notes : ''],
      service_type_support_item_name: [this.data ? this.data?.service_type_support_item_name : ''],  
      service_type_id: [this.data ? this.data?.service_type_id : ''],  
    });
  }

  setVal(event){
    console.log(event)
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

  convertToDate(date){
    return new Date(date * 1000);
  }

}

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
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss']
})
export class TimesheetDetailsComponent implements OnInit {
  @Input() data;
  @Input() timesheetDetailsForm: FormGroup;
  @Input() timeLoggedForm!: FormGroup; 
  @Input() isReadOnly: boolean = true;
  
  private employeeList$;
  private clientList$;
  public employee: any[];
  
  public serviceSchedule: any[];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  private enum$: any;  
  private clientReq: Subscription;
  private clientFundingReq: Subscription;
  private priceListReq: Subscription;
  private serviceTypeReq: Subscription;

  public serviceDetailsForm: FormGroup;
  public selectedServiceType: any;
  public selectedSchedule: any;
    
  servicecTypeEnum: any = [];
  serviceTypeLoading: boolean = false;


  constructor(private adminEnumStore: Store<AdminProfileState>,
    private employeeState: Store<any>,
    private formBuilder: FormBuilder) { 
    this.employeeList$ = this.employeeState.pipe(select(state => state.employees.employeeList))
    .subscribe(this.getList.bind(this));

    this.clientList$ = this.employeeState.pipe(select(state => state.clientServiceSchdule.clientServiceScheduleList))
    .subscribe(this.getService.bind(this));
  }

  ngOnInit(): void {
    this.serviceDetailsForm = this.formBuilder.group({
      status: [this.data ? this.data?.client_service_schedule_status : ''],  
      support_worker_case_notes: [this.data ? this.data?.client_service_schedule_support_worker_case_notes : ''],
      support_coordinator_case_notes: [this.data ? this.data?.client_service_schedule_support_coordinator_case_notes : ''],
      service_facilitator_case_notes: [this.data ? this.data?.client_service_schedule_service_facilitator_case_notes : ''],
      service_type: [this.data ? this.data?.service_type_support_item_name : ''],  
      service_type_id: [this.data ? this.data?.service_type_id : ''],  
    });

    this.subscribeEnums();

    if(this.data){
      this.setSelectedServiceType(this.data?.client_service_schedule_id);
      
    }
  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));

    if(this.data){
      this.adminEnumStore.dispatch({
        type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE,  
        payload: this.data
      });
    }

    this.clientReq = this.enum$.subscribe((results: any) => {
      this.selectedSchedule = results?.clientServiceSchdule?.clientServiceSchedule[0];

      // set support item details
      if(this.selectedSchedule){
        this.serviceDetailsForm.controls['service_type'].setValue(
          this.selectedSchedule?.price_list[0]?.service_type[0]?.support_item_number + 
          ': ' +
          this.selectedSchedule?.price_list[0]?.service_type[0]?.support_item_name
        );
      }
      else {
        this.serviceDetailsForm.controls['service_type'].setValue('');
      }

      console.log("SCHEDULE", this.selectedSchedule)
    });
  }

  // set selected service type
  setSelectedServiceType(event){

    /* VIEW EMPLOYEES */
    if(!!event){
      console.log(event?.id)

      this.adminEnumStore.dispatch({
        type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE,  
        payload: event
      });
    }

    let schedule = this.serviceSchedule.find(el => el.id == (event?.id || event));  

    if(!!schedule){
      this.selectedServiceType = schedule;

      if(schedule?.status){
        this.serviceDetailsForm.controls['status'].setValue(schedule?.status);
      }
      
      if(!this.timeLoggedForm.controls['start_date'].value){
        this.timeLoggedForm.controls['start_date'].setValue(new Date(schedule?.start_date * 1000));
        this.timeLoggedForm.controls['end_date'].setValue(new Date(schedule?.end_date * 1000));
      }
    }
  }

  setVal(event){
    console.log(event)
  }
  
  getList(event){
    this.employee = event.map(emp => {
      return {
        ...emp,
        name: emp.first_name + ' ' + emp.last_name
      }
    });
  }

  getService(events){
    if(!!events){

      this.serviceSchedule = events.sort((a,b) => b.start_date - a.start_date)
      .map(service => {
        return{
          ...service,
          name: `<strong>[${this.convertToDate(service?.start_date).toLocaleDateString()}]</strong><br> ${service.activity}, ${this.convertTo12Hrs(service.start_time)} - ${this.convertTo12Hrs(service.end_time)}`
        }
      });

      //this.serviceDetailsForm.controls['service_type'].setValue('AASDAS');

      //console.log(this.serviceSchedule)

    }
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

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ClientServiceScheduleState } from '@main/views/admin-panel/store/reducers/admin-client-service-schedule.reducer';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeListState } from '@main/views/admin-panel/store/reducers/admin-employees.reducer';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss']
})
export class TimesheetDetailsComponent implements OnInit {
  @Input() data;
  @Input() timesheetDetailsForm: FormGroup;
  
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

  servicecTypeEnum: any = [];
  serviceTypeLoading: boolean = false;

  constructor(private adminEnumStore: Store<AdminProfileState>,
    private employeeState: Store<any>) { 
    this.employeeList$ = this.employeeState.pipe(select(state => state.employees.employeeList))
    .subscribe(this.getList.bind(this));

    this.clientList$ = this.employeeState.pipe(select(state => state.clientServiceSchdule.clientServiceScheduleList))
    .subscribe(this.getService.bind(this));
  }

  ngOnInit(): void {
    this.subscribeEnums();
 
    this.adminEnumStore.dispatch({
      type: ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST
    });
    
  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));

    this.serviceTypeReq  = this.enum$.subscribe((results: any) => {
      let serviceTypes =  [...results?.serviceType.serviceTypeList];

      [...serviceTypes].forEach((el, i) => {
        el['name'] = `<strong>[${el['support_item_number']}]</strong> <br> ${el['support_item_name']}`;

        return el;
      });
      this.serviceTypeLoading = results.serviceType.pending;
      this.servicecTypeEnum = serviceTypes;
    });

  }

  // set selected service type
  setSelectedServiceType(event){
    let schedule = this.serviceSchedule.find(el => el.id == event);  

    if(schedule){
      let serviceTypeIndex = this.servicecTypeEnum.find(el => el.id == schedule?.service_type_id);
      let selected = {
        id: serviceTypeIndex?.id,
        name: `[${serviceTypeIndex['support_item_number']}] - ${serviceTypeIndex['support_item_name']}`
      }
      console.log(serviceTypeIndex)
      this.timesheetDetailsForm.controls['service_type'].setValue(selected?.name);
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
    this.serviceSchedule = events.map(service => {
      console.log(service)
      return{
        ...service,
        name: `${service.activity}, ${this.convertTo12Hrs(service.start_time)} - ${this.convertTo12Hrs(service.end_time)}`
      }
    });
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
}

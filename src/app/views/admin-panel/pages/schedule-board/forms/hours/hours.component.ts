import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CancellationPolicyActionTypes } from '@main/views/admin-panel/store/actions/admin-cancellation-policy.action';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { 
  addDays, 
  addHours,
  subHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  differenceInHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit, OnDestroy {
  @Input() data;
  @Input() serviceScheduleForm!: FormGroup;
  @Input() hourForm!: FormGroup;
  @Input() clientTotalForm!: FormGroup;
  @Input() isDisabled: boolean = false;

  private enum$: any;  
  private clientReq: Subscription;
  private clientFundingReq: Subscription;
  private priceListReq: Subscription;
  private serviceTypeReq: Subscription;
  private cancellationPolicy$: any;
  private req: Subscription;
  private reqEmployee: Subscription;
  private employeeEnums$: any;
  private unsubscribe$ = new Subject<void>();

  public employeeLoading: boolean = true;
  public loading: boolean = true;
  public dateNow: Date = new Date();
  public activeInput: string = '';
  public minTime: any = "12:00 am"
  public maxTime: any = "11:59 pm"
  public type: any[] =["Individual", "Group", "Group/Individual"];
  public ahCalculation: any[] = ["Shift Start", "Shift End", "Highest Rate", "Split"];
  public status: any[] = ["unassigned", "scheduled", "cancelled", "completed"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public cancellationPolicyOption: any = [];
  public employeeEnums: any = [];

  constructor(
    private adminEnumStore: Store<AdminProfileState>
  ) { 
    console.log("DATA", this.data)
  }

  ngOnDestroy(): void {
    console.log(this.hourForm.value);
    if(this.reqEmployee) this.reqEmployee.unsubscribe();
    if(this.req) this.req.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeEmployee();
    this.subscribeEnums();

    this.hourForm.controls['a_h_calculator']
      .valueChanges
      .subscribe((value) => {
        console.log(value)
        this.ahRecalculator(this.data?.schedule,
          this.data?.schedule?.price_list, 
          this.convertTimeToNumber(this.data?.schedule?.start_time), 
          this.convertTimeToNumber(this.data?.schedule?.end_time), 
          this.data?.schedule?.editable_rate_value,
          value
        )
      })
  }

  subscribeEmployee(){
      this.employeeEnums$ = this.adminEnumStore.pipe(select(state => state));
      this.reqEmployee = this.employeeEnums$.subscribe((results: any) => {
        this.employeeLoading = results.employees.employeeListPending;
        if(results?.employees.employeeList.length > 0){
          results.employees.employeeList.forEach(element => {
            results.employees.employeeList.name = element.last_name + ", " +  element.first_name;
          });
        }
        this.employeeEnums = results.employees.employeeList;
      });

      this.adminEnumStore.dispatch({
        type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
      });

    }

  subscribeEnums(){
      this.cancellationPolicy$ = this.adminEnumStore.pipe(select(state => state.cancellationPolicy));

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

      this.hourForm.controls['cancellation_policy_id']
      .valueChanges.subscribe((value) => {
        if(value){
          let policy = this.cancellationPolicyOption.find(el => el?.id == value);

          //this.hourForm.controls['cancellation_reason'].setValue(policy?.description);
          this.hourForm.controls['cancellation_percent'].setValue(policy?.charge_percentage);
          this.hourForm.controls['charge_to_client'].setValue(policy?.charge_to_clients);
          this.hourForm.controls['pay_employees'].setValue(policy?.pay_employees);
        }
      });

      this.adminEnumStore.dispatch({
        type: CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST
      });
    }

    ahRecalculator(data: any, pricelist: any, start_time: number, end_time: number, editable_rate_value, ah_calculation){
      /*let hour = (end_time - start_time) / 100;
      let total_hours = hour > 0 ? hour : (hour + 24);*/
      
      // let startTime = data?.start_time;

      const formatTime = (time:number) => {
        const timeString = time.toString();
        if (timeString.length === 4) {
          const formattedTime = timeString.slice(0, 2) + ":" + timeString.slice(2);
          return formattedTime;
        } 
        else if (timeString.length === 3) {
          const formattedTime = `0${timeString.slice(0, 1) + ":" + timeString.slice(1)}`;
          return formattedTime;
        } 
        else{
          return `00:00`
        }
  
      }
  
      let startTime = formatTime(start_time);
      let startDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${startTime}`;
      // let endTime = data?.end_time;
      let endTime = formatTime(end_time);
      let endDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${endTime}`;
      if(startTime > endTime){
        endDate = `${this.add24Hours(endDate)} ${endTime}`
      }
      let total_hours = this.serviceScheduleForm?.controls['total_hours'].value
  
      /* SHIFT START */ 
      if(ah_calculation === 'Shift Start'){
        if(start_time >= 600 && start_time <= 1559 && (end_time <= 2000 || total_hours >= 6)){
          this.setRate('Standard Rate', 'standard_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if(start_time >= 1600 && start_time < 2000 && end_time <= 2000){
          this.setRate('Afternoon Rate', 'afternoon_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if(start_time >= 1900 && end_time >= 1900 && end_time <= 2100){
          this.setRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if(start_time >= 2000 && end_time >= 2000 && end_time <= 2359){
          this.setRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        // else if((start_time >= 2200 || start_time < 600) && end_time <= 800){
        //   console.log("Night")
        //   this.setRate('Night Rate', 'night_rate', pricelist, total_hours, data?.editable_rate_value, data);
        // }
  
        else if((start_time > 600 && end_time < 2359) && startTime > endTime){
          console.log("Night")
          this.setRate('Night Rate', 'night_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
      }
  
      /* SHIFT END */
      else if(ah_calculation === 'Shift End' || ah_calculation === 'Highest Rate'){
        if(start_time >= 600 && end_time < 1400){
          this.setRate('Standard Rate', 'standard_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if(start_time >= 600 && start_time <= 1559 && end_time === 1400){
          this.setRate('Afternoon Rate', 'afternoon_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if(start_time >= 1600 && start_time <= 2000 && end_time < 2000){
          this.setRate('Afternoon Rate', 'afternoon_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if(start_time >= 1600 && start_time <= 2000 && end_time === 2000){
          this.setRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if(start_time >= 1600 && start_time <= 1900 && end_time <= 2000){
          this.setRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if(start_time >= 2000 && end_time >= 2000 && end_time <= 2359){
          this.setRate('Night Rate', 'night_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
  
        else if((start_time >= 2200 || start_time < 600) && end_time <= 800){
          this.setRate('Night Rate', 'night_rate', pricelist, total_hours, data?.editable_rate_value, data);
        }
      }
    }

    setRate(rate_name, rate, pricelist, total_hours, rate_value, data){
      if(data?.shift_rate === 'Saturday Rate'){
        this.checkRate('Saturday Rate', 'saturday_rate', pricelist, total_hours, rate_value);
      }else if(data?.shift_rate === 'Sunday Rate'){
        this.checkRate('Sunday Rate', 'sunday_rate', pricelist, total_hours, rate_value);
      }else if(data?.shift_rate === 'Public Holiday Rate'){
        this.checkRate('Public Holiday Rate', 'public_holiday_rate', pricelist, total_hours, rate_value);
      }else{
        this.checkRate(rate_name, rate, pricelist, total_hours, rate_value);
      }
    }

    private checkRate (rate_name, rate, pricelist, total_hours, editable_rate_value) {
      this.serviceScheduleForm?.get('editable_rate_value')
      .setValue(pricelist[0][`${rate}_code`] ? pricelist[0][`${rate}`] 
        : pricelist[0]['standard_rate'] > 0 ? pricelist[0]['standard_rate'] 
        : editable_rate_value
        )
      this.serviceScheduleForm?.get('shift_rate').setValue(
        `${rate_name}`
      )

      this.serviceScheduleForm?.get('support_item_number').setValue(
        pricelist[0][`${rate}_code`] ? pricelist[0][`${rate}_code`] : pricelist[0]['standard_rate_code']
      )


      // return {
      //   total_hours: total_hours,
      //   shift_rate: `${rate_name}`,
      //   editable_rate_value: pricelist[`${rate}_code`] ? pricelist[`${rate}`] 
      //   : pricelist['standard_rate'] > 0 ? pricelist['standard_rate'] 
      //   : editable_rate_value,
      //   support_item_price: pricelist[`${rate}_code`] ? pricelist[`${rate}`] 
      //   : pricelist['standard_rate'] > 0 ? pricelist['standard_rate'] 
      //   : editable_rate_value,
      //   support_item_number:  pricelist[`${rate}_code`] ? pricelist[`${rate}_code`] : pricelist['standard_rate_code']
      // }
    }


    private add24Hours(date:any){

      let formattingEndDate = new Date(date);
      let newEndTime = new Date(formattingEndDate.getTime() + 24 * 60 * 60 * 1000)
      let endDate = new Date(newEndTime).toLocaleDateString();
  
      return endDate
    }

    convertTimeToNumber(timeString) {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      const timeNumber = hours * 100 + minutes;
    
      return timeNumber;
    }
}

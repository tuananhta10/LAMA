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
  selector: 'app-calculated-cost',
  templateUrl: './calculated-cost.component.html',
  styleUrls: ['./calculated-cost.component.scss']
})
export class CalculatedCostComponent implements OnInit {
  @Input() data;
  @Input() timesheetDetailsForm: FormGroup;
  @Input() timeLoggedForm!: FormGroup; 
  @Input() approvalForm: FormGroup;

  public loading: boolean = false;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  public employeePayrateColumn:any[] =  [
      { field: 'employee', name: 'Employee' },
      { field: 'employment_type', name: 'Employment Type', sub_title: 'Employment Type'},
      { field: 'classification', name: 'Classification', sub_title: 'Payrate Classification' },
      { field: 'category', name: 'Category', sub_title: 'Payrate Category' },
      { field: 'shift', name: 'Shift Type', editable: false },
      { field: 'hourly_pay_rate', name: 'Hourly Rate', type: 'currency', editable: false, sub_title: 'Hourly Pay Rate' },
      { field: 'total_hours', name: 'Total Hours', editable: false },
      { field: 'main_total', name: 'Main Total', type: 'currency', editable: false },
  ]; 
  public employeePayrateData: any[] = [];

  public clientTotalColumn:any[] =  [
      { field: 'client_name', name: 'Participant'},
      { field: 'rate_type', name: 'Rate Type'},
      { field: 'editable_rate_value', name: 'Support Item Price' },
      { field: 'total_hours', name: 'Total Hours', editable: false },
      { field: 'calculated_cost', name: 'Calculated Cost', type: 'currency', editable: false },
      { field: 'expenses_total', name: 'Expense Total', type: 'currency', editable: false },
      { field: 'service_fee', name: 'Service Fee', type: 'currency', editable: false },
      { field: 'travel_total', name: 'Travel Total', type: 'currency', editable: false },
      { field: 'client_total', name: 'Main Total', type: 'currency', editable: false },
    ]; 
  public clientTotalData: any[] = [];
  public clientTotalForm!: FormGroup;

  constructor(private adminEnumStore: Store<AdminProfileState>,
    private employeeState: Store<any>,
    private formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
    // employee payrate
    this.generateEmployeePayrate();
    // client total
    this.generateClientTotal();

    console.log(this.data, this.data?.employee_timesheet_update_shift_time,
      this.data?.employee_employment_type,
      this.data?.employee_paid_annually)
  }


  generateClientTotal(){
    let recheck_approval = this.data?.employee_timesheet_update_shift_time ? this.data?.employee_timesheet_total_hours: this.data?.client_service_schedule_total_hours;
    let shift_rate = this.data?.employee_timesheet_update_shift_time ? (this.data?.employee_timesheet_shift_rate) : this.data?.client_service_schedule_shift_rate;
    let standard_hour_rate =  this.data?.price_list_standard_rate > 0 ? this.data?.price_list_standard_rate : this.data?.client_service_schedule_editable_rate_value;
    let client_hour_rate = standard_hour_rate;

    if(this.data?.employee_timesheet_update_shift_time){
      if(shift_rate?.toLowerCase().match('afternoon')){
        client_hour_rate = this.data?.price_list_afternoon_rate || standard_hour_rate;
      }

      else if(shift_rate?.toLowerCase().match('night')){
        client_hour_rate = this.data?.price_list_night_rate || standard_hour_rate;
      }

      else if(shift_rate?.toLowerCase().match('evening')){
        client_hour_rate = this.data?.price_list_evening_rate || standard_hour_rate;
      }

      else if(shift_rate?.toLowerCase().match('saturday')){
        client_hour_rate = this.data?.price_list_saturday_rate ||standard_hour_rate;
      }

      else if(shift_rate?.toLowerCase().match('sunday')){
        client_hour_rate = this.data?.price_list_sunday_rate || standard_hour_rate;
      }
    }

    if(shift_rate?.toLowerCase().match('Public Holiday')){
      console.log("PUBLIC HOLIDAY")
      client_hour_rate = this.data?.price_list_public_holiday_rate || standard_hour_rate;
    }

    let main_total = (client_hour_rate * recheck_approval) 
      + this.data?.client_service_schedule_service_fee
      + this.data?.client_service_schedule_travel_total
      + this.data?.client_service_schedule_expenses_total

    this.clientTotalData = [
      {
        client_name: this.data?.client_name,
        rate_type: this.data?.client_service_schedule_rate_type,
        editable_rate_value: this.data?.client_service_schedule_editable_rate_value,
        total_hours: recheck_approval,
        calculated_cost: !this.data?.employee_timesheet_update_shift_time ? this.data?.client_service_schedule_calculated_cost : Math.round((client_hour_rate * recheck_approval) * 100) / 100,
        expenses_total: this.data?.client_service_schedule_expenses_total,
        service_fee: this.data?.client_service_schedule_service_fee,
        travel_total: this.data?.client_service_schedule_travel_total,
        client_total: !this.data?.employee_timesheet_update_shift_time ? this.data?.client_service_schedule_client_total : Math.round(main_total * 100)/100,
      }
    ]; 

    if(this.clientTotalData?.length > 0){
      this.clientTotalForm = this.formBuilder.group({
        rate_type: [this.clientTotalData[0]?.rate_type],
        editable_rate_value: [this.clientTotalData[0]?.editable_rate_value],
        total_hours: [this.clientTotalData[0]?.total_hours],
        calculated_cost: [this.clientTotalData[0]?.calculated_cost],
        expenses_total: [this.clientTotalData[0]?.expenses_total],
        service_fee: [this.clientTotalData[0]?.service_fee],
        travel_total: [this.clientTotalData[0]?.travel_total],
        client_total: [this.clientTotalData[0]?.client_total],
      });
    }
  }
  
  generateEmployeePayrate(){
    let shift_rate = this.data?.client_service_schedule_shift_rate;
    let shift;
    let employee_hour_rate = this.data?.employee_pay_rate_hourly_pay_rate || 0;
    let category = this.data?.employee_pay_rate_category || '-';
    let classification = this.data?.employee_pay_rate_classification || '-';
    let recheck_approval = this.data?.employee_timesheet_update_shift_time ? this.data?.employee_timesheet_total_hours: this.data?.client_service_schedule_total_hours

    if(shift_rate === 'Standard Rate'){
      shift = "Weekday Morning";
    }

    else if(shift_rate === 'Public Holiday Rate'){
      shift = "Public Holiday";
      employee_hour_rate = this.data?.employee_pay_rate_public_holiday_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('afternoon')){
      shift = "Weekday Afternoon";
      employee_hour_rate = this.data?.employee_pay_rate_afternoon_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('night')){
      shift = "Weekday Night";
      employee_hour_rate = this.data?.employee_pay_rate_night_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('evening')){
      shift = "Weekday Evening";
      employee_hour_rate = this.data?.employee_pay_rate_evening_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('saturday')){
      shift = "Saturday";
      employee_hour_rate = this.data?.employee_pay_rate_saturday_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('sunday')){
      shift = "Sunday";
      employee_hour_rate = this.data?.employee_pay_rate_sunday_rate || 0;
    }
    
    // payrate settings
    this.employeePayrateData = [
      {
        employee: this.data?.employee_name,
        employment_type: this.data?.employee_employment_type,
        classification: classification,  
        category: category,
        shift: shift,
        hourly_pay_rate: employee_hour_rate,
        total_hours: recheck_approval,
        main_total: Math.round((employee_hour_rate * (recheck_approval * 1)) * 100)/100, 
      }
    ];
  }

  getShiftRate(start_time, end_time, shift_rate?: any){
    let shift;
    let employee_hour_rate = this.data?.employee_pay_rate_hourly_pay_rate || 0;

    // if from start shift
    if(this.data?.client_service_schedule_a_h_calculator){
      if(start_time >= 600 && start_time <= 1559 && end_time <= 1800){
        console.log("MORNING")
        shift = 'Weekend Morning';
      }
      
      else if(start_time >= 1600 && start_time < 2000 && end_time <= 2000){
        console.log("Afternoon")
        shift = 'Weekend Afternoon';
        employee_hour_rate = this.data?.employee_pay_rate_afternoon_rate || 0;
      }

      else if(start_time >= 1900 && end_time >= 1900 && end_time <= 2100){
        shift = 'Weekend Evening';
        employee_hour_rate = this.data?.employee_pay_rate_evening_rate || 0;
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time <= 2359){
        console.log("Afternoon")
        shift = 'Weekend Evening';
        employee_hour_rate = this.data?.employee_pay_rate_evening_rate || 0;
      }

      else if((start_time >= 2200 || start_time < 600) && end_time <= 800){
        console.log("Night")
        shift = 'Weekend Night';
        employee_hour_rate = this.data?.employee_pay_rate_night_rate || 0;
      }
    }

    else if(this.data?.client_service_schedule_a_h_calculator === 'Shift End' || 
      this.data?.client_service_schedule_a_h_calculator === 'Highest Rate'){
      if(start_time >= 600 && start_time <= 1559 && end_time < 1800){
        console.log("MORNING")
      }

      else if(start_time >= 600 && start_time <= 1559 && end_time === 1800){
        console.log("Afternoon")
        shift = 'Weekend Afternoon';
        employee_hour_rate = this.data?.employee_pay_rate_afternoon_rate || 0;
      }

      else if(start_time >= 1600 && start_time <= 2000 && end_time < 2000){
        console.log("Afternoon")
        shift = 'Weekend Afternoon';
        employee_hour_rate = this.data?.employee_pay_rate_afternoon_rate || 0;
      }

      else if(start_time >= 1600 && start_time <= 2000 && end_time === 2000){
        console.log("EVENING")
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time < 2359){
        console.log("EVENING")
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time === 2359){
        console.log("Night")
      }

      else if((start_time >= 2200 || start_time < 600) && end_time <= 800){
        console.log("Night")
      }
    }
  }
}

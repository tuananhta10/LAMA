import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-client-totals',
  templateUrl: './client-totals.component.html',
  styleUrls: ['./client-totals.component.scss']
})
export class ClientTotalsComponent implements OnInit {
  @Input() data;
  @Input() serviceScheduleForm!: FormGroup;
  @Input() hourForm!: FormGroup;
  @Input() clientTotalForm!: FormGroup;
  @Input() isDisabled: boolean = false;

  public loading: boolean = false;

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

  /*
    rate_type: [this.data?.schedule ? this.data?.schedule?.rate_type: ''],
    editable_rate_value: [this.data?.schedule ? this.data?.schedule?.editable_rate_value: 0],
    total_hours: [this.data ? this.data.total_hours : 0],
    calculated_cost: [this.data?.schedule ? this.data?.schedule?.calculated_cost : 0],
    expenses_total: [this.data?.schedule ? this.data?.schedule?.expenses_total : 0],
    service_fee: [this.data?.schedule ? this.data?.schedule?.service_fee : 0],
    travel_total: [this.data?.schedule ? this.data?.schedule?.travel_total : 0],
    client_total: [this.data?.schedule ? this.data?.schedule?.client_total : 0],
  */
  private groupReq
  public clientTableData: any[] = [];
  private clientGroupData$


  public clientColumns:any[] = [
    {name: 'Name', field: 'name'},/* {name: 'Funding Source', field: 'funding_source_name' }*/
    {name: 'Rate Type', field: 'rate_type'}, 
    {name: 'Total Hours', field: 'total_hours'},
    {name: 'Calculated Total', field: 'calculated_cost', type: 'currency', editable: false},
    {name: 'Travel Total', field: 'travel_total', type: 'currency', editable: false},
    {name: 'Main Total', field: 'client_total', type: 'currency', editable: false},
  ];

  public employeeColumns:any[] = [
    { field: 'employee', name: 'Employee' },
    { field: 'employment_type', name: 'Employment Type', sub_title: 'Employment Type'},
    { field: 'classification', name: 'Classification', sub_title: 'Payrate Classification' },
    { field: 'category', name: 'Category', sub_title: 'Payrate Category' },
    { field: 'shift', name: 'Shift Type', editable: false },
    { field: 'hourly_pay_rate', name: 'Hourly Rate', type: 'currency', editable: false, sub_title: 'Hourly Pay Rate' },
    { field: 'total_hours', name: 'Total Hours', editable: false },
    { field: 'main_total', name: 'Main Total', type: 'currency', editable: false },
  ];
  public employeesTableData: any[] = [];
  public radioOptions:any[] = [{id: true, name: "Individual", value: true}, {id: false, name:"Pro-rata", value: false}];
  
  constructor(private adminClientGroup: Store<AdminProfileState>,) { 
  }

  ngOnInit(): void {
    if(this.data?.schedule?.type !== 'Group'){
      this.calculateIndividualTotal();
    } 

    else {
      this.calculateGroupTotal();
    }
  }
 
  ngOnDestroy(){
    if(this.groupReq) this.groupReq.unsubscribe()
  }

  calculateGroupTotal(){
    this.clientGroupData$ = this.adminClientGroup.pipe(select(state => state.clientGroup));
    this.groupReq =  this.clientGroupData$.subscribe((clientGroup: any) => {

      if(clientGroup.clientGroupList){
        // Get Current Group
        let selectedGroup = clientGroup.clientGroupList?.find(el => el?.id === clientGroup?.clientGroupSchedule?.group_id);
        let rateType = selectedGroup?.rate_type === '1' ? 'Individual' : 'Pro-Rata';
        let totalHours = this.data?.schedule?.total_hours;
        let divideBy = clientGroup?.clientGroupSchedule?.group_service_schedule_client?.length || 1;
        let calculatedCost = this.data?.schedule?.editable_rate_value * totalHours;
        let shift_rate = this.data?.schedule?.shift_rate;

        // Populate Table
        this.clientTableData = [];

        if(clientGroup?.clientGroupSchedule?.group_service_schedule_client?.length > 0){
          clientGroup?.clientGroupSchedule?.group_service_schedule_client?.forEach(el => {
            this.clientTableData.push(el.client)
          });
        }

        
        // MAP EMPLOYEE
        if(clientGroup?.clientGroupSchedule?.group_service_schedule_employee?.length > 0){
          clientGroup?.clientGroupSchedule?.group_service_schedule_employee.forEach(el => {
            let shift_rate = this.serviceScheduleForm.get('shift_rate').value;
            let shift;
            let employee_hour_rate = el?.employee?.employee_pay_rate[0]?.hourly_pay_rate || 0;
            let category = el?.employee?.employee_pay_rate[0]?.category || '-';
            let classification = el?.employee?.employee_pay_rate[0]?.classification || '-';
            let employment_type = el?.employee?.employment_type;

            if(shift_rate === 'Standard Rate'){
              shift = "Weekday Morning";
            }

            else if(shift_rate === 'Public Holiday Rate'){
              shift = "Public Holiday";
              employee_hour_rate = el?.employee?.employee_pay_rate[0]?.public_holiday_rate || 0;
            }

            else if(shift_rate?.toLowerCase().match('afternoon')){
              shift = "Weekday Afternoon";
              employee_hour_rate = el?.employee?.employee_pay_rate[0]?.afternoon_rate || 0;
            }

            else if(shift_rate?.toLowerCase().match('night')){
              shift = "Weekday Night";
              employee_hour_rate = el?.employee?.employee_pay_rate[0]?.night_rate || 0;
            }

            else if(shift_rate?.toLowerCase().match('evening')){
              shift = "Weekday Evening";
              employee_hour_rate = el?.employee?.employee_pay_rate[0]?.evening_rate || 0;
            }

            else if(shift_rate?.toLowerCase().match('saturday')){
              shift = "Saturday";
              employee_hour_rate = el?.employee?.employee_pay_rate[0]?.saturday_rate || 0;
            }

            else if(shift_rate?.toLowerCase().match('sunday')){
              shift = "Sunday";
              employee_hour_rate = el?.employee?.employee_pay_rate[0]?.sunday_rate || 0;
            }

            // For Contractor Employee
            if(employment_type === 'Contractor'){
              employee_hour_rate = employee_hour_rate;
              classification = "Contractual";  
              category = "Hourly Payrate";
            }

            console.log({
              employee: el?.employee?.name,  
              employment_type: el?.employee?.employment_type,
              classification: classification,  
              category: category,
              shift: shift,
              hourly_pay_rate: employee_hour_rate,
              total_hours: (this.clientTotalForm.controls['total_hours'].value * 1),
              main_total: Math.round((employee_hour_rate * (this.clientTotalForm.controls['total_hours'].value * 1)) * 100) / 100
            })

            this.employeesTableData.push({
              employee: el?.employee?.name,  
              employment_type: el?.employee?.employment_type,
              classification: classification,  
              category: category,
              shift: shift,
              hourly_pay_rate: employee_hour_rate,
              total_hours: (this.clientTotalForm.controls['total_hours'].value * 1),
              main_total: Math.round((employee_hour_rate * (this.clientTotalForm.controls['total_hours'].value * 1)) * 100) / 100
            });
          });
        }


        // Client Total
        if(calculatedCost){
          // get travel
          let travelTotal = this.data?.schedule?.travel_total;
          let totalExpenses = this.data?.schedule?.expenses_total;
          // divide client total 
          let calculatedCostByType = rateType === 'Pro-Rata' ? (calculatedCost / divideBy) : calculatedCost;
          // calculation for main total before rounding off
          let mainTotal = calculatedCost + travelTotal + totalExpenses;
          // divide client total and include travel and transport
          let clientTotalCalculated = rateType === 'Pro-Rata' ? (mainTotal / divideBy) : mainTotal;
          // round by 2 decimal
          let mainClientTotal = Math.round(clientTotalCalculated * 100) / 100;

          this.clientTableData.forEach((el,i) => {
              el['rate_type'] = rateType;
              //...this.clientTotalForm.value,
              el['calculated_cost'] = Math.round(calculatedCostByType * 100) / 100;
              el['client_total'] = mainClientTotal;
              el['total_hours'] = totalHours;
          });

          if(rateType === 'Pro-Rata'){
            this.clientTableData.push({
              name: 'Total Cost',
              rate_type: '',
              total_hours: '',
              calculated_cost: Math.round(calculatedCost * 100) / 100,
              travel_total: this.data?.schedule?.travel_total,
              client_total:  Math.round((calculatedCost + travelTotal + totalExpenses) * 100) / 100,
            })
          }
          console.log(this.clientTableData, mainClientTotal, rateType)

        }

        
        
      }
      this.loading = clientGroup?.pending;
    });
  }

  calculateIndividualTotal(){
    let shift_rate = this.data?.schedule?.shift_rate;
    let shift;
    let employee_hour_rate = this.data?.schedule?.employee?.employee_pay_rate[0]?.hourly_pay_rate || 0;
    let category = this.data?.schedule?.employee?.employee_pay_rate[0]?.category || '-';
    let classification = this.data?.schedule?.employee?.employee_pay_rate[0]?.classification || '-';
    let employment_type = this.data?.schedule?.employee?.employment_type;

    console.log(shift_rate, this.data?.schedule?.employee)

    if(shift_rate === 'Standard Rate'){
      shift = "Weekday Morning";
    }

    else if(shift_rate === 'Public Holiday Rate'){
      shift = "Public Holiday";
      employee_hour_rate = this.data?.schedule?.employee?.employee_pay_rate[0]?.public_holiday_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('afternoon')){
      shift = "Weekday Afternoon";
      employee_hour_rate = this.data?.schedule?.employee?.employee_pay_rate[0]?.afternoon_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('night')){
      shift = "Weekday Night";
      employee_hour_rate = this.data?.schedule?.employee?.employee_pay_rate[0]?.night_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('evening')){
      shift = "Weekday Evening";
      employee_hour_rate = this.data?.schedule?.employee?.employee_pay_rate[0]?.evening_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('saturday')){
      shift = "Saturday";
      employee_hour_rate = this.data?.schedule?.employee?.employee_pay_rate[0]?.saturday_rate || 0;
    }

    else if(shift_rate?.toLowerCase().match('sunday')){
      shift = "Sunday";
      employee_hour_rate = this.data?.schedule?.employee?.employee_pay_rate[0]?.sunday_rate || 0;
    }


    // For Contractor Employee
    if(employment_type === 'Contractor'){
      employee_hour_rate = this.data?.schedule?.employee?.hourly_rate;
      classification = "Contractual";  
      category = "Hourly Payrate";
    }
    
    // Employee Total
    this.employeePayrateData.push(
      {
        employee: this.data?.schedule?.employee?.name,
        employment_type: this.data?.schedule?.employee?.employment_type,
        classification: classification,  
        category: category,
        shift: shift,
        hourly_pay_rate: employee_hour_rate,
        total_hours: (this.clientTotalForm.controls['total_hours'].value * 1),
        main_total: Math.round((employee_hour_rate * (this.clientTotalForm.controls['total_hours'].value * 1)) * 100) / 100
      }
    );

    // Client Total
    if(this.clientTotalForm.controls['calculated_cost'].value){
      this.clientTotalData = [
        {
          ...this.clientTotalForm.value,
        }
      ];  
    }

    else {
      let client_calculated_cost = this.clientTotalForm.controls['editable_rate_value'].value;
      let main_client_total = this.clientTotalForm.controls['editable_rate_value'].value;
      let total_hours = this.clientTotalForm.controls['total_hours'].value;

      this.clientTotalData = [
        {
          ...this.clientTotalForm.value,
          calculated_cost: Math.round((client_calculated_cost * total_hours) * 100) / 100,
          client_total: Math.round((main_client_total * total_hours) * 100) / 100
        }
      ];  
    }

    

    console.log(this.data, this.clientTotalForm.value)
  }

}

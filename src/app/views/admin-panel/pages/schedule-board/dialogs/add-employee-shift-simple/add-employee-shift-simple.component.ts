import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StepModel } from '@main/shared/components/stepper/model';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { Store, select } from '@ngrx/store';
import { AddEmployeeStepperConstants } from '../add-employee-shift/add-employee-shift-stepper-constants';
import { addEmployeeSteps } from '../add-employee-shift//add-employee-shift-stepper-tabs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { 
  addDays, 
  addHours,
  subHours,
  subDays,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  differenceInHours,
  differenceInDays
} from 'date-fns';
import { EmployeeAvailabilityComponent } from '../employee-availability/employee-availability.component';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleBoardService } from '@app-shared/services/admin-panel/admin-schedule-board.service';
import { OrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-organization.action';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-employee-shift-simple',
  templateUrl: './add-employee-shift-simple.component.html',
  styleUrls: ['./add-employee-shift-simple.component.scss']
})
export class AddEmployeeShiftSimpleComponent implements OnInit {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public steps: any = addEmployeeSteps;
  public navigation: any = {};
  public selectedPricelistDetails: any;

  @ViewChild('stepper') scheduleStepper: MatStepper;

  public formStep: number = 1;
  public stepperSelector: number = 1;
  public serviceScheduleForm!: FormGroup;
  public hourForm!: FormGroup;
  public clientTotalForm! : FormGroup;
  public shiftLocationForm!: FormGroup;
  public taskForm!: FormGroup;
  public clientDetailForm!: FormGroup;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public isPlanExpired: boolean = false;
  
  public organization$:any
  organizationId:any
  organizationData:any
  isLoading:boolean = false
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeShiftSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private scheduleBoardService: ScheduleBoardService,
    private adminClientServiceSchedule: Store<AdminProfileState>,
    private datePipe:DatePipe
  ) { 
    console.log("DATA",data, data?.grouping)
    this.organizationId = this.loggedUser.organization_id
  }

  ngOnInit(): void {
    this.getOrganizationData()
    this.setUpForm()

  }

  setUpForm(){
    let client_id = this.data?.schedule ? this.data?.schedule?.client_id : 
    !this.data?.schedule && this.data?.client ? this.data?.client?.id
    : '';

    const getDate = new Date(),
          formattedDate = new Date(this.formatDate(getDate, 'en-US', { timeZone: 'GMT' }))
    

    let start_date = this.data?.schedule ? new Date(this.data?.schedule?.calendar_start_date * 1000)
      : this.data?.range?.start_date ? new Date(this.data?.range?.start_date)
      :  formattedDate;

    let end_date = this.data?.schedule ? new Date(this.data?.schedule?.calendar_start_date * 1000)
      : this.data?.range?.start_date ? new Date(this.data?.range?.start_date)
      : formattedDate;

    this.serviceScheduleForm = this.formBuilder.group({
      type: [this.data?.schedule ? this.data?.schedule?.type : 'Individual'],
      client_id: [client_id],
      client_funding_id: [this.data?.schedule ? this.data?.schedule?.client_funding_id : null],  
      is_recurring: [ this.data?.schedule ? this.data?.schedule?.is_recurring : false],
      recurring_interval: [this.data?.schedule?.recurring_interval || 'Daily'],
      recurring_end_date: [this.data?.schedule?.recurring_end_date || null],
      recurring_every: this.formBuilder.array([]),
      is_overnight:[false],
      group_id: [this.data?.schedule?.group_id || null],
      group_service_schedule_client: [this.data.schedule ? this.data?.schedule?.group_service_schedule_client : null],
      group_service_schedule_client_data: [this.data.schedule ? this.data?.schedule?.group_service_schedule_client_data : null],
      price_list_full_name: [''],
      price_list_id: [this.data?.schedule ? this.data?.schedule?.price_list_id : null],  
      ttp: [this.data?.schedule?.ttp || false],
      support_item: [this.data?.schedule?.ttp || ''],
      support_item_number: [this.data?.schedule?.support_item_number || ''],
      shift_rate: [this.data?.schedule?.shift_rate || ''],
      editable_rate_value: [this.data?.schedule?.client_total || 0],
      start_date: [start_date, [Validators.required]],
      end_date: [end_date, [Validators.required]],
      start_time: [this.data?.schedule ? this.data?.schedule?.start_time : null, [Validators.required]],
      end_time: [this.data?.schedule ? this.data?.schedule?.end_time : null, [Validators.required]],
      total_hours: [this.data?.schedule ? this.data?.schedule?.total_hours : 0],
      admin_hours: [this.data?.schedule ? this.data?.schedule?.admin_hours : 0],
      service_hours: [this.data?.schedule ? this.data?.schedule?.service_hours : 0], 
      activity: [this.data?.schedule ? this.data?.schedule?.activity : ''],
      additional_roster_comment: [this.data?.schedule ? this.data?.schedule?.additional_roster_comment : ''],
      a_h_calculator: [this.loggedUser ? (this.loggedUser?.a_h_calculator || 'Shift Start'): 'Shift Start'],
      status: [this.data?.schedule ? this.data?.schedule?.status : 'scheduled'],
      billable: [this.data?.schedule ? this.data?.schedule?.billable : true],  
      override_availability: [this.data?.schedule ? this.data?.schedule?.override_availability : false],  
      override_qualifications: [this.data?.schedule ? this.data?.schedule?.override_qualifications : false],  
      override_qualifications_comment: [this.data?.schedule ? this.data?.schedule?.override_qualifications_comment : ''],
      start_shift_address: [this.data?.schedule ? this.data?.schedule?.start_shift_address : ''],
      end_shift_address: [this.data?.schedule ? this.data?.schedule?.end_shift_address : ''],  
      charge_travel_to_client: [this.data?.schedule ? this.data?.schedule?.charge_travel_to_client : ''],
      travel_hours: [this.data?.schedule ? this.data?.schedule?.travel_hours : 0],
      travel_distance: [this.data?.schedule ? this.data?.schedule?.travel_distance : 0],
      travel_distance_rate: [this.organizationData ? this.organizationData[0]?.travel_claim_rate || 0 : 0],
      total_travel_km: [this.data?.schedule ? this.data?.schedule?.total_travel_km : 0],
      transport_distance: [this.data?.schedule ? this.data?.schedule?.transport_distance : 0],
      transport_distance_rate: [this.organizationData ? this.organizationData[0]?.transport_claim_rate || 0 : 0],
      total_transport: [this.data?.schedule ? this.data?.schedule?.total_transport : 0],
      travel_time_rate: [this.data?.schedule ? this.data?.schedule?.travel_time_rate : 0],
      travel_total: [this.data?.schedule ? this.data.schedule?.travel_total : 0],
      rate_type: [this.data ? this.data?.rate_type: ''],
      calculated_cost: [this.data?.schedule ? this.data?.schedule?.calculated_cost : 0],
      expenses_total: [this.data?.schedule ? this.data?.schedule?.expenses_total : 0],
      service_fee: [this.data?.schedule ? this.data?.schedule?.service_fee : 0],
      client_total: [this.data?.schedule ? this.data?.schedule?.client_total : 0],
      employee_task_id: [this.data?.schedule ? this.data?.schedule?.employee_task_id : null],
      total_task: [this.data?.schedule ? this.data?.schedule?.total_task : null],
      shift_note: [this.data?.schedule ? this.data?.schedule?.shift_note : ''],
      shift_note_attachment: [this.data ? this.data.shift_note : ''],
      support_worker_case_notes: [this.data?.schedule ? this.data?.schedule?.support_worker_case_notes : ''],
      support_coordinator_case_notes: [this.data?.schedule ? this.data?.schedule?.service_coordinator_case_notes : ''],
      service_facilitator_case_notes: [this.data?.schedule ? this.data?.schedule?.service_facilitator_case_notes : ''],
      shift_instruction:  [this.data?.schedule ? this.data?.schedule?.shift_instruction : ''],
    });
  }

  private formatDate(date: Date, locale: string, options: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  getOrganizationData(){
    this.organization$ = this.adminClientServiceSchedule.pipe(select(state => state.registerOrganization));
    
    this.adminClientServiceSchedule.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION,
      payload: this.organizationId
    }); 
    this.subscribeOrganizationData()
  }

  subscribeOrganizationData(){
    this.organization$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next:(value:any) => {
        this.isLoading = value.pending
        if(value.organization){
          this.organizationData = value.organization;
          console.log(this.organizationData)
        }
      }
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  convertToDateTime(dateVal: Date){
    return Math.ceil(new Date(dateVal).getTime() / 1000);
  }

  convertTo24Hour(amPmString) { 
    let d = new Date("1/1/2013 " + amPmString); 
    return d.getHours() + ':' + d.getMinutes(); 
  }

  checkRecurringAvailability(){
    if(this.serviceScheduleForm.valid){
      let data = {
        ...this.serviceScheduleForm.value
      }
      delete data['is_overnight']

      // range if recurring
      if(data?.is_recurring) {
        let interval = data?.recurring_interval;
        let start_date = new Date(new Date(data?.start_date).setHours(0,0,0,0));
        let end_date = new Date(data?.recurring_end_date);
        let day_count = differenceInDays(end_date, start_date);
        let date_array = [];
        let plus = interval === 'Daily' ? 0 : 1;
        let week = 0;
        let month = 0;

        // loop based on interval
        for(let i = 0; i <= day_count; i++){
          let new_start_date = addDays(start_date, i);
          let new_end_date = addDays(start_date, i);
          let day = new Date(new_start_date).getDay();

          if(interval === 'Daily'){
            let rate_value = this.getRateBasedOnTime(day, this.data?.publicHoliday, new_start_date, data);

            date_array.push({
              support_item_number: rate_value?.support_item_number,
              support_item_price: rate_value?.support_item_price,
              editable_rate_value: rate_value?.support_item_price,
              rate_type: rate_value?.rate_type,
              shift_rate: rate_value?.shift_rate,
              employee_id: this.data?.grouping === 'Group' ? this.employeeSelected : (this.employeeSelected?.id || ''),
              status: this.employeeSelected?.id || this.employeeSelected?.length > 0 ? 'scheduled' : 'unassigned', 
              start_date: convertTimestampUtc(new_start_date),  
              end_date: convertTimestampUtc(new_end_date),
              total_hours: this.serviceScheduleForm.controls['total_hours'].value, 
              calculated_cost: this.recalculateCost(rate_value?.support_item_price, rate_value?.rate_type)?.calculated_cost,
              client_total: this.recalculateCost(rate_value?.support_item_price, rate_value?.rate_type)?.client_total,
            });
          }

          else if(interval !== 'Daily'){
            if((i+1) % 7 === 0){
              week++;
            }

            let rate_value = this.getRateBasedOnTime(day, this.data?.publicHoliday, new_start_date, data);
            let weekdays = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
            let recurring_every = this.serviceScheduleForm.controls['recurring_every'].value;
            let days_selection = recurring_every.filter(_el => weekdays.indexOf(_el) > -1).map(_el => weekdays.indexOf(_el));
            let days_found = [...days_selection].findIndex(_el => _el == day)

            const createDateArray = () => {
              date_array.push({
                support_item_number: rate_value?.support_item_number,
                support_item_price: rate_value?.support_item_price,
                editable_rate_value: rate_value?.support_item_price || (this.serviceScheduleForm.controls['editable_rate_value'].value * 1),
                rate_type: rate_value?.rate_type,
                shift_rate: rate_value?.shift_rate, 
                employee_id: this.data?.grouping === 'Group' ? this.employeeSelected : (this.employeeSelected?.id || ''),
                status: this.employeeSelected?.id || this.employeeSelected?.length > 0 ? 'scheduled' : 'unassigned', 
                start_date: convertTimestampUtc(new_start_date),  
                end_date: convertTimestampUtc(new_end_date),
                total_hours: this.serviceScheduleForm.controls['total_hours'].value, 
                calculated_cost: this.recalculateCost(rate_value?.support_item_price, rate_value?.rate_type)?.calculated_cost,
                client_total: this.recalculateCost(rate_value?.support_item_price, rate_value?.rate_type)?.client_total,
              });
            }

            // check if repeat interval by weekly
            if(interval === 'Weekly' && days_found > -1){
              createDateArray();
            }

            // check if interval
            else if(interval === 'Fortnightly' && days_found > -1){
              if(week % 2 === 0){
                createDateArray();
              }
            }

            // check if interval is monthly
            else if(interval === 'Monthly' && days_found > -1){
              if(month === 0 || month % 4 === 0){
                createDateArray();
              }

              if((i+1) % 7 === 0){
                month++;
              }
            }
          }
        }

        // group by client 
        if(this.data?.grouping === 'Client' || this.data?.grouping === 'Employee'){
          let body = {
            ...this.serviceScheduleForm.value,  
            recurring_date: date_array,
            recurring_id: convertTimestampUtc(data.start_date) + Math.floor(Math.random() * 90000) + 10000
          }
          delete body['is_overnight']

          /* IF ACTIVITY IS EMPTY */
          if(!body['activity']) 
            body['activity'] = body['price_list_full_name']; 

          delete body['start_date'];
          delete body['end_date'];
          delete body['group_service_schedule_client'];
          delete body['group_service_schedule_client_data'];
          delete body['price_list_full_name'];

          body.start_time = this.convertTo24HourFull(body.start_time);
          body.end_time = this.convertTo24HourFull(body.end_time)
          body.recurring_end_date = convertTimestampUtc(body.recurring_end_date);

          // execute rechecking availability
          this.executeRecheckingAvailability(body);
        }

        // group by multiple clients
        else if(this.data?.grouping === 'Group') {
          let body = {
            ...this.serviceScheduleForm.value,  
            recurring_date: date_array,
            "group-service-schedule-employee": {
              add: this.employeeSelected.map(el => { return { employee_id: el } })
            },
            "group-service-schedule-client": data?.group_service_schedule_client
          }
          delete body['is_overnight']

          /* IF ACTIVITY IS EMPTY */
          if(!body['activity']) 
            body['activity'] = body['price_list_full_name']; 

          delete body['start_date'];
          delete body['end_date'];
          delete body['group_service_schedule_client'];
          delete body['group_service_schedule_client_data'];
          delete body['client_funding_id'];
          delete body['client_id'];
          delete body['price_list_full_name'];

          body.start_time = this.convertTo24HourFull(body.start_time);
          body.end_time = this.convertTo24HourFull(body.end_time)
          body.recurring_end_date = convertTimestampUtc(body.recurring_end_date);

          console.log(body)

          this.adminClientServiceSchedule.dispatch({
            type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP,
            payload: body
          });
        }

        this.close();
      }

      else this.save();
    }
  }

  executeRecheckingAvailability(body){
    this.snackBar.open('Rechecking for employee recurring dates conflicts. Please wait...', "", {
      //duration: 4000,
      panelClass:'success-snackbar'
    });

    if(this.employeeSelected){
      this.req = this.scheduleBoardService.recheckAssignedEmployee(body)
      .subscribe((result) => {
        console.log(result)
        this.snackBar.dismiss();

        if(result?.data?.schedule?.length > 0){
          this.employeeAvailabilityDialog(body, result?.data?.schedule);
        }

        else {
          this.saveRecurring(body);
        }
      });
    }

    else {
      this.saveRecurring(body);
    }
  }

  // group validity
  checkGroupValidity(): boolean{
    return true;
  }

  save(){
    if(this.serviceScheduleForm.valid){
      let data = { ...this.serviceScheduleForm.value }
      delete data['is_overnight']
       
      data['travel_claim_rate'] = this.organizationData ? this.organizationData[0].travel_claim_rate : data['travel_claim_rate']
      data['transport_claim_rate'] = this.organizationData ? this.organizationData[0].transport_claim_rate : data['transport_claim_rate']
      /* IF ACTIVITY IS EMPTY */
      if(!data['activity']) 
        data['activity'] = data['price_list_full_name']; 

      delete data['price_list_full_name'];

      // single data
      if(!data?.is_recurring){
        /* TO MAP RECURRING GROUPING */
        let date_array = [];
        let new_start_date = new Date(new Date(data?.start_date).setHours(0,0,0,0));
        let rate_value = this.getRateBasedOnTime(new Date(data?.start_date).getDay(), this.data?.publicHoliday, new_start_date, data);

        date_array.push({
          support_item_number: rate_value?.support_item_number,
          support_item_price: rate_value?.support_item_price,
          editable_rate_value: rate_value?.support_item_price || (this.serviceScheduleForm.controls['editable_rate_value'].value * 1),
          rate_type: rate_value?.rate_type,
          shift_rate: rate_value?.shift_rate, 
          employee_id: this.data?.grouping === 'Group' ? this.employeeSelected : (this.employeeSelected?.id || ''),
          status: this.employeeSelected?.id || this.employeeSelected?.length > 0 ? 'scheduled' : 'unassigned', 
          start_date: convertTimestampUtc(data?.start_date),  
          end_date: convertTimestampUtc(data?.end_date),
          total_hours: this.serviceScheduleForm.controls['total_hours'].value, 
          calculated_cost: this.recalculateCost(rate_value?.support_item_price, rate_value?.rate_type)?.calculated_cost,
          client_total: this.recalculateCost(rate_value?.support_item_price, rate_value?.rate_type)?.client_total,
        });

        data['recurring_date'] = date_array;  
        data['recurring_id'] = convertTimestampUtc(data.start_date) + Math.floor(Math.random() * 90000) + 10000;;
        data.start_date = convertTimestampUtc(data.start_date);
        data.end_date = convertTimestampUtc(data.end_date);
        data.recurring_end_date = data.end_date;
        data.start_time = this.convertTo24HourFull(data.start_time);
        data.end_time = this.convertTo24HourFull(data.end_time);
  
        if(this.data?.grouping !== 'Group'){
          delete data['group_id'];
          delete data['group_service_schedule_client'];
          delete data['group_service_schedule_client_data'];
          delete data['shift_rate'];
          delete data['client_total'];
          delete data['calculated_cost'];
          delete data['total_hours'];
          delete data['status'];
          delete data['rate_type'];
          delete data['editable_rate_value'];
          delete data['support_item_number'];
          delete data['recurring_every'];

          this.executeRecheckingAvailability(data);
        }

        else {
          let body = {
            ...data, 
            "group-service-schedule-employee": {
              add: this.employeeSelected?.map(el => { return { employee_id: el } })
            },
            "group-service-schedule-client": data?.group_service_schedule_client
          }
          delete data['price_list_full_name'];

          delete body['group_service_schedule_client'];
          delete body['group_service_schedule_client_data'];
          delete body['client_funding_id'];
          delete body['client_id'];
          delete body['recurring_every'];

          console.log(body)

          this.adminClientServiceSchedule.dispatch({
            type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP,
            payload: body
          });
        }

        //this.close();
      }
    }
  }

  recalculateCost(price, rate_type){
    let total_hour = this.serviceScheduleForm.controls['total_hours'].value;
    let subPrice = total_hour * price;  
    let totalPrice = subPrice;

    // Unit Condition
    if(rate_type == 'Hourly Rate') totalPrice = subPrice;
      else if(rate_type === 'Per Day') totalPrice = subPrice/24; 
        else if(rate_type === 'Per Week') totalPrice = subPrice/168;
          else if(rate_type === 'Per Year') totalPrice = subPrice/8760;  
            else totalPrice = price;

    if(totalPrice){
      let travel_total = this.serviceScheduleForm.controls['travel_total'].value * 1 || 0;
      let main_total = Math.round((travel_total + totalPrice) * 100) / 100;

      return {
        client_total: main_total,  
        calculated_cost: totalPrice
      }
    }
  }
  
  getPricelistSelected(data){
    this.selectedPricelistDetails = data;
  }

  public selectedFunding: any;
  public stateObj: any[] = [
    { title: "", state: "All State" },
    { title: "Western Australia", state: "WA" },
    { title: "Victoria", state: "VIC" },
    { title: "New South Wales", state: "NSW" },
    { title: "Australian Capital Territory", state: "ACT" },
    { title: "South Australia", state: "SA" },
    { title: "Queensland", state: "QLD" },
    { title: "Tasmania", state: "TAS" },
    { title: "Northern Territory", state: "NT" },
    { title: "Remote", state: "Remote" },
    { title: "Very Remote", state: "Very Remote" },
  ];

  getSelectedClientFunding(event){
    this.selectedFunding = event;
  }

  getRateBasedOnTime(day: number, publicHoliday: any, date: any, scheduleData: any): any {
    let holidayDate = publicHoliday[day - 1]?.filter(holiday => {
      const _holidayDate = new Date(holiday?.date).setHours(0,0,0,0);
      return _holidayDate >= date && _holidayDate <= date
    });

    let serviceLocation = this.stateObj.find(el => el?.state === this.selectedFunding?.service_location);
    let checkIfValidHoliday = holidayDate?.findIndex(el => el?.state?.join(',')?.toLowerCase()?.match(serviceLocation?.state?.toLowerCase()) || (el?.state?.join(',')?.toLowerCase()?.match('all state')));
    let rate_type = this.selectedPricelistDetails?.price_list?.service_type?.length > 0 ? this.selectedPricelistDetails?.price_list?.service_type[0]?.unit?.split(/(?=[A-Z])/g).join(' '): this.selectedPricelistDetails?.service_type_unit;
    
    //console.log(holidayDate?.find(el => el?.state?.join(',')?.toLowerCase()?.match(serviceLocation?.state?.toLowerCase()) || (el?.state?.join(',')?.toLowerCase()?.match('all state'))) )

    /* FOR PUBLIC HOLIDAY */
    if(holidayDate && holidayDate?.length > 0 && checkIfValidHoliday >= 0){
      let shift = (`Public Holiday Rate`)?.toLowerCase();
      let is_ttp = this.serviceScheduleForm.controls['ttp'].value ? `public_holiday_ttp` : `public_holiday_rate`;
      let support_item_number = this.selectedPricelistDetails?.price_list[`public_holiday_rate_code`] ? this.selectedPricelistDetails?.price_list[`public_holiday_rate_code`] : this.selectedPricelistDetails?.price_list[`standard_rate_code`];
      let support_item_price = this.selectedPricelistDetails?.price_list[`public_holiday_rate`] ? this.selectedPricelistDetails?.price_list[`public_holiday_rate`] : this.selectedPricelistDetails?.price_list[`standard_rate`];

      return {
        support_item_number: support_item_number,
        support_item_price: support_item_price,  
        shift_rate: "Public Holiday Rate",
        rate_type: rate_type
      }
    }

    /* FOR REGULAR DAY SHIFT */
    else {
      // Weekdays
      if(day > 0 && day < 6){
        let shift = (`${this.selectedPricelistDetails?.shift_rate?.replace(' Rate', '')}`)?.toLowerCase();
        let is_ttp = this.serviceScheduleForm.controls['ttp'].value ? `${shift}_rate_ttp` : `${shift}_rate`;
        let support_item_number = this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] ? this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] : this.selectedPricelistDetails?.price_list[`standard_rate_code`];
        let support_item_price = this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] ? this.selectedPricelistDetails?.price_list[`${is_ttp}`] : this.selectedPricelistDetails?.price_list[`standard_rate`];

        console.log("STANDARD", this.selectedPricelistDetails)

        return {
          support_item_number: support_item_number,
          support_item_price: support_item_price,  
          shift_rate: this.selectedPricelistDetails?.shift_rate,
          rate_type: rate_type
        }
      }

      // Sunday
      else if(day === 0){
        let shift = 'sunday';
        let is_ttp = this.serviceScheduleForm.controls['ttp'].value ? `${shift}_rate_ttp` : `${shift}_rate`;
        let support_item_number = this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] ? this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] : this.selectedPricelistDetails?.price_list[`standard_rate_code`];
        let support_item_price = this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] ? this.selectedPricelistDetails?.price_list[`${is_ttp}`] : this.selectedPricelistDetails?.price_list[`standard_rate`];

        return {
          support_item_number: support_item_number,
          support_item_price: support_item_price,  
          shift_rate: 'Sunday Rate',
          rate_type: rate_type
        }
      }

      // Saturday
      else if(day === 6){
        let shift = 'saturday';
        let is_ttp = this.serviceScheduleForm.controls['ttp'].value ? `${shift}_rate_ttp` : `${shift}_rate`;
        let support_item_number = this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] ? this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] : this.selectedPricelistDetails?.price_list[`standard_rate_code`];
        let support_item_price = this.selectedPricelistDetails?.price_list[`${is_ttp}_code`] ? this.selectedPricelistDetails?.price_list[`${is_ttp}`] : this.selectedPricelistDetails?.price_list[`standard_rate`];

        return {
          support_item_number: support_item_number,
          support_item_price: support_item_price,  
          shift_rate: 'Saturday Rate',
          rate_type: rate_type
        }
      }
    }
  }

  saveRecurring(body){
    delete body['shift_rate'];
    delete body['client_total'];
    delete body['calculated_cost'];
    delete body['total_hours'];
    delete body['status'];
    delete body['rate_type'];
    delete body['editable_rate_value'];
    delete body['support_item_number'];
    delete body['recurring_every'];

    this.adminClientServiceSchedule.dispatch({
      type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING,
      payload: body
    });

    this.close();
  }

  // Check for conflicting employee schedule
  employeeAvailabilityDialog(details, conflict){
    let openShiftSchedule = this.dialog.open(
      EmployeeAvailabilityComponent,
      { 
        minWidth: '48vw',
        maxWidth: '98vw',
        maxHeight: '97vh',
        //height: '97vh',
        data: {
          conflict: conflict,
          details: details,  
          employee: this.employeeSelected
        }
      }
    );

    openShiftSchedule
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(!result?.cancel){
        if(result?.type === 'assign-available'){
          let objectBody = { ...result?.body };  

          objectBody?.recurring_date.forEach((el, i) => {
            let conflictIndex = result?.conflict?.findIndex(_el => _el?.date == el?.start_date)
            
            if(conflictIndex !== -1){
              el["employee_id"] = '';
              el["status"] = "unassigned";
            }

            else {
              el["status"] = "scheduled";
            }
          });

          this.saveRecurring(objectBody);
        }

        else if(result?.type === 'assign-all'){
          let objectBody = { ...result?.body };  
          this.saveRecurring(objectBody);
        }
      }
    });
  }

  convertTo24HourFull(amPmString) { 
    let d = new Date("1/1/2013 " + amPmString); 

    let hour = (d.getHours() + '').length === 2 ? d.getHours() : '0' + d.getHours();
    let minute =  (d.getMinutes() + '').length === 2 ? d.getMinutes() : '0' + d.getMinutes();

    return `${hour}:${minute}`; 
  }

  private employeeSelected: any;

  getEmployeeSelected(event){
    this.employeeSelected = event;
  }

  getGroupClients(event){
    console.log(event)
    this.serviceScheduleForm.controls['group_service_schedule_client'].setValue(event);
  }

  setPlanExpired(data: any){
    this.isPlanExpired = data;
  }

}

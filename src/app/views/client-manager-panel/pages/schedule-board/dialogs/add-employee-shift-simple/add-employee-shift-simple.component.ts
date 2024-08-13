import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { Store } from '@ngrx/store';
import { AddEmployeeStepperConstants } from '../add-employee-shift/add-employee-shift-stepper-constants';
import { addEmployeeSteps } from '../add-employee-shift//add-employee-shift-stepper-tabs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { 
  addDays, 
  addHours,
  subHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  differenceInHours,
  differenceInDays
} from 'date-fns';

@Component({
  selector: 'app-add-employee-shift-simple',
  templateUrl: './add-employee-shift-simple.component.html',
  styleUrls: ['./add-employee-shift-simple.component.scss']
})
export class AddEmployeeShiftSimpleComponent implements OnInit {

  public steps: any = addEmployeeSteps;
  public navigation: any = {};
  @ViewChild('stepper') scheduleStepper: MatStepper;


  formStep: number = 1;
  stepperSelector: number = 1;

  serviceScheduleForm!: FormGroup;
  hourForm!: FormGroup;
  clientTotalForm! : FormGroup;
  shiftLocationForm!: FormGroup;
  taskForm!: FormGroup;
  clientDetailForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeShiftSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientServiceSchedule: Store<AdminProfileState>,
  ) { 
    console.log("DATA",data, data?.grouping)
  }

  ngOnInit(): void {
    let client_id = this.data?.schedule ? this.data?.schedule?.client_id : 
      !this.data?.schedule && this.data?.client ? this.data?.client?.id
      : '';

    let start_date = this.data?.schedule ? new Date(this.data?.schedule?.calendar_start_date * 1000)
      : this.data?.range?.start_date ? new Date(this.data?.range?.start_date)
      : new Date();

    let end_date = this.data?.schedule ? new Date(this.data?.schedule?.calendar_start_date * 1000)
      : this.data?.range?.start_date ? new Date(this.data?.range?.start_date)
      : new Date();

    this.serviceScheduleForm = this.formBuilder.group({
      type: [this.data?.schedule ? this.data?.schedule?.type : 'Individual', [Validators.required]],
      client_id: [client_id],
      client_funding_id: [this.data?.schedule ? this.data?.schedule?.client_funding_id : null],  
      //service_location: [this.data?.schedule?.service_location || 'ACT'],
      is_recurring: [ this.data?.schedule ? this.data?.schedule?.is_recurring : false],
      recurring_interval: [this.data?.schedule?.recurring_interval || 'Daily'],
      recurring_end_date: [this.data?.schedule?.recurring_end_date || null],

      group_id: [this.data?.schedule?.group_id || null],
      group_service_schedule_client: [this.data.schedule ? this.data?.schedule?.group_service_schedule_client : null],
      group_service_schedule_client_data: [this.data.schedule ? this.data?.schedule?.group_service_schedule_client_data : null],
      
      price_list_full_name: [''],
      price_list_id: [this.data?.schedule ? this.data?.schedule?.price_list_id : null],  

      ttp: [this.data?.schedule?.ttp || false],
      support_item: [this.data?.schedule?.ttp || ''],
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
      a_h_calculator: [this.data?.schedule ? this.data?.schedule?.a_h_calculator : 'Highest Rate', [Validators.required]],
      status: [this.data?.schedule ? this.data?.schedule?.status : 'Setup', [Validators.required]],
      billable: [this.data?.schedule ? this.data?.schedule?.billable : true],  
      override_availability: [this.data?.schedule ? this.data?.schedule?.override_availability : false],  
      override_qualifications: [this.data?.schedule ? this.data?.schedule?.override_qualifications : false],  
      override_qualifications_comment: [this.data?.schedule ? this.data?.schedule?.override_qualifications_comment : ''],
      
      start_shift_address: [this.data?.schedule ? this.data?.schedule?.start_shift_address : ''],
      end_shift_address: [this.data?.schedule ? this.data?.schedule?.end_shift_address : ''],  
      charge_travel_to_client: [this.data?.schedule ? this.data?.schedule?.charge_travel_to_client : ''],
      travel_hours: [this.data?.schedule ? this.data?.schedule?.travel_hours : 0],
      travel_distance: [this.data?.schedule ? this.data?.schedule?.travel_distance : 0],
      travel_distance_rate: [this.data?.schedule ? this.data?.schedule?.travel_distance_rate : 0.85],
      total_travel_km: [this.data?.schedule ? this.data?.schedule?.total_travel_km : 0],
      transport_distance: [this.data?.schedule ? this.data?.schedule?.transport_distance : 0],
      transport_distance_rate: [this.data?.schedule ? this.data?.schedule?.transport_distance_rate : 0.85],
      total_transport: [this.data?.schedule ? this.data?.schedule?.total_transport : 0],
      travel_time_rate: [this.data?.schedule ? this.data?.schedule?.travel_time_rate : 0],
      travel_total: [this.data?.schedule ? this.data.schedule?.travel_total : 0],

      rate_type: [this.data ? this.data?.rate_type: ''],
      calculated_cost: [this.data?.schedule ? this.data?.schedule?.calculated_cost : 0],
      expenses_total: [this.data?.schedule ? this.data?.schedule?.expenses_total : 0],
      service_fee: [this.data?.schedule ? this.data?.schedule?.service_fee : 0],
      client_total: [this.data?.schedule ? this.data?.schedule?.client_total : 0],

      // tasks
      employee_task_id: [this.data?.schedule ? this.data?.schedule?.employee_task_id : null],
      total_task: [this.data?.schedule ? this.data?.schedule?.total_task : null],
      shift_note: [this.data?.schedule ? this.data?.schedule?.shift_note : ''],
      shift_note_attachment: [this.data ? this.data.shift_note : ''],
      support_worker_case_notes: [this.data?.schedule ? this.data?.schedule?.support_worker_case_notes : ''],
      support_coordinator_case_notes: [this.data?.schedule ? this.data?.schedule?.service_coordinator_case_notes : ''],
      service_facilitator_case_notes: [this.data?.schedule ? this.data?.schedule?.service_facilitator_case_notes : ''],

    });

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

  save(){
    if(this.serviceScheduleForm.valid){
      let data = {
        ...this.serviceScheduleForm.value
      }

      /* IF ACTIVITY IS EMPTY */
      if(!data['activity']) 
        data['activity'] = data['price_list_full_name']; 

      delete data['price_list_full_name'];

      // single data
      if(!data?.is_recurring){
        //data.recurring_end_date = convertTimestampUtc(data?.end_date);
        data.start_date = convertTimestampUtc(data.start_date);
        data.end_date = convertTimestampUtc(data.end_date);
        data.start_time = this.convertTo24Hour(data.start_time);
        data.end_time = this.convertTo24Hour(data.end_time);

        if(this.data?.grouping !== 'Group'){
          this.adminClientServiceSchedule.dispatch({
            type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE,
            payload: data
          });
        }

        else {
          let body = {
            ...data, 
            "group-service-schedule-client": data?.group_service_schedule_client
          }

          delete body['group_service_schedule_client'];
          delete body['group_service_schedule_client_data'];
          delete body['client_funding_id'];
          delete body['client_id'];

          this.adminClientServiceSchedule.dispatch({
            type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP,
            payload: body
          });
        }

        this.close();
      }

      // range if recurring
      else if(data?.is_recurring) {
        let interval = data?.recurring_interval;
        let start_date = new Date(data?.start_date);
        let end_date = new Date(data?.recurring_end_date);
        let day_count = differenceInDays(end_date, start_date);
        let loop_every: number = 1;

        // interval condition
        if(interval === 'Daily') loop_every = 1;
        else if(interval === 'Weekly') loop_every = 7;  
        else if(interval === 'Fortnightly') loop_every = 14;
        else if(interval === 'Monthly') loop_every = 28;
        else if(interval === 'Yearly') loop_every = 360;

        let date_array = [];

        // loop based on interval
        for(let i = 0; i <= day_count + 1; i+=loop_every){
          let new_start_date = addDays(start_date, i);
          let new_end_date = addDays(start_date, i);//subDays(end_date, day_count + (i + 1));
          let checkSunday = new Date(new_start_date).getDay();

          if(interval === 'Daily' && (checkSunday !== 0 && checkSunday !== 6)){
            date_array.push({
              start_date: convertTimestampUtc(new_start_date),  
              end_date: convertTimestampUtc(new_end_date)
            });
          }

          else if(interval !== 'Daily'){
            date_array.push({
              start_date: convertTimestampUtc(new_start_date),  
              end_date: convertTimestampUtc(new_end_date)
            });
          }

          //this.close();
        }

        if(this.data?.grouping === 'Client'){
          let body = {
            ...this.serviceScheduleForm.value,  
            recurring_date: date_array
          }

          /* IF ACTIVITY IS EMPTY */
          if(!body['activity']) 
            body['activity'] = body['price_list_full_name']; 

          delete body['start_date'];
          delete body['end_date'];
          delete body['group_service_schedule_client'];
          delete body['group_service_schedule_client_data'];
          delete body['price_list_full_name'];

          body.start_time = this.convertTo24Hour(body.start_time);
          body.end_time = this.convertTo24Hour(body.end_time)
          body.recurring_end_date = convertTimestampUtc(body.recurring_end_date);

          console.log(body)

          this.adminClientServiceSchedule.dispatch({
            type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING,
            payload: body
          });
        }

        else {
          let body = {
            ...this.serviceScheduleForm.value,  
            recurring_date: date_array,
            "group-service-schedule-client": data?.group_service_schedule_client
          }

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

          body.start_time = this.convertTo24Hour(body.start_time);
          body.end_time = this.convertTo24Hour(body.end_time)
          body.recurring_end_date = convertTimestampUtc(body.recurring_end_date);

          this.adminClientServiceSchedule.dispatch({
            type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP,
            payload: body
          });
        }
      }
    }
    

  }

  getGroupClients(event){
    console.log(event)
    this.serviceScheduleForm.controls['group_service_schedule_client'].setValue(event);
  }

}

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { Store } from '@ngrx/store';
import { AddEmployeeStepperConstants } from './add-employee-shift-stepper-constants';
import { addEmployeeSteps } from './add-employee-shift-stepper-tabs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-add-employee-shift',
  templateUrl: './add-employee-shift.component.html',
  styleUrls: ['./add-employee-shift.component.scss']
})
export class AddEmployeeShiftComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AddEmployeeShiftComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientServiceSchedule: Store<AdminProfileState>,
  ) { 
    console.log("DATA",data)
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
      type: [this.data?.schedule.type, [Validators.required]],
      client_id: [client_id],
      client_funding_id: [this.data?.schedule ? this.data?.schedule?.client_funding_id : null],  
      //service_location: [this.data?.schedule?.service_location || 'ACT'],
      is_recurring: [this.data?.schedule?.is_recurring],
      recurring_interval: [this.data?.schedule?.recurring_interval || 'Daily'],
      recurring_end_date: [this.data?.schedule?.recurring_end_date || null],

      group_id: [this.data?.schedule ? this.data?.schedule?.group_id : null],
      group_service_schedule_client: [this.data ? this.data.group_service_schedule_client : null],
      group_service_schedule_client_data: [this.data ? this.data.group_service_schedule_client_data : null],
      price_list_full_name: [''],
      price_list_id: [this.data ? this.data?.schedule?.price_list_id : null],  

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
    });

    this.hourForm = this.formBuilder.group({
      activity: [this.data?.schedule ? this.data?.schedule?.activity : ''],
      additional_roster_comment: [this.data?.schedule ? this.data?.schedule?.additional_roster_comment : ''],
      a_h_calculator: [this.data?.schedule ? this.data?.schedule?.a_h_calculator : '', [Validators.required]],
      status: [this.data?.schedule ? this.data?.schedule?.status : 'Setup', [Validators.required]],
      billable: [this.data?.schedule ? this.data?.schedule?.billable : true],  
      override_availability: [this.data?.schedule ? this.data?.schedule?.override_availability : false],  
      override_qualifications: [this.data?.schedule ? this.data?.schedule?.override_qualifications : false],  
      override_qualifications_comment: [this.data?.schedule ? this.data?.schedule?.override_qualifications_comment : ''],
    });

    this.shiftLocationForm = this.formBuilder.group({
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
    });

    this.clientTotalForm = this.formBuilder.group({
      rate_type: [this.data ? this.data?.rate_type: ''],
      editable_rate_value: [this.data ? this.data?.editable_rate_value: 0],
      total_hours: [this.data ? this.data.total_hours : 0],
      calculated_cost: [this.data?.schedule ? this.data?.schedule?.calculated_cost : 0],
      expenses_total: [this.data?.schedule ? this.data?.schedule?.expenses_total : 0],
      service_fee: [this.data?.schedule ? this.data?.schedule?.service_fee : 0],
      travel_total: [this.data?.schedule ? this.data?.schedule?.travel_total : 0],
      client_total: [this.data?.schedule ? this.data?.schedule?.client_total : 0],
    });
   
    this.taskForm = this.formBuilder.group({
      employee_task_id: [this.data?.schedule ? this.data?.schedule?.employee_task_id : null],
      //create_task: [''],
      //completed_task: [''],
      total_task: [this.data?.schedule ? this.data?.schedule?.total_task : null],
      shift_note: [this.data?.schedule ? this.data?.schedule?.shift_note : ''],
      shift_attachment: [this.data ? this.data.shift_attachment : ''],
      support_worker_case_notes: [this.data?.schedule ? this.data?.schedule?.support_worker_case_notes : ''],
      support_coordinator_case_notes: [this.data?.schedule ? this.data?.schedule?.service_coordinator_case_notes : ''],
      service_facilitator_case_notes: [this.data?.schedule ? this.data?.schedule?.service_facilitator_case_notes : ''],

    });

    this.stepperNavigation();
  }


  stepperNavigation(){
    if(this.formStep === 1){
      this.getNavigation(AddEmployeeStepperConstants.serviceScheduleDetail)
    } else if (this.formStep === 2) {
      this.getNavigation(AddEmployeeStepperConstants.hours)
    } else if (this.formStep === 3) {
      this.getNavigation(AddEmployeeStepperConstants.shiftLocation)
    } else if (this.formStep === 4) {
      this.getNavigation(AddEmployeeStepperConstants.clientTotals) 
    } else if (this.formStep === 5) {
      this.getNavigation(AddEmployeeStepperConstants.task)
    }

    /* else if (this.formStep === 6) {
      this.getNavigation(AddEmployeeStepperConstants.clientDetails)
    }*/
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  public updateStepper(step: number): void {
    if(step){
        step = step * 1;
        this.formStep < step ? this.scheduleStepper.next() : this.scheduleStepper.previous();
        this.formStep = step;

        this.stepperNavigation(); 
    }
  }

  updateStepperClick(step: number): void{
    let form = this.formStep === 1 ? this.serviceScheduleForm : this.formStep === 2 ? this.hourForm : this.formStep === 3 ? this.shiftLocationForm :
    this.formStep === 4 ?  this.clientTotalForm : this.taskForm;

    this.steps[this.formStep - 1].isStepValid = form.valid; 
    
    this.formStep = step;
    this.stepperNavigation();

   
  }

  next(){
    this.updateStepper(this.navigation?.next);

    console.log(this.serviceScheduleForm.value)
  }

  back(){
    this.updateStepper(this.navigation?.previous);
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
    if(this.serviceScheduleForm.valid && this.hourForm.valid && !this.data?.schedule){
      let data = {
        ...this.serviceScheduleForm.value,
        ...this.hourForm.value,
        ...this.shiftLocationForm.value,
        ...this.clientTotalForm.value,
        ...this.taskForm.value
      }

      /* IF ACTIVITY IS EMPTY */
      if(!data['activity']) 
        data['activity'] = data['price_list_full_name']; 

      delete data['price_list_full_name'];

      //data.recurring_end_date = convertTimestampUtc(data?.end_date);
      data.start_date = convertTimestampUtc(data.start_date);
      data.end_date = convertTimestampUtc(data.end_date);
      data.start_time = this.convertTo24Hour(data.start_time);
      data.end_time = this.convertTo24Hour(data.end_time);


      if(data?.type !== 'Group'){
        delete data['group_service_schedule_client'];
        delete data['group_service_schedule_client_data'];

        this.adminClientServiceSchedule.dispatch({
          type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE,
          payload: data
        });
      }

      else if(data?.type === 'Group'){
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
    
    else if(this.serviceScheduleForm.valid && this.hourForm.valid && this.data?.schedule) {
      let data = {
        ...this.serviceScheduleForm.value,
        ...this.hourForm.value,
        ...this.shiftLocationForm.value,
        ...this.clientTotalForm.value,
        ...this.taskForm.value,
        id: parseInt(this.data?.schedule?.id)
      }

      /* IF ACTIVITY IS EMPTY */
      if(!data['activity']) 
        data['activity'] = data['price_list_full_name']; 

      delete data['price_list_full_name'];

      data.start_date = convertTimestampUtc(data.start_date);
      data.end_date = convertTimestampUtc(data.end_date);
      data.start_time = this.convertTo24Hour(data.start_time);
      data.end_time = this.convertTo24Hour(data.end_time);

      this.adminClientServiceSchedule.dispatch({
        type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE,
        payload: data
      });

      this.close();
    }
  }

  getGroupClients(event){
    console.log(event)
    this.serviceScheduleForm.controls['group_service_schedule_client'].setValue(event);
  }
}
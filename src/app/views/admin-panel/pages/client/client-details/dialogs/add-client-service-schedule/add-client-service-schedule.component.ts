import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { Store } from '@ngrx/store';
import { AddEmployeeStepperConstants } from './add-client-service-schedule-stepper-constants';
import { addEmployeeSteps } from './add-client-service-schedule-stepper-tabs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-add-client-service-schedule',
  templateUrl: './add-client-service-schedule.component.html',
  styleUrls: ['./add-client-service-schedule.component.scss']
})
export class AddClientServiceScheduleComponent implements OnInit {

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

  formCollection: any[] = ['serviceScheduleForm', 'hourForm', 'shiftLocationForm', 'shiftLocationForm', 'clientTotalForm', 'taskForm']

  constructor(
    public dialogRef: MatDialogRef<AddClientServiceScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientServiceSchedule: Store<AdminProfileState>,
  ) { 
    
  }

  ngOnInit(): void {
    this.serviceScheduleForm = this.formBuilder.group({
      type: [this.data ? this.data.type : ''],
      client_id: [this.data ? this.data.client_id : ''],
      client_funding_id: [/*this.data  ? this.data?.client_funding_id : ''*/],  
      //service_location: [this.data?.service_location || 'ACT'],
      is_recurring: [this.data?.is_recurring],
      recurring_interval: [this.data?.recurring_interval || 'Daily'],
      recurring_end_date: [this.data?.recurring_end_date || null],

      group_id: [this.data ? this.data?.group_id : null],
      group_service_schedule_client: [this.data ? this.data.group_service_schedule_client : null],
      group_service_schedule_client_data: [this.data ? this.data.group_service_schedule_client_data : null],
      price_list_id: [this.data ? this.data.price_list_id : null],  
      
      start_date: [this.data ? new Date(this.data.start_date * 1000) : ''],
      end_date: [this.data ?  new Date(this.data.end_date * 1000) : ''],
      start_time: [this.data ? this.data.start_time : null],
      end_time: [this.data ? this.data.end_time : null],
      total_hours: [this.data ? this.data.total_hours : 0],
      admin_hours: [this.data ? this.data.admin_hours : 0],
      service_hours: [this.data ? this.data.service_hours : 0],  
      ttp: [this.data ? this.data.ttp : false],
      support_item: [this.data ? this.data.support_item: ''],
      support_item_number: [this.data ? this.data?.support_item_number: ''],
      shift_rate: [this.data ? this.data.shift_rate: ''],
      editable_rate_value: [this.data ? this.data.editable_rate_value : 0],
    });

    this.hourForm = this.formBuilder.group({
      activity: [this.data ? this.data.activity : ''],
      additional_roster_comment: [this.data ? this.data.additional_roster_comment : ''],
      a_h_calculator: [this.data ? this.data.a_h_calculator : ''],
      status: [this.data ? this.data.status.toLowerCase() : 'Setup'],
      billable: [this.data ? this.data.billable : true],  
      override_availability: [this.data ? this.data.override_availability : true],  
      override_qualifications: [this.data ? this.data.override_qualifications : true],  
      override_qualifications_comment: [this.data ? this.data.override_qualifications_comment : ''],  
    });

    this.shiftLocationForm = this.formBuilder.group({
      start_shift_address: [this.data ? this.data.start_shift_address : ''],
      end_shift_address: [this.data ? this.data.end_shift_address : ''],  
      charge_travel_to_client: [this.data ? this.data.charge_travel_to_client : ''],
      travel_hours: [this.data ? this.data.travel_hours : 0],
      travel_distance: [this.data ? this.data.travel_distance : 0],
      travel_distance_rate: [this.data ? this.data.travel_distance_rate : 0.85],
      total_travel_km: [this.data ? this.data.total_travel_km : 0],
      transport_distance: [this.data ? this.data.transport_distance : 0],
      transport_distance_rate: [this.data ? this.data.transport_distance_rate : 0.85],
      total_transport: [this.data ? this.data.total_transport : 0],
      travel_time_rate: [this.data ? this.data.travel_time_rate : 0],
      travel_total: [this.data ? this.data.travel_total : 0],
    });

    this.clientTotalForm = this.formBuilder.group({
      rate_type: [this.data ? this.data?.rate_type: ''],
      editable_rate_value: [this.data ? this.data?.editable_rate_value: 0],
      total_hours: [this.data ? this.data.total_hours : 0],
      calculated_cost: [this.data ? this.data.calculated_cost : 0],
      expenses_total: [this.data ? this.data.expenses_total : 0],
      service_fee: [this.data ? this.data.service_fee : 0],
      travel_total: [this.data ? this.data.travel_total : 0],
      client_total: [this.data ? this.data.client_total : 0],
    });
   
    this.taskForm = this.formBuilder.group({
      employee_task_id: [this.data ? this.data.employee_task_id : null],
      //create_task: [''],
      //completed_task: [''],
      total_task: [this.data ? this.data.total_task : null],
      shift_note: [this.data ? this.data.shift_note : ''],

      support_worker_case_notes: [this.data ? this.data.support_worker_case_notes : ''],
      support_coordinator_case_notes: [this.data ? this.data.service_coordinator_case_notes : ''],
      service_facilitator_case_notes: [this.data ? this.data.service_facilitator_case_notes : ''],

      shift_note_attachment: [this.data ? this.data.shift_note : ''],
    });
  }

  ngAfterViewInit(){
    this.stepperNavigation();
  }

  stepperNavigation(){
    if(this.formStep === 1){
      this.getNavigation(AddEmployeeStepperConstants.serviceScheduleDetail)
    } 
    else if (this.formStep === 2) {
      this.getNavigation(AddEmployeeStepperConstants.hours)
    } 
    else if (this.formStep === 3) {
      this.getNavigation(AddEmployeeStepperConstants.shiftLocation)
    } 
    else if (this.formStep === 4) {
      this.getNavigation(AddEmployeeStepperConstants.clientTotals) 
    } 
    else if (this.formStep === 5) {
      this.getNavigation(AddEmployeeStepperConstants.task)
    }

    console.log(this.serviceScheduleForm.value)
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  public updateStepper(step: number): void {
    this.formStep < step ? this.scheduleStepper.next() : this.scheduleStepper.previous();
    this.formStep = step;

    if(this.formStep !== step){
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
    if(this.serviceScheduleForm.valid && !this.data){
      let data = {
        ...this.serviceScheduleForm.value,
        ...this.hourForm.value,
        ...this.shiftLocationForm.value,
        ...this.clientTotalForm.value,
        ...this.taskForm.value
      }

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
    
    else if(this.serviceScheduleForm.valid && this.data) {
      let data = {
        ...this.serviceScheduleForm.value,
        ...this.hourForm.value,
        ...this.shiftLocationForm.value,
        ...this.clientTotalForm.value,
        ...this.taskForm.value,
        id: parseInt(this.data.id)
      }

      if(isNaN(data?.client_funding_id) && isNaN(data?.price_list_id)){
        delete data ["client_funding_id"];
        delete data ["price_list_id"];
      }

      //data.recurring_end_date = convertTimestampUtc(data?.end_date);
      data.start_date = convertTimestampUtc(data.start_date);
      data.end_date = convertTimestampUtc(data.end_date);

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

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
import { convertTimestampUtc, convertTo12Hrs } from '@main/shared/utils/date-convert.util';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
import { DecimalPipe } from '@main/shared/pipes/decimal.pipe';
@Component({
  selector: 'app-add-employee-shift',
  templateUrl: './add-employee-shift.component.html',
  styleUrls: ['./add-employee-shift.component.scss']
})
export class AddEmployeeShiftComponent implements OnInit {
  public steps: any = addEmployeeSteps;
  public navigation: any = {};
  @ViewChild('stepper') scheduleStepper: MatStepper;
  public formStep: number = 1;
  public stepperSelector: number = 1;
  public serviceScheduleForm!: FormGroup;
  public hourForm!: FormGroup;
  public clientTotalForm! : FormGroup;
  public shiftLocationForm!: FormGroup;
  public taskForm!: FormGroup;
  public clientDetailForm!: FormGroup;
  public loading: boolean = true;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public convertTo12Hrs = convertTo12Hrs;
  public isdisabled: boolean = false;
  public useAdmin = AdminHelper
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeShiftComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientServiceSchedule: Store<AdminProfileState>,
    private decimalPipe:DecimalPipe
  ) { 
    console.log("DATA",data)
  }

  ngOnInit(): void {
    let client_id = this.data?.schedule ? this.data?.schedule?.client_id : 
      !this.data?.schedule && this.data?.client ? this.data?.client?.id
      : '';

    let start_date = this.data?.schedule ? 
      AdminHelper.dateGmt(this.data?.schedule?.calendar_start_date)
      : this.data?.range?.start_date ? new Date(this.data?.range?.start_date)
      : new Date();

    let end_date = this.data?.schedule ? 
      AdminHelper.dateGmt(this.data?.schedule?.end_date)
      : this.data?.range?.end_date ? new Date(this.data?.range?.end_date)
      : new Date();

    this.serviceScheduleForm = this.formBuilder.group({
      type: [this.data?.schedule.type, [Validators.required]],
      client_id: [client_id],
      client_funding_id: [/*this.data?.schedule ? this.data?.schedule?.client_funding_id : null*/],  
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
      support_item: [],
      support_item_number: [this.data?.schedule?.support_item_number || ''],
      
      shift_rate: [this.data?.schedule?.shift_rate || ''],
      editable_rate_value: [this.data?.schedule?.editable_rate_value || 0],

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
      // a_h_calculator: [this.loggedUser ? this.loggedUser?.a_h_calculator : 'Shift Start', [Validators.required]],
      a_h_calculator: [this.data?.schedule ? this.data.schedule?.a_h_calculator : this.loggedUser?.a_h_calculator || 'Shift Start', [Validators.required]],
      status: [this.data?.schedule ? this.data?.schedule?.status?.toLowerCase() : 'unassigned', [Validators.required]],
      billable: [this.data?.schedule ? this.data?.schedule?.billable : true],  
      override_availability: [this.data?.schedule ? this.data?.schedule?.override_availability : false],  
      override_qualifications: [this.data?.schedule ? this.data?.schedule?.override_qualifications : false],  
      override_qualifications_comment: [this.data?.schedule ? this.data?.schedule?.override_qualifications_comment : ''],
      
      // CANCELLATION POLICY
      cancellation_policy_id: [this.data?.schedule ? this.data?.schedule?.cancellation_policy_id : ''],
      cancellation_reason: [this.data?.schedule ? this.data?.schedule?.cancellation_reason : ''], 
      cancellation_comments: [this.data?.schedule ? this.data?.schedule?.cancellation_comments : ''],
      cancellation_percent: [this.data?.schedule ? this.data?.schedule?.cancellation_percent : ''],
      cancelled_by: [this.data?.schedule ? this.data?.schedule?.cancelled_by : ''],
      cancellation_received_type: [this.data?.schedule ? this.data?.schedule?.cancellation_received_type : false],
      charge_to_client: [this.data?.schedule ? this.data?.schedule?.charge_to_client : false],
      pay_employees: [this.data?.schedule ? this.data?.schedule?.pay_employees : false],
      inform_employees: [this.data?.schedule ? this.data?.schedule?.inform_employees : false], 
      is_this_a_once_off_cancellation: [this.data?.schedule ? this.data?.schedule?.is_this_a_once_off_cancellation : false],
      name_of_staff_allocated: [this.data?.schedule ? this.data?.schedule?.name_of_staff_allocated : ''],
      date_of_cancellation_received: [this.data?.schedule ? new Date(this.data?.schedule?.date_of_cancellation_received * 1000) : ''],
      time_of_cancellation_received: [this.data?.schedule ? new Date(this.data?.schedule?.time_of_cancellation_received * 1000) : ''], 
      shift_instruction:  [this.data?.schedule ? this.data?.schedule?.shift_instruction : ''],
    });

    this.shiftLocationForm = this.formBuilder.group({
      start_shift_address: [this.data?.schedule ? this.data?.schedule?.start_shift_address : ''],
      end_shift_address: [this.data?.schedule ? this.data?.schedule?.end_shift_address : ''],  
      charge_travel_to_client: [this.data?.schedule ? this.data?.schedule?.charge_travel_to_client : ''],
      travel_hours: [this.data?.schedule ? this.data?.schedule?.travel_hours : 0, Validators.pattern(/^\d+(\.\d+)?$/)],
      travel_distance: [this.data?.schedule ? this.data?.schedule?.travel_distance : 0, Validators.pattern(/^\d+(\.\d+)?$/)],
      travel_distance_rate: [this.data.schedule ?  this.data?.schedule?.organization?.travel_claim_rate || 0: 0, Validators.pattern(/^\d+(\.\d+)?$/)],
      total_travel_km: [this.data?.schedule ? this.data?.schedule?.total_travel_km : 0],
      transport_distance: [this.data?.schedule ? this.data?.schedule?.transport_distance : 0, Validators.pattern(/^\d+(\.\d+)?$/)],
      transport_distance_rate: [this.data.schedule ? this.data?.schedule?.organization?.transport_claim_rate || 0 : 0, Validators.pattern(/^\d+(\.\d+)?$/)],
      total_transport: [this.data?.schedule ? this.data?.schedule?.total_transport : 0],
      travel_time_rate: [this.data?.schedule ? this.data?.schedule?.organization?.org_convertion_rate || 1 : 1],
      travel_total: [this.data?.schedule ? this.data.schedule?.travel_total : 0],
      total_travel_time: [this.data?.schedule ? this.data.schedule?.total_travel_time : 0]
    });
    

    this.clientTotalForm = this.formBuilder.group({
      rate_type: [this.data?.schedule ? this.data?.schedule?.rate_type: ''],
      editable_rate_value: [this.data?.schedule ? this.data?.schedule?.editable_rate_value: 0],
      total_hours: [this.data?.schedule ? this.data?.schedule?.total_hours : 0],
      calculated_cost: [this.data?.schedule ? this.decimalPipe.transform(this.data?.schedule?.calculated_cost)  : 0],
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
      support_coordinator_case_notes: [this.data?.schedule ? this.data?.schedule?.support_coordinator_case_notes : ''],
      service_facilitator_case_notes: [this.data?.schedule ? this.data?.schedule?.service_facilitator_case_notes : ''],

    });

    if(this.data?.schedule.status =='completed'){
      this.isdisabled=true
    }
    this.stepperNavigation();
  }

  setFieldsDisabled(){
    Object.keys(this.serviceScheduleForm.controls).forEach(res=>{
      this.serviceScheduleForm.get(res).disable()
    })
    Object.keys(this.clientTotalForm.controls).forEach(res=>{
      this.clientTotalForm.get(res).disable()
    })
    Object.keys(this.shiftLocationForm.controls).forEach(res=>{
      this.shiftLocationForm.get(res).disable()
    })
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
      
      if(data?.date_of_cancellation_received != null){
        delete data['date_of_cancellation_received'];
        delete data['time_of_cancellation_received'];
      } 
        
      else 
        data.date_of_cancellation_received = convertTimestampUtc(new Date(data.date_of_cancellation_received));
      

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
        
        delete body['price_list_full_name'];
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
        ...this.convertFormValuesToNumber(this.shiftLocationForm.value),
        ...this.clientTotalForm.value,
        ...this.taskForm.value,
        id: parseInt(this.data?.schedule?.id)
      }      

      if(data?.date_of_cancellation_received != null){
        delete data['date_of_cancellation_received'];
        delete data['time_of_cancellation_received'];
      } 

      else 
        data.date_of_cancellation_received = convertTimestampUtc(new Date(data.date_of_cancellation_received));

      /* IF ACTIVITY IS EMPTY */
      if(!data['activity']) 
        data['activity'] = data['price_list_full_name']; 

      delete data['price_list_full_name'];

      //data.start_date = convertTimestampUtc(data.start_date);
      //data.end_date = convertTimestampUtc(data.end_date);
      //data.start_time = this.convertTo24Hour(data.start_time);
      //data.end_time = this.convertTo24Hour(data.end_time);

      delete data["start_date"];
      delete data["end_date"];
      // data["total_hours"] = this.serviceScheduleForm.get('total_hours').value
      // delete data["start_time"];
      // delete data["end_time "];

      if(isNaN(data?.client_funding_id) && isNaN(data?.price_list_id)){
        delete data ["client_funding_id"];
        delete data ["price_list_id"];
      }


      if(data?.type !== 'Group'){
        delete data['group_service_schedule_client'];
        delete data['group_service_schedule_client_data'];

        this.adminClientServiceSchedule.dispatch({
          type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE,
          payload: data
        });

        this.close();
      }

      else if(data?.type === 'Group'){
        let body = {
          ...data, 
          "group-service-schedule-client": data?.group_service_schedule_client,
          "group-service-schedule-employee": this.groupEmployees
        }

        if(!data?.group_service_schedule_client){
          delete body['group-service-schedule-client']
        }

        if(!this.groupEmployees){
          delete body['group-service-schedule-employee']
        }

        delete body['price_list_full_name'];
        delete body['group_service_schedule_client'];
        delete body['group_service_schedule_client_data'];
        delete body['client_funding_id'];
        delete body['client_id'];

        this.adminClientServiceSchedule.dispatch({
          type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP,
          payload: body
        });

        this.serviceScheduleForm.controls['group_service_schedule_client'].setValue(undefined);
        this.groupEmployees = undefined;
      } 
    }
  }

  convertFormValuesToNumber(formGroup:FormGroup){
    let exceptions =['start_shift_address','end_shift_address', 'charge_travel_to_client']
    let controlValues = {...formGroup}
    Object.keys(controlValues).map(res => {

      if(exceptions.includes(res)) return

      controlValues[res] = +controlValues[res]
    })
    
    return controlValues
  }

  public groupEmployees: any[];

  getGroupClients(event){
    console.log("GROUP CLIENT", event)
    this.serviceScheduleForm.controls['group_service_schedule_client'].setValue(event);

    setTimeout(() => {
      this.save()
    }, 500)
  }

  getGroupEmployee(event){
    console.log("GROUP EMPLOYEE", event);
    this.groupEmployees = event;

    setTimeout(() => {
      this.save()
    }, 500)
  }
}
import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
  Observable,
  forkJoin,
  combineLatest
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  select,
  Store
} from '@ngrx/store';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import {
  displayedColumns,
  TableHeader,
  ServiceSchedule,
  selectedColumns,
  serviceScheduleList
} from '../../utils/client-schedule-list-model-interface';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  addDays, 
  subDays,
  addHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  format,
  differenceInMinutes
} from 'date-fns';
import moment from 'moment';
import { 
  convertTimestampUtc, 
  convertTo12Hrs 
} from '@main/shared/utils/date-convert.util';
import { AddEmployeeShiftComponent } from '../../dialogs/add-employee-shift/add-employee-shift.component';
import { CancelScheduleComponent } from '../../dialogs/cancel-schedule/cancel-schedule.component';
import { MarkAsCompleteScheduleComponent } from '../../dialogs/mark-as-complete-schedule/mark-as-complete-schedule.component';
import { RecalculateComponent } from '../../dialogs/recalculate/recalculate.component';
import { SwitchWorkerComponent } from '../../dialogs/switch-worker/switch-worker.component';
import { UndoCompleteComponent } from '../../dialogs/undo-complete/undo-complete.component';
import { RescheduleComponent } from '../../dialogs/reschedule/reschedule.component';
import { ChangeDayComponent } from '../../dialogs/change-day/change-day.component';
import { BookResourceComponent } from '../../dialogs/book-resource/book-resource.component';
import { ScheduleBoardService } from '@app-shared/services/admin-panel/admin-schedule-board.service';
import { EmployeeAvailabilityManyComponent } from '../../dialogs/employee-availability-many/employee-availability-many.component';
import { UnassignWorkerScheduleComponent } from '../../dialogs/unassign-worker-schedule/unassign-worker-schedule.component';
declare var bootstrap: any;

@Component({
  selector: 'app-schedule-action',
  animations: [mainAnimations],
  templateUrl: './schedule-action.component.html',
  styleUrls: ['./schedule-action.component.scss']
})
export class ScheduleActionComponent implements OnInit {
  @Input() data;
  @Input() publicHoliday: any[] = []
  @Input() groupBy:string = ''
  private serviceSchedule$: any;
  private req: Subscription;
  private checkingReq: Subscription;
  private unsubscribe$ = new Subject<void>();

  public serviceSchedule: any;
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public serviceScheduleList: ServiceSchedule[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id,
      name:el.name,
      type: el.type,
      employee_name: el.employee_name,
      start_day: el.start_day,
      status: el.status,
      weekday: el.weekday,
      time_from: el.time_from,
      time_to: el.time_to,
      total_hours: el.total_hours,
      group: el.group,
    }
  }
  public days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  public updateSelectedRows: any;  
  public convertTo12Hrs: any = convertTo12Hrs;

  controlWidth: string = '55px';

  public controlList: any[] = [
    { title: 'Cancel Shift', icon: '/assets/images/icons/schedule-cancel.png', action_event: 'cancel', class: 'margin-text cancel', isHidden:false },
    //{ title: 'Recalculate', icon: '/assets/images/icons/schedule-recalculate.png', action_event: 'recalculate', class:'margin-text', isHidden:false },
    { title: 'Reschedule', icon: '/assets/images/icons/schedule-reschedule.png', action_event: 'reschedule', class:'margin-text reschedule', isHidden:false },
    { title: 'Mark Complete', icon: '/assets/images/icons/schedule-complete.png', action_event: 'mark-complete', class: 'mark-complete', isHidden: false },
    { title: 'Undo Complete', icon: '/assets/images/icons/schedule-undo-complete.png', action_event: 'undo-complete', isHidden:false },
    //{ title: 'Book Resource', icon: '/assets/images/icons/schedule-book-resource.png', action_event: 'book-resource', isHidden:false },
    { title: 'Switch Worker', icon: '/assets/images/icons/schedule-switch-worker.png', action_event: 'switch-worker', isHidden:false },
    { title: 'Unassign Worker', icon: '/assets/images/icons/schedule-unassign-employee.png', action_event: 'unassign-worker', isHidden:false },
    { title: 'Change Day', icon: '/assets/images/icons/schedule-add-days.png', action_event: 'change-day', class:'change-day', isHidden:false },
    { title: 'Delete', icon: '/assets/images/icons/schedule-delete.png', action_event: 'delete', class:'margin-text', isHidden:false },
  ];

  public requestType:string = ""

  constructor(
    private adminServiceSchedule: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private scheduleBoardService: ScheduleBoardService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 100);

    console.log(this.data)
     

    // bootstrap tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })  


    // this.data.forEach(res => {
    //   const isApproved = res.approved_start_time == null && res.approved_end_time == null
    //   const isClaimed = res?.claimed

    //   // this.controlList.find(item => item.action_event === 'mark-complete').isHidden = isApproved;
    //   this.controlList.find(item => item.action_event === 'undo-complete').isHidden = !isClaimed;
    // })

  }

  getTotalHoursByTime(start_time, end_time){
    let start = start_time.replace(/\:/gi, '.').substr(0,5);
    let end = end_time.replace(/\:/gi, '.').substr(0,5);

    return parseInt(end) - parseInt(start);
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
    if(this.checkingReq) this.checkingReq.unsubscribe();
  }

  editDataDialog(event){
    if(event){
      this.openAddServiceScheduleModal(event?.data);
    }
  }

  /* ADD NEW SERVICE SCHEDULE */
  openAddServiceScheduleModal(data?: any){
    console.log("LIST", data)

    let openShiftSchedule = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '55.5vw',
        maxWidth: '872px',
        maxHeight: '97vh',
        data: {
          schedule: data,  
          grouping: "Client",
          client: undefined,// data?.client_id,
          range: {
            start_date: undefined,// data?.start_date,  
            end_date: undefined,// data?.end_date
          },
          index: undefined
        }
      }
    );

    openShiftSchedule
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  /* VIEW SERVICE SCHEDULE */
  viewServiceSchedule(event){
    let startDate = moment(new Date(event.data.start_date * 1000)).add(7, 'days');
    startDate.startOf('week').isoWeekday('Monday').toString();

    let endDate = moment(new Date(event.data.start_date * 1000)).add(7, 'days');
    endDate.startOf('week').isoWeekday('Sunday').toString();

    this.router.navigate([`/admin/schedule/details/client/${event?.data?.client_id}`], 
      { 
        queryParams: { 
          'range_start': convertTimestampUtc(new Date(`${startDate}`)),
          'range_end': convertTimestampUtc(new Date(`${endDate}`))
        }
      }
    )
  }

  // delete event emitter
  deleteDataDialog  (event) {
    console.log(event)
    if (event) {
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        {
          minWidth: '480px',
          data: event,
        }
      );

      deleteDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.arrayData || !result.cancel) {
            let body: number[] = [...result?.arrayData]
            .filter(el => el?.status !== 'completed')
            //.map(el => el.id);  

            this.adminServiceSchedule.dispatch({
              type: ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE,
              payload: body
            });

            this.snackBar.open("Deletion of schedule is currently in progress", "", {
              duration: 5000,
              panelClass:'success-snackbar'
            });
          }
        });
    }
  }

  updateScheduleStatus(body){
    console.log("TRIGGER SAVE")
    this.adminServiceSchedule.dispatch({
      type: ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE,
      payload: body
    });

    this.snackBar.open("Update of schedule is currently in progress", "", {
      duration: 5000,
      panelClass:'success-snackbar'
    });
  }

  rescheduleScheduleEmployee(body){
    console.log("TRIGGER SAVE")
    this.adminServiceSchedule.dispatch({
      type: ClientServiceScheduleActionTypes.RESCHEDULE_SCHEDULE_EMPLOYEE,
      payload: body
    });

    this.snackBar.open("Update of schedule is currently in progress", "", {
      duration: 5000,
      panelClass:'success-snackbar'
    });
  }

  // cancel schedule
  cancelSchedule(event){
    if (event) {
      this.requestType = 'cancel-schedule'
      let scheduleDialog = this.dialog.open(
        CancelScheduleComponent,
        {
          minWidth: '35vw',
          maxWidth: '65vw',
          maxHeight: '96vh',
          data: event,
        }
      );

      scheduleDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.arrayData || !result.cancel) {
            let body: any[] = [...result?.arrayData]
            .filter(el => el?.status !== 'completed')
            .map(el => {
              //console.log(el)
              /*
                TIMESHEET APPROVAL REQ BODY
              
                "id": el?.employee_timesheet_id,  
                "client_service_schedule_id": el?.client_service_schedule_id,
                "approved": result?.approved_decline === 'approve' ? true : false,
                "update_shift_time": el?.update_shift_time === 'No' ? false : true,
                "update_transport_km": el?.update_transport_km === 'No' ? false : true,
                "update_travel_km": el?.update_travel_km === 'No' ? false : true,
                "update_travel_time": el?.update_travel_time === 'No' ? false : true,
                "used_company_car": el?.used_company_car === 'No' ? false : true,

                "approved_start_time": approved_start_time,
                "approved_end_time": approved_end_time,
                "approved_total_hrs": approved_total_hrs,
                "approved_transport_km": approved_transport_km || 0,
                "approved_travel_km": approved_travel_km || 0,
                "approved_travel_time": approved_travel_time || 0,
                
                "approved_total_hours": approved_total_hrs || 0,  
                "approved_total_cost": approved_total_cost || 0,
                "approved_start_date": approved_start_date,  
                "approved_end_date": approved_end_date,  
                "approved_client_total_cost": Math.round(client_main_total * 100) / 100,
                "approved_shift_rate": approved_shift_rate,
                "approved_support_item_price": client_hour_rate,  
                "approved_support_item_number": approved_support_item_number
              */


              result.cancellation_data['date_of_cancellation_received'] = convertTimestampUtc(result?.cancellation_data?.date_of_cancellation_received)
              result.cancellation_data['time_of_cancellation_received'] = typeof result?.cancellation_data?.time_of_cancellation_received == 'string'
                  ? result?.cancellation_data?.time_of_cancellation_received
                  : format(
                      new Date(
                        result?.cancellation_data?.time_of_cancellation_received
                      ),
                      'HH:mm:ss'
                    );

              let chargePercent = result?.cancellation_data?.cancellation_percent / 100;
              let main_total = Math.round((el?.client_total * chargePercent) * 100) / 100;
              let rate_per_hour = Math.round((el?.editable_rate_value * chargePercent) * 100) / 100;

              return {
                id: el.id,  
                status: 'cancelled',
                ...result?.cancellation_data,
                employee_id:null,
                // timesheet approval request body
                client_service_schedule_id: el?.id,  
                employee_service_schedule_id: el?.employee_service_schedule.length > 1 ? el?.employee_service_schedule[0].id : el?.employee_service_schedule.id,
                approved: true,
                approved_start_time: el?.start_time,
                approved_end_time: el?.end_time,
                approved_total_hrs: el?.total_hours,
                approved_transport_km: el?.total_transport,
                approved_travel_km: el?.total_travel_km,
                approved_travel_time: el?.travel_hours,

                approved_total_hours: el?.total_hours,
                approved_total_cost: main_total,
                approved_start_date: el?.start_date,
                approved_end_date: el?.end_date,
                approved_client_total_cost: main_total,
                approved_shift_rate: el?.shift_rate,
                approved_support_item_price: rate_per_hour,
                approved_support_item_number: el?.support_item_number,
                group_by: this.groupBy !== '' ? this.groupBy : null
              }
            });  

            body.forEach(data => {
              if(data.charge_to_client){
                delete data['employee_id']
                delete data['employee_service_schedule_id']
              }
            })
            console.log(body, result?.cancellation_data)
            this.updateScheduleStatus(body);            
          }
        });
    }
  }

  markCompleteSchedule(event){
    if (event) {
      this.requestType = 'mark-complete'

      let scheduleDialog = this.dialog.open(
        MarkAsCompleteScheduleComponent,
        {
          width: '480px',
          data: event,
        }
      );

      scheduleDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.arrayData || !result.cancel) {
            let body: any[] = [...result?.arrayData]
            .filter(el => el?.status !== 'completed')
            .map(el => {
              return {
                id: el.id,  
                status: 'completed',
                group_by: this.groupBy !== '' ? this.groupBy : null
              }
            });  

            this.updateScheduleStatus(body); 
          }
        });
    }
  }

  // reschedule
  rescheduleSchedule(event){
    this.requestType = 'reschedule'

    let scheduleDialog = this.dialog.open(
      RescheduleComponent,
      {
        width: '480px',
        data: event,
      }
    );

    scheduleDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result?.arrayData || !result.cancel) {
          /* GENERATE REQUEST BODY FOR UPDATE */
          let body: any = [...result?.arrayData]
          // do not allow modification for complete schedule
          .filter(el => el?.status !== 'completed')
          .map(el => {
            if(result?.data?.time_or_date !== 'Date Only'){
              let new_date = result?.data?.time_or_date === 'Both Date and Time' ? result?.data?.start_date : null;
              let new_rate = this.getRateBasedOnTime(result?.data?.start_time, result?.data?.end_time, el, new_date)
              
              let obj = {
                id: el?.id,  
                start_date: convertTimestampUtc(new Date(result?.data?.start_date)),
                end_date: result?.data?.start_time > result?.data?.end_time 
                        ? this.endTimeOvernight(result?.data?.start_time, result?.data?.end_time, convertTimestampUtc(new Date(result?.data?.start_date) )) 
                        : convertTimestampUtc(addHours(new Date(result?.data?.start_date), new_rate?.total_hours || el?.total_hours)),
                start_time: result?.data?.start_time,
                end_time: result?.data?.end_time,
                shift_rate: new_rate?.shift_rate,
                total_hours: new_rate?.total_hours,
                support_item_number: new_rate?.support_item_number, 
                editable_rate_value: new_rate?.editable_rate_value
              };

              if(result?.data?.time_or_date === 'Time Only'){
                delete obj['start_date'];
                delete obj['end_date'];
                
                console.log("TIME ONLY", new_rate)

                return obj;
              }

              else if(result?.data?.time_or_date === 'Both Date and Time'){
                return obj;
              }
            }

            else if(result?.data?.time_or_date === 'Date Only'){
              let new_date = result?.data?.start_date;
              let new_rate = this.getRateBasedOnTime(el?.start_time.substring(0,5), el?.end_time.substring(0,5), el, new_date)
           
              return {
                id: el?.id,
                start_date: convertTimestampUtc(new Date(new_date)),
                end_date: convertTimestampUtc(addHours(new Date(new_date), el?.total_hours)),
                shift_rate: new_rate?.shift_rate,
                support_item_number: new_rate?.support_item_number, 
                editable_rate_value: new_rate?.editable_rate_value
              }
            }
          });

          // request body for checking data
          let checkingData = {
            reschedule_type: result?.data?.time_or_date,
            start_time: result?.data?.start_time,
            end_time: result?.data?.end_time,
            start_date: convertTimestampUtc(new Date(result?.data?.start_date)),
            css: [...result?.arrayData].filter(el => el?.status !== 'completed').map(el => el?.id).join('_')
          }

          this.snackBar.open('Rechecking for employee dates conflicts. Please wait...', "", {
            //duration: 4000,
            panelClass:'success-snackbar'
          });

          this.checkingReq = this.scheduleBoardService.recheckEmployeeReschedule(checkingData)
          .subscribe((result) => {
            console.log("CHECKING", result)
            this.snackBar.dismiss();

            // show conflict modal
            if(result?.length > 0){
              this.employeeAvailabilityDialog(result, body)
            }

            // execute update if there's no conflict
            else {
              if((this.groupBy === 'Employee' || this.groupBy === 'Client') && this.requestType ==='reschedule') {
                this.rescheduleScheduleEmployee(body)
                return
              }
              
              this.updateScheduleStatus(body); 
            }
          }, err => {
            console.log(err)
            this.snackBar.open('You cannot reschedule the shift until you assign an employee to it. Assign an Employee and try again.', "", {
              //duration: 4000,
              panelClass:'danger-snackbar'
            });
          });
        }
      });
  }

  private endTimeOvernight (start_time, end_time, end_date) {
    let newEndDate = end_date
    newEndDate = `${this.add24Hours(end_date * 1000)} ${end_time}`
    return convertTimestampUtc(new Date(newEndDate))
  }

  checkRate = (rate_name, rate, pricelist, total_hours, editable_rate_value) => {
    return {
      total_hours: total_hours,
      shift_rate: `${rate_name}`,
      editable_rate_value: pricelist[`${rate}_code`] ? pricelist[`${rate}`] 
      : pricelist['standard_rate'] > 0 ? pricelist['standard_rate'] 
      : editable_rate_value,
      support_item_price: pricelist[`${rate}_code`] ? pricelist[`${rate}`] 
      : pricelist['standard_rate'] > 0 ? pricelist['standard_rate'] 
      : editable_rate_value,
      support_item_number:  pricelist[`${rate}_code`] ? pricelist[`${rate}_code`] : pricelist['standard_rate_code']
    }
  }

  // get price rate based on time 
  getRateBasedOnTime(start_time_val: any, end_time_val: any, data: any, new_date?: any){
    let start_time = start_time_val?.replace(':', '') * 1;
    let end_time = end_time_val?.replace(':', '') * 1;

    // let startTime = start_time_val;
    // let startDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${startTime}`;
    // let endTime = end_time_val;
    // let endDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${endTime}`;
    // let total_hours_sub = differenceInMinutes(new Date(endDate), new Date(startDate)) 
    // let total_hours = Math.round((total_hours_sub/60)*100)/100;
    let startTime = start_time_val;
    let startDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${startTime}`;
    let endTime = end_time_val;
    let endDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${endTime}`;
    if(startTime > endTime){
      endDate = `${this.add24Hours(endDate)} ${endTime}`
    }
    // let total_hours_sub = differenceInMinutes(new Date(endDate), new Date(startDate))
    let total_hours_sub = this.calculateTotalHours(startDate, endDate)
    // let total_hours = Math.round((total_hours_sub/60)*100)/100;
    let total_hours = total_hours_sub;

    //let hour = (end_time - start_time) / 100;
    //let total_hours = hour > 0 ? hour : (hour + 24);
    let day = new Date(data?.start_date * 1000).getDay();
    let pricelist = data?.price_list[0];
    let start_date_day = new Date(new_date || data?.start_date).getDay();
    let public_holiday_rate = this.publicHoliday[start_date_day - 1];
    
    let serviceLocation = data?.client_funding_service_location;
    let checkIfValidHoliday = public_holiday_rate?.findIndex(el => el?.state?.join(',')?.toLowerCase()?.match(serviceLocation?.toLowerCase()) || (el?.state?.join(',')?.toLowerCase()?.match('all state')));

    if(public_holiday_rate?.length > 0 && checkIfValidHoliday >= 0){
      console.log("HOLIDAY", pricelist, data, serviceLocation, public_holiday_rate)
      return {
        total_hours: total_hours,
        shift_rate: `Public Holiday Rate`,
        support_item_price: pricelist[`public_holiday_rate`] ? pricelist[`public_holiday_rate`] : pricelist['standard_rate'],
        editable_rate_value: pricelist[`public_holiday_rate`] ? pricelist[`public_holiday_rate`] : pricelist['standard_rate'],
        support_item_number:  pricelist[`public_holiday_rate_code`] ? pricelist[`public_holiday_rate_code`] : pricelist['standard_rate_code']
      }
    }

    else if(start_date_day > 0 && start_date_day < 6){
      console.log("RECALCULATE AH")
      return this.ahRecalculator(data, pricelist, start_time, end_time, data?.editable_rate_value)
    }

    else if(start_date_day === 0){
      return this.checkRate("Sunday Rate", 'sunday_rate', pricelist, total_hours, data?.editable_rate_value);
    }

    else if(start_date_day === 6){
      return this.checkRate("Saturday Rate", 'saturday_rate',  pricelist, total_hours, data?.editable_rate_value);
    }
  }

  ahRecalculator(data: any, pricelist: any, start_time: number, end_time: number, editable_rate_value){
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
    // let total_hours_sub = differenceInMinutes(new Date(endDate), new Date(startDate))
    let total_hours_sub = this.calculateTotalHours(startDate, endDate)
    // let total_hours = Math.round((total_hours_sub/60)*100)/100;
    let total_hours = total_hours_sub;

    /* SHIFT START */ 
    if(data['a_h_calculator'] === 'Shift Start'){
      console.log("CONDITION PASS", start_time, end_time, total_hours)
      if(start_time >= 600 && start_time <= 1559 && (end_time <= 2000 || total_hours >= 6)){
        console.log("MORNING")
        return this.checkRate('Standard Rate', 'standard_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 1600 && start_time < 2000 && end_time <= 2000){
        console.log("Afternoon")
        return this.checkRate('Afternoon Rate', 'afternoon_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 1900 && end_time >= 1900 && end_time <= 2100){
        console.log("EVENING")
        return this.checkRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time <= 2359){
        console.log("EVENING")
        return this.checkRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      // else if((start_time >= 2200 || start_time < 600) && end_time <= 800){
      //   console.log("Night")
      //   return this.checkRate('Night Rate', 'night_rate', pricelist, total_hours, data?.editable_rate_value);
      // }

      else if((start_time > 600 && end_time < 2359) && startTime > endTime){
        console.log("Night")
        return this.checkRate('Night Rate', 'night_rate', pricelist, total_hours, data?.editable_rate_value);
      }
    }

    /* SHIFT END */
    else if(data['a_h_calculator'] === 'Shift End' || data['a_h_calculator'] === 'Highest Rate'){
      if(start_time >= 600 && start_time <= 1559 && end_time < 1800){
        //console.log("MORNING")
        return this.checkRate('Standard Rate', 'standard_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 600 && start_time <= 1559 && end_time === 1800){
        //console.log("Afternoon")
        return this.checkRate('Afternoon Rate', 'afternoon_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 1600 && start_time <= 2000 && end_time < 2000){
        //console.log("Afternoon")
        return this.checkRate('Afternoon Rate', 'afternoon_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 1600 && start_time <= 2000 && end_time === 2000){
        //console.log("Evening")
        return this.checkRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 1600 && start_time <= 1900 && end_time <= 2000){
        //console.log("Evening")
        return this.checkRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time <= 2359){
        //console.log("Night")
        return this.checkRate('Night Rate', 'night_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if((start_time >= 2200 || start_time < 600) && end_time <= 800){
        //console.log("Night")
        return this.checkRate('Night Rate', 'night_rate', pricelist, total_hours, data?.editable_rate_value);
      }
    }
  }

  calculateTotalHours(startTime, endTime): number {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const totalHours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
    return totalHours;
  }

  private add24Hours(date:any){

    let formattingEndDate = new Date(date);
    let newEndTime = new Date(formattingEndDate.getTime() + 24 * 60 * 60 * 1000)
    let endDate = new Date(newEndTime).toLocaleDateString();

    return endDate
  }

  // recalculate 
  recalculateSchedule(event){
    if (event) {
      let scheduleDialog = this.dialog.open(
        RecalculateComponent,
        {
          width: '480px',
          data: event,
        }
      );

      scheduleDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          console.log(result)

          if (result?.arrayData || !result.cancel) {
            
          }
        });
    }
  }

  // undo complete
  undoCompleteSchedule(event){ 
    if (event) {
      let scheduleDialog = this.dialog.open(
        UndoCompleteComponent,
        {
          width: '480px',
          data: event,
        }
      );

      scheduleDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.arrayData || !result.cancel) {
            let body: any[] = [...result?.arrayData]
            .filter(el => el?.status == 'completed')
            .map(el => {
              return {
                id: el.id,  
                status: 'scheduled',
                group_by: this.groupBy !== '' ? this.groupBy : null
              }
            });  

            console.log(body)
            this.updateScheduleStatus(body); 
          }
        });
    }
  }

  // switch worker schedule
  switchWorkerSchedule(event){ 
    console.log("SWITCH WORKER")

    if (event) {
      let scheduleDialog = this.dialog.open(
        SwitchWorkerComponent,
        {
          width: '480px',
          data: event,
        }
      );

      scheduleDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          console.log("SWITCH WORKER",result)

          if (result?.arrayData || !result.cancel) {
            let body: any[] = [...result?.arrayData]
            .filter(el => el?.status !== 'completed')
            .map(el => {
              return {
                id: el?.id,
                employee_service_schedule_id: el?.employee_service_schedule.length > 1 ? el?.employee_service_schedule[0].id : el?.employee_service_schedule.id,
                employee_id: result?.employee_id,
                group_by: this.groupBy !== '' ? this.groupBy : null,
                status:'scheduled'
              }
            });  

            // request body for checking data
            let checkingData = {
              employee_id: result?.employee_id,
              css: [...result?.arrayData]
              .filter(el => el?.status !== 'completed')
              .map(el => el?.id).join('_')
            }

            this.snackBar.open('Rechecking for employee dates conflicts. Please wait...', "", {
              panelClass:'success-snackbar'
            });

            this.checkingReq = this.scheduleBoardService.recheckEmployeeSwitchWorker(checkingData)
            .subscribe((result) => {
              console.log("CHECKING", result)
              this.snackBar.dismiss();

              // show conflict modal
              if(result?.length > 0){
                this.employeeAvailabilityDialog(result, body)
              }

              // execute update if there's no conflict
              else {
                this.updateScheduleStatus(body); 
              }
            });
          }
        });
    }
  }

  unassignEmployee(event){
    if (event) {
      this.requestType = 'mark-complete'

      let scheduleDialog = this.dialog.open(
        UnassignWorkerScheduleComponent,
        {
          width: '480px',
          data: event,
        }
      );

      scheduleDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.arrayData || !result.cancel) {
            let body: any[] = [...result?.arrayData]
            .filter(el => el?.status !== 'completed')
            .map(el => {
              return {
                id: el.id,  
                employee_id: null,
                employee_service_schedule_id: el.employee_service_schedule.length > 0 ? el.employee_service_schedule[0].id : el.employee_service_schedule.id,
                status:'unassigned',
              }
            });  

            this.updateScheduleStatus(body); 
          }
        });
    }
  }

  // change day
  // reschedule - time onlyh
  // reschedule - date
  // switch worker

  // change day
  changeDaySchedule(event){ 
    if (event) {
      let scheduleDialog = this.dialog.open(
        ChangeDayComponent,
        {
          width: '480px',
          data: event,
        }
      );

      scheduleDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.arrayData || !result.cancel) {
            // request body for checking data
            let checkingData = {
              days: result?.data?.add_days,  
              css: [...result?.arrayData]
              .filter(el => el?.status !== 'completed')
              .map(el => el?.id).join('_')
            }

            // request body for updating data
            let body: any[] = [...result?.arrayData]
            .filter(el => el?.status !== 'completed')
            .map(el => {
              let start_date = (new Date(el?.start_date * 1000)).toDateString(); // 09-03-2022
              let start_date_time = new Date(`${start_date}, ${el?.start_time}`);
              let addSub = result?.data?.add_days * 1;
              let new_date = addSub > 0 ? addDays(start_date_time, addSub) : subDays(start_date_time, Math.abs(addSub)); // 09-03-2022, 8:00am
              let new_rate = this.getRateBasedOnTime(el?.start_time.substring(0,5), el?.end_time.substring(0,5), el, new_date);

              return {
                id: el?.id,
                start_date: convertTimestampUtc(new_date),
                end_date: convertTimestampUtc(addHours(new Date(new_date), el?.total_hours)),
                shift_rate: new_rate?.shift_rate,
                support_item_number: new_rate?.support_item_number, 
                editable_rate_value: new_rate?.editable_rate_value,
                support_item_price: new_rate?.support_item_price,
              }
            }); 

            this.snackBar.open('Rechecking for employee dates conflicts. Please wait...', "", {
              panelClass:'success-snackbar'
            });

            this.checkingReq = this.scheduleBoardService.recheckEmployeeChangeDay(checkingData)
            .subscribe((result) => {
              console.log("CHECKING", result)
              this.snackBar.dismiss();

              // show conflict modal
              if(result?.length > 0){
                this.employeeAvailabilityDialog(result, body)
              }

              // execute update if there's no conflict
              else {
                this.updateScheduleStatus(body); 
              }
            });
          }
        });
    }
  }

  employeeAvailabilityDialog(employees, body){
    let openShiftSchedule = this.dialog.open(
      EmployeeAvailabilityManyComponent,
      { 
        minWidth: '48vw',
        maxWidth: '98vw',
        maxHeight: '97vh',
        //height: '97vh',
        data: {
          employees: employees,  
        }
      }
    );

    openShiftSchedule
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      console.log("AFTER CHECKING", result, body)
      if(!result?.cancel){
        if(result?.type === 'assign-available'){
          let schedule = result?.conflict.map(el => el.schedule).flat().map(el => el.orginal_service_schedule_id);
          let filteredBody = body.filter(el => schedule.findIndex(_el => el?.id === _el) === -1);

          if(filteredBody?.length > 0){
            this.updateScheduleStatus(filteredBody);
          } 

          else this.snackBar.open('All the schedule have dates conflicts. Please select other schedule', "", {
            panelClass:'success-snackbar'
          });
        }

        else if(result?.type === 'assign-all'){
          let objectBody = { ...body };  
          if((this.groupBy === 'Employee' || this.groupBy === 'Client') && this.requestType ==='reschedule') {
            this.rescheduleScheduleEmployee(body)
            return
          }
          this.updateScheduleStatus(body);
        }
      }
    });
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  initializeControlAction(action_event){
    if(action_event === 'expand'){
      if(this.controlWidth === '55px') this.controlWidth = '150px';  
        else this.controlWidth = '55px'
    }

    if(this.data.length > 0 || 
      (this.data.length > 0  && this.updateSelectedRows?.event_type )){
   
      if(action_event === 'cancel'){
        this.cancelSchedule(this.data)
      }

      else if(action_event === 'mark-complete'){
        this.markCompleteSchedule(this.data)
      }

      else if(action_event === 'recalculate'){
        this.recalculateSchedule(this.data)
      }

      else if(action_event === 'reschedule'){
        this.rescheduleSchedule(this.data)
      }

      else if(action_event === 'undo-complete'){
        this.undoCompleteSchedule(this.data)
      }

      else if(action_event === 'switch-worker'){
        this.switchWorkerSchedule(this.data)
      }

      else if(action_event === 'unassign-worker'){
        this.unassignEmployee(this.data)
      }

      else if(action_event === 'change-day'){
        this.changeDaySchedule(this.data)
      }

      else if(action_event === 'delete'){
        this.deleteDataDialog(this.data)
      }
    }
  }

}

import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
  Observable,
  forkJoin,
  combineLatest,
  of
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
import { convertTimestampUtc, convertTo12Hrs } from '@main/shared/utils/date-convert.util';
import { AddEmployeeShiftComponent } from '../add-employee-shift/add-employee-shift.component';
import { CancelScheduleComponent } from '../cancel-schedule/cancel-schedule.component';
import { MarkAsCompleteScheduleComponent } from '../mark-as-complete-schedule/mark-as-complete-schedule.component';
import { RecalculateComponent } from '../recalculate/recalculate.component';
import { SwitchWorkerComponent } from '../switch-worker/switch-worker.component';
import { UndoCompleteComponent } from '../undo-complete/undo-complete.component';
import { RescheduleComponent } from '../reschedule/reschedule.component';
import { ChangeDayComponent } from '../change-day/change-day.component';
import { BookResourceComponent } from '../book-resource/book-resource.component';
import { ScheduleBoardService } from '@app-shared/services/admin-panel/admin-schedule-board.service';
import { EmployeeAvailabilityManyComponent } from '../../dialogs/employee-availability-many/employee-availability-many.component';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
import { Convert24hrPipe } from '@main/shared/pipes/convert24hr.pipe';
import { UnassignWorkerScheduleComponent } from '../unassign-worker-schedule/unassign-worker-schedule.component';

declare var bootstrap: any;

@Component({
  selector: 'app-view-client-schedule-list',
  animations: [mainAnimations],
  templateUrl: './view-client-schedule-list.component.html',
  styleUrls: ['./view-client-schedule-list.component.scss'],
  providers:[Convert24hrPipe]
})
export class ViewClientScheduleListComponent implements OnInit, OnDestroy {
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
  public serviceScheduleList$:Observable<any> = of([])

  constructor(public dialogRef: MatDialogRef<ViewClientScheduleListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private adminServiceSchedule: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private scheduleBoardService: ScheduleBoardService,
    private convert24hr:Convert24hrPipe,
    private snackBar: MatSnackBar) { 
    console.log(data)
  }

  ngOnInit(): void {
    // if(this.data?.schedule?.length > 0){
    //   this.data?.schedule.forEach(el => {
    //     // modify item for table
    //     if(el[0]){
    //       el.forEach((_el) => {
    //         _el.weekday = this.days[new Date(_el.start_date * 1000).getDay()];
    //         _el.time_from = this.convertTo12Hrs(_el.start_time);
    //         _el.time_to = this.convertTo12Hrs(_el.end_time);
    //         _el.schedule = `${this.days[new Date(_el.start_date * 1000).getDay()]}, ${format(new Date(_el.start_date * 1000), 'MMM dd, yyyy')}`

    //         this.serviceScheduleList.push(_el)
    //       });
    //     }
    //   });
    //   setTimeout(() => this.loading = false, 1000);
    // }

    if(this.data){
      this.adminServiceSchedule.dispatch({
        type: ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT,
        payload: this.data.client.id,
      });
      this.getScheduleList()
    }


    // bootstrap tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })  
  }

  private getScheduleList():void {
    this.serviceScheduleList$ = this.adminServiceSchedule.pipe(select(state => state.scheduleBoard));

    this.serviceScheduleList$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      this.loading = res.pendingSingleSchedules
      if(res.singleSchedules.length > 0){
        let schedulesCopy = AdminHelper.deepCopy(res.singleSchedules)
        schedulesCopy.forEach((_el) => {
          _el.weekday       = this.days[new Date(_el.start_date * 1000).getDay()];
          _el.schedule      = `${format(new Date(_el.start_date * 1000), 'dd-MM-yyyy')}`
          _el.time_from     = this.convert24hr.transform(_el.start_time) ;
          _el.time_to       = this.convert24hr.transform( _el.end_time);
          _el.employee_name =  _el?.employee?.name || '';
      
          this.serviceScheduleList.push(_el)
        });

      }else{
        res.singleSchedules = []
      }
    })
  }

  getTotalHoursByTime(start_time, end_time){
    let start = start_time.replace(/\:/gi, '.').substr(0,5);
    let end = end_time.replace(/\:/gi, '.').substr(0,5);

    return parseInt(end) - parseInt(start);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
        maxWidth: '1500px',
        maxHeight: '97.5vh',
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
    ).then((el) => this.dialogRef.close());
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

            this.adminServiceSchedule.dispatch({
              type: ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE,
              payload: body
            });

            this.snackBar.open("Deletion of schedule is currently in progress", "", {
              duration: 5000,
              panelClass:'success-snackbar'
            });
            this.dialogRef.close();
          }
        });
    }
  }

  updateScheduleStatus(body){
    console.log("TRIGGER SAVE")
    this.dialogRef.close();

    this.adminServiceSchedule.dispatch({
      type: ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE,
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

                // timesheet approval request body
                client_service_schedule_id: el?.id,  
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
              }
            });  

            console.log(body)
            this.updateScheduleStatus(body);            
          }
        });
    }
  }

  markCompleteSchedule(event){
    if (event) {
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
                status: 'completed'
              }
            });  

            console.log(body)
            this.updateScheduleStatus(body); 
          }
        });
    }
  }

  // reschedule
  rescheduleSchedule(event){
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
          let body: any[] = [...result?.arrayData]
          .filter(el => el?.status !== 'completed')
          .map(el => {
            if(result?.data?.time_or_date !== 'Date Only'){
              let new_date = result?.data?.time_or_date === 'Both Date and Time' ? result?.data?.start_date : null;
              let new_rate = this.getRateBasedOnTime(result?.data?.start_time, result?.data?.end_time, el, new_date)
              
              let obj = {
                id: el?.id,  
                start_date: convertTimestampUtc(new Date(result?.data?.start_date)),
                end_date: convertTimestampUtc(addHours(new Date(result?.data?.start_date), new_rate?.total_hours || el?.total_hours)),
                start_time: result?.data?.start_time,
                end_time: result?.data?.end_time,
                shift_rate: new_rate?.shift_rate,
                total_hours: new_rate?.total_hours,
                support_item_number: new_rate?.support_item_number, 
                support_item_price: new_rate?.support_item_price,
                editable_rate_value: new_rate?.editable_rate_value,
              };

              if(result?.data?.time_or_date === 'Time Only'){
                delete obj['start_date'];
                delete obj['end_date'];
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
                support_item_price: new_rate?.support_item_price,
                editable_rate_value: new_rate?.editable_rate_value,
              }
            }
          });  

          // request body for checking data
          let checkingData = {
            reschedule_type: result?.data?.time_or_date,
            start_time: result?.data?.start_time,
            end_time: result?.data?.end_time,
            start_date: convertTimestampUtc(new Date(result?.data?.start_date)),
            css: [...result?.arrayData]
            .filter(el => el?.status !== 'completed')
            .map(el => el?.id).join('_')
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

  checkRate = (rate_name, rate, pricelist, total_hours, editable_rate_value) => {
    return {
      total_hours: total_hours,
      shift_rate: `${rate_name}`,
      editable_rate_value: pricelist[`${rate}_code`] ? pricelist[`${rate}`] : pricelist['standard_rate'],
      support_item_price: pricelist[`${rate}_code`] ? pricelist[`${rate}`] : pricelist['standard_rate'],
      support_item_number:  pricelist[`${rate}_code`] ? pricelist[`${rate}_code`] : pricelist['standard_rate_code']
    }
  }

  // get price rate based on time 

  /*if(start_time >= 1600 && start_time <= 2000 && end_time <= 2000){
    return this.checkRate('afternoon_rate', "Afternoon");
  }

  else if(start_time >= 600 && start_time <= 1559 && end_time <= 1800){
    return {
      total_hours: total_hours,
      shift_rate: "Standard Rate",
      editable_rate_value: pricelist['standard_rate'],
      support_item_number:  pricelist['standard_rate_code']
    }
  }

  else if(start_time >= 2000 && end_time >= 2000 && end_time <= 2359){
    return this.checkRate('evening_rate', "Evening");
  }

  else if((start_time >= 2200 || start_time < 600) && end_time <= 800){
    return this.checkRate('night_rate', "Night");
  }*/

  getRateBasedOnTime(start_time_val: any, end_time_val: any, data: any, new_date?: any){
    let start_time = start_time_val?.replace(':', '') * 1;
    let end_time = end_time_val?.replace(':', '') * 1;

    let startTime = start_time_val;
    let startDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${startTime}`;
    let endTime = end_time_val;
    let endDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${endTime}`;
    let total_hours_sub = differenceInMinutes(new Date(endDate), new Date(startDate)) 
    let total_hours = Math.round((total_hours_sub/60)*100)/100;

    /*let hour = (end_time - start_time) / 100;
    let total_hours = hour > 0 ? hour : (hour + 24);*/
    let day = new Date(data?.start_date * 1000).getDay();
    let pricelist = data?.price_list[0];
    let start_date_day = new Date(new_date || data?.start_date).getDay();
    let public_holiday_rate = this.data?.publicHoliday[start_date_day - 1];

    let serviceLocation = data?.client_funding_service_location;
    let checkIfValidHoliday = public_holiday_rate?.findIndex(el => el?.state?.join(',')?.toLowerCase()?.match(serviceLocation?.toLowerCase()) || (el?.state?.join(',')?.toLowerCase()?.match('all state')));

    if(public_holiday_rate?.length > 0 && checkIfValidHoliday >= 0){
      console.log("HOLIDAY", start_date_day - 1, data, this.data?.publicHoliday, new_date, this.data?.publicHoliday[start_date_day - 1])
      return {
        total_hours: total_hours,
        shift_rate: `Public Holiday Rate`,
        support_item_price: pricelist[`public_holiday_rate`] ? pricelist[`public_holiday_rate`] : pricelist['standard_rate'],
        editable_rate_value: pricelist[`public_holiday_rate`] ? pricelist[`public_holiday_rate`] : pricelist['standard_rate'],
        support_item_number:  pricelist[`public_holiday_rate_code`] ? pricelist[`public_holiday_rate_code`] : pricelist['standard_rate_code']
      }
    }

    else if(start_date_day > 0 && start_date_day < 6){
      return this.ahRecalculator(data, pricelist, start_time, end_time, data?.editable_rate_value)
    }

    else if(start_date_day === 0){
      return this.checkRate('sunday_rate', "Sunday", pricelist, total_hours, data?.editable_rate_value);
    }

    else if(start_date_day === 6){
      return this.checkRate('saturday_rate', "Saturday", pricelist, total_hours, data?.editable_rate_value);
    }
  }

  ahRecalculator(data: any, pricelist: any, start_time: number, end_time: number, editable_rate_value){
    /*let hour = (end_time - start_time) / 100;
    let total_hours = hour > 0 ? hour : (hour + 24);*/

    let startTime = data?.start_time;
    let startDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${startTime}`;
    let endTime = data?.end_time;
    let endDate = `${new Date(data?.start_date * 1000).toLocaleDateString()} ${endTime}`;
    let total_hours_sub = differenceInMinutes(new Date(endDate), new Date(startDate)) 
    let total_hours = Math.round((total_hours_sub/60)*100)/100;

    /* SHIFT START */ 
    if(data['a_h_calculator'] === 'Shift Start'){
      if(start_time >= 600 && start_time <= 1559 && (end_time <= 2000 || total_hours >= 6)){
        //console.log("MORNING")
        return this.checkRate('Standard Rate', 'standard_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 1600 && start_time < 2000 && end_time <= 2000){
        //console.log("Afternoon")
        return this.checkRate('Afternoon Rate', 'afternoon_rate', pricelist, total_hours, data?.editable_rate_value);
      }
    
      else if(start_time >= 1900 && end_time >= 1900 && end_time <= 2100){
        //console.log("EVENING")
        return this.checkRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time <= 2359){
        //console.log("EVENING")
        return this.checkRate('Evening Rate', 'evening_rate', pricelist, total_hours, data?.editable_rate_value);
      }

      else if((start_time >= 2200 || start_time < 600) && end_time <= 800){
        //console.log("Night")
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

    /* HIGHEST RATE 
    else if(data['a_h_calculator'] === 'Highest Rate'){
      let highestRate = Math.max(pricelist[`standard_rate`], pricelist[`afternoon_rate`], pricelist[`evening_rate`], pricelist[`night_rate`]);
      let keyRate = Object.keys(pricelist).filter((key) => pricelist[key] === highestRate)[0];
      let shiftRate = keyRate.split('_')[0].substring(0, 1).toUpperCase() +  keyRate.split('_')[0].substring(1, keyRate.split('_')[0]?.length);
    
      return this.checkRate(`${shiftRate} Rate`, `${keyRate}`, pricelist, total_hours, data?.editable_rate_value);
    }*/
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
                status: 'scheduled'
              }
            });  

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
                employee_service_schedule_id: parseInt(el.employee_service_schedule?.id),
                employee_id: result?.employee_id
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
              let new_rate = this.getRateBasedOnTime(el?.start_time.substring(0,5), el?.end_time.substring(0,5), el, new_date)

              //let new_date = addDays(new Date(`${start_date}, ${el?.start_time}`), result?.data?.add_days); // 09-03-2022, 8:00am
              
              /*let start_date = (new Date(el?.start_date * 1000)).toDateString(); // 09-03-2022
              let start_date_time = new Date(`${start_date}, ${el?.start_time}`);
              let addSub = result?.data?.add_days * 1;
              let new_date = addSub > 0 ? addDays(start_date_time, addSub) : subDays(start_date_time, Math.abs(addSub)); // 09-03-2022, 8:00am
              let new_rate = this.getRateBasedOnTime(el?.start_time.substring(0,5), el?.end_time.substring(0,5), el, new_date);
*/
              return {
                id: el?.id,
                start_date: convertTimestampUtc(new_date),
                end_date: convertTimestampUtc(addHours(new Date(new_date), el?.total_hours)),
                shift_rate: new_rate?.shift_rate,
                support_item_number: new_rate?.support_item_number, 
                support_item_price: new_rate?.support_item_price,
                editable_rate_value: new_rate?.editable_rate_value
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

          this.updateScheduleStatus(body); 
        }
      }
    });
  }


  unassignEmployee(event){
    if (event) {
      // this.requestType = 'mark-complete'

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

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }


  controlWidth: string = '55px';

  public controlList: any[] = [
    { title: 'Cancel Shift', icon: '/assets/images/icons/schedule-cancel.png', action_event: 'cancel', class: 'margin-text cancel' },
    //{ title: 'Recalculate', icon: '/assets/images/icons/schedule-recalculate.png', action_event: 'recalculate', class:'margin-text' },
    { title: 'Reschedule', icon: '/assets/images/icons/schedule-reschedule.png', action_event: 'reschedule', class:'margin-text reschedule' },
    { title: 'Mark Complete', icon: '/assets/images/icons/schedule-complete.png', action_event: 'mark-complete', class: 'mark-complete' },
    { title: 'Undo Complete', icon: '/assets/images/icons/schedule-undo-complete.png', action_event: 'undo-complete' },
    //{ title: 'Book Resource', icon: '/assets/images/icons/schedule-book-resource.png', action_event: 'book-resource' },
    { title: 'Switch Worker', icon: '/assets/images/icons/schedule-switch-worker.png', action_event: 'switch-worker' },
    { title: 'Unassign Worker', icon: '/assets/images/icons/schedule-unassign-employee.png', action_event: 'unassign-worker' },
    { title: 'Change Day', icon: '/assets/images/icons/schedule-add-days.png', action_event: 'change-day', class:'margin-text' },
    { title: 'Delete', icon: '/assets/images/icons/schedule-delete.png', action_event: 'delete', class:'margin-text' },
  ];

  checkSelectedRows(event){
    console.log("ROW SELECTED",event)
    this.updateSelectedRows = event;

    this.initializeControlAction(this.updateSelectedRows?.event_type)
  }

  initializeControlAction(action_event){
    if(action_event === 'expand'){
      if(this.controlWidth === '55px') this.controlWidth = '150px';  
        else this.controlWidth = '55px'
    }

    if(this.updateSelectedRows?.selectedRows?.length > 0 || 
      (this.updateSelectedRows?.selectedRows?.length > 0  && this.updateSelectedRows?.event_type )){
      console.log("TRIGGER", action_event, this.updateSelectedRows?.selectedRows)
      
      if(action_event === 'cancel' || (this.updateSelectedRows?.event_type === 'cancel' && !action_event)){
        this.cancelSchedule(this.updateSelectedRows?.selectedRows)
      }

      else if(action_event === 'mark-complete' || (this.updateSelectedRows?.event_type === 'mark-complete' && !action_event)){
        this.markCompleteSchedule(this.updateSelectedRows?.selectedRows)
      }

      else if(action_event === 'recalculate'){
        this.recalculateSchedule(this.updateSelectedRows?.selectedRows)
      }

      else if(action_event === 'reschedule' || (this.updateSelectedRows?.event_type === 'reschedule'  && !action_event)){
        this.rescheduleSchedule(this.updateSelectedRows?.selectedRows)
      }

      else if(action_event === 'undo-complete'){
        this.undoCompleteSchedule(this.updateSelectedRows?.selectedRows)
      }

      /*else if(action_event === 'book-resource'){
        this.bookResourceSchedule(this.updateSelectedRows?.selectedRows)
      }
*/
      else if(action_event === 'switch-worker'){
        this.switchWorkerSchedule(this.updateSelectedRows?.selectedRows)
      }

      else if(action_event === 'unassign-worker'){
        this.unassignEmployee(this.data)
      }

      else if(action_event === 'change-day'){
        this.changeDaySchedule(this.updateSelectedRows?.selectedRows)
      }

      else if(action_event === 'delete'){
        this.deleteDataDialog(this.updateSelectedRows?.selectedRows)
      }
    }
  }
}

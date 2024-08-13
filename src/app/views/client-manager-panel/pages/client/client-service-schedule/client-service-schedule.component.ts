import { Component, OnInit, Input } from '@angular/core';
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
} from './utils/service-schedule-model-interface';
import { AddClientServiceScheduleComponent } from '../client-details/dialogs/add-client-service-schedule/add-client-service-schedule.component';

import { ViewServiceScheduleComponent } from '../client-details/dialogs/view-service-schedule/view-service-schedule.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  addDays, 
  addHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate 
} from 'date-fns';
import moment from 'moment';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-client-service-schedule',
  animations: [mainAnimations],
  templateUrl: './client-service-schedule.component.html',
  styleUrls: ['./client-service-schedule.component.scss']
})
export class ClientServiceScheduleComponent implements OnInit {
  private serviceSchedule$: any;
  private req: Subscription;
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

  constructor(private adminServiceSchedule: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.getServiceSchedules();
    this.serviceSchedule$ = this.adminServiceSchedule.pipe(select(state => state.clientServiceSchdule));

    this.req =  this.serviceSchedule$.subscribe((serviceSchedule: any) => {
      this.loading = serviceSchedule.pending;

      if(serviceSchedule.clientServiceScheduleList.length > 0){
        serviceSchedule.clientServiceScheduleList.forEach(el => {
          // modify item for table
          el.weekday = this.days[new Date(el.start_date * 1000).getDay()];
          el.time_from = this.convertTo12Hrs(el.start_time);
          el.time_to = this.convertTo12Hrs(el.end_time);
        });
        this.serviceScheduleList =  serviceSchedule.clientServiceScheduleList;
      }

      if(serviceSchedule.success){
        this.snackBar.open(serviceSchedule.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminServiceSchedule.dispatch({
          type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_SUCCESS,
          payload: {message: null}
        });

        this.adminServiceSchedule.dispatch({
          type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_SUCCESS,
          payload: {message: null}
        });

        this.getServiceSchedules();
      }

      if(serviceSchedule.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminServiceSchedule.dispatch({
          type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_FAIL,
          payload: null
        });

        this.adminServiceSchedule.dispatch({
          type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_FAIL,
          payload: null
        });
      }
    })
  }

  convertTo12Hrs(time) {
    // Check correct time format and split into components
    time = time?.substr(0,5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  getTotalHoursByTime(start_time, end_time){
    let start = start_time.replace(/\:/gi, '.').substr(0,5);
    let end = end_time.replace(/\:/gi, '.').substr(0,5);

    return parseInt(end) - parseInt(start);
  }

  getServiceSchedules(){
    this.adminServiceSchedule.dispatch({
      type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  editDataDialog(event){
    if(event){
      this.openAddServiceScheduleModal(event?.data);
    }
  }

  /* ADD NEW SERVICE SCHEDULE */
  openAddServiceScheduleModal(data?: any){
    let createClientDialog = this.dialog.open(
      AddClientServiceScheduleComponent,
      {
        minWidth: '54vw',
        maxWidth: '872px',
        data: data,
      }
    );

    createClientDialog
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

    console.log(convertTimestampUtc(new Date(`${startDate}`)), endDate)

    this.router.navigate([`/staff/schedule/details/client/${event?.data?.client_id}`], 
      { 
        queryParams: { 
          'range_start': convertTimestampUtc(new Date(`${startDate}`)),
          'range_end': convertTimestampUtc(new Date(`${endDate}`))
        }
      }
    );
  }
  // delete event emitter
  deleteDataDialog  (event) {
    console.log(event)
    if (event) {
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        {
          minWidth: '30vw',
          data: event?.data,
        }
      );

      deleteDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.data || (result && !result.cancel && event?.data)) {
            this.adminServiceSchedule.dispatch({
              type: ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE,
              payload: [result?.data || event?.data]
            });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }

  convertToDateTime(dateVal: Date){
    /*let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;*/

    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }
}

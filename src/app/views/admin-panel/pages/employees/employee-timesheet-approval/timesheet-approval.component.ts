import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
  Observable,
  forkJoin,
  combineLatest,
  zip
} from 'rxjs';
import {
  select,
  Store
} from '@ngrx/store';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState } from '@app-admin-store/reducers/admin-employees.reducer';
import {
  displayedColumns,
  TableHeader,
  EmployeeTimesheet,
  selectedColumns,
  employeeTimesheetList
} from './utils/timesheet-approval-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { ViewTimesheetComponent } from './dialogs/view-timesheet/view-timesheet.component';
import { ApproveDeclineTimesheetComponent } from './dialogs/approve-decline-timesheet/approve-decline-timesheet.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { TimesheetApprovalActionTypes } from '@main/views/admin-panel/store/actions/admin-timesheet-approval.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { format } from 'date-fns';
import { Location } from '@angular/common';
import { 
  convertTo12Hrs,
  convertTimestampUtc
} from '@main/shared/utils/date-convert.util';
import { FundingClaimService } from '@main/shared/services/admin-panel/admin-funding-claim.service';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/timesheet-approval-report-model-interface';
import { SyncToXeroActionTypes } from '@main/views/admin-panel/store/actions/admin-xero.action';
import { SyncDialogComponent } from '@main/shared/components/sync-dialog/sync-dialog.component';
import { SyncStatusDialogComponent } from '@main/shared/components/sync-status-dialog/sync-status-dialog.component';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
import { TimePipe } from '@main/shared/pipes/time.pipe';
import { NameFormatPipe } from '@main/shared/pipes/name-format.pipe';
import { TimesheetPayload } from '@main/shared/utils/timesheet-payload.util';

@Component({
  selector: 'app-timesheet-approval',
  animations: [mainAnimations],
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss'],
  providers:[TimePipe, NameFormatPipe]
})
export class TimesheetApprovalComponent implements OnInit {
  private xeroData$: any
  private req: Subscription;
  private xeroReq: Subscription;
  private unsubscribe$ = new Subject<void>();
  private fundingClaimReq: Subscription;
  // private employeesData$: any;

  public xeroItemsList: any;
  public employeeList: any[];
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public loadingSchedule: boolean = true;
  public id;

  // public timesheetApprovalData$: any;
  public employeeData: any;
  public displayedColumns: TableHeader[] = displayedColumns;
  public timesheetApprovalList: EmployeeTimesheet[] = [];
  public timesheetApprovalListOriginal: EmployeeTimesheet[] = [];

  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      client_service_schedule_id: el?.client_service_schedule_id,
      client_name: el?.client_name,
      funding_source_full_name: el?.funding_source_full_name,
      employee_name: el?.employee_name,
      time_in: el?.time_in,
      time_out: el?.time_out,
      calendar_schedule: el?.calendar_schedule,
      client_service_schedule_type: el?.client_service_schedule_type,
      employee_timesheet_total_hours: el?.employee_timesheet_total_hours,
    };
  }

  private timesheetApprovalData$:any;
  private clientScheduleList$: any;
  
  public showRoles:boolean = true

  public filterRoleList:Array<any> = [
    {role: 'Self-Service Portal - Coordinator', title:'Coordinator'},
    {role: 'Self-Service Portal - Facilitator', title:'Facilitator'},
    {role: 'Support Worker App', title:'Worker'},
  ]

  public filterRole:string = ''
  public timesheetData:any
  public timesheetPayload:any = TimesheetPayload

  public maxRows: number = 25
  public tableState:any = {
    page: 1,
    maxRows:25,
    dateFrom:'',
    dateTo:'',
    status:'',
    pageSize: 25
  }
  constructor(private employeeListStore: Store<EmployeeListState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private location: Location,
    private fundingClaimService: FundingClaimService,
    private adminTimesheetApproval: Store<AdminProfileState>,
    private route: ActivatedRoute,
    private xeroStore:Store<AdminProfileState>,
    private time:TimePipe,
    private nameFormatPipe: NameFormatPipe
    ) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];


    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }


  ngOnInit(): void {
    this.subscribeToTimesheet();
    this.getTimesheetApprovals();
    this.detectXeroCode();
    this.subscribeToXero()
  }

  // SYNC TO XERO CODE
  subscribeToXero(){
    this.xeroData$ = this.xeroStore.pipe(select(state => state.syncToXero));
    this.xeroReq = this.xeroData$.subscribe((syncToXero: any) => {
      // this.loading = syncToXero.pending;

      if (syncToXero.syncToXeroListProgress.length > 0) {
        this.xeroItemsList = syncToXero.syncToXeroListProgress;
      }

      if (syncToXero.success) {
        if (syncToXero.success.data.error.length === 0) {
          // let message = syncToXero.success.status 
          // ? syncToXero.success
          // : "Successfully sync to xero"
          this.snackBar.open("All records are successfully synced to xero", "", {
            duration: 4000,
            panelClass: 'success-snackbar'
          });
        } else {
          this.snackBar.open("Successfully synced to xero", "", {
            duration: 4000,
            panelClass: 'success-snackbar'
          });
          this.showErrorSync(syncToXero.success.data.error)
        }


        this.employeeListStore.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: null,
        });

        this.employeeListStore.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: null,
        });

        // this.getXeroProgress();
      }

      if (syncToXero.error) {
        let message = syncToXero.error.error.message 
          ? syncToXero.error.error.message 
          : 'Something went wrong please try again later or contact your administrator'
          
        this.snackBar.open(
          message,
          '',
          {
            duration: 4000,
            panelClass: 'danger-snackbar',
          }
        );

        this.employeeListStore.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS,
          payload: null,
        });

        this.employeeListStore.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL,
          payload: null,
        });
      }
    });
  }

  getXeroProgress() {
    this.employeeListStore.dispatch({
      type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST
    }); 
  }

  showErrorSync(data:any){

    if(this.timesheetApprovalList.length === 0) return
    const filteredData = this.timesheetApprovalList.filter(item => data.includes(item.employee_timesheet_id));
    this.syncToXeroStatusDialog(filteredData)

  }

  private syncToXeroStatusDialog(data:any){
    let syncToXeroStatusModal = this.dialog.open(
      SyncStatusDialogComponent,
      { 
        minWidth: '30vw',
        data: {list:data ,type:'timesheet'},
      },
    );

    syncToXeroStatusModal
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        console.log('Sync To Xero Status Dialog Closed');
      })
  }

  syncToXeroDialog(){
    // let syncXeroDialog = this.dialog.open(
    //   SyncDialogComponent,
    //   { 
    //     minWidth: '30vw',
    //   }
    // );

    // syncXeroDialog
    // .afterClosed()
    // .pipe(takeUntil(this.unsubscribe$))
    // .subscribe(result => {
    //   if(result){
    //     let body = {
    //       //sync: true,
    //       model: "timesheet"
    //     }

    //     this.snackBar.open("Please Wait. Syncing timesheet to Xero is currently in progress.", '', {
    //       duration: 4000,
    //       panelClass: 'success-snackbar',
    //     });

    //     this.employeeListStore.dispatch({
    //       type: SyncToXeroActionTypes.SYNC_TO_XERO,
    //       payload: body
    //     }); 
    //   }
    // });
    this.router.navigate(['/admin/setup/sync-data'])
  }

  // detect xero code
  detectXeroCode(){
    let code = this.router.url.split('?code=')[1];

    console.log(code)

    if(code){
      this.fundingClaimReq = this.fundingClaimService
      .postClaimInvoiceToXero(code)
      .subscribe((result) => {
        console.log(result)
      });
    }
    // ADD API TO XERO HERE
  }

  redirectToXero(){
    let response_type = "code";
    let client_id = "B70439C187BF4FAC811E94483E5B5C96";
    let redirect_uri = "http://localhost:8843/admin/clients/funding-claim"; //"https://www.lamacare.com.au"; //this.env?.server;
    let full_url = `https://login.xero.com/identity/connect/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid`;
    
    console.log(full_url)
    //https://login.xero.com/identity/connect/authorize?response_type=code&client_id=B70439C187BF4FAC811E94483E5B5C96&redirect_uri=http://localhost:8843/admin/clients/funding-claim&scope=openid 
    window.location.href = full_url;
  }


  subscribeToTimesheet(){
    this.timesheetApprovalData$ = this.adminTimesheetApproval.pipe(select(state => state.timesheetApproval));
    this.req = this.timesheetApprovalData$.subscribe((timesheetApproval: any) => {
      this.loading = timesheetApproval?.pending;
      if (timesheetApproval?.timesheetApprovalList) {
        this.timesheetData = timesheetApproval?.timesheetApprovalList?.data ? timesheetApproval?.timesheetApprovalList : timesheetApproval?.timesheetApprovalList
        if(this.timesheetData?.data){
          this.timesheetData.data.forEach(element => {
            if(!element?.employee_timesheet_approved){
              element.time_in = AdminHelper.convert24Hour(element?.employee_timesheet_start_time);
              element.time_out = AdminHelper.convert24Hour(element?.employee_timesheet_end_time);
              element.approved_total_hours = element?.employee_timesheet_total_hours;
            }
            
            else {
              element.time_in = AdminHelper.convert24Hour(element?.client_service_schedule_approved_start_time);
              element.time_out = AdminHelper.convert24Hour(element?.client_service_schedule_approved_end_time);
              element.approved_total_hours = element?.client_service_schedule_approved_total_hours;
            }
  
            let start_date = new Date(element?.client_service_schedule_start_date * 1000)
            let gmtDate = new Date(start_date.getTime() + start_date.getTimezoneOffset() * 60000);
            element.client_name = this.nameFormatPipe.transform(element.client_name)
            element.employee_name = this.nameFormatPipe.transform(element.employee_name)
            element.calendar_schedule = `${format(gmtDate, 'EEE - MMM dd,yyyy')}`;
          });
  
          // do not show cancelled shift
          // const timesheetListFiltered = timesheetApproval.timesheetApprovalList
          // .filter(el => 
          //   (el.client_service_schedule_status.toLowerCase() !== 'cancelled' && !el.client_service_schedule_charge_to_client )
          //   && el?.client_status?.toLowerCase() === 'active'
          //   && !el?.client_service_schedule_date_deleted
          // );
          this.timesheetApprovalList = [...this.timesheetData?.data]
          this.timesheetApprovalListOriginal = [...this.timesheetData?.data]
        }
        

        if(this.id){
          console.log(this.id)
          this.timesheetApprovalList = this.timesheetApprovalList.filter(el => this.id == el?.employee_id);
        }
      }

      if (timesheetApproval?.success) {
        this.snackBar.open(timesheetApproval.success, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });

        this.adminTimesheetApproval.dispatch({
          type: TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_SUCCESS,
          payload: { message: null }
        });

        this.adminTimesheetApproval.dispatch({
          type: TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_SUCCESS,
          payload: { message: null }
        });

        this.getTimesheetApprovals();
      }

      if (timesheetApproval?.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        this.adminTimesheetApproval.dispatch({
          type: TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_FAIL,
          payload: null
        });

        this.adminTimesheetApproval.dispatch({
          type: TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_FAIL,
          payload: null
        });
      }
    });

    this.clientScheduleList$ = this.adminTimesheetApproval.pipe(select(state => state.clientServiceSchdule.clientServiceScheduleList))
    .subscribe((serviceSchedule: any) => {
      this.loadingSchedule = serviceSchedule.pending;
    });
  }

  clearFilter(event:any):void {
    this.tableState.pageSize = 25
    this.tableState.maxRows = 25
    this.tableState.page = 1
    this.tableState.dateFrom = null
    this.tableState.dateTo = null
    this.tableState.status = ''

    this.timesheetPayload.limit = 25
    this.timesheetPayload.start = 0
    this.timesheetPayload.approved = undefined
    this.timesheetPayload.date_start =  null
    this.timesheetPayload.date_end =  null
    this.timesheetPayload.search = undefined

    this.adminTimesheetApproval.dispatch({
      type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST,
      payload:this.timesheetPayload
    });

  }

  adjustNumberOfItems(limit: number = 10): void {
    this.tableState.pageSize = limit
    this.tableState.maxRows = limit
    this.tableState.page = 1
    this.timesheetPayload.limit = this.tableState.pageSize
    this.adminTimesheetApproval.dispatch({
      type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST,
      payload:this.timesheetPayload
    });
  }

  searchBySource(event:string): void{
    this.timesheetPayload.search = event

    this.adminTimesheetApproval.dispatch({
      type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST,
      payload:this.timesheetPayload
    });
  }

  changePage(pageData): void {
    let pageindexes = {}
    for (let i = 0; i < pageData?.paginate.length; i++) {
      const value = pageData?.paginate[i];
      pageindexes[value] = (i + 1) * this.tableState.maxRows;
    }

    this.tableState.page = pageData.page

    this.timesheetPayload.start = pageindexes[pageData?.page] - this.tableState.maxRows

    this.adminTimesheetApproval.dispatch({
      type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST,
      payload:this.timesheetPayload
    });
  }

  searchByStatus(status: string) {
    switch(status.toLowerCase()){

      case 'approved':
        this.tableState.status = "Approved"
        this.timesheetPayload.approved = true
        break
      case 'for-approval':
        this.tableState.status = "For Approval"
        this.timesheetPayload.approved = null
        break
      case 'all':
        this.tableState.status = ""
        this.timesheetPayload.approved = undefined
        break
    }

    this.adminTimesheetApproval.dispatch({
      type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST,
      payload:this.timesheetPayload
    });
  }

  updateDateFilter(date:any) {

    this.tableState.dateFrom = date.dateFrom
    this.tableState.dateTo = date.dateTo


    setTimeout(() => {
      this.timesheetPayload.date_start =  convertTimestampUtc(date.dateFrom)
      this.timesheetPayload.date_end =  convertTimestampUtc(date.dateTo)
      
      this.adminTimesheetApproval.dispatch({
        type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST,
        payload:this.timesheetPayload
      });
    }, 0);
  }

  getData(event) {
    this.employeeList = event.employees.employeeList.map(emp => {
      return {
        ...emp, employee_name: emp.first_name + ' ' + emp.last_name
      }
    });
  }

  convertToDate(dateTime) {
    return new Date(dateTime * 1000)
  }


  getTimesheetApprovals(body?:any) {
    this.adminTimesheetApproval.dispatch({
      type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST,
      payload:this.timesheetPayload
    });
  }

  getEmployeeList(){
    this.adminTimesheetApproval.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
  }

  getClientList(){
    this.adminTimesheetApproval.dispatch({
      type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST
    });
  }

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
    if(this.xeroReq) this.xeroReq.unsubscribe()
  }

  // edit event emitter
  editDataDialog(event) {
    if (event) {
      this.openAddTimesheetApproval(event?.data);
    }
  }

  // Generate Report
  public reportColumn = reportColumn;
  public reportSelectedColumn = reportSelectedColumn;

  generateReport(){
    let reportDialog = this.dialog.open(
      GenerateReportGlobalComponent,
      { 
        minWidth: '423px',
        maxHeight: '97vh',
        maxWidth: '98vw',
        //maxWidth: '423px',
        data: {
          data_list: this.timesheetApprovalList,  
          title: "Generate Employee Timesheet Report",
          sub_title: "Employee Timesheet",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Date of Shift',
          dateSearch: {
            dateFrom: 'Date of Shift',  
            dateTo: 'Date of Shift'
          },
          //activeDateFilter:this.activeDateFilter,
          groupItems: true,  
          groupBy: "Employee Name"
        },
      }
    );

    /*reportDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        
      }
    });*/
  }

  public activeDateFilter;

  setReportDate(event){
    this.activeDateFilter = event;
  }

  // delete event emitter
  deleteDataDialog(event) {
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
            // this.adminTimesheetApproval.dispatch({
            //   type: TimesheetApprovalActionTypes.,
            //   payload: [result?.data || event?.data]
            // });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }


  openAddTimesheetApproval(data?: any) {
    let addTimesheetApproval = this.dialog.open(
      ViewTimesheetComponent,
      {
        minWidth: '50vw',
        maxWidth: '1400px',
        minHeight: '96vh',
        maxHeight: '98vh',
        data: data
      }
    );

    addTimesheetApproval
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        console.log(result)
        if(result){
          let body = {
            "id": result?.data[0]?.employee_timesheet_id,    
            "page": "bulk",
            "employee-timesheet": {
              "update": [
                ...this.generateTimesheetData(result)
              ]
            }
          }

          console.log("APPROVAL", result, body)

          this.adminTimesheetApproval.dispatch({
            type: TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET,
            payload: body
          });
        }
      });
  }

  approveDeclineTimesheet(data?: any) {
    console.log(data)
      let approveDeclineTimesheet = this.dialog.open(
      ApproveDeclineTimesheetComponent,
      {
        minWidth: data?.approved_decline === 'decline' ? '30vw' : '95vw',
        maxWidth: '98vw',
        maxHeight: '95vh',
        minHeight: data?.approved_decline === 'decline' ? '30vh' : '60vh',
        data: data
      }
    );

    approveDeclineTimesheet
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          let body = {
            "id": result?.data[0]?.employee_timesheet_id,  
            "page": "bulk",
            "employee-timesheet": {
              "update": [
                ...this.generateTimesheetData(result)
              ]
            }
          }

          console.log(result, body)

          this.adminTimesheetApproval.dispatch({
            type: TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET,
            payload: body
          });
        }
      });
  }

  generateTimesheetData(result){
    return result?.data.map(el => {
      let approved_start_time = el?.update_shift_time === 'No' ? el?.client_service_schedule_start_time?.substr(0, 5) : el?.employee_timesheet_start_time?.substr(0, 5);
      let approved_end_time  = el?.update_shift_time === 'No' ? el?.client_service_schedule_end_time?.substr(0, 5) : el?.employee_timesheet_end_time?.substr(0, 5);
      let approved_total_hrs = el?.update_shift_time === 'No' ? el?.client_service_schedule_total_hours : el?.employee_timesheet_total_hours;
      let approved_transport_km = el?.update_transport_km === 'No' ? el?.client_service_schedule_total_transport_km  : el?.employee_timesheet_transport_mileage;
      let approved_travel_km = el?.update_travel_km === 'No' ? el?.client_service_schedule_total_travel_km: el?.employee_timesheet_travel_mileage ;
      let approved_shift_rate = el?.update_shift_time === 'No' ? el?.client_service_schedule_shift_rate : (el?.employee_timesheet_shift_rate || 'Standard Rate');

      let travel_time_client = el?.client_service_schedule_travel_hours * el?.client_service_schedule_travel_distance;
      let travel_time_employee = el?.employee_timesheet_travel_hours * el?.employee_timesheet_travel_distance;
      let approved_travel_time = el?.update_travel_time === 'No' ? (travel_time_client || 0) : (travel_time_employee || 0);
       
      let employee_hour_rate = el?.employee_pay_rate_hourly_pay_rate;
      let approved_total_cost = employee_hour_rate * approved_total_hrs;
      let approved_start_date = el?.update_shift_time === 'No' ? el?.client_service_schedule_start_date : el?.employee_timesheet_start_date;
      let approved_end_date = el?.update_shift_time === 'No' ? el?.client_service_schedule_end_date : el?.employee_timesheet_end_date;
      let standard_hour_rate =  el?.price_list_standard_rate > 0 ? el?.price_list_standard_rate : el?.client_service_schedule_editable_rate_value;
      let client_hour_rate = standard_hour_rate;
      let approved_support_item_number = el?.price_list_standard_rate_code;

      // APPROVE SHIFT TIME
      if(el?.update_shift_time !== 'No'){
        console.log(el?.client_service_schedule_shift_rate, el?.client_service_schedule_shift_rate?.toLowerCase()?.match('public holiday'))
        
        if(el?.client_service_schedule_shift_rate?.toLowerCase().match('holiday')){
          console.log("MATCH PUBLIC HOLIDAY", el)
          employee_hour_rate = el?.employee_pay_rate_public_holiday_rate || 0;
          approved_total_cost = employee_hour_rate * approved_total_hrs;
          client_hour_rate = el?.price_list_public_holiday_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_public_holiday_rate_code || el?.price_list_standard_rate_code;
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('afternoon')){
          employee_hour_rate = el?.employee_pay_rate_afternoon_rate || 0;
          approved_total_cost = employee_hour_rate * approved_total_hrs;
          client_hour_rate = el?.price_list_afternoon_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_afternoon_rate_code || el?.price_list_standard_rate_code;
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('night')){
          employee_hour_rate = el?.employee_pay_rate_night_rate || 0;
          approved_total_cost = employee_hour_rate * approved_total_hrs;
          client_hour_rate = el?.price_list_night_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_night_rate_code || el?.price_list_standard_rate_code;
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('evening')){
          employee_hour_rate = el?.employee_pay_rate_evening_rate || 0;
          approved_total_cost = employee_hour_rate * approved_total_hrs;
          client_hour_rate = el?.price_list_evening_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_evening_rate_code || el?.price_list_standard_rate_code; 
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('saturday')){
          employee_hour_rate = el?.employee_pay_rate_saturday_rate || 0;
          approved_total_cost = employee_hour_rate * approved_total_hrs;
          client_hour_rate = el?.price_list_saturday_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_saturday_rate_code || el?.price_list_standard_rate_code;
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('sunday')){
          employee_hour_rate = el?.employee_pay_rate_sunday_rate || 0;
          approved_total_cost = employee_hour_rate * approved_total_hrs;
          client_hour_rate = el?.price_list_sunday_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_sunday_rate_code || el?.price_list_standard_rate_code;
        }
      }

      // IF NOT APPROVE SHIFT TIME 
      else {
        if(el?.client_service_schedule_shift_rate?.toLowerCase().match('holiday')){
          console.log("MATCH PUBLIC HOLIDAY", el)
          employee_hour_rate = el?.employee_pay_rate_public_holiday_rate || 0;
          approved_total_cost = employee_hour_rate *  el?.client_service_schedule_total_hours;
          client_hour_rate = el?.price_list_public_holiday_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_public_holiday_rate_code || el?.price_list_standard_rate_code;
        }
        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('afternoon')){
          employee_hour_rate = el?.employee_pay_rate_afternoon_rate || 0;
          approved_total_cost = employee_hour_rate * el?.client_service_schedule_total_hours;
          client_hour_rate = el?.price_list_afternoon_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_afternoon_rate_code || el?.price_list_standard_rate_code;
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('night')){
          employee_hour_rate = el?.employee_pay_rate_night_rate || 0;
          approved_total_cost = employee_hour_rate * el?.client_service_schedule_total_hours;
          client_hour_rate = el?.price_list_night_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_night_rate_code || el?.price_list_standard_rate_code;
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('evening')){
          employee_hour_rate = el?.employee_pay_rate_evening_rate || 0;
          approved_total_cost = employee_hour_rate * el?.client_service_schedule_total_hours;
          client_hour_rate = el?.price_list_evening_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_evening_rate_code || el?.price_list_standard_rate_code; 
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('saturday')){
          employee_hour_rate = el?.employee_pay_rate_saturday_rate || 0;
          approved_total_cost = employee_hour_rate * el?.client_service_schedule_total_hours;
          client_hour_rate = el?.price_list_saturday_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_saturday_rate_code || el?.price_list_standard_rate_code;
        }

        else if(el?.client_service_schedule_shift_rate?.toLowerCase().match('sunday')){
          employee_hour_rate = el?.employee_pay_rate_sunday_rate || 0;
          approved_total_cost = employee_hour_rate * el?.client_service_schedule_total_hours;
          client_hour_rate = el?.price_list_sunday_rate || standard_hour_rate
          approved_support_item_number = el?.price_list_sunday_rate_code || el?.price_list_standard_rate_code;
        }
      }
      
      let subTotal = (client_hour_rate * approved_total_hrs) 
      let total = this.calculateTotalByRateType(el?.client_service_schedule_rate_type, subTotal, client_hour_rate)

      let client_main_total = total
        + el?.client_service_schedule_service_fee
        + el?.client_service_schedule_travel_total
        + el?.client_service_schedule_expenses_total

      return {
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
        // shift_rate
        // approved_total_cost // for employee
      }
    })
  }

  private calculateTotalByRateType(rate_type, subTotal, price): number{

    let totalPrice:number = 0

    if(rate_type == 'Hourly Rate') totalPrice = subTotal;
    else if(rate_type === 'Per Day') totalPrice = subTotal/24; 
      else if(rate_type === 'Per Week') totalPrice = subTotal/168;
        else if(rate_type === 'Per Year') totalPrice = subTotal/8760;  
          else totalPrice = price;
          
    return +totalPrice
  }
  back(){
    this.location.back();
  }

  filterByRole(role:string){
    //
    this.filterRole = role
    this.loading = true
    let timesheetList:EmployeeTimesheet[] = []
    if(!role){
      timesheetList = [...this.timesheetApprovalListOriginal]
    }else{
      timesheetList = [...this.timesheetApprovalListOriginal].filter((res:EmployeeTimesheet) => res.employee_position_name == role)
    }
    if(timesheetList.length <= 0){
      this.snackBar.open(`No record for ${role}`, "", {
        duration: 4000,
        panelClass: 'success-snackbar'
      });
    }
    this.timesheetApprovalList = timesheetList
    setTimeout(() => {
      this.loading = false
    }, 400);
  }

  public toggleRoleFilter():void{
    this.showRoles = !this.showRoles
    if(this.timesheetApprovalList.length <= 0) {
      this.filterByRole(null)
    }
  }
}

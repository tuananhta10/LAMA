import { Component, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ViewFundingClaimComponent } from '../view-funding-claim/view-funding-claim.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  GenerateClaim,
  generatedClaimList
} from '../../../client-funding-claims/utils/client-funding-claims-model-interface';
import { TimesheetApprovalActionTypes } from '@main/views/admin-panel/store/actions/admin-timesheet-approval.action';
import { format } from 'date-fns';
import { FundingClaimActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-claim.action';
import { ViewGeneratedClaimSchedulesComponent } from '../view-generated-claim-schedules/view-generated-claim-schedules.component';
import { InvoiceBatchActionTypes } from '@main/views/admin-panel/store/actions/admin-invoice-batch.action';

@Component({
  selector: 'app-generate-invoice-batch',
  templateUrl: './generate-invoice-batch.component.html',
  styleUrls: ['./generate-invoice-batch.component.scss']
})
export class GenerateInvoiceBatchComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public fundingClaimForm!: FormGroup;
  public required:boolean = true;

  public invoiceBatchEnum: any[] = [];
  public loading: boolean = true;
  public step: number = 1;
  public approveTimeSheets: any[] = [];
  public displayedColumns = [
    { col_name: 'id', title: 'ID' },
    
    { col_name: 'employee_timesheet_id', title: 'Timesheet ID' },
    { col_name: 'client_name', title: 'Participant Name' },
    { col_name: 'employee_name', title: 'Employee Name' },
    { col_name: 'client_service_schedule_id', title: 'Service Schedule ID' },
    { col_name: 'time_in', title: 'Time In' },
    { col_name: 'time_out', title: 'Time Out' },
    { col_name: 'calendar_schedule', title: 'Calendar Schedule' },
    { col_name: 'client_service_schedule_type', title: 'Service Type' },
    { col_name: 'client_service_schedule_approved_total_hours', title: 'Total Hours' },
    { col_name: 'client_service_schedule_support_item_number', title:'Support Item Number'},
    { col_name: 'service_type_support_item_name', title: 'Support Item Name' },
    { col_name: 'client_service_schedule_approved_client_total_cost', title: 'Claim Total', type: 'currency' },
    { col_name: 'approved', title: 'Approved' },
    { col_name: 'employee_timesheet_paid', title: 'Paid' },
    { col_name: 'action', title: 'Details' },
  ];

  public selectedColumns: string[] =  [
    'id',
    'client_name',
    'client_service_schedule_approved_total_hours', 
    'client_service_schedule_approved_client_total_cost',
    'action'
  ];

  public searchSource: any = (el) => {
    return {
      client_service_schedule_type: el.client_service_schedule_type,
      service_type_support_item_name: el.service_type_support_item_name,
      client_service_schedule_total_hours: el.client_service_schedule_total_hours,
      client_service_schedule_client_total: el.client_service_schedule_client_total,
    }
  }
  public fundingSourceEnum: any[] = [];
  private enum$: any;  
  private clientFundingData$: any;
  private req: Subscription;
  private timesheetApprovalReq: Subscription;
  private generatedClaimList: GenerateClaim[] = [...generatedClaimList];
  private timesheetApprovalData$ = this.adminEnumStore.pipe(select(state => state.timesheetApproval));
  
  constructor(
    public dialogRef: MatDialogRef<GenerateInvoiceBatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    private adminEnumStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private excelService: ExcelDownloaderService,
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    this.adminEnumStore.dispatch({
      type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST
    });

    this.adminEnumStore.dispatch({
      type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL
    });

    this.fundingClaimForm = this.formBuilder.group({
      funding_source: [''],  
      start_date: [''],  
      end_date: ['']
    });

    // update step if value changes
    this.fundingClaimForm.valueChanges
    .subscribe((values) => {
      this.step = 1;
    });

    this.subscribeEnums();
    this.subscribeTimesheet();
  }

  ngOnDestroy(): void{
    if(this.req) this.req.unsubscribe();
    this.approveTimeSheets = []
  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
    this.req = this.enum$.subscribe((results: any) => {
      if(results.fundingSource.fundingSourceList){
        results.fundingSource.fundingSourceList.forEach(element => {
          element.name = element.code
        });
        this.fundingSourceEnum = results.fundingSource.fundingSourceList.filter(el => el.self_funded)
      }

      this.loading = results.fundingSource.pending;
    });
  }

  subscribeTimesheet(){
    this.req = this.timesheetApprovalData$.subscribe((timesheetApproval: any) => {
      this.loading = timesheetApproval?.pending;

      if(timesheetApproval?.approvedTimesheets.length > 0){
        timesheetApproval.approvedTimesheets.forEach(el => {
          el.approved = true;
        })
        
        this.approveTimeSheets = timesheetApproval.approvedTimesheets;
      }else{
        this.approveTimeSheets = []
      }

      if(timesheetApproval?.generated_claim?.data?.length > 0){
        let dataInvoice = timesheetApproval?.generated_claim?.data[0]; 

        this.dialogRef.close();

        // refresh list
        this.adminEnumStore.dispatch({
          type: InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST
        });

        // send message
        setTimeout(() => {
          if(dataInvoice){
            
            this.snackBar.open("Successfully generated self-funded invoice batches. Please refresh the list if the new invoice batch items was not loaded.", "", {
              duration: 4000,
              panelClass:'success-snackbar'
            });
          }
        }, 2000);
        
      }
    });
  }

  viewGeneratedClaimSchedule(event){
    console.log(event)
    let viewFundingClaim = this.dialog.open(
      ViewGeneratedClaimSchedulesComponent,
      {
        minWidth: '75vw',
        data: event?.data
      }
    );
  }

  close(): void  {
    this.dialogRef.close(null);
  }

  // Get approved timesheets after clicking next 
  getApprovedTimesheets(){
    let funding_source = this.fundingClaimForm.controls['funding_source'].value;
    let range_start = convertTimestampUtc(new Date(this.fundingClaimForm.controls['start_date'].value));
    let range_end = convertTimestampUtc(new Date(this.fundingClaimForm.controls['end_date'].value));

    let body = {
      funding_source_code: funding_source?.name?.toLowerCase(),
      range_start: range_start,  
      range_end: range_end,
      type:'invoice_batch'
    }

    this.step = 2;  
    this.adminEnumStore.dispatch({
      type: TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET,
      payload: body
    });
  }

  // Generate Invoice Batches
  generateInvoiceBatch(): void {
    if(this.fundingClaimForm.valid){
      let funding_source = this.fundingClaimForm.controls['funding_source'].value;
      let start_date = new Date(this.fundingClaimForm.controls['start_date'].value);
      let end_date = new Date(this.fundingClaimForm.controls['end_date'].value);
      let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));
      let scheduleGroups = this.selectedRowForInvoice.map((el) => el?.invoice_batch);

      // Request body for generating an invoice
      let body = {
        type: "Invoice Batch",
        name: `${funding_source?.name} - ${start_date.toLocaleDateString()} to ${end_date.toLocaleDateString()}`, 
        funding_source_id: funding_source?.id ,  
        employee_id: "",  
        start_date: convertTimestampUtc(start_date),  
        end_date: convertTimestampUtc(end_date),
        total_hours: this.selectedRowForInvoice.map(el => el.client_service_schedule_approved_total_hours * 1).reduce((a,b) => a + b, 0),  
        total_amount: this.selectedRowForInvoice.map(el => el.client_service_schedule_approved_client_total_cost * 1).reduce((a,b) => a + b, 0),  
        "invoice-batch": {
          add: scheduleGroups.flat()
        }
      }

      // uncomment if cors is fixed
      this.adminEnumStore.dispatch({
        type: TimesheetApprovalActionTypes.GENERATE_CLAIM,
        payload: body
      });
    }
  }

  public selectedRowForInvoice: any[] = [];

  // get selected rows
  getSelectedRows(data){
    this.selectedRowForInvoice = data?.selectedRows;
    console.log(data)
  }

}

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { 
  GenerateClaim,
  generatedClaimList
} from '../../../client-funding-claims/utils/client-funding-claims-model-interface';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientInvoiceActionTypes } from '@main/views/admin-panel/store/actions/admin-client-invoice.action';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  select,
  Store
} from '@ngrx/store';
import { format } from 'date-fns';
import { ViewInvoicesComponent } from '../../../client-details/dialogs/view-invoices/view-invoices.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
import { PrintInvoiceBatchComponent } from '../print-invoice-batch/print-invoice-batch.component';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { DecimalPipe } from '@main/shared/pipes/decimal.pipe';

@Component({
  selector: 'app-view-invoice-batch',
  templateUrl: './view-invoice-batch.component.html',
  styleUrls: ['./view-invoice-batch.component.scss']
})
export class ViewInvoiceBatchComponent implements OnInit {
  private clientInvoice$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public fundingClaimForm!: FormGroup;
  public required:boolean = true;
  public invoiceBatchEnum: any[] = [];
  private generatedClaimList: GenerateClaim[] = [...generatedClaimList];
  public stepper: number = 1;
  public loading: boolean = true; 
  public linkInvoice: boolean = false;  
  public linkServiceTypes: boolean = false;
  public displayedColumns:any[] =  [
    //{ title: 'Invoice Id', col_name: 'invoice_item_id' }, 
    { title: 'Invoice Reference', col_name: 'invoice_batch_claim_reference' }, 
    { title: 'Invoice Date', col_name: 'invoice_batch_date_added' }, 
    { title: 'Client', col_name: 'client_name' },  
    { title: 'Claim Code', col_name: 'invoice_batch_support_item_number' },  
    { title: 'Funding Source', col_name: 'invoice_batch_funding_source_code' },  
    { title: 'Total Hours', col_name: 'invoice_batch_total_hours' }, 
    { title: 'Total Transport', col_name: 'invoice_batch_total_transport' }, 
    { title: 'Total Amount', col_name: 'invoice_batch_total_cost', type: 'currency' },  
    { title: 'Status', col_name: 'invoice_batch_status' },   
    { title: '', col_name: 'action'}     
  ];  

  public selectedColumns: any[] = [
    'invoice_batch_claim_reference',
    'client_name',
    'invoice_batch_date_added', 
    'invoice_batch_support_item_number', 
    'invoice_batch_funding_source_code',
    'invoice_batch_total_hours',
    'invoice_batch_total_cost',
    'invoice_batch_total_transport',
    'invoice_batch_status',
    'action'
  ];
  public searchSource: any = (el) => {
    return {
      id: el.id,
      client_name: el.client_name,
    }
  }
  public invoiceItems: any[] = []
  public invoiceData: any;
  public employeeQualifications: any ={
    add: [],
    delete: []
  }
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewInvoiceBatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private clientStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private excelService: ExcelDownloaderService,
    private decimalPipe:DecimalPipe
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    this.getInvoices();
    this.subscribeToInvoice();  

    let timeCreated = new Date(this.data?.invoice_date_added_time_stamp * 1000);
    
    timeCreated.getHours(); // => 9
    timeCreated.getMinutes(); // =>  30
    timeCreated.getSeconds();

    // generate form
    this.fundingClaimForm = this.formBuilder.group({
      invoice_name: [this.data ? this.data?.invoice_name : ''],  
      start_date: [this.data ? new Date(this.data?.invoice_start_date * 1000) : ''],  
      end_date: [this.data ? new Date(this.data?.invoice_end_date* 1000) : ''],
      created_by: [this.data ? this.data?.created_by : ''],
      invoice_date_added: [this.data ? new Date(this.data?.invoice_date_added_time_stamp * 1000) : ''],
      time_created: [this.data ? timeCreated : ''],
      invoice_type: [this.data ? this.data?.invoice_type : ''],
      funding_source_code: [this.data ? this.data?.funding_source_code : ''],
      invoice_batch: [this.data ? this.data?.invoice_batch : ''],
      invoice_total_hours: [this.data ? this.data?.invoice_total_hours : ''],
      invoice_total_amount: [this.data ? this.decimalPipe.transform(this.data?.invoice_total_amount)  : ''],
    });
  }

  close(): void  {
    this.dialogRef.close(null);
  }

  printInvoiceBatch(): void {
    let viewInvoice = this.dialog.open(
      PrintInvoiceBatchComponent,
      {
        minWidth: '60vw',
        minHeight: '70vh',
        maxHeight: '96vh',
        data: { 
          invoice_batch: this.data,  
          invoice_batch_item: this.invoiceItems
        }
      }
    );

    viewInvoice
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });

    // exit current dialog
    this.dialogRef.close();
  }

  subscribeToInvoice(){
    this.req = this.clientInvoice$.subscribe((results: any) => {
      console.log(results?.clientInvoiceItems)
      this.loading = results?.pendingInvoiceItem;
      
      if(results?.clientInvoiceItems?.invoice_batch?.length > 0){
        this.invoiceData = results?.clientInvoiceItems;

        const items = AdminHelper.deepCopy(results)
        // add temporary generated invoice name
        items?.clientInvoiceItems?.invoice_batch.forEach((el) => {
          el['invoice_name'] = `${el?.invoice_batch_support_item_number?.substr(0,6) || '000-00'}-${el?.client_name}`;
          el['invoice_batch_total_transport'] = el?.invoice_batch_invoice_total_transport
          //el['invoice_batch_date_added'] = new Date(el?.invoice_batch_date_added * 1000)
          //el['invoice_batch_claim_reference'] = `${el?.invoice_batch_id}_${el?.invoice_batch_claim_reference}`
        });

        this.invoiceItems = items?.clientInvoiceItems?.invoice_batch;
      }else{
        this.invoiceItems = []
      }
    });
  }

  getInvoices(): void {
    this.clientInvoice$ = this.clientStore.pipe(select(state => state.clientInvoice));
    this.clientStore.dispatch({
      type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE,
      payload: {
        id: this.data?.invoice_id
      }
    });
  }

  deleteDataDialog (event) {
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
          console.log(result)
          let ids = result?.data?.length > 0
            ? [...result?.data.map(res => res?.invoice_batch_id)]
            : [result?.data?.invoice_batch_id] 
          
          if(result){
            this.deleteInvoiceStore(
              {
                id:ids,
                invoice_id:this.data?.invoice_id
              }
            )
            this.snackBar.open(`Successfully deleted invoice item`, '', {
              duration: 4000,
              panelClass: 'success-snackbar'
            });
          }
        });
    }
  }

  deleteInvoiceStore(body:any){
    this.clientStore.dispatch({
      type: ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE,
      payload: body,
    });
    this.dialogRef.close();

  }

  openLinkInvoice(event){
    if(!this.linkInvoice) this.linkInvoice = true;
  }

  // export generated claim
  exportGeneratedClaim(arrayData?: any):void {
    let data: any[] = [...this.invoiceItems].map(el => {
      return {
        "RegistrationNumber": el?.invoice_batch_ndis_number, // funding source registration number
        "NDISNumber":el?.invoice_batch_registration_number, // participant registration number
        "SupportsDeliveredFrom": format(AdminHelper.dateGmt(el?.invoice_batch_service_start_date), 'dd/MM/yyyy'),
        "SupportsDeliveredTo": format(AdminHelper.dateGmt(el?.invoice_batch_service_end_date), 'dd/MM/yyyy'),
        "SupportNumber": el?.invoice_batch_support_item_number, 
        "ClaimReference": el?.invoice_batch_claim_reference, 
        "Quantity": el?.invoice_batch_total_hours,  
        "Hours": "",  
        "UnitPrice": el?.invoice_batch_unit_price,
        "GSTCode": "P2",  
        "AuthorisedBy": "",
        "ParticipantApproved": "",
        "InKindFundingProgram": "",
        "ClaimType":  "",
        "CancellationReason": "",
        "ABN of Support Provider": el?.invoice_organization_abn || '',
        "Transport": el?.invoice_batch_invoice_total_transport,
      }
    });

    this.excelService.exportAsExcelFile(data, `Self-Funded Claim: ${this.data?.invoice_name}`);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
    this.dialogRef.close();
  }

  openAddInvoicesModal(data?: any) {
    let viewInvoiceDialog = this.dialog.open(
      ViewInvoicesComponent,
      {
        minWidth: '40vw',
        data: data?.data
      }
    );

    viewInvoiceDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data){
          this.snackBar.open(`Invoice item is currently being updated. This might take a while...`, '', {
            duration: 4000,
            panelClass: 'success-snackbar'
          });

          this.clientStore.dispatch({
            type: ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE,
            payload: result?.data
          });

          this.loading = true;
        }
      });
  }
}

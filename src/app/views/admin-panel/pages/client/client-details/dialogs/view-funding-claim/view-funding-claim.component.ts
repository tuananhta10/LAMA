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
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@main/shared/pipes/decimal.pipe';

@Component({
  selector: 'app-view-funding-claim',
  templateUrl: './view-funding-claim.component.html',
  styleUrls: ['./view-funding-claim.component.scss']
})
export class ViewFundingClaimComponent implements OnInit {
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
    { title: 'Claim Reference', col_name: 'invoice_batch_claim_reference' },
    { title: 'Invoice Date', col_name: 'invoice_batch_date_added' },
    { title: 'Participant', col_name: 'client_name' },
    { title: 'Claim Code', col_name: 'invoice_batch_support_item_number' },
    { title: 'Funding Source', col_name: 'invoice_batch_funding_source_code' },
    { title: 'Total Hours', col_name: 'invoice_batch_total_hours' },
    { title: 'Total Transport', col_name: 'invoice_batch_invoice_total_transport' },
    { title: 'Total Amount', col_name: 'invoice_batch_total_cost', type: 'currency' },
    { title: 'Status', col_name: 'invoice_batch_status' },
    { title:'Registration Number', col_name:'invoice_batch_registration_number' },
    { title: '', col_name: 'action'}
  ];
  public selectedColumns: any[] = [
    'invoice_batch_claim_reference',
    'client_name',
    'invoice_batch_date_added',
    'invoice_batch_support_item_number',
    'invoice_batch_funding_source_code',
    'invoice_batch_total_hours',
    'invoice_batch_invoice_total_transport',
    'invoice_batch_total_cost',
    'invoice_batch_status',
    'invoice_batch_registration_number',
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
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  constructor(
    public dialogRef: MatDialogRef<ViewFundingClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    private clientStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private excelService: ExcelDownloaderService,
    private datePipe:DatePipe,
    private decimalPipe:DecimalPipe
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    this.getInvoices();
    this.subscribeToInvoice();

    let timeCreated = new Date(this.data?.invoice_date_added * 1000)
    timeCreated.getHours(); // => 9
    timeCreated.getMinutes(); // =>  30
    timeCreated.getSeconds();

    // generate form
    this.fundingClaimForm = this.formBuilder.group({
      invoice_name: [this.data ? this.data?.invoice_name : ''],
      start_date: [this.data ? new Date(this.data?.invoice_start_date * 1000) : ''],
      end_date: [this.data ? new Date(this.data?.invoice_end_date* 1000) : ''],
      created_by: [this.data ? this.data?.created_by : ''],
      invoice_date_added: [this.data ? new Date(this.data?.invoice_date_added * 1000) : ''],
      time_created: [this.data ? timeCreated : ''],
      invoice_type: [this.data ? this.data?.invoice_type : ''],
      funding_source_code: [this.data ? this.data?.funding_source_code : ''],
      invoice_batch: [this.data ? this.data?.invoice_batch : ''],
      invoice_total_hours: [this.data ? this.data?.invoice_total_hours : ''],
      invoice_total_amount: [this.data ? +this.decimalPipe.transform(+this.data?.invoice_total_amount)  : ''],
    });
  }

  close(): void  {
    this.dialogRef.close(null);
  }

  save(): void {
    if(this.invoiceItems?.length > 0){
      this.exportGeneratedClaim();
    }
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
          el['invoice_batch_date_added'] = new Date(el?.invoice_batch_date_added * 1000)
          //el['invoice_batch_claim_reference'] = `${el?.invoice_batch_id}_${el?.invoice_batch_claim_reference}`
        });

        this.invoiceItems = items?.clientInvoiceItems?.invoice_batch;
      }
    });
  }

  getInvoices(): void {
    this.clientInvoice$ = this.clientStore.pipe(select(state => state.clientInvoice));

    console.log("GET CLIENT INVOICE ITEMS");

    this.clientStore.dispatch({
      type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE,
      payload: {
        id: this.data?.invoice_id
      }
    });
  }

   openAddInvoicesModal(data?: any) {
    console.log(data)
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
  }

  openLinkInvoice(event){
    if(!this.linkInvoice) this.linkInvoice = true;
  }

  // export generated claim
  exportGeneratedClaim(arrayData?: any):void {
    const invoiceItems = [...this.invoiceItems]
    invoiceItems.forEach(res => {

      let invoicesWithTransport = res.invoice_batch_detail.filter(el => el.service_type_support_item_name === 'Activity Based Transport' || el.client_service_schedule_is_transport)
      let invoicesWithTravel = res.invoice_batch_detail.filter(el => el.client_service_schedule_is_travel)
      // let invoicesWithNoTravel = res.invoice_batch_detail.filter(el => !el.client_service_schedule_is_travel)
      let invoicesWithTravelTime = res.invoice_batch_detail.filter(el => el.service_type_support_item_name === 'Travel Time' || el.client_service_schedule_is_travel_time)
      let invoicesWithChargeCancellation = res.invoice_batch_detail.filter(el => el.client_service_schedule_charge_to_client === true)

      if(invoicesWithTransport.length > 0){
        let totalTransport:number = 0
        let tempData = Object.assign({}, res)
        invoicesWithTransport.map(_res => {
          totalTransport += _res.invoice_item_approved_client_total_cost
          tempData.invoice_batch_unit_price = _res.invoice_item_approved_client_total_cost 
          tempData.invoice_batch_support_item_number = _res.client_service_schedule_approved_support_item_number
          tempData.client_service_schedule_is_transport = _res.client_service_schedule_is_transport

        })
        tempData.invoice_batch_total_hours = +totalTransport
        invoiceItems.push(tempData)
      }
      if(invoicesWithTravel.length > 0){
        let totalTravel: number = 0
        let tempData = Object.assign({}, res)

        invoicesWithTravel.map(_res => {
          totalTravel += _res.invoice_item_approved_client_total_cost
          tempData.invoice_batch_unit_price = _res.invoice_item_approved_client_total_cost 
          tempData.invoice_batch_support_item_number = _res.client_service_schedule_approved_support_item_number
          tempData.client_service_schedule_is_travel = _res.client_service_schedule_is_travel
        })
        tempData.invoice_batch_total_hours = +totalTravel
        invoiceItems.push(tempData)
      }

      // if(invoicesWithNoTravel.length > 0){
      //   invoicesWithNoTravel.map(_res => {
      //     if(!_res.client_service_schedule_is_travel){
      //       res['invoice_batch_total_hours'] = _res.client_service_schedule_approved_total_hours
      //     }
      //   })
      // }

      if(invoicesWithTravelTime.length > 0){
        let totalTravelTime: number = 0
        let tempData = Object.assign({}, res)
        invoicesWithTravelTime.map(_res => {
          totalTravelTime += _res?.client_service_schedule_travel_hours
          tempData.invoice_batch_unit_price = _res.client_service_schedule_travel_time_rate
        })
        tempData.invoice_batch_total_hours = +totalTravelTime
        invoiceItems.push(tempData)
      }
      if(invoicesWithChargeCancellation.length > 0){
        invoicesWithChargeCancellation.map((data) => {
          invoiceItems.push(data)
        })
      }
    })
    let data: any[] = invoiceItems.map(el => {
      let startDateGmt = AdminHelper.dateGmt(new Date(el?.invoice_batch_service_start_date * 1000) ) 
      let endDateGmt = AdminHelper.dateGmt(new Date(el?.invoice_batch_service_end_date * 1000) ) 
      let start_date= this.datePipe.transform(startDateGmt,'yyyy-MM-dd')
      let end_date = format(new Date(endDateGmt), 'yyyy-MM-dd')

      // let start_date_final = start_date > end_date ? end_date : start_date,
      // end_date_final = start_date > end_date ? start_date : end_date

      let claimFile = {
        "RegistrationNumber": el?.invoice_batch_ndis_number || this.loggedUser?.organization_registration_number, // funding source registration number
        "NDISNumber":el?.invoice_batch_registration_number, // participant registration number
        "SupportsDeliveredFrom": AdminHelper.excelCellTextFormat(start_date, "YYYY-MM-DD"),
        "SupportsDeliveredTo": AdminHelper.excelCellTextFormat(start_date, "YYYY-MM-DD") ,
        "SupportNumber": el?.invoice_batch_support_item_number,
        "ClaimReference": AdminHelper.replaceSpaces(el?.invoice_batch_claim_reference, '_').substring(0, 20),
        "Quantity": +el?.invoice_batch_total_hours,
        "Hours": "",
        "UnitPrice": el?.invoice_batch_unit_price,
        "GSTCode": "P2",
        "AuthorisedBy": "",
        "ParticipantApproved": "",
        "InKindFundingProgram": "",
        "ClaimType":  this.setClaimType({
          charge: el.client_service_schedule_charge_to_client, 
          transport: el.client_service_schedule_is_transport, 
          travel: el.client_service_schedule_is_travel, 
          travel_time: el.client_service_schedule_is_travel_time
        }),
        "CancellationReason": el.client_service_schedule_charge_to_client ? "NSDO" : "",
        "ABN of Support Provider": el?.invoice_batch_organization_abn || ''
      }

      return claimFile;
    });

    let sortedData = data.sort((a,b) => {
      if(a['ClaimReference'] < b['ClaimReference']) return -1
      if(a['ClaimReference'] > b['ClaimReference']) return 1
      return 0
    })
    this.excelService.exportAsExcelFile(sortedData, `${this.data?.funding_source_code}_${this.data?.invoice_id
    }`  );
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
    this.dialogRef.close();
  }

  private setClaimType({charge,transport,travel,travel_time}){
    if(charge){
      if(travel){
        return "NF2F"
      }
      else if(travel_time || transport){
        return "TRAN"
      }
      else {
        return "CANC"
      }
    }
    
  }

}

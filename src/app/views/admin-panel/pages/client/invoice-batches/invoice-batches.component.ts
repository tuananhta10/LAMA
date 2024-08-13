import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
import {
  displayedColumns,
  TableHeader,
  InvoiceBatches,
  selectedColumns,
  invoiceBatchesList
} from './utils/invoice-batches-model-interface';
import { AddServiceScheduleComponent } from '../client-details/dialogs/add-service-schedule/add-service-schedule.component';
//import { AddInvoiceBatchesComponent } from '../client-details/dialogs/add-client-funding/add-client-funding.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { InvoiceBatchesActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { ViewInvoiceBatchComponent } from '../client-details/dialogs/view-invoice-batch/view-invoice-batch.component';
import { GenerateInvoiceBatchComponent } from '../client-details/dialogs/generate-invoice-batch/generate-invoice-batch.component';
import { InvoiceBatchState } from '@main/views/admin-panel/store/reducers/admin-invoice-batch.reducer';
import { InvoiceBatchActionTypes } from '@main/views/admin-panel/store/actions/admin-invoice-batch.action';
import { FundingClaimService } from '@main/shared/services/admin-panel/admin-funding-claim.service';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/invoice-batches-report-model-interface';
import { SyncToXeroActionTypes } from '@main/views/admin-panel/store/actions/admin-xero.action';
import { SyncDialogComponent } from '@main/shared/components/sync-dialog/sync-dialog.component';
import { SyncStatusDialogComponent } from '@main/shared/components/sync-status-dialog/sync-status-dialog.component';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';

@Component({
  selector: 'app-invoice-batches',
  animations: [mainAnimations],
  templateUrl: './invoice-batches.component.html',
  styleUrls: ['./invoice-batches.component.scss']
})
export class InvoiceBatchesComponent implements OnInit, OnDestroy {
  private invoiceBatches$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  private fundingClaimReq: Subscription;
  private xeroData$: any;

  public xeroItemsList: any;
  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public invoiceBatchesList: InvoiceBatches[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      invoice_id: el.invoice_id,
      invoice_name: el.invoice_name,
      funding_source_code: el.funding_source_code,
      invoice_type: el.invoice_type,
      created_by: el.created_by,
      invoice_total_hours: el.invoice_total_hours,
      invoice_total_amount: el.invoice_total_amount,
      status: el.status,
    }
  }

  constructor(private adminInvoiceBatches: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private fundingClaimService: FundingClaimService,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }


  ngOnInit(): void {
    this.invoiceBatches$ = this.adminInvoiceBatches.pipe(select(state => state.invoiceBatch));

    this.req = this.invoiceBatches$.subscribe((results: InvoiceBatchState) => {
      if(results?.invoiceBatchList.length > 0){
        let copyInvoiceBatchList = JSON.parse(JSON.stringify(results?.invoiceBatchList))
        this.invoiceBatchesList = AdminHelper.formatDate(copyInvoiceBatchList, this.displayedColumns)

        this.invoiceBatchesList.forEach((element, index) => {
          element['invoice_date_added_time_stamp'] = results?.invoiceBatchList[index]['invoice_date_added']
          element['invoice_name'] = this.invoiceNameFormatter(results?.invoiceBatchList[index]['invoice_name'])
        });
      }
      this.loading = results.pending 

      if(results?.success){
        this.snackBar.open(results.success, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });
        this.adminInvoiceBatches.dispatch({
          type: InvoiceBatchActionTypes.DELETE_INVOICE_BATCH_SUCCESS,
          payload:null
        })
        this.getInvoiceBatches()
      }
      if(results?.error){
        this.snackBar.open(results.error, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });
        this.adminInvoiceBatches.dispatch({
          type: InvoiceBatchActionTypes.DELETE_INVOICE_BATCH_FAIL,
          payload:null
        })
        this.getInvoiceBatches()
      }
    });

    this.getInvoiceBatches();
    this.detectXeroCode();
    this.subscribeToXero()
  }

  invoiceNameFormatter(invoice:any){

    const dateFormatter = (date) => {
      var parts = date.split('/');
      var formattedDate = parts[1] + '/' + parts[0] + '/' + parts[2];
      return formattedDate;
    }

    let splitted = invoice.split(' ')

    return `${splitted[0]} ${splitted[1]} ${dateFormatter(splitted[2])} ${splitted[3]} ${dateFormatter(splitted[4])}`
  }

  // SYNC TO XERO CODE
  subscribeToXero(){
    this.xeroData$ = this.adminInvoiceBatches.pipe(select(state => state.syncToXero))
    this.req = this.xeroData$.subscribe((syncToXero: any) => {
      // this.loading = syncToXero.pending;

      if (syncToXero.syncToXeroListProgress.length > 0) {
        this.xeroItemsList = syncToXero.syncToXeroListProgress;
      }

      if (syncToXero.success) {
        if (syncToXero.success.data.error.length === 0) {
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

        this.adminInvoiceBatches.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: null,
        });

        this.adminInvoiceBatches.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: null,
        });

        // this.getXeroProgress();
      }

      if (syncToXero.error) {
        this.snackBar.open(
          'Something went wrong please try again later or contact your administrator',
          '',
          {
            duration: 4000,
            panelClass: 'danger-snackbar',
          }
        );

        this.adminInvoiceBatches.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS,
          payload: null,
        });

        this.adminInvoiceBatches.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL,
          payload: null,
        });
      }
    });
  }

  showErrorSync(data:any){

    if(this.invoiceBatchesList.length === 0) return
    const filteredData = this.invoiceBatchesList.filter(item => data.includes(item.id));
    this.syncToXeroStatusDialog(filteredData)

  }

  private syncToXeroStatusDialog(data:any){
    let syncToXeroStatusModal = this.dialog.open(
      SyncStatusDialogComponent,
      { 
        minWidth: '30vw',
        data: {list:data, type:'invoice'},
      },
    );

    syncToXeroStatusModal
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        console.log('Sync To Xero Status Dialog Closed');
      })
  }

  getXeroProgress() {
    this.adminInvoiceBatches.dispatch({
      type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST
    }); 
  }

  syncToXeroDialog(){
    this.router.navigate(['/admin/setup/sync-data'])

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
    //       model: "invoice"
    //     }

    //     this.adminInvoiceBatches.dispatch({
    //       type: SyncToXeroActionTypes.SYNC_TO_XERO,
    //       payload: body
    //     }); 
        
    //     console.log(body)
    //   }
    // });
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

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
    if(this.fundingClaimReq) this.fundingClaimReq.unsubscribe();
  }


  convertToDate(dateTime) {
    return new Date(dateTime * 1000)
  }

  getInvoiceBatches(): void {
    this.adminInvoiceBatches.dispatch({
      type: InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST
    });
    
  }

  editDataDialog(event) {
    if (event) {
      this.openAddInvoiceBatchModal(event?.data);
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
        maxHeight: '96vh',
        maxWidth: '98vw',
        data: {
          data_list: this.invoiceBatchesList,  
          title: "Generate Invoice Batches Report",
          sub_title: "Invoice Batches",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Date Created',
          dateSearch: {
            dateFrom: 'Date Created',  
            dateTo: 'Date Created'
          }
        },
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
          if(!result.cancel){
            let reqBody = [result?.data?.invoice_id || event?.data?.id ]

            this.adminInvoiceBatches.dispatch({
              type: InvoiceBatchActionTypes.DELETE_INVOICE_BATCH,
              payload: reqBody
            });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", result?.data, event)
          }
        });
    }
  }

  openAddInvoiceBatchModal(data?: any) {
    let viewInvoiceBatch = this.dialog.open(
      ViewInvoiceBatchComponent,
      {
        minWidth: '45vw',
        maxWidth: '95vw',
        data: data
      }
    );
  }

  generateInvoiceBatch(data?: any){
    let generateFundingClaim = this.dialog.open(
      GenerateInvoiceBatchComponent,
      {
        minWidth: '60vw',
        data: data
      }
    );
  }

  importInvoiceBatches(data?: any){
    let uploadDialog = this.dialog.open(
      FileUploadModalComponent,
      { 
        minWidth: '30vw',
        data: {
          fileType: '.csv',
          fileTypeArray: ['.csv']
        },
      }
    );

    uploadDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      /*if(result){

        let data = {
          endpoint: 'client-funding',
          delete: true,
          attachment: result
        }

        this.adminInvoiceBatches.dispatch({
          type: InvoiceBatchesActionTypes.UPLOAD_CLIENT_FUNDING,
          payload: data
        }); 
      }*/
    });
  }

  importRemittance(data?: any): void{
    let uploadDialog = this.dialog.open(
      FileUploadModalComponent,
      { 
        minWidth: '30vw',
        data: {
          fileType: '.csv',
          fileTypeArray: ['.csv']
        },
      }
    );
  }

}

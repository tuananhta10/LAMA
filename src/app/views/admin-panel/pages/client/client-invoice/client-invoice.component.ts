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
  Invoices,
  selectedColumns,
  invoicesList
} from './utils/client-invoice-model-interface';
//import { AddInvoicesComponent } from '../client-details/dialogs/add-client-funding/add-client-funding.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { InvoicesActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { ViewInvoicesComponent } from '../client-details/dialogs/view-invoices/view-invoices.component';
import { ClientInvoiceState } from '@main/views/admin-panel/store/reducers/admin-client-invoice.reducer';
import { ClientInvoiceActionTypes } from '@main/views/admin-panel/store/actions/admin-client-invoice.action';
import { FundingClaimService } from '@main/shared/services/admin-panel/admin-funding-claim.service';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/client-invoice-report-model-interface';
import { SyncToXeroActionTypes } from '@main/views/admin-panel/store/actions/admin-xero.action';
import { SyncDialogComponent } from '@main/shared/components/sync-dialog/sync-dialog.component';
import { SyncStatusDialogComponent } from '@main/shared/components/sync-status-dialog/sync-status-dialog.component';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';

@Component({
  selector: 'app-client-invoice',
  animations: [mainAnimations],
  templateUrl: './client-invoice.component.html',
  styleUrls: ['./client-invoice.component.scss']
})
export class ClientInvoiceComponent implements OnInit,OnDestroy {
  private clientInvoice$: any;
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
  public invoicesList: Invoices[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      invoice_batch_claim_reference: el.invoice_batch_claim_reference,
      invoice_name: el.invoice_name,
      client_name: el.client_name,
      invoice_batch_funding_source_code: el.invoice_batch_funding_source_code,
      invoice_batch_support_item_number: el.invoice_batch_support_item_number,
      invoice_batch_date_added: el.invoice_batch_date_added,
      invoice_batch_total_hours: el.invoice_batch_total_hours,
      invoice_batch_total_cost: el.invoice_batch_total_cost,
      invoice_batch_status: el.invoice_batch_status,
      //status: el.status,
    }
  }

  constructor(private adminInvoices: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private fundingClaimService: FundingClaimService,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.clientInvoice$ = this.adminInvoices.pipe(select(state => state.clientInvoice));

    this.req = this.clientInvoice$.subscribe((results: ClientInvoiceState) => {
      if(results?.clientInvoiceList?.length > 0){
        results?.clientInvoiceList.forEach(el => {
          //el['invoice_batch_claim_reference'] = `${el?.invoice_batch_id}_${el?.invoice_batch_claim_reference}`
          //el['invoice_number'] = `${el?.invoice_batch_support_item_number?.substr(0,6) || '000-00'}-${el?.client_name}`;
        });
        let copyInvoiceList = JSON.parse(JSON.stringify(results?.clientInvoiceList))
        this.invoicesList = AdminHelper.formatDate(copyInvoiceList,this.displayedColumns)

        this.invoicesList.forEach((element, index) => {
          element['invoice_date_added_time_stamp'] = results?.clientInvoiceList[index]['invoice_date_added']
        });
      }
      
      if(results?.success){
        this.snackBar.open(results?.success, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });

        this.adminInvoices.dispatch({
          type:ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE_SUCCESS,
          payload:null
        })
        this.getInvoices()
      }

      if(results?.error){
        this.adminInvoices.dispatch({
          type:ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE_FAIL,
          payload:null
        })
        this.getInvoices()

      }

      this.loading = results?.pending;
    });

    this.getInvoices();
    this.detectXeroCode();
    this.subscribeToXero()
  }

  // SYNC TO XERO CODE
  subscribeToXero(){
    this.xeroData$ = this.adminInvoices.pipe(select(state => state.syncToXero))
    this.req = this.xeroData$.subscribe((syncToXero: any) => {
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

        this.adminInvoices.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: null,
        });

        this.adminInvoices.dispatch({
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

        this.adminInvoices.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS,
          payload: null,
        });

        this.adminInvoices.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL,
          payload: null,
        });
      }
    });
  }

  showErrorSync(data:any){

    if(this.invoicesList.length === 0) return
    const filteredData = this.invoicesList.filter(item => data.includes(item.invoice_id));
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
    this.adminInvoices.dispatch({
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
    //       model: "invoice"
    //     }

    //     this.adminInvoices.dispatch({
    //       type: SyncToXeroActionTypes.SYNC_TO_XERO,
    //       payload: body
    //     }); 
        
    //     console.log(body)
    //   }
    // });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
    if(this.fundingClaimReq) this.fundingClaimReq.unsubscribe();
  }

  // detect xero code
  detectXeroCode(){
    let code = this.router.url.split('?code=')[1];

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


  convertToDate(dateTime) {
    return new Date(dateTime * 1000)
  }

  getInvoices(): void {
    this.adminInvoices.dispatch({
      type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST
    });
  }

  editDataDialog(event) {
    if (event) {
      this.openAddInvoicesModal(event?.data);
    }
  }

  // delete event emitter
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
          this.deleteInvoiceStore(
            {id:[result?.data]}
          )
        });
    }
  }

  deleteInvoiceStore(body:any){
    this.adminInvoices.dispatch({
      type: ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE,
      payload: body,
    });
  }

  openAddInvoicesModal(data?: any) {
    console.log("OPENNING INVOICE")
    let viewInvoiceDialog = this.dialog.open(
      ViewInvoicesComponent,
      {
        minWidth: '40vw',
        data: data
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

          this.adminInvoices.dispatch({
            type: ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE,
            payload: result?.data
          });
        }
      });
  }

  importInvoices(){
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

        this.adminInvoices.dispatch({
          type: InvoicesActionTypes.UPLOAD_CLIENT_FUNDING,
          payload: data
        }); 
      }*/
    });
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
        data: {
          data_list: this.invoicesList,  
          title: "Generate Participant Invoice Report",
          sub_title: "Participant Invoice",
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

}

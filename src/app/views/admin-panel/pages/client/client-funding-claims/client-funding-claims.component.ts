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
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState } from '@app-admin-store/reducers/admin-clients.reducer';
import {
  displayedColumns,
  TableHeader,
  ClientFundingClaim,
  selectedColumns,
  clientFundingClaimList
} from './utils/client-funding-claims-model-interface';
import { AddServiceScheduleComponent } from '../client-details/dialogs/add-service-schedule/add-service-schedule.component';
//import { AddClientFundingClaimComponent } from '../client-details/dialogs/add-client-funding/add-client-funding.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FundingClaimActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-claim.action';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { ViewFundingClaimComponent } from '../client-details/dialogs/view-funding-claim/view-funding-claim.component';
import { GenerateFundingClaimComponent } from '../client-details/dialogs/generate-funding-claim/generate-funding-claim.component';
import { environment } from 'src/environments/environment';
import { FundingClaimService } from '@main/shared/services/admin-panel/admin-funding-claim.service';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/client-funding-claims-report-model-interface';
import { SyncToXeroActionTypes } from '@main/views/admin-panel/store/actions/admin-xero.action';
import { SyncDialogComponent } from '@main/shared/components/sync-dialog/sync-dialog.component';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
import { format } from 'date-fns';
import { ExcelDownloaderService } from '@main/shared/services/excel/excel-downloader.service';
import moment from 'moment';

@Component({
  selector: 'app-client-funding-claims',
  animations: [mainAnimations],
  templateUrl: './client-funding-claims.component.html',
  styleUrls: ['./client-funding-claims.component.scss']
})
export class ClientFundingClaimsComponent implements OnInit, OnDestroy {
  private xeroData$: any;
  private clientFundingData$: any;
  private req: Subscription;
  private fundingClaimReq: Subscription;
  private unsubscribe$ = new Subject<void>();

  public xeroItemsList: any;
  public env: any = environment;
  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public clientFundingClaimList: ClientFundingClaim[] = [];
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

  private enum$: any;  
  private fundingClaimData$ = this.adminClientFundingClaim.pipe(select(state => state.fundingClaim));
  private isExportClaim:boolean = false;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  constructor(private adminClientFundingClaim: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private fundingClaimService: FundingClaimService,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getFundingClaimList()

    this.subscribeEnums();
    this.detectXeroCode();
  }

  private getFundingClaimList():void{
    this.adminClientFundingClaim.dispatch({
      type: FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
    if(this.fundingClaimReq) this.fundingClaimReq.unsubscribe();
  }

  // SYNC TO XERO CODE
  subscribeToXero(){
    this.req = this.xeroData$.subscribe((syncToXero: any) => {
      this.loading = syncToXero.pending;

      if (syncToXero.xeroItemsList.length > 0) {
        this.xeroItemsList = syncToXero.syncToXeroListProgress;
      }

      if (syncToXero.success) {
        this.snackBar.open(syncToXero.success, '', {
          duration: 4000,
          panelClass: 'success-snackbar',
        });

        this.adminClientFundingClaim.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: { message: null },
        });

        this.adminClientFundingClaim.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: { message: null },
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

        this.adminClientFundingClaim.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS,
          payload: null,
        });

        this.adminClientFundingClaim.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL,
          payload: null,
        });
      }
    });
  }

  getXeroProgress() {
    this.adminClientFundingClaim.dispatch({
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

    //     this.adminClientFundingClaim.dispatch({
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


  subscribeEnums(){
    this.enum$ = this.adminClientFundingClaim.pipe(select(state => state.fundingClaim));

    this.req = this.enum$.subscribe((results: any) => {
      if(results?.fundingClaimList?.length > 0){
        let data = AdminHelper.formatDate([...results?.fundingClaimList],this.displayedColumns)
        data.map(res => {
          res.invoice_name = this.formatInvoiceName(res?.invoice_name)
        })
        this.clientFundingClaimList = [...data]
        if(this.isExportClaim){
          this.exportGeneratedClaim(this.clientFundingClaimList[0].funding_source_code, this.clientFundingClaimList[0].invoice_id, this.clientFundingClaimList[0].invoice_batch);
          this.isExportClaim = false;
        }
      }

      if(results?.success){
        this.snackBar.open(results?.success, '', {
          duration: 4000,
          panelClass: 'success-snackbar',
        });
        this.adminClientFundingClaim.dispatch({
          type: FundingClaimActionTypes.DELETE_FUNDING_CLAIM_SUCCESS,
          payload:null
        });
        this.getFundingClaimList()
      }

      if(results?.error){
        this.snackBar.open(results?.error, '', {
          duration: 4000,
          panelClass: 'danger-snackbar',
        });
        this.adminClientFundingClaim.dispatch({
          type: FundingClaimActionTypes.DELETE_FUNDING_CLAIM_FAIL,
          payload:null
        });
        this.adminClientFundingClaim.dispatch({
          type: FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST
        });
      }

      this.loading = results?.pending;
    });
  }

  formatInvoiceName(invoice_name: string){
    let invoice = invoice_name.split("-");
    let invoice_date: any[] = invoice[1].split("to");
    const formattedDatefrom = moment(invoice_date[0]).format('DD/MM/YYYY');
    const formattedDateto = moment(invoice_date[1]).format('DD/MM/YYYY');

    const isDateValid = formattedDatefrom !== "Invalid date" && formattedDateto !== "Invalid date"

    const formattedDate = `${invoice[0]} - ${formattedDatefrom} to ${formattedDateto}`
    return isDateValid ? formattedDate : invoice_name;
  }

  convertToDate(dateTime) {
    return new Date(dateTime * 1000)
  }

  // client details
  getClientFundingClaim(): void {
    
  }

  editDataDialog(event) {
    if (event) {
      this.openAddFundingClaimModal(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog  (event) {
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
            let reqBody = [result?.data?.invoice_id || event?.data?.invoice_id]

            this.adminClientFundingClaim.dispatch({
              type: FundingClaimActionTypes.DELETE_FUNDING_CLAIM,
              payload: reqBody
            });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", result?.data, event)
          }
        });
    }
  }

  openAddFundingClaimModal(data?: any) {
    let viewFundingClaim = this.dialog.open(
      ViewFundingClaimComponent,
      {
        minWidth: '45vw',
        maxWidth: '95vw',
        data: data
      }
    );
  }

  generateFundingClaim(data?: any){
    let generateFundingClaim = this.dialog.open(
      GenerateFundingClaimComponent,
      {
        minWidth: '60vw',
        data: data
      }
    );

    generateFundingClaim
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          this.isExportClaim = true;
        }
      });
  }

  importClientFundingClaim(data?: any): void{
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
          data_list: this.clientFundingClaimList,  
          title: "Generate Bulk Claim Report",
          sub_title: "Bulk Claim",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Date Created',
          dateSearch: {
            dateFrom: 'Date Created',  
            dateTo: 'Date Created'
          },
          groupItems: true,  
          groupBy: "Type"
        },
      }
    );
  }

    // export generated claim
    exportGeneratedClaim(fundingSource: any, fundingId: any, arrayData?: any):void {
      const invoiceItems = [...arrayData]
      invoiceItems.forEach(res => {

        let invoicesWithTransport = res.invoice_batch_detail.filter(el => el.client_service_schedule_activity === 'Activity Based Transport')
        let invoicesWithTravel = res.invoice_batch_detail.filter(el => el.client_service_schedule_is_travel)

        if(invoicesWithTransport.length > 0){
          let totalTransport:number = 0
          let tempData = Object.assign({}, res)
          invoicesWithTransport.map(_res => {
            totalTransport += _res.client_service_schedule_approved_support_item_price
            tempData.invoice_batch_unit_price = _res.client_service_schedule_approved_total_hours 
            tempData.invoice_batch_support_item_number = _res.client_service_schedule_approved_support_item_number
          })
          tempData.invoice_batch_total_hours = +totalTransport
          invoiceItems.push(tempData)
        }
        
        if(invoicesWithTravel.length > 0){
          let totalTravel: number = 0
          let tempData = Object.assign({}, res)
          invoicesWithTravel.map(_res => {
            totalTravel += _res.client_service_schedule_approved_support_item_price
            tempData.invoice_batch_unit_price = _res.client_service_schedule_approved_total_hours 
            tempData.invoice_batch_support_item_number = _res.client_service_schedule_approved_support_item_number
          })
          tempData.invoice_batch_total_hours = +totalTravel
          invoiceItems.push(tempData)
        }
      })

      let data: any[] = invoiceItems.map(el => {
        console.log(el.invoice_organization_abn)
        let start_date = format(new Date(el?.invoice_batch_service_start_date * 1000), 'yyyy-MM-dd')
        let end_date = format(new Date(el?.invoice_batch_service_end_date * 1000), 'yyyy-MM-dd')
  
        let start_date_final = start_date > end_date ? end_date : start_date,
        end_date_final = start_date > end_date ? start_date : end_date
  
        let claimFile = {
          "RegistrationNumber": el?.invoice_batch_ndis_number || this.loggedUser?.organization_registration_number, // funding source registration number
          "NDISNumber":el?.invoice_batch_registration_number, // participant registration number
          "SupportsDeliveredFrom": AdminHelper.excelCellTextFormat(start_date_final, "YYYY-MM-DD"),
          "SupportsDeliveredTo": AdminHelper.excelCellTextFormat(start_date_final, "YYYY-MM-DD") ,
          "SupportNumber": el?.invoice_batch_support_item_number,
          "ClaimReference": AdminHelper.replaceSpaces(el?.invoice_batch_claim_reference, '_').substring(0, 20),
          "Quantity": el?.invoice_batch_total_hours,
          "Hours": "",
          "UnitPrice": el?.invoice_batch_unit_price,
          "GSTCode": "P2",
          "AuthorisedBy": "",
          "ParticipantApproved": "",
          "InKindFundingProgram": "",
          "ClaimType":  "",
          "CancellationReason": "",
          "ABN of Support Provider": el?.invoice_batch_organization_abn || ''
        }
  
        return claimFile;
      });
  
  
      let sortedData = data.sort((a,b) => {
        if(a['ClaimReference'] < b['ClaimReference']) return -1
        if(a['ClaimReference'] > b['ClaimReference']) return 1
        return 0
      })
      
      this.excelService.exportAsExcelFile(sortedData, `${fundingSource}_${fundingId}`  );
      this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
        duration: 4000,
        panelClass: 'success-snackbar'
      });
    }
}

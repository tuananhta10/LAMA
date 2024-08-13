import { Component, OnInit, Input, HostListener } from '@angular/core';
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
  ClientFunding,
  selectedColumns,
  clientFundingList,
  download_template,
  sample_data_template,
} from './utils/client-funding-model-interface';
import { AddServiceScheduleComponent } from '../client-details/dialogs/add-service-schedule/add-service-schedule.component';
import { AddClientFundingComponent } from '../client-details/dialogs/add-client-funding/add-client-funding.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/client-funding-report-model-interface';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';

@Component({
  selector: 'app-client-client-funding',
  animations: [mainAnimations],
  templateUrl: './client-client-funding.component.html',
  styleUrls: ['./client-client-funding.component.scss']
})
export class ClientClientFundingComponent implements OnInit {

  private clientFundingData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public clientFundingList: ClientFunding[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id,
      client_name: el.client_name,
      funding_source_code: el.funding_source_code,
      funding_type: el.funding_type,
      start_date: el.start_date,
      end_date: el.end_date,
      budget: el.budget,
      allocated: el.allocated,
      utilise_total: el.utilise_total,
      balance: el.balance,
      registration_no: el.registration_no,
      branch_name: el.branch_name,
      status: el.status,
    }
  }

  public download_template: any[] = download_template;
  public sample_data_template: any[] = sample_data_template;
  public navbarScrolled: boolean = false;

  constructor(private adminClientFunding: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {    
    this.getClientFunding();
    this.clientFundingData$ = this.adminClientFunding.pipe(select(state => state.clientFunding));

    this.req = this.clientFundingData$.subscribe((clientFunding: any) => {
      this.loading = clientFunding.pending;

      if (clientFunding.clientFundingList.length > 0) {
        clientFunding.clientFundingList.forEach(element => {
          //element.status = "Published";
          //element.start_date = this.convertToDate(element.start_date);
          //element.end_date = this.convertToDate(element.end_date);
        });
        this.clientFundingList = AdminHelper.formatDate([...clientFunding.clientFundingList],this.displayedColumns)
        .filter(el => !!el?.client_name);
         
        // console.log(this.clientFundingList)
      }

      if (clientFunding.success) {
        this.snackBar.open(clientFunding.success, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });

        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING_SUCCESS,
          payload: { message: null }
        });

        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.EDIT_CLIENT_FUNDING_SUCCESS,
          payload: { message: null }
        });

        this.getClientFunding();
      }

      if (clientFunding.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING_FAIL,
          payload: null
        });

        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.EDIT_CLIENT_FUNDING_FAIL,
          payload: null
        });
      }

      if(clientFunding.clientFundingUpload){
        if(clientFunding.clientFundingUpload.result.toLowerCase() === 'failed'){
          this.snackBar.open(clientFunding.clientFundingUpload.message, "", {
            duration: 4000,
            panelClass:'error-snackbar'
          });
        } else {
          this.snackBar.open('Successfully uploaded Client Funding records', "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
        }

        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING_SUCCESS,
          payload: null
        }); 
      }
    })
  }

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    this.navbarScrolled = scrollY > 100;
  }
  convertToDate(dateTime) {
    return new Date(dateTime * 1000)
  }

  // client details
  getClientFunding(): void {
    this.adminClientFunding.dispatch({
      type: ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST,
    });
  }

  editDataDialog(event) {
    if (event) {
      this.openAddClientFundingModal(event?.data);
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
          data_list: this.clientFundingList,  
          title: "Generate Funding Report",
          sub_title: "Participant Funding",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Start Date',
          dateSearch: {
            dateFrom: 'Start Date',  
            dateTo: 'Start Date'
          },
          groupItems: true,  
          groupBy: "Funding Source"
        },
      }
    );

    reportDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        
      }
    });
  }

  publishFunding(event){
    console.log(event)
    if(event){
      let createClientDialog = this.dialog.open(
        AddClientFundingComponent,
        {
          minWidth: '25vw',
          maxWidth: '1100px',
          maxHeight: '96vh',
          data: {
            ...event?.data,  
            to_publish: true
          }
        }
      );
    }
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
            this.adminClientFunding.dispatch({
              type: ClientFundingActionTypes.DELETE_CLIENT_FUNDING,
              payload: [result?.data.id || event?.data.id]
            });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }

  openAddClientFundingModal(data?: any) {
    let createClientDialog = this.dialog.open(
      AddClientFundingComponent,
      {
        minWidth: '40vw',
        maxWidth: '1100px',
        maxHeight: '96vh',
        data: data
      }
    );

    createClientDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
  }

  importClientFunding(){
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
      if(result){
        let data = {
          endpoint: 'client-funding',
          delete: false,
          attachment: result
        }

        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING,
          payload: data
        }); 
      }
    });
  }
}

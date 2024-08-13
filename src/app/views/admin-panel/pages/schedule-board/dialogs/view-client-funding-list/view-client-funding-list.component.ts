import { Component, OnInit, Input, Inject } from '@angular/core';
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
  ClientFunding,
  selectedColumns,
  clientFundingList 
} from '../../utils/client-funding-model-interface';
import { AddServiceScheduleComponent } from '@main/views/admin-panel/pages/client/client-details/dialogs/add-service-schedule/add-service-schedule.component';
import { AddClientFundingComponent } from '@main/views/admin-panel/pages/client/client-details/dialogs/add-client-funding/add-client-funding.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-client-funding-list',
  animations: [mainAnimations],
  templateUrl: './view-client-funding-list.component.html',
  styleUrls: ['./view-client-funding-list.component.scss']
})
export class ViewClientFundingListComponent implements OnInit {
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
      name: el.name,  
      funding_source: el.funding_source,
      type: el.type,  
      start_date: el.start_date, 
      end_date: el.end_date,  
      budget: el.budget,  
      allocated: el.allocated,   
      utilized_total: el.utilized_total,  
      balance: el.balance,
      registration_number: el.registration_number,  
      branch: el.branch,
      //status: el.status,  
    }
  } 

  constructor(
    public dialogRef: MatDialogRef<ViewClientFundingListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private adminClientFunding: Store<AdminProfileState>,
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = this.data?.client?.id;
    console.log(data)
  }

  ngOnInit(): void {
    this.getClientFunding();
    this.clientFundingData$ = this.adminClientFunding.pipe(select(state => state.clientFunding));

    this.req =  this.clientFundingData$.subscribe((clientFunding: any) => {
      this.loading = clientFunding.pending;
      
      if(clientFunding.clientFundingList.length > 0){
        /*clientFunding.clientFundingList.forEach(element => {
          element.start_date = this.convertToDate(element.start_date);
          element.end_date = this.convertToDate(element.end_date);
        });*/
        this.clientFundingList = clientFunding.clientFundingList;
      }

      if(clientFunding.success){
        this.snackBar.open(clientFunding.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING_SUCCESS,
          payload: {message: null}
        }); 

        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.EDIT_CLIENT_FUNDING_SUCCESS,
          payload: {message: null}
        }); 

        this.getClientFunding();
      }

      if(clientFunding.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
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
          this.snackBar.open('Successfully uploaded client funding', "", {
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
          delete: true,
          attachment: result
        }
        this.adminClientFunding.dispatch({
          type: ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING,
          payload: data
        }); 
      }
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  convertToDate(dateTime){
    return new Date(dateTime * 1000)
  }

  // client details
  getClientFunding(): void{
    this.adminClientFunding.dispatch({
      type: ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST,
      payload: {client_id: this.id}
    }); 
  }

  editDataDialog(event){
    if(event){
      this.openAddClientFundingModal(event?.data);
    }
  }

  openAddClientFundingModal(data?: any){
    if(!data){
      data = {
        client_id: this.data?.client?.id
      }
    }

    console.log(data)

    let createClientDialog = this.dialog.open(
      AddClientFundingComponent,
      { 
        minWidth: '45vw',
        data: data
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  back(){
    this.location.back();
  }


}

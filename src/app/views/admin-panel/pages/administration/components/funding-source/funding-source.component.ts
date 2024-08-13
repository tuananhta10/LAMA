import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  select,
  Store
} from '@ngrx/store';
import {
  displayedColumns,
  TableHeader,
  FundingSource,
  selectedColumns,
  fundingSourceList
} from '../../utils/funding-source-model-interface';
import { AddFundingSourceComponent } from '../../dialogs/add-funding-source/add-funding-source.component';
//import { ViewFundingSourceComponent } from '../../dialogs/view-funding-source/view-funding-source.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';

@Component({
  selector: 'app-funding-source',
  animations: [mainAnimations],
  templateUrl: './funding-source.component.html',
  styleUrls: ['./funding-source.component.scss']
})
export class FundingSourceComponent implements OnInit {

  private fundingSource$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public fundingSourceList: FundingSource[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id,
      code: el.code,
      full_name: el.full_name,
      funding_source_provider: el.funding_source_provider,
      self_funded: el.self_funded,
    }
  }

  constructor(private adminFundingSource: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getFundingSources();

    this.fundingSource$ = this.adminFundingSource.pipe(select(state => state.fundingSource));

    this.req =  this.fundingSource$.subscribe((fundingSource: any) => {
      this.loading = fundingSource.pending;

      console.log(fundingSource.success)

      if(fundingSource.fundingSourceList.length > 0){
        this.fundingSourceList = fundingSource.fundingSourceList;
      }

      if(fundingSource.success){
        this.snackBar.open(fundingSource.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminFundingSource.dispatch({
          type: FundingSourceActionTypes.SAVE_FUNDING_SOURCE_SUCCESS,
          payload: {message: null}
        });

        this.adminFundingSource.dispatch({
          type: FundingSourceActionTypes.EDIT_FUNDING_SOURCE_SUCCESS,
          payload: {message: null}
        });

        this.getFundingSources();
      }

      if(fundingSource.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminFundingSource.dispatch({
          type: FundingSourceActionTypes.SAVE_FUNDING_SOURCE_FAIL,
          payload: null
        });

        this.adminFundingSource.dispatch({
          type: FundingSourceActionTypes.EDIT_FUNDING_SOURCE_FAIL,
          payload: null
        });
      }

      if(fundingSource.clientFundingUpload){
        if(fundingSource.clientFundingUpload.result.toLowerCase() === 'failed'){
          this.snackBar.open(fundingSource.clientFundingUpload.message, "", {
            duration: 4000,
            panelClass:'error-snackbar'
          });
        } else {
          this.snackBar.open('Successfully uploaded Funding Source records', "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
        }

        this.adminFundingSource.dispatch({
          type: FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING_SUCCESS,
          payload: null
        }); 
      }
    })
  }

  getFundingSources(){
    this.adminFundingSource.dispatch({
      type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddFundingSource(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog(event){
    if(event){
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
        if(result?.data || (result && !result.cancel && event?.data)){
          this.adminFundingSource.dispatch({
            type: FundingSourceActionTypes.DELETE_FUNDING_SOURCE,
            payload: [result?.data.id || event?.data.id]
          });
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddFundingSource(data?: any){
    let employeePositionDialog = this.dialog.open(
      AddFundingSourceComponent,
      {
        minWidth: '30vw',
        data: data,
      }
    );

    employeePositionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  viewFundingSourceDetail(event){
    /*let employeePositionDialog = this.dialog.open(
      ViewFundingSourceComponent,
      {
        minWidth: '30vw',',
        data: {
          details: event?.data,
        },
      }
    );

    employeePositionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });*/
  }

  uploadFileDialog(){
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
          endpoint: 'funding-source',
          delete: true,
          attachment: result
        }

        this.adminFundingSource.dispatch({
          type: FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING,
          payload: data
        }); 
      }
    });
  }

}

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
  PayrateLoading,
  selectedColumns,
  payrateLoadingList
} from '../../utils/payrate-loading-model-interface';
import { AddPayrateLoadingComponent } from '../../dialogs/add-payrate-loading/add-payrate-loading.component';
import { SuccessAddRecordComponent } from '../../dialogs/success-add-record/success-add-record.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeePayRateLoadingActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-pay-rate-loading.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  convertTimestampUtc,
  convertTo12Hrs
} from '@app-shared/utils/date-convert.util';
import { FileUploadModalComponent } from '@main/shared/components';

@Component({
  selector: 'app-payrate-loading',
  animations: [mainAnimations],
  templateUrl: './payrate-loading.component.html',
  styleUrls: ['./payrate-loading.component.scss']
})
export class PayrateLoadingComponent implements OnInit, OnDestroy {
  private employeePayRateLoading$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public payrateLoadingList: PayrateLoading[] = []//payrateLoadingList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id,
      name: el.name,
      employment_type: el.employment_type,
      applicable_day: el.applicable_day,
      start_time: el.start_time,
      end_time: el.end_time,
      loading_rate: el.loading_rate,
      pay_item: el.pay_item,
    }
  }

  constructor(private adminPayRateLoading: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.employeePayRateLoading$ = this.adminPayRateLoading.pipe(select(state => state.employeePayRateLoading));
    this.getPayrateLoading();
    this.req =  this.employeePayRateLoading$.subscribe((employeePayRateLoading: any) => {
      this.loading = employeePayRateLoading.pending;

      if(employeePayRateLoading.employeePayRateLoadingList.length > 0){
        employeePayRateLoading.employeePayRateLoadingList.forEach(el => {
          /*
            start_time_full
            end_time_full
            loading_rate_percent
          */

          el['start_time_full'] = convertTo12Hrs(el['start_time']);
          el['end_time_full'] = convertTo12Hrs(el['end_time']);
          el['loading_rate_percent'] = el['loading_rate'] + '%'
        });
        this.payrateLoadingList = employeePayRateLoading.employeePayRateLoadingList;

      }

      if(employeePayRateLoading.success){
        this.snackBar.open(employeePayRateLoading.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminPayRateLoading.dispatch({
          type: EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS,
          payload: {message: null}
        });

        this.adminPayRateLoading.dispatch({
          type: EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING_SUCCESS,
          payload: {message: null}
        });

        this.getPayrateLoading();
      }

      if(employeePayRateLoading.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminPayRateLoading.dispatch({
          type: EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING_FAIL,
          payload: null
        });

        this.adminPayRateLoading.dispatch({
          type: EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING_FAIL,
          payload: null
        });
      }
    })
  }

  getPayrateLoading(){
    this.adminPayRateLoading.dispatch({
      type: EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddPayrateLoading(event?.data);
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
          this.adminPayRateLoading.dispatch({
            type: EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING,
            payload: [result?.data || event?.data]
          });
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddPayrateLoading(data?: any){
    let createClientDialog = this.dialog.open(
      AddPayrateLoadingComponent,
      {
        minWidth: '30vw',
        data: data,
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  successCreate(){
    let successDialog = this.dialog.open(
      SuccessAddRecordComponent,
      {
        minWidth: '300px',
        data: {
        },
      }
    );

    successDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  uploadFileDialog(){
    let uploadDialog = this.dialog.open(
      FileUploadModalComponent,
      { 
        minWidth: '30vw',
        data: {
          fileType: '.csv',
          fileTypeArray: ['.csv'],  
        },
      }
    );

    uploadDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        let data = {
          endpoint: 'payrate-loading',
          delete: true,
          effective_date: convertTimestampUtc(result?.effective_date),
          version: result?.version,
          attachment: result?.fileObject
        }

        this.snackBar.open("Upload in-progress. Please don't change the page while upload is in progress.", "", {
          panelClass:'success-snackbar'
        });

        this.adminPayRateLoading.dispatch({
          type: EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING,
          payload: data
        }); 
      }
    });
  }


}

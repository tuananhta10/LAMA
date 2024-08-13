import { Component, OnDestroy, OnInit, Input } from '@angular/core';
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
  EmployeePayrate,
  selectedColumns,
  employeePayrateList ,
  download_template,
  sample_data_template
} from '../../utils/employee-payrate-model-interface';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { UpdateEmployeePayrateComponent } from '../../dialogs/update-employee-payrate/update-employee-payrate.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeePayRateActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-pay-rate.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-employee-payrate',
  animations: [mainAnimations],
  templateUrl: './employee-payrate.component.html',
  styleUrls: ['./employee-payrate.component.scss']
})
export class EmployeePayrateComponent implements OnInit {

  private employeePayrate$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public employeePayRateList: EmployeePayrate[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      award_code: el.award_code, 
      category: el.category,
      classification: el.classification,
      hourly_pay_rate: el.hourly_pay_rate,
      calculated_rate_type: el.calculated_rate_type
    }
  } 

  public download_template = download_template;
  public sample_data_template = sample_data_template;

  //=LEFT(G11,SEARCH("level",G11,1)-1)
  //=PROPER(RIGHT(G11,LEN(G11)-SEARCH(" level",G11,SEARCH("",G11)+1)))
  //=I11&" - "&H11
  //=(PROPER(RIGHT(G11,LEN(G11)-SEARCH(" level",G11,SEARCH("",G11)+1))))&" - "&H11

  constructor(private adminEmployeePayrate: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
    this.employeePayrate$ = this.adminEmployeePayrate.pipe(select(state => state.employeePayRate));
    console.log("HEY")
  }

  ngOnInit(): void {
    this.subscribeEmployeePayrate();
    this.getEmployeePayrates();
  }

  subscribeEmployeePayrate(){
    this.req =  this.employeePayrate$.subscribe((employeePayRate: any) => {
      this.loading = employeePayRate.pending;

      console.log(employeePayRate)

      if(employeePayRate.employeePayRateList.length > 0){
        employeePayRate.employeePayRateList.forEach((el) => {
          //el['award_code'] = 'MA000100' 
          //el['calculated_rate_type'] = 'Hourly' 
        })
        this.employeePayRateList = employeePayRate.employeePayRateList.filter(el => !!el?.award_code);
      }

      if(employeePayRate.success){
        this.snackBar.open('Successfully updated Payrate record', "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });

        this.adminEmployeePayrate.dispatch({
          type: EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_SUCCESS,
          payload: {message: null}
        }); 

        this.adminEmployeePayrate.dispatch({
          type: EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE_SUCCESS,
          payload: {message: null}
        }); 

        this.getEmployeePayrates();
      }

      if(employeePayRate.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminEmployeePayrate.dispatch({
          type: EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_FAIL,
          payload: null
        }); 

        this.adminEmployeePayrate.dispatch({
          type: EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_FAIL,
          payload: null
        }); 
      }

      if(employeePayRate.employeePayrateUpload){
        if(employeePayRate.employeePayrateUpload.result.toLowerCase() === 'failed'){
          this.snackBar.open(employeePayRate.employeePayrateUpload.message, "", {
            duration: 4000,
            panelClass:'error-snackbar'
          });
        } else {
          this.snackBar.open('Successfully uploaded Employee Payrate records', "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
        }

        this.adminEmployeePayrate.dispatch({
          type: EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION,
          payload: null
        }); 
      }
    });
  }

  getEmployeePayrates(){
    this.adminEmployeePayrate.dispatch({
      type: EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST
    }); 
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
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
          this.adminEmployeePayrate.dispatch({
            type: EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE,
            payload: [result?.data || event?.data]
          }); 
          // after delete refresh store
          //console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }


  viewEmployeePayrate(event){
    let employeePayrateDialog = this.dialog.open(
      UpdateEmployeePayrateComponent,
      { 
        minWidth: event ? '40vw' : '50vw',
        maxWidth: '800px',
        data: event?.data,
      }
    );

    employeePayrateDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  public versionForm!: FormGroup;

  uploadFileDialog(){
    this.versionForm = this.formBuilder.group({
      version: [''],
      effective_date: [''],
    });

    let uploadDialog = this.dialog.open(
      FileUploadModalComponent,
      { 
        minWidth: '30vw',
        data: {
          fileType: '.csv',
          fileTypeArray: ['.csv'],
          forPricelist: true,
          versionForm: this.versionForm
        },
      }
    );

    uploadDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        let data = {
          endpoint: 'pay-rate',
          delete: false,
          effective_date: convertTimestampUtc(result?.effective_date),
          version: result?.version,
          attachment: result?.fileObject
        }

        this.snackBar.open("Upload in-progress. Please don't change the page while upload is in progress.", "", {
          panelClass:'success-snackbar'
        });

        this.adminEmployeePayrate.dispatch({
          type: EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION,
          payload: data
        }); 
      }
    });
  }

}

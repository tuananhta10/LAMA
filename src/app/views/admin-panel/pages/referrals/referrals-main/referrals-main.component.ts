import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { 
  displayedColumns,
  TableHeader,
  EmployeeTask,
  selectedColumns
} from './utils/referral-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { AddTasksComponent } from './dialogs/add-tasks/add-tasks.component';
import { SuccessAddRecordComponent } from '../../administration/dialogs/success-add-record/success-add-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeTaskActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-task.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReferralActionTypes } from '@main/views/admin-panel/store/actions/admin-referral.action';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/referrals-report-model-interface';

@Component({
  selector: 'app-referrals-main',
  animations: [mainAnimations],
  templateUrl: './referrals-main.component.html',
  styleUrls: ['./referrals-main.component.scss']
})
export class ReferralsMainComponent implements OnInit {
  private referral$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public referralList: EmployeeTask[] = [];
  public listView: boolean = false;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      name: el.name, 
      email_address: el.email_address, 
      branch_name: el.branch_name, 
      ndis_funding: el.ndis_funding, 
      disability_type: el.disability_type, 
      employee_name: el.employee_name, 
      status: el.status
    };
  }

  public searchSourceGrid: any = (el) => {
    return {
      id: el.id, 
      name: el.name, 
      email_address: el.email_address, 
      address_a: el.address_a, 
      location: el.location, 
      ndis_funding: el.ndis_funding, 
      ndis_participant_number: el.ndis_participant_number, 
      disability_type: el.disability_type, 
      mobile_phone_no: el?.mobile_phone_no,  
      employee_name: el?.employee_name,
      branch_name: el?.branch_name,
      status: el.status
    };
  }

  constructor(
    private adminReferral: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getReferrals();
    this.referral$ = this.adminReferral.pipe(select(state => state.referral));

    this.req =  this.referral$.subscribe((referral: any) => {
      this.loading = referral.pending;
      
      if(referral.referralList.length > 0){
        referral.referralList.forEach(element => {
          element.name = element.first_name + " " + element.last_name;
          element.location = element.address_a + " " + element.suburb + " " + element.state + ", " + element.post_code,
          element.date_of_enquiry = this.convertToDate(element.referral_date);
        });
        this.referralList = referral.referralList;
      }

      if(referral.success){
        this.snackBar.open(referral.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminReferral.dispatch({
          type: ReferralActionTypes.SAVE_REFERRAL_SUCCESS,
          payload: {message: null}
        }); 

        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL_SUCCESS,
          payload: {message: null}
        }); 

        this.getReferrals();
      }

      if(referral.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminReferral.dispatch({
          type: ReferralActionTypes.SAVE_REFERRAL_FAIL,
          payload: null
        }); 

        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL_FAIL,
          payload: null
        }); 
      }
    })
  }

  getReferrals(){
    this.adminReferral.dispatch({
      type: ReferralActionTypes.GET_REFERRAL_LIST
    }); 
  }

  convertToDate(dateTime){
    return new Date(dateTime * 1000)
  }


  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
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
          data_list: this.referralList,  
          title: "Generate Referrals Report",
          sub_title: "Referrals",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Referral Date',
          dateSearch: {
            dateFrom: 'Referral Date',  
            dateTo: 'Referral Date'
          },
          groupItems: true,  
          groupBy: "Status"
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

  editReferrals(event){
    console.log(event)
    if(event){
      this.router.navigate([`/admin/referrals/details/${event?.data?.id}`])
    }
  }

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
          this.adminReferral.dispatch({
            type: ReferralActionTypes.DELETE_REFERRAL,
            payload: [result?.data || event?.data]
          }); 
          // after delete refresh store
          console.log("DATA WILL BE DELETED", result, event)
        }
      });
    }
  }


}

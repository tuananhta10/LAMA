import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { 
  displayedColumns,
  TableHeader,
  employeeLeaveList,
  selectedColumns,
  EmployeeLeave 
} from './utils/employee-leave-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEmployeeLeaveComponent } from './dialogs/add-employee-leave/add-employee-leave.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeLeaveActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-leave.action';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';

@Component({
  selector: 'app-employee-leaves',
  animations: [mainAnimations],
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.scss']
})
export class EmployeeLeavesComponent implements OnInit {

  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  employeeLeaveData$:any;

  public displayedColumns: TableHeader[] = displayedColumns;
  public employeeLeaveList: EmployeeLeave[] = [];
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      employee_name: el.employee_name, 
      leave_from: el.leave_from,
      leave_to: el.leave_to,
      leave_reason: el.leave_reason,
      status: el.status,
    };
  }

  constructor(private employeeListStore: Store<EmployeeListState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private adminEmployeeLeave: Store<AdminProfileState>,
    private route: ActivatedRoute) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getEmployeeLeaves();
    this.employeeLeaveData$ = this.adminEmployeeLeave.pipe(select(state => state.employeeLeave));

    this.req =  this.employeeLeaveData$.subscribe((employeeLeave: any) => {
      this.loading = employeeLeave.pending;
      
      if(employeeLeave.employeeLeaveList.length > 0){
        employeeLeave.employeeLeaveList.forEach(element => {
          //element.start_date = this.convertToDate(element.start_date);
          //element.end_date = this.convertToDate(element.end_date);
        });
        this.employeeLeaveList = employeeLeave.employeeLeaveList;
      }

      if(employeeLeave.success){
        this.snackBar.open(employeeLeave.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminEmployeeLeave.dispatch({
          type: EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE_SUCCESS,
          payload: {message: null}
        }); 

        this.adminEmployeeLeave.dispatch({
          type: EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE_SUCCESS,
          payload: {message: null}
        }); 

        this.getEmployeeLeaves();
      }

      if(employeeLeave.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminEmployeeLeave.dispatch({
          type: EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE_FAIL,
          payload: null
        }); 

        this.adminEmployeeLeave.dispatch({
          type: EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE_FAIL,
          payload: null
        }); 
      }

      if(employeeLeave.employeeLeaveUpload){
        if(employeeLeave.employeeLeaveUpload.result.toLowerCase() === 'failed'){
          this.snackBar.open(employeeLeave.employeeLeaveUpload.message, "", {
            duration: 4000,
            panelClass:'error-snackbar'
          });
        } else {
          this.snackBar.open('Successfully uploaded employee leave', "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
        }

        this.adminEmployeeLeave.dispatch({
          type: EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE_SUCCESS,
          payload: null
        }); 
      }
    })
  }

  convertToDate(dateTime){
    return new Date(dateTime * 1000)
  }


  getEmployeeLeaves(){
    this.adminEmployeeLeave.dispatch({
      type: EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST
    }); 
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

    // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddEmployeeLeave(event?.data);
    }
  }
  
   // delete event emitter
   deleteDataDialog(event) {
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
            this.adminEmployeeLeave.dispatch({
              type: EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE,
              payload: [result?.data || event?.data]
            }); 
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }

  openAddEmployeeLeave(data?: any){
    let addEmployeeLeave = this.dialog.open(
      AddEmployeeLeaveComponent,
      { 
        minWidth: '30vw',
        //maxHeight: '95vh',
        data: data
      }
    );

    addEmployeeLeave
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  importEmployeeLeave(){
    let uploadDialog = this.dialog.open(
      FileUploadModalComponent,
      { 
        minWidth: '30vw',
        data: {
          fileType: '.CSV',
          fileTypeArray: ['.CSV']
        },
      }
    );

    uploadDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        let data = {
          endpoint: 'employee-leave',
          delete: true,
          attachment: result
        }
        this.adminEmployeeLeave.dispatch({
          type: EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE,
          payload: data
        }); 
      }
    });
  }
}

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
  EmployeePosition,
  selectedColumns,
  employeePositionList 
} from '../../utils/employee-position-model-interface';
import { AddEmployeePositionComponent } from '../../dialogs/add-employee-position/add-employee-position.component';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { ViewEmployeePositionComponent } from '../../dialogs/view-employee-position/view-employee-position.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeePositionActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-position.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { AddEmployeePositionSyncComponent } from '../../dialogs/add-employee-position-sync/add-employee-position-sync.component';

@Component({
  selector: 'app-employee-position',
  animations: [mainAnimations],
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.scss']
})
export class EmployeePositionComponent implements OnInit, OnDestroy {
  private employeePosition$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public employeePositionList: EmployeePosition[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name,
      display_name: el.display_name,
      risk_assessed_roles: el.risk_assessed_roles,
      employee_position_qualification: el.employee_position_qualification,
    }
  } 

  constructor(private adminEmployeePosition: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.employeePosition$ = this.adminEmployeePosition.pipe(select(state => state.employeePosition));
    this.getEmployeePositions();

    this.req =  this.employeePosition$.subscribe((employeePosition: any) => {
      this.loading = employeePosition.pending;

      if(employeePosition.employeePositionList.length > 0){
        this.employeePositionList = employeePosition.employeePositionList;
      }

      if(employeePosition.success){
        this.snackBar.open(employeePosition.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_SUCCESS,
          payload: {message: null}
        }); 

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_SUCCESS,
          payload: {message: null}
        }); 

        this.getEmployeePositions();
      }

      if(employeePosition.success_update){
        this.snackBar.open("Successfully Updated Employee Position", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_SUCCESS,
          payload: {message: null}
        }); 

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_SUCCESS,
          payload: {message: null}
        }); 

        this.getEmployeePositions();

        /*if(this.oldData){
          setTimeout(() => {
            this.syncEmployeePosition(this.oldData)
          }, 1500)
        }*/
      }

      if(employeePosition.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_FAIL,
          payload: null
        }); 

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_FAIL,
          payload: null
        }); 
      }

      if(employeePosition.employeePositionUpload){
        if(employeePosition.employeePositionUpload.result.toLowerCase() === 'failed'){
          this.snackBar.open(employeePosition.employeePositionUpload.message, "", {
            duration: 4000,
            panelClass:'error-snackbar'
          });
        } else {
          this.snackBar.open('Successfully uploaded Employee Position records', "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
        }

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION_SUCCESS,
          payload: null
        }); 
      }
    })
  }

  getEmployeePositions(){
    this.adminEmployeePosition.dispatch({
      type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST
    }); 
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddEmployeePosition(event?.data);
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
          this.adminEmployeePosition.dispatch({
            type: EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION,
            payload: [result?.data.id || event?.data.id]
          }); 
          // after delete refresh store
          //console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  syncEmployeePosition(data?: any){
    let employeePositionDialog = this.dialog.open(
      AddEmployeePositionSyncComponent,
      { 
        minWidth: '30vw',
        maxWidth: '950px',
        data: {
          ...data,
          title: `Sync the changes to all ${data?.display_name} employees`
        }

      }
    );

    employeePositionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.oldData = undefined;

      if(result && !result?.cancel){
        let editData = {
          "id": data.id,
          "page": "update_employee"
        }

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION,
          payload: editData
        });
        
        this.dialog.closeAll();
      }
    });
  }

  public oldData: any;

  openAddEmployeePosition(data?: any){
    let employeePositionDialog = this.dialog.open(
      AddEmployeePositionComponent,
      { 
        minWidth: '30vw',
        maxWidth: '1000px',
        data: data,
      }
    );

    employeePositionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      console.log("SYNC",result)

      if(result && result?.data){
        console.log(result)
        this.oldData = result?.data;
      }
    });
  }

  viewEmployeeDetail(event){
    let employeePositionDialog = this.dialog.open(
      ViewEmployeePositionComponent,
      { 
        minWidth: event ? '60vw' : '90vw',
        data: {
          details: event?.data,
        },
      }
    );

    employeePositionDialog
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
          endpoint: 'employee-position',
          delete: true,
          attachment: result
        }

        this.adminEmployeePosition.dispatch({
          type: EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION,
          payload: data
        }); 
      }
    });
  }
}

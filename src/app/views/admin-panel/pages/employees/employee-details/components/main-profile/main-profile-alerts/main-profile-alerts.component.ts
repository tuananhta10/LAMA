import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeTaskActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-task.action';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
} from 'rxjs';
import {
  select,
  Store
} from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddTasksComponent } from '@main/views/admin-panel/pages/employees/employee-tasks/dialogs/add-tasks/add-tasks.component';

interface Alert {
  title: string,
  createdBy: string,  
  description: string,
  dateAdded: string,
  level: string,
  id: any
}

@Component({
  selector: 'employee-main-profile-alerts',
  animations: [mainAnimations],
  templateUrl: './main-profile-alerts.component.html',
  styleUrls: ['./main-profile-alerts.component.scss']
})
export class MainProfileAlertsComponent implements OnInit {
  @Input() employeeData: any = {};
  private employeeTask$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public search: string = '';
  
  /*
    Alert level
      1 - Info
      2 - Success
      3 - Warning
      4 - Danger
  */

  public alertList: Alert[] = [];
  public dataSource: Alert[] = this.alertList;
  public employeeTaskList: any;  
  public loading: boolean = true;

  constructor(private adminEmployeeTask: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEmployeeTasks();
    this.employeeTask$ = this.adminEmployeeTask.pipe(select(state => state.employeeTask));

    this.req = this.employeeTask$.subscribe((employeeTask: any) => {
      this.loading = employeeTask.pending;

      if (employeeTask.employeeTaskList.length > 0) {
        console.log(this.employeeData)
        this.employeeTaskList = employeeTask.employeeTaskList.filter(el => el?.employee_id === this.employeeData?.id);
      }

      if (employeeTask.success) {
        this.openSuccessAddTask();

        this.adminEmployeeTask.dispatch({
          type: EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_SUCCESS,
          payload: { message: null }
        });

        this.adminEmployeeTask.dispatch({
          type: EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_SUCCESS,
          payload: { message: null }
        });

        this.getEmployeeTasks();
      }

      if (employeeTask.successEdit) {
        this.snackBar.open(employeeTask.successEdit, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });

        this.adminEmployeeTask.dispatch({
          type: EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_SUCCESS,
          payload: { message: null }
        });

        this.adminEmployeeTask.dispatch({
          type: EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_SUCCESS,
          payload: { message: null }
        });

        this.getEmployeeTasks();
      }

      if (employeeTask.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        this.adminEmployeeTask.dispatch({
          type: EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_FAIL,
          payload: null
        });

        this.adminEmployeeTask.dispatch({
          type: EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_FAIL,
          payload: null
        });
      }
    })
  }

  getEmployeeTasks() {
    this.adminEmployeeTask.dispatch({
      type: EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST
    });
  }

  /*
    Client list table filter
  */
  searchDataSource(): void {
    const filteredAlerts = [...this.alertList]
    .filter(el => {
      let transformed = {
        "title": el.title,
        "id": el.id,
        "createdBy": el.createdBy, 
        "description": el.description, 
        "level": el.level
        
      };
      
      return JSON.stringify(transformed).toLowerCase().includes(this.search.toLowerCase());
    });

    this.dataSource = filteredAlerts
  }

  removeAlert(id){
    let index = this.dataSource.findIndex(el => el.id === id);

    this.dataSource.splice(index, 1);
  }

  openAddTask(data?: any) {
    let addTaskDialog = this.dialog.open(
      AddTasksComponent,
      {
        minWidth: '33vw',
        data: data,
      }
    );

    addTaskDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
  }

  openSuccessAddTask() {
    /*let successDialog = this.dialog.open(
      SuccessAddRecordComponent,
      {
        minWidth: '30vw',
        data: {
          title: 'Task is successfully added!'
        },
      }
    );

    successDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });*/
  }

}

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
  selectedColumns,
  employeeTaskList
} from './utils/employee-task-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddTasksComponent } from './dialogs/add-tasks/add-tasks.component';
import { SuccessAddRecordComponent } from '../../administration/dialogs/success-add-record/success-add-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeTaskActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-task.action';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/employee-task-report-model-interface';
import { NameFormatPipe } from '@main/shared/pipes/name-format.pipe';

@Component({
  selector: 'app-employee-tasks',
  animations: [mainAnimations],
  templateUrl: './employee-tasks.component.html',
  styleUrls: ['./employee-tasks.component.scss'],
  providers:[NameFormatPipe]
})
export class EmployeeTasksComponent implements OnInit {

  private employeeTask$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public employeeTaskList: EmployeeTask[] = [];
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id,
      task_name: el?.task_name,
      employee_name: el?.employee_name,
      due_date: el?.due_date,
      status: el?.status,

    };
  }

  constructor(
    private adminEmployeeTask: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private nameFormatPipe:NameFormatPipe) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getEmployeeTasks();
    this.employeeTask$ = this.adminEmployeeTask.pipe(select(state => state.employeeTask));

    this.req = this.employeeTask$.subscribe((employeeTask: any) => {
      this.loading = employeeTask.pending;

      if (employeeTask.employeeTaskList.length > 0) {
        employeeTask.employeeTaskList.forEach(res => {
          res.employee_name = this.nameFormatPipe.transform(res?.employee_name)
        })
        this.employeeTaskList = employeeTask.employeeTaskList;
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

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
  }

  editDataDialog(event) {
    if (event) {
      this.openAddTask(event?.data);
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
          data_list: this.employeeTaskList,  
          title: "Generate Employee Task Report",
          sub_title: "Employee Task",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Due Date',
          dateSearch: {
            dateFrom: 'Due Date',  
            dateTo: 'Due Date'
          },
          /*groupItems: true,  
          groupBy: "Employee Name"*/
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
            this.adminEmployeeTask.dispatch({
              type: EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK,
              payload: [result?.data || event?.data]
            });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
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
    let successDialog = this.dialog.open(
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

      });
  }
}

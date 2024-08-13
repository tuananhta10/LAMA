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
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeTaskActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-task.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-shift-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class ShiftTasksComponent implements OnInit {
  private employeeTask$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public tasksList: any[] = []
  public taskArray: any = [{tasks: []}];

  @Input() taskForm: FormGroup;
  @Input() isDisabled: boolean = false;
   
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
        this.tasksList = employeeTask.employeeTaskList;

        this.tasksList.forEach((el) => {
          el['name'] = el?.task_name;
        });
      }
    });

    this.addTask();
  }


  addTask(){
    const tasks = this.taskForm.get('employee_task_id') as FormArray
    tasks.push(this.createTasksGroup());
  }

  private createTasksGroup(): FormGroup {
    return new FormGroup({
      'taskName': new FormControl('')
    })
  }

  addTaskArray(){
    this.taskArray.push({tasks: [], assigned_to: ''})
  }

  getEmployeeTasks() {
    this.adminEmployeeTask.dispatch({
      type: EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST
    });
  }
}

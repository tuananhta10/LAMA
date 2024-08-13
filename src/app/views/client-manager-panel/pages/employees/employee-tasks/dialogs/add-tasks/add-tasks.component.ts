import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { EmployeeTaskActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-task.action';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { GoalTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-goal-template.action';

import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent implements OnInit {

  public addTaskForm!: FormGroup;
  public file: File;
  public template: string[] = ["Template 1", "Template 2"]; 
  public assignedTo: string[] = ["James Johnson", "Damien Richard", "Samantha Andres"];  
  public relatedGoal: string[] = ["Goal 1", "Goal 2"];
  public linkToShift: string[] = ["Shift 1", "Shift 2"];
  public status: string[] = ["To do", "In progress", "Archive", "Done"];
  public priorityLevel: string[] = ["Low Priority", "Urgent", "High Priority", "Long Term Task", "Short Term Task"];
  public clientEnums: any[] = [];

  private req: Subscription;
  private reqEmployee: Subscription;
  employeeEnums$: any;
  employeeEnums: any;
  goalEnums$: any;
  goalEnums: any;
  loading: boolean = false;
  loadingGoals: boolean = false;

  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminTask: Store<AdminProfileState>,
    private employeeListStore: Store<EmployeeListState>,
  ) { }

  ngOnInit(): void {
    this.subscribeEnums();

    this.adminTask.dispatch({
      type: GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST
    });

    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });

    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });

    this.addTaskForm = this.formBuilder.group({
      template: [this.data ? this.data?.template : ''],
      task_name: [this.data ? this.data?.task_name : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
      assigned_to: [this.data ? this.data?.assigned_to : ''],
      goal_id: [this.data ? this.data?.goal_id : ''],
      link_to_a_shift: [this.data ? this.data?.link_to_a_shift : ''],
      client_id: [this.data ? this.data?.client_id : ''],
      due_date: [this.data ? new Date(this.data?.due_date * 1000) : ''],
      status: [this.data ? this.data?.status : ''],
      save_template: [this.data ? this.data?.save_template : ''],
      attachment: [this.data ? this.data?.attachment : ''],  
      priority_level: [this.data ? this.data?.priority_level : ''],
      start_time: [this.data ? this.data?.start_time : ''],    
      end_time: [this.data ? this.data?.end_time : ''],  
    });
  }

  subscribeEnums(){
    this.employeeEnums$ = this.employeeListStore.pipe(select(state => state));
    this.reqEmployee = this.employeeEnums$.subscribe((results: any) => {
      this.loading = results.employees.employeeListPending;
      if(results?.employees.employeeList.length > 0){
        results.employees.employeeList.forEach(element => {
          results.employees.employeeList.name = element.last_name + ", " +  element.first_name;
        });
      }
      this.employeeEnums = results.employees.employeeList;
    })

    this.goalEnums$ = this.adminTask.pipe(select(state => state.goalTemplate));
    this.req = this.goalEnums$.subscribe((results: any) => {
      this.goalEnums = results.goalTemplateList;
      this.loadingGoals = results.pending;
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.addTaskForm.valid && !this.data){
      this.addTaskForm.patchValue({
        due_date: convertTimestampUtc(this.addTaskForm.controls['due_date'].value), 
        // formControlName2: myValue2 (can be omitted)
      })

      this.adminTask.dispatch({
        type: EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK,
        payload: this.addTaskForm.value 
      });

      this.close()
    } else if (this.addTaskForm.valid && this.data) {
      this.addTaskForm.patchValue({
        due_date: convertTimestampUtc(this.addTaskForm.controls['due_date'].value), 
        // formControlName2: myValue2 (can be omitted)
      })

      let editData= {
        id: this.data.id,
        ...this.addTaskForm.value
      }
      this.adminTask.dispatch({
        type: EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK,
        payload: editData 
      });

      this.close()
    }
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }


  onUpload(file: any): void {
    this.addTaskForm.get('attachment').setValue(file);
  }

}

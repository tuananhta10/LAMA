import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeTaskActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-task.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import {
  select,
  Store
} from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';

@Component({
  selector: 'app-client-goal-modal',
  templateUrl: './client-goal-modal.component.html',
  styleUrls: ['./client-goal-modal.component.scss'],
})
export class ClientGoalModalComponent implements OnInit {
  private req: Subscription;
  private reqEmployee: Subscription;
  private employeeTask$: any;
  private employees$: any;
  clientGoalForm!: FormGroup;

  public goalTypeOptions: any[] = ["NDIS", "Personal"];
  public goalOptions:any[] = ["Goal Option 1", "Goal Option 2"];
  public goalDuration: any[] = [
    {id: 1, name: "Short Term (within 12 months)"}, 
    {id: 2, name: "Medium Term (12-24 months)"}, 
    {id: 3, name: "Long Term (24 plus months)"}, 
    {id: 4, name: "Ongoing"}
  ].map(el => el?.name);

  public tasksOptions: any[] = [/*
    {id: 1, name: "Short Task"}, 
    {id: 2, name: "Submit Documents"}, 
    {id: 3, name: "Successful Physical Theraphy"}, 
    {id: 4, name: `Submit Driver's License`}
  */];

  public tasksArray: any[] = [{id: 1}];

  public assignedTo: any[] = [];

  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public loading: boolean = true;
  public goalClientOptions:any[] = ["Goal Client 1", "Goal Client 2"];
  public statusOptions:any[] = ["Complete", "Active", "On Hold", "Cancelled", "In Progress"];
  public taskArray: any = [{tasks: [], assigned_to: ''}];

  public employeeLoading:boolean =false

  constructor(
    private adminEmployeeTask: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<ClientGoalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {
    console.log(data)
    this.employeeTask$ = this.adminEmployeeTask.pipe(select(state => state));
    this.employees$ = this.adminEmployeeTask.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.getTasks();

    this.clientGoalForm = this.formBuilder.group({
      goal_client: [this.data ? `${this.data?.client?.first_name} ${this.data?.client?.last_name}` : '', [Validators.required]],
      goal: [this.data ? this.data?.data?.goal : ''],
      goal_type: [this.data ? this.data?.data?.goal_type : ''],
      description: [this.data ? this.data?.data?.description : ''],
      duration: [this.data ? this.data?.data?.duration : ''],
      //tasks: [[{id: '', name: ''}]],

      employee_task_id: [this.data ? this.data?.data?.employee_task_id : ''],
      assigned_to_id: [this.data ? this.data?.data?.assigned_to_id : ''],

      employee_id: [this.data ? this.data?.data?.employee_id : ''],
      status: [this.data ? this.data?.data?.status : ''],
      start_date: [this.data?.data?.start_date ? new Date(this.data?.data?.start_date * 1000) : ''],
      end_date:[this.data?.data?.end_date ? new Date(this.data?.data?.end_date * 1000) : ''],
      reportable_goal: [this.data ? this.data?.data?.reportable_goal : ''],
    });

    /*this.clientGoalForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      goal_client: [''],
      goal: [''],
      goal_type: [''],
      status: [''],
      start_date: [''],
      end_date: [''],
      description: [''],
    });*/
    this.clientGoalForm.controls['employee_task_id'].valueChanges.subscribe((result)=> {
      console.log(result)
      if(result && !this.clientGoalForm.controls['assigned_to_id'].value){
        let selectedTask = this.tasksOptions.find(el => el?.id === result);
        this.clientGoalForm.controls['assigned_to_id'].setValue(selectedTask?.employee_id)
      }
    })

  }


  getTasks(){
    this.adminEmployeeTask.dispatch({
      type: EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST
    });

    this.adminEmployeeTask.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
    
    this.req = this.employeeTask$.subscribe((results: any) => {
      this.loading = results?.employeeTask.pending; 

      if (results?.employeeTask.employeeTaskList.length > 0) {
        results?.employeeTask.employeeTaskList.forEach((el) => el["name"] = `${el?.task_name} - ${el?.description}`);

        this.tasksOptions = results?.employeeTask.employeeTaskList.filter(el => el?.status.toLowerCase() === 'to do');
      }
    });
   
    this.reqEmployee = this.employees$.subscribe((results: any) => {
      this.employeeLoading = results?.employees?.employeeListPending; 

      if (results?.employees?.employeeList.length > 0) {
        results?.employees?.employeeList.forEach((el) => el["name"] = el?.name);

        this.assignedTo = results?.employees?.employeeList;
      }
    });
  }

  addTask(){
    const tasks = this.clientGoalForm.get('tasks') as FormArray;

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

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.clientGoalForm.valid){
      //this.clientGoalForm.controls['tasks'].setValue(this.taskArray[0])
      this.dialogRef.close(this.clientGoalForm.value);
      console.log(this.clientGoalForm.value, this.taskArray);
    }
  }
}

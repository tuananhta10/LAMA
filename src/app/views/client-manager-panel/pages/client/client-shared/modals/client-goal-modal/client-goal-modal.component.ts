import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-goal-modal',
  templateUrl: './client-goal-modal.component.html',
  styleUrls: ['./client-goal-modal.component.scss'],
})
export class ClientGoalModalComponent implements OnInit {

  clientGoalForm!: FormGroup;

  public goalTypeOptions: any[] = ["NDIS", "Personal"];
  public goalOptions:any[] = ["Goal Option 1", "Goal Option 2"];
  public goalDuration: any[] = [
    {id: 1, name: "Short Term (within 12 months)"}, 
    {id: 2, name: "Medium Term (12-24 months)"}, 
    {id: 3, name: "Long Term (24 plus months)"}, 
    {id: 4, name: "Ongoing"}
  ];

  public tasksOptions: any[] = [
    {id: 1, name: "Short Task"}, 
    {id: 2, name: "Submit Documents"}, 
    {id: 3, name: "Successful Physical Theraphy"}, 
    {id: 4, name: `Submit Driver's License`}
  ];

  public tasksArray: any[] = [{id: 1}];

  public assignedTo: any[] = [
    {id: 1, name: "James Morales"}, 
    {id: 2, name: "Andrew Boyant"}, 
    {id: 3, name: "Karen Mckrackin"}, 
    {id: 4, name: `Damian Marley`}
  ];

  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  public goalClientOptions:any[] = ["Goal Client 1", "Goal Client 2"];
  public statusOptions:any[] = ["Complete", "Active", "On Hold", "Cancelled", "In Progress"];

  public taskArray: any = [{tasks: [], assigned_to: ''}];

  constructor(
    public dialogRef: MatDialogRef<ClientGoalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    this.clientGoalForm = this.formBuilder.group({
      client_name: [this.data ? `${this.data?.client?.first_name} ${this.data?.client?.last_name}` : '', [Validators.required]],
      goal_name: [''],
      goal_type: [''],
      description: [''],
      duration: [''],
      tasks: [[{id: '', name: ''}]],
      assigned_to: [''],
      status: [''],
      reportable_goal: [''],
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
  }

  addTask(){
    const tasks = this.clientGoalForm.get('tasks') as FormArray
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
      //this.dialogRef.close(this.clientGoalForm.value);
      console.log(this.taskArray);
    }
  }
}

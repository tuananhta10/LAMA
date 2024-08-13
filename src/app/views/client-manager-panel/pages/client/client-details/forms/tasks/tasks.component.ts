import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shift-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class ShiftTasksComponent implements OnInit {
  public tasksList: any[] = [
    {id:1, name: "Task 1"},  
    {id:2, name: "Task 2"},  
    {id:3, name: "Task 3"}
  ]

  @Input() taskForm: FormGroup;
   
  constructor() { }

  ngOnInit(): void {
  }

}

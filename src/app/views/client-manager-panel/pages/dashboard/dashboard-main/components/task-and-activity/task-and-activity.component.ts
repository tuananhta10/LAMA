import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client-dashboard-task-and-activity',
  templateUrl: './task-and-activity.component.html',
  styleUrls: ['./task-and-activity.component.scss']
})
export class TaskAndActivityComponent implements OnInit {
  public defaultImage: string = '/assets/images/icons/user-placeholder.png';
  
  constructor() { }

  ngOnInit(): void {
  }

}

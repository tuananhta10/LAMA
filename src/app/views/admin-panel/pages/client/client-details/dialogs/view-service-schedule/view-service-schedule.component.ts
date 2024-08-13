import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientGoalDetailsComponent } from '../../components/goals/goals-form/client-goal-details/client-goal-details.component';

@Component({
  selector: 'app-view-service-schedule',
  templateUrl: './view-service-schedule.component.html',
  styleUrls: ['./view-service-schedule.component.scss']
})
export class ViewServiceScheduleComponent implements OnInit {

  public partnerDetailsForm: FormGroup;
  public serviceTaskForm: FormGroup;
  public serviceTravelForm: FormGroup;
  public formStep: number = 1;
  
  @ViewChild(ClientGoalDetailsComponent) clientGoalDetails: ClientGoalDetailsComponent;

  constructor(
    public dialogRef: MatDialogRef<ViewServiceScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(this.data)
  }

  ngOnInit(): void {
    
  }

  


}

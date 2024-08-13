import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';

@Component({
  selector: 'app-unassign-worker-schedule',
  templateUrl: './unassign-worker-schedule.component.html',
  styleUrls: ['./unassign-worker-schedule.component.scss']
})
export class UnassignWorkerScheduleComponent implements OnInit {

  public selection: string = '';
  public hasNotApprovedTimesheets:boolean = false

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<UnassignWorkerScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE MARK AS COMPLETE", data)
  }

  ngOnInit(): void {
  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      arrayData: this.data,
      cancel: false
    });
  }
}

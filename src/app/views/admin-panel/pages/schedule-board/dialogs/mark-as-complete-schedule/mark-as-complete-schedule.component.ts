import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
interface NotApprovedTimesheetList{
  date:string,
  client:string
}
@Component({
  selector: 'app-mark-as-complete-schedule',
  templateUrl: './mark-as-complete-schedule.component.html',
  styleUrls: ['./mark-as-complete-schedule.component.scss']
})
export class MarkAsCompleteScheduleComponent implements OnInit {

  public selection: string = '';
  public hasNotApprovedTimesheets:boolean = false
  public listOfNotApprovedTimesheetsSchedules:NotApprovedTimesheetList[] = []

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MarkAsCompleteScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE MARK AS COMPLETE", data)
  }

  ngOnInit(): void {
    if(!this.data) return
    this.data?.forEach(res => {
      if(res.approved_start_time == null && res.approved_end_time == null){
        this.listOfNotApprovedTimesheetsSchedules.push({ date: AdminHelper.formatDateToStandard(res?.calendar_start_date), client:res?.client?.name })
        this.hasNotApprovedTimesheets = true
      }
    })
  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      arrayData: this.data,
      cancel: false
    });
  }

}

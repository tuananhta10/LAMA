import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-day',
  templateUrl: './change-day.component.html',
  styleUrls: ['./change-day.component.scss']
})
export class ChangeDayComponent implements OnInit {

  public selection: string = '';
  public rescheduleForm!: FormGroup;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ChangeDayComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE CHANGE BY DAY", data)
  }

  ngOnInit(): void {
    this.rescheduleForm = this.formBuilder.group({
      add_days: [0],
    });

  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      data: this.rescheduleForm.value,
      arrayData: this.data,
      cancel: false
    });
  }

}

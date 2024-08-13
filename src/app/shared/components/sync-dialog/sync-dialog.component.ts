import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subscription } from 'rxjs';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { format } from 'date-fns';

@Component({
  selector: 'app-sync-dialog',
  templateUrl: './sync-dialog.component.html',
  styleUrls: ['./sync-dialog.component.scss']
})
export class SyncDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SyncDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private adminIncident: Store<AdminProfileState>,
    private formBuilder: FormBuilder
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
  }

  syncNow(){
    this.dialogRef.close({
      data: this.data?.data
    })
  }

}

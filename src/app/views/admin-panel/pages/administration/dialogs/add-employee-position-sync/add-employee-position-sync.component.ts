import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee-position-sync',
  templateUrl: './add-employee-position-sync.component.html',
  styleUrls: ['./add-employee-position-sync.component.scss']
})
export class AddEmployeePositionSyncComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEmployeePositionSyncComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log(data)
  }

  ngOnInit(): void {
  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      cancel: false
    });

    this.snackBar.open("Sync in-progress. Please don't change the page while sync is in progress.", "", {
      panelClass:'success-snackbar'
    });
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record',
  templateUrl: './delete-record.component.html',
  styleUrls: ['./delete-record.component.scss']
})
export class DeleteRecordComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DeleteRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE DELETED", data)
  }

  ngOnInit(): void {
  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      data: this.data,
      arrayData: this.data,
      cancel: false
    });
  }

}

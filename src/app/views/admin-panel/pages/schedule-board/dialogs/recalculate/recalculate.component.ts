import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recalculate',
  templateUrl: './recalculate.component.html',
  styleUrls: ['./recalculate.component.scss']
})
export class RecalculateComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<RecalculateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE RECALCULATED", data)
  }

  ngOnInit(): void {
  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      data: this.data?.id,
      arrayData: this.data,
      cancel: false
    });
  }


}

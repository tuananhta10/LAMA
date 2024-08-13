import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-undo-complete',
  templateUrl: './undo-complete.component.html',
  styleUrls: ['./undo-complete.component.scss']
})
export class UndoCompleteComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<UndoCompleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE UNDO COMPLETED", data)
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

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-archive-item',
  templateUrl: './delete-archive-item.component.html',
  styleUrls: ['./delete-archive-item.component.scss']
})
export class DeleteArchiveItemComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DeleteArchiveItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE DELETED", data)
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

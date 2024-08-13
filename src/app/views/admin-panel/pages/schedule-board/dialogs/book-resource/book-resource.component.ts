import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-resource',
  templateUrl: './book-resource.component.html',
  styleUrls: ['./book-resource.component.scss']
})
export class BookResourceComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<BookResourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE REBOOK", data)
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

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss']
})
export class PromotionDialogComponent implements OnInit {

  constructor(private router: Router,
    public dialogRef: MatDialogRef<PromotionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit(): void {
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel-subscription.component.html',
  styleUrls: ['./cancel-subscription.component.scss']
})
export class CancelSubscriptionComponent implements OnInit {

  public selection: string = '';
  public cancellationReason: string;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<CancelSubscriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("SUBSCRIPTION WILL BE CANCELLED", data)
  }

  ngOnInit(): void {
  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      cancel: true,
      cancellationReason: this.cancellationReason
    });
  }

}

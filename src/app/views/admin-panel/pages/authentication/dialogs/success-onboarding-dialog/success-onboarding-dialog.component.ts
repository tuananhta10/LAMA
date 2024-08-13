import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-onboarding-dialog',
  templateUrl: './success-onboarding-dialog.component.html',
  styleUrls: ['./success-onboarding-dialog.component.scss']
})
export class SuccessOnboardingDialogComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<SuccessOnboardingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  
  }
 
  ngOnInit(): void {
  }

}

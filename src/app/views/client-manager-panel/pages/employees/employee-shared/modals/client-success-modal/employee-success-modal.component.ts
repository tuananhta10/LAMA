import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-success-modal',
  templateUrl: './employee-success-modal.component.html',
  styleUrls: ['./employee-success-modal.component.scss'],
})
export class EmployeeSuccessModalComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EmployeeSuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  ngOnInit(): void {
    console.log("SUCCESS MODAL")
  }

  navigateToEmployees(): void {
    this.router.navigate(['/admin/employees']);
    this.dialogRef.close();
  }
}

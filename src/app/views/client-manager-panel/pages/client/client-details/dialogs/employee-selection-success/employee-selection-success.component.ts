import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-selection-success',
  templateUrl: './employee-selection-success.component.html',
  styleUrls: ['./employee-selection-success.component.scss']
})
export class EmployeeSelectionSuccessComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EmployeeSelectionSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  
  }

  ngOnInit(): void {
  }
}

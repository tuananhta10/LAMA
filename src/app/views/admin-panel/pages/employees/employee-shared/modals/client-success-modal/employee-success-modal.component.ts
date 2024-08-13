import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ComponentCanDeactivate } from '@main/shared/guards/can-deactivate/pending-changes.guard';
import { MatStepper } from '@angular/material/stepper';
import { Observable, Subscription } from 'rxjs';
import { mainAnimations } from '@app-main-animation';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';


@Component({
  selector: 'app-employee-success-modal',
  templateUrl: './employee-success-modal.component.html',
  styleUrls: ['./employee-success-modal.component.scss'],
})
export class EmployeeSuccessModalComponent implements OnInit {
  private employee$: any;
  constructor(
    private router: Router,
    private adminEmployee: Store<AdminProfileState>, 
    public dialog: MatDialog, 
    private snackBar: MatSnackBar, private datePipe : DatePipe,
    public dialogRef: MatDialogRef<EmployeeSuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  ngOnInit(): void {
    this.employee$ = this.adminEmployee.pipe(select(state => state.employee));

    let clientType = {
      type: 'employee-detail',
      id: this.data?.id,
      key: 'employeeDetail'
    }

    this.adminEmployee.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: clientType
    }); 
    console.log(this.data, "SUCCESS MODAL")
  }

  navigateToEmployees(): void {
    this.router.navigate(['/admin/employees']);
    this.dialogRef.close();
  }

  navigateToProfile(otherLink?: string){
    if(otherLink){
      this.router.navigate([`/admin/employees/details/${this.data?.successCreate?.id}/${otherLink}`]);
    }

    else {
      this.router.navigate([`/admin/employees/details/${this.data?.successCreate?.id}`]);
    }

    this.dialogRef.close();
  }
}

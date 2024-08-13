import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-selection-confirmation',
  templateUrl: './employee-selection-confirmation.component.html',
  styleUrls: ['./employee-selection-confirmation.component.scss']
})
export class EmployeeSelectionConfirmationComponent implements OnInit {
  public selection: string = '';
  public defaultImage = '/assets/images/placeholder/default-avatar.png';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EmployeeSelectionConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  
  }

  ngOnInit(): void {
  }

  selectPreference(selection: string){
    this.selection = selection;
  }

  confirmSelection(): void {
    this.dialogRef.close({
      confirm: true
    });
  }

}

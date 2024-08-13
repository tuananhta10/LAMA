import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-profile-password',
  templateUrl: './update-profile-password.component.html',
  styleUrls: ['./update-profile-password.component.scss']
})
export class UpdateProfilePasswordComponent implements OnInit {
  public userForm!: FormGroup;
  public required:boolean = true;
  
  constructor(
    public dialogRef: MatDialogRef<UpdateProfilePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private employeeStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let employeeName = `${this.data.employeeData.first_name} ${this.data.employeeData.last_name}`;

    this.userForm = this.formBuilder.group({
      employeeName: [employeeName, [Validators.required]],
      email: [this.data?.employeeData ? this.data?.employeeData?.email_address : '', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_new_password: ['', [Validators.required, Validators.minLength(6)]]
    },{validator: this.checkIfMatchingPasswords('new_password', 'confirm_new_password')});
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  close(): void  {
    this.dialogRef.close(null);
  }

  save(): void {
    if(this.userForm.valid){
      let data = {
        id : this.data?.employeeData?.id,
        password : this.userForm.controls['new_password'].value
      }

      this.employeeStore.dispatch({
        type: EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD,
        payload: data
      });
      
      this.dialogRef.close(data);
    }
  }
}

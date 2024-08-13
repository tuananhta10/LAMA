import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-update-profile-password',
  templateUrl: './update-profile-password.component.html',
  styleUrls: ['./update-profile-password.component.scss']
})
export class UpdateProfilePasswordComponent implements OnInit {
  private positionReq: Subscription; 
  public userForm!: FormGroup;
  public loading: boolean = true;
  public required:boolean = true;
  public position: any[] = [];
  private enum$: any;
  private isFirstLoad:boolean = true;
  public errorMessage:string = '';
  
  constructor(
    public dialogRef: MatDialogRef<UpdateProfilePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private clientStore: Store<AdminProfileState>,
    private adminEnumStore: Store<AdminProfileState>, 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let clientName = `${this.data.clientData.first_name} ${this.data.clientData.last_name}`;

    this.userForm = this.formBuilder.group({
      clientName: [clientName, [Validators.required]],
      email: [this.data?.clientData ? this.data?.clientData?.email_address : ''],
      new_password: [''],
      confirm_new_password: [''],

      last_date: [''],  
      reason_for_leaving: ['']
    },{validator: this.checkIfMatchingPasswords('new_password', 'confirm_new_password')});

    setTimeout(() => this.loading = false, 1500)
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
      let data: any = {
        id : this.data?.clientData?.id,
        password : this.userForm.controls['new_password'].value
      }

      if(this.data?.deactivate){
        data = { 
          id : this.data?.clientData?.id,
          last_date: convertTimestampUtc(this.userForm.controls['last_date'].value),
          reason_for_leaving: this.userForm.controls['reason_for_leaving'].value,
          status: 'inactive' 
        }
      }

      this.clientStore.dispatch({
        type: ClientActionTypes.EDIT_CLIENT_PASSWORD,
        payload: data
      });
      
      this.dialogRef.close(data);
    }
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-profile-sms',
  templateUrl: './add-profile-sms.component.html',
  styleUrls: ['./add-profile-sms.component.scss']
})
export class AddProfileSmsComponent implements OnInit {
  private req: Subscription;
  public newSMSForm!: FormGroup;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  constructor(
    public dialogRef: MatDialogRef<AddProfileSmsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminInterest: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    let sms_to = this.data && this.data?.action === 'reply' ? this.data?.content?.phone_number : '';
    let content = this.data && this.data?.action === 'forward' ? this.data?.content?.content : '';

    this.newSMSForm = this.formBuilder.group({
      sms_from: [this.loggedUser?.first_name + ' ' + this.loggedUser?.last_name ],
      sms_from_phone_number: [this.loggedUser?.work_phone_no || this.loggedUser?.mobile_phone_no || this.loggedUser?.home_phone_no],
      sms_to_phone_number: [sms_to],
      sms_to: [this.data?.employee.name],
      sms_subject: [this.data?.action === 'forward' ? 'RE: ' + this.data?.content?.subject : ''],
      sms_content: [content]
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newSMSForm.valid  && !this.data){
      let body = {
      }

      this.close();
    }  else if(this.newSMSForm.valid  && this.data){

      this.close();
    }

    else {
      this.close();
    }
  }


}

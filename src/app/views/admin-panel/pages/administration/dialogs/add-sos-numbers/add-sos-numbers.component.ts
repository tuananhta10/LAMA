import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmergencyNumberActionTypes } from '@main/views/admin-panel/store/actions/admin-emergency-number.action';
//import { SosNumberActionTypes } from '@main/views/admin-panel/store/actions/admin-sosNumber.action';

@Component({
  selector: 'app-add-sos-numbers',
  templateUrl: './add-sos-numbers.component.html',
  styleUrls: ['./add-sos-numbers.component.scss']
})
export class AddSosNumbersComponent implements OnInit {

 private sosNumber$: any;
  private req: Subscription;
  public newSosNumberForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AddSosNumbersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminSosNumber: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newSosNumberForm = this.formBuilder.group({
      title: [this.data ? this.data?.title : '', [Validators.required]],
      phone_number: [this.data ? this.data?.phone_number : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));
    if(this.newSosNumberForm.valid  && !this.data){
      let data = {
        ...this.newSosNumberForm.value,
        organization_id: loggedUser?.organization_id
      }
      this.adminSosNumber.dispatch({
        type: EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER,
        payload: this.newSosNumberForm.value
      }); 

      this.close();
    }  else if(this.newSosNumberForm.valid  && this.data){

      let editData = {
        ...this.newSosNumberForm.value,
        organization_id: loggedUser?.organization_id,
        id: this.data.id
      }

      this.adminSosNumber.dispatch({
        type: EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER,
        payload: editData
      }); 

      this.close();
    }

    else {
      this.close();
    }

    this.close();
  }

}

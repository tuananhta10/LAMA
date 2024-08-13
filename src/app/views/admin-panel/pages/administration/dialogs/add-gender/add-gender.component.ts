import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';

@Component({
  selector: 'app-add-gender',
  templateUrl: './add-gender.component.html',
  styleUrls: ['./add-gender.component.scss']
})
export class AddGenderComponent implements OnInit {

  private interest$: any;
  private req: Subscription;
  public newGenderForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AddGenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminGender: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newGenderForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newGenderForm.valid  && !this.data){
      this.adminGender.dispatch({
        type: InterestActionTypes.SAVE_INTEREST,
        payload: this.newGenderForm.value
      }); 

      this.close();
    }  else if(this.newGenderForm.valid  && this.data){

      let editData = {
        ...this.newGenderForm.value,
        id: this.data.id
      }

      this.adminGender.dispatch({
        type: InterestActionTypes.EDIT_INTEREST,
        payload: editData
      }); 

      this.close();
    }

    else {
      this.close();
    }
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';

@Component({
  selector: 'app-add-hobbies',
  templateUrl: './add-hobbies.component.html',
  styleUrls: ['./add-hobbies.component.scss']
})
export class AddHobbiesComponent implements OnInit {

  private interest$: any;
  private req: Subscription;
  public newHobbyForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AddHobbiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminHobby: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newHobbyForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newHobbyForm.valid  && !this.data){
      this.adminHobby.dispatch({
        type: InterestActionTypes.SAVE_INTEREST,
        payload: this.newHobbyForm.value
      }); 

      this.close();
    }  else if(this.newHobbyForm.valid  && this.data){

      let editData = {
        ...this.newHobbyForm.value,
        id: this.data.id
      }

      this.adminHobby.dispatch({
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

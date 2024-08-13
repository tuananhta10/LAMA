import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';

@Component({
  selector: 'app-add-list-of-interests',
  templateUrl: './add-list-of-interests.component.html',
  styleUrls: ['./add-list-of-interests.component.scss']
})
export class AddListOfInterestsComponent implements OnInit {
  private interest$: any;
  private req: Subscription;
  public newInterestForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AddListOfInterestsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminInterest: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newInterestForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newInterestForm.valid  && !this.data){
      this.adminInterest.dispatch({
        type: InterestActionTypes.SAVE_INTEREST,
        payload: this.newInterestForm.value
      }); 

      this.close();
    }  else if(this.newInterestForm.valid  && this.data){

      let editData = {
        ...this.newInterestForm.value,
        id: this.data.id
      }

      this.adminInterest.dispatch({
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

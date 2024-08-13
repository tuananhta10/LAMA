import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';

@Component({
  selector: 'app-add-job-type',
  templateUrl: './add-job-type.component.html',
  styleUrls: ['./add-job-type.component.scss']
})
export class AddJobTypeComponent implements OnInit {

  private interest$: any;
  private req: Subscription;
  public newJobTypeForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AddJobTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminJobType: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newJobTypeForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newJobTypeForm.valid  && !this.data){
      this.adminJobType.dispatch({
        type: InterestActionTypes.SAVE_INTEREST,
        payload: this.newJobTypeForm.value
      }); 

      this.close();
    }  else if(this.newJobTypeForm.valid  && this.data){

      let editData = {
        ...this.newJobTypeForm.value,
        id: this.data.id
      }

      this.adminJobType.dispatch({
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


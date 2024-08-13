import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {

  private interest$: any;
  private req: Subscription;
  public newSkillForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AddSkillsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminSkill: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newSkillForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newSkillForm.valid  && !this.data){
      this.adminSkill.dispatch({
        type: InterestActionTypes.SAVE_INTEREST,
        payload: this.newSkillForm.value
      }); 

      this.close();
    }  else if(this.newSkillForm.valid  && this.data){

      let editData = {
        ...this.newSkillForm.value,
        id: this.data.id
      }

      this.adminSkill.dispatch({
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

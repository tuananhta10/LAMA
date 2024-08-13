import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { GoalTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-goal-template.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-add-goal-template',
  templateUrl: './add-goal-template.component.html',
  styleUrls: ['./add-goal-template.component.scss']
})
export class AddGoalTemplateComponent implements OnInit {

  public addGoalTemplateForm!: FormGroup;
  public file: File;
    
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddGoalTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminGoalTemplate: Store<AdminProfileState>,
  ) { }

  ngOnInit(): void {
    this.addGoalTemplateForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      instruction: [this.data ? this.data?.instruction : '', [Validators.required]]
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.addGoalTemplateForm.valid && !this.data){
      this.adminGoalTemplate.dispatch({
        type: GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE,
        payload: this.addGoalTemplateForm.value 
      });

      this.close();
    } else if(this.addGoalTemplateForm.valid && this.data){
      let editData = {
        id: this.data.id,
        ...this.addGoalTemplateForm.value
      }
      this.adminGoalTemplate.dispatch({
        type: GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE,
        payload: editData
      });

      this.close();
    }
  }


  onUpload(file: any): void {
    this.addGoalTemplateForm.get('image').setValue(file);
  }

}

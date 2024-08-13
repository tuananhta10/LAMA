import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { FormTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-form-template.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-form-template',
  templateUrl: './add-form-template.component.html',
  styleUrls: ['./add-form-template.component.scss']
})
export class AddFormTemplateComponent implements OnInit {
  public addTemplateForm!: FormGroup;
  public file: File;
  public conditionOptions:any[] = ["Psychosocial", "Intellectual disability", "Autism", "Epilepsy", "Cerebral palsy", "Genetic conditions", "Spinal cord injury or brain injury", "Permanent blindness", "Permanent bilateral hearing loss", "Deaf Blindness", "Amputation", "Dementia", "Stroke", "Deaf", "Others"];
  
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddFormTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminFormTemplate: Store<AdminProfileState>,
  ) { }

  ngOnInit(): void {
    this.addTemplateForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      condition: [this.data ? this.data?.condition : '', [Validators.required]]
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.addTemplateForm.valid && !this.data){
      this.adminFormTemplate.dispatch({
        type: FormTemplateActionTypes.SAVE_FORM_TEMPLATE,
        payload: this.addTemplateForm.value 
      });

      this.close();
    } else if(this.addTemplateForm.valid && this.data){
      let editData= {
        ...this.addTemplateForm.value,
        id: this.data.id
      }
      this.adminFormTemplate.dispatch({
        type: FormTemplateActionTypes.EDIT_FORM_TEMPLATE,
        payload: editData
      });

      this.close();
    }

    // UPDATE DATA 
    else {
      this.close();
    }
  }


  onUpload(file: any): void {
    this.addTemplateForm.get('image').setValue(file);
  }


}

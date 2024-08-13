import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeDocActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-doc.action';

@Component({
  selector: 'app-document-modal',
  templateUrl: './documents-modal.component.html',
  styleUrls: ['./documents-modal.component.scss'], 
})
export class DocumentsModalComponent implements OnInit {

  documentsForm!: FormGroup;
  required:boolean = true;
  customProviderOptions:any[] = ["Move Up"];
  membershipNumberOptions:any[] = ["002323", "004343"];

  public typeOption:string[] = [
    "Policy", "Agreement", "Others"
  ];

  file: File;
  
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<DocumentsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private documentsStore: Store<AdminProfileState>
  ) {}

  ngOnInit(): void {
    this.documentsForm = this.formBuilder.group({
      title: [this.data ? this.data?.document?.title : '', [Validators.required]],
      type: [this.data ? this.data?.document?.type : '', [Validators.required]],
      description: [this.data ? this.data?.document?.description : ''],
      attachment:['', [Validators.required]]
    });
  }

  onUpload(file: any) {
    this.documentsForm.get('attachment').setValue(file);
  }

  close() {
    this.dialogRef.close(null);
  }

  save(): void {
    if(this.documentsForm.valid){

      let data = {
        ...this.documentsForm.value,
        employee_id: this.data.employee_id
      }

      this.documentsStore.dispatch({
        type: EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC,
        payload: data
      });

      this.close()
    }
  }
}

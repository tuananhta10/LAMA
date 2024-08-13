import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeDocActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-doc.action';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  public file: File;
  public currentFile: any;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<DocumentsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private documentsStore: Store<AdminProfileState>,
    public snackBar: MatSnackBar,
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    this.documentsForm = this.formBuilder.group({
      title: [this.data ? this.data?.document?.title : '', [Validators.required]],
      type: [this.data ? this.data?.document?.type : '', [Validators.required]],
      description: [this.data ? this.data?.document?.description : ''],
      is_private: [this.data ? (this.data?.document?.is_private || true): true],
      attachment:[''/*, [Validators.required]*/]
    });

    this.currentFile = this.data?.document?.attachment[0];
  }

  onUpload(file: any) {
    this.documentsForm.get('attachment').setValue(file);
  }

  close() {
    this.dialogRef.close(null);
  }

  save(): void {
    this.snackBar.open("Update is currently in progress. Please do not close your window or you will lose your changes.", "", {
      panelClass:'success-snackbar'
    });

    if(this.documentsForm.valid && !this.data?.document){

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

    else if(this.documentsForm.valid && this.data?.document){
      let data = {
        ...this.documentsForm.value,
        employee_id: this.data.employee_id,
        id: this.data?.document?.id
      }

      this.documentsStore.dispatch({
        type: EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC,
        payload: data
      });

      this.close()
    }
  }
}

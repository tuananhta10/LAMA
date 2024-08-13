import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';

@Component({
  selector: 'app-custom-document-modal',
  templateUrl: './custom-document-modal.component.html',
  styleUrls: ['./custom-document-modal.component.scss'], 
})
export class CustomDocumentModalComponent implements OnInit {

  customDocumentForm!: FormGroup;
  required:boolean = true;
  customProviderOptions:any[] = ["Move Up"];
  membershipNumberOptions:any[] = ["002323", "004343"];

  public typeOption:string[] = [
    "Policy", "Agreement", "Others"
  ];
  public currentFile: any;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  file: File;
  
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<CustomDocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.customDocumentForm = this.formBuilder.group({
      title: [this.data ? this.data?.document?.title : '', [Validators.required]],
      type: [this.data ? this.data?.document?.type : '', [Validators.required]],
      description: [this.data ? this.data?.document?.description : ''],
      is_private: [this.data ? (this.data?.document?.is_private || false): true],
      attachment:['']
    });

    this.currentFile = this.data?.document?.attachment[0];
  }

  onUpload(file: any) {
    this.customDocumentForm.get('attachment').setValue(file);
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.customDocumentForm.valid){
      this.dialogRef.close(this.customDocumentForm.value);
    }
  }
}

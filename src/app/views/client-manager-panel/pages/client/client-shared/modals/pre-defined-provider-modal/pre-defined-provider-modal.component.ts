import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';

@Component({
  selector: 'app-pre-defined-provider-modal',
  templateUrl: './pre-defined-provider-modal.component.html',
  styleUrls: ['./pre-defined-provider-modal.component.scss'],
})
export class PreDefinedProviderModalComponent implements OnInit {

  preDefinedProviderForm!: FormGroup;
  required:boolean = true;
  preDefinedProviderOptions:any[] = ["Move Up"];
  membershipNumberOptions:any[] = ["002323", "004343"];
  file: File;
  
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<PreDefinedProviderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.preDefinedProviderForm = this.formBuilder.group({
      preDefinedProvider: ['', [Validators.required]],
      membershipNumber: ['', [Validators.required]],
      expiryDate: [''],
      file: [''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  onUpload(file: any) {
    this.preDefinedProviderForm.get('file').setValue(file);
  }

  save(){
    if(this.preDefinedProviderForm.valid){
      this.dialogRef.close(this.preDefinedProviderForm.value);
    }
  }
}

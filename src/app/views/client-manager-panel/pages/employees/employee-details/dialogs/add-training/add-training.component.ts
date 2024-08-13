import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {

  public trainingForm!: FormGroup;
  public required:boolean = true;
  public typeOption:string[] = [
    "ID", "License", "Clearance", "Passport", "Type", "Others"
  ];

  public qualifications:string[] = [
    "ID Drivers's License", "National Police Clearance", "ID Passport", "NDIS Orientation",
    "COVID Infection Control", "Careworker Practices Module", "COVID Clearance"
  ];

  public statusOption: string[] = [
    "Active", "Pending", "Inactive"
  ];

  file: File;
  
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let employeeName = `${this.data.employeeData.first_name} ${this.data.employeeData.last_name}`;

    this.trainingForm = this.formBuilder.group({
      employeeName: [employeeName, [Validators.required]],
      status: ['2', [Validators.required]],
      type: ['', [Validators.required]],
      qualifications: ['', [Validators.required]],
      expiryDate: [''],
      completionDate: [''],
      description: [''],
      remarks: [''],
    });
  }

  onUpload(file: any): void {
    this.file = file;
  }

  close(): void  {
    this.dialogRef.close(null);
  }

  save(): void {
    if(this.trainingForm.valid){
      this.dialogRef.close(this.trainingForm.value);
    }
  }


}

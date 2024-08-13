import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-health-care-providers-modal',
  templateUrl: './health-care-providers-modal.component.html',
  styleUrls: ['./health-care-providers-modal.component.scss']
})
export class HealthCareProvidersModalComponent implements OnInit {

  healthCareProviderForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<HealthCareProvidersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.healthCareProviderForm = this.formBuilder.group({
      name: [this.data ? this.data?.data?.name : '', [Validators.required]],
      clinic: [this.data ? this.data?.data?.clinic : '', [Validators.required]],
      phone_no: [this.data ? this.data?.data?.phone_no : ''],
      reason: [this.data ? this.data?.data?.reason : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.healthCareProviderForm.valid){
      this.dialogRef.close(this.healthCareProviderForm.value);
    }
  }

}

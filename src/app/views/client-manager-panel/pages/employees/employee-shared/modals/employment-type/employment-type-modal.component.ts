import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employment-type-modal',
  templateUrl: './employment-type-modal.component.html',
  styleUrls: ['./employment-type-modal.component.scss'],
})
export class EmploymentTypeModalComponent implements OnInit {

  employmentTypeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmploymentTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employmentTypeForm = this.formBuilder.group({
      employmentType: ['', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.employmentTypeForm.valid){
      this.dialogRef.close(this.employmentTypeForm.value);
    }
  }
}

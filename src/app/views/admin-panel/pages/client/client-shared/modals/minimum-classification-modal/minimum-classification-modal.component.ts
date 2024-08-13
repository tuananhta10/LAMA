import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-minimum-classification-modal',
  templateUrl: './minimum-classification-modal.component.html',
  styleUrls: ['./minimum-classification-modal.component.scss'],
})
export class MinimumClassificationModalComponent implements OnInit {

  minimumClassificationForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MinimumClassificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.minimumClassificationForm = this.formBuilder.group({
      minimumClassification: ['', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.minimumClassificationForm.valid){
      this.dialogRef.close(this.minimumClassificationForm.value);
    }
  }
}

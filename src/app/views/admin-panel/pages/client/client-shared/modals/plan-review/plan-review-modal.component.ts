import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-review-modal',
  templateUrl: './plan-review-modal.component.html',
  styleUrls: ['./plan-review-modal.component.scss'],
})
export class PlanReviewModalComponent implements OnInit {

  planReviewForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PlanReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.planReviewForm = this.formBuilder.group({
      name: [this.data ? this.data?.data?.name : ''],
      client_name: [this.data?.client || '', [Validators.required]],
      due_date: [this.data ? new Date(this.data?.data?.due_date * 1000) : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.planReviewForm.valid){
      this.dialogRef.close(this.planReviewForm.value);
    }
  }
}

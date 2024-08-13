import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-main-branch-modal',
  templateUrl: './main-branch-modal.component.html',
  styleUrls: ['./main-branch-modal.component.scss'],
})
export class MainBranchModalComponent implements OnInit {

  mainBranchForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MainBranchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.mainBranchForm = this.formBuilder.group({
      mainBranch: ['', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.mainBranchForm.valid){
      this.dialogRef.close(this.mainBranchForm.value);
    }
  }
}

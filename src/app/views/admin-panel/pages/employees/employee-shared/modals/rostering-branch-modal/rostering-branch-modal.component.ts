import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rostering-branch-modal',
  templateUrl: './rostering-branch-modal.component.html',
  styleUrls: ['./rostering-branch-modal.component.scss'],
})
export class RosteringBranchModalComponent implements OnInit {

  rosteringBranchForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RosteringBranchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rosteringBranchForm = this.formBuilder.group({
      name: [''],
      code: [''],
      mobile_phone: [''],
      email: [''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.rosteringBranchForm.valid){
      this.dialogRef.close(this.rosteringBranchForm.value);
    }
  }
}

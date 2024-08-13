import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-program-modal',
  templateUrl: './program-modal.component.html',
  styleUrls: ['./program-modal.component.scss'],
})
export class ProgramModalComponent implements OnInit {

  programForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProgramModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.programForm = this.formBuilder.group({
      program: ['', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.programForm.valid){
      this.dialogRef.close(this.programForm.value);
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-religion-modal',
  templateUrl: './religion-modal.component.html',
  styleUrls: ['./religion-modal.component.scss'],
})
export class ReligionModalComponent implements OnInit {

  religionForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReligionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.religionForm = this.formBuilder.group({
      religion: ['', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.religionForm.valid){
      this.dialogRef.close(this.religionForm.value);
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss'],
})
export class LanguageModalComponent implements OnInit {

  languageForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LanguageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.languageForm = this.formBuilder.group({
      language: ['', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.languageForm.valid){
      this.dialogRef.close(this.languageForm.value);
    }
  }
}

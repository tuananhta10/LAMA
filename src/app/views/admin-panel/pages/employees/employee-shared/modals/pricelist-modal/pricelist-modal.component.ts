import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pricelist-modal',
  templateUrl: './pricelist-modal.component.html',
  styleUrls: ['./pricelist-modal.component.scss'],
})
export class PricelistModalComponent implements OnInit {

  pricelistForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PricelistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pricelistForm = this.formBuilder.group({
      pricelist: ['', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.pricelistForm.valid){
      this.dialogRef.close(this.pricelistForm.value);
    }
  }
}

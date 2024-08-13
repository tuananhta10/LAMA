import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-brokerage-modal',
  templateUrl: './brokerage-modal.component.html',
  styleUrls: ['./brokerage-modal.component.scss'],
})
export class BrokerageModalComponent implements OnInit {

  brokerageForm!: FormGroup;
  localData:any;

  constructor(
    public dialogRef: MatDialogRef<BrokerageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {
    this.localData = data;
  }

  ngOnInit(): void {
    this.brokerageForm = this.formBuilder.group({
      default: [this.data ? this.data?.default : '', [Validators.required]],
      brokerage_number: [this.data ? this.data?.brokerage_number : ''],
      name: [this.data ? this.data?.name : ''],
      contact_name: [this.data ? this.data?.contact_name : ''],
      contact_number: [this.data ? this.data?.contact_number : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.brokerageForm.valid){
      this.dialogRef.close(this.brokerageForm.value);
    }
  }
}

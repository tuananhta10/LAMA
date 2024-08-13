import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medication-modal',
  templateUrl: './medication-modal.component.html',
  styleUrls: ['./medication-modal.component.scss'],
})
export class MedicationModalComponent implements OnInit {

  medicationForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MedicationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.medicationForm = this.formBuilder.group({
      name: [this.data?.data ? this.data?.data?.name : '', [Validators.required]],
      dose: [this.data?.data ? this.data?.data?.dose : '', [Validators.required]],
      administer: [this.data?.data ? this.data?.data?.administer : ''],
      medication_time: [this.data?.data ? this.convertTo24Hour(this.data?.data?.medication_time) : '12:00'],
    });
  }

  convertTo24Hour(amPmString) { 
    let d = new Date("1/1/2013 " + amPmString); 
    return d.getHours() + ':' + d.getMinutes(); 
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.medicationForm.valid){
      this.dialogRef.close(this.medicationForm.value);
    }
  }
}

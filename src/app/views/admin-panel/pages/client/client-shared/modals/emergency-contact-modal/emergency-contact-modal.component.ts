import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emergency-contact-modal',
  templateUrl: './emergency-contact-modal.component.html',
  styleUrls: ['./emergency-contact-modal.component.scss']
})
export class EmergencyContactModalComponent implements OnInit {

  emergencyContactForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmergencyContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.emergencyContactForm = this.formBuilder.group({
      emergency_contact_name: [this.data ? this.data?.data?.emergency_contact_name : '', [Validators.required]],
      emergency_contact_no: [this.data ? this.data?.data?.emergency_contact_no : '', [Validators.required]],
      emergency_contact_relationship: [this.data ? this.data?.data?.emergency_contact_relationship : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.emergencyContactForm.valid){
      this.dialogRef.close(this.emergencyContactForm.value);
    }
  }

}

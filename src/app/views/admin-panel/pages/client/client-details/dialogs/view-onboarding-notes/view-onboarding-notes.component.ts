import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-view-onboarding-notes',
  templateUrl: './view-onboarding-notes.component.html',
  styleUrls: ['./view-onboarding-notes.component.scss']
})
export class ViewOnboardingNotesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewOnboardingNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  }

}

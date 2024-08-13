import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-selection-success',
  templateUrl: './client-selection-success.component.html',
  styleUrls: ['./client-selection-success.component.scss']
})
export class ClientSelectionSuccessComponent implements OnInit {

  public selection: string = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ClientSelectionSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  
  }

  ngOnInit(): void {
  }


}

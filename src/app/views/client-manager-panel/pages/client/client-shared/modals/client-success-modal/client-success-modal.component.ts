import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-success-modal',
  templateUrl: './client-success-modal.component.html',
  styleUrls: ['./client-success-modal.component.scss'],
})
export class ClientSuccessModalComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ClientSuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  ngOnInit(): void {
  }

  navigateToClients(): void {
    this.dialogRef.close();
    this.router.navigate(['/admin/clients']);
  }
}

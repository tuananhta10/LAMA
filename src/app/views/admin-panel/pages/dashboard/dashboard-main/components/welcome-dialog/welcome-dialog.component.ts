import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-welcome-dialog',
  animations: [mainAnimations],
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent implements OnInit {
  private req: Subscription;
  public loading: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<WelcomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 300)
  }

  ngOnDestroy(){
    this.close()
  }

  close() {
    this.dialogRef.close(null);
  }


  navigateTo(route){
    this.router.navigate([route]).then(() => this.close())
  }


}

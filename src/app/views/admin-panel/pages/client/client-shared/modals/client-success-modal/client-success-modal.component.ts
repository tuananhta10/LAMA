import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ComponentCanDeactivate } from '@main/shared/guards/can-deactivate/pending-changes.guard';
import { MatStepper } from '@angular/material/stepper';
import { Observable, Subscription } from 'rxjs';
import { mainAnimations } from '@app-main-animation';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';


@Component({
  selector: 'app-client-success-modal',
  templateUrl: './client-success-modal.component.html',
  styleUrls: ['./client-success-modal.component.scss'],
})
export class ClientSuccessModalComponent implements OnInit {
  private client$: any;  
  constructor(
    private router: Router,
    private adminEmployee: Store<AdminProfileState>, 
    public dialog: MatDialog, 
    private snackBar: MatSnackBar, private datePipe : DatePipe,
    public dialogRef: MatDialogRef<ClientSuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    this.client$ = this.adminEmployee.pipe(select(state => state.employee));

    let clientType = {
      type: 'client-details',
      id: this.data?.id,
      key: 'clientDetail'
    }

    this.adminEmployee.dispatch({
      type: ClientActionTypes.GET_CLIENT,
      payload: clientType
    }); 
    console.log(this.data, "SUCCESS MODAL")
  }

  navigateToClients(): void {
    this.router.navigate(['/admin/clients']);
    this.dialogRef.close();
  }

  navigateToProfile(otherLink?: string){
    if(otherLink){
      //this.router.navigate([`/admin/clients/details/${this.data?.successCreate?.id}/${otherLink}`]);
      window.location.href = `/admin/clients/details/${this.data?.successCreate?.id}/${otherLink}`;
    }

    else {
      //this.router.navigate([`/admin/clients/details/${this.data?.successCreate?.id}`]);
      window.location.href = `/admin/clients/details/${this.data?.successCreate?.id}`;
    }

    this.dialogRef.close();
  }

  navigateToGoals(){
    sessionStorage.setItem('clientFormStep', '6');
    this.router.navigate([`/admin/clients/edit/${this.data?.successCreate?.id}`]);
    this.dialogRef.close();
  }
}

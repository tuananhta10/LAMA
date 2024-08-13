import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';

@Component({
  selector: 'app-care-worker-modal',
  templateUrl: './care-worker-modal.component.html',
  styleUrls: ['./care-worker-modal.component.scss'],
})
export class CareWorkerModalComponent implements OnInit {

  careWorkerForm!: FormGroup;
  localData:any;

  public loading: boolean = true;
  private req: Subscription;
  private clientData$: any;
  clientOptions:any;

  constructor(
    public dialogRef: MatDialogRef<CareWorkerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private clientListStore: Store<EmployeeListState>,
  ) {
    this.localData = data;
    this.clientData$ = this.clientListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.careWorkerForm = this.formBuilder.group({
      client: ['', [Validators.required]],
    });

    this.subscribeEnum();

    this.clientListStore.dispatch({
      type: ClientListActionTypes.GET_CLIENT_LIST
    });
  }

  subscribeEnum(){
    this.req = this.clientData$.subscribe((results: any) => {
      this.clientOptions = results?.clients.clientList.filter(el => this.data.client_added.indexOf(el.id) === -1);
      this.loading = results?.clients.clientListPending;
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.careWorkerForm.valid){
      console.log(this.careWorkerForm?.value)

      this.dialogRef.close(this.careWorkerForm.value);
    }
  }
}

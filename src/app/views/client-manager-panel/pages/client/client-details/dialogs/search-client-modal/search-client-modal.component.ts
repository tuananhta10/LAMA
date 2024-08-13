import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';

@Component({
  selector: 'app-search-client-modal',
  templateUrl: './search-client-modal.component.html',
  styleUrls: ['./search-client-modal.component.scss'],
})
export class SearchClientModalComponent implements OnInit {

  clientForm!: FormGroup;
  localData:any;

  public loading: boolean = true;
  private req: Subscription;
  private clientsData$: any;
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  clientOptions:any;

  constructor(
    public dialogRef: MatDialogRef<SearchClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private clientListStore: Store<ClientListState>,
  ) {
    this.localData = data;
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      client: ['', [Validators.required]]
    });

    this.subscribeEnum();

    this.clientListStore.dispatch({
      type: ClientListActionTypes.GET_CLIENT_LIST
    });
  }

  subscribeEnum(){
    this.req = this.clientsData$.subscribe((results: any) => {
      this.clientOptions = results?.clients.clientList.filter(el => this.data.client_added.indexOf(el.id) === -1);
      this.loading = results?.clients.clientListPending;
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.clientForm.valid){
      this.dialogRef.close(this.clientForm.value);
    }
  }
}

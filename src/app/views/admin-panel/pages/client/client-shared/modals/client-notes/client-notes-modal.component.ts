import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';


@Component({
  selector: 'app-client-notes-modal',
  templateUrl: './client-notes-modal.component.html',
  styleUrls: ['./client-notes-modal.component.scss'],
})
export class ClientNotesModalComponent implements OnInit {

  clientNotesForm!: FormGroup;
  private req: Subscription;
  private clientsData$: any;
  public clientOption:any;
  public loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ClientNotesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private clientsListStore: Store<ClientListState>,) {
      this.clientsData$ = this.clientsListStore.pipe(select(state => state));
      console.log(data)
    }

  ngOnInit(): void {
    this.subscribeEnum();

    this.clientsListStore.dispatch({
      type: ClientListActionTypes.GET_CLIENT_LIST
    });
    
    this.clientNotesForm = this.formBuilder.group({
      client: [this.data?.client_id, [Validators.required]],
      note_date: [this.data ? new Date(this.data?.data?.note_date * 1000) : new Date()],
      title: [this.data ? this.data?.data?.title : ''],
      content: [this.data ? this.data?.data?.content : ''],
      name: [`${this.data?.created_by?.first_name} ${this.data?.created_by?.last_name}`],
      role: [this.data ? this.data?.data?.role || this.data?.role?.system_role : ''],
      date_added: [this.data ? new Date(this.data?.data?.date_added * 1000) : new Date()],
      entry_date: [this.data?.data?.entry_date ? new Date(this.data?.data?.entry_date * 1000) : new Date()]
    });
  }

  subscribeEnum(){
    this.req = this.clientsData$.subscribe((results: any) => {
      this.clientOption = results?.clients.clientList.map(el => {
        el['name'] = `${el.first_name} ${el.last_name}`;

        return el;
      });

      console.log(this.clientOption)

      this.loading = results?.clients.clientListPending;
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.clientNotesForm.valid){
      this.dialogRef.close(this.clientNotesForm.value);
    }
  }
}

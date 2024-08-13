import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

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
  private clientFundingReq: Subscription;
  private clientsData$: any;
  private clientFundingData$: any;
  public clientFundingEnum: any = [];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  clientOptions:any;

  constructor(
    public dialogRef: MatDialogRef<SearchClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientFunding: Store<AdminProfileState>,
    private clientListStore: Store<ClientListState>,
  ) {
    this.localData = data;
    //this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.clientFundingData$ = this.adminClientFunding.pipe(select(state => state.clientFunding));

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.clientForm = this.formBuilder.group({
      client: ['', [Validators.required]],
      client_funding: ['']
    });

    this.subscribeEnum();

    /* On Client funding change */
    this.clientForm.controls['client'].valueChanges
    .subscribe((value) => {
      if(!!value)
        this.getClientFunding(value?.id * 1);
    });
  }

  // client details
  getClientFunding(client_id?: any): void {
    this.clientFundingEnum = [];

    this.adminClientFunding.dispatch({
      type: ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST,
      payload: {
        client_id: client_id
      }
    });
  }

  subscribeEnum(){
    this.clientOptions = this.data?.clients;
    // client funding
    this.clientFundingReq = this.clientFundingData$.subscribe((clientFunding: any) => {
      this.loading = clientFunding?.clientFundingList.pending;

      if (clientFunding.clientFundingList.length > 0) {
        this.clientFundingEnum = clientFunding.clientFundingList;
        this.clientFundingEnum.forEach((el) => {
          el['name'] = el?.funding_source_full_name;
        });
      }
    });
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

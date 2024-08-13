import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { format } from 'date-fns';

@Component({
  selector: 'app-search-client-modal',
  templateUrl: './search-client-modal.component.html',
  styleUrls: ['./search-client-modal.component.scss'],
})
export class SearchClientModalComponent implements OnInit {

  public clientForm!: FormGroup;
  public localData:any;

  public loading: boolean = true;
  private req: Subscription;
  private clientsData$: any;
  private clientFundingData$: any;

  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public clientOptions:any;
  public clientFundingList: any;

  constructor(
    public dialogRef: MatDialogRef<SearchClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private clientListStore: Store<ClientListState>,
  ) {
    this.localData = data;
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.clientFundingData$ = this.clientListStore.pipe(select(state => state));


    console.log(this.data)
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      client: ['', [Validators.required]]
    });

    if(this.data?.fromGroup){
      this.subscribeFunding()
    }

    else {
      this.subscribeEnum();
    }
  }

  subscribeFunding(){
    this.clientListStore.dispatch({
      type: ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM,
      payload: { price_list_id: this.data?.supportItem}
    });

    this.req = this.clientFundingData$.subscribe((result: any) => {
      this.loading = result?.clientFunding?.clientLoading;

      if (result?.clientFunding?.clientList?.length > 0) {
        console.log(this.data?.client_added)

        result?.clientFunding?.clientList?.forEach(el => {
          el['name'] = `${ el?.client_name } - ${el?.funding_source_code} - ${format(new Date(el?.client_funding_price_list_date_added), 'MMM dd, yyyy')}`
        });

        let currentList = this.data?.client_added.map(el => el?.id || el?.client_id);
        
        this.clientOptions = result?.clientFunding?.clientList?.filter(el => currentList?.indexOf(el?.client_id) === -1)
        .filter(el => el?.client_funding_status === 'Published' && !!el?.client_name && el?.client_funding_funding_type === 'Group');
      }
    });

    
  }

  subscribeEnum(){
    this.clientListStore.dispatch({
      type: ClientListActionTypes.GET_CLIENT_LIST
    });

    this.req = this.clientsData$.subscribe((results: any) => {
      this.clientOptions = results?.clients.clientList.filter(el => this.data.client_added.indexOf(el.id) === -1);
      this.loading = results?.clients.clientListPending;
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

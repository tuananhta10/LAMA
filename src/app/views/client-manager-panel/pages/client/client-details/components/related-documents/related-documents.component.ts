import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomDocumentModalComponent } from '../../../client-shared/modals/custom-document-modal/custom-document-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientDocumentsModalComponent } from '../main-profile/main-profile-documents/dialogs/client-documents/client-documents-modal.component';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { ClientDocActionTypes } from '@main/views/admin-panel/store/actions/admin-client-doc.action';


@Component({
  selector: 'client-details-related-documents',
  animations: [mainAnimations],
  templateUrl: './related-documents.component.html',
  styleUrls: ['./related-documents.component.scss']
})
export class RelatedDocumentsComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;
  private client$: any;
  private unsubscribe$ = new Subject<void>();
  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public employee$: any;
  public editDocuments: any = {
    add: [],
    delete: []
  }

  public documents: any[] = [];

  constructor(private clientListStore: Store<ClientListState>,
    private clientStore: Store<AdminProfileState>,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,) {
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.client$ = this.clientStore.pipe(select(state => state.client));
    this.id = route.parent.snapshot.params['id'];

    console.log(this.id)
  }

  ngOnInit(): void {
    
    if(this.id){
      this.subscribeClient();
      this.getClient();
    }
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  subscribeClient(){
    let client = this.client$;
    this.req = client.subscribe((results: any) => {
      console.log("Client Docs", results?.client)
      this.loading = results?.pending;

      if (results?.client?.profileClientDetails){
        this.documents =  results?.client?.profileClientDetails?.client_docs?.slice();;
        //this.documents = this.documents.hasOwnProperty('client_docs') ? this.documents['client_docs'] : [];
      }

    });
  }

  getClient(){
    let clientType = {
      type: 'profile-client-detail',
      id: this.id,
      key: 'profileClientDetails'
    }
    this.clientStore.dispatch({
      type: ClientActionTypes.GET_CLIENT,
      payload: clientType
    });
  }

  openCustomDocumentModal(){
    let customDocumentDialog = this.dialog.open(
      ClientDocumentsModalComponent,
      {
        width: '400px',
        data: {
          client_id: this.id
        },
      }
    );

    customDocumentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      let doc = {
        provider: "",
        membership_no: "",
        expiry_date: undefined,
        attachment: ""
      }
      if(result){
        //doc.provider = result.customProvider
        //doc.membership_no = result.membershipNumber
        //doc.expiry_date = result.expiryDate ? this.convertToDateTime(result.expiryDate): null;
        //doc.attachment = result.file;

        this.documents.push(doc);
        this.editDocuments.add.push(doc);
      }
    });
  }

  delete(index) {
    this.editDocuments.delete.push(this.documents[index]);
    let doc = this.documents[index];

    if(index){
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: doc,
        }
      );

      deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data || (result && !result.cancel && doc)){
          this.clientStore.dispatch({
            type: ClientDocActionTypes.DELETE_CLIENT_DOC,
            payload: [result?.data || doc],
            client_id: doc.id
          }); 

          //this.certificateData.splice(data, 1);


          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || doc))
        }
      });
    }
  }

}

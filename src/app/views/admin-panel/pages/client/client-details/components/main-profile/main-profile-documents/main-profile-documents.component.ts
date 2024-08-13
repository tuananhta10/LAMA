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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomDocumentModalComponent } from '../../../../client-shared/modals/custom-document-modal/custom-document-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { ClientState } from '@main/views/admin-panel/store/reducers/admin-client.reducer';
import { ClientDocumentsModalComponent } from './dialogs/client-documents/client-documents-modal.component';
import { ClientDocActionTypes } from '@main/views/admin-panel/store/actions/admin-client-doc.action';

@Component({
  selector: 'client-main-profile-documents',
  animations: [mainAnimations],
  templateUrl: './main-profile-documents.component.html',
  styleUrls: ['./main-profile-documents.component.scss']
})
export class MainProfileDocumentsComponent implements OnInit {
  @Input() clientData: any = {};
  
  private clientsData$: any;
  private req: Subscription;
  private client$: any;
  private clientId:any;
  private unsubscribe$ = new Subject<void>();
  public clientDocs: any[] = [];
  public loading: boolean = true;

  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public pmRequireApproval: boolean = true;
  public indigenous: boolean = false;


  constructor(public dialog: MatDialog, 
    private route: ActivatedRoute,
    private clientStore: Store<ClientState>) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.client$ = this.clientStore.pipe(select(state => state.client));
    this.req = this.client$.subscribe((results: any) => {
      this.loading = results?.pending;
      if(results?.client?.profileClientDetails){
        this.clientDocs = results?.client?.profileClientDetails?.client_docs?.slice(0, 3);

        if(!this.clientData){
          this.loading = results?.pending;
        }

        else {
          this.loading = false;
        }
      }
      this.loading = results?.pending;
    });
  }

  openCustomDocumentModal(document?: any){
    let customDocumentDialog = this.dialog.open(
      ClientDocumentsModalComponent,
      {
        width: '400px',
        data: {
          client_id: this.clientId,
          document: document
        },
      }
    );

    customDocumentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      let doc = {
        title: "",
        type: "",
        description: "",
        is_private: true,
        attachment: ""
      }
      if(result){
        doc.title = result?.title;
        doc.type = result?.type;
        doc.description = result?.description;
        doc.is_private = result?.is_private;
        doc.attachment = result?.attachment;

        this.clientDocs.push(doc);
      }
    });
  }

  deleteDataDialog(data){
    if(data){
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: data,
        }
      );

      deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data || (result && !result.cancel && data)){
          this.clientStore.dispatch({
            type: ClientDocActionTypes.DELETE_CLIENT_DOC,
            payload: [result?.data || data],
            client_id: this.clientId 
          }); 

          //this.certificateData.splice(data, 1);


          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || data))
        }
      });
    }
  }
}

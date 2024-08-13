import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { 
  displayedColumns,
  TableHeader,
  CommunicationTemplate,
  selectedColumns,
  groupList 
} from '../../utils/bulk-communication-template-model-interface';
import { AddBulkCommunicationTemplateComponent } from '../../dialogs/add-bulk-communication-template/add-bulk-communication-template.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommunicationTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-communication-template.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulk-communication-template',
  animations: [mainAnimations],
  templateUrl: './bulk-communication-template.component.html',
  styleUrls: ['./bulk-communication-template.component.scss']
})
export class BulkCommunicationTemplateComponent implements OnInit {

  private communicationTemplateData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public groupList: CommunicationTemplate[] = []//groupList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name
    }
  } 

  constructor(private adminCommunicationTemplate: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
   this.subscribeCommunicationTemplate();
    this.getCommunicationGroup();
    
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddDialog(event?.data);
    }
  }

  getCommunicationGroup(){
    this.adminCommunicationTemplate.dispatch({
      type: CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST
    }); 
  }

  subscribeCommunicationTemplate(){
    this.communicationTemplateData$ = this.adminCommunicationTemplate.pipe(select(state => state));
    
    this.req =  this.communicationTemplateData$.subscribe((result: any) => {
      this.loading = result?.communicationTemplate.pending;

      console.log(result?.communicationTemplate)

      if(result?.communicationTemplate.communicationTemplateList.length > 0){
        this.groupList = result?.communicationTemplate.communicationTemplateList;
      }

      if(result?.communicationTemplate.success){
        this.snackBar.open(result?.communicationTemplate.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminCommunicationTemplate.dispatch({
          type: CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE_SUCCESS,
          payload: {message: null}
        }); 

        this.adminCommunicationTemplate.dispatch({
          type: CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE_SUCCESS,
          payload: {message: null}
        }); 

        this.getCommunicationGroup();
      }

      if(result?.communicationTemplate.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminCommunicationTemplate.dispatch({
          type: CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE_FAIL,
          payload: null
        }); 

        this.adminCommunicationTemplate.dispatch({
          type: CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE_FAIL,
          payload: null
        }); 
      }
    })
  }

  // delete event emitter
  deleteDataDialog(event){
    if(event){
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: event?.data,
        }
      );

      deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data){
          // delete integration here 
          // after delete refresh store
          this.adminCommunicationTemplate.dispatch({
            type: CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE,
            payload: [result?.data.id || event?.data.id]
          });
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddDialog(data?: any){
    let communicationGroupDialog = this.dialog.open(
      AddBulkCommunicationTemplateComponent,
      { 
        minWidth: '86vw',
        data: data,
      }
    );

    communicationGroupDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}

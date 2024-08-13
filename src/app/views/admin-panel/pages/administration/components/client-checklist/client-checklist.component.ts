import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
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
  ClientChecklist,
  selectedColumns,
  checkList 
} from '../../utils/client-checklist-model-interface';
import { AddClientChecklistComponent } from '../../dialogs/add-client-checklist/add-client-checklist.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientChecklistActionTypes } from '@main/views/admin-panel/store/actions/admin-client-checklist.action';

@Component({
  selector: 'app-client-checklist',
  animations: [mainAnimations],
  templateUrl: './client-checklist.component.html',
  styleUrls: ['./client-checklist.component.scss']
})
export class ClientChecklistComponent implements OnInit {
  private clientChecklist$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public checkList: ClientChecklist[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name
    }
  } 

  constructor(private adminClientChecklist: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.clientChecklist$ = this.adminClientChecklist.pipe(select(state => state.clientChecklist));
    this.getClientChecklist();

    this.req =  this.clientChecklist$.subscribe((clientChecklist: any) => {
      this.loading = clientChecklist.pending;

      if(clientChecklist.clientChecklistList.length > 0){
        this.checkList = clientChecklist.clientChecklistList;
      }

      if(clientChecklist.success){
        this.snackBar.open(clientChecklist.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminClientChecklist.dispatch({
          type: ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST_SUCCESS,
          payload: {message: null}
        }); 

        this.adminClientChecklist.dispatch({
          type: ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST_SUCCESS,
          payload: {message: null}
        }); 

        this.getClientChecklist();
      }

      if(clientChecklist.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminClientChecklist.dispatch({
          type: ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST_FAIL,
          payload: null
        }); 

        this.adminClientChecklist.dispatch({
          type: ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST_FAIL,
          payload: null
        }); 
      }
    })
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddChecklist(event?.data);
    }
  }

  getClientChecklist(){
    this.adminClientChecklist.dispatch({
      type: ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST
    }); 
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
        if(result?.data || (result && !result.cancel && event?.data)){
          this.adminClientChecklist.dispatch({
            type: ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST,
            payload: [result?.data || event?.data]
          }); 
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddChecklist(data?: any){
    let clientChecklistDialog = this.dialog.open(
      AddClientChecklistComponent,
      { 
        minWidth: '30vw',
        data: data,
      }
    );

    clientChecklistDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }
}

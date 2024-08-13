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
  CommunicationGroup,
  selectedColumns,
  groupList 
} from '../../utils/bulk-communication-group-model-interface';
import { AddBulkCommunicationGroupComponent } from '../../dialogs/add-bulk-communication-group/add-bulk-communication-group.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommunicationGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-bulk-communication-group.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulk-communication-group',
  animations: [mainAnimations],
  templateUrl: './bulk-communication-group.component.html',
  styleUrls: ['./bulk-communication-group.component.scss']
})
export class BulkCommunicationGroupComponent implements OnInit {

  private communicationGroupData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public groupList: CommunicationGroup[] = []//groupList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name
    }
  } 

  constructor(private adminCommunicationGroup: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 1500);

    this.getCommunicationGroup();
    this.subscribeCommunicationGroup();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddGroup(event?.data);
    }
  }

  getCommunicationGroup(){
    this.adminCommunicationGroup.dispatch({
      type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST
    }); 
  }


  subscribeCommunicationGroup(){
    this.communicationGroupData$ = this.adminCommunicationGroup.pipe(select(state => state.communicationGroup));

    this.req =  this.communicationGroupData$.subscribe((communicationGroup: any) => {
      this.loading = communicationGroup.pending;

      console.log(communicationGroup)

      if(communicationGroup?.communicationGroupList?.length > 0){
        this.groupList = communicationGroup?.communicationGroupList;
      }

      if(communicationGroup.success){
        this.snackBar.open(communicationGroup.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminCommunicationGroup.dispatch({
          type: CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP_SUCCESS,
          payload: {message: null}
        }); 

        this.adminCommunicationGroup.dispatch({
          type: CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP_SUCCESS,
          payload: {message: null}
        }); 

        this.getCommunicationGroup();
      }

      if(communicationGroup.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminCommunicationGroup.dispatch({
          type: CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP_FAIL,
          payload: null
        }); 

        this.adminCommunicationGroup.dispatch({
          type: CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP_FAIL,
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
          this.adminCommunicationGroup.dispatch({
            type: CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP,
            payload: [result?.data.id || event?.data.id]
          });
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddGroup(data?: any){
    let communicationGroupDialog = this.dialog.open(
      AddBulkCommunicationGroupComponent,
      { 
        minWidth: '30vw',
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

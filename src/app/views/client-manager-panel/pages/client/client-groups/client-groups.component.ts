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
  clientGroupList,
  selectedColumns,
  ClientGroup 
} from './utils/client-group-model-interface';
import { AddClientGroupComponent } from '../client-details/dialogs/add-client-group/add-client-group.component';
//import { ViewEmployeePositionComponent } from '../../dialogs/view-employee-position/view-employee-position.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-client-group.action';
//import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';

@Component({
  selector: 'app-client-groups',
  animations: [mainAnimations],
  templateUrl: './client-groups.component.html',
  styleUrls: ['./client-groups.component.scss']
})
export class ClientGroupsComponent implements OnInit {

  private clientGroupData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public clientGroupList: ClientGroup[] = clientGroupList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name
    }
  }

  constructor(private adminClientGroup: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
    //setTimeout(() => this.loading = false, 1500);
    this.getClientGroup();

    this.clientGroupData$ = this.adminClientGroup.pipe(select(state => state.clientGroup));

    this.req =  this.clientGroupData$.subscribe((clientGroup: any) => {
      this.loading = clientGroup.pending;

      if(clientGroup.clientGroupList.length > 0){
        this.clientGroupList = clientGroup.clientGroupList;
      }

      if(clientGroup.success){
        this.snackBar.open(clientGroup.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminClientGroup.dispatch({
          type: ClientGroupActionTypes.SAVE_CLIENT_GROUP_SUCCESS,
          payload: {message: null}
        }); 

        this.adminClientGroup.dispatch({
          type: ClientGroupActionTypes.EDIT_CLIENT_GROUP_SUCCESS,
          payload: {message: null}
        }); 

        this.getClientGroup();
      }

      if(clientGroup.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminClientGroup.dispatch({
          type: ClientGroupActionTypes.SAVE_CLIENT_GROUP_FAIL,
          payload: null
        }); 

        this.adminClientGroup.dispatch({
          type: ClientGroupActionTypes.EDIT_CLIENT_GROUP_FAIL,
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
      this.openAddGroup(event?.data);
    }
  }

  getClientGroup(){
    this.adminClientGroup.dispatch({
      type: ClientGroupActionTypes.GET_CLIENT_GROUP_LIST
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
          this.adminClientGroup.dispatch({
            type: ClientGroupActionTypes.DELETE_CLIENT_GROUP,
            payload: [result?.data || event?.data]
          });
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddGroup(data?: any){
    let groupDialog = this.dialog.open(
      AddClientGroupComponent,
      { 
        minWidth: '30vw',
        maxWidth: '800px',
        data: data,
      }
    );

    groupDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  viewEmployeeDetail(event){
    /*let clientGroupDialog = this.dialog.open(
      ViewEmployeePositionComponent,
      { 
        width: '60vw',
        data: {
          details: event?.data,
        },
      }
    );

    clientGroupDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });*/
  }

}

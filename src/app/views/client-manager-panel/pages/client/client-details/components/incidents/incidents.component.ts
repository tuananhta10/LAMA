import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
import { ClientList } from '../../../client-main/utils/client-list-model';
import { 
  displayedColumns,
  TableHeader,
  selectedColumns,
  Incidents 
} from '../../utils/incident-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddIncidentComponent } from '../../../../care-management/care-management-incidents/dialogs/add-incident/add-incident.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { IncidentActionTypes } from '@main/views/admin-panel/store/actions/admin-incident.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';

@Component({
  selector: 'client-incidents',
  animations: [mainAnimations],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  private incidentData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: ClientList;
  public displayedColumns: TableHeader[] = displayedColumns;
  public incidentsList: Incidents[] = [];
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      client: el.client, 
      type: el.type, 
      action_date: el.action_date, 
      date_received: el.date_received,
      description: el.description,
      status: el.status, 
    };
  }

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  
  constructor(private adminIncident: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getIncidents();
    this.incidentData$ = this.adminIncident.pipe(select(state => state.incident));

    this.req =  this.incidentData$.subscribe((incident: any) => {
      this.loading = incident.pending;
      
      if(incident.incidentList.length > 0){
        this.incidentsList = incident.incidentList;
      }

      if(incident.success){
        this.snackBar.open(incident.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminIncident.dispatch({
          type: IncidentActionTypes.SAVE_INCIDENT_SUCCESS,
          payload: {message: null}
        }); 

        this.adminIncident.dispatch({
          type: IncidentActionTypes.EDIT_INCIDENT_SUCCESS,
          payload: {message: null}
        }); 

        this.getIncidents();
      }

      if(incident.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminIncident.dispatch({
          type: IncidentActionTypes.SAVE_INCIDENT_FAIL,
          payload: null
        }); 

        this.adminIncident.dispatch({
          type: IncidentActionTypes.EDIT_INCIDENT_FAIL,
          payload: null
        }); 
      }
    })
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  getIncidents(){
    this.adminIncident.dispatch({
      type: IncidentActionTypes.GET_INCIDENT_LIST,
      payload: {client_id: this.id}
    }); 
  }

  editDataDialog(event){
    if(event){
      this.openAddIncident(event?.data);
    }
  }

   // delete event emitter
  deleteDataDialog(event) {
    if (event) {
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
          if (result?.data || (result && !result.cancel && event?.data)) {
            this.adminIncident.dispatch({
              type: IncidentActionTypes.DELETE_INCIDENT,
              payload: [result?.data || event?.data]
            }); 
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }

  openAddIncident(data?: any){
    let addIncidentDialog = this.dialog.open(
      AddIncidentComponent,
      { 
        minWidth: '47vw',
        data: data,
      }
    );

    addIncidentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}

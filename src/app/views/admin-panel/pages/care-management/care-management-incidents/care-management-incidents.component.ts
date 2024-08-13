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
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { 
  displayedColumns,
  TableHeader,
  selectedColumns,
  Incidents 
} from './utils/incident-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddIncidentComponent } from './dialogs/add-incident/add-incident.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { IncidentActionTypes } from '@main/views/admin-panel/store/actions/admin-incident.action';
import { DeleteRecordComponent } from '../../administration/dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from './utils/incident-report-model-interface';
import { NameFormatPipe } from '@main/shared/pipes/name-format.pipe';

@Component({
  selector: 'app-care-management-incidents',
  animations: [mainAnimations],
  templateUrl: './care-management-incidents.component.html',
  styleUrls: ['./care-management-incidents.component.scss'],
  providers:[NameFormatPipe]
})
export class CareManagementIncidentsComponent implements OnInit {
  private incidentData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public incidentsList: Incidents[] = [];
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      client_name: el.client_name, 
      employee_name: el.employee_name,
      type: el.type, 
      action_date: el.action_date, 
      date_received: el.date_received,
      description: el.description,
      status: el.status, 
    };
  }

  constructor(private adminIncident: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private nameFormatPipe:NameFormatPipe
    
    ) {
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
        incident.incidentList.forEach(element => {
          //element.action_date = this.convertToDate(element.action_date);
          //element.date_received = this.convertToDate(element.date_received);
          element.client_name = this.nameFormatPipe.transform(element.client_name)
          element.employee_name = this.nameFormatPipe.transform(element.employee_name)
        });
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

      if(incident.incidentUpload){
        if(incident.incidentUpload.result.toLowerCase() === 'failed'){
          this.snackBar.open(incident.incidentUpload.message, "", {
            duration: 4000,
            panelClass:'error-snackbar'
          });
        } else {
          this.snackBar.open('Successfully uploaded incident upload', "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
        }

        this.adminIncident.dispatch({
          type: IncidentActionTypes.UPLOAD_INCIDENT_SUCCESS,
          payload: null
        }); 
      }
    })
  }

  getIncidents(){
    this.adminIncident.dispatch({
      type: IncidentActionTypes.GET_INCIDENT_LIST
    }); 
  }

  convertToDate(dateTime){
    return new Date(dateTime * 1000)
  }


  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
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
        minWidth: '70vw',
        data: data,
      }
    );

    addIncidentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  importIncident(){
    let uploadDialog = this.dialog.open(
      FileUploadModalComponent,
      { 
        minWidth: '30vw',
        data: {
          fileType: '.csv',
          fileTypeArray: ['.csv']
        },
      }
    );

    uploadDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        let data = {
          endpoint: 'incidents',
          delete: true,
          attachment: result
        }
        this.adminIncident.dispatch({
          type: IncidentActionTypes.UPLOAD_INCIDENT,
          payload: data
        }); 
      }
    });
  }

  // Generate Report
  public reportColumn = reportColumn;
  public reportSelectedColumn = reportSelectedColumn;

  generateReport(){
    let reportDialog = this.dialog.open(
      GenerateReportGlobalComponent,
      { 
        minWidth: '423px',
        maxHeight: '97vh',
        maxWidth: '98vw',
        //maxWidth: '423px',
        data: {
          data_list: this.incidentsList,  
          title: "Generate Accident/Incident Report",
          sub_title: "Accident/Incident",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Date Received',
          dateSearch: {
            dateFrom: 'Date Received',  
            dateTo: 'Date Received'
          },
          groupItems: true,  
          groupBy: "Type"
        },
      }
    );

    reportDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        
      }
    });
  }
}



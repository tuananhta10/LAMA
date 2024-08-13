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
import { EmployeeList } from '../../../employee-main/utils/employee-list-model';
import { 
  displayedColumns,
  TableHeader,
  incidentsList,
  selectedColumns,
  Incidents 
} from '../../utils/incident-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddIncidentComponent } from '../../../../care-management/care-management-incidents/dialogs/add-incident/add-incident.component';

@Component({
  selector: 'employee-incidents',
  animations: [mainAnimations],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  private employeesData$: any;
  private clientsData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public employeeData: EmployeeList;
  public displayedColumns: TableHeader[] = displayedColumns;
  public incidentsList: Incidents[] = incidentsList;
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
  
  constructor(private employeeListStore: Store<EmployeeListState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));

    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // employee details
  getEmployeeDetails(): void{
    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      if(results){
        // from ngrx store
        this.employeeData = results?.employees.employeeList.find(el => el?.id == this.id);
        
        if(results?.employees.employeeClientsList?.employee_clients?.length > 0){
          setTimeout(() => {
            this.loading = false;

            
          }, 1000);
        }
      }
    });
  }

  openAddIncident(){
    let addIncidentDialog = this.dialog.open(
      AddIncidentComponent,
      { 
        minWidth: '47vw',
        data: {
        },
      }
    );

    addIncidentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }
}

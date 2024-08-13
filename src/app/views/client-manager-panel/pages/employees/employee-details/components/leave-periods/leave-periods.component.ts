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
  employeeLeaveList,
  selectedColumns,
  EmployeeLeave 
} from '../../utils/leave-period-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEmployeeLeaveComponent } from '../../../employee-leaves/dialogs/add-employee-leave/add-employee-leave.component';

@Component({
  selector: 'employee-leave-periods',
  animations: [mainAnimations],
  templateUrl: './leave-periods.component.html',
  styleUrls: ['./leave-periods.component.scss']
})
export class LeavePeriodsComponent implements OnInit, OnDestroy {
  private employeesData$: any;
  private clientsData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public employeeData: EmployeeList;
  public clientList: any[] = [];
  public pastClients: any[] = [];
  public newClients: any[] = [];

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  
  /* TABLE DATA */
  public displayedColumns: TableHeader[] = displayedColumns;
  public employeeLeaveList: EmployeeLeave[] = employeeLeaveList;
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      employee_name: el.employee_name, 
      leave_from: el.leave_from,
      leave_to: el.leave_to,
      leave_reason: el.leave_reason,
      status: el.status,
    };
  }

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

            const clients = results?.employees.employeeClientsList.employee_clients

            // from ngrx store
            this.clientList = clients.filter(el => el.status === 'Active');
            this.newClients = clients.filter(el => el.status === 'Active').slice(0, 3);
            this.pastClients = clients.filter(el => el.status === 'Inactive');

          }, 1000);
        }
      }
    });
  }

  openAddEmployeeLeave(){
    let addEmployeeLeave = this.dialog.open(
      AddEmployeeLeaveComponent,
      { 
        minWidth: '30vw',
        //maxHeight: '95vh',
        data: {
        },
      }
    );

    addEmployeeLeave
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}

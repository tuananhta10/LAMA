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
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeList } from '../../../employee-main/utils/employee-list-model';

@Component({
  selector: 'employee-service-calendar',
  animations: [mainAnimations],
  templateUrl: './service-calendar.component.html',
  styleUrls: ['./service-calendar.component.scss']
})
export class ServiceCalendarComponent implements OnInit {

  private employeesData$: any;
  private clientsData$: any;
  private req: Subscription;

  public employeeData: EmployeeList;
  public clientList: any[] = [];
  public pastClients: any[] = [];
  public newClients: any[] = [];

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  

  constructor(private employeeListStore: Store<EmployeeListState>,
    private router: Router,
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
}

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

import { displayedColumnsClients,
  selectedColumnsClients,
  selectedColumnsMobileClients,
  tableController
 } from '../../../employee-main/utils/employee-list-actions-model';

import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';

@Component({
  selector: 'employee-service-details',
  animations: [mainAnimations],
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  private employeesData$: any;
  private clientsData$: any;
  private req: Subscription;

  public employeeData: EmployeeList;
  public clientList: any[] = [];
  public pastClients: any[] = [];
  public newClients: any[] = [];

  public displayedColumns: any = displayedColumnsClients
  public selectedColumns: any = selectedColumnsClients;

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public employee$: any;
  public careWorkerList: any[] = [];
  public searchBy: string = '';
  public filteredCareworkerList: any[];
  public serviceDetail: any;
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  public onHold;
  public volunteer;
  public member;

  constructor(private employeeListStore: Store<EmployeeListState>,
    private employeeStore: Store<EmployeeState>,
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
    this.subscribeEmployee();
    this.getEmployee();
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
      }
    });
  }

  subscribeEmployee(){
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    this.req = this.employee$.subscribe((results: any) => {
      if(results?.employee?.serviceDetail){
        this.serviceDetail = results?.employee?.serviceDetail;
      }
      this.loading = results?.pending;
    })
  }

  getEmployee(){
    let data = {
      type: 'employee-service',
      id: this.id,
      key: 'serviceDetail'
    }
    this.employeeStore.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: data
    });
  }

  /*
    Client list table filter
  */
  searchDataSource(searchList: any[], source): any[] {
    const listDataSource = [...searchList]
    .filter(el => {
      let objectSource = source(el);

      return JSON.stringify(objectSource).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    console.log(listDataSource)

    return listDataSource;
  }

  multipleSearch(): void {
    /*let clientFundingObj = (el) => {
      return {
        name: el.name, 
        funding_source: el.funding_source,  
        funding_type: el.funding_type,
        start_date: el.start_date,  
        end_date: el.end_date,  
        budget: el.budget,  
        allocated: el.allocated,
        utilise_total: el.utilise_total,  
        balance: el.balance,  
        registration_no: el.registration_no,  
      }
    } 

    this.filteredClientFundingList = this.searchDataSource([...this.clientFundingList], clientFundingObj);

*/
    this.loading = true;
    setTimeout(() => this.loading = false, 1000)
  }
}

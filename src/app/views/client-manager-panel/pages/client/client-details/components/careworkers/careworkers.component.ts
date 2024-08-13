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
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

@Component({
  selector: 'client-details-careworkers',
  animations: [mainAnimations],
  templateUrl: './careworkers.component.html',
  styleUrls: ['./careworkers.component.scss']
})
export class CareworkersComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;
  private client$: any;
  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public employeeList: any[] = [];
  public employeeNotUse: any[] = [];
  public brokerage: any[] = [];
  public filteredEmployee: any[] = [];
  public filteredEmployeeNotUse: any[] = [];
  public filteredBrokerage: any[] = [];
  public careworkers: any[] = [];
  public searchBy: string = '';

  constructor(private clientListStore: Store<ClientListState>,
    private clientStore: Store<AdminProfileState>,
    private router: Router,
    private route: ActivatedRoute) {
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.client$ = this.clientStore.pipe(select(state => state.client));
    this.id = route.parent.snapshot.params['id'];

    console.log(this.id)
  }

  ngOnInit(): void {
    this.getClientDetails();
    
    if(this.id){
      this.subscribeClient();
      this.getClient();
    }
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // client details
  getClientDetails(): void{
    // Subscribe to storage
    this.req = this.clientsData$.subscribe((results: any) => {
      if(results){
        this.clientData = results?.clients.clientList.find(el => el?.id == this.id);
      }
    });
  }

  subscribeClient(){
    let client = this.client$;
    this.req = client.subscribe((results: any) => {
      //console.log("CAREWORKERS", results?.client?.careWorkers)
      this.loading = results?.pending;

      if(results?.client?.careWorkers?.client_employee){
        this.employeeList = results?.client?.careWorkers?.client_employee
        .filter(el => el.employee_not_use == '0' && el.employee?.length > 0)
        .map(el => el.employee[0]);

        this.employeeNotUse = results?.client?.careWorkers?.client_employee
        .filter(el => el.employee_not_use == '1' && el.employee?.length > 0)
        .map(el => el.employee[0]).slice(0, 1);

        this.brokerage = results?.client?.careWorkers?.client_brokerage;

        this.filteredEmployee = [...this.employeeList];
        this.filteredEmployeeNotUse = [...this.employeeNotUse];
        this.filteredBrokerage = [...this.brokerage];

        console.log(this.filteredEmployee)
      }
    });
  }

  getClient(){
    let clientType = {
      type: 'care-workers',
      id: this.id,
      key: 'careWorkers'
    }
    this.clientStore.dispatch({
      type: ClientActionTypes.GET_CLIENT,
      payload: clientType
    });
  }

  /*
    Client list table filter
  */
  searchDataSource(searchList: any[], source): any[] {
    const listDataSource = [...searchList]
    .filter(el => {
      let objectSource = source(el);
      
      console.log("OBJECT", objectSource)

      return JSON.stringify(objectSource).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    console.log(listDataSource)

    return listDataSource;
  }

  multipleSearch(): void {
    let careworkerObj = (el) => {
      return {
        id: el.id, 
        name: el.name,  
        email_address: el.email_address,
        work_phone_no: el.work_phone_no,  
        suburb: el.suburb,  
        address_a: el.address_a,  
        type: el.type,  
        job_description: el.job_description,  
        employment_type: el.employment_type,  
      }
    } 

    this.filteredEmployee = this.searchDataSource([...this.employeeList], careworkerObj);
    this.filteredEmployeeNotUse = this.searchDataSource([...this.employeeNotUse], careworkerObj);

    // brokerage form
    let brokerageObj = (el) => {
      return {
        id: el.id, 
        default: el.default,  
        brokerage_number: el.brokerage_number,
        name: el.name,  
        contact_name: el.contact_name,  
        contact_number: el.contact_number
      }
    };

    this.filteredBrokerage = this.searchDataSource([...this.brokerage], brokerageObj);


    this.loading = true;
    setTimeout(() => this.loading = false, 1000)
  }
}

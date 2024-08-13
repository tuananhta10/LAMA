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
import { parseArrayObject } from '@main/shared/utils/parse.util';

@Component({
  selector: 'client-details-service-details',
  animations: [mainAnimations],
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;
  private client$: any;
  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public employeeList: any[] = [];
  public pastEmployees: any[] = [];
  public newEmployees: any[] = [];

  public careworkers: any[] = [];

  public clientFundingColumns: any[] = [
    {title: 'Name',col_name: 'name'},
    {title: 'Funding Source',col_name: 'funding_source_code'},
    {title: 'Type',col_name: 'funding_type'},
    {title: 'Start Date',col_name: 'start_date'},
    {title: 'End Date', col_name: 'end_date' }, 
    {title: 'Budget', col_name: 'budget'}, 
    {title: 'Allocated', col_name: 'allocated'}, 
    {title: 'Utilise Total', col_name: 'utilise_total'},
    {title: 'Balance', col_name: 'balance'}, 
    {title: 'Registration Number', col_name: 'registration_no'}, 
    //{title: '', col_name: 'action'}
    //{title: 'Main Branch', col_name: 'main_branch'}
  ];
  public selectedClientFundingCol: any[] = this.clientFundingColumns.map(el => el.col_name);
  public clientFundingList: any[] = [];

  public serviceTemplateColumns: any[] = [
    {title: 'Assigned To', col_name: 'name'}, 
    {title: 'Main Branch', col_name: 'main_branch_name'}, 
    {title: 'Group',col_name: 'group'}, 
    {title: 'End Of Service Date', col_name: 'end_of_service_date'}, 
    //{title: '', col_name: 'action'}
  ];
  public selectedServiceTemplateCol: any[] = this.serviceTemplateColumns.map(el => el.col_name);
  public serviceTemplateList: any[] = [];

  public planReviewColumns: any[] = [
    {title: 'Assigned To', col_name: 'name'}, 
    {title: 'Client', col_name: 'client_name'}, 
    {title: 'Due Date',col_name: 'due_date'}, 
    //{title: '', col_name: 'action'}
  ];
  public selectedplanReviewCol: any[] = this.planReviewColumns.map(el => el.col_name);
  public planReviewList: any[] = [];
  
  public clientGoalColumns: any[] = [
    {title: 'Name', col_name: 'name'}, 
    {title: 'Goal Client', col_name: 'goal_client'}, 
    {title: 'Goal', col_name: 'goal'},
    {title: 'Goal Type', col_name: 'goal_type'}, 
    {title: 'Status', col_name: 'status'}, 
    {title: 'Start Date', col_name: 'start_date'}, 
    {title: 'End Date', col_name: 'end_date'},
    {title: 'Description', col_name: 'description'}, 
    //{title: '', col_name: 'action'}
  ];

  public searchBy: string = '';
  public filteredClientFundingList: any[] = [];
  public filteredServiceTemplateList: any[] = [];
  public filteredPlanReviewList: any[] = [];

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
      console.log("SERVICE DETAILS", results?.client)
      this.loading = results.pending;

      if(!this.loading){
        this.clientFundingList = results?.client?.serviceDetails?.client_funding || [];
        this.serviceTemplateList = results?.client?.serviceDetails?.client_service_template || [];
        this.planReviewList = results?.client?.serviceDetails?.client_plan_review || [];

        this.filteredClientFundingList = [...this.clientFundingList];
        this.filteredServiceTemplateList = [...this.serviceTemplateList];
        this.filteredPlanReviewList = [...this.planReviewList];

        this.filteredClientFundingList.forEach((el: any) => {
          el['funding_source_code'] = parseArrayObject(el['funding_source'], 'full_name');
          el['name'] = `${this.clientData?.first_name} ${this.clientData?.last_name}`;
        });

        [...this.filteredServiceTemplateList].forEach((el: any) => {
          el['main_branch_name'] = parseArrayObject(el['branch'], 'name');
        });
      }

    });
  }

  getClient(){
    let clientType = {
      type: 'service-details',
      id: this.id,
      key: 'serviceDetails'
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

      return JSON.stringify(objectSource).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    console.log(listDataSource)

    return listDataSource;
  }

  multipleSearch(): void {
    let clientFundingObj = (el) => {
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

    let serviceTemplateObj = (el) => {
      return {
        name: el.name, 
        main_branch: el.main_branch,  
        group: el.group,
        end_of_service_date: el.end_of_service_date
      }
    } 

    this.filteredServiceTemplateList = this.searchDataSource([...this.serviceTemplateList], serviceTemplateObj);

    let planReviewObj = (el) => {
      return {
        name: el.name, 
        client_name: el.client_name,  
        due_date: el.due_date
      }
    } 

    this.filteredPlanReviewList = this.searchDataSource([...this.planReviewList], planReviewObj);

    this.loading = true;
    setTimeout(() => this.loading = false, 1000)
  }

}

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
import { EmployeePositionActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-position.action';

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
  private positionReq: Subscription;

  public employeeData: EmployeeList;
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

  public positionEnum:any;
  public selectedPosition: any;
  private enum$: any;

  public employeePayrateColumn:any[] =  [
    { field: 'classification', name: 'Classification' },
    { field: 'category', name: 'Category' },
    { field: 'hourly_pay_rate', name: 'Hourly Rate', type: 'currency', editable: false, sub_title: 'Hourly Pay Rate' },
    { field: 'afternoon_rate', name: 'Afternoon Rate', type: 'currency', editable: false, sub_title: 'Afternoon Shift Rate' },
    { field: 'night_rate', name: 'Night Rate', type: 'currency', editable: false, sub_title: 'Night Shift Rate' },
    { field: 'saturday_rate', name: 'Saturday Rate', type: 'currency', editable: false, sub_title: 'Saturday Pay Rate' },
    { field: 'sunday_rate', name: 'Sunday Rate', type: 'currency', editable: false, sub_title: 'Sunday Pay Rate' },
    { field: 'public_holiday_rate', name: 'Public holiday Rate', type: 'currency', editable: false, sub_title: 'Public holiday Pay Rate' },
  ]; 

  public employeePayrateData: any[] = [];

  constructor(private employeeListStore: Store<EmployeeListState>,
    private employeeStore: Store<EmployeeState>,
    private router: Router,
    private route: ActivatedRoute) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));

    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];
    this.enum$ = this.employeeStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
    this.subscribeEmployee();
    this.getEmployee();

    this.onHold = this.employeeData?.on_hold || false;
    this.volunteer = this.employeeData?.volunteer || false;
    this.member = this.employeeData?.member || false;
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  editEmployee(){
    sessionStorage.setItem('employeeFormStep', '4');
    this.router.navigate([`/admin/employees/edit/${this.serviceDetail?.id}`])
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

    // position list
    this.employeeStore.dispatch({
      type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST
    });
  }

  subscribeEmployee(){
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    this.req = this.employee$.subscribe((results: any) => {
      if(results?.employee?.serviceDetail){
        this.serviceDetail = results?.employee?.serviceDetail;
        this.employeePayrateData = [];

        if(this.serviceDetail?.employee_pay_rate){
          //this.employeePayrateData

          this.serviceDetail?.employee_pay_rate.forEach((el,i) => {

            let price_list = el?.price_list?.length > 0 ? el?.price_list[0] : {};
            let service_type = price_list?.service_type?.length > 0 ? price_list?.service_type[0] : {};
            console.log(service_type)

            let data = {
              ...el,  
              price_list_id: price_list?.id,  
              service_type_name: service_type?.registration_group_number + ' - ' + service_type?.support_item_name
            }

            this.employeePayrateData.push(data);
          });

        }
        console.log(this.serviceDetail)
      }
      this.loading = results?.pending;
    });

    // employee position
    this.positionReq  = this.enum$.subscribe((results: any) => {
      results?.employeePosition.employeePositionList.forEach(el => {
        el.name = el.display_name;
      })

      if(results?.employeePosition.employeePositionList?.length > 0){
        this.positionEnum = results?.employeePosition.employeePositionList;
        this.selectedPosition = this.positionEnum.find(el => el.id === this.employeeData.position_id);
      }

      this.loading = results.employeePosition.pending;
    });
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

  navigateTo(step){
    sessionStorage.setItem('employeeFormStep', `${step}`);
    this.router.navigate([`/admin/employees/edit/${this.employeeData?.id}`]);

    /*routerLink="/admin/clients/details/{{clientData?.id}}/goals"*/
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

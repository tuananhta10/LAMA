import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { ClientManagerActionTypes } from '@main/views/client-manager-panel/store/actions/client-manager.actions';
import { ClientManagerState  } from '@app-manager-store/reducers/client-manager.reducers';
;

@Component({
  selector: 'client-service-schedule-partner-details',
  animations: [mainAnimations],
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.scss']
})
export class PartnerDetailsComponent implements OnInit {
  @Input() partnerDetailsForm!: FormGroup;

  public type: string[] = [
    "Individual",
    "Group",
    "Group/Individual"
  ];

  public clients: string[] = [
    "George Michael",
    "Stephen Macaroni",
    "Sanday Vajay",
    "Michelle Piper"
  ];

  public clientFunding: string[] = [
    "Funding Level 1",
    "Funding Level 2",  
    "Funding Level 3"
  ];

  public priceList: string[] = [
    "Carers Gateway",
    "SC Casual Payrates - Lvl 1",
    "SC Casual Payrates - Lvl 2",
    "SC Casual Payrates - Lvl 3"
  ];

  public serviceTypes: string[] = [
    "Activity Based Transport",
    "Activity Community, Social, and Rec Activities ",
    "Assessment Recommendation, Theraphy And/Or Training"
  ];

  public ahCalculation: string[] = [
    "Shift Start", 
    "Shift End",
    "Shift Split",
    "Highest Rate"
  ];

  public statusOptions:string[] = ["Setup"];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();

  clientEnums$: any;
  clientEnums: any;
  clientFundingEnums$: any;
  clientFundingEnums: any;
  priceListEnums$: any;
  priceListEnums: any;
  serviceTypeEnums: any;
  serviceTypeEnums$: any;
  loading: boolean = false;
  private req: Subscription;
  private reqFunding: Subscription;
  private reqPriceList: Subscription;
  private reqServiceType: Subscription;
  
  constructor(
    private adminserviceSchedule: Store<AdminProfileState>,
    private adminClient: Store<ClientManagerState>) { }

  ngOnInit(): void {

    this.subscribeEnums();
    
    this.adminserviceSchedule.dispatch({
      type: ClientManagerActionTypes.GET_CLIENTS_MANAGER
    });

    this.adminserviceSchedule.dispatch({
      type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST
    });

    this.adminserviceSchedule.dispatch({
      type: PriceListActionTypes.GET_PRICE_LIST_LIST
    });

    // this.adminserviceSchedule.dispatch({
    //   type: ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST
    // });
  }

  subscribeEnums() {
    this.clientEnums$ = this.adminClient.pipe(select(state => state));
    this.clientFundingEnums$ = this.adminserviceSchedule.pipe(select(state => state.fundingSource));
    this.priceListEnums$ = this.adminserviceSchedule.pipe(select(state => state.priceList));
    this.serviceTypeEnums$ = this.adminserviceSchedule.pipe(select(state => state.serviceType));

    this.req = this.clientEnums$.subscribe((results: any) => {
      this.loading = results.pending;
      let clients = [];
      if(results?.clientManager?.clients.length > 0){
        clients = [...results.clientManager.clients]
        clients.forEach(element => {
          element.name = element.last_name + ", " +  element.first_name;
        });
      }
      this.clientEnums = clients;
    })

    this.reqFunding =  this.clientFundingEnums$.subscribe((fundingSource: any) => {
      this.loading = fundingSource.pending;

      if(fundingSource.fundingSourceList.length > 0){
        fundingSource.fundingSourceList.forEach(element => {
          element.name = element.code;
        });
      }
      this.clientFundingEnums = fundingSource.fundingSourceList;
    })

    this.reqPriceList =  this.priceListEnums$.subscribe((priceList: any) => {
      this.loading = priceList.pending;

      if(priceList.priceListList.length > 0){
        this.priceListEnums = priceList.priceListList;
      }
    })

    this.reqServiceType =  this.serviceTypeEnums$.subscribe((serviceType: any) => {
      this.loading = serviceType.pending;

      if(serviceType.serviceTypeList.length > 0){
        this.serviceTypeEnums = serviceType.serviceTypeList;
      }
    })

  }

}


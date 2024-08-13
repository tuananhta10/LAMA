import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { AdminEnumsActionTypes } from '@app-admin-store/actions/admin-enums.actions';
import { mainAnimations } from '@app-main-animation';
import { PriceListService } from '@main/shared/services/admin-panel/admin-price-list.service';
import { startWith, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-client-funding-details',
  animations: [mainAnimations],
  templateUrl: './client-funding-details.component.html',
  styleUrls: ['./client-funding-details.component.scss']
})
export class ClientFundingDetailsComponent implements OnInit {
  @Input() partnerDetailsForm: FormGroup;
  @Input() data: any = {};
  @Input() stepper: number;
  @Input() isDisabled: boolean = false;
  @Output() client_funding_price_list: EventEmitter<any> = new EventEmitter<any>();
  @Output() client_funding_price_list_display: EventEmitter<any> = new EventEmitter<any>();
  // @Input() versionList: any = {};
  @Input() loading: boolean ;

  public type: string[] = [
    "Individual",
    "Group"
  ];
  // public loading: boolean = true;
  public clients: any[] = [];
  public fundingSource: any[] = [];
  public priceList: any[] = [];
  public priceListSelected: any[] = [];
  public supportItem: any[] = [
    { name: 'Support Item Number', field: 'service_type_support_item_number' },
    { name: 'Support Item', field: 'service_type_support_item_name' },
    { name: 'Support Category', field: 'service_type_support_category_name' },
    { name: 'Price List', field: 'service_type_support_version' },
    { name: 'Rate Type', field: 'rate_type' }
  ];
  public supportItemDataFromAPI: any[] = [];
  public supportItemData: any[] = [];
  public supportItems: any = {
    add: [],
    delete: []
  }
  public versionItems: any = {
    add: [],
    delete: []
  }
  public linkSupport: boolean = false;
  public invoiceTo: any[] = [];
  public serviceLocation: string[] = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA", "Remote", "Very Remote"];
  public statusOptions: any[] = ["Setup"];
  private previousVersionItemsValue: any;

  radioOptions: any[] = [{ id: true, name: "Yes", value: true }, { id: false, name: "No", value: false }];

  private enum$: any;
  private branchesEnums$: any;
  private clientFundingData$: any;
  private req: Subscription;
  private clientFundingReq: Subscription
  public branchEnums: any[] = [];
  filteredOptions: Observable<string[]>;
  public versionList : any[]
  clientLoading: boolean = false;
  fundingSourceLoading: boolean = false;
  priceListLoading: boolean = false;
  versionControl = new FormControl();
  options: any;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private priceListService: PriceListService,
    private adminEnumStore: Store<AdminProfileState>
  ) {

  }


  ngOnInit(): void {    
    this.subscribeEnums();
    this.dispatchData();   
    this.setValueLocation(this.partnerDetailsForm.controls['service_location'].value);

    
    this.partnerDetailsForm.controls['version_items'].valueChanges
      .subscribe(value => {        
        if (value !== this.previousVersionItemsValue) {
          this.setValuePriceList(value);
        }
      });
    // Client id Changes
    this.partnerDetailsForm.controls['client_id']
      .valueChanges.subscribe((result) => {
        if (result?.registration_no) {
          this.partnerDetailsForm.controls['registration_no'].setValue(result?.registration_no);

          let branch = this.branchEnums.find(el => el?.id == result?.branch_id)
          this.partnerDetailsForm.controls['main_branch_id'].setValue(branch?.id);
        }
      });

    this.partnerDetailsForm.controls['main_branch_id']
      .valueChanges.subscribe((result) => {
        // console.log("BRNACH IN", result)
        /*if(result){
          this.partnerDetailsForm.controls['main_branch_id'].setValue(result?.name , {emitEvent: false});
        }*/
      });


    if (this.data?.fromProfile) {
      // console.log(this.data?.registration_no)
      this.partnerDetailsForm.controls['registration_no'].setValue(this.data?.registration_no);
    }
  }

  dispatchData() {
    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_BRANCHES
    });

    this.adminEnumStore.dispatch({
      type: ClientListActionTypes.GET_CLIENT_LIST
    });

    this.adminEnumStore.dispatch({
      type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST
    });

    // this.adminEnumStore.dispatch({
    //   type: PriceListActionTypes.GET_PRICE_LIST_LIST
    // });

    // support item data on edit
    if (this.data) {
      this.getSupportItemsData();

      this.adminEnumStore.dispatch({
        type: ClientFundingActionTypes.GET_CLIENT_FUNDING,
        payload: {
          id: this.data?.id
        }
      });
    }
  }

  setValueLocation(value:any): void {        
    this.priceListService.getVersion(value).subscribe(
      (response: any) => {
        this.versionList = response
      },
      (error: any) => {
        console.error('Error fetching price list', error);
      }
    );
  }

  setValuePriceList(value: any): void { 
    
    if (value !== this.previousVersionItemsValue ) {
      this.previousVersionItemsValue = value 
      this.loading =true 
      this.priceListService.getPriceListListData(this.partnerDetailsForm.controls['service_location'].value, null, '0', value).subscribe(
        (response: any) => {
          if (response.records) {
            this.loading = false;
            response.records?.forEach(element => {
              element.name = `${element?.service_type_support_item_number} - ${element?.service_type_support_item_name}`
            });
            response.records.forEach((el => {
              el["rate_type"] = el["service_type_unit"].split(/(?=[A-Z])/g).join(' ');
            }));
            this.priceList = response.records;
            this.priceListSelected = response.records;
          }
        },
        (error: any) => {
          console.error('Error fetching price list', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
    if (this.clientFundingReq) this.clientFundingReq.unsubscribe();
    this.supportItemDataFromAPI = [];
    this.supportItemData = [];
    this.client_funding_price_list_display.emit([]);
  }

  subscribeEnums() {
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
    this.branchesEnums$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
    // this.calculateBudget()
    // Branches
    this.req = this.branchesEnums$.subscribe((results: any) => {
      this.branchEnums = results.branches;
      //this.loading = results.pending;
    });

    // Client List
    this.req = this.enum$.subscribe((results: any) => {
      this.clients = results.clients.clientList;

      if (results.fundingSource.fundingSourceList) {
        results.fundingSource.fundingSourceList.forEach(element => {
          element.name = element.code
        });
        this.fundingSource = results.fundingSource.fundingSourceList
      }

      this.clientLoading = results.clients.clientListPending;
    });

    // Pricelist or Support Item
    this.req = this.enum$.subscribe((results: any) => {

      // this.priceListLoading = results.priceList.pending;

      // if(results.priceList.priceListList){
      //   results.priceList?.priceListList?.forEach(element => {
      //     element.name = `${element?.service_type_registration_group_number} - ${element?.service_type_support_item_name}`
      //   });

      //   results.priceList?.priceListList?.forEach((el => {
      //     el["rate_type"] = el["service_type_unit"].split(/(?=[A-Z])/g).join(' ');
      //   }));

      //   this.priceList = results.priceList.priceListList;
      //   this.priceListSelected = results.priceList.priceListList;
      // }
    });
  }

  getSupportItemsData(): void {    
    // Funding Sources
    this.clientFundingReq = this.enum$?.subscribe((clientFunding: any) => {
      let data = clientFunding?.clientFunding?.clientFunding;

      this.fundingSourceLoading = clientFunding?.clientFunding?.pendingDetails;

      if (data?.length > 0) {
        this.supportItemDataFromAPI = [];
        this.supportItemData = [];
        this.client_funding_price_list_display.emit([]);

        // generate support item list 
        this.supportItemDataFromAPI = data[0]?.client_funding_price_list;
        if (this.supportItemDataFromAPI?.length > 0) {
          this.supportItemDataFromAPI?.forEach(el => {
            if (!this.supportItemData.find(_el => el.id === _el.id) && el?.price_list?.length > 0) {
              let supportItemEl = {
                id: el.id,
                service_type_support_item_name: el?.price_list[0]?.service_type[0]?.support_item_name,
                service_type_support_item_number: el?.price_list[0]?.service_type[0]?.support_item_number,
                service_type_support_category_name: el?.price_list[0]?.service_type[0]?.support_category_name,
                service_type_support_version: el?.price_list[0]?.service_type[0]?.version,
                rate_type: el?.price_list[0]?.service_type[0]?.unit?.split(/(?=[A-Z])/g).join(' '),
              }
              this.supportItemData.push(supportItemEl);

              if (this.priceListSelected?.length > 0) {
                let support_item_id = this.priceListSelected.findIndex(_el => _el.id == el?.price_list[0]?.id);

                if (support_item_id !== -1) {
                  this.priceListSelected.splice(support_item_id, 1);
                }
                //console.log("SUPPORT ITEM", this.priceListSelected, support_item_id, el)
              }
            }
          });

          this.client_funding_price_list_display.emit(this.supportItemData)
        }
      }
    });
  }

  addSupportItem(): void {
    let support_item: any = this.partnerDetailsForm.get('support_items').value;
    this.supportItemData.push(support_item);    
    this.supportItemData = this.supportItemData.map(item => ({
      ...item,
      service_type_support_version: item.version || item.service_type_support_version, // Nếu có version thì chuyển thành service_type_support_version
      version: undefined 
  }));  
    this.partnerDetailsForm.controls['support_items'].setValue('');
    this.priceListSelected = [...this.priceList].filter(el => !this.supportItemData.find(_el => _el.id === el.id));    
    this.supportItems.add.push({ price_list_id: support_item?.id });
    this.client_funding_price_list.emit(this.supportItems);
  }


  deleteSupportItem(event) {
    let support_item = { ...this.supportItemData[event] };
    // console.log(support_item)

    this.supportItemData.splice(event, 1);
    this.partnerDetailsForm.controls['support_items'].setValue('');
    this.priceListSelected = [...this.priceList].filter(el => !this.supportItemData.find(_el => _el.id === el.id));
    this.supportItems.delete.push({ id: support_item.id, });
    this.client_funding_price_list.emit(this.supportItems);
    // console.log(this.supportItems)
  }

  setPricelist(value) {
    if (value !== this.partnerDetailsForm.controls['service_location'].value) {
    this.partnerDetailsForm.controls['version_items'].setValue(null)
    this.setValueLocation(value)
      /*this.adminEnumStore.dispatch({
        type: PriceListActionTypes.GET_PRICE_LIST_LIST,
        payload: value
      });*/
    }

    else return;

    /**/
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  openLinkSupportItemData(event) {
    this.linkSupport = !this.linkSupport;
  }

}

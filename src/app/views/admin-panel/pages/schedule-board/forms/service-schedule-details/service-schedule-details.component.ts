import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { Subject, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchClientModalComponent } from '../../dialogs/search-client-modal/search-client-modal.component';
import { takeUntil } from 'rxjs/operators';
import { 
  addDays, 
  addHours,
  subHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  format,
  differenceInHours
} from 'date-fns';
import { ClientGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-client-group.action';
import {
  ahCalculation,
  status,
  rateTypeOption,
  serviceLocation,
  recurringInterval,
  unitType,
  clientColumns,
  employeeColumns,
  checkBoxOptions,
} from '../../utils/service-schedule-const';
import { DecimalPipe } from '@main/shared/pipes/decimal.pipe';

@Component({
  selector: 'app-service-schedule-details',
  templateUrl: './service-schedule-details.component.html',
  styleUrls: ['./service-schedule-details.component.scss']
})
export class ServiceScheduleDetailsComponent implements OnInit {
  @Input() serviceScheduleForm!: FormGroup;
  @Input() clientTotalForm!: FormGroup;
  @Input() data: any;
  @Input() groupClientData: any[] = [];
  @Input() groupEmployeeData: any[] = [];
  @Output() group_service_schedule_client: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() group_service_schedule_employee: EventEmitter<any> = new EventEmitter<any>();
  @Input() isDisabled: boolean = false;
  private unsubscribe$ = new Subject<void>();
  private enum$: any;  
  private clientGroupData$: any;
  private clientReq: Subscription;
  private clientFundingData$: any;
  private clientFundingReq: Subscription;
  private priceListReq: Subscription;
  private groupReq: Subscription;

  public clientColumns:any[] = clientColumns;
  public clientTableData: any[] = [];
  public clientTableFull: any[] = [];

  public employeeColumns: any[] = employeeColumns;
  public employeeTableData: any[] = [];
  public employeeTableFull: any[] = [];
  
  public riskNotification;
  public schedulerNotes: any;
  public supportTeam: any;
  public type: any[] =["Individual", "Group"];
  public client: any[] = [];
  public clientFunding: any[] = [];
  public priceList: any[] = [];
  public serviceType: any[] = [];
  public ahCalculation: any[] = ahCalculation;
  public status: any[] = status;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public rateTypeOption: any[] = rateTypeOption;
  public rateTypeOptionFilter: any[] = [];
  public rateTypes: string[] = [...this.rateTypeOption].map(el => el.name);
  public serviceLocation: string[] = serviceLocation;
  public unitType: any = unitType
  public groupEnums: any[] = [];
  public dateNow: Date = new Date();
  public activeInput: string = '';
  public minStartTime: any = "12:00 am"
  public maxStartTime: any = "11:59 pm"
  public minEndTime: any = "12:00 am"
  public maxEndTime: any = "11:59 pm"
  public clientEnum: any = [];
  public servicecTypeEnum: any = [];
  public priceListEnum: any = [];
  public clientFundingEnum: any = [];
  public priceListEnumFilter: any = [];
  public clientLoading: boolean = true;
  public priceListLoading: boolean = true;
  public disableRate: boolean = true;
  public disableDates: boolean = true;
  public groupClients: any[] = [];
  public groupEmployees: any[] = [];
  public updateFunding: boolean = false;
  public start_date: any = '';

  constructor(private dialogClient: MatDialog,
    private adminClientGroup: Store<AdminProfileState>,
    private adminClientFunding: Store<AdminProfileState>,
    private adminEnumStore: Store<AdminProfileState>,
    private decimalPipe:DecimalPipe
  ) { 
    
  }

  ngOnDestroy(){
    if(this.clientReq) this.clientReq.unsubscribe();
    if(this.clientFundingReq) this.clientFundingReq.unsubscribe();
    if(this.priceListReq) this.priceListReq.unsubscribe();
    if(this.groupReq) this.groupReq.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeEnums();
    
    this.start_date = new Date(this.serviceScheduleForm.controls['start_date'].value).getDay()

    if(this.start_date == 0){
      this.rateTypeOptionFilter = [...this.rateTypeOption].filter((el) => el.id === 6 )
    }

    else if(this.start_date == 6){
      this.rateTypeOptionFilter = [...this.rateTypeOption].filter((el) => el.id === 5 )
    }

    else {
      this.rateTypeOptionFilter = [...this.rateTypeOption].filter((el) => el.id !== 5 && el.id !== 6)
    }
    
    // initialize input subscription
    this.serviceDetailsEvents();
    this.hoursKeyEvents();
    
    let group_clients = this.serviceScheduleForm.controls['group_service_schedule_client'].value;
    let group_client_table = this.serviceScheduleForm.controls['group_service_schedule_client_data'].value;

    // for group clients
    if(group_clients){
      this.groupClientData = group_clients?.add;
      this.clientTableData = [...group_client_table];
    }

    // if selected tab is Group
    if(this.data?.schedule?.type === 'Group'){
      this.adminEnumStore.dispatch({
        type: PriceListActionTypes.GET_PRICE_LIST_LIST
      });
      
      this.serviceScheduleForm.controls['type'].setValue('Group');
      this.getClientGroup();
    }

    // Client tab or Empoyee Tab selected
    else {
      this.adminEnumStore.dispatch({
        type: ClientListActionTypes.GET_CLIENT_LIST,
        from: 'service-schedule'
      });
    }

    // Risk notification details
    let riskNotification = this.clientEnum?.find(el => el.id == this.data?.client?.id);

    this.riskNotification = riskNotification?.risk_notification;
    this.schedulerNotes = riskNotification?.scheduler_notes;

    // if client funding changes
    if(this.data?.schedule){
      this.serviceScheduleForm.controls['client_funding_id'].valueChanges
      .subscribe((value) => {
        console.log("CLIENT FUNDING", value)
        this.getSupportItemPerClientFunding(value)
      })
    }
  }

  // set funding
  getSupportItemPerClientFunding(value){
    let selectedClientFunding = this.clientFundingEnum.filter(el => (this.updateFunding ? (el.id === value) : (el.name === value)));  

    let setPricelistEnum = () => {
      selectedClientFunding.forEach((el) => {
        el?.client_funding_price_list?.forEach(_el => {
          this.priceListEnumFilter.push(_el?.price_list[0])
        });

        this.priceListEnumFilter.forEach(support_item => {
          //support_item['id'] = ""
          support_item['name'] = `${support_item?.service_type[0]?.support_item_name}`;
        });
      });
    }

    /*
    if(this.updateFunding){
      this.priceListEnumFilter = [];
      setPricelistEnum();
    }
*/
    // Set pricelist
    if(!this.updateFunding){
      let selectedClientFundingPricelists = selectedClientFunding?.find(el => JSON.stringify(el).match(this.data?.schedule?.price_list_id)) //selectedClientFunding[0]?.client_funding_price_list;
        
      if(selectedClientFundingPricelists?.client_funding_price_list?.length > 0){
        let selectedSupportItem = selectedClientFundingPricelists?.client_funding_price_list?.find(_el => _el?.price_list[0]?.id === this.data?.schedule?.price_list_id);
        this.serviceScheduleForm.controls['price_list_id'].setValue(selectedSupportItem?.price_list[0]?.name);
        this.priceListEnumFilter = [];
        setPricelistEnum();
        this.recalculateCost();
      }
    }
  }

  // client details
  getClientFunding(client_id?: any): void {
    this.clientFundingEnum = [];

    this.adminClientFunding.dispatch({
      type: ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST,
      payload: {
        details: 'details',
        client_id: client_id
      }
    });
  }

  getClientGroup(){
    this.adminClientGroup.dispatch({
      type: ClientGroupActionTypes.GET_CLIENT_GROUP_LIST
    }); 

    let group_id = this.data?.grouping !== 'Group' ? this.data?.schedule?.group_service_schedule_id : this.data?.schedule?.id;

    this.adminClientGroup.dispatch({
      type: ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE,
      payload: group_id
    }); 
  }

  public selectedGroup;

  // subscribe to enums
  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
    this.clientFundingData$ = this.adminClientFunding.pipe(select(state => state.clientFunding));
    this.clientGroupData$ = this.adminClientGroup.pipe(select(state => state.clientGroup));

    // Subscription trigger if grouping is Client
    if(this.data.grouping === 'Client' || this.data.grouping === 'Employee'){
      this.clientReq = this.enum$.subscribe((results: any) => {
        this.clientEnum = results?.clients.clientList;
        this.clientEnum.forEach((el,i)=>{
          el['name']=`${el.first_name} ${el.last_name}`;
        });

        if(this.data?.schedule?.type === 'Individual')
          this.clientLoading = results?.clients.clientListPending;
      });
    }

    // Subscription trigger if grouping is Group
    if(this.data?.schedule?.type === 'Group'){
      this.groupReq =  this.clientGroupData$.subscribe((clientGroup: any) => {
        //console.log(clientGroup)
        this.clientTableData = [];
        this.employeeTableData = [];
        this.employeeTableFull = [];
        this.clientTableFull = [];

        if(clientGroup.clientGroupList){
          this.groupEnums = clientGroup?.clientGroupList;

          if(this.groupEnums){
            this.serviceScheduleForm.controls['group_id'].setValue(this.data?.schedule?.group_id);
            this.selectedGroup = this.groupEnums.find(el => el?.id === this.data?.schedule?.group_id);

            console.log("SELECTED GROUP", this.selectedGroup)
          }

          // MAP EMPLOYEE
          if(clientGroup?.clientGroupSchedule?.group_service_schedule_employee?.length > 0){
            let employees = clientGroup?.clientGroupSchedule?.group_service_schedule_employee;  
            this.employeeTableFull = employees;

            employees.forEach(el => {
              this.employeeTableData.push(el?.employee);
            });
          }

          // MAP CLIENT
          if(clientGroup?.clientGroupSchedule?.group_service_schedule_client?.length > 0){
            let clients = clientGroup?.clientGroupSchedule?.group_service_schedule_client;
            this.clientTableFull =clients;

            clients?.forEach(el => {
              this.clientTableData.push(el.client)
            });
          }
        }
        this.clientLoading = clientGroup?.pending;
      });

      /* Pricelist - Support Item Name */
      this.priceListReq  = this.enum$.subscribe((results: any) => {
        this.priceListLoading = results.priceList.pending;

        if(results.priceList.priceListList){
          
          results.priceList.priceListList.forEach(element => {
            element.name = `${element?.service_type_registration_group_number} - ${element?.service_type_support_item_name}`
          });
        
          this.priceListEnumFilter = results.priceList.priceListList.filter(el => el?.id !== 1);
          
          if(results?.priceList.priceListList?.length > 0){
            console.log("FULL NAME", this.priceListEnumFilter, this.data?.schedule)
            this.serviceScheduleForm.controls['group_id'].setValue(this.data?.schedule?.group_id)
            this.serviceScheduleForm.controls['price_list_id'].setValue(this.data?.schedule?.price_list_id)
          }
        }
      });
    }

    // client funding
    this.clientFundingReq = this.clientFundingData$.subscribe((clientFunding: any) => {
      this.priceListLoading = clientFunding?.pendingDetails;

      if (clientFunding.clientFundingList.length > 0) {
        
        this.priceListEnum = [];
        this.priceListEnumFilter = [];
        this.clientFundingEnum = [...clientFunding.clientFundingList].filter(el => !!el.client_funding_price_list);

        this.clientFundingEnum.forEach((el) => {
          el['name'] = el?.funding_source[0]?.code + ' - ' + format(new Date(el?.start_date * 1000), 'MMM dd, yyyy');

          el?.client_funding_price_list?.forEach(_el => {
            if(_el?.price_list?.length > 0){
              this.priceListEnum.push({
                client_funding_id: el?.id,
                ..._el?.price_list[0]
              })
            }
          });

          this.priceListEnum.forEach(support_item => {
            support_item['name'] = `${support_item?.service_type[0]?.support_item_name}`;
          });

          this.priceListEnumFilter = [...this.priceListEnum];
          this.priceListLoading = false;
        });

        if(this.clientFundingEnum?.length > 0){
          let selectedClientFunding = this.clientFundingEnum.find(el => el.id === this.data?.schedule?.client_funding_id);
          this.serviceScheduleForm.controls['client_funding_id'].setValue(selectedClientFunding?.name);
        }
      }
    })
  }

  /*
    SERVICE DETAILS EVENTS
  */
  serviceDetailsEvents(){
    /* On Client funding change */
    this.serviceScheduleForm.controls['client_id'].valueChanges
    .subscribe((value) => {
      if(!!value){
        let riskNotification = this.clientEnum.find(el => el.id == value);
        this.supportTeam = riskNotification?.id ? riskNotification : {};
        this.riskNotification = riskNotification?.risk_notification;
        this.schedulerNotes = riskNotification?.scheduler_notes;
        this.priceListEnumFilter = [];
        this.serviceScheduleForm.controls['price_list_id'].reset();
        this.serviceScheduleForm.controls['client_funding_id'].reset();
        this.getClientFunding(value * 1);
      }
    });

    // on change of support item name
    this.serviceScheduleForm.controls['price_list_id'].valueChanges
    .subscribe((value) => {
      let selectedPriceList = [...this.priceListEnumFilter].find(el => el?.id == value);  
      let rateType = this.serviceScheduleForm.controls['shift_rate'].value || 'Standard Rate';
      let rateTypeValue = this.rateTypeOptionFilter.find(el => el.name === rateType)?.name;

      //console.log("VALUE CHANGES PRICE", this.data?.schedule, value, selectedPriceList, rateType, this.rateTypeOptionFilter, rateTypeValue)

      if(value && selectedPriceList){
        let shift_rate_code = rateTypeValue?.toLowerCase()?.replace(/\s/gi, '_').concat('_code');  
        let pricelist_code = selectedPriceList[shift_rate_code] ? selectedPriceList[shift_rate_code] : selectedPriceList['standard_rate_code'];
        let pricelist_full_name = selectedPriceList?.service_type?.length > 0 ? selectedPriceList?.service_type[0]?.support_item_name : selectedPriceList?.service_type_support_item_name;

        this.serviceScheduleForm.controls['support_item_number'].setValue(pricelist_code);
        this.serviceScheduleForm.controls['price_list_full_name'].setValue(pricelist_full_name);

        //this.serviceScheduleForm.controls['shift_rate'].setValue(rateType); 
        if(rateTypeValue){
          this.rateValueCondition(rateTypeValue, selectedPriceList);   
        }
      }
    });

    this.serviceScheduleForm.controls['client_funding_id'].valueChanges.subscribe((value) => {
      this.priceListEnumFilter = [...this.priceListEnum].filter(el => el.client_funding_id == value);
    });

    // on change of rate type
    this.serviceScheduleForm.controls['shift_rate'].valueChanges
    .subscribe((value) => {
      let pricelist_id = !this.updateFunding ? this.data?.schedule?.price_list_id : this.serviceScheduleForm.controls['price_list_id'].value;
      let support_item = pricelist_id;
      let rateTypeValue = this.rateTypeOptionFilter.find(el => el.id === value)?.name;

      if(support_item && rateTypeValue){
        let selectedPriceList = [...this.priceListEnumFilter].find(el => el.id == support_item);  
        let shift_rate_code = rateTypeValue?.toLowerCase()?.replace(/\s/gi, '_').concat('_code');  
        let pricelist_code = selectedPriceList[shift_rate_code] ? selectedPriceList[shift_rate_code] : selectedPriceList['standard_rate_code'];
        this.serviceScheduleForm.controls['support_item_number'].setValue(pricelist_code);
        this.disableDates = false;
        this.rateValueCondition(rateTypeValue, selectedPriceList); 
        this.checkMinMaxTime();
        this.setMinMaxHour();  

        if(rateTypeValue)
          this.recalculateCost();
      }

      else 
        this.disableDates = true;
    });

    // on change of ttp
    this.serviceScheduleForm.controls['ttp'].valueChanges
    .subscribe((value) => {
      let pricelist_id = !this.updateFunding ? this.data?.schedule?.price_list_id : this.serviceScheduleForm.controls['price_list_id'].value;
      let support_item = pricelist_id;
      let rateType = this.serviceScheduleForm.controls['shift_rate'].value;
      let rateTypeValue = this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;

      if(support_item && rateTypeValue){
        let selectedPriceList = [...this.priceListEnumFilter].find(el => el.id == support_item);  

        this.rateValueCondition(rateTypeValue, selectedPriceList, value);   
      }
    });

    // other function for change of start date
    this.serviceScheduleForm.controls['start_date'].valueChanges.subscribe((value) => {
      /* update shift rate */

      let check_start = new Date(value).getDay();

      if(check_start == 0){
        this.rateTypeOptionFilter = [...this.rateTypeOption].filter((el) => el.id === 6 )
      }

      else if(check_start == 6){
        this.rateTypeOptionFilter = [...this.rateTypeOption].filter((el) => el.id === 5 )
      }

      else {
        this.rateTypeOptionFilter = [...this.rateTypeOption].filter((el) => el.id !== 5 && el.id !== 6)
      }

      console.log(this.rateTypeOptionFilter)
    });
  }

  setClientFunding(){
    this.updateFunding = !this.updateFunding;
  }

  // Value condition look up
  rateValueCondition(rateTypeValue: string, selectedPriceList, isTTPValue?: any): void {
    //console.log(rateTypeValue, selectedPriceList)

    if(rateTypeValue?.match("Standard"))
      this.generateRateValue('standard', selectedPriceList, isTTPValue);
    
    else if(rateTypeValue?.match("Afternoon"))
      this.generateRateValue('afternoon', selectedPriceList, isTTPValue);
    
    else if(rateTypeValue?.match("Evening"))
      this.generateRateValue('evening', selectedPriceList, isTTPValue);
    
    else if(rateTypeValue?.match("Night"))
      this.generateRateValue('night', selectedPriceList, isTTPValue);
    
    else if(rateTypeValue?.match("Saturday"))
      this.generateRateValue('saturday', selectedPriceList, isTTPValue);
    
    else if(rateTypeValue?.match("Sunday"))
      this.generateRateValue('sunday', selectedPriceList, isTTPValue);

    else if(rateTypeValue?.match("Public Holiday"))
      this.generateRateValue('public_holiday', selectedPriceList, isTTPValue);
  }

  /* GET SUPPORT ITEM PRICE */
  generateRateValue(rate: string, selectedPriceList: any, isTTPValue?: any){
    if(selectedPriceList){
      let isTTP = this.serviceScheduleForm.controls['ttp'].value || isTTPValue;  
      let rateValue = selectedPriceList[`${rate}_rate`];
      let rateValueMax = selectedPriceList[`${rate}_rate_max`];
      let rateValueTTP = selectedPriceList[`${rate}_rate_ttp`];
      let rateValueTTPMax = selectedPriceList[`${rate}_rate_ttp_max`];

      if(!!isTTP){
        this.serviceScheduleForm.controls['editable_rate_value'].setValue(rateValueTTP);
        this.recalculateCost();

        if(rateValueTTP) 
          this.disableRate = true;

        else 
          this.disableRate = false;
      }

      else {
        this.serviceScheduleForm.controls['editable_rate_value'].setValue(rateValue);
        this.recalculateCost();

        if(rateValue) 
          this.disableRate = true;

        else 
          this.disableRate = false;
      }
    }
  }

  /* DATE EVENTS - END DATE CALCULATIONS */
  setEndDateFromHoursEvents(value, from): void { 
    switch(true){
      // if start date changed
      case (value && from === 'start_date' && this.activeInput !== 'total_hours'): {
        if(!this.serviceScheduleForm.controls['end_date'].value){
          this.serviceScheduleForm.controls['end_date'].setValue(value);
        }

        if(!this.data 
          && !this.serviceScheduleForm.controls['start_time'].value 
          && !this.serviceScheduleForm.controls['end_time'].value){
          this.setMinMaxHour();
        }

        let startTime = this.serviceScheduleForm.controls['start_time'].value;
        let startDate = `${new Date(value).toLocaleDateString()} ${startTime}`;
        let endTime = this.serviceScheduleForm.controls['end_time'].value;
        let endDate = `${new Date(value).toLocaleDateString()} ${endTime}`;
        
        this.activeInput = 'start_date';
        /*this.serviceScheduleForm.controls['total_hours'].setValue(
          differenceInHours(new Date(endDate), new Date(startDate))
        );*/

        this.recalculateCost();
        this.checkMinMaxTime();
        break;
      }
    }
  }

  /*
    HOURS EVENTS - Date change and hour change
  */
  hoursKeyEvents(){
    this.checkMinMaxTime();

    this.serviceScheduleForm.controls['start_time'].valueChanges
    .subscribe((value) => {
      //console.log(value)
      if(this.activeInput === 'start_time')
        this.setHours(value, 'start_time');
    });

    this.serviceScheduleForm.controls['end_time'].valueChanges
    .subscribe((value) => {
      if(this.activeInput === 'end_time')
        this.setHours(value, 'end_time');
    });

    this.serviceScheduleForm.controls['total_hours'].valueChanges
    .subscribe((value) => {
      if(this.activeInput === 'total_hours'){
        let totalHours = value;
        let startDate = this.serviceScheduleForm.controls['start_date'].value;
        let startTime = this.serviceScheduleForm.controls['start_time'].value;
        let dateTime = `${new Date(startDate).toLocaleDateString()} ${startTime}`
        let startTimeAdd = addHours(new Date(`${dateTime}`), 1).toTimeString();
        let endTime = this.addMultipleHours(
          totalHours * 1, 
          this.serviceScheduleForm.controls['end_date'].value, 
          startTime
        );

        let endDate = addHours(new Date(`${startDate}`), totalHours * 1).toTimeString();

        endTime = endTime.split(':').slice(0,2).join(':');
        this.serviceScheduleForm.controls['end_time'].setValue(startTime);
        this.serviceScheduleForm.controls['end_time'].setValue(endTime);

        if(totalHours * 1 >= 24){
          //this.activeInput = null;
          let newEndDate = addHours(new Date(this.serviceScheduleForm.controls['start_date'].value), (totalHours * 1));
          this.serviceScheduleForm.controls['end_date'].setValue(newEndDate);
        }

        this.recalculateCost();
      }
    });

    this.serviceScheduleForm.controls['editable_rate_value'].valueChanges
    .subscribe((value) => {
      if(value){
        this.recalculateCost();
      }
    });
  }

  /*
    Recalculate costs
  */
  recalculateCost(){
    let pricelist_id = !this.updateFunding ? this.data?.schedule?.price_list_id : this.serviceScheduleForm.controls['price_list_id'].value;
    let support_item = pricelist_id;
    let selectedPriceList = [...this.priceListEnumFilter].find(el => el.id == support_item); 
    let rateType = selectedPriceList?.service_type?.length > 0 ? selectedPriceList?.service_type[0]?.unit : selectedPriceList?.service_type_unit;

    /* Calcualtion item */
    let chargeRate =  this.serviceScheduleForm.controls['editable_rate_value'].value * 1;
    let total_hour = this.serviceScheduleForm.controls['total_hours'].value;
    let subPrice = total_hour * chargeRate;  
    let totalPrice = 0;

    if(rateType){
      // Unit Condition
      if(rateType == 'HourlyRate') 
        totalPrice = subPrice;

      else if(rateType === 'PerDay') 
        totalPrice = subPrice/24; 

      else if(rateType === 'PerWeek')
        totalPrice = subPrice/168;

      else if(rateType === 'PerYear') 
        totalPrice = subPrice/8760;  

      else 
        totalPrice = chargeRate;

      let travel_total = this.clientTotalForm.controls['travel_total'].value * 1 || 0;
      let main_total = Math.round((travel_total + totalPrice) * 100) / 100;

      //console.log(pricelist_id, this.priceListEnumFilter, selectedPriceList, rateType, main_total, totalPrice)

      this.clientTotalForm.controls['client_total'].setValue(main_total);
      this.clientTotalForm.controls['calculated_cost'].setValue( this.decimalPipe.transform(totalPrice) );
      this.clientTotalForm.controls['editable_rate_value'].setValue(chargeRate);
      this.clientTotalForm.controls['total_hours'].setValue(total_hour);
      this.clientTotalForm.controls['rate_type'].setValue(rateType?.split(/(?=[A-Z])/g).join(' '));
    }
  }

  /* HOURS FUNCTIONS */
  activeFocus(event, inputFocus){
    this.activeInput = inputFocus;
  }

  /* HOURS CALCULATIONS */
  setHours(value, from): void{
    let startTime;
    let endTime;

    if(from === 'start_time'){
      startTime = value;
      endTime = this.serviceScheduleForm.controls['end_time'].value;
    }

    else if(from === 'end_time'){
      startTime = this.serviceScheduleForm.controls['start_time'].value;
      endTime = value;
    }


    let startDateMain = this.serviceScheduleForm.controls['start_date'].value;
    let endDateMain = this.serviceScheduleForm.controls['end_date'].value;

    let startDate = `${new Date(startDateMain).toLocaleDateString()} ${startTime}`;
    let endDate = `${new Date(endDateMain).toLocaleDateString()} ${endTime}`;

    if (startDate > endDate) {
      endDate = `${this.add24Hours(endDate)} ${endTime}`;
    }

    const timestamp = (date) => Date.parse(date);

    if (!isNaN(timestamp(startDate)) && !isNaN(timestamp(endDate)) && value) {
      let total_hours = this.calculateTotalHours(startDate, endDate) 
      // differenceInHours(new Date(endDate), new Date(startDate))

      if(total_hours) {
        this.serviceScheduleForm.controls['total_hours'].setValue(Number(total_hours.toFixed(2)));
        this.clientTotalForm.controls['total_hours'].setValue(+this.serviceScheduleForm.controls['total_hours'].value);
      }
      return;
    }
  }

  private add24Hours(date:any){

    let formattingEndDate = new Date(date);
    let newEndTime = new Date(formattingEndDate.getTime() + 24 * 60 * 60 * 1000)
    let endDate = new Date(newEndTime).toLocaleDateString();

    return endDate
  }

  calculateTotalHours(startTime, endTime): number {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const totalHours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
    return totalHours;
  }

  addMultipleHours(h, date, start_time) {
    let dateTime = `${new Date(date).toLocaleDateString()} ${start_time}`
    let returnDate = addHours(new Date(`${dateTime}`), h);
    return returnDate.toTimeString();
  }

  // set initial time value
  setMinMaxHour(){
    let rateType = this.serviceScheduleForm.controls['shift_rate'].value;
    let shift = this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;

    if(shift 
      && !this.serviceScheduleForm.controls['start_time'].value 
      && !this.serviceScheduleForm.controls['end_time'].value){

      if(shift.toLowerCase().match('night')){
        this.serviceScheduleForm.controls['start_time'].setValue('22:00');
        this.serviceScheduleForm.controls['end_time'].setValue('23:00');
      } 

      else if(shift.toLowerCase().match('afternoon')){
        this.serviceScheduleForm.controls['start_time'].setValue('16:00');
        this.serviceScheduleForm.controls['end_time'].setValue('17:00');
      } 

      else if(shift.toLowerCase().match('daytime')){
        this.serviceScheduleForm.controls['start_time'].setValue('06:00');
        this.serviceScheduleForm.controls['end_time'].setValue('07:00');
      } 

      else if(shift.toLowerCase().match('evening')){
        this.serviceScheduleForm.controls['start_time'].setValue('20:00');
        this.serviceScheduleForm.controls['end_time'].setValue('21:00');
      }

      else {
        this.serviceScheduleForm.controls['start_time'].setValue("7:00 am");
        this.serviceScheduleForm.controls['end_time'].setValue("8:00 am");
      }
    }
  }

  // Check time restriction
  checkMinMaxTime(){
    const rateType = this.serviceScheduleForm.controls['shift_rate'].value;
    const shift = this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;
    const start_date = this.serviceScheduleForm.controls['start_date'].value;
    const end_date = this.serviceScheduleForm.controls['end_date'].value;

    if(shift){
      if(shift.toLowerCase().match('night')){
        this.minStartTime = "10:00 pm";
        this.maxStartTime = null;     

        this.minEndTime = null;
        this.maxEndTime = null; 
      } 

      else if(shift.toLowerCase().match('standard')){
        this.minStartTime = "6:00 am";
        this.maxStartTime = "8:00 pm";

        this.minEndTime = "7:00 am";
        this.maxEndTime = "8:00 pm";
      } 

      else if(shift.toLowerCase().match('afternoon')){
        this.minStartTime = "4:00 pm";
        this.maxStartTime = "8:00 pm";

        this.minEndTime = "4:00 pm";
        this.maxEndTime = "8:00 pm";
      } 

      else if(shift.toLowerCase().match('evening')){
        this.minStartTime = "8:00 pm";
        this.maxStartTime = null;     

        this.minEndTime = null;
        this.maxEndTime = null;   
      }

      else {
        this.minStartTime = null;
        this.maxStartTime = null;     

        this.minEndTime = null;
        this.maxEndTime = null;  
      }
    }
  }

  weekendsDatesFilter = (d: Date): boolean => {
    const day = d?.getDay();
    const rateType = this.serviceScheduleForm.controls['shift_rate'].value;
    const selectedShiftType = this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;

    /* Prevent Monday to Saturday */
    if(selectedShiftType?.toLowerCase().match("sunday")){
      return day === 0;
    }

    /* Prevent Sunday to Friday */
    else if(selectedShiftType?.toLowerCase().match("saturday")){
      return day === 6;
    }

    /* Prevent Saturday and Sunday for select. */
    else if(selectedShiftType?.toLowerCase().match("standard") ||
      selectedShiftType?.toLowerCase().match("afternoon") ||
      selectedShiftType?.toLowerCase().match("night") ||
      selectedShiftType?.toLowerCase().match("evening")){
      return day !== 0 && day !== 6;
    }

    return true;
  }

  setGroupClients(event){
    if(event){
      let selectedGroup = this.groupEnums.find(el => el.id == event);
      
      // set client list
      this.groupClients = [];

      selectedGroup?.group_member.forEach((el) => {
        this.groupClients.push(el?.client[0])
      });
      console.log(event, selectedGroup, this.groupClients)
    }
  }

  openClientModal(event, type?: any){
    let careWorkerDialog = this.dialogClient.open(
      SearchClientModalComponent,
      {
        //height: '920px',
        width: '25vw',
        data: {
          type: type,
          selectedGroup: this.selectedGroup,
          schedule: this.data?.schedule,
          clients: this.groupClients,
          client_added: [...this.clientTableData],
          employee_added: [...this.employeeTableData]  //.map(el => el.id)
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      console.log(type)
      if(result){
        if(type !== 'employee'){
          let data = { ...result.client }

          let groupClientObj = {
            client_id: result?.client?.id
          }

          this.clientTableData.push(data);
          this.serviceScheduleForm.controls['group_service_schedule_client_data'].setValue(this.clientTableData);

          if(groupClientObj){
            //this.groupClientData.push(groupClientObj);
            this.group_service_schedule_client.emit({
              add: [...this.groupClientData]
            });
          }
        }

        else if(type === 'employee'){
          let employeeObj = result.map(el => {
            return {
              employee_id: el?.id
            }
          })

          result?.forEach(el => {
            this.employeeTableData.push(el);
          });

          if(employeeObj){
            this.group_service_schedule_employee.emit({
              add: [...employeeObj]
            });
          }
        }
      }
    })
  }

  deleteClientModal(index: number, type?: any){
    console.log("DELETE")
    if(type !== 'employee'){
      let deleteClient = { id: this.clientTableFull[index]?.id };

      this.clientTableData.splice(index, 1);
      this.serviceScheduleForm.controls['group_service_schedule_client_data'].setValue(this.clientTableData);

      this.group_service_schedule_client.emit({
        delete: [deleteClient]
      });
    }

    else if(type === 'employee'){
      let deleteEmployee =  { id: this.employeeTableFull[index]?.id };

      this.employeeTableData.splice(index, 1);
      this.group_service_schedule_employee.emit({
        delete: [deleteEmployee]
      });
    }
  }
}

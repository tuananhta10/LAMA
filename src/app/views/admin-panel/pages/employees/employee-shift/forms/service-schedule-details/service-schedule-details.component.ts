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
import { SearchClientModalComponent } from '../../../../schedule-board/dialogs/search-client-modal/search-client-modal.component';
import { takeUntil } from 'rxjs/operators';
import { 
  addDays, 
  addHours,
  subHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  differenceInHours
} from 'date-fns';
import { ClientGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-client-group.action';

@Component({
  selector: 'app-service-schedule-details',
  templateUrl: './service-schedule-details.component.html',
  styleUrls: ['./service-schedule-details.component.scss']
})
export class ServiceScheduleDetailsComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  @Input() serviceScheduleForm!: FormGroup;
  @Input() clientTotalForm!: FormGroup;
  @Input() data: any;
  @Input() groupClientData: any[] = [];
  @Output() group_service_schedule_client: EventEmitter<any> = new EventEmitter<any>(); 

  public clientColumns:any[] = [
    {name: 'Name', field: 'name'}, {name: 'Funding Source', field: 'funding_source_name' },{name: 'Email', field: 'email_address'}, {name: 'Mobile Phone', field: 'mobile_phone_no'},
    /*{name: 'Home Phone', field: 'home_phone_no'},*/ {name: 'Suburb', field: 'suburb'}, {name: 'Disability Type', field: 'disability_type'}
  ];
  public clientTableData: any[] = [];
  
  public type: any[] =["Individual", "Group"];
  public client: any[] = [];
  public clientFunding: any[] = [];
  public priceList: any[] = [];
  public serviceType: any[] = [];
  public ahCalculation: any[] = ["Shift Start", "Shift End", "Split Shift", "Highest Rate"];
  public status: any[] = ["Setup", "Scheduled", "Created", "Pending", "Cancelled", "Completed"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public rateTypeOption: any[] = [
    { id: 1, name: "Standard Rate" },
    { id: 2, name: "Afternoon Rate" },
    { id: 3, name: "Evening Rate" },
    { id: 4, name: "Night Rate" },
    { id: 5, name: "Saturday Rate" },
    { id: 6, name: "Sunday Rate" },
    { id: 7, name: "Public Holiday Rate" },
  ];
  public rateTypeOptionFilter: any[] = [];
  public rateTypes: any[] = this.rateTypeOption.map(el => el.name);

  public groupEnums: any[] = [];
  public serviceLocation: string[] = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA", "Remote", "Very Remote"];
  public unitType: any = {
    "FixedRate": "E",  
    "HourlyRate": "H",  
    "PerDay": "D",  
    "PerWeek": "WK",  
    "PerYear": "YR"
  }
  private enum$: any;  
  private clientGroupData$: any;
  private clientFundingData$: any;
  private clientReq: Subscription;
  private clientFundingReq: Subscription;
  private priceListReq: Subscription;
  private groupReq: Subscription;

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
  public clientLoading: boolean = false;
  public priceListLoading: boolean = false;
  public disableRate: boolean = true;
  public disableDates: boolean = true;
  public groupClients: any[] = [];
  public updateFunding: boolean = false;
  public riskNotification: any;  
  public schedulerNotes: any;
  public start_date: any = '';

  constructor(private dialogClient: MatDialog,
    private adminClientGroup: Store<AdminProfileState>,
    private adminClientFunding: Store<AdminProfileState>,
    private adminEnumStore: Store<AdminProfileState>
  ) { 
    console.log("DATA", this.data)
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
    let group_client_table = this.serviceScheduleForm.controls['group_service_schedule_client_data'].value

    if(group_clients){
      this.groupClientData = group_clients?.add;
      this.clientTableData = [...group_client_table];
    }

    // if client funding changes
    this.serviceScheduleForm.controls['client_funding_id'].valueChanges
    .subscribe((value) => {
      if(value){
        this.getSupportItemPerClientFunding(value)
      }
    })

    // Risk notification details
    let riskNotification = this.clientEnum.find(el => el.id == this.data?.client?.id);
    this.riskNotification = riskNotification?.risk_notification;
    this.schedulerNotes = riskNotification?.scheduler_notes;
  }

  getSupportItemPerClientFunding(value){
    let selectedClientFunding;

    if(this.data){
      selectedClientFunding = this.clientFundingEnum.filter(el => (this.updateFunding ? (el.id == value) : (el.name == value)));  
    }

    else {
      selectedClientFunding = this.clientFundingEnum.filter(el => el.id == value);  
    }

    let setPricelistEnum = () => {
      selectedClientFunding.forEach((el) => {
        el?.client_funding_price_list?.forEach(_el => {
          this.priceListEnum.push(_el?.price_list[0])
        });

        this.priceListEnum.forEach(support_item => {
          //support_item['id'] = ""
          support_item['name'] = `${support_item?.service_type[0]?.support_item_name}`;
        });
      });
    }

    if(this.updateFunding){
      this.priceListEnum = [];
      setPricelistEnum();
    }

    /*if(!this.updateFunding){
      let selectedSupportItem = selectedClientFunding[0]?.client_funding_price_list[0]?.price_list[0]?.name;
      this.serviceScheduleForm.controls['price_list_id'].setValue(selectedSupportItem);
      this.priceListEnum = [];
      setPricelistEnum();
      this.recalculateCost();
    }*/

    // Set pricelist
    if(!this.updateFunding){
      let selectedClientFundingPricelists = selectedClientFunding[0]?.client_funding_price_list
      let selectedSupportItem = selectedClientFundingPricelists?.find(_el => _el?.price_list[0]?.id === this.data?.client_service_schedule[0]?.price_list_id);
      
      this.serviceScheduleForm.controls['price_list_id'].setValue(selectedSupportItem?.price_list[0]?.name);
      this.priceListEnumFilter = [];
      setPricelistEnum();
      this.recalculateCost();
    }
  }

  getGroupPricelist(){
    if(this.serviceScheduleForm.controls['type'].value == 'Group'){
      this.adminEnumStore.dispatch({
        type: PriceListActionTypes.GET_PRICE_LIST_LIST
      });
    }
  }

  // clients
  getClients(): void {
    this.adminEnumStore.dispatch({
      type: ClientListActionTypes.GET_CLIENT_LIST,
      from: 'service-schedule'
    });
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
    console.log(this.data)

    this.adminClientGroup.dispatch({
      type: ClientGroupActionTypes.GET_CLIENT_GROUP_LIST,
      payload: this.data ? this.data?.id : null
    }); 
  }

  // subscribe to enums
  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
    this.clientFundingData$ = this.adminClientFunding.pipe(select(state => state.clientFunding));
    this.clientGroupData$ = this.adminClientGroup.pipe(select(state => state.clientGroup));

    /* Client List */
    this.clientReq = this.enum$.subscribe((results: any) => {
      this.clientEnum = results?.clients.clientList;
      this.clientEnum.forEach((el,i)=>{
        el['name']=`${el.first_name} ${el.last_name}`;
      });

      this.priceListLoading = results.clientFunding.pending;
      this.clientLoading = results?.clients.clientListPending;
    });

    /* Pricelist - Support Item Name */
    this.priceListReq  = this.enum$.subscribe((results: any) => {
      if(results.priceList.priceListList){
        results.priceList.priceListList.forEach(element => {
          element.name = `${element?.service_type_registration_group_number} - ${element?.service_type_support_item_name}`
        });
        this.priceListEnum = results.priceList.priceListList.filter(el => el?.id !== 1);
      }
    });

    // client funding
    this.clientFundingReq = this.clientFundingData$.subscribe((clientFunding: any) => {
      this.priceListLoading = clientFunding?.pendingDetails;

      if (clientFunding?.clientFundingList?.length > 0) {
        this.clientFundingEnum = [...clientFunding.clientFundingList].filter(el => !!el.client_funding_price_list);
        this.clientFundingEnum.forEach((el) => {
          el['id'] = el?.id;
          el['name'] = el?.funding_source[0]?.code;

          el?.client_funding_price_list?.forEach(_el => {
            if(_el?.price_list?.length > 0){
              this.priceListEnum.push({
                client_funding_id: el?.id,
                ..._el?.price_list[0]
              })
            }
          });
        });

        console.log(this.clientFundingEnum, this.priceListEnum)

        if(this.clientFundingEnum?.length > 0){
          let selectedClientFunding = this.clientFundingEnum.find(el => el.id === this.data?.client_service_schedule[0]?.client_funding_id);
          this.serviceScheduleForm.controls['client_funding_id'].setValue(selectedClientFunding?.name);

          console.log(selectedClientFunding?.name)
        }
      }
    })

    // client group
    this.groupReq =  this.clientGroupData$.subscribe((clientGroup: any) => {
      if(clientGroup.clientGroupList.length > 0){
        this.groupEnums = clientGroup.clientGroupList;
      }
    });
  }

  setClientFunding(){
    this.updateFunding = !this.updateFunding;
  }

  /*
    SERVICE DETAILS EVENTS
  */
  serviceDetailsEvents(){
    /* On Client funding change */
    this.serviceScheduleForm.controls['type'].valueChanges
    .subscribe((value) => {
      if(!!value && value === 'Group' && this.groupEnums?.length === 0)
        this.getClientGroup();  

      else if(!!value && value === 'Individual' && this.clientEnum?.length === 0)
        this.getClients();
    });


    /* On Client funding change */
    this.serviceScheduleForm.controls['client_id'].valueChanges
    .subscribe((value) => {
      if(!!value){
        let riskNotification = this.clientEnum.find(el => el.id == value)
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
      let rateType = this.serviceScheduleForm.controls['shift_rate'].value;
      let rateTypeValue = this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;

      if(value && selectedPriceList){
        let shift_rate_code = rateTypeValue?.toLowerCase()?.replace(/\s/gi, '_').concat('_code');  
        let pricelist_code = selectedPriceList[shift_rate_code] ? selectedPriceList[shift_rate_code] : selectedPriceList['standard_rate_code'];
        this.serviceScheduleForm.controls['support_item_number'].setValue(pricelist_code);
        this.serviceScheduleForm.controls['price_list_full_name'].setValue(selectedPriceList?.service_type[0]?.support_item_name);
        
        if(rateTypeValue){
          this.rateValueCondition(rateTypeValue, selectedPriceList);   
        }
      }
    });

    // on change of rate type
    this.serviceScheduleForm.controls['shift_rate'].valueChanges
    .subscribe((value) => {
      let pricelist_id = !this.updateFunding ? this.data?.price_list_id : this.serviceScheduleForm.controls['price_list_id'].value;
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
      let pricelist_id = !this.updateFunding ? this.data?.price_list_id : this.serviceScheduleForm.controls['price_list_id'].value;
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

  // Value condition look up
  rateValueCondition(rateTypeValue: string, selectedPriceList, isTTPValue?: any): void {
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

  setPricelist(value){
    if(value !== this.serviceScheduleForm.controls['service_location'].value){
      this.serviceScheduleForm.controls['shift_rate'].setValue(null);
      this.serviceScheduleForm.controls['editable_rate_value'].setValue(0);

      this.adminEnumStore.dispatch({
        type: PriceListActionTypes.GET_PRICE_LIST_LIST,
        payload: value
      });
    }

    else return;

    /**/
  }

  /*
    Recalculate costs
  */
  recalculateCost(){
    let pricelist_id = this.data && !this.updateFunding ? this.data?.price_list_id : this.serviceScheduleForm.controls['price_list_id'].value;
    let support_item = pricelist_id;
    let selectedPriceList = [...this.priceListEnum].find(el => el.id == support_item); 
    let rateType = selectedPriceList?.service_type[0]?.unit;

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

      console.log("RECALCULATE")

      this.clientTotalForm.controls['client_total'].setValue(main_total);
      this.clientTotalForm.controls['calculated_cost'].setValue(totalPrice);
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
    
    const timestamp = (date) => Date.parse(date);

    if (!isNaN(timestamp(startDate)) && !isNaN(timestamp(endDate)) && value) {
      let total_hours = differenceInHours(new Date(endDate), new Date(startDate))

      if(total_hours) 
        this.serviceScheduleForm.controls['total_hours'].setValue(total_hours);

      return;
    }
  }

  addMultipleHours(h, date, start_time) {
    let dateTime = `${new Date(date).toLocaleDateString()} ${start_time}`
    let returnDate = addHours(new Date(`${dateTime}`), h);
    return returnDate.toTimeString();
  }

  // set initial time value
  setMinMaxHour(){
    let rateType = this.serviceScheduleForm.controls['shift_rate'].value;
    let shift = rateType//this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;

    console.log("SET MAX HOURS")

    if(shift 
      /*&& !this.serviceScheduleForm.controls['start_time'].value 
      && !this.serviceScheduleForm.controls['end_time'].value*/){

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
    const selectedShiftType = rateType//this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;

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

  openClientModal(event){
    let careWorkerDialog = this.dialogClient.open(
      SearchClientModalComponent,
      {
        //height: '920px',
        width: '25vw',
        data: {
          clients: this.groupClients,
          client_added: [...this.clientTableData].map(el => el.id)
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        let data = {
          ...result.client,
          funding_source_name: result?.client_funding?.funding_source_full_name,
          client_funding_id: result?.client_funding?.funding_source_id
        }

        let groupClientObj = {
          client_id: result?.client?.id,  
          client_funding_id: result?.client_funding?.id
        }

        console.log(result)

        this.clientTableData.push(data);
        this.serviceScheduleForm.controls['group_service_schedule_client_data'].setValue(this.clientTableData);

        if(groupClientObj){
          this.groupClientData.push(groupClientObj);
          this.group_service_schedule_client.emit({
            add: [...this.groupClientData]
          });
        }
      }
    })
  }

  deleteClientModal(index: number){
    this.clientTableData.splice(index, 1);
    this.serviceScheduleForm.controls['group_service_schedule_client_data'].setValue(this.clientTableData);

    this.groupClientData.splice(index, 1);
    this.group_service_schedule_client.emit({
      add: [...this.groupClientData]
    });
  }
}

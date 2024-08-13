import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit, 
  ChangeDetectorRef
} from '@angular/core';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { ClientFundingActionTypes } from '@main/views/admin-panel/store/actions/admin-client-funding.action';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchClientModalComponent } from '../../dialogs/search-client-modal/search-client-modal.component';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  addDays, 
  addHours,
  subHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  format,
  differenceInHours,
  parseISO,
  formatISO,
  differenceInMinutes,
  differenceInDays
} from 'date-fns';
import { ClientGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-client-group.action';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  ahCalculation,
  status,
  rateTypeOption,
  serviceLocation,
  recurringInterval,
  unitType,
  clientColumns,
  checkBoxOptions,
} from '../../utils/service-schedule-const';
import { mainAnimations } from '@app-main-animation';
import { SearchListComponent } from '@main/shared/components';

@Component({
  selector: 'app-service-details-simple',
  animations: [mainAnimations],
  templateUrl: './service-details-simple.component.html',
  styleUrls: ['./service-details-simple.component.scss']
})
export class ServiceDetailsSimpleComponent implements OnInit {
  @Input() serviceScheduleForm!: FormGroup;
  @Input() data: any;
  @Input() publicHolidayRate: any;
  @Output() group_service_schedule_client: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() selectedPricelistDetails: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() setPlanExpired: EventEmitter<any> = new EventEmitter<any>(); 

  private unsubscribe$ = new Subject<void>();
  private clientGroupData$: any;
  private enum$: any;  
  private clientFundingData$: any;
  private clientReq: Subscription;
  private clientFundingReq: Subscription;
  private priceListReq: Subscription;
  private groupReq: Subscription;

  public riskNotification;
  public schedulerNotes: any;
  public type: any[] =["Individual", "Group"];
  public client: any[] = [];
  public clientFunding: any[] = [];
  public priceList: any[] = [];
  public serviceType: any[] = [];
  public ahCalculation: any[] = ahCalculation;
  public status: any[] = status;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public rateTypeOption: any[] = rateTypeOption;
  public rateTypes: string[] = [...this.rateTypeOption].map(el => el.name);
  public rateTypeOptionFilter;
  public serviceLocation: string[] = serviceLocation;
  public unitType: any = unitType;
  public groupEnums: any[] = [];
  public clientColumns:any[] = clientColumns;
  public clientTableData: any[] = [];
  public groupClientData: any[] = [];
  public recurringInterval: string[] = recurringInterval;
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
  public start_date: any = '';
  public groupClients: any[] = [];
  public checkBoxOptions:any = checkBoxOptions;
  public priceListId: any;
  isOvernight = new BehaviorSubject<boolean>(false)
  public isPlanExpired: boolean = false;

  constructor(private dialogClient: MatDialog,
    private adminClientGroup: Store<AdminProfileState>,
    private adminClientFunding: Store<AdminProfileState>,
    private adminEnumStore: Store<AdminProfileState>,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { 
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

    if(this.data?.grouping === 'Group'){
      this.serviceScheduleForm.controls['type'].setValue('Group');
      this.getClientGroup();

      this.serviceScheduleForm.controls['group_id'].valueChanges
      .subscribe((result) => {
        console.log(result)
        if(result?.id){
          this.clientTableData = [];
          this.groupClientData = [];
          this.group_service_schedule_client.emit({ add: [] });
          this.priceListId = result?.price_list_id;
          this.getPriceList();
          this.checkVacantEmployee();
        }
      });
    }

    else {
      this.adminEnumStore.dispatch({
        type: ClientListActionTypes.GET_CLIENT_LIST,
        from: 'service-schedule'
      });
    }
  }

  ngOnDestroy(){
    if(this.clientReq) this.clientReq.unsubscribe();
    if(this.clientFundingReq) this.clientFundingReq.unsubscribe();
    if(this.priceListReq) this.priceListReq.unsubscribe();
    if(this.groupReq) this.groupReq.unsubscribe();
  }

  getPriceList(){
    this.adminEnumStore.dispatch({
      type: PriceListActionTypes.GET_PRICE_LIST_LIST
    }); 
  }

  // client details
  getClientFunding(client_id?: any): void {
    if(client_id){
      this.fundingToBePublished = undefined;
      this.clientFundingEnum = [];
      this.adminClientFunding.dispatch({
        type: ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST,
        payload: {
          details: 'details',
          client_id: client_id
        }
      });
    }
  }

  getClientGroup(){
    this.adminClientGroup.dispatch({
      type: ClientGroupActionTypes.GET_CLIENT_GROUP_LIST
    }); 
  }

  // subscribe to enums
  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
    this.clientFundingData$ = this.adminClientFunding.pipe(select(state => state.clientFunding));
    this.clientGroupData$ = this.adminClientGroup.pipe(select(state => state.clientGroup));

    /* Client List */
    if(this.data.grouping === 'Client' || this.data?.grouping === 'Employee'){
      this.clientReq = this.enum$.subscribe((results: any) => {
        this.clientEnum = results?.clients.clientList;

        this.clientEnum.forEach((el,i)=>{
          el['name']=`${el.first_name} ${el.last_name}`;
        });

        this.clientLoading = results?.clients.clientListPending;
      });
    }

    /* FOR GROUP SCHEDULE CREATION */
    else if(this.data.grouping === 'Group'){
      this.groupReq =  this.clientGroupData$.subscribe((clientGroup: any) => {
        console.log(clientGroup)
        if(clientGroup.clientGroupList.length > 0){
          this.groupEnums = clientGroup.clientGroupList;
        }
      });
    }

    /* PRICELIST - Support Item Name */
    this.subscribePricelist()

    /* PARTICIPANT FUNDING */
    this.subscribeClientFunding();
  }

  /* PRICELIST - Support Item Name */
  subscribePricelist(){
    this.priceListReq  = this.enum$.subscribe((results: any) => {
      if(results.priceList.priceListList){
        results.priceList.priceListList.forEach(element => {
          element.name = `${element?.service_type_registration_group_number} - ${element?.service_type_support_item_name}`
        });
        
        if(this.data?.grouping === 'Group'){
          this.priceListEnumFilter = results.priceList.priceListList.filter(el => el?.id !== 1);
          this.serviceScheduleForm.controls['price_list_id'].setValue(this.priceListId)
        }

        this.priceListLoading = results.priceList.pending;
      }
    });
  }

  public fundingToBePublished: boolean;;

  navigateToFunding(){
    this.router.navigate([`/admin/clients/details/${this.serviceScheduleForm.controls['client_id'].value}/client-funding`])
    .then(() => this.dialog.closeAll());
  }

  @Output() getSelectedClientFunding: EventEmitter<any> = new EventEmitter<any>()

  /* PARTICIPANT FUNDING */
  subscribeClientFunding(){
    // client funding
    this.clientFundingReq = this.clientFundingData$.subscribe((clientFunding: any) => {
      if (clientFunding.clientFundingList.length > 0) {
        this.priceListEnum = [];
        this.priceListEnumFilter = [];

        this.clientFundingEnum = [...clientFunding.clientFundingList].filter(el => !!el.client_funding_price_list && el?.status === 'Published' && el?.funding_type == this.serviceScheduleForm.controls['type'].value);
        this.fundingToBePublished = false;  

        [...clientFunding.clientFundingList].forEach(el => {
          if(el?.status === 'Unpublished') this.fundingToBePublished = true;  
        });

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
      }
    });
  }

  /*
    SERVICE DETAILS EVENTS
  */
  public supportTeam: any;
  @ViewChild('fundingSearch', {static: false}) fundingSearch: SearchListComponent;
  @ViewChild('supportItemSearch', {static: false}) supportItemSearch: SearchListComponent;
  

  serviceDetailsEvents(){
    /* On Client funding change */
    this.serviceScheduleForm.controls['client_id'].valueChanges
    .subscribe((value) => {
      if(!!value){
        let riskNotification = this.clientEnum.find(el => el.id == value);
        console.log(riskNotification, "CLEAR")

        // include shift address mapping

        this.supportTeam = riskNotification;
        this.riskNotification = riskNotification?.risk_notification;
        this.schedulerNotes = riskNotification?.scheduler_notes;
        this.priceListEnumFilter = [];
        this.serviceScheduleForm.controls['price_list_id'].setValue(null);
        this.serviceScheduleForm.controls['client_funding_id'].setValue(null);
        this.fundingSearch.clearTextBox();
        this.supportItemSearch.clearTextBox();
        this.cdr.detectChanges();
        this.getClientFunding(value * 1);
        this.checkVacantEmployee();
      }
    });

    this.serviceScheduleForm.controls['is_overnight'].valueChanges
    .subscribe((value) => {
      this.isOvernight.next(value)
    })

    // on change of support item name
    this.serviceScheduleForm.controls['price_list_id'].valueChanges
    .subscribe((value) => {
      let selectedPriceList = [...this.priceListEnumFilter].find(el => el.id == value);  
      let rateType = this.serviceScheduleForm.controls['shift_rate'].value;
      let rateTypeValue = this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;

      if(value && selectedPriceList){
        let pricelist_full_name = selectedPriceList?.service_type?.length > 0 ? selectedPriceList?.service_type[0]?.support_item_name : selectedPriceList?.service_type_support_item_name;
        this.serviceScheduleForm.controls['price_list_full_name'].setValue(pricelist_full_name);

        // set support item name
        if(this.data?.grouping === 'Group'){
          this.serviceScheduleForm.controls['support_item'].setValue(pricelist_full_name);
        }

        // check rate type
        if(rateTypeValue){
          this.rateValueCondition(rateTypeValue, selectedPriceList);   
        }

        else if(!rateTypeValue){
          this.disableRate = false;
        }

        // recalculate if there's already a value
        let start_time = this.serviceScheduleForm.controls['start_time'].value;
        let end_time = this.serviceScheduleForm.controls['end_time'].value;
        
        if(start_time && end_time){
          if(this.data?.grouping === 'Group'){
            console.log(this.data?.grouping)
            this.getRateBasedOnTime(start_time, end_time);
          }

          else {
            setTimeout(() => {
              this.getRateBasedOnTime(start_time, end_time);
              //this.checkVacantEmployee();
            }, 300);
          }
        }
      }
    });

    this.serviceScheduleForm.controls['client_funding_id'].valueChanges
    .subscribe((value) => {
      this.priceListEnumFilter = [...this.priceListEnum].filter(el => el.client_funding_id == value);

      if(typeof value === 'object'){
        const endDate = new Date(value?.end_date * 1000);
        const currentDate = new Date()
        const remainingDays = differenceInDays(endDate, currentDate);
  
        if(remainingDays <= 0){
          this.setPlanExpired.emit(true);
          this.isPlanExpired = true;
        } else {
          this.setPlanExpired.emit(false);
          this.isPlanExpired = false;
        }
      }

      // event for selecting a funding
      if(value){
        let selectedFunding = this.clientFundingEnum.find(el => el?.id === value);  
        this.getSelectedClientFunding.emit(selectedFunding);
      }
    });

    // on change of ttp
    this.serviceScheduleForm.controls['ttp'].valueChanges
    .subscribe((value) => {
      let support_item = this.serviceScheduleForm.controls['price_list_id'].value;
      let rateType = this.serviceScheduleForm.controls['shift_rate'].value;
      let rateTypeValue = this.rateTypeOptionFilter.find(el => el.id === rateType)?.name;

      if(support_item && rateTypeValue){
        let selectedPriceList = [...this.priceListEnumFilter].find(el => el.id == support_item);    
      }
    });
  }

  /* FOR CHECKIGN VACANT EMPLOYEE */
  checkVacantEmployee(dateVal?: any){
    if(this.data && !isNaN(this.serviceScheduleForm.controls['client_id'].value)){
      let objectBody = {
        page: 'vacant',  
        view: 'creation',
        client_id: this.serviceScheduleForm.controls['client_id'].value,
        date: dateVal ? convertTimestampUtc(new Date(dateVal)) : convertTimestampUtc(new Date(this.serviceScheduleForm.controls['start_date'].value)),  
        start_time: this.serviceScheduleForm.controls['start_time'].value ? this.convertTimeFull(this.serviceScheduleForm.controls['start_time'].value) : '0000',  
        end_time: this.serviceScheduleForm.controls['end_time'].value ? this.convertTimeFull(this.serviceScheduleForm.controls['end_time'].value) : '2359',  
        price_list_id: this.serviceScheduleForm.controls['price_list_id'].value
      }

      setTimeout(() => {
        this.adminEnumStore.dispatch({
          type: ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE,
          payload: {
            data: { ...objectBody }
          }
        });
      }, 1000);
    }
  }

  convertTimeFull(amPmString) { 
    let d = new Date("1/1/2013 " + amPmString); 

    let hour = (d.getHours() + '').length === 2 ? d.getHours() : '0' + d.getHours();
    let minute =  (d.getMinutes() + '').length === 2 ? d.getMinutes() : '0' + d.getMinutes();

    return `${hour}${minute}`; 
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
    let isTTP = this.serviceScheduleForm.controls['ttp'].value || isTTPValue;  
    let rateValue = selectedPriceList[`${rate}_rate`];
    let rateValueMax = selectedPriceList[`${rate}_rate_max`];
    let rateValueTTP = selectedPriceList[`${rate}_rate_ttp`];
    let rateValueTTPMax = selectedPriceList[`${rate}_rate_ttp_max`];

    if(!!isTTP){
      this.serviceScheduleForm.controls['editable_rate_value'].setValue(rateValueTTP);

      if(rateValueTTP) 
        this.disableRate = true;

      else 
        this.disableRate = false;
    }

    else {
      this.serviceScheduleForm.controls['editable_rate_value'].setValue(rateValue);

      if(rateValue) 
        this.disableRate = true;

      else 
        this.disableRate = false;
    }
  }

  /* DATE EVENTS - END DATE CALCULATIONS */
  setEndDateFromHoursEvents(value, from): void { 
    switch(true){
      // if start date changed
      case (value && from === 'start_date' && this.activeInput !== 'total_hours'): {
        this.serviceScheduleForm.controls['end_date'].setValue(value);

        console.log("SET END DATE FROM HOURS EVENT")

        /*let startTime = this.serviceScheduleForm.controls['start_time'].value;
        let startDate = `${new Date(value).toLocaleDateString()} ${startTime}`;
        let endTime = this.serviceScheduleForm.controls['end_time'].value;
        let endDate = `${new Date(value).toLocaleDateString()} ${endTime}`;
        let total_hours = differenceInMinutes(new Date(endDate), new Date(startDate));
        
        this.activeInput = 'start_date';
        this.serviceScheduleForm.controls['total_hours'].setValue(Math.round((total_hours/60)*100)/100);

        if(startTime && endTime){
          //setTimeout(() => this.checkVacantEmployee(value), 500);
        }*/

        break;
      }
    }
  }

  /*
    HOURS EVENTS - Date change and hour change
  */
  hoursKeyEvents(){
    this.serviceScheduleForm.controls['start_time'].valueChanges
    .subscribe((value) => {
      if(this.activeInput === 'start_time'){
        this.setHours(value, 'start_time');
        if(value && this.serviceScheduleForm.controls['end_time'].value){
          // get rate based on time
          this.getRateBasedOnTime(value, this.serviceScheduleForm.controls['end_time'].value);
          
          //this.checkVacantEmployee();
        }
      }
    });

    this.serviceScheduleForm.controls['end_time'].valueChanges
    .subscribe((value) => {
      if(this.activeInput === 'end_time'){
        this.setHours(value, 'end_time');
        if(value && this.serviceScheduleForm.controls['start_time'].value){
          this.getRateBasedOnTime(this.serviceScheduleForm.controls['start_time'].value, value);
          
          //this.checkVacantEmployee();
        }
      }
    });

    /*this.serviceScheduleForm.controls['total_hours'].valueChanges
    .subscribe((value) => {
      console.log("CALCULATING TOTAL")

      if(this.activeInput === 'total_hours'){
        console.log("CALCULATING")

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
          let newEndDate = addHours(new Date(this.serviceScheduleForm.controls['start_date'].value), (totalHours * 1));
          this.serviceScheduleForm.controls['end_date'].setValue(newEndDate);
        }
      }

      if(value){
        this.serviceScheduleForm.controls['total_hours'].setValue(value + 12);
      }
    });*/
  }

  getRateBasedOnTime(start_time_val: any, end_time_val: any){
    let start_time = start_time_val?.replace(':', '') * 1;
    let end_time = end_time_val?.replace(':', '') * 1;
    let pricelist = this.serviceScheduleForm.controls['price_list_id'].value;
    let selectedPriceList = [...this.priceListEnumFilter].find(el => el.id == pricelist);
    let total_hours = this.serviceScheduleForm.controls['total_hours'].value * 1;
    let is_overnight = this.serviceScheduleForm.controls['is_overnight'].value
    const setRateValues = (shift_rate: string, rate: any) => {
      this.serviceScheduleForm.controls['shift_rate'].setValue(shift_rate);
      this.serviceScheduleForm.controls['support_item_number'].setValue(selectedPriceList[`${rate}_code`] || selectedPriceList?.standard_rate_code);
      this.serviceScheduleForm.controls['editable_rate_value'].setValue(selectedPriceList[`${rate}`] || selectedPriceList?.standard_rate);
     
      let support_item = this.serviceScheduleForm.controls['price_list_id'].value;
      let rate_value = this.serviceScheduleForm.controls['editable_rate_value'].value;
      
      if(support_item && (!rate_value)){
        this.disableRate = false;
      }

      else this.disableRate = true;
    }

    // if from start shift
    if(this.serviceScheduleForm.controls['a_h_calculator'].value === 'Shift Start' && selectedPriceList){
      if((start_time >= 600 || start_time <= 1559) && (end_time <= 2000 || total_hours >= 6) && !is_overnight){
        console.log("MORNING")
        setRateValues('Standard Rate', 'standard_rate');
      }

      else if((start_time >= 1600 || start_time < 2000) && (end_time <= 2000 || total_hours >= 4) && !is_overnight){
        console.log("Afternoon")
        setRateValues('Afternoon Rate', 'afternoon_rate');
      }

      else if((start_time >= 1900 && end_time >= 1900) && (end_time <= 2100 && total_hours <= 4) && !is_overnight){
        console.log("EVENING")
        setRateValues('Evening Rate', 'evening_rate');
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time <= 2359 && !is_overnight){
        console.log("EVENING")
        setRateValues('Evening Rate', 'evening_rate');
      }

      // else if((start_time >= 2200 || start_time < 600) && end_time <= 800 && (start_time > end_time)){
      else if((start_time >= 600 && end_time < 2359) && is_overnight){
        console.log("Night")
        setRateValues('Night Rate', 'night_rate');
      }
    }

    else if((this.serviceScheduleForm.controls['a_h_calculator'].value === 'Shift End' ||  this.serviceScheduleForm.controls['a_h_calculator'].value === 'Highest Rate' && selectedPriceList)){
      if(start_time >= 600 && start_time <= 1559 && (end_time <= 1800)){
        //console.log("MORNING")
        setRateValues('Standard Rate', 'standard_rate');
      }

      else if(start_time >= 600 && start_time <= 1559 && (end_time <= 2000 || total_hours >= 6)){
        //console.log("Afternoon")
        setRateValues('Afternoon Rate', 'afternoon_rate');
      }

      else if(start_time >= 1600 && start_time <= 2000 && end_time < 2000){
        //console.log("Afternoon")
        setRateValues('Afternoon Rate', 'afternoon_rate');
      }

      else if(start_time >= 1600 && start_time <= 2000 && end_time === 2000){
        //console.log("EVENING")
        setRateValues('Evening Rate', 'evening_rate');
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time < 2359){
        //console.log("EVENING")
        setRateValues('Evening Rate', 'evening_rate');
      }

      else if(start_time >= 2000 && end_time >= 2000 && end_time === 2359){
        //console.log("Night")
        setRateValues('Night Rate', 'night_rate');
      }

      else if((start_time >= 600 && end_time < 2359) && (start_time > end_time)){
        //console.log("Night")
        setRateValues('Night Rate', 'night_rate');
      }
    }

    if(selectedPriceList){
      let emittedData = {
        price_list: selectedPriceList,  
        shift_rate: this.serviceScheduleForm.controls['shift_rate'].value
      }

      this.selectedPricelistDetails.emit(emittedData);
    }
  }

  /*
    Recalculate costs
  */
  recalculateCost(){
    let support_item = this.serviceScheduleForm.controls['price_list_id'].value;
    let selectedPriceList = [...this.priceListEnumFilter].find(el => el.id == support_item); 
    let rateType = selectedPriceList?.service_type[0]?.unit;

    /* Calcualtion item */
    let chargeRate =  this.serviceScheduleForm.controls['editable_rate_value'].value * 1;
    let total_hour = this.serviceScheduleForm.controls['total_hours'].value;
    let subPrice = total_hour * chargeRate;  
    let totalPrice = 0;

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

    if(totalPrice){
      let travel_total = this.serviceScheduleForm.controls['travel_total'].value * 1 || 0;
      let main_total = Math.round((travel_total + totalPrice) * 100) / 100;

      this.serviceScheduleForm.controls['client_total'].setValue(main_total);
      this.serviceScheduleForm.controls['calculated_cost'].setValue(totalPrice);
      this.serviceScheduleForm.controls['rate_type'].setValue(rateType?.split(/(?=[A-Z])/g).join(' '));
    }
  }

  /* HOURS FUNCTIONS */
  activeFocus(event, inputFocus){
    this.activeInput = inputFocus;
  }

  convertTo24Hour(amPmString) { 
    let d = new Date("1/1/2013 " + amPmString); 
    return d.getHours() + ':' + d.getMinutes(); 
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
    let endDateMain = this.serviceScheduleForm.controls['start_date'].value;

    let startDate = `${new Date(startDateMain).toDateString()} ${startTime}`;
    let endDate = `${new Date(endDateMain).toDateString()} ${endTime}`;

    if (startDate > endDate) {
      endDate = `${this.add24Hours(endDate)} ${endTime}`;
      this.serviceScheduleForm.get('is_overnight').setValue(true)
      const newEndDate = this.endTimeOvernight(startTime, endTime, endDate)
      this.serviceScheduleForm.get('end_date').setValue(startDateMain)
    }
    else{
      this.serviceScheduleForm.get('end_date').setValue(startDateMain)

      this.serviceScheduleForm.get('is_overnight').setValue(false)
    }
    
    const timestamp = (date) => Date.parse(date);

    // check if start date and end date is valid
    if (!isNaN(timestamp(startDate)) && !isNaN(timestamp(endDate)) && value) {
      // let formatStartDate = parseISO(formatISO(new Date(startDate)));
      // let formatEndDate = parseISO(formatISO(new Date(endDate)))
      // let total_hours = differenceInMinutes(formatEndDate, formatStartDate);
      let total_hours = this.calculateTotalHours(startDate, endDate) 


      if(total_hours) {
        // let calculatedTotalHours = Math.abs(Math.round((total_hours/60)*100)/100);
        this.serviceScheduleForm.controls['total_hours'].setValue(total_hours/* > 12 ? calculatedTotalHours - 12 : calculatedTotalHours*/);
      }

      return;
    }

    else {
      console.log("SYSTEM CLOCK ERROR: PLEASE FIX YOUR SYSTEM CLOCK")
    }
  }

  private endTimeOvernight (start_time, end_time, end_date) {
    let newEndDate = new Date(end_date)
    return newEndDate
  }

  calculateTotalHours(startTime, endTime): number {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const totalHours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
    return totalHours;
  }

  private add24Hours(date:any){

    let formattingEndDate = new Date(date);
    let newEndTime = new Date(formattingEndDate.getTime() + 24 * 60 * 60 * 1000)
    let endDate = new Date(newEndTime).toLocaleDateString();

    return endDate
  }

  addMultipleHours(h, date, start_time) {
    let dateTime = `${new Date(date).toLocaleDateString()} ${start_time}`
    let returnDate = addHours(new Date(`${dateTime}`), h);
    return returnDate.toTimeString();
  }

  setGroupClients(event){
    if(event){
      let selectedGroup = this.groupEnums.find(el => el.id == event);
      
      // set client list
      this.groupClients = [];

      selectedGroup?.group_member.forEach((el) => {
        this.groupClients.push(el?.client[0])
      });
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
          client_added: [...this.clientTableData]//.map(el => el.id)
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
          //client_funding_id: result?.client_funding?.id
        }

        this.clientTableData.push(data);
        this.groupClientData.push(groupClientObj);
        this.group_service_schedule_client.emit({
          add: [...this.groupClientData]
        });
      }
    })
  }

  deleteClientModal(index: number){
    this.clientTableData.splice(index, 1);
    this.groupClientData.splice(index, 1);
    this.group_service_schedule_client.emit({
      add: [...this.groupClientData]
    });
  }

  onChangeCheckbox(ret:any, index){
    const recurring_every = this.serviceScheduleForm.get('recurring_every') as FormArray;
    if(ret.checked){
      this.checkBoxOptions[index].checked = ret.checked;
      recurring_every.push(new FormControl(ret.value))
    } else {
      const i = recurring_every.controls.findIndex(x => x.value === ret.value);
      this.checkBoxOptions[index].checked = false;
      recurring_every.removeAt(i);
    }
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

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

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit, OnDestroy {
  @Input() data;
  @Input() serviceScheduleForm!: FormGroup;
  @Input() hourForm!: FormGroup;
  @Input() clientTotalForm!: FormGroup;

  private enum$: any;  
  private clientReq: Subscription;
  private clientFundingReq: Subscription;
  private priceListReq: Subscription;
  private serviceTypeReq: Subscription;

  clientEnum: any = [];
  clientFundingEnum: any = [];
  servicecTypeEnum: any = [];
  priceListEnum: any = [];

  clientLoading: boolean = false;
  serviceTypeLoading: boolean = false;
  priceListLoading: boolean = false;

  public dateNow: Date = new Date();
  public activeInput: string = '';

  public minTime: any = "12:00 am"
  public maxTime: any = "11:59 pm"

  public type: any[] =["Individual", "Group", "Group/Individual"];
  public ahCalculation: any[] = ["Shift Start", "Shift End", "Split Shift", "Highest Rate"];
  public status: any[] = ["Setup", "Scheduled", "Created", "Pending", "Cancelled", "Completed"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];


  constructor(
    private adminEnumStore: Store<AdminProfileState>
  ) { 
    console.log("DATA", this.data)
  }

  ngOnDestroy(): void {
    console.log(this.hourForm.value);
  }

  ngOnInit(): void {

    
  }
}

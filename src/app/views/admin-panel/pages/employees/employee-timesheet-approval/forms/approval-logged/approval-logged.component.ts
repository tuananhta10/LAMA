import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-approval-logged',
  templateUrl: './approval-logged.component.html',
  styleUrls: ['./approval-logged.component.scss']
})
export class ApprovalLoggedComponent implements OnInit {

  @Input() data: any;
  @Input() timeLoggedForm!: FormGroup; 
  @Input() isReadOnly: boolean = true;
  constructor() { }

  public dateNow: Date = new Date();
  public activeInput: string = '';

  ngOnInit(): void {

  }

  activeFocus(event, inputFocus){
    this.activeInput = inputFocus;
  }


  addMultipleHours(h, date, start_time) {
    let dateTime = `${new Date(date).toLocaleDateString()} ${start_time}`
    let returnDate = addHours(new Date(`${dateTime}`), h);
    return returnDate.toTimeString();
  }

}

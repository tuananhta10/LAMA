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
    this.timeLoggedForm.controls['start_time'].valueChanges
    .subscribe((value) => {
      //console.log(value)
      if(this.activeInput === 'start_time')
        this.setHours(value, 'start_time');
    });

    this.timeLoggedForm.controls['end_time'].valueChanges
    .subscribe((value) => {
      if(this.activeInput === 'end_time')
        this.setHours(value, 'end_time');
    });

    this.timeLoggedForm.controls['total_hours'].valueChanges
    .subscribe((value) => {
      if(this.activeInput === 'total_hours'){
        let totalHours = value;
        let startDate = this.timeLoggedForm.controls['start_date'].value;
        let startTime = this.timeLoggedForm.controls['start_time'].value;
        let dateTime = `${new Date(startDate).toLocaleDateString()} ${startTime}`
        let startTimeAdd = addHours(new Date(`${dateTime}`), 1).toTimeString();
        let endTime = this.addMultipleHours(
          totalHours * 1, 
          this.timeLoggedForm.controls['end_date'].value, 
          startTime
        );

        let endDate = addHours(new Date(`${startDate}`), totalHours * 1).toTimeString();

        endTime = endTime.split(':').slice(0,2).join(':');
        this.timeLoggedForm.controls['end_time'].setValue(startTime);
        this.timeLoggedForm.controls['end_time'].setValue(endTime);

        if(totalHours * 1 >= 24){
          //this.activeInput = null;
          let newEndDate = addHours(new Date(this.timeLoggedForm.controls['start_date'].value), (totalHours * 1));
          this.timeLoggedForm.controls['end_date'].setValue(newEndDate);
        }
      }
    });
  }

  activeFocus(event, inputFocus){
    this.activeInput = inputFocus;
  }

  setHours(value, from): void{
    let startTime;
    let endTime;

    if(from === 'start_time'){
      startTime = value;
      endTime = this.timeLoggedForm.controls['end_time'].value;
    }

    else if(from === 'end_time'){
      startTime = this.timeLoggedForm.controls['start_time'].value;
      endTime = value;
    }

    let startDateMain = this.timeLoggedForm.controls['start_date'].value;
    let endDateMain = this.timeLoggedForm.controls['end_date'].value;

    let startDate = `${new Date(startDateMain).toLocaleDateString()} ${startTime}`;
    let endDate = `${new Date(endDateMain).toLocaleDateString()} ${endTime}`;
    
    const timestamp = (date) => Date.parse(date);

    if (!isNaN(timestamp(startDate)) && !isNaN(timestamp(endDate)) && value) {
      let total_hours = differenceInHours(new Date(endDate), new Date(startDate))

      if(total_hours) 
        this.timeLoggedForm.controls['total_hours'].setValue(total_hours);

      return;
    }
  }


  setEndDateFromHours(value, from): void { 
    switch(true){
      // if start date changed
      case (value && from === 'start_date' && this.activeInput !== 'total_hours'): {
        if(!this.timeLoggedForm.controls['end_date'].value){
          this.timeLoggedForm.controls['end_date'].setValue(value);
        }

        if(!this.data 
          && !this.timeLoggedForm.controls['start_time'].value 
          && !this.timeLoggedForm.controls['end_time'].value){
          this.timeLoggedForm.controls['start_time'].setValue('07:00');
          this.timeLoggedForm.controls['end_time'].setValue('08:00');
        }

        let startTime = this.timeLoggedForm.controls['start_time'].value;
        let startDate = `${new Date(value).toLocaleDateString()} ${startTime}`;
        let endTime = this.timeLoggedForm.controls['end_time'].value;
        let endDate = `${new Date(value).toLocaleDateString()} ${endTime}`;

        this.activeInput = 'start_date';
        this.timeLoggedForm.controls['total_hours'].setValue(
          differenceInHours(new Date(endDate), new Date(startDate))
        );

        break;
      }

      // if end date change
      case (value && from === 'end_date' && this.activeInput !== 'total_hours'): {
        let startTime = this.timeLoggedForm.controls['start_time'].value;
        let startDateMain = this.timeLoggedForm.controls['start_date'].value;
        let startDate = `${new Date(startDateMain).toLocaleDateString()} ${startTime}`;
        let endTime = this.timeLoggedForm.controls['end_time'].value;
        let endDate = `${new Date(value).toLocaleDateString()} ${endTime}`;

        this.activeInput = 'end_date';
        this.timeLoggedForm.controls['total_hours'].setValue(
          differenceInHours(new Date(endDate), new Date(startDate))
        );

        break;
      }
    }
  }

  addMultipleHours(h, date, start_time) {
    let dateTime = `${new Date(date).toLocaleDateString()} ${start_time}`
    let returnDate = addHours(new Date(`${dateTime}`), h);
    return returnDate.toTimeString();
  }

}

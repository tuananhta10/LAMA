import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'admin-branch-travel-setup',
  templateUrl: './branch-travel-setup.component.html',
  styleUrls: ['./branch-travel-setup.component.scss']
})
export class BranchTravelSetupComponent  {

  @Input() travelSetupForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public travelTime: string[] = ["Adjustment", "Annual Leave Loading", "Annual Leave Pay", "AS Car Allowance", "Back Pay", "Base Hourly", "Base Hourly Lvl 1 - PM", "Base Hourly Lvl 1 - PUB HOL"];

  constructor() {
  }

  ngOnDestroy(){
    this.isValid.emit({formStep: 2, isValid: this.travelSetupForm.valid})
  }
}

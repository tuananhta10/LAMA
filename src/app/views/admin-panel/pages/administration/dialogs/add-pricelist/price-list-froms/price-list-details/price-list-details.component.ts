import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-price-list-details',
  templateUrl: './price-list-details.component.html',
  styleUrls: ['./price-list-details.component.scss']
})
export class PriceListDetailsComponent  { 

  @Input() priceListForm!: FormGroup;
  @Input() data: any;
  nameOptions: any[] = ["Type 1"];
  typeOptions: any[] = ["Charge Rates", "Pay Rates"];


  constructor() {
  }

}

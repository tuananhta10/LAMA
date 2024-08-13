import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'client-service-schedule-service-travel',
  animations: [mainAnimations],
  templateUrl: './service-travel.component.html',
  styleUrls: ['./service-travel.component.scss']
})
export class ServiceTravelComponent implements OnInit {
  @Input() serviceTravelForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();

  public chargeTravelOption = ["No", "Yes, Add to Service Hours", "Yes, Invoice Separately"];
  public dateNow: Date = new Date()
  constructor() {
  }

  ngOnInit(): void {
  }

}

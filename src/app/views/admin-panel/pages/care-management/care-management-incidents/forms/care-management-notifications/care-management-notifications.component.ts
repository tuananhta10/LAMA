import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-care-management-notifications',
  templateUrl: './care-management-notifications.component.html',
  styleUrls: ['./care-management-notifications.component.scss']
})
export class CareManagementNotificationsComponent implements OnInit {

  @Input() notificationForm!: FormGroup;

  public status: any[] = ["Setup"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  constructor() { }

  ngOnInit(): void {
  }

  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnDestroy(): void {
    this.isValid.emit({formStep: 3, isValid: this.notificationForm.valid})
  }
}

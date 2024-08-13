import { Component, Input, OnInit } from '@angular/core';
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
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-care-management-details',
  templateUrl: './care-management-details.component.html',
  styleUrls: ['./care-management-details.component.scss']
})
export class CareManagementDetailsComponent implements OnInit {

  @Input() detailsForm!: FormGroup;

  public status: any[] = ["Open", "Resolved", "Undecided", "Withdrawn", "Referred", "No Actions Required"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  constructor() { }

  ngOnInit(): void {
  }

}

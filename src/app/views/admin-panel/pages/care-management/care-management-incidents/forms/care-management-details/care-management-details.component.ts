import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnDestroy(): void {
    this.isValid.emit({formStep: 2, isValid: this.detailsForm.valid})
  }

}

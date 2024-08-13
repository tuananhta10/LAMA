import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { Subscription } from 'rxjs';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';

@Component({
  selector: 'app-care-management-actions-taken',
  templateUrl: './care-management-actions-taken.component.html',
  styleUrls: ['./care-management-actions-taken.component.scss']
})
export class CareManagementActionsTakenComponent implements OnInit {

  @Input() actionsTakenForm!: FormGroup;

  public type: string[] =["Incident", "Accident", "Complain", "Suggestion", "Medical Incident", "Near Miss", "Medical Refusal", "Unauthorized Restrictive Practices", "Authorized Restrictive Practices"];
  public severity: string[] = ["Insignificant", "Minor", "Moderate", "Major", "Extreme"];
  
  public supportCoordinationProvider: any[] = [
    {
      id: 1,  
      name: "Improved Daily Living Skills - Future Physio",  
    },

    {
      id: 2,  
      name: "Integra WA"
    }
  ]

  public priceList: any[] = [
    {
      id: 1,  
      name: "NDIS Metro",  
    },

    {
      id: 2,  
      name: "NDIS Remote"
    }
  ]

  public serviceType: any[] = [
    {
      id: 1,  
      name: "Access Community, Social and Rec Activities"
    },  
    {
      id: 2,  
      name: "Access Based Transport"
    }
  ];
  public ahCalculation: any[] = ["Shift Start", "Shift End", "Split Shift", "Highest Rate"];
  public status: any[] = ["Setup"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  private reqClient: Subscription;
  private reqEmployee: Subscription;
  enum$: any;
  employeeEnums: any;
  clientEnums: any;
  clientLoading: boolean = false;
  employeeLoading: boolean = false;
  
  constructor(
    private enumStore: Store<EmployeeListState>,) { }

  ngOnInit(): void {
    this.subscribeEnum();
    this.enumStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });

    this.enumStore.dispatch({
      type: ClientListActionTypes.GET_CLIENT_LIST
    });
  }

  subscribeEnum(){
    this.enum$ = this.enumStore.pipe(select(state => state));
    this.reqEmployee = this.enum$.subscribe((results: any) => {
      this.employeeLoading = results.employees.employeeListPending;
      if(results?.employees.employeeList.length > 0){
        results.employees.employeeList.forEach(element => {
          results.employees.employeeList.name = element.last_name + ", " +  element.first_name;
        });
      }
      this.employeeEnums = results.employees.employeeList;
    })

    this.reqClient = this.enum$.subscribe((results: any) => {
      this.clientLoading = results.client.clientListPending;
      if(results?.clients.clientList.length > 0){
        results.clients.clientList.forEach(element => {
          results.clients.clientList.name = element.last_name + ", " +  element.first_name;
        });
      }
      this.clientEnums = results.clients.clientList;
    })
  }

  resetAssignedTo(event): void{
    if(!event) this.actionsTakenForm.controls['assigned_to'].setValue(undefined);
  }
}

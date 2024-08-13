import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';

@Component({
  selector: 'app-employee-details',
  animations: [mainAnimations],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  public loading: boolean = true;
  public employeeData: any;
  private req: Subscription;
  private employeesData$: any;

  constructor(private employeeListStore: Store<EmployeeListState>,
    private route: ActivatedRoute) {

    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }


  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }


  // employee details
  getEmployeeDetails(): void{
    // action type to be executed
    let action_type = [
      EmployeeListActionTypes.GET_EMPLOYEE_LIST,
      EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST,
    ];

    // Loop to all action types
    action_type.forEach((item: any) => this.employeeListStore.dispatch({ type: item }));

    setTimeout(() => this.loading = false, 1500);
  }
}

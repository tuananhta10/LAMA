import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { select, Store } from '@ngrx/store';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'employee-leave-period',
  templateUrl: './leave-period.component.html',
  styleUrls: ['./leave-period.component.scss']
})
export class LeavePeriodComponent implements OnInit {
  @Input() leavePeriodForm!: FormGroup;

  public leaveReason: string[] = ["Unpaid Leave", "Annual Leave", "Personal Leave", "Long Service Leave", "Maternity Leave", "Worker Comp"];
  public statusOptions: any[] = ["Pending", "Accepted", "Rejected"];

  private reqEmployee: Subscription;

  enum$: any;
  employeeEnums: any;
  loading: any = false;

  constructor(private enumStore: Store<EmployeeListState>,) { }

  ngOnInit(): void {
    this.subscribeEnum();
    this.enumStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
  }

  subscribeEnum(){
    this.enum$ = this.enumStore.pipe(select(state => state));
    this.reqEmployee = this.enum$.subscribe((results: any) => {
      this.loading = results.employees.employeeListPending;
      if(results?.employees.employeeList.length > 0){
        results.employees.employeeList.forEach(element => {
          results.employees.employeeList.name = element.last_name + ", " +  element.first_name;
        });
      }
      this.employeeEnums = results.employees.employeeList;
    })
  }

}

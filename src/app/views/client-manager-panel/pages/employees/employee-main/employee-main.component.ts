import { Component, OnDestroy, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
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
  selector: 'app-employee-main',
  animations: [mainAnimations],
  templateUrl: './employee-main.component.html',
  styleUrls: ['./employee-main.component.scss']
})
export class EmployeeMainComponent implements OnInit {
  public loading: boolean = true;
  public employeeList: any[] = [];
  public liveFeeds: any[] = [];
  public hideBanner: boolean = true;
  
  private req: Subscription;
  private employeesData$: any;

  constructor(private employeeListStore: Store<EmployeeListState>) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.getEmployeeData();


  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // employee list data
  getEmployeeData(){
    this.employeeListStore.dispatch({ type:  EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED })

    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      if(results){
        
        setTimeout(() => {
          this.loading = false;
          // from ngrx store
          this.liveFeeds = results?.employees.employeeLiveFeed;
        }, 2000);
      }
    });
  }
}

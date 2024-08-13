import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
import { 
  displayedColumns,
  TableHeader,
  AvailableShift,
  selectedColumns,
  availableShiftList 
} from '../../utils/available-shift-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEmployeeShiftComponent } from '../../../employee-shift/dialogs/add-employee-shift/add-employee-shift.component';

@Component({
  selector: 'employee-available-shift',
  animations: [mainAnimations],
  templateUrl: './available-shift.component.html',
  styleUrls: ['./available-shift.component.scss']
})
export class AvailableShiftComponent implements OnInit {
  private employeesData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public availableShiftList: AvailableShift[] = availableShiftList;
  public selectedColumns: string[] = selectedColumns;
  public employeeData: any = {};
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      name: el.name, 
      type: el.type, 
      work_schedule: el.work_schedule,
      employee: el.employee, 
      status: el.status, 
      week_day: el.week_day, 
      start_day: el.start_day,
      time_from: el.time_from,
      time_to: el.time_to,
      total_hours: el.total_hours,
      group: el.group,
    };
  }

  constructor(private employeeListStore: Store<EmployeeListState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      console.log("RESULT")

      if(results){
        // from ngrx store
        this.employeeData = results?.employees.employeeList.find(el => el?.id ==  this.id);

        if(this.employeeData){
          this.availableShiftList = this.availableShiftList.map((el: AvailableShift) => {
            el["employee"] = `${this.employeeData.first_name} ${this.employeeData.last_name}`;

            return el;
          });

          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  openAddShift(){
    let addShiftDialog = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '50vw',
        maxHeight: '95vh',
        data: {
        },
      }
    );

    addShiftDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}

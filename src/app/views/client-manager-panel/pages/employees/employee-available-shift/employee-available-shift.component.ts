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
  EmployeeShift,
  selectedColumns,
  employeeShiftList 
} from './utils/available-shift-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEmployeeShiftComponent } from '../employee-shift/dialogs/add-employee-shift/add-employee-shift.component';

@Component({
  selector: 'app-employee-available-shift',
  animations: [mainAnimations],
  templateUrl: './employee-available-shift.component.html',
  styleUrls: ['./employee-available-shift.component.scss']
})
export class EmployeeAvailableShiftComponent implements OnInit {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public employeeShiftList: EmployeeShift[] = [];

  public selectedColumns: string[] = selectedColumns
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

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  openAddShift(){
    let addShiftDialog = this.dialog.open(
      AddEmployeeShiftComponent,
      { 
        minWidth: '53vw',
        maxWidth: '90vw',
        maxHeight: '96vh',
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

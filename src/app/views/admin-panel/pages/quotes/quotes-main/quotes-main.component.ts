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
  EmployeeTask,
  selectedColumns,
  employeeTaskList 
} from './utils/enquiry-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEnquiryComponent } from './dialogs/add-enquiry/add-enquiry.component';

@Component({
  selector: 'app-quotes-main',
  animations: [mainAnimations],
  templateUrl: './quotes-main.component.html',
  styleUrls: ['./quotes-main.component.scss']
})
export class QuotesMainComponent implements OnInit {

  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public employeeTaskList: EmployeeTask[] = employeeTaskList;
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      first_name: el.first_name,  
      last_name: el.last_name,
      email_address: el.email_address,
      phone: el.phone,
      funding_source: el.funding_source,
      source: el.source,
      suburb: el.suburb,
      approval_stage: el.approval_stage,
      created_date: el.created_date,  
      follow_up_date: el.follow_up_date,  
      total_amount: el.total_amount,  
      total_hours: el.total_hours,  
      branch: el.branch,
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

  openAddTask(){
    let addTaskDialog = this.dialog.open(
      AddEnquiryComponent,
      { 
        minWidth: '30vw',
        data: {
        },
      }
    );

    addTaskDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
    });
  }


}

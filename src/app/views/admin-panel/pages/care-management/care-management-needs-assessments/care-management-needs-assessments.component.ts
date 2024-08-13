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
  needsAssessmentsList,
  selectedColumns,
  NeedsAssessments 
} from './utils/needs-assessment-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddAssessmentComponent } from './dialogs/add-assessment/add-assessment.component';

@Component({
  selector: 'app-care-management-needs-assessments',
  animations: [mainAnimations],
  templateUrl: './care-management-needs-assessments.component.html',
  styleUrls: ['./care-management-needs-assessments.component.scss']
})
export class CareManagementNeedsAssessmentsComponent implements OnInit {

  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public needsAssessmentsList: NeedsAssessments[] = needsAssessmentsList;
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
        id: el.id, 
        client: el.client, 
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

  openAddAssessment(){
    let addAssessment = this.dialog.open(
      AddAssessmentComponent,
      { 
        minWidth: '50vw',
        maxHeight: '95vh',
        data: {
        },
      }
    );

    addAssessment
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}

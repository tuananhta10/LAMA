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
  supportList,
  selectedColumns,
  SupportCoordination 
} from './utils/claim-batch-model-interface';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddClaimComponent } from './dialogs/add-claim/add-claim.component';

@Component({
  selector: 'app-care-management-plan-management-claim',
  animations: [mainAnimations],
  templateUrl: './care-management-plan-management-claim.component.html',
  styleUrls: ['./care-management-plan-management-claim.component.scss']
})
export class CareManagementPlanManagementClaimComponent implements OnInit {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public displayedColumns: TableHeader[] = displayedColumns;
  public supportList: SupportCoordination[] = supportList;
  public listView: boolean = true;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
        id: el.id, 
        name: el.name, 
        batch_total: el.batch_total, 
        invoice_count: el.invoice_count, 
        remittance_sent: el.remittance_sent, 
        payment_amount_received: el.payment_amount_received, 
        invoice_with_rejections: el.invoice_with_rejections, 
        created_by: el.created_by,
        status: el.status,
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

  openAddClaim(){
    let addClaim = this.dialog.open(
      AddClaimComponent,
      { 
        minWidth: '50vw',
        maxHeight: '95vh',
        data: {
        },
      }
    );

    addClaim
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }


}

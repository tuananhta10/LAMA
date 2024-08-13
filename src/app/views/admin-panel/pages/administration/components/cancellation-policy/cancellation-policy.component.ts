import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
  Observable,
  forkJoin,
  combineLatest
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  select,
  Store
} from '@ngrx/store';
import {
  displayedColumns,
  TableHeader,
  Policies,
  selectedColumns
} from '../../utils/cancellation-policy-model-interface';
import { AddCancellationPolicyComponent } from '../../dialogs/add-cancellation-policy/add-cancellation-policy.component';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';

import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CancellationPolicyActionTypes } from '@main/views/admin-panel/store/actions/admin-cancellation-policy.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cancellation-policy',
  animations: [mainAnimations],
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.scss']
})
export class CancellationPolicyComponent implements OnInit, OnDestroy {
  private cancellationPolicy$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public cancellationList: Policies[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id,
      change_percentage: el.change_percentage,
      name: el.name
    }
  }

  constructor(private adminCancellationPolicy: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCancellationPolicy()
    this.cancellationPolicy$ = this.adminCancellationPolicy.pipe(select(state => state.cancellationPolicy));

    this.req = this.cancellationPolicy$.subscribe((cancellationPolicy: any) => {
      this.loading = cancellationPolicy.pending;
      if (cancellationPolicy.cancellationPolicyList.length > 0) {
        this.cancellationList = cancellationPolicy.cancellationPolicyList;
      }

      if (cancellationPolicy.success) {
        this.snackBar.open(cancellationPolicy.success, "", {
          duration: 4000,
          panelClass: 'success-snackbar'
        });

        this.adminCancellationPolicy.dispatch({
          type: CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY_SUCCESS,
          payload: { message: null }
        });

        this.adminCancellationPolicy.dispatch({
          type: CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY_SUCCESS,
          payload: { message: null }
        });

        this.getCancellationPolicy();
      }

      if (cancellationPolicy.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        this.adminCancellationPolicy.dispatch({
          type: CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY_FAIL,
          payload: null
        });

        this.adminCancellationPolicy.dispatch({
          type: CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY_FAIL,
          payload: null
        });
      }
    })
  }

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event) {
    if (event) {
      this.openAddCancellation(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog(event) {
    if (event) {
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        {
          minWidth: '30vw',
          data: event?.data,
        }
      );

      deleteDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.data || (result && !result.cancel && event?.data)) {
            this.adminCancellationPolicy.dispatch({
              type: CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY,
              payload: [result?.data || event?.data]
            });
            // after delete refresh store
            //console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }

  openAddCancellation(data?: any) {
    let cancellationPolicyDialog = this.dialog.open(
      AddCancellationPolicyComponent,
      {
        minWidth: '30vw',
        data: data,
      }
    );

    cancellationPolicyDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
  }

  getCancellationPolicy() {
    this.adminCancellationPolicy.dispatch({
      type: CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST
    });
  }

}

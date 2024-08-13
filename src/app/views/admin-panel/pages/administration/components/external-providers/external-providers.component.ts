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
  ExternalProvider,
  selectedColumns
} from '../../utils/external-providers-model-interface';
import { AddExternalProvidersComponent } from '../../dialogs/add-external-providers/add-external-providers.component';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';

import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExternalProviderActionTypes } from '@main/views/admin-panel/store/actions/admin-external-provider.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-external-providers',
  animations: [mainAnimations],
  templateUrl: './external-providers.component.html',
  styleUrls: ['./external-providers.component.scss']
})
export class ExternalProvidersComponent implements OnInit {
  private externalProvider$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public routerUrl: any[] = [];
  public loading: boolean = false;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public externalProviderList: ExternalProvider[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id,
      change_percentage: el.change_percentage,
      full_name: el.full_name,
      type: el.type,
      services_provided: el.services_provided,
      phone: el.phone,
      email: el.email,
    }
  }

  constructor(private adminExternalProvider: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.externalProvider$ = this.adminExternalProvider.pipe(select(state => state));
    this.getExternalProvider();
    this.adminExternalProvider.dispatch({
      type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST
    });

  }

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event) {
    if (event) {
      this.openAddExternalProvider(event?.data);
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
            this.adminExternalProvider.dispatch({
              type: ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER,
              payload: [result?.data.id || event?.data.id]
            });
            // after delete refresh store
            console.log("DATA WILL BE DELETED", (result?.data || event?.data))
          }
        });
    }
  }

  openAddExternalProvider(data?: any) {
    let externalProviderDialog = this.dialog.open(
      AddExternalProvidersComponent,
      {
        minWidth: '45vw',
        data: data,
      }
    );

    externalProviderDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
  }

  getExternalProvider() {
    this.req = this.externalProvider$.subscribe((result: any) => {
      this.loading = result?.externalProvider?.pending;

      console.log(result?.externalProvider)

      if (result?.externalProvider.externalProviderList.length > 0) {
        this.externalProviderList = result?.externalProvider.externalProviderList;
      }


      if (result?.externalProvider.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        this.adminExternalProvider.dispatch({
          type: ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER_FAIL,
          payload: null
        });

        this.adminExternalProvider.dispatch({
          type: ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER_FAIL,
          payload: null
        });
      }
    })
  }

}

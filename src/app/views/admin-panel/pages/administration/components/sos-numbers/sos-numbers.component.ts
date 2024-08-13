import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, forkJoin, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import {
  displayedColumns,
  TableHeader,
  SosNumbers,
  selectedColumns,
  sosNumberList,
} from '../../utils/sos-number-model-interface';
import { AddSosNumbersComponent } from '../../dialogs/add-sos-numbers/add-sos-numbers.component';
import { ViewEmployeePositionComponent } from '../../dialogs/view-employee-position/view-employee-position.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { EmergencyNumberActionTypes } from '@main/views/admin-panel/store/actions/admin-emergencyNumber.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmergencyNumberActionTypes } from '@main/views/admin-panel/store/actions/admin-emergency-number.action';

@Component({
  selector: 'app-sos-numbers',
  animations: [mainAnimations],
  templateUrl: './sos-numbers.component.html',
  styleUrls: ['./sos-numbers.component.scss'],
})
export class SosNumbersComponent implements OnInit {
  private emergencyNumberData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public emergencyNumberList: SosNumbers[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id,
      title: el.title,
      description: el.description,
      phone_number: el?.phone_number
    };
  };

  constructor(
    private adminEmergencyNumber: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getEmergencyNumber();

    this.emergencyNumberData$ = this.adminEmergencyNumber.pipe(
      select((state) => state.emergencyNumber)
    );

    this.req = this.emergencyNumberData$.subscribe((emergencyNumber: any) => {
      this.loading = emergencyNumber.pending;

      if (emergencyNumber.emergencyNumberList.length > 0) {
        this.emergencyNumberList = emergencyNumber.emergencyNumberList;
      }

      if (emergencyNumber.success) {
        this.snackBar.open(emergencyNumber.success, '', {
          duration: 4000,
          panelClass: 'success-snackbar',
        });

        this.adminEmergencyNumber.dispatch({
          type: EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER_SUCCESS,
          payload: { message: null },
        });

        this.adminEmergencyNumber.dispatch({
          type: EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER_SUCCESS,
          payload: { message: null },
        });

        this.getEmergencyNumber();
      }

      if (emergencyNumber.error) {
        this.snackBar.open(
          'Something went wrong please try again later or contact your administrator',
          '',
          {
            duration: 4000,
            panelClass: 'danger-snackbar',
          }
        );

        this.adminEmergencyNumber.dispatch({
          type: EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER_FAIL,
          payload: null,
        });

        this.adminEmergencyNumber.dispatch({
          type: EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER_FAIL,
          payload: null,
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event) {
    if (event) {
      this.openAddSosNumbers(event?.data);
    }
  }

  getEmergencyNumber() {
    this.adminEmergencyNumber.dispatch({
      type: EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST
    }); 
  }

  // delete event emitter
  deleteDataDialog(event) {
    if (event) {
      let deleteDialog = this.dialog.open(DeleteRecordComponent, {
        minWidth: '30vw',
        data: event?.data,
      });

      deleteDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result) => {
          if (result?.data || (result && !result.cancel && event?.data)) {
          this.adminEmergencyNumber.dispatch({
            type: EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER,
            payload: [result?.data.id || event?.data.id]
          });
            // after delete refresh store
            console.log('DATA WILL BE DELETED', result?.data || event?.data);
          }
        });
    }
  }

  openAddSosNumbers(data?: any) {
    let emergencyNumberDialog = this.dialog.open(AddSosNumbersComponent, {
      minWidth: '30vw',
      data: data,
    });

    emergencyNumberDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {});
  }

  viewEmployeeDetail(event) {
    let emergencyNumberDialog = this.dialog.open(ViewEmployeePositionComponent, {
      width: '60vw',
      data: {
        details: event?.data,
      },
    });

    emergencyNumberDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {});
  }
}

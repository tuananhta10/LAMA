import { Component, OnDestroy, OnInit, Input, Inject } from '@angular/core';
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
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { 
  displayedColumns,
  selectedColumns,
  TableHeader
} from './utils/view-generated-claim-schedules-model-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-client-group.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { 
  convertTo12Hrs,
  convertTimestampUtc
} from '@main/shared/utils/date-convert.util';
import { format } from 'date-fns';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';

@Component({
  selector: 'app-view-generated-claim-schedules',
  animations: [mainAnimations],
  templateUrl: './view-generated-claim-schedules.component.html',
  styleUrls: ['./view-generated-claim-schedules.component.scss']
})
export class ViewGeneratedClaimSchedulesComponent implements OnInit,OnDestroy {
  private clientGroupData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public scheduleItems: any[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name
    }
  }
  public _data:any

  constructor(private adminClientGroup: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<ViewGeneratedClaimSchedulesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

    this._data = AdminHelper.deepCopy(this.data)
    console.log('invoice batch items',data)
  }

  ngOnInit(): void {
    
    this._data.invoice_batch.forEach((el) => {
      if(el?.invoice_item){ 
        const items = [...el?.invoice_item];
        items.forEach((el) => {
          el['calendar_schedule'] = `${format(new Date(el['client_service_schedule_approved_start_date'] * 1000), 'EEE - MMM dd,yyyy')}, ${convertTo12Hrs(el['client_service_schedule_approved_start_time'])} - ${convertTo12Hrs(el['client_service_schedule_approved_end_time'])}`
          
          if(el?.client_service_schedule_activity == 'Activity Based Transport' || el?.client_service_schedule_activity.match('travel')){
            let total_hours = el['client_service_schedule_approved_total_hours']
            let unit_price = el['client_service_schedule_approved_support_item_price']
            el['client_service_schedule_approved_total_hours'] = unit_price 
            el['client_service_schedule_approved_support_item_price'] = total_hours
          }

          this.scheduleItems.push(el)
        })
      }
    })

    if(this.scheduleItems) {
      setTimeout(() => this.loading = false, 1000);
    }
  }

  // client_service_schedule_activity

  ngOnDestroy(): void {
    this.data = []
    if(this.req) this.req.unsubscribe();
  }

 




}

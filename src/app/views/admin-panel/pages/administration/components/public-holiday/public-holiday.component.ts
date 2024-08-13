import { Component, OnDestroy, OnInit, Input, AfterViewInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  select,
  Store
} from '@ngrx/store';
import {
  displayedColumns,
  TableHeader,
  PublicHolidays,
  selectedColumns,
  publicHolidayList,
  colors
} from '../../utils/public-holiday-model-interface';
import { AddPublicHolidayComponent } from '../../dialogs/add-public-holiday/add-public-holiday.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { PublicHolidayActionTypes } from '@main/views/admin-panel/store/actions/admin-public-holiday.action';
import { PublicHolidayService } from '@app-shared/services/admin-panel/admin-public-holiday.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { formatDate } from '@angular/common';
import { 
  addDays, 
  addHours, 
  startOfDay, 
  endOfDay,
  toDate 
} from 'date-fns';
import { environment } from 'src/environments/environment';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

declare const gapi: any;

@Component({
  selector: 'admin-public-holiday',
  animations: [mainAnimations],
  templateUrl: './public-holiday.component.html',
  styleUrls: ['./public-holiday.component.scss']
})
export class PublicHolidayComponent implements OnInit, OnDestroy {
  private publicHoliday$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public publicHolidayList: any[] = [];
  public googleHolidayList: any[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = false;
  public searchSource: any = (el) => {
    return {
      id: el.id,
      date: el.date,
      description: el.description,
      bg_color_code: el?.bg_color_code,
      name: el.name,
      state: el.state,
    }
  }
  public colors: any = colors;
  public upcommingHoliday: any[] = [];
  public env: any = environment;

  constructor(private adminPublicHoliday: Store<AdminProfileState>,
    private googleServiceHoliday: PublicHolidayService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {``
    this.publicHoliday$ = this.adminPublicHoliday.pipe(select(state => state.publicHoliday));
    //this.getPublicHoliday();
    this.subscribeToPublicHoliday();
    this.getPublicHoliday()
  }


  // subscribe to local public holiday
  subscribeToPublicHoliday(){
    this.req =  this.publicHoliday$.subscribe((publicHoliday: any) => {
      this.loading = publicHoliday.pending;

      if(publicHoliday.publicHolidayList.length > 0){
        this.publicHolidayList = [...publicHoliday.publicHolidayList].sort((a, b) => new Date(a?.date * 1000)?.getTime() - new Date(b?.date * 1000)?.getTime());
        this.upcommingHoliday  = [...this.publicHolidayList].filter(el => new Date(el?.date * 1000) >= new Date()).sort((a, b) => new Date(a?.date * 1000)?.getTime() - new Date(b?.date * 1000)?.getTime());
      }

      if(publicHoliday.success){
        this.snackBar.open(publicHoliday.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminPublicHoliday.dispatch({
          type: PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY_SUCCESS,
          payload: {message: null}
        });

        this.adminPublicHoliday.dispatch({
          type: PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY_SUCCESS,
          payload: {message: null}
        });

        this.getPublicHoliday();
      }

      if(publicHoliday.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminPublicHoliday.dispatch({
          type: PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY_FAIL,
          payload: null
        });

        this.adminPublicHoliday.dispatch({
          type: PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY_FAIL,
          payload: null
        });
      }
    })
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddPublicHoliday(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog(event){
    if(event){
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
        if(result?.data || (result && !result.cancel && event?.data)){
          this.adminPublicHoliday.dispatch({
            type: PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY,
            payload: [result?.data || event?.data]
          });
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddPublicHoliday(data?: any){
    let createPublicHolidayDialog = this.dialog.open(
      AddPublicHolidayComponent,
      {
        minWidth: '30vw',
        maxWidth: '40vw',
        data: data,
      }
    );

    createPublicHolidayDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  getPublicHoliday(){
    this.adminPublicHoliday.dispatch({
      type: PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST
    });
  }

}

import { Component, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { Store, select } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import moment from 'moment';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';

@Component({
  selector: 'app-main-profile-notes',
  animations: [mainAnimations],
  templateUrl: './main-profile-notes.component.html',
  styleUrls: ['./main-profile-notes.component.scss']
})
export class MainProfileNotesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @Input() notesList:any = {
    schedule: []
  };
  @Input() clientData: any = null;
  @Output() changeDate: EventEmitter<any> = new EventEmitter<any>();

  public cancelledScheduleArray: any[] = [];
  public scheduleArray: any[] = []

  public pageSize: number = 3;
  public currentPage: number = 0;
  public maxPageNum: number = 0;
  public loadingAllNotes: boolean = false;
  public activeTab: number = 0;

  public canPageSize: number = 3;
  public canCurrentPage: number = 0;
  public canMaxPageNum: number = 0;

  public startDate: any ='';
  public endDate:any = '';
  public id;

  private req: Subscription;
  public scheduleBoard$: any;
  public schedReq: Subscription;
  scheduleLoading: boolean = false;

  private currentDate = moment();
  public dateRange: any = {
    start_date: new Date(moment().startOf('month').toString()),  
    end_date: new Date(this.currentDate.endOf('month').toString())
  }

  constructor(private dialog: MatDialog,private route: ActivatedRoute,
    private adminScheduleBoard: Store<AdminProfileState>,) { }

  ngOnInit(): void {
    this.id = this.route.parent.snapshot.params['id'];
    this.scheuduleBoardSub();
    this.getScheduleboard();
  }
  
  ngOnDestroy(): void {
    this.req.unsubscribe();
  }

  scheuduleBoardSub(){
    this.scheduleBoard$ = this.adminScheduleBoard.pipe(select(state => state.scheduleBoard));
    this.req =  this.scheduleBoard$.subscribe((scheduleBoard: any) => {

      this.scheduleLoading = scheduleBoard.pendingSchedule;
      if(scheduleBoard.scheduleBoardList){
        let filteredSchedule: any = scheduleBoard.scheduleBoardList.filter((el:any) => el?.client?.id == this.id);

        if(filteredSchedule.length > 0) {
          let data: any = {
            client: filteredSchedule[0].client,
            schedule: []
          }
          filteredSchedule[0]?.schedule.forEach(element => {
            if(element.length > 0 ){
              element.forEach(res => {
                data.schedule.push(res);
              });
            }
          });

          //data.schedule = data.schedule.reverse();
          this.populateNotes(data);
        }
      }
    });
  }

  getScheduleboard(date? : any){
    let data = date ? {...date} :{...this.dateRange}
    data.start_date = convertTimestampUtc(data.start_date);
    data.end_date = convertTimestampUtc(data.end_date);
    data.content = 'client';
    data.client_id = this.id;
    data.sort = 'desc'
    this.adminScheduleBoard.dispatch({
      type: ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST,
      payload: data,
      grouping: 'client'
    });
  }

  populateNotes(data: any){
    this.scheduleArray =  this.populateSchedules(data ? data : {}, false);
    this.cancelledScheduleArray = this.populateSchedules(data ? data : {}, true)

    this.scheduleArray = this.scheduleArray.reverse();

    if(this.scheduleArray.length > 0){
      this.maxPageNum = this.computeMaxPage(this.scheduleArray)
    }

    if(this.cancelledScheduleArray.length > 0){
      this.canMaxPageNum = this.computeMaxPage(this.cancelledScheduleArray)
    }
  }

  convertTimeStamp(data: any) {
    return new Date(data * 1000).toDateString();
  }

  tabClick(tab) {
    console.log(tab);
    if(tab.index === 0) {
      this.activeTab= tab?.index;
    }
    if(tab.index === 1) {
      this.activeTab= tab?.index;
    }
  }

  onChangeDate(){
    if(this.startDate && this.endDate){
      let data = {
        start_date: new Date(this.startDate.toString()),  
        end_date: new Date(this.endDate.toString())
      }

      this.getScheduleboard(data);
    }
  }

  // openRecordCancellation(){
  //   let createLanguageDialog = this.dialog.open(
  //     RecordCancellationComponent,
  //     { 
  //       minWidth: '35vw',
  //       maxHeight: '93vh',
  //       data: this.notesList,
  //     }
  //   );

  //   createLanguageDialog
  //   .afterClosed()
  //   .pipe(takeUntil(this.unsubscribe$))
  //   .subscribe(result => {

  //   });
  // }

  // openRecordSession(data?: any){
  //   let createLanguageDialog = this.dialog.open(
  //     SessionNoteFormComponent,
  //     { 
  //       minWidth: '55vw',
  //       maxHeight: '93vh',
  //       data: {
  //         client: this.clientData,
  //         grouping: 'Client',
  //       },
  //     }
  //   );

  //   createLanguageDialog
  //   .afterClosed()
  //   .pipe(takeUntil(this.unsubscribe$))
  //   .subscribe(result => {

  //   });
  // }

  // openRecordAdmin(data?: any){
  //   let createLanguageDialog = this.dialog.open(
  //     RecordAdminComponent,
  //     { 
  //       minWidth: '32vw',
  //       maxHeight: '93vh',
  //       data: data,
  //     }
  //   );

  //   createLanguageDialog
  //   .afterClosed()
  //   .pipe(takeUntil(this.unsubscribe$))
  //   .subscribe(result => {

  //   });
  // }

  paginate (array, page_size, page_number) {
    return array.slice(page_number * page_size, page_number * page_size + page_size);
  };

  next() {
    this.currentPage = (this.currentPage + 1) < this.maxPageNum ? this.currentPage + 1: this.currentPage;
  }

  back(){
    this.currentPage = this.currentPage != 0 ? this.currentPage -1 : 0;
  }

  canNext() {
    this.canCurrentPage = (this.canCurrentPage + 1) < this.canMaxPageNum ? this.canCurrentPage + 1: this.canCurrentPage;
  }

  canBack(){
    this.canCurrentPage = this.canCurrentPage != 0 ? this.canCurrentPage -1 : 0;
  }

  computeMaxPage(data: any){
    let maxPage = 0
    maxPage =  Math.ceil(data?.length/this.pageSize)

    return maxPage;
  }

  isNextPossibleCan(): boolean {
    return this.canCurrentPage + 1 === this.canMaxPageNum ? false : true
  }

  isNextPossible(): boolean {
    return this.currentPage + 1 === this.maxPageNum ? false : true
  }


  populateSchedules(data: any, isStatusCancelled: boolean){
    let cancelled: any[] = []
    if(data.hasOwnProperty('schedule')){
      cancelled = data.schedule.filter(function (el) {
        if(isStatusCancelled){
          return el.status == 'cancelled'
        } else {
          return el.status != 'cancelled'
        }
        
      });
    } 
    return cancelled;
  }
}

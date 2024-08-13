import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CdkDragDrop, 
  moveItemInArray, 
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ReferralActionTypes } from '@main/views/admin-panel/store/actions/admin-referral.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest,
  Subject
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { AlertComponent } from '@main/shared/components';
import { 
  debounceTime, 
  distinctUntilChanged, 
  pairwise, 
  takeUntil 
} from 'rxjs/operators';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';

@Component({
  selector: 'app-reusable-grid-referrals',
  animations: [mainAnimations],
  templateUrl: './reusable-grid-referrals.component.html',
  styleUrls: ['./reusable-grid-referrals.component.scss']
})
export class ReusableGridReferralsComponent implements OnInit {
  @Input() componentTitle: string = '';
  @Input() searchSource: any;
  public loading: boolean = true;
  public listDataSource: any[] = []

  private referralData$: any;
  private req: Subscription;
  private referralReq: Subscription;
  private client$: any;
  private unsubscribe$ = new Subject<void>();
  public searchBy: string = '';
  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public dataStatus: any[] = [];

  constructor(private adminReferral: Store<AdminProfileState>,
    private adminClient: Store<AdminProfileState>, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  /*
    Client list table filter
  */
  searchDataSource(): void {
    const listDataSource = [...this.listDataSource]
    .filter(el => {
      let source = this.searchSource(el);

      return JSON.stringify(source).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.categorizeData(listDataSource);
  }

  ngOnInit(): void {
    // subscribe to referrals
    this.subscribeReferral();

    // subscribe to client creation
    this.subscribeClient();
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();
  }

  deleteDataDialog(data){
    if(data){
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: data,
        }
      );

      deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data || (result && !result.cancel && data)){
          this.adminReferral.dispatch({
            type: ReferralActionTypes.DELETE_REFERRAL,
            payload: [result?.data || data]
          }); 

          this.listDataSource = [...this.listDataSource.filter(el => el.id !== data.id)];
          this.categorizeData(this.listDataSource)

          // after delete refresh store
          console.log("DATA WILL BE DELETED", result, event)
        }
      });
    }
  }

  randomize(){
    return Math.floor(Math.random() * 16) + 1
  }

  
  convertDate(dateString: any){
    const convertedDate = new Date(dateString);

    return `${this.months[convertedDate.getMonth()]} ${convertedDate.getDay()}`;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      let containerID = event?.container?.id;
      let status = this.dataStatus.find(el => el.title_sub == containerID)['title'];

      if(status && (status !== 'Onboard Complete' && status !== 'SW Meet & Greet')){
        this.snackBar.open("Save in progress. Please wait...", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });
        this.saveReferralData(event.container.data[event?.currentIndex], status)
      }

      else if(status === 'Onboard Complete'){
        this.openAlertDialog(event.container.data[event?.currentIndex], status);
      }

      else {
        this.snackBar.open("You are not allowed to set the status as 'SW Meet & Greet'", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
      }

      //this.loading = true;
      //console.log(event.container.data[event?.currentIndex], status);
  
    }
  }

  // For saving client
  openAlertDialog(event_data, status){
    let alertDialog = this.dialog.open(
      AlertComponent,
      { 
        maxWidth: '38vw',
        data: {
          title: 'Onboarding Confirmation',
          icon: "warning",
          icon_src: "/assets/images/icons/warning.png",
          details: `Once set as <strong>Onboard Complete</strong>, it will automatically create a new Client.<br><br> Select "Continue" to proceed.`
        },
      }
    );

    alertDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        this.saveReferralData(event_data, status);
        this.saveClientData(event_data);
      }
    });
  }

  // create new client
  saveClientData(client){
    let body = {
      ...client,  
      registration_no: client?.ndis_participant_number,
      fund_type: client?.ndis_funding,
      status: 'Pending',
      title: 'Other',
      gender: 'Other'
    }

    this.snackBar.open("Create new Client in progress. Please wait...", "", {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    this.adminClient.dispatch({
      type: ClientActionTypes.SAVE_CLIENT,
      payload: body
    });
  }

  // subscribe to client
  subscribeClient(){
    this.client$ = this.adminClient.pipe(select(state => state.client));
    this.req =  this.client$.subscribe((client: any) => {
      this.loading = client.pending;
      if(client.success){
        this.snackBar.open("Successfully created new Client.", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminClient.dispatch({
          type: ClientActionTypes.SAVE_CLIENT_SUCCESS,
          payload: {message: null}
        }); 
      }

      if(client.error){
        let message = client?.error?.error?.message?.replace('[Request Error] ', '') ||"Something went wrong please try again later or contact your administrator"

        this.snackBar.open(message, "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminClient.dispatch({
          type: ClientActionTypes.SAVE_CLIENT_FAIL,
          payload: null
        }); 
      }
    })
  }

  // categorize referrals by status
  categorizeData(listDataSource: any[]): void{
    this.dataStatus = [
      { 
        title: 'Referral Received', 
        title_sub: 'referral-received',
        data: [...listDataSource].filter((el: any) => el.status === 'Referral Received') 
      },
      { 
        title: 'Contact Made', 
        title_sub: 'contact-made',
        data: [...listDataSource].filter((el: any) => el.status === 'Contact Made') 
      },
      { 
        title: 'Intake Scheduled', 
        title_sub: 'intake-scheduled',
        data: [...listDataSource].filter((el: any) => el.status === 'Intake Scheduled')
      },
      { 
        title: 'Intake Complete', 
        title_sub: 'intake-complete',
        data: [...listDataSource].filter((el: any) => el.status === 'Intake Complete')
      },

      { 
        title: 'Onboard Complete', 
        title_sub: 'onboard-complete',
        data: [...listDataSource].filter((el: any) => el.status === 'Onboard Complete')
      },

      /*{ 
        title: 'SW Meet & Greet', 
        title_sub: 'meet-and-greet',
        data: [...listDataSource].filter((el: any) => el.status === 'SW Meet & Greet')
      },*/
    ];
  }

  // subscribe to referral data
  subscribeReferral(){
    this.referralData$ = this.adminReferral.pipe(select(state => state.referral));

    this.req = this.referralData$.subscribe((results: any) => {
      this.loading = results?.pending;

      if(!results?.pending && results?.referralList.length != 0){
       
        if(this.dataStatus?.length === 0){
          this.listDataSource = results.referralList;
          this.categorizeData(this.listDataSource);
        }
            
      }

      if(results.success){
        this.adminReferral.dispatch({
          type: ReferralActionTypes.SAVE_REFERRAL_SUCCESS,
          payload: {message: null}
        }); 

        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL_SUCCESS,
          payload: {message: null}
        }); 

        this.getReferralData();
      }

      if(results.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminReferral.dispatch({
          type: ReferralActionTypes.SAVE_REFERRAL_FAIL,
          payload: null
        }); 

        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL_FAIL,
          payload: null
        }); 
      }

    })
  }

  // update referrals status
  saveReferralData(referral: any, status: string, complete?: boolean){
    let data = { ...referral }

    data['status'] = status;

    this.adminReferral.dispatch({
      type: ReferralActionTypes.EDIT_REFERRAL,
      payload: data,
      complete: complete,
    });
  }

  // get referrals
  getReferralData(){
    this.adminReferral.dispatch({
      type: ReferralActionTypes.GET_REFERRAL_LIST
    });
  }

  public mouseDown = false;
  public startX: any;
  public scrollLeft: any;
  public slider = document.querySelector<HTMLElement>('.parent');

  startDragging(e, flag, el) {
    if(e.target.classList.contains('parent')){
      this.mouseDown = true;
      this.startX = e.pageX - el.offsetLeft;
      this.scrollLeft = el.scrollLeft;
      console.log(el)
    }
  }

  stopDragging(e, flag) {
    e.stopPropagation();
    e.preventDefault();
    this.mouseDown = false;
  }

  moveEvent(e, el) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.mouseDown) {
      return;
    }
    
    if(this.mouseDown){
      console.log(e);
      const x = e.pageX - el.offsetLeft;
      const scroll = x - this.startX;
      el.scrollLeft = this.scrollLeft - scroll;
    }
  }

}

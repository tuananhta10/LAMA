import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit, 
  ElementRef, 
  Renderer2
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
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { AddCommentsComponent } from '../../dialogs/add-comments/add-comments.component';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-reusable-grid-referrals',
  animations: [mainAnimations, trigger('scrollAnimation', [
      transition('* => scrollLeft', [
        style({ transform: 'translateX(0)' }),
        animate('400ms ease-out', style({ transform: 'translateX(-15%)' }))
      ]),
      transition('* => scrollRight', [
        style({ transform: 'translateX(0)' }),
        animate('400ms ease-out', style({ transform: 'translateX(15%)' }))
      ])
    ])],
  templateUrl: './reusable-grid-referrals.component.html',
  styleUrls: ['./reusable-grid-referrals.component.scss']
})
export class ReusableGridReferralsComponent implements OnInit {
  @Input() componentTitle: string = '';
  @Input() searchSource: any;
  @Input() loading: boolean = true;
  public listDataSource: any[] = []
  public animationState = '';
  private referralData$: any;
  private req: Subscription;
  private referralReq: Subscription;
  private clientReq: Subscription;
  
  private client$: any;
  private unsubscribe$ = new Subject<void>();
  public searchBy: string = '';
  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public dataStatus: any[] = [];
  public mainBranchEnum:any;
  private enum$: any;
  public scroller = {
    left: false,  
    right: true
  }

  @ViewChild('elemt', { static: false }) mainReferralGrid: ElementRef;

  constructor(private adminReferral: Store<AdminProfileState>,
    private adminClient: Store<AdminProfileState>, 
    private adminEnumStore: Store<AdminProfileState>, 
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    public dialog: MatDialog) { 
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
  }

  

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

  public selectedBranch: string = '';

  filterByBranch(branch: string): void {
    this.selectedBranch = branch;

    if(branch){
      const listDataSource = [...this.listDataSource].filter(el => el?.branch_name === branch);

      this.categorizeData(listDataSource);
    }

    else {
      this.categorizeData([...this.listDataSource]);
    }
  }

  ngOnInit(): void {
    // subscribe to referrals
    this.subscribeReferral();  
    this.subscribeBranch();
  }

  subscribeBranch(){
    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_BRANCHES
    });

    // branch list
    this.req = this.enum$.subscribe((results: any) => {
      this.mainBranchEnum = results?.adminEnums.branches;
    });
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();
    if(this.clientReq) this.clientReq.unsubscribe();
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
          //console.log("DATA WILL BE DELETED", result, event)
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
      let containerID = event?.container?.id;
      let status = this.dataStatus.find(el => el.title_sub == containerID)['title'];
      let previousStatus = event.previousContainer.data[event.previousIndex]?.status;
      let proceedTransfer = () => transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      //console.log(event)

      if(previousStatus === 'Onboard Complete'){
        this.snackBar.open("This participant has already been onboarded. You are not allowed to changed his/her status anymore.", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
      }

      else if(status && (status !== 'Onboard Complete' && status !== 'SW Meet & Greet')){
        this.snackBar.open("Save in progress. Please wait...", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });
        proceedTransfer();
        this.saveReferralData(event.container.data[event?.currentIndex], status)
      }

      else if(status === 'Onboard Complete'){
        // subscribe to client creation
        if(!this.clientReq) this.subscribeClient();

        // transfer
        proceedTransfer();

        let alertDialog = this.dialog.open(
          AlertComponent,
          { 
            maxWidth: '38vw',
            data: {
              title: 'Onboarding Confirmation',
              icon: "warning",
              icon_src: "/assets/images/icons/warning.png",
              details: `Once set as <strong>Onboard Complete</strong>, it will automatically create a new Participants.<br><br> Select "Continue" to proceed.`
            },
          }
        );

        alertDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          //console.log(result)
          if(result){
            this.saveReferralData(event.container.data[event?.currentIndex], status);
            this.saveClientData(event.container.data[event?.currentIndex]);
          }

          else {
            //console.log("Move", event.previousContainer.data)

            transferArrayItem(
              event.container.data,
              event.previousContainer.data,
              event.currentIndex,
              event.previousIndex,
            );
          }
        });
      }

      else {
        this.snackBar.open("You are not allowed to set the status as 'SW Meet & Greet'", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
        proceedTransfer();
      }
    }
  }

  referralComments(data){
    let alertDialog = this.dialog.open(
      AddCommentsComponent,
      { 
        maxWidth: '48vw',
        maxHeight: '96vh',
        data: data,
      }
    );

    alertDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      //console.log(result)
      if(result){
      }

      
    });
  }

  // create new client
  saveClientData(client){
    let organization_id: any = JSON.parse(localStorage.getItem('loggedUserData'))['organization_id'];
    
    let body = {
      ...client,  
      registration_no: client?.ndis_participant_number,
      fund_type: client?.ndis_funding,
      status: 'Active',
      title: 'Other',
      gender: 'Other',
      registration_stage: "profile-created",
      organization_id: organization_id
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
    this.clientReq =  this.client$.subscribe((client: any) => {
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

      { 
        title: 'Declined/Not Proceeding', 
        title_sub: 'declined',
        data: [...listDataSource].filter((el: any) => el.status === 'Declined/Not Proceeding')
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

      if(!results?.pending){
        this.listDataSource = results.referralList;
        this.categorizeData(this.listDataSource); 

        setTimeout(() => this.recalculateScroller(), 500)
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

  recalculateScroller(){
    const screenWidth = window?.innerWidth;
    const scrollLeft = this.mainReferralGrid?.nativeElement?.scrollLeft;
    const scrollWidth = this.mainReferralGrid?.nativeElement?.scrollWidth;
    const containerWidth = this.mainReferralGrid?.nativeElement?.offsetWidth;

    if(screenWidth < 1965){
      if (scrollLeft === 0) {
        // Scroll position is at the left edge of the container
        this.scroller = {
          left: false,
          right: true
        };
      } else if (scrollLeft + containerWidth >= scrollWidth) {
        // Scroll position is at the right edge of the container
        this.scroller = {
          left: true,
          right: false
        };
      } else {
        // Scroll position is somewhere in between
        this.scroller = {
          left: true,
          right: true
        };
      }
    }

    else {
      // Scroll position is somewhere in between
      this.scroller = {
        left: false,
        right: false
      };
    }

    console.log(screenWidth, this.mainReferralGrid.nativeElement.scrollLeft) 
  }

  startDragging(e, flag, el) {
    if(e.target.classList.contains('parent')){
      this.mouseDown = true;
      this.startX = e.pageX - el.offsetLeft;
      this.scrollLeft = el.scrollLeft;
    }

    
    this.recalculateScroller();
    
  }

  stopDragging(e, flag) {
    e.stopPropagation();
    e.preventDefault();
    this.mouseDown = false;

    this.recalculateScroller();
  }

  scrollLeftButton() {
    this.animationState = 'scrollRight';
    
    setTimeout(() => {
      this.mainReferralGrid.nativeElement.scrollLeft -= 550;
      this.animationState = '';
      this.recalculateScroller();
    }, 200);
  }

  scrollRightButton() {
    this.animationState = 'scrollLeft';

    setTimeout(() => {
      this.mainReferralGrid.nativeElement.scrollLeft += 550;
      this.animationState = '';
      this.recalculateScroller();
    }, 200);
  }

  moveEvent(e, el) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.mouseDown) {
      return;
    }
    
    if(this.mouseDown){
      const x = e.pageX - el.offsetLeft;
      const scroll = x - this.startX;
      el.scrollLeft = this.scrollLeft - scroll;
    }
  }

}
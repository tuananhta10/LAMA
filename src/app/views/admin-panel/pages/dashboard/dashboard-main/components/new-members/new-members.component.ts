import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { NotificationActionTypes } from '@main/views/admin-panel/store/actions/admin-notification.action';

@Component({
  selector: 'admin-dashboard-new-members',
  templateUrl: './new-members.component.html',
  styleUrls: ['./new-members.component.scss']
})
export class NewMembersComponent implements OnInit {
  @Input() screenWidth: number = 0;
  private notificationData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public defaultImage: string = '/assets/images/icons/user-placeholder.png';
  public searchBy: string = '';
  public notificationList: any[] = [];
  public loading:boolean = false;
  
  constructor(
    private adminNotification: Store<AdminProfileState>
  ) { }

  ngOnInit(): void {
    this.getNotification();
    this.notificationData$ = this.adminNotification.pipe(select(state => state.notification));
    this.req =  this.notificationData$.subscribe((notification: any) => {
      this.loading = notification.pending;
      
      if(notification.notificationList.length > 0){
        this.notificationList = [...notification.notificationList].sort((a, b) => {
          const dateA = a.date_added.toLowerCase();
          const dateB = b.date_added.toLowerCase();
          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;
          return 0;

        });
      }
    })
  }

  /*
    list table filter
  */
  searchNews(): void {
    /*const searchClient = [...this.scheduleBoardListClient].filter(el => {
      return JSON.stringify(el.client)
        .toLowerCase()
        .includes(this.searchBy.toLowerCase());
    });
  */
    
  }

  downloadDocument(type){
    if(type === 'Manual'){
      window.open('src/assets/documents/manual.pdf', '_blank');
    }
  }

  getNotification(){
    this.adminNotification.dispatch({
      type: NotificationActionTypes.GET_NOTIFICATION_LIST
    }); 
  }

  formatDate(notifDate: any){
    let date = new Date(notifDate);
    return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))  + '/' + date.getFullYear()
  }

  getNotifIcon(type: any) {
    let icon = null;
    if(type === 'Employee Leave'){
      icon = '/assets/images/icons/dashboard/date-related.png'
    } else {
      icon = '/assets/images/icons/dashboard/employee-related.png'
    }
    return icon;
  }

  navigateToNDIS(){
    window.location.href = "https://www.ndis.gov.au/providers/pricing-arrangements";
  }
}

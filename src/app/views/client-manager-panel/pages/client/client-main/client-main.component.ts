import { Component, OnDestroy, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
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
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';

@Component({
  selector: 'app-client-main',
  animations: [mainAnimations],
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.scss']
})
export class ClientMainComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public liveFeeds: any[] = [];

  private req: Subscription;
  private liveFeedData$: any;
  public hideBanner: boolean = true;

  constructor(private clientListStore: Store<ClientListState>) {
    this.liveFeedData$ = this.clientListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.getClientLiveFeeds();


  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // client list data
  getClientLiveFeeds(){
    // Loop to all action types
    this.clientListStore.dispatch({ type: ClientListActionTypes.GET_CLIENT_LIVE_FEED });
    // Subscribe to storage
    this.req = this.liveFeedData$.subscribe((results: any) => {
      if(results){
        setTimeout(() => {
          this.loading = false;
          // from ngrx store
          this.liveFeeds = results?.clients.clientLiveFeed;
        }, 2000);
      }
    });
  }
}

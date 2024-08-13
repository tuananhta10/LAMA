import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-client-details',
  animations: [mainAnimations],
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  public loading: boolean = true;
  public clientData: any;
  private req: Subscription;
  private clientsData$: any;

  constructor(private clientListStore: Store<ClientListState>,
    private route: ActivatedRoute) {

    this.clientsData$ = this.clientListStore.pipe(select(state => state));
  }


  ngOnInit(): void {
    this.getClientDetails();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }


  // client details
  getClientDetails(): void{
    // action type to be executed
    let action_type = [
      ClientListActionTypes.GET_CLIENT_LIST,
    ];

    // Loop to all action types
    action_type.forEach((item: any) => this.clientListStore.dispatch({ type: item }));

    setTimeout(() => this.loading = false, 1500);
  }
}

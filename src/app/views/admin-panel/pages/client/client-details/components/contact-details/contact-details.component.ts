import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest,
  Subject ,
} from 'rxjs';
import { takeUntil} from 'rxjs/operators'
import { 
  select, 
  Store 
} from '@ngrx/store';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

@Component({
  selector: 'client-details-contact-details',
  animations: [mainAnimations],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  private clientsData$: any;
  private req: Subscription;
  private client$: any;
  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public pmRequireApproval: boolean = true;
  public indigenous: boolean = false;
  public contactDetails: any = {};

  private unsubscribe$ = new Subject<void>()

  constructor(private clientListStore: Store<ClientListState>,
    private clientStore: Store<AdminProfileState>,
    private router: Router,
    private route: ActivatedRoute) {
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.client$ = this.clientStore.pipe(select(state => state.client));
    this.id = route.parent.snapshot.params['id'];

    console.log(this.id)
  }

  ngOnInit(): void {
    this.getClientDetails();
    
    if(this.id){
      this.subscribeClient();
      this.getClient();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()

  }

  // client details
  getClientDetails(): void{
    // Subscribe to storage
    this.clientsData$.pipe(takeUntil(this.unsubscribe$))
    .subscribe((results: any) => {
      if(results){
        this.clientData = results?.clients.clientList.find(el => el?.id == this.id);

        console.log(this.clientData)
      }
    });
  }

  subscribeClient(){
    let client = this.client$;
    client.pipe(takeUntil(this.unsubscribe$))
    .subscribe((results: any) => {
      console.log("Contact Details", results?.client)
      this.loading = results.pending
      if(results?.client?.contactDetails){
        // debugger
        this.contactDetails = results?.client?.contactDetails;
      }else{
        this.contactDetails = null
      }
    });
  }

  getClient(){
    let clientType = {
      type: 'contact-details',
      id: this.id,
      key: 'contactDetails'
    }
    this.clientStore.dispatch({
      type: ClientActionTypes.GET_CLIENT,
      payload: clientType
    });

    /*let clientDetails = {
      type: 'client-details',
      id: this.id,
      key: 'clientDetail'
    }
    this.clientStore.dispatch({
      type: ClientActionTypes.GET_CLIENT,
      payload: clientDetails
    });*/
  }

  navigateTo(step){
    sessionStorage.setItem('clientFormStep', `${step}`);
    this.router.navigate([`/admin/clients/edit/${this.clientData?.id}`]);

    /*routerLink="/admin/clients/details/{{clientData?.id}}/goals"*/
  }


}

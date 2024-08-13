import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
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
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

interface NavChildLink{
  routerLink: string,
  title: string,
  access: any[]
}

@Component({
  selector: 'client-main-profile',
  animations: [mainAnimations],
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss']
})
export class MainProfileComponent implements OnInit {
  @Input() loading: boolean = true;
  private clientsData$: any;
  private req: Subscription;
  private client$: any;
  public clientData: any = {};
  public id: any = '';
  public childLinks: NavChildLink[] = [];
  public onboardingNotes: any;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  constructor(private clientListStore: Store<ClientListState>,
    private clientStore: Store<AdminProfileState>,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.client$ = this.clientStore.pipe(select(state => state.client));
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getClientDetails();

    if(this.id){
      this.subscribeClient();
      this.getClient();
      this.getClientStats();
    }
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // client details
  getClientDetails(): void{
    // extract id
    this.req = this.route.params.subscribe((params: any) => this.id = params['id']);

    this.childLinks = [
      {
        routerLink: `/staff/clients/details/${this.id}/careworkers`,
        title: 'Support Workers',
        access: ["Admin", "Scheduler"]
      },

      {
        routerLink: `/staff/clients/details/${this.id}/medication`,
        title: 'Medication',
        access: ["Admin", "Scheduler", "Service Facilitator", "Support Coordinator", "Support Worker"]
      },

      {
        routerLink: `/staff/clients/details/${this.id}/service-details`,
        title: 'Service Details',
        access: ['Admin']
      },

      {
        routerLink: `/staff/clients/details/${this.id}/contact-details`,
        title: 'Contact Details',
        access: ["Admin", "Scheduler", "Service Facilitator", "Support Coordinator", "Support Worker"]
      },

      {
        routerLink: `/staff/clients/details/${this.id}/related-documents`,
        title: 'Related Documents',
        access: ["Admin", "Scheduler", "Service Facilitator", "Support Coordinator", "Support Worker"]
      },
    ];
  }

  subscribeClient(){
    let client = this.client$;
    this.req = client?.subscribe((results: any) => {
      //console.log("Onboarding Notes", results?.client)
      this.loading = results?.pending;

      if(results?.client?.profileClientDetails){
        this.clientData = results?.client?.profileClientDetails;

        console.log(this.clientData)

      }
      if(results?.successPassword){
        this.snackBar.open("Successfully changed password!", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.clientStore.dispatch({
          type: ClientActionTypes.EDIT_CLIENT_PASSWORD_SUCCESS,
          payload: {message: null}
        }); 
      }

    });
  }

  getClient(){
    // profile-client-detail
    let clientType = {
      type: 'profile-client-detail',
      id: this.id,
      key: 'profileClientDetails'
    }
    this.clientStore.dispatch({
      type: ClientActionTypes.GET_CLIENT,
      payload: clientType
    });
  }

  getClientStats(){
    let data = {
      id: this.id,
    }
    this.clientStore.dispatch({
      type: ClientActionTypes.GET_CLIENT_STATS,
      payload: data
    });
  }

  checkAccess(access: any){
    let ret = false;
    if(Array.isArray(access)){
      ret = access.includes(this.loggedUser.system_role);
    }
    return ret;
  }


}

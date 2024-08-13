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
  title: string
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

  constructor(private clientListStore: Store<ClientListState>,
    private clientStore: Store<AdminProfileState>,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.client$ = this.clientStore.pipe(select(state => state.client));
    this.id = route.parent.snapshot.params['id'];
  }

  setDate(date){
    return new Date(date)
  }

  ngOnInit(): void {
    this.getClientDetails();

    // check for roles update
    if(sessionStorage.getItem('passwordChange')){
      this.snackBar.open("Successfully updated the access of this participant!", "", {
        duration: 4000,
        panelClass:'success-snackbar'
      });
      sessionStorage.removeItem('passwordChange');
    }

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
        routerLink: `/admin/clients/details/${this.id}/careworkers`,
        title: 'Support Team',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/medication`,
        title: 'Medical/Health',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/service-details`,
        title: 'Service Details',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/contact-details`,
        title: 'Contact Details',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/related-documents`,
        title: 'Related Documents',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/client-notes`,
        title: 'Participant Notes',
      },
    ];
  }

  subscribeClient(){
    let client = this.client$;
    this.req = client?.subscribe((results: any) => {
      this.loading = results?.pending;

      if(results?.client?.profileClientDetails){
        this.clientData = results?.client?.profileClientDetails;
      }
      if(results?.successPassword){
        setTimeout(() => {
          sessionStorage.setItem('passwordChange', "true");
          window.location.reload();
        }, 200);
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



}

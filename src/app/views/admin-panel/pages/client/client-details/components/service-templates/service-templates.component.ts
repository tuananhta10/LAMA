import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'client-service-templates',
  animations: [mainAnimations],
  templateUrl: './service-templates.component.html',
  styleUrls: ['./service-templates.component.scss']
})
export class ServiceTemplatesComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  constructor(private clientListStore: Store<ClientListState>,
    private router: Router,
    private route: ActivatedRoute) {
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getClientDetails();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // client details
  getClientDetails(): void{
    // Subscribe to storage
    this.req = this.clientsData$.subscribe((results: any) => {
      if(results){
        setTimeout(() => {
          this.loading = false;

          // from ngrx store
          this.clientData = results?.clients.clientList.find(el => el?.id == this.id);
          console.log(this.clientData)

          }, 1000);
      }
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest,
  Subject
} from 'rxjs';
import moment from 'moment';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import {
  subDays,
  differenceInCalendarDays  
} from 'date-fns';
import { shortifyAmount } from '@main/shared/utils/short-amount-convert.util';
import { differenceInDays, parseISO, format } from 'date-fns';

@Component({
  selector: 'client-main-profile-stats',
  animations: [mainAnimations],
  templateUrl: './main-profile-stats.component.html',
  styleUrls: ['./main-profile-stats.component.scss']
})
export class MainProfileStatsComponent implements OnInit {
  @Input() id: string = '';
  @Input() clientData: any = {};
  

  private client$: any;
  private clientsData$: any;
  private req: Subscription;
  private currentDate = moment();
  public dateRange: any = {
    start_range: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
    end_range: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
  }

  public clientDataFromList: any = {};
  public onboardingNotes: any;
  public statData: any[] = [
    {
      "title": "Incidents",
      "stat_val": 0,
      "img": "/assets/images/icons/incident-related.png",
      "class": "d-flex me-3 incident",
      "view_more": () => this.router.navigate([`/admin/clients/details/${this.id}/incidents`])
    },

    {
      "title": "Funding Budget",
      "stat_val": '$0',
      "img": "/assets/images/icons/funding-budget.png",
      "class": "d-flex me-3 funding",
      "view_more": () => this.router.navigate([`/admin/clients/details/${this.id}/client-funding`])
    },

    {
      "title": "End of Plan",
      "stat_val": 0 + ' days',
      "img": "/assets/images/icons/end-plan.png",
      "class": "d-flex me-3 end-plan",
      "view_more": () => this.router.navigate([`/admin/clients/details/${this.id}/client-funding`])
    },

    {
      "title": "Support Hours",
      "stat_val": "0 H",
      "img": "/assets/images/icons/support-hours.png",
      "class": "d-flex me-3 support-hours",
      "view_more": () => this.router.navigate([`/admin/clients/details/${this.id}/service-schedule`])
    },

    {
      "title": "Cancellations",
      "stat_val": 0,
      "img": "/assets/images/icons/cancellation.png",
      "class": "d-flex me-3 me-md-0 cancellation",
      "view_more": () => this.router.navigate([`/admin/clients/details/${this.id}/service-schedule/cancelled`])
    },
  ];
  constructor(private router: Router,
    private clientListStore: Store<ClientListState>,
    private clientStore: Store<AdminProfileState>,
    private route: ActivatedRoute,) { 

    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.client$ = this.clientStore.pipe(select(state => state.client));
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log(this.clientData, this.clientDataFromList)
    if(this.id){
      

      //this.getClientStats();
      this.req = this.client$.subscribe((result: any) => {
        let clientStats = result?.clientStats;
        if(clientStats?.length > 0){
          this.statData[0]['stat_val'] = clientStats[0]?.incident_count_total;
          this.statData[1]['stat_val'] = '$' + shortifyAmount(clientStats[0]?.client_funding_sum_total_balance || 0, 1) /*?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")*/;
          
          this.statData[3]['stat_val'] = clientStats[0]?.client_service_schedule_sum_total_hours + 'H';
          this.statData[4]['stat_val'] = clientStats[0]?.client_service_schedule_total_cancel;
        }
      })

      this.req.add(
        this.clientsData$.subscribe((results: any) => {
          if(results && results?.clients.clientList?.length > 0){
            // from ngrx store
            this.clientDataFromList = results?.clients.clientList.find(el => el?.id == this.id);

            let remainingDays = this.calculateRemainingDays(this.clientDataFromList?.ndis_plan_end_date || this.clientDataFromList?.end_service_date, this.clientDataFromList?.ndis_plan_start_date);
            this.statData[2]['stat_val'] = remainingDays//this.subtractDays(clientStats[0]?.client_service_schedule_ndis_plan_end_date);
          }
        })
      ) 
    }
  }

  calculateRemainingDays(end_date, start_date?){
    const startDate = start_date ? new Date(start_date * 1000) : undefined;
    const endDate = new Date(end_date * 1000);
    let currentDate = new Date(); 
    let remainingDays = differenceInDays(endDate, currentDate);

    if(startDate && startDate > currentDate){
      console.log("GREATER THAN", startDate)
      remainingDays = differenceInDays(endDate, startDate);
      console.log(remainingDays)
    }

    if(!end_date) 
      return 0 + ' days';

    return remainingDays + ' days';
  }

  subtractDays(end_date): string{
    if(!end_date) return 0 + ' days';

    let date = new Date(end_date * 1000);
    let currentDate = new Date();
    let output = differenceInCalendarDays (date, currentDate);

    if(output < 0) return 0 + ' days'; 

    return output + ' days'
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }
}

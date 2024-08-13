import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { 
  displayedColumns,
  TableHeader,
  ServiceSchedule,
  selectedColumns,
  serviceScheduleList 
} from '../../utils/service-schedule-model-interface';
import { AddClientServiceScheduleComponent } from '../../dialogs/add-client-service-schedule/add-client-service-schedule.component';
import { ViewServiceScheduleComponent } from '../../dialogs/view-service-schedule/view-service-schedule.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'client-service-schedule',
  animations: [mainAnimations],
  templateUrl: './service-schedule.component.html',
  styleUrls: ['./service-schedule.component.scss']
})
export class ServiceScheduleComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public serviceScheduleList: ServiceSchedule[] = serviceScheduleList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      name:el.name,
      type: el.type,
      employee_name: el.employee_name,
      start_day: el.start_day,
      status: el.status,
      weekday: el.weekday,
      time_from: el.time_from,
      time_to: el.time_to,
      total_hours: el.total_hours,
      group: el.group,
    }
  } 

  constructor(private clientListStore: Store<ClientListState>,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
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

  /* ADD NEW SERVICE SCHEDULE */
  openAddServiceScheduleModal(){
    let createClientDialog = this.dialog.open(
      AddClientServiceScheduleComponent,
      { 
        minWidth: '53vw',
        maxWidth: '90vw',
        data: {
        },
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  /* VIEW SERVICE SCHEDULE */
  viewServiceScheduleModal(event){
    let createClientDialog = this.dialog.open(
      ViewServiceScheduleComponent,
      { 
        width: '60vw',
        data: {
          details: event?.data,
          clientData: this.clientData
        },
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  back(){
    this.location.back();
  }

}

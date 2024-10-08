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
  MedicalHistory,
  selectedColumns,
  medicalHistoryList 
} from '../../utils/medical-history-model-interface';
import { AddMedicalHistoryComponent } from '../../dialogs/add-medical-history/add-medical-history.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'client-medical-history',
  animations: [mainAnimations],
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public medicalHistoryList: MedicalHistory[] = medicalHistoryList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      client_id:el.client_id
    }
  } 

  constructor(private clientListStore: Store<ClientListState>,
    private router: Router,
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

  openAddMedicalHistory(){
    let createClientDialog = this.dialog.open(
      AddMedicalHistoryComponent,
      { 
        maxWidth: '80vw',
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
}

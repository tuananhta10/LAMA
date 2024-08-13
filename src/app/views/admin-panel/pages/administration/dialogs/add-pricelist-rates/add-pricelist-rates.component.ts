import { Component, OnDestroy, OnInit, Input, Inject } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { 
  displayedColumns,
  TableHeader,
  ServiceType,
  selectedColumns,
  serviceTypeList 
} from '../../utils/select-service-types-model-interface';
import { AddServiceTypesComponent } from '../../dialogs/add-service-types/add-service-types.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-pricelist-rates',
  animations: [mainAnimations],
  templateUrl: './add-pricelist-rates.component.html',
  styleUrls: ['./add-pricelist-rates.component.scss']
})
export class AddPricelistRatesComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public serviceTypeList: ServiceType[] = serviceTypeList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      name: el.name,  
      code: el.code,
      category: el.category,   
    }
  } 
  constructor(
    private router: Router,
    private dialog: MatDialog,

    private dialogRef: MatDialogRef<AddPricelistRatesComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data,) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;

      }, 1000);
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  close(): void{
    this.dialogRef.close()
  }

  save(): void{
    this.dialogRef.close()
  }
}

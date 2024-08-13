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
  ServiceHistory,
  selectedColumns,
  serviceHistoryList 
} from '../../../utils/service-history-model-interface';
import { AddMedicalHistoryComponent } from '../../../dialogs/add-medical-history/add-medical-history.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'client-service-history-grid',
  animations: [mainAnimations],
  templateUrl: './service-history-grid.component.html',
  styleUrls: ['./service-history-grid.component.scss']
})
export class ServiceHistoryGridComponent implements OnInit {
  @Input() componentTitle: string = '';
  @Input() listDataSource: ServiceHistory[] = [];
  @Input() loading: boolean = true;
  @Input() searchSource: any;

  public searchBy: string = '';
  public dataSource: ServiceHistory[] = [];
  constructor() { }

  ngOnInit(): void {
    this.dataSource = [...this.listDataSource];
  }

  searchDataSource(): void {
    const listDataSource = [...this.listDataSource]
    .filter(el => {
      let source = this.searchSource(el);
      
      return JSON.stringify(source).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.dataSource = listDataSource;

  }

}

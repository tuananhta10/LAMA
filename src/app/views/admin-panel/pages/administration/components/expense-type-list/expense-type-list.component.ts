import { Component, OnDestroy, OnInit, Input } from '@angular/core';
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
  ExpenseTypes,
  selectedColumns,
  expenseList 
} from '../../utils/expense-type-list-model-interface';
import { AddExpenseTypeListComponent } from '../../dialogs/add-expense-type-list/add-expense-type-list.component';
import { ViewEmployeePositionComponent } from '../../dialogs/view-employee-position/view-employee-position.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';

@Component({
  selector: 'app-expense-type-list',
  animations: [mainAnimations],
  templateUrl: './expense-type-list.component.html',
  styleUrls: ['./expense-type-list.component.scss']
})
export class ExpenseTypeListComponent implements OnInit, OnDestroy {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public expenseList: ExpenseTypes[] = []//expenseList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name,  
      category: el.category,  
      description: el.description
    }
  } 

  constructor(private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;

      }, 1000);
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddExpense(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog(event){
    if(event){
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: event?.data,
        }
      );

      deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data){
          // delete integration here 
          // after delete refresh store
          console.log("DATA WILL BE DELETED", result?.data)
        }
      });
    }
  }

  openAddExpense(data?: any){
    let expenseDialog = this.dialog.open(
      AddExpenseTypeListComponent,
      { 
        minWidth: '30vw',
        data: data,
      }
    );

    expenseDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  viewEmployeeDetail(event){
    let expenseDialog = this.dialog.open(
      ViewEmployeePositionComponent,
      { 
        width: '60vw',
        data: {
          details: event?.data,
        },
      }
    );

    expenseDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}

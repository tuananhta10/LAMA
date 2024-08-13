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
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { 
  displayedColumns,
  TableHeader,
  EmployeeTraining,
  selectedColumns,
  trainingList 
} from '../../utils/employee-training-model-interface';
import { AddTrainingComponent } from '../../dialogs/add-training/add-training.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-training',
  animations: [mainAnimations],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  private employeesData$: any;
  private req: Subscription;

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public trainingList: EmployeeTraining[] = trainingList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public employeeData: any = {};
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      employee_name: el.employee_name,
      qualification: el.qualification,
      completion_date: el.completion_date,
      expiry_date: el.expiry_date,
      status: el.status,
    };
  }

  constructor(private employeeListStore: Store<EmployeeListState>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }

  ngOnInit(): void {

    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      console.log("RESULT")

      if(results){
        // from ngrx store
        this.employeeData = results?.employees.employeeList.find(el => el?.id ==  this.id);

        if(this.employeeData){
          this.trainingList = this.trainingList.map((el: EmployeeTraining) => {
            el["employee"] = `${this.employeeData.first_name} ${this.employeeData.last_name}`;

            return el;
          });

          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }

        
      }
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  openAddTraining(){
    console.log("CLICK")

    // open edit column dialog
    const dialogRef = this.dialog.open(AddTrainingComponent, {
      panelClass: "dialog-responsive",
      //width: '550px',
      data: {
        employeeData: this.employeeData
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.dbClickActive = false;
      //this.selectRows(selectedEmployee);
      console.log('The dialog was closed',  /*this.dbClickActive*/ );
    });

  }

}

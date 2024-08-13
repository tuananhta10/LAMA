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
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { 
  displayedColumns,
  TableHeader,
  Interests,
  selectedColumns,
  interestList 
} from '../../utils/interest-list-model-interface';
import { AddGenderComponent } from '../../dialogs/add-gender/add-gender.component';
import { ViewEmployeePositionComponent } from '../../dialogs/view-employee-position/view-employee-position.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gender',
  animations: [mainAnimations],
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit {
  private interestData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public interestList: Interests[] = []//interestList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name
    }
  } 

  constructor(private adminInterest: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    //this.getInterest();

    this.interestData$ = this.adminInterest.pipe(select(state => state.interest));

    this.req =  this.interestData$.subscribe((interest: any) => {
      this.loading = interest.pending;

      if(interest.interestList.length > 0){
        //this.interestList = interest.interestList;
      }

      if(interest.success){
        this.snackBar.open(interest.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminInterest.dispatch({
          type: InterestActionTypes.SAVE_INTEREST_SUCCESS,
          payload: {message: null}
        }); 

        this.adminInterest.dispatch({
          type: InterestActionTypes.EDIT_INTEREST_SUCCESS,
          payload: {message: null}
        }); 

        this.getInterest();
      }

      if(interest.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminInterest.dispatch({
          type: InterestActionTypes.SAVE_INTEREST_FAIL,
          payload: null
        }); 

        this.adminInterest.dispatch({
          type: InterestActionTypes.EDIT_INTEREST_FAIL,
          payload: null
        }); 
      }
    })
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddInterests(event?.data);
    }
  }

  getInterest(){
    this.adminInterest.dispatch({
      type: InterestActionTypes.GET_INTEREST_LIST
    }); 
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
        if(result?.data || (result && !result.cancel && event?.data)){
          this.adminInterest.dispatch({
            type: InterestActionTypes.DELETE_INTEREST,
            payload: [result?.data || event?.data]
          });
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddInterests(data?: any){
    let interestDialog = this.dialog.open(
      AddGenderComponent,
      { 
        minWidth: '30vw',
        data: data,
      }
    );

    interestDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  viewEmployeeDetail(event){
    let interestDialog = this.dialog.open(
      ViewEmployeePositionComponent,
      { 
        width: '60vw',
        data: {
          details: event?.data,
        },
      }
    );

    interestDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }


}

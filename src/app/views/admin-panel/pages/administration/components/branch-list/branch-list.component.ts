import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { 
  displayedColumns,
  TableHeader,
  Branch,
  selectedColumns,
  branchList 
} from '../../utils/branch-model-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { BranchActionTypes } from '@main/views/admin-panel/store/actions/admin-branch.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-branch-list',
  animations: [mainAnimations],
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  private branchData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public branchList: Branch[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      name: el?.name,
      email_address: el?.email_address,
      timezone: el?.timezone,
      phone: el?.phone,
      address_a: el?.address_a,
      suburb: el?.suburb,
      state: el?.state,
      post_code: el?.post_code,
    }
  } 

  constructor(private adminBranch: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getBranchs();
    this.branchData$ = this.adminBranch.pipe(select(state => state.branch));

    this.req =  this.branchData$.subscribe((branch: any) => {
      this.loading = branch.pending;
      
      if(branch.branchList.length > 0){
        this.branchList = branch.branchList;
      }

      if(branch.success){
        this.snackBar.open(branch.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminBranch.dispatch({
          type: BranchActionTypes.SAVE_BRANCH_SUCCESS,
          payload: {message: null}
        }); 

        this.adminBranch.dispatch({
          type: BranchActionTypes.EDIT_BRANCH_SUCCESS,
          payload: {message: null}
        }); 

        this.getBranchs();
      }

      if(branch.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminBranch.dispatch({
          type: BranchActionTypes.SAVE_BRANCH_FAIL,
          payload: null
        }); 

        this.adminBranch.dispatch({
          type: BranchActionTypes.EDIT_BRANCH_FAIL,
          payload: null
        }); 
      }
    })
  }

  getBranchs(){
    this.adminBranch.dispatch({
      type: BranchActionTypes.GET_BRANCH_LIST
    }); 
  }


  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    //console.log(event)

    if(event){
      this.router.navigate([`/admin/setup/branch-setup/${event?.data?.id}`])
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
        if(result?.data || (result && !result.cancel && event?.data)){
          this.adminBranch.dispatch({
            type: BranchActionTypes.DELETE_BRANCH,
            payload: [result?.data.id || event?.data.id]
          });
          // after delete refresh store
          //console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

}

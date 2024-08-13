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
  Organization,
  selectedColumns,
  organizationList 
} from '../../utils/organization-model-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { OrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-organization.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organizations',
  animations: [mainAnimations],
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  private organizationData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public organizationList: Organization[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,   
      abn: el.abn,  
      profile_image: el.profile_image,
    }
  } 

  constructor(private adminOrganization: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getOrganizations();
    this.organizationData$ = this.adminOrganization.pipe(select(state => state.organization));

    this.req =  this.organizationData$.subscribe((organization: any) => {
      this.loading = organization.pending;
      
      if(organization.organizationList.length > 0){
        this.organizationList = organization.organizationList;
      }

      if(organization.success){
        this.snackBar.open(organization.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminOrganization.dispatch({
          type: OrganizationActionTypes.SAVE_ORGANIZATION_SUCCESS,
          payload: {message: null}
        }); 

        this.adminOrganization.dispatch({
          type: OrganizationActionTypes.EDIT_ORGANIZATION_SUCCESS,
          payload: {message: null}
        }); 

        this.getOrganizations();
      }

      if(organization.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminOrganization.dispatch({
          type: OrganizationActionTypes.SAVE_ORGANIZATION_FAIL,
          payload: null
        }); 

        this.adminOrganization.dispatch({
          type: OrganizationActionTypes.EDIT_ORGANIZATION_FAIL,
          payload: null
        }); 
      }
    })
  }

  getOrganizations(){
    this.adminOrganization.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION_LIST
    }); 
  }


  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    console.log(event)

    if(event){
      this.router.navigate([`/admin/setup/organization-setup/${event?.data?.id}`])
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
          this.adminOrganization.dispatch({
            type: OrganizationActionTypes.DELETE_ORGANIZATION,
            payload: [result?.data || event?.data]
          }); 
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }
}

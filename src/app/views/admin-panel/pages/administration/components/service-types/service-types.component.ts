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
import { 
  displayedColumns,
  TableHeader,
  ServiceType,
  selectedColumns,
  serviceTypeList 
} from '../../utils/service-type-model-interface';
import { AddServiceTypesComponent } from '../../dialogs/add-service-types/add-service-types.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ServiceTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-service-type.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-types',
  animations: [mainAnimations],
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.scss']
})
export class ServiceTypesComponent implements OnInit {
  private serviceTypeData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public serviceTypeList: ServiceType[] = []//serviceTypeList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      name: el.name,  
      code: el.code,
      after_hour_calc_method: el.after_hour_calc_method,  
      category: el.category,  
      pay_travel: el.pay_travel,  
      web_app_name: el.web_app_name,  
      job_type: el.job_type,  
      service_location: el.service_location,  
    }
  } 

  constructor(private adminServiceType: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getServiceTypes();
    
    this.serviceTypeData$ = this.adminServiceType.pipe(select(state => state.serviceType));

    this.req =  this.serviceTypeData$.subscribe((serviceType: any) => {
      this.loading = serviceType.pending;

      if(serviceType.serviceTypeList.length > 0){
        this.serviceTypeList = serviceType.serviceTypeList;
      }

      if(serviceType.success){
        this.snackBar.open(serviceType.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminServiceType.dispatch({
          type: ServiceTypeActionTypes.SAVE_SERVICE_TYPE_SUCCESS,
          payload: {message: null}
        }); 

        this.adminServiceType.dispatch({
          type: ServiceTypeActionTypes.EDIT_SERVICE_TYPE_SUCCESS,
          payload: {message: null}
        }); 

        this.getServiceTypes();
      }

      if(serviceType.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminServiceType.dispatch({
          type: ServiceTypeActionTypes.SAVE_SERVICE_TYPE_FAIL,
          payload: null
        }); 

        this.adminServiceType.dispatch({
          type: ServiceTypeActionTypes.EDIT_SERVICE_TYPE_FAIL,
          payload: null
        }); 
      }
    })
  }
  getServiceTypes(){
    this.adminServiceType.dispatch({
      type: ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddServiceTypes(event?.data);
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

  openAddServiceTypes(data?: any){
    let employeePositionDialog = this.dialog.open(
      AddServiceTypesComponent,
      { 
        maxWidth: '80vw',
        data: data,
      }
    );

    employeePositionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  viewServiceTypeDetail(event){
    /*let employeePositionDialog = this.dialog.open(
      ViewServiceTypesComponent,
      { 
        width: '60vw',
        data: {
          details: event?.data,
        },
      }
    );

    employeePositionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });*/
  }

}

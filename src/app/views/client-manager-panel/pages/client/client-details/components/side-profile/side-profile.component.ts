import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { 
  Subscription, 
  Observable, 
  Subject,
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { finalize, takeUntil } from "rxjs/operators";
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { AssignCareworkerComponent } from '../../dialogs/assign-careworker/assign-careworker.component';
import { EmployeeSelectionComponent } from '../../dialogs/employee-selection/employee-selection.component';
import { EmployeeSelectionConfirmationComponent } from '../../dialogs/employee-selection-confirmation/employee-selection-confirmation.component';
import { EmployeeSelectionSuccessComponent } from '../../dialogs/employee-selection-success/employee-selection-success.component';
import { ClientMenuComponent } from '../../dialogs/client-menu/client-menu.component';
import { CareWorkerModalComponent } from '../../../client-shared/modals/care-worker-modal/care-worker-modal.component';
import { UpdateProfilePasswordComponent } from '../../dialogs/update-profile-password/update-profile-password.component';
import { UpdateProfilePhotoComponent } from '../../dialogs/update-profile-photo/update-profile-photo.component';

@Component({
  selector: 'client-side-profile',
  animations: [mainAnimations],
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.scss']
})
export class SideProfileComponent implements OnInit {
  @Input() clientData: any = {};
  @Input() clientSideProfile: boolean = false;

  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  adminAccess:any = ['Admin'];


  private assignCareworkerDialog: any = {
    assign: undefined,
    confirm: undefined,
    success: undefined
  };
  private clientsData$: any;
  private employeesData$: any;
  private req: Subscription;
  public id: string = '';
  private unsubscribe$ = new Subject<void>();

  public employeeData: any[] = [];
  public defaultImage = '/assets/images/placeholder/default-avatar.png';

  constructor(private clientListStore: Store<ClientListState>,
    private employeeListStore: Store<EmployeeListState>,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.getClientDetails();
    this.getEmployeeData();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // client details
  getClientDetails(): void{
    // extract id
    this.req = this.route.params.subscribe((params: any) => this.id = params['id']);
    
    //this.clientListStore.dispatch({ type: ClientListActionTypes.GET_CLIENT_LIST, payload: this.id });

    // Subscribe to storage
    this.req.add(
      this.clientsData$.subscribe((results: any) => {
        if(results){
          // from ngrx store
          this.clientData = results?.clients.clientList.find(el => el?.id == this.id);
        }
      })
    ) 
  }

  // employee details
  getEmployeeData(): void{
    this.employeeListStore.dispatch({ type: EmployeeListActionTypes.GET_EMPLOYEE_LIST });
 
    // Subscribe to storage
    this.req.add(
      this.employeesData$.subscribe((results: any) => {
        //console.log("RESULT", results)

        if(results){
          // from ngrx store
          this.employeeData = results?.employees.employeeList;
        }
      })
    ) 
  }

  /* CLIENT PHOTO */
  openUpdatePhoto(): void {
    // open edit column dialog
    const dialogRef = this.dialog.open(UpdateProfilePhotoComponent, {
      panelClass: "dialog-responsive",
      width: '500px',
      data: { id: this.clientData?.id },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      
      console.log('The dialog was closed',  result);
    });
  }

  /* CLIENT PASSWORD */
  openUpdatePassword(): void {
    // open edit column dialog
    const dialogRef = this.dialog.open(UpdateProfilePasswordComponent, {
      panelClass: "dialog-responsive",
      width: '500px',
      data: { 
        id: this.clientData?.id,
        clientData: this.clientData 
      },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      
      console.log('The dialog was closed',  result);
    });
  }

  /* CLIENT MENU */
  openClientMenu(): void {
    // open edit column dialog
    const dialogRef = this.dialog.open(ClientMenuComponent, {
      panelClass: "dialog-responsive",
      width: '700px',
      data: { id: this.clientData?.id },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      
      console.log('The dialog was closed',  result);
    });
  }
  
  /* TEMPORARY ASSIGNING */
  openCareWorkerModal(event){
    let careWorkerDialog = this.dialog.open(
      CareWorkerModalComponent,
      {
        //height: '920px',
        width: '45vw',
        data: {
          careworkers_added: []//[...this.careWorkersTableData, ...this.careWorkersNotToUseTableData].map(el => el.id)
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
        if(result){
          let cwObj = {
            employee_id: result.employee.id,
            employee_not_use: 0
          }
          //this.clientEmployee.add.push(cwObj)
          //this.careWorkersTableData.push(result.employee)
          
        }
      }
    )
  }

  /* Check Matching data */
  openAssignCareworkerDialog(): void {
    // open edit column dialog
    const dialogRef = this.dialog.open(AssignCareworkerComponent, {
      panelClass: "dialog-responsive",
      width: '660px',
      data: { },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      
      console.log('The dialog was closed',  result);
      if(result && !this.assignCareworkerDialog.success){
        this.openCareworkerSelection(result?.selection)
      }
    });

  }

  
  /* OPEN LIST OF CAREWORKERS */
  openCareworkerSelection(selection: string = 'location'): void {
    this.assignCareworkerDialog.assign = this.dialog.open(EmployeeSelectionComponent, 
    {
      panelClass: "dialog-responsive",
      width: '1000px',
      height: '650px',
      data: {
        careworkerList: this.employeeData,
        selection: selection
      },
      autoFocus: false 
    });

    this.assignCareworkerDialog.assign
    .afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      this.assignCareworkerDialog.assign = undefined;

      if(result && !this.assignCareworkerDialog.confirm){
        this.openCareworkerConfirmation(result?.careworker)
      }
    });
  }  

  /* CONFIRM SELECTION */
  openCareworkerConfirmation(careworker: any): void {
    this.assignCareworkerDialog.confirm = this.dialog.open(EmployeeSelectionConfirmationComponent, 
    {
      panelClass: "dialog-responsive",
      width: '660px',
      height: '670px',
      data: {
        clientData: this.clientData,
        careworker: careworker
      },
      autoFocus: false 
    });

    this.assignCareworkerDialog.confirm.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      this.assignCareworkerDialog.confirm = undefined;

      if(result && !this.assignCareworkerDialog.success)
        this.openCareworkerSuccess(careworker);
    });
  }  

  /* SUCCESS SELECTION */
  openCareworkerSuccess(careworker: any): void {
    this.assignCareworkerDialog.success = this.dialog.open(EmployeeSelectionSuccessComponent, 
    {
      panelClass: "dialog-responsive",
      width: '450px',
      height: '280px',
      data: {
        clientData: this.clientData,
        careworker: careworker
      },
      autoFocus: false 
    });

    this.assignCareworkerDialog.success.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      this.assignCareworkerDialog.success = undefined;
      console.log('The dialog was closed',  result);
    });
  }  
}

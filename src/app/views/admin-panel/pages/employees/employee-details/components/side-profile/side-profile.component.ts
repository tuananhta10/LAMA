import { 
  Component, 
  OnInit, 
  Input 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { 
  Router, 
  ActivatedRoute,
} from '@angular/router';

import { 
  Subscription, 
  Observable, 
  Subject,
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store,
} from '@ngrx/store';
import { 
  finalize, 
  takeUntil 
} from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { AssignClientComponent } from '../../dialogs/assign-client/assign-client.component';
import { ClientSelectionComponent } from '../../dialogs/client-selection/client-selection.component';
import { ClientSelectionConfirmationComponent } from '../../dialogs/client-selection-confirmation/client-selection-confirmation.component';
import { ClientSelectionSuccessComponent } from '../../dialogs/client-selection-success/client-selection-success.component';
import { EmployeeMenuComponent } from '../../dialogs/employee-menu/employee-menu.component';
import { CareWorkerModalComponent } from '../../../employee-shared/modals/care-worker-modal/care-worker-modal.component';
import { UpdateProfilePasswordComponent } from '../../dialogs/update-profile-password/update-profile-password.component';
import { UpdateProfilePhotoComponent } from '../../dialogs/update-profile-photo/update-profile-photo.component';

@Component({
  selector: 'employee-side-profile',
  animations: [mainAnimations],
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.scss']
})
export class SideProfileComponent implements OnInit {
  @Input() employeeData: any = {};
  @Input() employeeSideProfile: boolean = false;

  private employeesData$: any;
  private clientsData$: any;
  private unsubscribe$ = new Subject<void>();
  private assignClientDialog: any = {
    assign: undefined,
    confirm: undefined,
    success: undefined
  }
  private routeReq: Subscription;
  public req: Subscription;
  public clientData: any[] = [];
  public defaultImage = '/assets/images/placeholder/default-avatar.png';
  public id: string = '';
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public employeeSubData: any;
  public location: string = '';

  constructor(private employeeListStore: Store<EmployeeListState>,
    private clientListStore: Store<ClientListState>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
    this.clientsData$ = this.clientListStore.pipe(select(state => state));

    this.routeReq = this.router.events.subscribe((event: any) => {
      this.location = this.router.url; 
    });
  }

  ngOnInit(): void {
    this.location = this.router.url; 
    this.getEmployeeDetails();
  }

  communicationFeeds(){
    //sessionStorage.setItem('employeeFormStep', '3');
    this.router.navigate([`/admin/employees/details/${this.id}/communication-feeds/inbox`]);
    // routerLink="/admin/schedule/details/employee/{{id}}"
  }

  selectInboxType(type: string){
    this.router.navigate([`/admin/employees/details/${this.id}/communication-feeds/${type}`]);
  }

  assignClient(){
    sessionStorage.setItem('employeeFormStep', '3');
    this.router.navigate([`/admin/employees/edit/${this.id}`]);
    // routerLink="/admin/schedule/details/employee/{{id}}"
  }
  
  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
    if(this.routeReq) this.routeReq.unsubscribe();
  }

  // employee details
  getEmployeeDetails(): void{
    // extract id
    this.req = this.route.params.subscribe((params: any) => this.id = params['id']);
    this.employeeListStore.dispatch({ type: EmployeeListActionTypes.GET_EMPLOYEE_LIST, payload: this.id });

    // Subscribe to storage
    this.req.add(
      this.employeesData$.subscribe((results: any) => {
        //console.log("RESULT", results)

        if(results){
          // from ngrx store
          this.employeeData = results?.employees.employeeList.find(el => el?.id == this.id);
          this.employeeSubData = results.employee?.employeeStats?.result[0];
        }
      })
    ) 

    /* FOR CLIENT LIST */
    this.clientListStore.dispatch({ type: ClientListActionTypes.GET_CLIENT_LIST });

    // Subscribe to storage
    this.req.add(
      this.clientsData$.subscribe((results: any) => { 
        this.clientData = results?.clients.clientList;
      })
    );

  }

  /* EMPLOYEE PHOTO */
  openUpdatePhoto(): void {
    // open edit column dialog
    const dialogRef = this.dialog.open(UpdateProfilePhotoComponent, {
      panelClass: "dialog-responsive",
      width: '500px',
      data: { id: this.employeeData?.id },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      this.employeeListStore.dispatch({ type: EmployeeListActionTypes.GET_EMPLOYEE_LIST, payload: this.id });
      console.log('The dialog was closed',  result);
    });
  }

  /* EMPLOYEE PASSWORD */
  openUpdatePassword(): void {
    // open edit column dialog
    const dialogRef = this.dialog.open(UpdateProfilePasswordComponent, {
      panelClass: "dialog-responsive",
      width: '500px',
      data: { 
        id: this.employeeData?.id,
        employeeData: this.employeeData
      },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      if(result && result?.password){
        this.dialog.closeAll();
        
        console.log('The dialog was closed',  result);
      }
    });
  }

  deactivateAccount(){
    // open edit column dialog
    const dialogRef = this.dialog.open(UpdateProfilePasswordComponent, {
      panelClass: "dialog-responsive",
      width: '600px',
      data: { 
        id: this.employeeData?.id,
        employeeData: this.employeeData,
        deactivate: true
      },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      if(result && result?.password){
        this.dialog.closeAll();
        
        console.log('The dialog was closed',  result);
      }
    });
  }

  openCareWorkerModal(event){
    let careWorkerDialog = this.dialog.open(
      CareWorkerModalComponent,
      {
        //height: '920px',
        width: '45vw',
        data: {
          client_added: []//[...this.careWorkersTableData].map(el => el.id)
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        let cwObj = {
          client_id: result.client?.id,
        }
        //this.careWorkerClient.add.push(cwObj)
        //this.careWorkersTableData.push(result.client)
      }
    })
  }

  openEmployeeMenu(){
    // open edit column dialog
    const dialogRef = this.dialog.open(EmployeeMenuComponent, {
      panelClass: "dialog-responsive",
      width: '700px',
      data: { id: this.employeeData?.id },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      
      console.log('The dialog was closed',  result);
    });
  }

  /* CREATE MATCHING % */
  openAssignClientDialog(){
    // open edit column dialog
    const dialogRef = this.dialog.open(AssignClientComponent, {
      panelClass: "dialog-responsive",
      width: '660px',
      data: { /*employeeDetail: selectedEmployee*/},
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();

      if(result && !this.assignClientDialog.assign){
        this.openClientSelection(result?.selection)
      }
    });

  }

  /* OPEN LIST OF CLIENTS */
  openClientSelection(selection: string = 'location'){
    this.assignClientDialog.assign = this.dialog.open(ClientSelectionComponent, 
    {
      panelClass: "dialog-responsive",
      width: '1000px',
      height: '650px',
      data: {
        clientList: this.clientData,
        selection: selection
      },
      autoFocus: false 
    });

    this.assignClientDialog.assign
    .afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      this.assignClientDialog.assign = undefined;

      if(result && !this.assignClientDialog.confirm){
        this.openClientConfirmation(result?.client)
      }
    });
  }  

  /* CONFIRM SELECTION */
  openClientConfirmation(client: any){
    this.assignClientDialog.confirm = this.dialog.open(ClientSelectionConfirmationComponent, 
    {
      panelClass: "dialog-responsive",
      width: '660px',
      height: '670px',
      data: {
        employeeData: this.employeeData,
        client: client
      },
      autoFocus: false 
    });

    this.assignClientDialog.confirm
    .afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      this.assignClientDialog.confirm  = undefined;

      if(result && !this.assignClientDialog.success){
        this.openClientSuccess(client);
      }
    });
  }  

  /* SUCCESS SELECTION */
  openClientSuccess(client: any){
    this.assignClientDialog.success = this.dialog.open(ClientSelectionSuccessComponent, 
    {
      panelClass: "dialog-responsive",
      width: '450px',
      height: '280px',
      data: {
        employeeData: this.employeeData,
        client: client
      },
      autoFocus: false 
    });

    this.assignClientDialog.success
    .afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      this.dialog.closeAll();
      this.assignClientDialog.success  = undefined;

    });
  }  
}

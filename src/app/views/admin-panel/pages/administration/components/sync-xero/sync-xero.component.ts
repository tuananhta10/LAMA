import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SyncToXeroDialogComponent } from '../../dialogs/sync-to-xero-dialog/sync-to-xero-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  Subscription, 
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SyncToXeroActionTypes } from '@main/views/admin-panel/store/actions/admin-xero.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { AdminXeroAuthService } from "@main/shared/services/admin-panel/admin-xero-auth.service";
import { environment } from '@environments/environment';
import { P } from '@angular/cdk/keycodes';
import { SyncStatusDialogComponent } from '@main/shared/components/sync-status-dialog/sync-status-dialog.component';



@Component({
  selector: 'app-sync-xero',
  animations: [mainAnimations],
  templateUrl: './sync-xero.component.html',
  styleUrls: ['./sync-xero.component.scss']
})
export class SyncXeroComponent implements OnInit, OnDestroy {
  private xeroData$: any;
  private myobSettings$: any;
  public companyFileData:any[] = []
  public companyFileOptions:any[] = []
  public selectedCompanyFile:any

  public settingsListData:any
  public taxCodeOption:any[] = []
  public myobAccountsOption:any[] = []
  private req: Subscription;
  private xeroReq: Subscription;

  private unsubscribe$ = new Subject<void>();

  
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public xeroItemsList: any;
  public listView: boolean = true;
  public loading: boolean = true;
  public stepper: number = 1;  
  
  public xeroForm: FormGroup;
  public myobForm: FormGroup;

  public displayedColumns:any[] =  [
    { title: 'Id', col_name: 'id'},
    //{ title: 'Invoice Id', col_name: 'invoice_item_id' }, 
    { title: 'Records to Sync', col_name: 'records' }, 
    { title: 'Items Sync', col_name: 'number_of_items' }, 
    { title: 'Description', col_name: 'description' }, 
    { title: ' ', col_name: 'action' },  
  ];  

  public selectedColumns: any[] = [
    'records',
    //'number_of_items',
    'description',
    'action'
  ];
  public syncData: any[] = [
    { id: 4, records: 'Participant Funding Claim', number_of_items: 0, description: 'This will sync participant invoice related to funding claim or plan managed invoices', notCapitalize: true },
    { id: 6, records: 'Participant Invoice Batches', number_of_items: 0, description: 'This will sync participant invoice related to invoice batches or self managed invoices', notCapitalize: true },
    
    { id: 5, records: 'Employee Timesheet', number_of_items: 0, description: 'This will sync employee timesheet details', notCapitalize: true },
  ];

  public syncContactData: any[] = [
    //{ id: 1, records: 'Xero Account Types', number_of_items: 0, description: 'List of Xero Account Categories' },
    { id: 2, records: 'Employee', number_of_items: 0, description: `This will sync the current employee list to MYOB. Note: This is a one way sync only.`, notCapitalize: true },
    { id: 3, records: 'Participant', number_of_items: 0, description: 'This will sync the current participant list to MYOB: . Note: This is a one way sync only.', notCapitalize: true },
  ];

  public accountAquired: boolean = false;
  public xeroResult: any;

  public syncOptions: any[] = [
    'Xero',
    'MYOB'
  ]
  public radioOptions:any[] = [{id: true, name: 'Xero', value: 'xero'}, {id: false, name:'MYOB', value: 'myob'}];


  public switchServiceForm: FormGroup;
  private token:string = ''

  public testData = ['Ad','test']

  public isAuthenticated: boolean = false
  public allowed: boolean = false

  private syncModel: string = ''

  constructor(private adminXero: Store<AdminProfileState>,
    private xeroService: AdminXeroAuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) {

      this.token = this.activatedRoute.snapshot.queryParamMap.get('code') 
      if(this.token){
        this.connectToMyob(this.token)
      }else{
        this.loading = false;
      }

    }

  ngOnInit(): void {

    const minLength = 25;
    const maxLength = 50;
    const allowedChars = '[a-zA-Z0-9_.-]';

    const tokenRegex = new RegExp(`^${allowedChars}{${minLength},${maxLength}}$`);


    this.xeroForm = this.formBuilder.group({
      xero_app_id: [''],
      client_id: ['', [Validators.required, Validators.pattern(tokenRegex)]],
      client_secret: ['', [Validators.required, Validators.pattern(tokenRegex)]],
    });

    this.myobForm = this.formBuilder.group({
      taxcode:['', Validators.required],
      account:['', Validators.required],
      company_file_id: ['', Validators.required]
    })

    this.switchServiceForm = this.formBuilder.group({
      service: ['xero'],
    });

    this.switchServiceForm.controls['service'].valueChanges.subscribe(res => {
      if(res === 'xero'){
          this.getXeroCredential();
          this.subscribeToXero();
      }else{
        this.isAuthenticated = false
        this.allowed = false
        this.accountAquired = false
      }
    })

    
  } 

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  subscribeToXero(){
    this.xeroData$ = this.adminXero.pipe(select(state => state.syncToXero))
    this.xeroReq = this.xeroData$.subscribe((syncToXero: any) => {
      this.loading = syncToXero.pending;

      if (syncToXero.syncToXeroListProgress.length > 0) {
        this.xeroItemsList = syncToXero.syncToXeroListProgress;
      }

      if (syncToXero.success) {
        // this.snackBar.open('Successfully synced to Xero', '', {
        //   duration: 4000,
        //   panelClass: 'success-snackbar',
        // });

        if (syncToXero.success.data.error.length === 0) {
          // let message = syncToXero.success.status 
          // ? syncToXero.success
          // : "Successfully sync to xero"
          this.snackBar.open("All records are successfully synced to xero", "", {
            duration: 4000,
            panelClass: 'success-snackbar'
          });

        } else {
          this.snackBar.open("Successfully synced to xero", "", {
            duration: 4000,
            panelClass: 'success-snackbar'
          });
          this.syncToXeroStatusDialog(syncToXero.success.data.error)
        }

        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: null,
        });

        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
          payload: null,
        });

        // this.getXeroProgress();
      }

      if (syncToXero.error) {
        let message = syncToXero.error.error.message 
          ? syncToXero.error.error.message 
          : 'Something went wrong please try again later or contact your administrator'
          
        this.snackBar.open(
          message,
          '',
          {
            duration: 4000,
            panelClass: 'danger-snackbar',
          }
        );

        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS,
          payload: null,
        });

        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL,
          payload: null,
        });
        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO_FAIL,
          payload: null,
        });
      }
    });
  }

  private syncToXeroStatusDialog(data:any){
    let syncToXeroStatusModal = this.dialog.open(
      SyncStatusDialogComponent,
      { 
        minWidth: '30vw',
        data: {list:data, type:this.syncModel},
      },
    );

    syncToXeroStatusModal
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        console.log('Sync To Xero Status Dialog Closed');
      })
  }

  private connectToMyob(token:string):void {
    this.req = this.xeroService.connectAccountToMyob(token)
    .subscribe((result) => {
      if(result){
        this.accountAquired = true;
        this.isAuthenticated = true
        this.loading = false;
        localStorage.setItem('myob_access_token', result.access_token)
        this.snackBar.open("Successfully connected to MYOB", '', {
          duration: 4000,
          panelClass: 'success-snackbar',
        });

        this.getMYOBCompanyFiles()
      }
    }, err => {

      this.isAuthenticated = false
      this.loading = false;
      console.log(err)
      this.snackBar.open('There has been an error connecting your account to MYOB. Please check your access and try again later or contact your administrator',
        '',
        {
          duration: 8000,
          panelClass: 'danger-snackbar',
        }
      );
    });
  }

  myobSaveCompanyFile(){
    let {company_file_id,taxcode,account} = this.myobForm.controls
    
    let body
    if(this.taxCodeOption.length > 0 && this.myobAccountsOption.length > 0){
      body = {
        tax_code_id:taxcode.value ? this.settingsListData.tax_codes.find(e => e.name === taxcode.value).id : undefined,
        account_id:account.value ? this.settingsListData.accounts.find(e => e.name === account.value).id : undefined,
      }
    }else{
      body = {
        company_file_id : company_file_id.value ? this.companyFileData.find(e => e.name === company_file_id.value).id : "",
      }
    }

    this.loading = true
    this.xeroService.updateMYOBSettings({...body}).subscribe({
      next:(value:any) => {
        console.log(value,'success-myob')
        if(this.taxCodeOption.length > 0 && this.myobAccountsOption.length > 0){
          this.loading = false;
          this.stepper = 2
          this.allowed = true
          return
        }
        this.getMyobSettingsList()
      },
      error:(err:any)=>{
        console.log(err,'error-myob')
        this.loading = false
      }
    })
  }

  private getMYOBCompanyFiles(){

    this.adminXero.dispatch({
      type: SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE,
      payload: null,
    });

    this.myobSettings$ = this.adminXero.pipe(select(state => state.syncToXero))

    this.myobSettings$.subscribe((myobSettings:any) => {
      this.loading = myobSettings.pending;

      if(myobSettings.success){
        this.companyFileData = myobSettings.success
        if(this.companyFileOptions.length == 0){
          this.companyFileOptions = this.companyFileData.map(res => res.name)
        }

        
        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE_SUCCESS,
          payload: null
        }); 
       
      }

      if (myobSettings.error) {
        // this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
        //   duration: 4000,
        //   panelClass: 'danger-snackbar'
        // });
        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE_FAIL,
          payload: null
        });
      }

    })
  }

  private getMyobSettingsList(){

    this.adminXero.dispatch({
      type: SyncToXeroActionTypes.GET_MYOB_SETTINGS,
      payload: null,
    });

    this.myobSettings$ = this.adminXero.pipe(select(state => state.syncToXero))

    this.myobSettings$.subscribe((myobSettings:any) => {
      this.loading = myobSettings.pending;

      if(myobSettings.success){
        this.settingsListData = myobSettings.success
        this.taxCodeOption = this.settingsListData.tax_codes.map(res => res.name)
        this.myobAccountsOption = this.settingsListData.accounts.map(res => res.name)

        
        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.GET_MYOB_SETTINGS_SUCCESS,
          payload: null
        }); 
       
      }

      if (myobSettings.error) {
        // this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
        //   duration: 4000,
        //   panelClass: 'danger-snackbar'
        // });
        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.GET_MYOB_SETTINGS_FAIL,
          payload: null
        });
      }

    })
  }

  getXeroProgress() {
    this.adminXero.dispatch({
      type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST
    }); 
  }

  getXeroCredential() {
    this.snackBar.open("Checking Xero Account Credentials", '', {
      duration: 4000,
      panelClass: 'success-snackbar',
    });

    this.req = this.xeroService.getXeroCredential()
    .subscribe((result) => {
      if(result?.length > 0){
        console.log(result)

        // set credentials
        this.xeroForm.controls['client_id'].setValue(result[0]?.client_id);
        this.xeroForm.controls['client_secret'].setValue(result[0]?.client_secret);
        this.xeroResult = result;
        this.loading = false;
        this.accountAquired = true;
        this.snackBar.open("Successfully acquired xero credentials and settings. You can now start syncing your data.", '', {
          duration: 4000,
          panelClass: 'success-snackbar',
        });
      }

      else {
        this.loading = false;
        this.snackBar.open(`You haven't added your Xero account yet. Please connect your Xero account to integrate your participants and employees with Xero.`, '', {
          duration: 4000,
          panelClass: 'success-snackbar',
        });
      }
    }, err => {
      this.snackBar.open('There has been an error connecting your account to Xero. Please check your access and try again later or contact your administrator',
        '',
        {
          duration: 8000,
          panelClass: 'danger-snackbar',
        }
      );
    });
  }


  connectAccountToXero(){
    let body = {
      client_id: this.xeroForm.controls['client_id'].value,
      client_secret: this.xeroForm.controls['client_secret'].value,
      result: this.xeroResult,
      type:this.switchServiceForm.controls['service'].value
    }

    this.snackBar.open("Please wait we are trying to connect your account to Xero", '', {
      duration: 4000,
      panelClass: 'success-snackbar',
    });

    this.req = this.xeroService.connectAccount(body)
    .subscribe((result) => {
      if(result){
        this.accountAquired = true;
        this.allowed = true
        this.snackBar.open("Successfully connected your account to Xero. You can now start syncing your data.", '', {
          duration: 4000,
          panelClass: 'success-snackbar',
        });
      }
    }, err => {
      this.snackBar.open('There has been an error connecting your account to Xero. Please check your access and try again later or contact your administrator',
        '',
        {
          duration: 8000,
          panelClass: 'danger-snackbar',
        }
      );
    });
  }

  public connectAccountToMyob():void {
    let body = {
      client_id: environment.myob.clientID,
    }

    this.snackBar.open("Please wait we are trying to connect your account to MYOB", '', {
      duration: 4000,
      panelClass: 'success-snackbar',
    });

    window.open('https://secure.myob.com/oauth2/account/authorize?client_id=6936d882-2fcd-47c2-8b66-5eb098b9767c&redirect_uri=https://www.admin.lamacare.com.au/admin/setup/sync-data&response_type=code&scope=CompanyFile la.global')

  }

  syncDataDialog(data?: any){
    let service:string = this.switchServiceForm.controls['service'].value
    data['service'] = service
    let syncXeroDialog = this.dialog.open(
      SyncToXeroDialogComponent,
      { 
        minWidth: '30vw',
        data: data,
      }
    );

    syncXeroDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      let syncType = result?.data?.data;

      if(syncType){
        this.snackBar.open(`Sync to ${service.toUpperCase()} is currently in Progress. Please don't close your browser while we sync your records.`, '', {
          panelClass: 'success-snackbar',
        });

        let body = {};

        if(syncType?.records === 'Xero Account Types'){
          body["model"] = "account";
        }

        else if(syncType?.records === 'Employee'){
          body["model"] = "employee";
        }

        else if(syncType?.records === 'Participant'){
          body["model"] = "client";
        }
        else if(syncType?.records === 'Participant Invoice Batches' || syncType?.records === 'Participant Funding Claim'){
          body["model"] = "invoice";
        }

        else if(syncType?.records === 'Employee Timesheet'){
          body["model"] = "timesheet";
        }

        this.syncModel = body['model']

        console.log(body)
        body['type'] = this.switchServiceForm.controls['service'].value;

        this.adminXero.dispatch({
          type: SyncToXeroActionTypes.SYNC_TO_XERO,
          payload: body
        }); 
        
        
      }
    });
  }

  updateStepper(step){
    if(step === 1){
      this.getXeroProgress();
    }

    else if(step === 2 && this.xeroItemsList?.length === 0){
      this.getXeroCredential();
    }

    this.stepper = step;
  }

  tokenValidator(token: string): ValidatorFn {
    const regex = new RegExp(`^${token}*$`); return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value; if (value && regex.test(value)) {
        return null;
      } return { invalidToken: true };
    };
  }
}

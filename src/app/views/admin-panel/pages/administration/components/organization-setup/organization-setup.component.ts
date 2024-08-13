import { 
  Component, 
  OnDestroy, 
  OnInit, 
  Input,
  Inject,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { 
  displayedColumns,
  TableHeader,
  BranchList,
  selectedColumns,
  branchList 
} from './utils/branches-model-interface';
import { organizationSteps } from './organization-tabs';
import { OrganizationConstants } from './organization-stepper-constants';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { BranchActionTypes } from '@main/views/admin-panel/store/actions/admin-branch.action';
import { OrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-organization.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminXeroAuthService } from '@main/shared/services/admin-panel/admin-xero-auth.service';
import { SyncToXeroActionTypes } from '@main/views/admin-panel/store/actions/admin-xero.action';

@Component({
  selector: 'app-organization-setup',
  animations: [mainAnimations],
  templateUrl: './organization-setup.component.html',
  styleUrls: ['./organization-setup.component.scss']
})
export class OrganizationSetupComponent implements OnInit,OnDestroy {
  private branch$: any;
  private organizationData$: any;
  private xeroPayrollOptions$: Observable<any>;
  private req: Subscription;
  private orgReq: Subscription;
  private xeroPayrollSubscription: Subscription;



  public organizationDetailsForm: FormGroup;
  public addressForm: FormGroup;
  public planManagementForm: FormGroup;

  public formStep: any = 3;
  public loading: boolean = false;
  public optionsLoading: boolean = false;
  public branchesLoading: boolean = false;
  public branchList: any[] = null;
  public steps: any = organizationSteps;
  public navigation: any = {};
  public id: any = '';
  public organizationData: any = {};
  public timeFormat: string[] = ["24 Hours", "12 Hours AM/PM"];
  public loggedUserData = JSON.parse(localStorage.getItem('loggedUserData'))

  payrollResponse:any[]
  public payrollOptions:any[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private adminOrganization: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) {
    this.id = this.loggedUserData?.organization_id;
    console.log(this.id)
  }

  ngOnInit(): void {
    this.getBranchList();
    this.subscribeOrganization();
    this.checkId()
    this.getPayrollOptions()
    this.getPayrollOptionsSubscriptions()
    this.setStepperNavigation();
    this.setUpForm()
  }

  ngOnDestroy(): void {
    if(this.xeroPayrollSubscription) this.xeroPayrollSubscription.unsubscribe()
  }

  checkId(){
    if(this.id) {this.getOrganizationById();}
    else {this.setUpForm();}
  }

  getPayrollOptions(){
    this.adminOrganization.dispatch({
      type:SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR
    })
  }

  getPayrollOptionsSubscriptions(){
    this.xeroPayrollOptions$ = this.adminOrganization.pipe(select(state => state.syncToXero))

    this.xeroPayrollSubscription = this.xeroPayrollOptions$.subscribe({
      next:(payrollOptions:any) => {

        this.optionsLoading = payrollOptions.pending

        if(payrollOptions.success){
          this.payrollResponse = payrollOptions.success
          this.payrollOptions = this.payrollResponse.map(res => res.name)
          this.adminOrganization.dispatch({
            type: SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR_SUCCESS,
            payload: null
          }); 
          this.checkId()
        }

        if (payrollOptions.error) {
          // this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          //   duration: 4000,
          //   panelClass: 'danger-snackbar'
          // });
          this.adminOrganization.dispatch({
            type: SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR_FAIL,
            payload: null
          });
        }
      }
    })
  }

  getTimeformat(){
    return this.timeFormat.findIndex(el => el === this.organizationData.time_format)
  }

  setUpForm(){
    /* STEP 1 */
    this.organizationDetailsForm = this.formBuilder.group({
      organization_id: [this.organizationData ? this.id : ''],
      organization_register: [this.organizationData ? this.organizationData.organization_register : ''],
      email_address: [this.organizationData ? this.loggedUserData?.email_address : ''],
      
      abn: [this.organizationData ? this.organizationData.abn : ''],
      two_factor_authentication: [this.organizationData ? this.organizationData.two_factor_authentication : ''],
      date_format: [this.organizationData ? (this.organizationData.date_format || 'dd-MM-yyyy') : 'dd-MM-yyyy'],
      time_format: [this.organizationData ? (this.timeFormat[this.getTimeformat()] || '12 Hours AM/PM') : '12 Hours AM/PM'],
      combine_shifts: [this.organizationData ? (this.organizationData.combine_shifts || false) : false],
      show_odometer: [this.organizationData ? (this.organizationData.show_odometer || false) : false],
      login_timeout: [this.organizationData ? (/*this.organizationData.login_timeout*/  '15 mins') : '15 mins'],

      travel_claim_rate:[this.organizationData ? this.organizationData?.travel_claim_rate ? this.organizationData?.travel_claim_rate : 0 : 0, Validators.compose([Validators.required])],
      transport_claim_rate:[this.organizationData ? this.organizationData?.transport_claim_rate ? this.organizationData?.transport_claim_rate : 0 : 0, Validators.compose([Validators.required])],
      travel_pay_rate:[this.organizationData ? this.organizationData?.travel_pay_rate ? this.organizationData?.travel_pay_rate : 0 : 0, Validators.compose([Validators.required])],
      transport_pay_rate:[this.organizationData ? this.organizationData?.transport_pay_rate ? this.organizationData?.transport_pay_rate : 0 : 0, Validators.compose([Validators.required])],

      payroll_calendar_id: [this.organizationData ? this.organizationData?.payroll_calendar_id ? this.payrollResponse ? this.payrollResponse.find(e => e.id === this.organizationData?.payroll_calendar_id)?.name : '' : '' : ''], 
      invoice_tax_type: [this.organizationData ? this.organizationData?.invoice_tax_type : ''], 
      
      enable_branch_scheduling: [this.organizationData?.enable_branch_scheduling != "0" ? this.organizationData.enable_branch_scheduling : false],
      auth_publish_shifts: [this.organizationData?.auth_publish_shifts != "0" ? this.organizationData.auth_publish_shifts : false],
      hide_client_group_shifts: [true/*this.organizationData?.hide_client_group_shifts != "0" ? this.organizationData.hide_client_group_shifts : false*/],
      approve_invoice_cancellation: [this.organizationData?.approve_invoice_cancellation != "0" ? this.organizationData.approve_invoice_cancellation : false],
      auto_approve_timesheets: [this.organizationData?.auto_approve_timesheets != "0" ? this.organizationData.auto_approve_timesheets : false],
      apportion_group_travel: [this.organizationData?.apportion_group_travel != "0" ? this.organizationData.apportion_group_travel : false],
      always_use_qss: [this.organizationData?.always_use_qss != "0" ? this.organizationData.always_use_qss : false],

      smtp_server: [this.organizationData ? this.organizationData.smtp_server : ''],
      smtp_username: [this.organizationData ? this.organizationData.smtp_username : ''],
      smtp_port: [this.organizationData ? this.organizationData.smtp_port : ''],
      smtp_password: [this.organizationData ? this.organizationData.smtp_password : ''],
      smtp_enable_ssl: [this.organizationData ? this.organizationData.smtp_enable_ssl : ''],
      a_h_calculator: [this.organizationData ? this.organizationData.a_h_calculator : "Shift Start"],
    });

    this.addressForm = this.formBuilder.group({
      primary_address: [this.organizationData ? this.organizationData.primary_address : ''],
      address_b: [this.organizationData ? this.organizationData.address_b : ''],
      state: [this.organizationData ? this.organizationData.state : ''],
      post_code: [this.organizationData ? this.organizationData.post_code : ''],
      suburb: [this.organizationData ? this.organizationData.suburb : ''],
      emergency_contact_phone: [this.organizationData ? this.organizationData.emergency_contact_phone : ''],
      fax: [this.organizationData ? this.organizationData.fax : ''],
      after_hrs_phone: [this.organizationData ? this.organizationData.after_hrs_phone : ''],
      website: [this.organizationData ? this.organizationData.website : ''],
      emergency_contact_email: [this.organizationData ? this.organizationData.emergency_contact_email : ''],
    });

    this.planManagementForm = this.formBuilder.group({
      bank: [this.organizationData ? this.organizationData.bank : ''],
      bsb: [this.organizationData ? this.organizationData.bsb : ''],
      acct_number: [this.organizationData ? this.organizationData.acct_number : ''],
      acct_name: [this.organizationData ? this.organizationData.acct_name : ''],
      apca_user_id: [this.organizationData ? this.organizationData.apca_user_id : ''],
      remitter_name: [this.organizationData ? this.organizationData.remitter_name : ''],
      imap_username: [this.organizationData ? this.organizationData.imap_username : ''],
      imap_password: [this.organizationData ? this.organizationData.imap_password : ''],
      imap_server: [this.organizationData ? this.organizationData.imap_server : ''],
      imap_port: [this.organizationData ? this.organizationData.imap_port : ''],
      //plan_management_rounding: [this.organizationData ? this.organizationData.plan_management_rounding : ''],
      //remittenance_email: [this.organizationData ? this.organizationData.remittenance_email : ''],
      //xero_app_id: [this.organizationData ? this.organizationData.xero_app_id : ''],
      //client_id: [this.organizationData ? this.organizationData.client_id : ''],
      //client_secret: [this.organizationData ? this.organizationData.client_secret : ''],
      //redirect_uri: [this.organizationData ? this.organizationData.redirect_uri : '']
    });
  }

  checkFormValidity(e){
    this.steps[e.formStep -1].isStepValid = e.isValid;
  }

  getOrganizationById(){
    this.adminOrganization.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION,
      payload: this.id
    }); 
  }

  subscribeOrganization(){
    this.organizationData$ = this.adminOrganization.pipe(select(state => state.organization));

    this.orgReq =  this.organizationData$.subscribe((organization: any) => {
      this.loading = organization.pending;

      if(organization.organization){
        this.organizationData = organization.organization;
        console.log(this.organizationData)
        this.setUpForm();
      }

      if(organization.success){
        let message = this.id ? "Successfully updated the organization details" : "Successfully added new organization"
        
        this.snackBar.open(message, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        if(!this.id){
          this.router.navigate(['/admin/setup/organization-list']);
          return;
        }

        this.adminOrganization.dispatch({
          type: OrganizationActionTypes.SAVE_ORGANIZATION_SUCCESS,
          payload: {message: null}
        }); 

        this.adminOrganization.dispatch({
          type: OrganizationActionTypes.EDIT_ORGANIZATION_SUCCESS,
          payload: {message: null}
        }); 

        setTimeout(() => location.reload(), 100);
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

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  checkFormDisabled(){
    return this.formStep === 1 
      ? this.organizationDetailsForm.valid : this.formStep === 2 
  }

  getBranchList(){
    this.branch$ = this.adminOrganization.pipe(select(state => state.branch));

    this.req = this.branch$.subscribe((branch: any) => {
      this.branchesLoading = branch.pending;
      this.branchList = branch.branchList;
    });

    this.adminOrganization.dispatch({
      type: BranchActionTypes.GET_BRANCH_LIST,  
      payload: null
    }); 
  }

  save() {
    const { payroll_calendar_id, ...organizationDetailsFormRest } = this.organizationDetailsForm.value

    let organization = {
      ...this.convertFormValuesToNumber(organizationDetailsFormRest),
      payroll_calendar_id: payroll_calendar_id ? this.payrollResponse.find(e => e.name === payroll_calendar_id).id : "",
      ...this.addressForm.value,
      ...this.planManagementForm.value,
      id: parseInt(this.id)
    }
    
    console.log(organization)

    this.formStep = 1;
    this.adminOrganization.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION_SUCCESS,  
      payload: [null]
    }); 
    this.adminOrganization.dispatch({
      type: OrganizationActionTypes.EDIT_ORGANIZATION,  
      payload: organization
    }); 
  }

  convertFormValuesToNumber(formGroup:any){
    let exceptions =['travel_claim_rate','transport_claim_rate', 'travel_pay_rate','transport_pay_rate']
    let controlValues = {...formGroup}
    Object.keys(controlValues).map(res => {

      if(!exceptions.includes(res)) return

      controlValues[res] = +controlValues[res]
    })
    
    return controlValues
  }

  public updateStepper(step: number): void {
    // this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;
    this.setStepperNavigation();
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  setStepperNavigation(){
    if(this.formStep === 1){
      this.getNavigation(OrganizationConstants.organizationDetails)
    } else if (this.formStep === 2) {
      this.getNavigation(OrganizationConstants.contactDetails)
    } else if (this.formStep === 3) {
      this.getNavigation(OrganizationConstants.planManagementSetup)
    } 
  }

  next(){
    this.updateStepper(this.navigation?.next);
  }

  back(){
    this.updateStepper(this.navigation?.previous);
  }

}

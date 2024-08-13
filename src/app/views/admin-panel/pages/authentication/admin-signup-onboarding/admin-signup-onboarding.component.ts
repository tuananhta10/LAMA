import { 
  Component, 
  OnInit, 
  OnDestroy,
  HostListener,
  ViewChild
} from '@angular/core';
import { 
  Router, 
  ActivatedRoute 
} from '@angular/router';
import { 
  FormBuilder, 
  FormGroup, 
  Validators,
  FormControl, 
  FormGroupDirective, 
  NgForm,
} from '@angular/forms';
import { LoginAuthenticationService } from '@app-services/admin-panel/login-authentication.service';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
import { steps } from './stepper-tabs';
import { StepModel } from '@main/shared/components/stepper/model';
import { takeUntil } from 'rxjs/operators';
import { SuccessOnboardingDialogComponent } from '../dialogs/success-onboarding-dialog/success-onboarding-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from '../dialogs/invite-dialog/invite-dialog.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { RegisterOrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-register-organization.action';
import { StepperConstants } from './stepper-constants';  

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-admin-signup-onboarding',
  animations: [mainAnimations],
  templateUrl: './admin-signup-onboarding.component.html',
  styleUrls: ['./admin-signup-onboarding.component.scss']
})
export class AdminSignupOnboardingComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  private postReq? : Subscription;
  private unsubscribe$ = new Subject<void>();
  private req: Subscription;

  public loginForm : FormGroup;
  public message : any = localStorage.getItem('loginMessage');
  public error : any = localStorage.getItem('loginError');
  public submitting: boolean = false;
  public loading: boolean = true;
  public matcher = new MyErrorStateMatcher();
  public formStep: number = 1;
  public steps: any = steps;
  public navigation: object = {};
  public adminSignupOnboardingData:any = {
    organizationDetails: {},
    understandingNeeds: {
      lama_workers_support: []
    },
    safetyInformation: {},
    financeAndLegal: {}
  }

  organization$: any;

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminClient: Store<AdminProfileState>,
    public dialog: MatDialog,
    private signupService: LoginAuthenticationService) { 
  }

  ngOnInit(){
    this.organization$ = this.adminClient.pipe(select(state => state.registerOrganization));
    this.req =  this.organization$.subscribe((org: any) => {
      this.loading = org.pending;
      if(org.success){
        this.openSuccessOnboardingModal();

        this.adminClient.dispatch({
          type: RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION_SUCCESS,
          payload: {message: null}
        });
      }

      if(org.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminClient.dispatch({
          type: RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION_FAIL,
          payload: null
        }); 
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');

    if(this.postReq) this.postReq.unsubscribe();
  }


  public updateStepper(step: number): void {
    this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;
    if (step === 5) {
      this.save();
    }
  }

  public updateStepperClick(step: number): void{
    this.formStep = step;
    this.stepperNavigation();
  }


  stepperNavigation(){
    this.getNavigation(steps[this.formStep - 1].stepName)
  }

  openSuccessOnboardingModal(){
    let successDialog = this.dialog.open(SuccessOnboardingDialogComponent);

    successDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.openInviteModal();
    });
  }

  openInviteModal(){
    let inviteDialog = this.dialog.open(InviteDialogComponent);

    inviteDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      
      this.router.navigate(['/admin/dashboard'])
    });
  }


  public getNavigation(e: any): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  updateOrganizationDetails(e: any) {
    this.adminSignupOnboardingData.organizationDetails = e;
  }

  updateUnderStandingNeeds(e: any) {
    this.adminSignupOnboardingData.understandingNeeds = e;
  }

  updateSafetyInformation(e: any) {
    this.adminSignupOnboardingData.safetyInformation = e;
  }

  updateFinanceAndLegal(e: any) {
    this.adminSignupOnboardingData.financeAndLegal = e;
    console.log(this.adminSignupOnboardingData)
  
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  setStepperNavigation(){
    if(this.formStep === 1){
      this.getNavigation(StepperConstants.overview)
    } else if (this.formStep === 2) {
      this.getNavigation(StepperConstants.understandingYourNeeds)
    } else if (this.formStep === 3) {
      this.getNavigation(StepperConstants.safetyInformation)
    } else if (this.formStep === 4) {
      this.getNavigation(StepperConstants.financeAndLegal)
    } 
  }

  checkFormValidity(e){
    this.steps[e.formStep -1].isStepValid = e.isValid;
  }

  save(){
    const stripeId = localStorage.getItem('stripeId')

    let data = {
      ...this.adminSignupOnboardingData.organizationDetails,
      ...this.adminSignupOnboardingData.understandingNeeds,
      ...this.adminSignupOnboardingData.safetyInformation,
      ...this.adminSignupOnboardingData.financeAndLegal,
      stripe_id: stripeId
    }
    
    this.snackBar.open(`Please wait. Your onboarding form are being processed...`, ' ', {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    delete data['gst_code_input'];
    data.insurance_expiration = data.insurance_expiration ? this.convertToDateTime(data?.insurance_expiration) : data.insurance_expiration;
    
    console.log(data)

    this.postReq = this.signupService
    .saveAdminOnboarding(data)
    .subscribe((result: any) => {
      if(result){
        const loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));
        localStorage.removeItem('stripeId')
        loggedUser["organization_id"] = result?.data[0]?.id;
        localStorage.setItem('loggedUserData', JSON.stringify(loggedUser));

        this.updateOrganizationId(loggedUser?.id, result?.data[0]?.id);
      }
    });
  }

  // update admin organization
  updateOrganizationId(admin_id: string, org_id: string){
    const body = {
      id: admin_id,
      organization_id:org_id
    }

    this.snackBar.open(`Please wait. Your onboarding form are being processed...`, ' ', {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    this.signupService
    .updateAdminOrganization(body)
    .subscribe((result: any) =>{
      let onboardingData = result;

      this.onboardingCondition(onboardingData);
    }, err => console.log(err))
  }


  onboardingCondition(onboardingData){
    if(onboardingData){
      this.snackBar.open(`Successfully updated your organisation. Redirecting to your Admin Dashboard now.`, ' ', {
        duration: 4000,
        panelClass:'success-snackbar'
      });

      const loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));

      loggedUser["access_token"] = onboardingData?.data[0]?.access_token;
      loggedUser["refresh_token"] = onboardingData?.data[0]?.refresh_token;
      loggedUser["new_organization"] = "Newly Registered";//result?.data[0]?.refresh_token;
      loggedUser["organization_id"] = onboardingData?.data[0]?.organization_id;
      
      localStorage.setItem('token', loggedUser["access_token"]);
      localStorage.setItem('loggedUserData', JSON.stringify(loggedUser));

      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 1500);
    }
  }

  stripeCondition(stripeData: any){
    console.log(stripeData)
    if(stripeData?.data){
      //sessionStorage.setItem('stripeCustomer', JSON.stringify(stripeData?.data));
    }
        
  }

  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');
    this.error   = undefined;
    this.message = undefined;
  }

}

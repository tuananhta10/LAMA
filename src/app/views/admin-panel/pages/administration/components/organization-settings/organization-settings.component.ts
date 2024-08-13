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
import { MatDialog } from '@angular/material/dialog';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { RegisterOrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-register-organization.action';
import { StepperConstants } from './stepper-constants';  
import { OrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-organization.action';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-organization-settings',
  animations: [mainAnimations],
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.scss']
})
export class OrganizationSettingsComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  private postReq? : Subscription;
  private organizationData$: any;
  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  private orgReq: Subscription;
  private organization$: any;

  public loginForm : FormGroup;
  public message : any = localStorage.getItem('loginMessage');
  public error : any = localStorage.getItem('loginError');
  public submitting: boolean = false;
  public loading: boolean = true;
  public matcher = new MyErrorStateMatcher();
  public formStep: number = (parseInt(sessionStorage.getItem('org-details-step'))) || 1;
  public steps: any = steps;
  public navigation: object = {};
  public organizationData: any = {};
  public id: any = '';
  public adminSignupOnboardingData:any = {
    organizationDetails: {},
    understandingNeeds: {
      lama_workers_support: []
    },
    safetyInformation: {},
    financeAndLegal: {}
  }
  public oldData: any = {};

  public insuranceOptions:any = [{id:1, value: "Less than $10 million", name: "Less than $10 million"}, {id:2, value: "$10 million or more", name:"$10 million or more"}]
  public gstCodes: any[] = [
    { value: "P1", text: "P1: Tax Claimable (10%)" },
    { value: "P2", text: "P2: GST Free" },
    { value: "P5", text: "P5: GST out of Scope" },
  ];
  public gstCodeOptions = this.gstCodes.map(el => el.text);
  public useLamaOptions: any = [
    {id:1, value: "Schedule and fill shifts", name: "Schedule and fill shifts"}, 
    {id:2, value: "Track referral pipeline", name:"Track referral pipeline"},
    {id:3, value: "Manage employee and participant data", name:"Manage employee and participant data"},
    {id:4, value: "Replace our current CMS", name:"Replace our current CMS"}, 
    {id:5, value: "All of the above", name:"All of the above"},
    {id:6, value: "Other", name:"Other"}
  ];
  
  public participantNumberOptions: any = [
    {id:1, value: "Schedule and fill shifts", name: "Schedule and fill shifts"}, 
    {id:2, value: "Track referral pipeline", name:"Track referral pipeline"},
    {id:3, value: "Manage employee and participant data", name:"Manage employee and participant data"},
    {id:4, value: "Replace our current CMS", name:"Replace our current CMS"}, 
    {id:5, value: "All of the above", name:"All of the above"},
    {id:6, value: "Other", name:"Other"}
  ];
  
  public checkBoxOptions:any = [
    {label: "Client's private home", checked: false}, 
    {label: "Client's accommodation with another provider", checked: false}, 
    {label: "Our accommodation - SDA", checked: false},
    {label: "Our accommodation - SIL", checked: false}, 
    {label: "Our accommodation – MTA/respite/short term", checked: false}, 
    {label: "Our day centre", checked: false},
    {label: "Out and about in the community", checked: false},
    {label: "Other", checked: false}
  ];
  public loggedUserData = JSON.parse(localStorage.getItem('loggedUserData'))

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private adminOrganization: Store<AdminProfileState>,
    private signupService: LoginAuthenticationService) { 
    this.id = this.loggedUserData?.organization_id;
  }

  mapData(){
    if(this.organizationData){
      this.steps.forEach(el => el['isValid'] = true);

      this.adminSignupOnboardingData.organizationDetails['logo'] =  this.organizationData?.logo ? (this.organizationData?.logo[0] || ""): '';
      this.adminSignupOnboardingData.organizationDetails['organization_register'] = this.organizationData?.organization_register;
      this.adminSignupOnboardingData.organizationDetails['organization_registration_number'] =  this.organizationData?.organization_registration_number;
      this.adminSignupOnboardingData.organizationDetails['trading_name'] =  this.organizationData?.trading_name;
      this.adminSignupOnboardingData.organizationDetails['abn'] =  this.organizationData?.abn;
      this.adminSignupOnboardingData.organizationDetails['is_ndis_provider'] =  this.organizationData?.is_ndis_provider;
      this.adminSignupOnboardingData.organizationDetails['website'] =  this.organizationData?.website;
      this.adminSignupOnboardingData.organizationDetails['primary_address'] =  this.organizationData?.primary_address;
      this.adminSignupOnboardingData.organizationDetails['phone'] =  this.organizationData?.phone;
      this.adminSignupOnboardingData.organizationDetails['primary_email'] =  this.organizationData?.primary_email;
      this.adminSignupOnboardingData.organizationDetails['about_us'] =  this.organizationData?.about_us;

      this.adminSignupOnboardingData.understandingNeeds['use_lama'] =  this.organizationData?.use_lama;
      this.adminSignupOnboardingData.understandingNeeds['use_lama_other'] = this.organizationData?.use_lama_other;
      this.adminSignupOnboardingData.understandingNeeds['participant_number'] =  this.organizationData?.participant_number;
      this.adminSignupOnboardingData.understandingNeeds['lama_workers_support'] =  this.adminSignupOnboardingData.understandingNeeds['lama_workers_support'] ? this.organizationData?.lama_workers_support : [];
      this.adminSignupOnboardingData.understandingNeeds['lama_workers_support_other'] =  this.organizationData?.lama_workers_support_other;

      this.adminSignupOnboardingData.safetyInformation['emergency_process'] =  this.organizationData?.emergency_process;
      this.adminSignupOnboardingData.safetyInformation['emergency_contact_name'] = this.organizationData?.emergency_contact_name;
      this.adminSignupOnboardingData.safetyInformation['emergency_contact_role'] =  this.organizationData?.emergency_contact_role;
      this.adminSignupOnboardingData.safetyInformation['emergency_contact_phone'] =  this.organizationData?.emergency_contact_phone;
      this.adminSignupOnboardingData.safetyInformation['emergency_contact_email'] =  this.organizationData?.emergency_contact_email;
      this.adminSignupOnboardingData.safetyInformation['incident_process'] =  this.organizationData?.incident_process;

      let gst = this.gstCodes.find(el => el?.value == this.organizationData['gst_code']);  
      let insurance = this.organizationData['liability_insurance'] * 1  //this.insuranceOptions.find(el => el.value == this.organizationData['liability_insurance']);  

      this.adminSignupOnboardingData.financeAndLegal['insurance_expiration'] = this.organizationData?.insurance_expiration > 0 ? new Date(this.organizationData?.insurance_expiration * 1000) : ''; 
      this.adminSignupOnboardingData.financeAndLegal['liability_insurance'] = insurance;
      this.adminSignupOnboardingData.financeAndLegal['gst_code'] = gst?.value;
      this.adminSignupOnboardingData.financeAndLegal['gst_code_input'] = gst?.text;
      this.adminSignupOnboardingData.financeAndLegal['payment_terms'] = this.organizationData?.payment_terms;

      this.adminSignupOnboardingData.financeAndLegal['bank'] = this.organizationData?.bank;
      this.adminSignupOnboardingData.financeAndLegal['bsb'] = this.organizationData?.bsb;
      this.adminSignupOnboardingData.financeAndLegal['acct_number'] = this.organizationData?.acct_number;
      this.adminSignupOnboardingData.financeAndLegal['acct_name'] = this.organizationData?.acct_name;

      // old data
      this.oldData = {...this.adminSignupOnboardingData};
    }
  }

  ngOnInit(){
    this.organization$ = this.adminOrganization.pipe(select(state => state.registerOrganization));
    this.subscribeOrganization();
    this.adminOrganization.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION,
      payload: this.id
    }); 

    console.log(this.adminSignupOnboardingData)
  }

  ngOnDestroy(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');
    sessionStorage.removeItem('org-details-step');
    sessionStorage.clear();
    if(this.postReq) this.postReq.unsubscribe();
  }

  subscribeOrganization(){
    this.organizationData$ = this.adminOrganization.pipe(select(state => state.organization));

    this.orgReq =  this.organizationData$.subscribe((organization: any) => {
      this.loading = organization.pending;

      if(organization.organization){
        this.organizationData = organization.organization;
        if(this.organizationData) 
          this.mapData();
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

  // return object equality value
  objectsEqual(obj1, obj2):boolean {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (JSON.stringify(obj1[key] || null) !== JSON.stringify(obj2[key] || null)) {
        return false;
      }
    }

    return true;
  }

  public updateStepper(step: number): void {
    // SAVE CONDITIONG
    if(this.formStep === 1){
      if(!this.objectsEqual(this.oldData?.organizationDetails, this.adminSignupOnboardingData?.organizationDetails)){
        
        console.log("UPDATE", this.oldData?.organizationDetails, this.adminSignupOnboardingData?.organizationDetails)

        this.save()
      }
    }

    else if(this.formStep === 2){
      if(!this.objectsEqual(this.oldData?.understandingNeeds, this.adminSignupOnboardingData?.understandingNeeds)){
        console.log("UPDATE", this.oldData?.understandingNeeds, this.adminSignupOnboardingData?.understandingNeeds)

        this.save()
      }
    }

    else if(this.formStep === 3){
      if(!this.objectsEqual(this.oldData?.safetyInformation, this.adminSignupOnboardingData?.safetyInformation)){
        this.save()
      }
    }

    else if(this.formStep === 4 || this.formStep === 5){
      if(!this.objectsEqual(this.oldData?.financeAndLegal, this.adminSignupOnboardingData?.financeAndLegal)){
        console.log(this.oldData?.financeAndLegal, this.adminSignupOnboardingData?.financeAndLegal)

        step = 4;
        this.save()
      }
    }

    // Update Steps
    if(step === 5) step = 4;

    this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;

    sessionStorage.setItem('org-details-step', step + '');
  }

  public updateStepperClick(step: number): void{
    this.formStep = step;
    this.stepperNavigation();
  }

  stepperNavigation(){
    this.getNavigation(steps[this.formStep - 1].stepName)
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
    this.updateStepper(this.formStep);
  }

  updateUnderStandingNeeds(e: any) {
    this.adminSignupOnboardingData.understandingNeeds = e;
    this.updateStepper(this.formStep);
  }

  updateSafetyInformation(e: any) {
    this.adminSignupOnboardingData.safetyInformation = e;
    this.updateStepper(this.formStep);
  }

  updateFinanceAndLegal(e: any) {
    this.adminSignupOnboardingData.financeAndLegal = e;
    this.updateStepper(this.formStep);
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
    } else if (this.formStep === 4 || this.formStep === 5) {
      this.getNavigation(StepperConstants.financeAndLegal)
    } 
  }

  checkFormValidity(e){
    this.steps[this.formStep - 1].isStepValid = e.isValid;
  }

  save(){
    let data = {
      id: parseInt(this.id),
      ...this.adminSignupOnboardingData.organizationDetails,
      ...this.adminSignupOnboardingData.understandingNeeds,
      ...this.adminSignupOnboardingData.safetyInformation,
      ...this.adminSignupOnboardingData.financeAndLegal
    }

    this.snackBar.open(`Please wait. Your organisation details are being updated...`, ' ', {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    delete data['gst_code_input'];
    data.insurance_expiration = data.insurance_expiration ? this.convertToDateTime(data?.insurance_expiration) : data.insurance_expiration;

    //this.formStep = 1;
    this.adminOrganization.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION_SUCCESS,  
      payload: [null]
    }); 
    this.adminOrganization.dispatch({
      type: OrganizationActionTypes.EDIT_ORGANIZATION,  
      payload: data
    }); 
  }

  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');
    this.error   = undefined;
    this.message = undefined;
  }

}

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
import { Router, ActivatedRoute } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { branchSteps } from './branch-stepper-tabs';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { BranchStepperConstants } from './branch-stepper-constants';
import { contactSteps } from './contact-stepper-tabs';
import { ContactStepperConstants } from './contact-stepper-constants';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { BranchActionTypes } from '@main/views/admin-panel/store/actions/admin-branch.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-branch-setup',
  animations: [mainAnimations],
  templateUrl: './branch-setup.component.html',
  styleUrls: ['./branch-setup.component.scss']
})
export class BranchSetupComponent implements OnInit {
  public mainStep: any = 'branch-details';
  public branchDetailsForm: FormGroup;
  public travelSetupForm: FormGroup;
  public supportAppForm: any[] = [];
  public portalForm: FormGroup;
  public branchId:any;

  public addressForm: FormGroup;
  public letterHeadForm: FormGroup;
  public serviceAgreementForm: FormGroup;

  public formStep: any = 1;
  public branchSteps$: any = branchSteps;
  public navigation: any = {};
  @ViewChild('branchStepper') branchStepper: MatStepper;

  public formStepContact: any = 1;
  public contactSteps$: any = contactSteps;
  public navigationContact: any = {};
  @ViewChild('contactStepper') contactStepper: MatStepper;

  public loading: boolean = true;
  private branch$: any;
  public branchData: any;
  private req: Subscription;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public id: any = '';
  public stateObj: any[] = [
    {
      title: "Western Australia",
      state: "WA"
    },

    {
      title: "Victoria",
      state: "VIC"
    },

    {
      title: "New South Wales",
      state: "NSW"
    },

    {
      title: "Australian Capital Territory",
      state: "ACT"
    },

    {
      title: "Queensland",
      state: "QLD"
    },

    {
      title: "Tasmania",
      state: "TAS"
    },

    {
      title: "Northern Territory",
      state: "NT"
    },
  ];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private adminBranch: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    /* STEP 1 */
    if(this.id){
      this.getBranchById()
    } else {
      this.setUpForm()
    }

    this.subcribeBranches();
    this.branchStepperNavigation();
  }

  getBranchById(){
    this.adminBranch.dispatch({
      type: BranchActionTypes.GET_BRANCH,
      payload: this.id
    });
  }

  subcribeBranches(){
    this.branch$ = this.adminBranch.pipe(select(state => state.branch));

    this.req = this.branch$.subscribe((branch: any) => {
      this.loading = branch.pending;

      if(branch.branch){
        this.branchData = branch.branch;
        this.setUpForm();
      }

      if(branch.success && !branch.pending){
        let message = this.id ? "Successfully updated the branch details" : "Successfully added new branch"
        
        this.snackBar.open(message, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        if(!this.id){
          this.router.navigate(['/admin/setup/branch-list']);
          return;
        }

        else {
          this.adminBranch.dispatch({
            type: BranchActionTypes.SAVE_BRANCH_SUCCESS,
            payload: {message: null}
          });

          this.adminBranch.dispatch({
            type: BranchActionTypes.EDIT_BRANCH_SUCCESS,
            payload: {message: null}
          });

          setTimeout(() => location.reload(), 2000);
        }
      }

      if(branch.error && !branch.pending){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminBranch.dispatch({
          type: BranchActionTypes.SAVE_BRANCH_FAIL,
          payload: {message: null}
        }); 

        this.adminBranch.dispatch({
          type: BranchActionTypes.EDIT_BRANCH_FAIL,
          payload: {message: null}
        }); 
      }
    })
  }

  setUpForm(){
    this.branchDetailsForm = this.formBuilder.group({
      name: [this.branchData ? this.branchData.name : '', [Validators.required]],
      gst: [this.branchData ? this.branchData.gst : '', [Validators.required]],
      code: [this.branchData ? this.branchData.code : '', [Validators.required]],
      timezone: [this.branchData ? this.branchData.timezone : '', [Validators.required]],
      organization: [this.loggedUser?.organization_id, [Validators.required]],
    });

    this.travelSetupForm = this.formBuilder.group({
      hrs_between_shifts: [this.branchData ? this.branchData.hrs_between_shifts : '12:00:00'],
      travel_reset_hrs: [this.branchData ? this.branchData.travel_reset_hrs : '13:00:00'],
      travel_time_pay_item: [this.branchData ? this.branchData.travel_time_pay_item : ''],
      travel_km_pay_item: [this.branchData ? this.branchData.travel_km_pay_item : ''],
      invoice_footer_left: [this.branchData ? this.branchData.invoice_footer_left : ''],
      invoice_footer_right: [this.branchData ? this.branchData.invoice_footer_right : ''],
      include_employee_names: [this.branchData ? this.branchData.include_employee_names : ''],
      invoice_show_times: [this.branchData ? this.branchData.invoice_show_times : ''],
    });

    /*this.portalForm = this.formBuilder.group({
      show_portal_funding: [this.branchData ? this.branchData.show_portal_funding : undefined],
      show_portal_all_documents: [this.branchData ? this.branchData.show_portal_all_documents : undefined],
      show_client_plan_balances: [this.branchData ? this.branchData.show_client_plan_balances : undefined],
      show_client_service_history: [this.branchData ? this.branchData.show_client_service_history : undefined],
      allow_client_service_request: [this.branchData ? this.branchData.allow_client_service_request : undefined],
    });


*/

    let stateIndex = this.stateObj?.findIndex(el => el?.state?.toLowerCase() == this.branchData?.state.toLowerCase())

    this.addressForm = this.formBuilder.group({
      address_a: [this.branchData ? this.branchData?.address_a : '', [Validators.required]],
      address_b: [this.branchData ? this.branchData?.address_b : ''],
      suburb: [this.branchData ? this.branchData?.suburb : '', [Validators.required]],
      state: [this.branchData ?  this.stateObj[stateIndex]?.state : '', [Validators.required]],
      post_code: [this.branchData ? this.branchData?.post_code : '', [Validators.required]],
      country: [this.branchData ? this.branchData?.country : '', [Validators.required]],  
    });

    this.letterHeadForm = this.formBuilder.group({
      phone: [this.branchData ? this.branchData?.phone : '', [Validators.required]],
      email_address: [this.branchData ? this.branchData?.email_address : '', [Validators.required]],
      letter_head: [this.branchData ? this.branchData?.letter_head : ''],
    });

    /*this.serviceAgreementForm = this.formBuilder.group({
      agreement_form: [this.branchData ? this.branchData.agreement_form : ''],
    });*/

    if(this.branchData){
       this.supportAppForm = this.branchData?.support_worker_app;
       //console.log(this.branchData)
    } 
     
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  checkFormDisabled(){
    /*if(this.mainStep === 'branch-details'){
      return this.formStep === 1 
      ? this.branchDetailsForm.valid : this.formStep === 2 
      ? this.travelSetupForm.valid : this.formStep === 3 
      ? this.supportAppForm?.length > 0 : this.formStep === 4 
      ? this.addressForm?.valid  : this.formStep === 5 
      ? this.letterHeadForm?.valid : this.formStep === 6 
    }*/

    /*if(this.mainStep === 'branch-details'){
      return this.formStep === 1 
      ? this.branchDetailsForm.valid : this.formStep === 2 
      ? this.addressForm?.valid  : this.formStep === 3 
      ? this.letterHeadForm?.valid : this.formStep === 4 
    }*/

    return this.branchDetailsForm.valid 
    && this.travelSetupForm.valid 
    && this.addressForm?.valid 
    && this.letterHeadForm?.valid
  }

  save() {
    if(!this.id){
      let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));
      let branch = {
        ...this.branchDetailsForm.value,
        ...this.travelSetupForm.value,
        //'support_worker_app': this.supportAppForm,
        //...this.portalForm.value,
        ...this.addressForm.value,
        ...this.letterHeadForm.value,
        //...this.serviceAgreementForm.value,
        organization_id: loggedUser?.organization_id
      }
  
      this.adminBranch.dispatch({
        type: BranchActionTypes.SAVE_BRANCH,
        payload: branch
      }); 
    } else {
      let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));
      let branch = {
        ...this.branchDetailsForm.value,
        ...this.travelSetupForm.value,
        //'support_worker_app': this.supportAppForm,
        //...this.portalForm.value,
        ...this.addressForm.value,
        ...this.letterHeadForm.value,
        //...this.serviceAgreementForm.value,
        organization_id: loggedUser?.organization_id,
        id: parseInt(this.id)
      }
  
      this.adminBranch.dispatch({
        type: BranchActionTypes.EDIT_BRANCH,
        payload: branch
      }); 
    }

  }

  branchStepperNavigation(){
    /*if(this.formStep === 1){
      this.getNavigationBranches(BranchStepperConstants.branchesDetails)
    } else if (this.formStep === 2) {
      this.getNavigationBranches(BranchStepperConstants.travelAndInvoiceSetup)
    } else if (this.formStep === 3) {
      this.getNavigationBranches(BranchStepperConstants.supportWorkerApp)
    } else if (this.formStep === 4) {
      this.getNavigationBranches(BranchStepperConstants.portalAndClientApp)
    } else if (this.formStep === 5) {
      this.getNavigationBranches(BranchStepperConstants.address)
    } else if (this.formStep === 6) {
      this.getNavigationBranches(BranchStepperConstants.contactAndLetterHead)
    }*/

    if(this.formStep === 1){
      this.getNavigationBranches(BranchStepperConstants.branchesDetails)
    } else if (this.formStep === 2) {
      this.getNavigationBranches(BranchStepperConstants.travelAndInvoiceSetup)
    } else if (this.formStep === 3) {
      this.getNavigationBranches(BranchStepperConstants.address)
    } else if (this.formStep === 4) {
      this.getNavigationBranches(BranchStepperConstants.contactAndLetterHead)
    }
  }

  public updateStepperBranches(step: number): void {
    //this.formStep < step ? this.branchStepper.next() : this.branchStepper.previous();
    this.formStep = step;
    this.branchStepperNavigation();

    /*if(step === 5){
      this.formStep = 4;
      this.navigation = {
        next: 5,
        previous: 3
      };
      this.mainStep = 'contact-details'
      this.contactStepperNavigation();
    }*/
  }

  checkFormValidity(e){
    this.branchSteps$[e.formStep -1].isStepValid = e.isValid;
  }

  public getNavigationBranches(e: string): void {
    const stepIndex = this.branchSteps$.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  nextBranches(){
    this.updateStepperBranches(this.navigation?.next);
  }

  backBranches(){
    this.updateStepperBranches(this.navigation?.previous);
  }

  goToContactDetails(){
    this.formStep = 4;
    this.navigation = {
      next: 3,
      previous: 2
    };
    this.mainStep = 'contact-details'
    this.contactStepperNavigation();
  }

  contactStepperNavigation(){
    if(this.formStepContact === 1){
      this.getNavigationContact(ContactStepperConstants.address)
    } 

    else if (this.formStepContact === 2) {
      this.getNavigationContact(ContactStepperConstants.contactAndLetterHead)
    } 

  }

  public updateStepperContact(step: number): void {
    //this.formStepContact < step ? this.contactStepper.next() : this.contactStepper.previous();
    this.formStepContact = step;

    this.contactStepperNavigation();

    if(step === 0){
      this.formStepContact = 1;
      this.mainStep = 'branch-details'
    }
  }

  public getNavigationContact(e: string): void {
    const stepIndex = this.contactSteps$.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigationContact = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  nextContact(){
    this.updateStepperContact(this.navigationContact?.next);
  }

  backContact(){
    if(this.formStepContact > 1){
      this.updateStepperContact(this.navigationContact?.previous);
    }

    else {
      this.loading = true;

      setTimeout(() => {
        // this.formStep = 4;
        // this.navigation = {
        //   next: 5,
        //   previous: 3
        // }
        this.mainStep = 'branch-details';
        this.branchStepperNavigation();
        this.loading = false;
        console.log("NAVIGATION", this.navigation)
      }, 1500);
      
    }
  }

}
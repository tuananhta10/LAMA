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

import { referralSteps } from './referral-tabs';
import { ReferralConstants } from './referral-stepper-constant';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReferralActionTypes } from '@main/views/admin-panel/store/actions/admin-referral.action';

@Component({
  selector: 'app-referrals-create',
  animations: [mainAnimations],
  templateUrl: './referrals-create.component.html',
  styleUrls: ['./referrals-create.component.scss']
})
export class ReferralsCreateComponent implements OnInit {

  private branch$: any;
  private referralData$: any;
  private req: Subscription;
  private referralReq: Subscription;
  public participantDetailsForm: FormGroup;
  public serviceDetailsForm: FormGroup;
  public referralDetailsForm: FormGroup;
  public additionalReportsForm: FormGroup;

  public formStep: any = 1;
  public loading: boolean = false;
  public branchesLoading: boolean = false;
  public branchList: any[] = null;
  public steps: any = referralSteps;
  public navigation: any = {};
  public id: any = '';
  public referralData: any = {};
  public timeFormat: string[] = ["24 Hours", "12 Hours AM/PM"];
  public isEdit: boolean = false;
  //public referralTypeList: string[] = ["participant-detail", "service-detail", "referrer-detail", "additional-report"]

  public toBeUpdated: boolean = false;
  public stepper: number = 1;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private adminReferral: Store<AdminProfileState>,
    private snackBar: MatSnackBar,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id){
      this.isEdit = true;
      this.getReferralData();
    }  
    
    this.subscribeReferral()
    this.setStepperNavigation();
  }

  getTimeformat(){
    return this.timeFormat.findIndex(el => el === this.referralData?.time_format)
  }

  setUpForm(){
    /* STEP 1 */
    this.participantDetailsForm = this.formBuilder.group({
      first_name: [this.referralData && this.id ? this.referralData?.first_name : '', [Validators.required]],
      last_name: [this.referralData && this.id ? this.referralData?.last_name : '', [Validators.required]],
      preferred_name: [this.referralData && this.id ? this.referralData?.preferred_name : ''],
      email_address: [this.referralData && this.id ? this.referralData?.email_address : '', [Validators.required]],
      birthdate: [this.referralData?.birthdate ? new Date(this.referralData?.birthdate * 1000) : null],
      age: [this.referralData && this.id ? this.referralData?.age : ''],
      address_a: [this.referralData && this.id ? this.referralData?.address_a : '', [Validators.minLength(5)]],
      suburb: [this.referralData && this.id ? this.referralData?.suburb : '', [Validators.minLength(5)]],
      state: [this.referralData && this.id ? this.referralData?.state : ''],
      post_code: [this.referralData && this.id ? this.referralData?.post_code : null, [Validators.maxLength(4), Validators.minLength(4)]],
      mobile_phone_no: [this.referralData && this.id ? this.referralData?.mobile_phone_no : '', [Validators.required]],
      background: [this.referralData && this.id ? this.referralData?.background : ''],
      background_other: [this.referralData && this.id ? this.referralData?.background_other : ''],
      emergency_contact_name: [this.referralData && this.id ? this.referralData?.emergency_contact_name : ''],
      emergency_contact_no: [this.referralData && this.id ? this.referralData?.emergency_contact_no : ''],  
      emergency_contact_relationship: [this.referralData && this.id ? this.referralData?.emergency_contact_relationship : ''],
      main_branch_id: [this.referralData?.branch && this.id ? this.referralData?.branch?.id : ''],
      status: [this.referralData && this.id ? this.referralData?.status : 'Referral Received'],
      
      referred_by_other: [this.referralData && this.referralData?.referred_by_other != 0 ? true : false],
      representative_first_name: [this.referralData && this.id ? this.referralData?.representative_first_name : ''],
      representative_last_name: [this.referralData && this.id ? this.referralData?.representative_last_name : ''],
      representative_relationship: [this.referralData && this.id ? this.referralData?.representative_relationship : ''],
      representative_address_a: [this.referralData && this.id ? this.referralData?.representative_address_a : ''],
      representative_suburb: [this.referralData && this.id ? this.referralData?.representative_suburb : ''],
      representative_state: [this.referralData && this.id ? this.referralData?.representative_state : ''], 
      representative_email_address: [this.referralData && this.id ? this.referralData?.representative_email_address : ''],
      representative_post_code: [this.referralData && this.id ? this.referralData?.representative_post_code : ''],
      representative_mobile_phone_no: [this.referralData && this.id ? this.referralData?.representative_mobile_phone_no : ''],
    });

    this.serviceDetailsForm = this.formBuilder.group({
      ndis_participant_number: [this.referralData && this.id ? this.referralData?.ndis_participant_number : ''],  
      ndis_plan_start_date: [this.referralData?.ndis_plan_start_date && this.id ? new Date(this.referralData?.ndis_plan_start_date * 1000) : ''],  
      ndis_plan_end_date: [this.referralData?.ndis_plan_end_date && this.id ? new Date(this.referralData?.ndis_plan_end_date * 1000) : ''],  
      ndis_funding: [this.referralData && this.id ? this.referralData?.ndis_funding : ''],  
      disability_type: [this.referralData && this.id ? this.referralData?.disability_type : '', [Validators.required]],  
      disability_type_other: [this.referralData && this.id ? this.referralData?.disability_type_other : ''],
      doctor_name: [this.referralData && this.id ? this.referralData?.doctor_name : ''],  
      clinic_name: [this.referralData && this.id ? this.referralData?.clinic_name : ''],  
      doctor_phone_no: [this.referralData && this.id ? this.referralData?.doctor_phone_no : ''],
      identified_risk: [this.referralData && this.id ? this.referralData?.identified_risk : ''],
      services_referred: [this.referralData && this.id ? this.referralData?.services_referred : ''],
      plan_manager_name: [this.referralData && this.id ? this.referralData?.plan_manager_name : ''],
      plan_manager_agency: [this.referralData && this.id ? this.referralData?.plan_manager_agency : ''],
      plan_manager_work_phone: [this.referralData && this.id ? this.referralData?.plan_manager_work_phone : ''],
      plan_manager_email: [this.referralData && this.id ? this.referralData?.plan_manager_email : ''],

      ndis_plan: [this.referralData && this.id ? this.referralData?.ndis_plan : null],     
      ndis_plan_file: [this.referralData && this.id ? this.referralData?.ndis_plan_file : null],    
      'referral-goal':  [this.referralData && this.id ? this.referralData['referral-goal'] : {add: [], update: [], delete: [] }],     
    });

    this.referralDetailsForm = this.formBuilder.group({
      referral_date: [this.referralData && this.id ? this.convertToDate(this.referralData?.referral_date) : new Date()],  
      referrer_contact_phone_no: [this.referralData && this.id ? this.referralData?.referrer_contact_phone_no : ''],  
      referrer_email_address: [this.referralData && this.id ? this.referralData?.referrer_email_address : ''],  
      referrer_organization_name: [this.referralData && this.id ? this.referralData?.referrer_organization_name : ''],  
      referrer_organization_address: [this.referralData && this.id ? this.referralData?.referrer_organization_address : ''],  
      reason_for_referral: [this.referralData && this.id ? this.referralData?.reason_for_referral?.filter(el => !el?.match('delim')) || [] : []],  
      referrer_first_name: [this.referralData && this.id ? this.referralData?.referrer_first_name || "" : ''], 
      referrer_last_name: [this.referralData && this.id ? this.referralData?.referrer_last_name || "" : ''], 
      referral_source: [this.referralData && this.id ? this.referralData?.referral_source || "" : ''], 
      assigned_to: [this.referralData?.employee && this.id ? (this.referralData?.employee?.id || "") : ''], 
      other_medical_social_history: [this.referralData && this.id ? this.referralData?.other_medical_social_history : ''],  
      
      allocate_staff: [this.referralData?.employee && this.referralData?.employee?.id ? true : false], 
    });

    this.additionalReportsForm = this.formBuilder.group({
      health_summary: [this.referralData && this.id ? this.referralData?.health_summary : null],
      specialist_reports: [this.referralData && this.id ? this.referralData?.specialist_reports : null],  
      //ndis_plan: [this.referralData && this.id ? this.referralData?.ndis_plan : null],  
      
      health_summary_file: [this.referralData && this.id ? this.referralData?.health_summary_file : null],
      specialist_reports_file: [this.referralData && this.id ? this.referralData?.specialist_reports_file : ''],  
      ndis_plan_file: [this.referralData && this.id ? this.referralData?.ndis_plan_file : null],  
      
      safety_issue_unit_text: [this.referralData && this.id ? this.referralData?.safety_issue_unit_text : ''],  
      adequate_parking: [this.referralData && this.id ? this.referralData?.adequate_parking : null],  
      animal_restrained: [this.referralData && this.id ? this.referralData?.animal_restrained : null],  
      mobile_phone_coverage: [this.referralData && this.id ? this.referralData?.mobile_phone_coverage : null],  
      smoke_in_home: [this.referralData && this.id ? this.referralData?.smoke_in_home : null],  
      safety_issue_unit: [this.referralData && this.id ? this.referralData?.safety_issue_unit : null],
      'referral-comment': [this.referralData && this.id ? this.referralData['referral-comment'] : {add: [], update: [], delete: [] }],
    });

    this.subsribeAutoSave();
  }

  subsribeAutoSave(){
    /* VALUE CHANGE */
    this.participantDetailsForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        first_name: this.referralData && this.id ? this.referralData?.first_name : '', 
        last_name: this.referralData && this.id ? this.referralData?.last_name : '', 
        preferred_name: this.referralData && this.id ? this.referralData?.preferred_name : '',
        email_address: this.referralData && this.id ? this.referralData?.email_address : '', 
        birthdate: this.referralData?.birthdate ?  new Date(this.referralData?.birthdate * 1000) : null,
        age: this.referralData && this.id ? this.referralData?.age : '',
        address_a: this.referralData && this.id ? this.referralData?.address_a : '',
        suburb: this.referralData && this.id ? this.referralData?.suburb : '',
        state: this.referralData && this.id ? this.referralData?.state : '',
        post_code: this.referralData && this.id ? this.referralData?.post_code : null, 
        mobile_phone_no: this.referralData && this.id ? this.referralData?.mobile_phone_no : '', 
        background: this.referralData && this.id ? this.referralData?.background : '',
        background_other: this.referralData && this.id ? this.referralData?.background_other : '',
        emergency_contact_name: this.referralData && this.id ? this.referralData?.emergency_contact_name : '',
        emergency_contact_no: this.referralData && this.id ? this.referralData?.emergency_contact_no : '',  
        emergency_contact_relationship: this.referralData && this.id ? this.referralData?.emergency_contact_relationship : '',
        main_branch_id: this.referralData?.branch && this.id ? (this.referralData?.branch?.id || null) : '',
        status: this.referralData && this.id ? this.referralData?.status : 'Draft',
        
        referred_by_other: this.referralData && this.referralData?.referred_by_other != 0 ? true : false,
        representative_first_name: this.referralData && this.id ? this.referralData?.representative_first_name : '',
        representative_last_name: this.referralData && this.id ? this.referralData?.representative_last_name : '',
        representative_relationship: this.referralData && this.id ? this.referralData?.representative_relationship : '',
        representative_address_a: this.referralData && this.id ? this.referralData?.representative_address_a : '',
        representative_suburb: this.referralData && this.id ? this.referralData?.representative_suburb : '',
        representative_state: this.referralData && this.id ? this.referralData?.representative_state : '', 
        representative_email_address: this.referralData && this.id ? this.referralData?.representative_email_address : '',
        representative_post_code: this.referralData && this.id ? this.referralData?.representative_post_code : '',
        representative_mobile_phone_no: this.referralData && this.id ? this.referralData?.representative_mobile_phone_no : '',
      }

      if((JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)) && this.formStep === 1){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });

    /* VALUE CHANGE */
    this.serviceDetailsForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        ndis_participant_number: this.referralData && this.id ? this.referralData?.ndis_participant_number : '',  
        ndis_plan_start_date: this.referralData?.ndis_plan_start_date && this.id ? new Date(this.referralData?.ndis_plan_start_date * 1000) : '',  
        ndis_plan_end_date: this.referralData?.ndis_plan_end_date && this.id ? new Date(this.referralData?.ndis_plan_end_date * 1000) : '',  
        ndis_funding: this.referralData && this.id ? this.referralData?.ndis_funding : '',  
        disability_type: this.referralData && this.id ? this.referralData?.disability_type : '',   
        disability_type_other: this.referralData && this.id ? this.referralData?.disability_type_other : '',
        other_medical_social_history: this.referralData && this.id ? this.referralData?.other_medical_social_history : '',  
        doctor_name: this.referralData && this.id ? this.referralData?.doctor_name : '',  
        clinic_name: this.referralData && this.id ? this.referralData?.clinic_name : '',  
        doctor_phone_no: this.referralData && this.id ? this.referralData?.doctor_phone_no : '',
        identified_risk: this.referralData && this.id ? this.referralData?.identified_risk : '',
        services_referred: this.referralData && this.id ? (this.referralData?.services_referred || null) : '',
        plan_manager_name: this.referralData && this.id ? this.referralData?.plan_manager_name : '',
        plan_manager_agency: this.referralData && this.id ? this.referralData?.plan_manager_agency : '',
        plan_manager_work_phone: this.referralData && this.id ? this.referralData?.plan_manager_work_phone : '',
        plan_manager_email: this.referralData && this.id ? this.referralData?.plan_manager_email : '',

        ndis_plan: this.referralData && this.id ? this.referralData?.ndis_plan : null,     
        ndis_plan_file: this.referralData && this.id ? this.referralData?.ndis_plan_file : null, 
        'referral-goal': this.referralData && this.id ? this.referralData['referral-goal'] : {add: [], update: [], delete: [] },   
            
      }

      if((JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)) && this.formStep === 2){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });

    /* VALUE CHANGE */
    this.referralDetailsForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        referral_date: this.referralData && this.id ? this.convertToDate(this.referralData?.referral_date) : new Date(),  
        referrer_contact_phone_no: this.referralData && this.id ? this.referralData?.referrer_contact_phone_no : '',  
        referrer_email_address: this.referralData && this.id ? this.referralData?.referrer_email_address : '',  
        referrer_organization_name: this.referralData && this.id ? this.referralData?.referrer_organization_name : '',  
        referrer_organization_address: this.referralData && this.id ? this.referralData?.referrer_organization_address : '',  
        reason_for_referral: this.referralData && this.id ? this.referralData?.reason_for_referral.filter(el => !el?.match('delim')) || [] : [],  
        referrer_first_name: this.referralData && this.id ? (this.referralData?.referrer_first_name || "") : '', 
        referrer_last_name: this.referralData && this.id ? (this.referralData?.referrer_last_name || "") : '', 
        referral_source: this.referralData && this.id ? (this.referralData?.referral_source || "") : '', 
        assigned_to: this.referralData?.employee && this.id ? (this.referralData?.employee?.id || ""): '', 
        allocate_staff: this.referralData?.employee && this.id ? true : false,
      }

      if((JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)) && this.formStep === 3){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });

    /* VALUE CHANGE */
    this.additionalReportsForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        health_summary: this.referralData && this.id ? this.referralData?.health_summary : null,
        specialist_reports: this.referralData && this.id ? this.referralData?.specialist_reports : null,  
        //ndis_plan: this.referralData && this.id ? this.referralData?.ndis_plan : null,  

        health_summary_file: this.referralData && this.id ? (this.referralData?.health_summary_file || null) : null,
        specialist_reports_file: this.referralData && this.id ? (this.referralData?.specialist_reports_file || null) : null,  
        ndis_plan_file: this.referralData && this.id ? (this.referralData?.ndis_plan_file || null) : null,  

        safety_issue_unit_text: this.referralData && this.id ? this.referralData?.safety_issue_unit_text : '',  
        adequate_parking: this.referralData && this.id ? this.referralData?.adequate_parking : null,  
        animal_restrained: this.referralData && this.id ? this.referralData?.animal_restrained : null,  
        mobile_phone_coverage: this.referralData && this.id ? this.referralData?.mobile_phone_coverage : null,  
        smoke_in_home: this.referralData && this.id ? this.referralData?.smoke_in_home : null,  
        safety_issue_unit: this.referralData && this.id ? this.referralData?.safety_issue_unit : null,
        'referral-comment': this.referralData && this.id ? this.referralData['referral-comment'] : {add: [], update: [], delete: [] },
      }

      if((JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)) && this.formStep === 4){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  checkFormValidity(e){
    this.steps[e.formStep -1].isStepValid = e.isValid;
  }

  checkFormDisabled(){
    return this.formStep === 1 
      ? this.participantDetailsForm.valid : this.formStep === 2 
  }

  subscribeReferral(){
    this.referralData$ = this.adminReferral.pipe(select(state => state.referral));

    this.req = this.referralData$.subscribe((results: any) => {
      this.loading = results?.pending;

      if(!results?.pending && Object.keys(results.referral).length != 0){
        this.referralData = results.referral;
      }

      if(this.isEdit && !results?.pending && Object.keys(results.referral).length != 0){
        this.setUpForm();
        /*console.log("UPDATE SUCCESSFUL")*/
        //setTimeout(() => this.updateStepper(this.selectedStepper || 1), 1000);
      } else {
        this.setUpForm();
      }

      if(results?.success){
        this.router.navigate(['/admin/referrals']);
        
        this.snackBar.open(results?.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });
   
        this.adminReferral.dispatch({
          type: ReferralActionTypes.SAVE_REFERRAL_SUCCESS,
          payload: {message: null}
        }); 
      }

      if(results?.successEdit){
        this.snackBar.open(results?.successEdit, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });
        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL_SUCCESS,
          payload: {message: null}
        }); 

        this.getReferralData();
        this.toBeUpdated = false;
      }

      if(results?.error){
        this.snackBar.open("Error, please try again later", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
        
        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL_FAIL,
          payload: null
        }); 
      }

    })
  }


  getReferralData(){
    this.adminReferral.dispatch({
      type: ReferralActionTypes.GET_REFERRAL,
      payload: {id: this.id}
    });
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  convertToDate(dateTime){
    return dateTime ? new Date(dateTime * 1000) : undefined;
  }

  /* SAVE RECORD AS DRAFT */
  saveDraft(){
    let first_name = this.participantDetailsForm.controls['first_name'].value;
    let last_name = this.participantDetailsForm.controls['last_name'].value;
    let street_address = this.participantDetailsForm.controls['address_a'].value;
    let email_address = this.participantDetailsForm.controls['email_address'].value;
    let suburb = this.participantDetailsForm.controls['suburb'].value;
    let mobile_phone_no = this.participantDetailsForm.controls['mobile_phone_no'].value;

    if(first_name && last_name && street_address 
      && email_address && suburb && mobile_phone_no){
      if(!this.isEdit){
        let data = {
          ...this.participantDetailsForm.value,
          ...this.serviceDetailsForm.value, 
          ...this.referralDetailsForm.value,  
          ...this.additionalReportsForm.value  
        }

        if(!data['referral-goal']) delete data['referral-goal'];
        if(!data['referral-comment']) delete data['referral-comment'];

        data.birthdate = this.convertToDateTime(data.birthdate)
        data.ndis_plan_start_date = this.convertToDateTime(data.ndis_plan_start_date);
        data.ndis_plan_end_date = this.convertToDateTime(data.ndis_plan_end_date);
        data.referral_date = this.convertToDateTime(data.referral_date);
        data.status = "Referral Received";
        
        this.adminReferral.dispatch({
          type: ReferralActionTypes.SAVE_REFERRAL,
          payload: data
        });
      }

      else {
        let data = {
          ...this.participantDetailsForm.value,
          ...this.serviceDetailsForm.value, 
          ...this.referralDetailsForm.value,  
          ...this.additionalReportsForm.value,
          id: parseInt(this.id)
        }

        if(!data['referral-goal']) delete data['referral-goal'];
        if(!data['referral-comment']) delete data['referral-comment'];

        data.birthdate = this.convertToDateTime(data.birthdate);
        data.ndis_plan_start_date = this.convertToDateTime(data.ndis_plan_start_date);
        data.ndis_plan_end_date = this.convertToDateTime(data.ndis_plan_end_date);
        data.referral_date = this.convertToDateTime(data.referral_date);
        data.status = "Draft";
        
        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL,
          fromForm: true,
          payload: data
        });
      }
    }

    else {
      this.snackBar.open("Error saving the referral record. Please atleast complete the first form.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });
    }
  }

  /* SAVE RECORD AS DRAFT */
  save() {
    if(!this.isEdit){
      let first_name = this.participantDetailsForm.controls['first_name'].value;
      let last_name = this.participantDetailsForm.controls['last_name'].value;
      let street_address = this.participantDetailsForm.controls['address_a'].value;
      let email_address = this.participantDetailsForm.controls['email_address'].value;
      let suburb = this.participantDetailsForm.controls['suburb'].value;
      let mobile_phone_no = this.participantDetailsForm.controls['mobile_phone_no'].value;

      if(first_name && last_name /*&& street_address 
        && email_address && suburb && mobile_phone_no*/){
        let data = {
          ...this.participantDetailsForm.value,
          ...this.serviceDetailsForm.value, 
          ...this.referralDetailsForm.value,  
          ...this.additionalReportsForm.value  
        }

        if(!data['referral-goal']) delete data['referral-goal'];
        if(!data['referral-comment']) delete data['referral-comment'];

        data.birthdate = this.convertToDateTime(data.birthdate)
        data.ndis_plan_start_date = this.convertToDateTime(data.ndis_plan_start_date);
        data.ndis_plan_end_date = this.convertToDateTime(data.ndis_plan_end_date);
        data.referral_date = this.convertToDateTime(data.referral_date);
        data.reason_for_referral = data?.reason_for_referral;
          
        this.adminReferral.dispatch({
          type: ReferralActionTypes.SAVE_REFERRAL,
          payload: data
        });
      }

      else {
        this.snackBar.open("Error saving the referral record. Please atleast complete the participant first name and last name", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
      }
      
    } else {
      let data = {
        ...this.participantDetailsForm.value,
        ...this.serviceDetailsForm.value, 
        ...this.referralDetailsForm.value,  
        ...this.additionalReportsForm.value,
        id: parseInt(this.id)
      }

      if(!data['referral-goal']) delete data['referral-goal'];
      if(!data['referral-comment']) delete data['referral-comment'];

      data.birthdate = this.convertToDateTime(data.birthdate);
      data.ndis_plan_start_date = this.convertToDateTime(data.ndis_plan_start_date);
      data.ndis_plan_end_date = this.convertToDateTime(data.ndis_plan_end_date);
      data.referral_date = this.convertToDateTime(data.referral_date);

      this.adminReferral.dispatch({
        type: ReferralActionTypes.EDIT_REFERRAL_DETAILS,
        fromForm: true,
        payload: data
      });
    }
  }

  public selectedStepper;
  public updateStepper(step: number): void {
    
    // AUTO SAVE INIT
    if(this.toBeUpdated && this.isEdit){
      console.log("TRIGGER AUTO SAVE")
      this.save();
      this.selectedStepper = step;
    } 

    else {
      // this.formStep < step ? this.stepper.next() : this.stepper.previous();
      this.formStep = step;
      this.setStepperNavigation();

    }
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
      this.getNavigation(ReferralConstants.participantDetails)
    } 
    else if (this.formStep === 2) {
      this.getNavigation(ReferralConstants.serviceDetails)
    }
    else if (this.formStep === 3) {
      this.getNavigation(ReferralConstants.referrerDetails)
    } 
    else if (this.formStep === 4) {
      this.getNavigation(ReferralConstants.additionalReports)
    } 
  }

  next(){
    this.updateStepper(this.navigation?.next);

    console.log(this.participantDetailsForm.value, 
      this.serviceDetailsForm.value, 
   )
  }

  back(){
    this.updateStepper(this.navigation?.previous);
  }
}

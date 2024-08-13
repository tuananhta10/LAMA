import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { steps } from './stepper-tabs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '../../../../../shared/components/stepper/model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-client-update',
  animations: [mainAnimations],
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;
  
  formStep: number = 1;
  canLeave:boolean = false;
  isUpdate = true;
  clientId: any = null;
  msg = 'Successfully updated client!'

  private req: Subscription;
  client$: any;
  clientForm: any ={
    clientDetail: {},
		demographics:{},
    /*intake: {},*/
		onboardingNotes: {},
		careWorkers: {},
    medicationClientNotes: {},
		serviceDetails: {},
		contactDetails: {},
		clientDocs: {}
  };
  loading:boolean = true;
  clientTypeList = ['client-details', 'demographics', /*'intake',*/ 'onboarding-notes', 'care-workers', 'medications-and-client-notes', 'service-details', 'contact-details', 'related-docs'];
  
  public steps: any = steps;
  public navigation: object = {};

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private clientStore: Store<AdminProfileState>,  
    private snackBar: MatSnackBar) {
    this.client$ = this.clientStore.pipe(select(state => state.client));
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.subscribeClient();
    this.getClient();
  }

  public updateStepper(step: number): void {
    // this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;
    if(step < 10){
      this.getClient();
    }
    
    if (step === 10) {
      this.canLeave = true;
    }
  }

  public updateStepperClick(step: number): void{
    this.formStep = step;
    if(step < 10){
      this.getClient();
    }
    
    if (step === 10) {
      this.canLeave = true;
    }
    this.stepperNavigation();
  }

  stepperNavigation(){
    this.getNavigation(steps[this.formStep - 1].stepName);

  }

  checkFormValidity(e){
    this.steps[e.formStep -1].isStepValid = e.isValid;
  }

  navigateToStep(e) {
    console.log(e);
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  getClient(){
    let key = Object.keys(this.clientForm)[this.formStep - 1]
    let clientType = {
      type: this.clientTypeList[this.formStep - 1],
      id: this.clientId,
      key: key
    }

    console.log(clientType)

    this.clientStore.dispatch({
      type: ClientActionTypes.GET_CLIENT,
      payload: clientType
    });
  }

  updateClientDetailData(e){
    this.updateClientForm(e);
  }

  updateDemographicsData(e){
    this.updateClientForm(e);
  } 

  updateOnboardingNotesData(e){
    this.updateClientForm(e);
  }

  updateCareWorkersData(e){
    this.updateClientForm(e);
    
  }

  updateMedicationClientNotes(e){
    this.updateClientForm(e);
    //this.clientForm.medicationClientNotes = e;
  }

  updateServiceDetailsData(e){
    this.updateClientForm(e);
    
  }

  updateContactDetailsData(e){
    this.updateClientForm(e);
  }

  updateRelatedDocument(e){
    this.updateClientForm(e);
    
  }

  subscribeClient(){
    let client = this.client$;
    this.req = client.subscribe((results: any) => {
      this.clientForm = results?.client;
      this.loading = results?.pending;

      if(results?.success){
        this.snackBar.open("Successfully Updated Client", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.clientStore.dispatch({
          type: ClientActionTypes.EDIT_CLIENT_SUCCESS,
          payload: {message: null}
        }); 

        if(this.formStep === 8) this.router.navigate(['/admin/clients'])
        else this.getClient();
      }

      if(results?.error){
        this.snackBar.open("Error, please try again later", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
        
        this.clientStore.dispatch({
          type: ClientActionTypes.EDIT_CLIENT_FAIL,
          payload: null
        }); 
      }

    })
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  openSnackBar(message: string, type: string) {
    this.snackBar.open(message, "", {
      duration: 4000,
      panelClass: type === 'success' ? 'success-snackbar' : 'snackbar-bg-error'
    });
  }

  convertToDateTime(dateVal: Date){
    /*let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;*/

    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  updateClientForm(data){
    data.id = Number(this.clientId);

    data.birthdate = data.birthdate ? convertTimestampUtc(data?.birthdate) : data.birthdate;
    data.entry_date = data.entry_date ? convertTimestampUtc(data.entry_date) : data.entry_date;
    data.last_service_date = data.last_service_date ? convertTimestampUtc(data.last_service_date) : data.last_service_date;
    data.end_service_date = data.end_service_date ? convertTimestampUtc(data.end_service_date) : data.end_service_date;
    data.exit_date = data.exit_date ? convertTimestampUtc(data.exit_date) : data.exit_date;
    data.ndis_plan_start_date = data.ndis_plan_start_date ? convertTimestampUtc(data.ndis_plan_start_date) : data.ndis_plan_start_date;
    data.ndis_plan_end_date = data.ndis_plan_end_date ? convertTimestampUtc(data.ndis_plan_end_date) : data.ndis_plan_end_date;

    this.clientStore.dispatch({
      type: ClientActionTypes.EDIT_CLIENT,
      payload: data
    });
  }

}

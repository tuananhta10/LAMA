import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { ComponentCanDeactivate } from '@main/shared/guards/can-deactivate/pending-changes.guard';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '../../../../../shared/components/stepper/model';
import { Observable, Subscription } from 'rxjs';

import { steps } from './stepper-tabs';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { ClientSuccessModalComponent } from '../client-shared';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-client-create',
  animations: [mainAnimations],
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  @ViewChild('stepper') stepper: MatStepper;

  public loading: boolean = true;
  public saveClicked: boolean = false;
  formStep: number = 1;
  client$: any;
  private req: Subscription;
  public canLeave:boolean = false;
  public clientForm:any = {
    clientDetail: {},
    demographics: {},
    onboardingNotes: {},
    careWorkers: {},
    serviceDetails: {
     
    },
    contactDetails : {},
    clientDocs : {
      add: []
    }
  }

  public steps: any = steps;
  public navigation: object = {};

  constructor(private adminClient: Store<AdminProfileState>, 
    public dialog: MatDialog, 
    private snackBar: MatSnackBar, 
    private datePipe : DatePipe) { 

  }

  public updateStepper(step: number): void {
    this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;
    if (step === 9) {
      console.log(this.clientForm);
      this.canLeave = true;
      this.saveClient();
    }
  }

  public updateStepperClick(step: number): void{
    this.formStep = step;
    this.stepperNavigation();
  }

  stepperNavigation(){
    this.getNavigation(steps[this.formStep - 1].stepName)
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  checkFormValidity(e){
    this.steps[e.formStep -1].isStepValid = e.isValid;
  }

  updateClientDetailData(e){
    this.clientForm.clientDetail = e;
  }

  updateDemographicsData(e){
    this.clientForm.demographics = e;
  }

  updateOnboardingNotesData(e){
    this.clientForm.onboardingNotes = e;
  }

  updateCareWorkersData(e){
    this.clientForm.careWorkers = e;
  }

  updateServiceDetailsData(e){
    this.clientForm.serviceDetails = e;
  }

  updateContactDetailsData(e){
    this.clientForm.contactDetails = e;
  }

  updateRelatedDocuments(e){
    this.clientForm.clientDocs.add = e;
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.canLeave;
  }

  needsSaving(needSave) {
    this.canLeave = !needSave;
  }

  public nextStep(): void {
    this.stepper.next();
  }

  public previousStep(): void {
    this.stepper.previous();
  }

  ngOnInit(): void {
    this.client$ = this.adminClient.pipe(select(state => state.client));
    this.req =  this.client$.subscribe((client: any) => {
      this.loading = client.pending;
      if(client.success){
        this.dialog.open(
          ClientSuccessModalComponent,
          {
            panelClass: "dialog-responsive",
            disableClose: true,
            width: '800px',
            height: '720px',
            data: {
            },
          }
        );

        this.adminClient.dispatch({
          type: ClientActionTypes.SAVE_CLIENT_SUCCESS,
          payload: {message: null}
        }); 
      }

      if(client.error){
        let message = client?.error?.error?.message?.replace('[Request Error] ', '') ||"Something went wrong please try again later or contact your administrator"

        this.snackBar.open(message, "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
        this.updateStepper(7);

        this.adminClient.dispatch({
          type: ClientActionTypes.SAVE_CLIENT_FAIL,
          payload: null
        }); 
      }
    })
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  convertToDateTime(dateVal: Date){
    /*let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;*/

    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  saveClient(){
    let organization_id: any = JSON.parse(localStorage.getItem('loggedUserData'))['organization_id'];
    
    let client = {
      ...this.clientForm.clientDetail,
      ...this.clientForm.demographics,
      ...this.clientForm.onboardingNotes,
      ...this.clientForm.careWorkers.preferred_language_id,
      ...this.clientForm.contactDetails,
      ...this.clientForm.serviceDetails,
      "client-docs": {
        ...this.clientForm.clientDocs
      },
      registration_stage: "profile-created",
      organization_id: organization_id
    }

    client.birthdate = client.birthdate ? convertTimestampUtc(client?.birthdate) : client.birthdate;
    client.entry_date = client.entry_date ? convertTimestampUtc(client.entry_date) : client.entry_date;
    client.last_service_date = client.last_service_date ? convertTimestampUtc(client.last_service_date) : client.last_service_date;
    client.end_service_date = client.end_service_date ? convertTimestampUtc(client.end_service_date) : client.end_service_date;
    client.exit_date = client.exit_date ? convertTimestampUtc(client.exit_date) : client.exit_date;
    client.ndis_plan_start_date = client.ndis_plan_start_date ? convertTimestampUtc(client.ndis_plan_start_date) : client.ndis_plan_start_date;
    client.ndis_plan_end_date = client.ndis_plan_end_date ? convertTimestampUtc(client.ndis_plan_end_date) : client.ndis_plan_end_date;

    console.log(client)

    this.adminClient.dispatch({
      type: ClientActionTypes.SAVE_CLIENT,
      payload: client
    });
  }
}

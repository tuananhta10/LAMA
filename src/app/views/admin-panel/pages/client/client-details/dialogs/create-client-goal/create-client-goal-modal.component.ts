import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientGoalDetailsComponent } from '../../components/goals/goals-form/client-goal-details/client-goal-details.component';
import { steps } from './stepper-tabs';
import { StepModel } from '@app-shared/components/stepper/model';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-client-goal-modal',
  templateUrl: './create-client-goal-modal.component.html',
  styleUrls: ['./create-client-goal-modal.component.scss'],
})
export class CreateClientGoalModalComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;
  
  @Output() updateStep: EventEmitter<any> = new EventEmitter<any>();

  public steps: any = steps;

  public clientGoalDetailsForm: FormGroup
  public statusForm: FormGroup
  public responsiblePartiesForm: FormGroup
  public formStep: number = 1;
  @ViewChild(ClientGoalDetailsComponent) clientGoalDetails: ClientGoalDetailsComponent;

  constructor(
    public dialogRef: MatDialogRef<CreateClientGoalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.clientGoalDetailsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      goalType: [''],
      goal: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
      goalClient: [''],
    });

    this.statusForm = this.formBuilder.group({
      status: [''],
      dateAchieved: [''],
      achievementComment: ['']
    })

    this.responsiblePartiesForm = this.formBuilder.group({
      clientFamilyResponsibilities: [''],
      organizationResponsibilities: [''],
      otherStakeholderResponsibilities: ['']
    })
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  public updateStepper(step: number): void {
    // this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;
  }

  checkFormDisabled(){
    return this.formStep === 1 ? this.clientGoalDetailsForm.valid : this.formStep === 2 ? this.statusForm.valid : 
    this.formStep === 3 ? this.responsiblePartiesForm.valid : false;
  }

  save() {
    let goal = {
      ...this.clientGoalDetailsForm.value,
      ...this.statusForm.value,
      ...this.responsiblePartiesForm.value
    }

    this.dialogRef.close(goal)
  }

  next(){
    if(this.formStep != 3){
      this.formStep = this.formStep + 1;
    }
  }

  back(){
    if(this.formStep != 1){
      this.formStep = this.formStep - 1;
    }
  }
}

import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { steps } from './stepper-tabs';
import { StepModel } from '@app-shared/components/stepper/model';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-medical-history',
  templateUrl: './add-medical-history.component.html',
  styleUrls: ['./add-medical-history.component.scss']
})
export class AddMedicalHistoryComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  public steps: any = steps;

  public medicalInfoForm: FormGroup;
  public admissionRecord: FormGroup;
  public assessmentmentRecord: FormGroup;
  public formStep: number = 1;
  
  constructor(
    public dialogRef: MatDialogRef<AddMedicalHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.medicalInfoForm = this.formBuilder.group({
      clientid: ['', [Validators.required]],
      cancer_diagnosed: ['', [Validators.required]],
      cancer_diagnosed_date: [''],
      stroke: ['', [Validators.required]],
      stroke_date: [''],
      stroke_comments: [''],
      physical: ['', [Validators.required]],
      mental: ['', [Validators.required]],
      medical_summary: [''],
    });

    this.admissionRecord = this.formBuilder.group({
      medical_record_no: [''],
      referring_doctor: [''],
      referring_doctor_address: [''],
      referring_doctor_phone: [''],
      medical_info: [''],
      admitted_from: [''],
      reason_for_admission: [''],
      diagnosis_mental: [''],
      allergies_comments: [''],
      kidney_comments: [''],
      muscular_skeletal_comments: [''],
      drinking_smoking_comments: [''],
      flu_vaccination: [''],
      adverse_effects_antibiotics: ['', [Validators.required]],
      adverse_effects_other_drugs: ['', [Validators.required]],
      pulmonary_embulus: ['', [Validators.required]],
      deep_venous_trombosis: ['', [Validators.required]],
      bed_sores: ['', [Validators.required]],
      haematoma: ['', [Validators.required]],
      wound_infection: ['', [Validators.required]],
      urinary_track_infection: ['', [Validators.required]],
      blood_transfusion_reaction: ['', [Validators.required]]
    })

    this.assessmentmentRecord = this.formBuilder.group({
      general_appearance: [''],
      skin_hair_comments: [''],
      oral_requirements: [''],
      dentures: [''],
      nutrition_comments: [''],
      bladder_assessment: [''],
      bowel_assessment: [''],
      general_condition: [''],
      general_assessment_comments: [''],

      temperature: [''],
      pulse: [''],
      urinalysis: [''],
      blood_pressure: [''],
      respiratory_assessment: [''],
      circulatory_assessment: [''],
      cognitive_functioning: [''],
      muscular_skeletal: [''],
      mobility_assessment: [''],
      behavior_assessment: [''],
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
    return this.formStep === 1 ? this.medicalInfoForm.valid 
    : this.formStep === 2 ? this.admissionRecord.valid 
    : this.formStep === 3 ? this.assessmentmentRecord.valid 
    : false;
  }

  save() {
    let goal = {
      ...this.medicalInfoForm.value,
      ...this.admissionRecord.value,
      ...this.assessmentmentRecord.value
    }
    console.log(goal);
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

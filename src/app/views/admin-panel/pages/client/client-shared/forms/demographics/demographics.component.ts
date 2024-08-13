import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { MatDialog } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CountryModalComponent } from '../../modals/country-modal/country-modal.component';
import { ReligionModalComponent } from '../../modals/religion-modal/religion-modal.component';
import { 
  differenceInDays 
} from 'date-fns';
import { Location } from '@angular/common';
import { ClientConstants } from '../../../constants';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-demographics',
  animations: [mainAnimations],  
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.scss']
})
export class DemographicsComponent implements OnInit, OnDestroy {
  isLinear = false;
  demographicsForm!: FormGroup;
  required:boolean = true;
  citizenshipOptions:any[] = ["Australian Citizenship", "Permanent Resident", "Student", "Tourist", "Unknown"];
  familyStatusOptions:any[] = ["Married", "Widowed", "Separated", "Divorced", "Single"];
  backgroundOptions:any[] = ["Australian", "Culturally and Linguistically Diverse", "Aboriginal", "Torres Strait Islander", "Other"];
  conditionOptions:any[] = [    
    "Acquired Brain injury",
    "Alzheimer",
    "Amputation",
    "Anxiety",
    "Anxiety / Depression",
    "Autism",
    "Autism / Asperger",
    "Cerebral Palsy",
    "Deaf",
    "Deaf Blindness",
    "Dementia",
    "Early onset Dementia",
    "Emotionally unstable personality disorder",
    "Epilepsy",
    "Genetic conditions",
    "Global Developmental Delay",
    "Intellectual disability",
    "Multiple sclerosis (MS)",
    "Neurological (undisclosed)",
    "Parkinson disease",
    "Permanent bilateral hearing loss",
    "Permanent blindness",
    "Physical (undisclosed)",
    "Psychosocial",
    "Schizophrenia",
    "Spinal cord injury or brain injury",
    "Stroke",
    "Stroke / ABI"
  ].sort((a,b) => a.localeCompare(b)).concat("Other");
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  dateNow: Date = new Date()

  @Input() navigation: any = {};
  @Input() isUpdate: boolean = false;
  @Input() demographicsData: any;
  @Input() currentStatus: string = '';
  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  
  public showOther: any = {
    disability_other: false,
    background_other: false
  };

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  enum$: any;
  countriesEnums: any;
  religionEnums: any;
  loading:boolean = true;
  private toBeUpdated: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private location: Location, 
    public dialog: MatDialog, 
    private adminEnumStore: Store<AdminProfileState>) { 
    this.enum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
  }

  ngOnInit(): void {
    let bday = this.isUpdate ? this.demographicsData.birthdate * 1000 : this.demographicsData.birthdate;

    this.demographicsForm = this.formBuilder.group({
      birthdate: [this.demographicsData["birthdate"] ? new Date(bday) : undefined],
      age: [this.demographicsData ? this.demographicsData.age * 1: undefined],
      birthplace: [this.demographicsData ? this.demographicsData.birthplace : undefined],
      birthplace_country_id: [this.demographicsData ? this.demographicsData.birthplace_country_id : undefined],
      family_status: [this.demographicsData ? this.demographicsData.family_status : undefined],
      religion_id:[this.demographicsData ? this.demographicsData.religion_id : undefined],
      citizenship:[this.demographicsData ? this.demographicsData.citizenship : undefined],
      background:[this.demographicsData ? this.demographicsData.background : undefined],
      background_other:[this.demographicsData ? this.demographicsData.background_other : undefined], // new field
      indigenous: [this.demographicsData ? this.demographicsData.indigenous : undefined],
      disability_type: [this.demographicsData ? this.demographicsData.disability_type : undefined, [Validators.required]],
      other_disability: [this.demographicsData ? this.demographicsData.other_disability : undefined],
      condition_description: [this.demographicsData ? this.demographicsData.condition_description : undefined]
    });

    // AUTO SAVE
    this.subscribeAutoSave();
    this.subscribeEnum();

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_COUNTRIES
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_RELIGIONS
    });
    this.formStep.emit(ClientConstants.demographics);
  }

  subscribeAutoSave(){
    /* VALUE CHANGE */
    this.demographicsForm.valueChanges.subscribe((change: any) => {
      let bday = this.isUpdate ? this.demographicsData.birthdate * 1000 : this.demographicsData.birthdate;
      let currentFormValues = change;
      let previousValue = {
        birthdate: new Date(bday),
        age: this.demographicsData?.age * 1,
        birthplace: this.demographicsData?.birthplace,
        birthplace_country_id: this.demographicsData?.birthplace_country_id,
        family_status: this.demographicsData?.family_status,
        religion_id: this.demographicsData?.religion_id,
        citizenship: this.demographicsData?.citizenship,
        background: this.demographicsData?.background,
        background_other: this.demographicsData?.background_other || null,
        indigenous: this.demographicsData?.indigenous,
        disability_type: this.demographicsData?.disability_type,
        other_disability: this.demographicsData?.other_disability,
        condition_description: this.demographicsData?.condition_description,
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
  }

  showOthers(event, input_type){
    if(input_type === 'background'){
      if(event == 'Other'){
        this.showOther.background_other = true;
      }

      else if(event != 'Other' && event !== '') {
        this.showOther.background_other = false;
      }
    }
    
    else if(input_type === 'disability_type'){
      if(event == 'Other'){
        this.showOther.disability_other = true;
      }

      else if(event != 'Other' && event !== '') {
        this.showOther.disability_other = false;
      }
    }
  }

  @Output() saveClientAsDraft: EventEmitter<any> = new EventEmitter<any>();

  saveAsDraft(){
    this.submitData.emit(this.demographicsForm.value);
    this.saveClientAsDraft.emit(true);
  }


  back(){
    if(sessionStorage.getItem('clientFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.navigation?.previous);
  }

  openAddCountry(e){
    let countryDialog = this.dialog.open(
      CountryModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '400px',
        height: '320px',
        data: {
        },
      }
    );

    countryDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      if(res){
        let newCountry ={
          id: Math.random(),
          value: res.country
        }

        this.adminEnumStore.dispatch({
          type: AdminEnumsActionTypes.ADD_COUNTRY,
          payload: newCountry
        });
      }
    });
  }

  openReligion(e){
    let religionDialog = this.dialog.open(
      ReligionModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '400px',
        height: '320px',
        data: {
        },
      }
    );

    religionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      if(res){
        let newReligion ={
          id: Math.random(),
          value: res.religion
        }

        this.adminEnumStore.dispatch({
          type: AdminEnumsActionTypes.ADD_RELIGION,
          payload: newReligion
        });
      }
    });
  }

  subscribeEnum(){
    let optionsEnum = this.enum$;
    this.req = optionsEnum.subscribe((results: any) => {
      this.countriesEnums = results.countries;
      this.religionEnums = results.religions;
      this.loading = results.pending;
    })
  }

  computeAge(date){ 
    if(date){
      let age = differenceInDays(new Date(this.dateNow), new Date(date))
      this.demographicsForm.controls['age'].setValue(Math.floor(age/365));
    }
  }

  public submitting: boolean = false;

  submit(){
    if(this.demographicsForm.valid){
      this.submitting = true;
      this.submitData.emit(this.demographicsForm.value);
    }
  }

  next(){
    if(this.demographicsForm.valid){
      this.submitData.emit(this.demographicsForm.value)
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  ngOnDestroy(): void {
    if(this.toBeUpdated && !this.submitting) {
      this.submitData.emit(this.demographicsForm.value);
    }

    this.isValid.emit({formStep: 2, isValid: this.demographicsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.demographicsForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }

}

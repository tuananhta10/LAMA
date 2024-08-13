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

import { ClientConstants } from '../../../constants';

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
  backgroundOptions:any[] = ["Australian", "CALD", "Aboriginal", "Torres Strait Islander", "Other"];
  conditionOptions:any[] = ["Psychosocial", "Intellectual disability", "Autism", "Epilepsy", "Cerebral palsy", "Genetic conditions", "Spinal cord injury or brain injury", "Permanent blindness", "Permanent bilateral hearing loss", "Deaf Blindness", "Amputation", "Dementia", "Stroke", "Deaf", "Other"];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  dateNow: Date = new Date()

  @Input() navigation: any = {};
  @Input() isUpdate: boolean = false;
  @Input() demographicsData: any;
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

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private adminEnumStore: Store<AdminProfileState>) { 
    this.enum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
  }

  ngOnInit(): void {
    this.demographicsForm = this.formBuilder.group({
      birthdate: [this.demographicsData["birthdate"] ? new Date(this.demographicsData.birthdate * 1000) : null],
      age: [this.demographicsData ? this.demographicsData.age : ''],
      birthplace: [this.demographicsData ? this.demographicsData.birthplace : ''],
      birthplace_country_id: [this.demographicsData ? this.demographicsData.birthplace_country_id : ''],
      family_status: [this.demographicsData ? this.demographicsData.family_status : ''],
      religion_id:[this.demographicsData ? this.demographicsData.religion_id : null],
      citizenship:[this.demographicsData ? this.demographicsData.citizenship : ''],
      background:[this.demographicsData ? this.demographicsData.background : null],
      background_other:[this.demographicsData ? this.demographicsData.background : null], // new field
      indigenous: [this.demographicsData ? this.demographicsData.indigenous : ''],
      disability_type: [this.demographicsData ? this.demographicsData.disability_type : '', [Validators.required]],
      disability_type_other: [this.demographicsData ? this.demographicsData.disability_type_other : ''],
      condition_description: [this.demographicsData ? this.demographicsData.condition_description : '']
    });

    this.subscribeEnum();

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_COUNTRIES
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_RELIGIONS
    });
    this.formStep.emit(ClientConstants.demographics);

    /* VALUE CHANGE */
    this.demographicsForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change;
      let previousValue = {
        birthdate: this.demographicsData?.birthdate,
        age: this.demographicsData?.age,
        birthplace: this.demographicsData?.birthplace,
        birthplace_country_id: this.demographicsData?.birthplace_country_id,
        family_status: this.demographicsData?.family_status,
        religion_id: this.demographicsData?.religion_id,
        citizenship: this.demographicsData?.citizenship,
        background: this.demographicsData?.background,
        background_other: this.demographicsData?.background_other,
        indigenous: this.demographicsData?.indigenous,
        disability_type: this.demographicsData?.disability_type,
        disability_type_other: this.demographicsData?.disability_type_other,
        condition_description: this.demographicsData?.condition_description,
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        //console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
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

  back(){
    this.updateStepper.emit(this.navigation?.previous);
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

  submit(){
    if(this.demographicsForm.valid){
      this.submitData.emit(this.demographicsForm.value)
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
    //if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 2, isValid: this.demographicsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.demographicsForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }

}

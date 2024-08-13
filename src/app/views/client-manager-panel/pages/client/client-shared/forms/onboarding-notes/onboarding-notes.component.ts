import { Component, EventEmitter, Input, OnInit, OnDestroy , Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';

import { ClientConstants } from '../../../constants';

@Component({
  selector: 'app-onboarding-notes',
  animations: [mainAnimations],
  templateUrl: './onboarding-notes.component.html',
  styleUrls: ['./onboarding-notes.component.scss']
})
export class OnboardingNotesComponent implements OnInit, OnDestroy  {
  onboardingNotesForm!: FormGroup;
  preferredCareworkerOptions:any[] = [];

  @Input() navigation: any = {};
  @Input() isUpdate: boolean = false;
  @Input() onboardingNotesData: any;
  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private req: Subscription;
  private employeesData$: any;
  employeeOptions:any;
  public loading: boolean = true;
  private toBeUpdated: boolean = false;
  
  constructor(private formBuilder: FormBuilder,
    private employeeListStore: Store<EmployeeListState>,) {
      this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.onboardingNotesForm = this.formBuilder.group({
      //preferred_employee_id: [this.onboardingNotesData ? this.onboardingNotesData.preferred_employee_id : ''],
      general_notes: [this.onboardingNotesData ? this.onboardingNotesData.general_notes : ''],
      notes_file:[this.onboardingNotesData ? this.onboardingNotesData.notes_file : ''],
      care_notes: [this.onboardingNotesData ? this.onboardingNotesData.care_notes : ''],
      client_care_notes: [this.onboardingNotesData ? this.onboardingNotesData.client_care_notes : ''],
    });

    this.formStep.emit(ClientConstants.onboardingNotes);

    this.subscribeEnum();

    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });

    /* VALUE CHANGE */
    /*this.onboardingNotesForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        preferred_employee_id: this.onboardingNotesData?.preferred_employee_id,
        general_notes: this.onboardingNotesData?.general_notes,
        notes_file: this.onboardingNotesData?.notes_file,
        care_notes: this.onboardingNotesData?.care_notes,
        client_care_notes: this.onboardingNotesData?.client_care_notes,
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });*/
  }

  onUpload(file: any) {
    this.onboardingNotesForm.get('notes_file').setValue(file);
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  next(){
    if(this.onboardingNotesForm.valid){
      this.submitData.emit(this.onboardingNotesForm.value)
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  subscribeEnum(){
    this.req = this.employeesData$.subscribe((results: any) => {
      this.employeeOptions = results?.employees.employeeList;
      this.loading = results?.employees.employeeListPending;
    })
  }

  submit(){
    if(this.onboardingNotesForm.valid){
      this.submitData.emit(this.onboardingNotesForm.value)
    }
  }

  ngOnDestroy(): void {
    if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 3, isValid: this.onboardingNotesForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.onboardingNotesForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }
}

import { Component, EventEmitter, Input, OnInit, OnDestroy , Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { Location } from '@angular/common';
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
  @Input() currentStatus: string = '';
  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private req: Subscription;
  private employeesData$: any;
  employeeOptions:any;
  public loading: boolean = true;
  private toBeUpdated: boolean = false;
  public notesFile: any;
  
  constructor(private formBuilder: FormBuilder,
    private location: Location, 
    private employeeListStore: Store<EmployeeListState>,) {
      this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.onboardingNotesForm = this.formBuilder.group({
      //preferred_employee_id: [this.onboardingNotesData ? this.onboardingNotesData.preferred_employee_id : ''],
      general_notes: [this.onboardingNotesData ? this.onboardingNotesData?.general_notes || null : undefined],
      notes_file:[this.onboardingNotesData ? this.onboardingNotesData?.notes_file || null : undefined],
      care_notes: [this.onboardingNotesData ? this.onboardingNotesData?.care_notes || null : undefined],
      scheduler_notes: [this.onboardingNotesData ? this.onboardingNotesData?.scheduler_notes || null : undefined],
      client_care_notes: [this.onboardingNotesData ? this.onboardingNotesData?.client_care_notes || null: undefined],
    });

    if(this.onboardingNotesData?.notes_file)
      this.notesFile = this.onboardingNotesData?.notes_file[0];

    this.formStep.emit(ClientConstants.onboardingNotes);
    this.subscribeEnum();

    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });

    //AUTO SAVE
    this.subscribeAutoSave();
  }

  subscribeAutoSave(){
    /* VALUE CHANGE */
    this.onboardingNotesForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        general_notes: this.onboardingNotesData?.general_notes || null,
        notes_file: this.onboardingNotesData?.notes_file || null,
        care_notes: this.onboardingNotesData?.care_notes || null,
        scheduler_notes: this.onboardingNotesData?.scheduler_notes || null,
        client_care_notes: this.onboardingNotesData?.client_care_notes || null,
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
  }

  onUpload(file: any) {
    this.onboardingNotesForm.get('notes_file').setValue([file]);
  }

  back(){
    if(sessionStorage.getItem('clientFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.isUpdate ? this.navigation?.previous - 1 : this.navigation?.previous);
  }

  next(){
    if(this.onboardingNotesForm.valid){
      this.submitData.emit(this.onboardingNotesForm.value)
      this.updateStepper.emit(this.isUpdate ? this.navigation?.next - 1 : this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next - 1);
  }

  subscribeEnum(){
    this.req = this.employeesData$.subscribe((results: any) => {
      this.employeeOptions = results?.employees.employeeList;
      this.loading = results?.employees.employeeListPending;
    })
  }

  public submitting: boolean = false;

  submit(){
    if(this.onboardingNotesForm.valid){
      this.submitting = true;
      this.submitData.emit(this.onboardingNotesForm.value);
    }
  }

  @Output() saveClientAsDraft: EventEmitter<any> = new EventEmitter<any>();

  saveAsDraft(){
    this.submitData.emit(this.onboardingNotesForm.value);
    this.saveClientAsDraft.emit(true);
  }

  ngOnDestroy(): void {
    // AUTO SAVE
    if(this.toBeUpdated && !this.submitting){
      this.submitData.emit(this.onboardingNotesForm.value);
    }

    this.isValid.emit({formStep: 3, isValid: this.onboardingNotesForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.onboardingNotesForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }
}

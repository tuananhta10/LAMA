import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeeConstants } from '../../../constants';

@Component({
  selector: 'app-profile-detail',
  animations: [mainAnimations],
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  isLinear = false;
  profileDetailForm!: FormGroup;
  required:boolean = true;
  dateNow: Date = new Date();
  private interestData$: any;
  private req: Subscription;

  jobDescriptionOptions: any = ["Job 1", "Job 2"];
  taskPerformedOptions:any = [ "Task 1",  "Task 2"];
  rosterInfoOptions:any = ["Roster 1", "Roster 2"];
  skillsOptions:any = ["Skill 1", "Skill 2"];
  interestOptions:any = [];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];


  @Input() navigation: any = {};
  @Input() profileDetailData: any;
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Input() isUpdate: boolean = false;
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  loading:boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private adminProfileDetail: Store<AdminProfileState>,
  ) {
   
  }

  ngOnInit(): void {

    this.adminProfileDetail.dispatch({
      type: InterestActionTypes.GET_INTEREST_LIST
    }); 
    this.subscribeEnums()

    this.profileDetailForm = this.formBuilder.group({
      job_description: [this.profileDetailData ? this.profileDetailData.job_description : ''],
      task_performed: [this.profileDetailData ? this.profileDetailData.task_performed : ''],
      roster_info: [this.profileDetailData ? this.profileDetailData.roster_info : ''],
      other_remarks: [this.profileDetailData ? this.profileDetailData.other_remarks : ''],
      interests : [this.profileDetailData ? this.profileDetailData.interests : ''],
      skills: [this.profileDetailData ? this.profileDetailData.skills : ''],
      smoker: [this.profileDetailData ? this.profileDetailData.smoker : false],
      allergies: [this.profileDetailData ? this.profileDetailData.allergies : false],
      medical_information: [this.profileDetailData ? this.profileDetailData.medical_information : ''],
      general_training_notes: [this.profileDetailData ? this.profileDetailData.general_training_notes : ''],
      qualification_summary: [this.profileDetailData ? this.profileDetailData.qualification_summary : ''],
      qualifications: [this.profileDetailData ? this.profileDetailData.qualifications : '']
    });
    this.formStep.emit(EmployeeConstants.profileDetails);
  }

  subscribeEnums(){
    this.interestData$ = this.adminProfileDetail.pipe(select(state => state.interest));
    this.req =  this.interestData$.subscribe((interest: any) => {
      this.loading = interest.pending;
      this.interestOptions = [];
      if(interest.interestList.length > 0){
        interest.interestList.forEach(element => {
          this.interestOptions.push(element.name);
        });
      }
    })
  }

  computeAge(date){ 
    if(date){
      this.profileDetailForm.controls['age'].setValue(this.dateNow.getFullYear() - date.getFullYear());
    }
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  submit(){
    if(this.profileDetailForm.valid){
      this.submitData.emit(this.profileDetailForm.value);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  next(){
    if(this.profileDetailForm.valid){
      this.submitData.emit(this.profileDetailForm.value);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: 2, isValid: this.profileDetailForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.profileDetailForm.value);
    }
  }

}

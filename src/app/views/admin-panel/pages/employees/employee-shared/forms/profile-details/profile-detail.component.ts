import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeeConstants } from '../../../constants';
import { Location } from '@angular/common';
import { EmployeePositionActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-position.action';

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
  private positionReq: Subscription;

  private toBeUpdated: boolean = false;
  public positionEnum:any;

  jobDescriptionOptions: any = ["Job 1", "Job 2"];
  taskPerformedOptions:any = [ "Task 1",  "Task 2"];
  rosterInfoOptions:any = ["Roster 1", "Roster 2"];
  skillsOptions:any = ["Accounting & bookkeeping", "Adaptability", "Attention to detail", "B2B Marketing", "Brand management", "Business Development", "CMS Tools", "CRO and A/B Testing", "Charisma", "Coding Languages", "Conflict management", "Consumer Behavior Drivers", "Copywriting", "Creativity", "Critical thinking", "Data analysis", "Data visualization & pattern-finding through critical thinking", "Dealing with work-related stress", "Effective communication", "Email marketing", "Emotional intelligence", "HTML & CSS", "Innovation", "Languages", "Machinery skills", "Mathematics", "Motivation", "Negotiation", "PESTEL", "Paid social media advertisements", "People management", "Planning", "Porter’s Five Forces", "Problem-solving", "Problem-solving", "Productivity & organization", "Project/campaign management", "Proposal writing", "SEO/SEM", "Sales", "Search Engine and Keyword Optimization", "Six Sigma techniques", "Social media and mobile marketing", "Software skills", "Storytelling", "Strategic Management", "Stress management", "Task delegation", "Teamwork skills", "Techniques", "Technological savviness", "The 4 P-s of Marketing", "The McKinsey 7s Framework", "Time management", "Tools", "Web analytics", "Web scraping", "Wordpress"];
  interestOptions:any = [];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  @Input() navigation: any = {};
  @Input() profileDetailData: any;
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Input() isUpdate: boolean = false;
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  enum$: any;
  loading:boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private adminProfileDetail: Store<AdminProfileState>,
    private location: Location,
  ) {
   this.enum$ = this.adminProfileDetail.pipe(select(state => state));
  }

  ngOnInit(): void {
    // interest list
    this.adminProfileDetail.dispatch({
      type: InterestActionTypes.GET_INTEREST_LIST
    }); 

    // position list
    this.adminProfileDetail.dispatch({
      type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST
    });

    this.subscribeEnums();

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
      //qualifications: [this.profileDetailData ? this.profileDetailData.qualifications : null]
    });
    this.formStep.emit(EmployeeConstants.profileDetails);
    this.subscribeAutoSave();
  }

  subscribeAutoSave(){
    /* VALUE CHANGE */
    this.profileDetailForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        job_description: this.profileDetailData ? this.profileDetailData.job_description : '',
        task_performed: this.profileDetailData ? this.profileDetailData.task_performed : '',
        roster_info: this.profileDetailData ? this.profileDetailData.roster_info : '',
        other_remarks: this.profileDetailData ? this.profileDetailData.other_remarks : '',
        interests : this.profileDetailData ? this.profileDetailData.interests : '',
        skills: this.profileDetailData ? this.profileDetailData.skills : '',
        smoker: this.profileDetailData ? this.profileDetailData.smoker : false,
        allergies: this.profileDetailData ? this.profileDetailData.allergies : false,
        medical_information: this.profileDetailData ? this.profileDetailData.medical_information : '',
        general_training_notes: this.profileDetailData ? this.profileDetailData.general_training_notes : '',
        qualification_summary: this.profileDetailData ? this.profileDetailData.qualification_summary : '',
        //qualifications: this.profileDetailData ? this.profileDetailData.qualifications : null
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
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

      else {
        this.interestOptions = [
          "Arts and music",
          "Cooking",
          "Cuisine",
          "Current events",
          "Family and relationships",
          "Fitness and wellness",
          "Food and drink",
          "Home and garden",
          "Music",
          "Pets",
          "Politics and social issues",
          "Reading",
          "Shopping and fashion",
          "Sports and outdoors",
          "Technology",
          "Travel",
          "Vehicles",
        ]
      }
    });

    // employee position
    this.positionReq  = this.enum$.subscribe((results: any) => {
      results?.employeePosition.employeePositionList.forEach(el => {
        el.name = el.display_name;
      })

      if(results?.employeePosition.employeePositionList?.length > 0){
        this.positionEnum = results?.employeePosition.employeePositionList;

        let position = this.positionEnum.find(el => el.id === this.profileDetailData.position_id);
        let job_description = this.profileDetailForm.controls['job_description'].value;
        let task_performed = this.profileDetailForm.controls['task_performed'].value;

        if(!job_description) this.profileDetailForm.controls['job_description'].setValue(position?.position_summary);
        if(!task_performed) this.profileDetailForm.controls['task_performed'].setValue(position?.key_responsibilities);
      }

      this.loading = results.employeePosition.pending;
    });
  }

  computeAge(date){ 
    if(date){
      this.profileDetailForm.controls['age'].setValue(this.dateNow.getFullYear() - date.getFullYear());
    }
  }

  back(){
    if(sessionStorage.getItem('employeeFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.navigation?.previous);
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

  @Output() saveEmployeeAsDraft: EventEmitter<any> = new EventEmitter<any>();
  @Input() currentStatus: string = '';

  saveAsDraft(){
    this.submitData.emit(this.profileDetailForm.value);
    this.saveEmployeeAsDraft.emit(true);
  }


  ngOnDestroy(): void {
    // AUTO SAVE
    if(this.toBeUpdated) this.submit();

    this.isValid.emit({formStep: 2, isValid: this.profileDetailForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.profileDetailForm.value);
    }
  }

}

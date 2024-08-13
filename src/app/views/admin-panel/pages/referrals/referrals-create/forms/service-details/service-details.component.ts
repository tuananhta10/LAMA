import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-service-details',
  animations: [mainAnimations],
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  @Input() additionalReportsForm!: FormGroup;
  @Input() serviceDetailsForm!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Input() stepper: number= 1;
  @Input() referralData: any;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  @Output() ndisGoalsEvent: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  public loading:boolean = false;

  public stateOption: string[] = ["WA", "VIC", "NSW", "ACT", "QLD", "TAS", "NT"];
  public backgroundOption: string[] = ["Aboriginal", "Torre strait Islander", "Both", "Other"];
  public ndisFundingOption: string[] = ["Self managed", "Plan managed", "NDIA managed"];
  public conditionOptions: string[] = ["Psychosocial", "Intellectual disability", "Autism", "Epilepsy", "Cerebral palsy", "Genetic conditions", "Spinal cord injury or brain injury", "Permanent blindness", "Permanent bilateral hearing loss", "Deaf Blindness", "Amputation", "Dementia", "Stroke", "Deaf", "Other"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public goalTermOption: string[] = ["Short Term", "Medium Term", "Long Term"];

  public reasonForReferralOption: string[] = ["Supports with Daily Assistance", "Supports to access social and community participation", "STA/Respite", "Supported Independent Living (SIL)", "Support Coordination", "Level 1: Support Connection", "Level 2: Coordination of Supports", "Level 3: Specialist Support Coordination", "Psychosocial Recovery Coach"];
  public dateNow: Date = new Date()
  public showOther: boolean = false;
  public ndisPlan: any;
  public ndisGoals: any[] = [
    {
      //id: 1,  
      goal_term: '',
      participant_goal: ''
    }
  ];

  public referralGoalUpdate: any = {
    add: [],
    update: [],
    delete: []
  }

  constructor() {
  }

  updateGoal(item){
    let referral_goal = this.referralGoalUpdate;
    let currentAddValue = referral_goal?.add;
    let currentUpdateValue = referral_goal?.update;
    let currentDeleteValue = referral_goal?.delete;

    console.log(item, referral_goal)

    
    if(!this.isUpdate){
      this.serviceDetailsForm.controls['referral-goal'].setValue({add: [...this.ndisGoals]});
    }

    else {
      if(item?.id){
        let updateIndex = this.referralGoalUpdate?.update?.findIndex(el => el?.id === item?.id);
        let updatedItem = {
          id: item?.id,
          goal_term: item?.goal_term,
          participant_goal: item?.participant_goal,
          referral_id: item?.referral_id
        };

        if(updateIndex === -1) this.referralGoalUpdate.update.push(updatedItem);
        else this.referralGoalUpdate.update[updateIndex] = updatedItem
      }

      else {
        let updateIndex = this.referralGoalUpdate?.add?.findIndex(el => el === item);
        if(updateIndex === -1) this.referralGoalUpdate.add.push(item);
      }

      this.serviceDetailsForm.controls['referral-goal'].setValue(this.referralGoalUpdate);
    }
  }

  deleteGoal(item){
    if(!this.isUpdate){
      let index = this.ndisGoals.findIndex(el => el === item);  

      if(index >= 0){
        this.ndisGoals.splice(index, 1);  
        this.serviceDetailsForm.controls['referral-goal'].setValue({add: [...this.ndisGoals]});
      }
    }

    else {
      let index = this.ndisGoals.findIndex(el => el === item);  

      if(index >= 0){
        this.ndisGoals.splice(index, 1);  
        this.referralGoalUpdate.delete.push(item);
        this.serviceDetailsForm.controls['referral-goal'].setValue(this.referralGoalUpdate);
      }
    }
  }

  addNdisGoal(){
    this.ndisGoals.push({
      goal_term: '',
      participant_goal: ''
    })
  }

  ngOnInit(): void {
    if(this.serviceDetailsForm.value['ndis_plan_file'])
      this.ndisPlan  = this.serviceDetailsForm.value['ndis_plan_file'][0];

    if(this.isUpdate && this.referralData['referral_goal']){
      console.log(this.ndisGoals)
      this.ndisGoals = this.referralData['referral_goal']
    }

    console.log(this.serviceDetailsForm.value)
    //this.serviceDetailsForm.controls['ndis_funding'].valueChanges.subscribe((result) => console.log(result));
  }

  ngOnDestroy(): void {
    //if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 2, isValid: this.serviceDetailsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.serviceDetailsForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }

  onUpload(file: any, control: string) {
    let controlVal = [file]

    this.additionalReportsForm.controls['ndis_plan_file'].setValue(file);
  }

  computeAge(date){ 
    if(date){
      this.serviceDetailsForm.controls['age'].setValue(this.dateNow.getFullYear() - date.getFullYear());
    }
  }

  showOthers(event){
    if(event == 'Other'){
      this.showOther = true;
    }

    else if(event != 'Other' && event !== '') this.showOther = false; 
  }

}

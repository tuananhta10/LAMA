import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';
import { 
  differenceInDays 
} from 'date-fns';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { AdminEnumsActionTypes } from '@app-admin-store/actions/admin-enums.actions';
import { AdminEnumsState } from '@main/views/admin-panel/store/reducers/admin-enums.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-participant-details',
  animations: [mainAnimations],
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
})
export class ParticipantDetailsComponent implements OnInit {
  @Input() participantDetailsForm!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  public loading:boolean = false;
  public branchesEnums$: any;
  public branchesEnum: any;
  public stateOption: string[] = ["WA", "VIC", "NSW", "ACT", "QLD", "TAS", "NT"];
  public backgroundOption: string[] = ["Australian", "CALD", "Aboriginal", "Torres Strait Islander", "Other"];
  public ndisFundingOption: string[] = ["Self managed", "Plan managed", "NDIA managed"];
  public reasonForReferralOption: string[] = ["Supports with Daily Assistance", "Supports to access social and community participation", "STA/Respite", "Supported Independent Living (SIL)", "Support Coordination", "Level 1: Support Connection", "Level 2: Coordination of Supports", "Level 3: Specialist Support Coordination", "Psychosocial Recovery Coach"];
  public dateNow: Date = new Date();
  public showOther: boolean = false;
  public status: string[] = ["Draft", "Referral Received", "Contact Made", "Intake Scheduled", "Intake Complete", "Onboard Complete"/*, "SW Meet & Greet"*/];
  public stateObj: any[] = [
    {
      title: "Western Australia",
      state: "WA"
    },

    {
      title: "Victoria",
      state: "VIC"
    },

    {
      title: "New South Wales",
      state: "NSW"
    },

    {
      title: "Australian Capital Territory",
      state: "ACT"
    },

    {
      title: "Queensland",
      state: "QLD"
    },

    {
      title: "Tasmania",
      state: "TAS"
    },

    {
      title: "Northern Territory",
      state: "NT"
    },
  ];

  constructor(private adminEnumStore: Store<AdminProfileState>,) {
    this.branchesEnums$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
    
  }

  ngOnInit(): void {
    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_BRANCHES
    });

    let branchesEnum = this.branchesEnums$;
    this.req = branchesEnum.subscribe((results: any) => {
      this.branchesEnum = results.branches;
      //this.loading = results.pending;
    });

    if(this.isUpdate && this.participantDetailsForm.controls['status'].value !== 'Draft') this.status = this.status.filter(el => el !== 'Draft');
  }

  ngOnDestroy(): void {
    //if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 1, isValid: this.participantDetailsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.participantDetailsForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }

  onAddressChange(event:any){
    console.log(event);
    this.participantDetailsForm.patchValue({
      address_a: event?.address1,
      suburb: event?.suburb,
      post_code: event?.postcode,
      state: this.stateObj.find(el => el.title.toLowerCase() == event?.state.toLowerCase())['state'],
    });
  }

  computeAge(date){ 
    if(date){
      let age = differenceInDays(new Date(this.dateNow), new Date(date))
      this.participantDetailsForm.controls['age'].setValue(Math.floor(age/365));
    }
  }

  showOthers(event){
    if(event == 'Other'){
      this.showOther = true;
    }

    else if(event != 'Other' && event !== '') this.showOther = false; 
  }


}

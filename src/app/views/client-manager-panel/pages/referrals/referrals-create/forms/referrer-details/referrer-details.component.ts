import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-referrer-details',
  animations: [mainAnimations],
  templateUrl: './referrer-details.component.html',
  styleUrls: ['./referrer-details.component.scss']
})
export class ReferrerDetailsComponent implements OnInit {
  @Input() referralDetailsForm!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  public loading:boolean = false;
  public reasonForReferralOption: string[] = ["Supports with Daily Assistance", "Supports to access social and community participation", "STA/Respite", "Supported Independent Living (SIL)", "Support Coordination", "Level 1: Support Connection", "Level 2: Coordination of Supports", "Level 3: Specialist Support Coordination", "Psychosocial Recovery Coach"];
  public referralSourceOption: string[] = ["Books", "Newspaper", "Radio", "Internet", "Social Media", "Magazines", "Word of Mouth"]

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    //if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 3, isValid: this.referralDetailsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.referralDetailsForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }
}

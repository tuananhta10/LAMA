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

  @Input() serviceDetailsForm!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  public loading:boolean = false;

  public stateOption: string[] = ["WA", "VIC", "NSW", "ACT", "QLD", "TAS", "NT"];
  public backgroundOption: string[] = ["Aboriginal", "Torre strait Islander", "Both", "Other"];
  public ndisFundingOption: string[] = ["Self managed", "Plan managed", "NDIA managed"];
  public conditionOptions: string[] = ["Psychosocial", "Intellectual disability", "Autism", "Epilepsy", "Cerebral palsy", "Genetic conditions", "Spinal cord injury or brain injury", "Permanent blindness", "Permanent bilateral hearing loss", "Deaf Blindness", "Amputation", "Dementia", "Stroke", "Deaf", "Other"];
  
  public reasonForReferralOption: string[] = ["Supports with Daily Assistance", "Supports to access social and community participation", "STA/Respite", "Supported Independent Living (SIL)", "Support Coordination", "Level 1: Support Connection", "Level 2: Coordination of Supports", "Level 3: Specialist Support Coordination", "Psychosocial Recovery Coach"];
  public dateNow: Date = new Date()
  public showOther: boolean = false;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    //if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 2, isValid: this.serviceDetailsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.serviceDetailsForm.value);
    }
    if(this.req) this.req.unsubscribe();
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

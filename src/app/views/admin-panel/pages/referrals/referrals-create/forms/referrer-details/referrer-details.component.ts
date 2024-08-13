import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';

@Component({
  selector: 'app-referrer-details',
  animations: [mainAnimations],
  templateUrl: './referrer-details.component.html',
  styleUrls: ['./referrer-details.component.scss']
})
export class ReferrerDetailsComponent implements OnInit {
  @Input() referralDetailsForm!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Input() stepper: number = 1;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  public loading:boolean = false;
  private employeesData$: any;
  
  public reasonForReferralOption: string[] = ["Supports with Daily Assistance", "Supports to access social and community participation", "STA/Respite", "Supported Independent Living (SIL)", "Support Coordination", "Level 1: Support Connection", "Level 2: Coordination of Supports", "Level 3: Specialist Support Coordination", "Psychosocial Recovery Coach"];
  public referralSourceOption: string[] = ["Books", "Newspaper", "Radio", "Internet", "Social Media", "Magazines", "Word of Mouth"]
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public employeeOptions:any;

  constructor(private employeeListStore: Store<EmployeeListState>,) {
  }

  ngOnInit(): void {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });

    this.subscribeEnum();
  }

  subscribeEnum(){
    this.req = this.employeesData$.subscribe((results: any) => {
      this.employeeOptions = results?.employees.employeeList;
      this.loading = results?.employees.employeeListPending;
    })
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

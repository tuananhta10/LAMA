import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { OrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-organization.action';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'admin-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit {
  @Input() branchDetailsForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  organizationEnums$: any;
  organizationEnum: any;
  loading:boolean = false;

  public timezone: any[] = ["(GMT+08:00) Perth", "(GMT+09:30) Adelaide", "(GMT+9:30) Darwin", "(GMT+10:00) Brisbane", "(GMT+10:00) Canberra, Melbourne, Sydney", "(GMT+10:00) Hobart", "(GMT+08:00) Auckland, Wellington"];
  public organization: any[] = [{
    id: 1,
    name: "Organization 1"
  }];

  constructor(private adminEnumStore: Store<AdminProfileState>,) {
  }

  ngOnInit(): void {
    this.subscribeOrganizationEnum();

    this.adminEnumStore.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION_LIST
    });

  }

  subscribeOrganizationEnum(){
    this.organizationEnums$ = this.adminEnumStore.pipe(select(state => state.organization));
    this.req = this.organizationEnums$.subscribe((results: any) => {
      if(results.organizationList.length > 0){
        results.organizationList.forEach(element => {
          element.name = element.organization_register;
        });
      }
      this.organizationEnum = results.organizationList;
      this.loading = results.pending;
    })
  }

  ngOnDestroy(){
    this.isValid.emit({formStep: 1, isValid: this.branchDetailsForm.valid})
  }
}

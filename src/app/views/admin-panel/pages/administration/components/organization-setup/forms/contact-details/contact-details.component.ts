import { 
  Component, 
  OnDestroy, 
  OnInit, 
  Input,
  Output,
  Inject,
  ChangeDetectorRef,
  AfterViewInit,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';

@Component({
  selector: 'admin-organization-contact-details',
  animations: [mainAnimations],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() addressForm!: FormGroup;
  @Input() planManagementForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  public loading: boolean = true;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  constructor() {
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      }, 1000);
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: 2, isValid: this.addressForm.valid && this.planManagementForm.valid})

    if(this.req) this.req.unsubscribe();
  }

  onAddressChange(event:any){
    console.log(event);
    this.addressForm.patchValue({
      primary_address: event?.address1,
      suburb: event?.suburb,
      post_code: event?.postcode,
      state: event?.state,
    });
  }

}

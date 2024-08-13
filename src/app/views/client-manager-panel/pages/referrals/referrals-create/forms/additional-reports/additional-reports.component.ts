import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-additional-reports',
  animations: [mainAnimations],
  templateUrl: './additional-reports.component.html',
  styleUrls: ['./additional-reports.component.scss']
})
export class AdditionalReportsComponent implements OnInit {

  @Input() additionalReportsForm!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  public loading:boolean = false;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    //if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 4, isValid: this.additionalReportsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.additionalReportsForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }

  onUpload(file: any, control: string) {
    console.log(file, control)
    let controlVal = {
      attachment: [
        file
      ]
    }

    this.additionalReportsForm.get(control).setValue(controlVal);
  }

}

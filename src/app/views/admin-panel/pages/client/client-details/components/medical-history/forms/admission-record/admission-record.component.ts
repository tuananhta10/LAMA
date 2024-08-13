import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'client-admission-record',
  animations: [mainAnimations],
  templateUrl: './admission-record.component.html',
  styleUrls: ['./admission-record.component.scss']
})
export class AdmissionRecordComponent implements OnInit {
  @Input() admissionRecord!: FormGroup;
  
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

}

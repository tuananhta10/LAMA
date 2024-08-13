import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'admin-service-agreement-templates',
  templateUrl: './service-agreement-templates.component.html',
  styleUrls: ['./service-agreement-templates.component.scss']
})
export class ServiceAgreementTemplatesComponent {

  @Input() serviceAgreementForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();

  imgSrc: any;

  constructor() {
  }

  onUpload(file: any) {
    this.serviceAgreementForm.get('agreement_form').setValue(file);
  }

}

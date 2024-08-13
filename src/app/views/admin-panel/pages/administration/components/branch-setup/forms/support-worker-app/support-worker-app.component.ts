import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'admin-support-worker-app',
  templateUrl: './support-worker-app.component.html',
  styleUrls: ['./support-worker-app.component.scss']
})
export class SupportWorkerAppComponent {
  @Input() supportAppForm!: any;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  public featureDetails: string[] = ["Portal Service History ", "Portal Service Report", "Mobile App Leave ", 
  "Client Feedback Rating", "Portal Address ", "Portal Phone ", "Portal Mobile ", "Mobile App File Upload", 
  "Shift Notes Auto-Save", "Shift Notes Mandatory"];

  constructor() {
    console.log(this.supportAppForm)
  }


  addFeature(item){
    let index = this.supportAppForm.indexOf(item)

    if(index === -1) this.supportAppForm.push(item);
      else this.supportAppForm.splice(index, 1);

    console.log(this.supportAppForm)
  }

  ngOnDestroy(){
    this.isValid.emit({formStep: 3, isValid: this.supportAppForm.length > 0})
  }
}

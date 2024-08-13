import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'app-responsible-parties',
  animations: [mainAnimations],
  templateUrl: './responsible-parties.component.html',
  styleUrls: ['./responsible-parties.component.scss']
})
export class ResponsiblePartiesComponent {
  @Input() createClientForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }
}

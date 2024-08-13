import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'client-service-schedule-service-tasks',
  animations: [mainAnimations],
  templateUrl: './service-tasks.component.html',
  styleUrls: ['./service-tasks.component.scss']
})
export class ServiceTasksComponent implements OnInit {
  @Input() serviceTaskForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  
  public dateNow: Date = new Date();

  constructor() {
    
  }

  ngOnInit(): void {
  }
}

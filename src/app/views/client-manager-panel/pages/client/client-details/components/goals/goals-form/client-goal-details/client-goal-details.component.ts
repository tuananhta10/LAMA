import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'app-client-goal-details',
  animations: [mainAnimations],
  templateUrl: './client-goal-details.component.html',
  styleUrls: ['./client-goal-details.component.scss']
})
export class ClientGoalDetailsComponent implements OnInit {
  @Input() createClientForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();

  @Input() navigation: any = {};
  @Input() isUpdate: boolean = false;
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();

  public goalTypeOptions: any[] = ["No progress", "Current goals", "Partial goals", "Goal Achieved at Target Goal", "Goal Achieved beyond Goal", "N/A"];
  public goalOptions:any[] = ["Goal Option 1", "Goal Option 2"];
  public goalClientOptions:any[] = ["Goal Client 1", "Goal Client 2"];

  constructor() {
  }

  ngOnInit() {
    this.formStep.emit('client-goals-details');
  }

}

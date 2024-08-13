import { 
  Component, 
  OnInit, 
  AfterViewInit, 
  QueryList, 
  ViewChild, 
  ViewChildren, 
  Input, 
  Output, 
  EventEmitter, 
  OnChanges 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { MatStep, MatStepper, StepperOrientation } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { StepModel } from './model';

@Component({
  selector: 'lama-stepper',
  animations: [mainAnimations],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input() stepperList: StepModel[] = [];
  @Input() saveClicked: boolean = true;

  // @Input() stepperList = [];
  @Input() orientation: StepperOrientation = 'vertical';
  @Input() selectedIndex: number = 0;
  @Input() isVerticalClick: boolean = false;
  @Output() selectionChanged: EventEmitter<StepperSelectionEvent> = new EventEmitter<StepperSelectionEvent>();

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChildren('matStep') matSteps:QueryList<MatStep>;

  public isLinear: boolean = false;
  public stepsList: any = [];
  
  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.stepsList = this.matSteps.map((step: MatStep) => { return { completed: step.completed } });
    //console.log(this.matSteps);
  }

  ngOnChanges(): void {
    // this.stepper ? this.stepper.selectedIndex = this.selectedIndex : '';
  }

  public reset(): void {
    this.matSteps.forEach((step: MatStep) => {
      //console.log(step.completed);
      // step.reset();
    });
  }

  public next() {
    this.stepper.next();
    this.stepsList = this.matSteps.map((step: MatStep) => { return { completed: step.completed } });
    /*console.log(this.stepper);
    console.log(this.matSteps);*/
    
  }

  public navigateToStep(e: StepperSelectionEvent) {
    /*setTimeout(() => {
      this.selectionChanged.emit(e);
    }, 100)*/

    this.selectionChanged.emit(e);
  }

  public previous() {
    this.stepper.previous();
  }

  public isVerticalClickEnabled() {
    let ret = false;

    if(this.isVerticalClick && this.orientation == 'vertical'){
      ret = false;
    } 

    else if(this.orientation == 'horizontal') {
      ret = false
    } 

    else {
      ret = true;
    }

    return ret;
  }

}

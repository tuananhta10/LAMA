import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'client-medical-history-details',
  animations: [mainAnimations],
  templateUrl: './medical-history-details.component.html',
  styleUrls: ['./medical-history-details.component.scss']
})
export class MedicalHistoryDetailsComponent implements OnInit {

  @Input() medicalInfoForm!: FormGroup;

  public clientId: string[] = [
    "44234441123",
    "46345778823",
    "52345418755"
  ];

  public physical: string[] = [
    'High Blood Pressure',
    'Shortness of Breath',
    'Heart Pacemake',
    'Anaesthetic',
    'Heart Disease',  
    'Lung Disease / Asthma',  
    'Tuberculosis (T.B.)',  
    'Liver Disease / Gastro Intestina'
  ];

  public mental: string[] = [
    'Depression',  
    'Anxiety',  
    'PTSD',  
    'Schezoprenia',  
    'Stress',  
    'Chronic Depression',  
    'Alzheimers',  
    'Dementia'
  ];
  
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepperConstants } from '../../stepper-constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up-finance-and-legal',
  templateUrl: './finance-and-legal.component.html',
  styleUrls: ['./finance-and-legal.component.scss']
})
export class FinanceAndLegalComponent implements OnInit {

  financeAndLegalForm!: FormGroup;
  @Input() organizationData: any = {};
  @Input() financeAndLegalFormData: any;
  @Input() navigation: any = {};
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeUpdates: EventEmitter<any> = new EventEmitter<any>();

  invoicesOptions: any = [{id:1, value: true, name: "Yes"}, {id:2, value: false, name:"No"}]
  insuranceOptions:any = [{id:1, value: "Less than $10 million", name: "Less than $10 million"}, {id:2, value: "$10 million or more", name:"$10 million or more"}]
  gstCodes: any[] = [
    { value: "P1", text: "P1: Tax Claimable (10%)" },
    { value: "P2", text: "P2: GST Free" },
    { value: "P5", text: "P5: GST out of Scope" },
  ];
  gstCodeOptions = this.gstCodes.map(el => el.text);
  submitting: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.financeAndLegalForm = this.formBuilder.group({
      //invoices_secondary_email: [this.financeAndLegalFormData ? this.financeAndLegalFormData.invoices_secondary_email : ''],
      insurance_expiration: [this.financeAndLegalFormData ? this.financeAndLegalFormData.insurance_expiration : ''],
      liability_insurance: [this.financeAndLegalFormData ? this.financeAndLegalFormData.liability_insurance * 1 : ''],
      gst_code: [this.financeAndLegalFormData ? this.financeAndLegalFormData?.gst_code : ''],
      gst_code_input: [this.financeAndLegalFormData ? this.financeAndLegalFormData?.gst_code_input : ''],

      bank: [this.organizationData ? this.financeAndLegalFormData?.bank : ''],
      bsb: [this.organizationData ? this.financeAndLegalFormData?.bsb : ''],
      acct_number: [this.organizationData ? this.financeAndLegalFormData?.acct_number : ''],
      acct_name: [this.organizationData ? this.financeAndLegalFormData?.acct_name : ''],

      payment_terms: [this.organizationData ? this.financeAndLegalFormData?.payment_terms : ''],
    });
    
    this.formStep.emit(StepperConstants.financeAndLegal);
    this.valueChangeUpdate();
  }

  valueChangeUpdate(){
    this.financeAndLegalForm.controls['gst_code_input']
    .valueChanges.subscribe((output) => {
      if(!!output){
        let selectedGST = this.gstCodes.find(el => el.text === output)?.value; 

        this.financeAndLegalForm.controls['gst_code'].setValue(selectedGST);
      }
    });

    this.financeAndLegalForm.controls['liability_insurance']
    .valueChanges.subscribe((output) => {
      if(output && output?.length > 4){
        let selected = this.insuranceOptions.find(el => el.value == output);  

        console.log(selected)

        this.financeAndLegalForm.controls['liability_insurance'].setValue(selected?.id);
      }
    });
  }

  back(){
    this.updateStepper.emit(3);
    this.isValid.emit({formStep: 4, isValid: this.financeAndLegalForm.valid})
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }

  next(){
    if(this.financeAndLegalForm.valid){
      this.submitting = true;
      this.submitData.emit(this.financeAndLegalForm.value);
      this.isValid.emit({formStep: 4, isValid: this.financeAndLegalForm.valid})
      this.updateStepper.emit(5);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
      setTimeout(() => this.submitting = false, 5000);
    }
  }

  ngOnDestroy(): void {
    this.submitData.emit(this.financeAndLegalForm.value);
    this.isValid.emit({formStep: 4, isValid: this.financeAndLegalForm.valid})
  }

}

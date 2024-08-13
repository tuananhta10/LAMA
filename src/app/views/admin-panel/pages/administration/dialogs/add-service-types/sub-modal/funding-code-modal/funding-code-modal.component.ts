import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-funding-code-modal',
  templateUrl: './funding-code-modal.component.html',
  styleUrls: ['./funding-code-modal.component.scss']
})
export class FundingCodeComponent implements OnInit {

  public fundingCodeForm!: FormGroup;
  fundingSourceCodeProviderOptions: any[] = ["Type 1"];
  fundingSourceOptions: any[] = ["Type 1"];
  serviceTypeOptions: any[] = ["Type 1"];
  codeOptions: any[] = ["Type 1"];
  rateCodeOptions: any[] = ["Type 1"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  constructor(
    public dialogRef: MatDialogRef<FundingCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fundingCodeForm = this.formBuilder.group({
      funding_source_code_provider: ['', [Validators.required]],
      funding_source: ['', [Validators.required]],
      group_service: ['', [Validators.required]],
      service_type: ['', [Validators.required]],
      code: ['', [Validators.required]],
      has_ah_rates: ['', [Validators.required]],
      after_hour_rate_code: [''],
      saturday_rate_code: [''],
      saturday_rate_ah_code: [''],
      sunday_rate_code: [''],
      sunday_rate_ah_code: [''],
      public_holiday_rate_code: [''],
      public_holiday_rate_ah_code: [''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.fundingCodeForm.valid){
      this.dialogRef.close(this.fundingCodeForm.value);
    }
  }
}

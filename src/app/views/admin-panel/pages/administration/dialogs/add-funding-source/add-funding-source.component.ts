import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';

@Component({
  selector: 'app-add-funding-source',
  templateUrl: './add-funding-source.component.html',
  styleUrls: ['./add-funding-source.component.scss']
})
export class AddFundingSourceComponent implements OnInit {

  public newFundingSourceForm!: FormGroup;
  public invoiceTypeOptions: any[] =["Single Invoice by Client", "Invoice by Client by Line Item"];
  public fundingSourceProviderOptions: any[] = [{id: 1, name: "CARERG"}, {id: 2, name: "DCDS"}, {id: 3, name: "ICWA"}, {id: 4, name:"NDIA"}, {id: 4, name:"Self-Funded"}].map(el => el.name);
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  constructor(
    public dialogRef: MatDialogRef<AddFundingSourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminFundingSource: Store<AdminProfileState>,
  ) { }

  ngOnInit(): void {
    this.newFundingSourceForm = this.formBuilder.group({
      code: [this.data ? this.data?.code: '', [Validators.required]],
      full_name: [this.data ? this.data?.full_name: '', [Validators.required]],
      funding_source_provider: [this.data ? this.data?.funding_source_provider: '', [Validators.required]],
      self_funded: [this.data ? this.data?.self_funded : false],
      registration_number: [this.data ? this.data?.registration_number: '', [Validators.required]],
      invoice_type: [this.data ? this.data?.invoice_type: '', [Validators.required]],
      client_name_in_invoice_number: [this.data ? this.data?.client_name_in_invoice_number: false],
      include_in_invoice_sync: [this.data ? this.data?.include_in_invoice_sync: false],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newFundingSourceForm.valid && !this.data){
      this.adminFundingSource.dispatch({
        type: FundingSourceActionTypes.SAVE_FUNDING_SOURCE,
        payload: this.newFundingSourceForm.value 
      });

      this.close();
    }
    else if(this.newFundingSourceForm.valid && this.data) {

      let editData = {
        id: this.data.id,
        ...this.newFundingSourceForm.value
      }
      this.adminFundingSource.dispatch({
        type: FundingSourceActionTypes.EDIT_FUNDING_SOURCE,
        payload: editData
      });

      this.close();
    }
  }

}

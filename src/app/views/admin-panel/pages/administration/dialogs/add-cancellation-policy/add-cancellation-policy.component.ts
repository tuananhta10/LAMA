import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CancellationPolicyActionTypes } from '@main/views/admin-panel/store/actions/admin-cancellation-policy.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-cancellation-policy',
  templateUrl: './add-cancellation-policy.component.html',
  styleUrls: ['./add-cancellation-policy.component.scss']
})
export class AddCancellationPolicyComponent implements OnInit {
  public cancellationPolicyForm!: FormGroup;
  public loading: boolean = false;

  private cancellationPolicy$: any;
  private req: Subscription;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  constructor(
    public dialogRef: MatDialogRef<AddCancellationPolicyComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminCancellationPolicy: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.cancellationPolicyForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      charge_percentage: [this.data ? this.data?.charge_percentage : '', [Validators.required]],
      max_payment_hours: [this.data ? this.data?.max_payment_hours : '', [Validators.required]],
      description: [this.data ? this.data?.description : '', [Validators.required]],
      charge_to_clients: [this.data ? this.data?.charge_to_clients : false],
      pay_employees: [this.data ? this.data?.pay_employees : false],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    // SAVE NEW RECORD
    if(this.cancellationPolicyForm.valid && !this.data){
      this.adminCancellationPolicy.dispatch({
        type: CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY,
        payload: this.cancellationPolicyForm.value
      }); 

      this.close();
    }

    // UPDATE RECORD HERE
    else if(this.cancellationPolicyForm.valid && this.data){
      let editData= {
        ...this.cancellationPolicyForm.value,
        id: this.data.id
      }
      this.adminCancellationPolicy.dispatch({
        type: CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY,
        payload: editData
      }); 

      this.close();
    }
  }

}

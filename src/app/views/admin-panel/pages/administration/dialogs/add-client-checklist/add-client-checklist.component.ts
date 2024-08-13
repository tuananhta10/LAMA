import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FundingSourceActionTypes } from '@main/views/admin-panel/store/actions/admin-funding-source.action';
import { ClientChecklistActionTypes } from '@main/views/admin-panel/store/actions/admin-client-checklist.action';

@Component({
  selector: 'app-add-client-checklist',
  templateUrl: './add-client-checklist.component.html',
  styleUrls: ['./add-client-checklist.component.scss']
})
export class AddClientChecklistComponent implements OnInit {

  private req: Subscription;
  public newChecklistForm!: FormGroup;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  public fundingSource: any[] = [];
  fundingSource$: any;
  loading: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<AddClientChecklistComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientChecklist: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.adminClientChecklist.dispatch({
      type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST
    });

    this.subscribeFundingSourceEnum();

    this.newChecklistForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      funding_source_id: [this.data ? this.data?.funding_source_id : '']
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newChecklistForm.valid  && !this.data){
      this.adminClientChecklist.dispatch({
        type: ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST,
        payload: this.newChecklistForm.value
      }); 

      this.close();
    }  else if(this.newChecklistForm.valid  && this.data){

      let editData = {
        ...this.newChecklistForm.value,
        id: this.data.id
      }

      this.adminClientChecklist.dispatch({
        type: ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST,
        payload: editData
      }); 

      this.close();
    }

    else {
      this.close();
    }
  }

  subscribeFundingSourceEnum(){
    this.fundingSource$ = this.adminClientChecklist.pipe(select(state => state.fundingSource));
    this.req = this.fundingSource$.subscribe((results: any) => {
      this.loading = results.pending;

      if(results.fundingSourceList.length > 0){
        results.fundingSourceList.forEach(element => {
          element.name = element.funding_source_provider;
        });
      }
      this.fundingSource = results.fundingSourceList;
    })
  }

}

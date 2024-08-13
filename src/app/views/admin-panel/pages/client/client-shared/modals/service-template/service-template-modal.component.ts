import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subject, Subscription } from 'rxjs';
import { ClientGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-client-group.action';

@Component({
  selector: 'app-service-template-modal',
  templateUrl: './service-template-modal.component.html',
  styleUrls: ['./service-template-modal.component.scss'],
})
export class ServiceTemplateModalComponent implements OnInit, OnDestroy {

  serviceTemplateForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  private clientGroupData$: any;
  private branchesEnums$: any;
  public branchesEnum: any;
  public groupEnum: any;
  loading:boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ServiceTemplateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminEnumStore: Store<AdminProfileState>
  ) {
    this.branchesEnums$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
    this.clientGroupData$ = this.adminEnumStore.pipe(select(state => state.clientGroup));

  }

  ngOnInit(): void {
    this.adminEnumStore.dispatch({
      type: ClientGroupActionTypes.GET_CLIENT_GROUP_LIST
    }); 

    this.subscribeBranchesEnum();
    this.serviceTemplateForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      main_branch_obj: [this.data ? this.data?.main_branch_id : ''],
      group: [this.data ? this.data?.group : ''],
      end_of_service_date: [this.data ? new Date(this.data?.end_of_service_date * 1000) : ''],
    });
  }

  subscribeBranchesEnum(){
    let branchesEnum = this.branchesEnums$;
    this.req = branchesEnum.subscribe((results: any) => {
      this.branchesEnum = results.branches;
      this.loading = results.pending;
    });

    this.req = this.clientGroupData$.subscribe((results: any) => {
      console.log(results.clientGroupList)
      this.groupEnum = results.clientGroupList.map(el => el.name);
      this.loading = results.pending;
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.serviceTemplateForm.valid){
      this.dialogRef.close(this.serviceTemplateForm.value);
    }
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }
}

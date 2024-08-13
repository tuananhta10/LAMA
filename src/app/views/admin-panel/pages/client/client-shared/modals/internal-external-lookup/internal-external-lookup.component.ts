import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ExternalProviderActionTypes } from '@main/views/admin-panel/store/actions/admin-external-provider.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

@Component({
  selector: 'app-internal-external-lookup',
  templateUrl: './internal-external-lookup.component.html',
  styleUrls: ['./internal-external-lookup.component.scss']
})
export class InternalExternalLookupComponent implements OnInit {
  private req: Subscription;
  private employeesData$: any;
  private externalProvider$: any;

  public careWorkerForm!: FormGroup;
  public localData:any;
  public loading: boolean = true;
  public externalProviderList: any[] = [];
  public employeeOptions:any;
  public radioOptions:any[] = [{id: true, name: "Internal", value: true}, {id: false, name:"External", value: false}];
  
  constructor(
    public dialogRef: MatDialogRef<InternalExternalLookupComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private employeeListStore: Store<EmployeeListState>,
    private adminExternalProvider: Store<AdminProfileState>,
  ) {
    this.localData = data;
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
    this.externalProvider$ = this.adminExternalProvider.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.careWorkerForm = this.formBuilder.group({
      employee: [''],
      external_provider: [''],
      internal_external: [true, [Validators.required]]
    });

    this.subscribeEnum();


  }

  subscribeEnum(){
    this.req = this.employeesData$.subscribe((results: any) => {
      this.employeeOptions = results?.employees.employeeList;
      this.loading = results?.employees.employeeListPending;
    });

    this.req.add(this.externalProvider$.subscribe((result => {
        this.externalProviderList = result?.externalProvider.externalProviderList;
        this.externalProviderList.forEach((el) => el['name'] = el?.full_name);
        this.loading = result?.externalProvider?.pending;
      })
    ));

    // dispatch
    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });

    this.adminExternalProvider.dispatch({
      type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    let employee = this.careWorkerForm.controls['employee'].value;
    let externalProvider = this.careWorkerForm.controls['external_provider'].value;
      
    if(employee || externalProvider){
      let is_external=  !this.careWorkerForm.controls['internal_external'].value;
      let name = !is_external ? employee?.name : externalProvider?.name;
 
      if(this.data?.title === 'Team Leader'){
        this.dialogRef.close({
          id: this.data?.careWorkersData?.id, 
          team_leader_id: employee?.id, // employee id
          team_leader_external_id: externalProvider?.id, 
          team_leader_name: name,
          is_team_leader_external: is_external,
      });
      }

      else {
        this.dialogRef.close({
          id: this.data?.careWorkersData?.id, 
          
          coordinator_id:  employee?.id, // employee id
          coordinator_external_id: externalProvider?.id, 
          coordinator_name: name,
          is_coordinator_external: is_external,
        });
      }
      
    }
  }

}

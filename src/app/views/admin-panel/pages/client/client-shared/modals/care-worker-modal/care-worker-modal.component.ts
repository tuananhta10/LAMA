import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';

@Component({
  selector: 'app-care-worker-modal',
  templateUrl: './care-worker-modal.component.html',
  styleUrls: ['./care-worker-modal.component.scss'],
})
export class CareWorkerModalComponent implements OnInit {

  careWorkerForm!: FormGroup;
  localData:any;

  public loading: boolean = true;
  private req: Subscription;
  private employeesData$: any;
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  employeeOptions:any;

  constructor(
    public dialogRef: MatDialogRef<CareWorkerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private employeeListStore: Store<EmployeeListState>,
  ) {
    this.localData = data;
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.careWorkerForm = this.formBuilder.group({
      employee: ['', [Validators.required]],
      preferred_careworker: [false, [Validators.required]]
    });

    this.subscribeEnum();

    this.employeeListStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
  }

  subscribeEnum(){
    this.req = this.employeesData$.subscribe((results: any) => {
      this.employeeOptions = results?.employees.employeeList.filter(el => this.data.careworkers_added.indexOf(el.id) === -1);

      console.log(this.data.careworkers_added)

      this.loading = results?.employees.employeeListPending;
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.careWorkerForm.valid){
      this.dialogRef.close(this.careWorkerForm.value);
    }
  }
}

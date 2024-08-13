import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { LanguageActionTypes } from '@main/views/admin-panel/store/actions/admin-language.action';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BranchActionTypes } from '@main/views/admin-panel/store/actions/admin-branch.action';
import { CareWorkerModalComponent } from '../../../client-shared';
import { SearchClientModalComponent } from '../search-client-modal/search-client-modal.component';
import { ClientGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-client-group.action';
//import { CareWorkerModalComponent } from '../../modals/care-worker-modal/care-worker-modal.component';


@Component({
  selector: 'app-add-client-group',
  templateUrl: './add-client-group.component.html',
  styleUrls: ['./add-client-group.component.scss']
})
export class AddClientGroupComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  private clientGroup$: any;
  private req: Subscription;
  public clientGroupForm!: FormGroup;
  public branchEnums: any[] = [];

  public clientColumns:any[] = [
    {name: 'Name', field: 'name'}, {name: 'Email', field: 'email_address'}, {name: 'Mobile Phone', field: 'mobile_phone_no'},
    {name: 'Home Phone', field: 'home_phone_no'}, {name: 'Suburb', field: 'suburb'}, {name: 'Disability Type', field: 'disability_type'}
  ];

  public clientTableData: any[] = [];
  public clientData:any = {
    add: [],
    delete: []
  }
  branchesEnums$: any;
  branchesEnums: any;
  public loading: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<AddClientGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogClient: MatDialog,
    private formBuilder: FormBuilder,
    private adminClientGroup: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.clientGroupForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      branch_id: [this.data ? this.data?.branch_id : ''],

    });
    
    this.subscribeBranchesEnum();

    this.adminClientGroup.dispatch({
      type: BranchActionTypes.GET_BRANCH_LIST
    });

    if(this.data?.group_member?.length > 0){
      this.data?.group_member?.forEach(el => {
        this.clientTableData.push(el?.client[0]);
      });
    }
  }

  subscribeBranchesEnum(){
    this.branchesEnums$ = this.adminClientGroup.pipe(select(state => state.branch));
    this.req = this.branchesEnums$.subscribe((results: any) => {
      this.branchEnums = results.branchList;
      this.loading = results.pending;
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
   if(this.clientGroupForm.valid  && !this.data){
    let data = {
      ...this.clientGroupForm.value,
      "group-member": this.clientData
    }

    this.adminClientGroup.dispatch({
      type: ClientGroupActionTypes.SAVE_CLIENT_GROUP,
      payload: data
    }); 

   this.close();
   } else if (this.clientGroupForm.valid  && this.data) {
    let data = {
      ...this.clientGroupForm.value,
      "group-member": this.clientData,
      id: this.data.id
    }

    console.log("CLIENT DATA", this.clientData)

    this.adminClientGroup.dispatch({
      type: ClientGroupActionTypes.EDIT_CLIENT_GROUP,
      payload: data
    }); 

    this.close();
   }
  }

  openClientModal(event){
    let careWorkerDialog = this.dialogClient.open(
      SearchClientModalComponent,
      {
        //height: '920px',
        width: '25vw',
        data: {
          client_added: [...this.clientTableData].map(el => el.id)
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        this.clientTableData.push(result.client)
        this.clientData.add.push({client_id: result.client.id});
      }
    })
  }

  deleteClientModal(index: number){
    console.log(index, this.clientTableData)

    this.clientData.delete.push({client_id: this.clientTableData[index].id});
    this.clientTableData.splice(index, 1);
  }

}

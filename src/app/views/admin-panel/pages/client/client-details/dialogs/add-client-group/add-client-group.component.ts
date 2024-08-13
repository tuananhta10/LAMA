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
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';


@Component({
  selector: 'app-add-client-group',
  templateUrl: './add-client-group.component.html',
  styleUrls: ['./add-client-group.component.scss']
})
export class AddClientGroupComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  private clientGroup$: any;
  private req: Subscription;
  private branchesEnums$: any;
  private pricelistEnum$: any;  
  public clientGroupForm!: FormGroup;
  public branchEnums: any[] = [];
  public clientColumns:any[] = [
    {name: 'Name', field: 'name'}, 
    {name: 'Email', field: 'email_address', capitalize: true }, 
    {name: 'Mobile Phone', field: 'mobile_phone_no'},
    {name: 'Home Phone', field: 'home_phone_no'},
    /*{name: 'Funding Source', field: 'funding_source_code'}, {name: 'Service Required', field: 'client_service_required'},*/ 
    {name: 'Disability Type', field: 'disability_type'}
  ];
  public clientTableData: any[] = [];
  public clientData:any = {
    add: [],
    delete: []
  }
  public branchesEnums: any;
  public pricelistEnum: any;
  public loading: boolean = false;
  public radioOptions:any[] = [{id: true, name: "Individual", value: true}, {id: false, name:"Pro-rata", value: false}];
  public priceListLoading: boolean = false;

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
      price_list_id: [this.data ? this.data?.price_list_id : ''],
      rate_type: [this.data ? this.data?.rate_type : true],
      no_max_employee: [this.data ? (this.data?.no_max_employee || 1) : 1],
    });
    
    this.subscribeBranchesEnum();

    if(this.data?.group_member?.length > 0){
      this.data?.group_member?.forEach(el => {
        this.clientTableData.push(el?.client[0]);
      });
    }
  }

  subscribeBranchesEnum(){
    this.branchesEnums$ = this.adminClientGroup.pipe(select(state => state.branch));
    this.pricelistEnum$ = this.adminClientGroup.pipe(select(state => state.priceList));
    this.req = this.branchesEnums$.subscribe((results: any) => {
      this.branchEnums = results.branchList;
      this.loading = results.pending;
    });

    this.req.add(this.pricelistEnum$.subscribe((results: any) => {
      this.priceListLoading = results.pending;

      if(results?.priceListList?.length > 0){
        results.priceListList.forEach(element => {
          element.name = `${element?.service_type_registration_group_number} - ${element?.service_type_support_item_name}`
        });

        this.pricelistEnum = results?.priceListList;
      }
    }));

    /*DISPATCH*/
    this.adminClientGroup.dispatch({
      type: PriceListActionTypes.GET_PRICE_LIST_LIST
    });
    
    this.adminClientGroup.dispatch({
      type: BranchActionTypes.GET_BRANCH_LIST
    });
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
    } 

   else if (this.clientGroupForm.valid  && this.data) {
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
    let supportItem = this.clientGroupForm.controls['price_list_id'].value;

    if(Number.isInteger(supportItem)){
      let careWorkerDialog = this.dialogClient.open(
        SearchClientModalComponent,
        {
          //height: '920px',
          width: '25vw',
          data: {
            client_added: [...this.clientTableData],  
            supportItem: supportItem,
            priceList: this.pricelistEnum,
            fromGroup: true
          },
        }
      );

      careWorkerDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          let clientDetails = {
            client_id: result?.client?.client_id,
            name: result?.client?.client_name,
            email_address: result?.client?.client_email_address,
            mobile_phone_no: result?.client?.client_mobile_phone_no,
            home_phone_no: result?.client?.client_home_phone_no,
            funding_source_code: result?.client?.funding_source_code,
            client_service_required: result?.client?.client_name,
            disability_type: result?.client?.client_name
          }

          /*
            name
            email_address
            mobile_phone_no
            funding_source_code
            client_service_required
            disability_type
          */

          this.clientTableData.push(clientDetails)
          this.clientData.add.push({client_id: clientDetails?.client_id});
        }
      })
    }

    else {
      this.snackBar.open("Please select a Group Support Item before selecting participants", "", {
        duration: 4000,
        panelClass: 'danger-snackbar'
      });
    }
  }

  deleteClientModal(index: number){
    if(this.data){
      let dataInd = this.data?.group_member?.findIndex(item => item.client[0] ===  this.clientTableData[index]);
      
      if(dataInd){
        this.clientData.delete.push({id: this.data?.group_member[dataInd].id});
        this.clientTableData.splice(index, 1);
      }
    }

    else {
      this.clientTableData.splice(index, 1);  
      this.clientData.add.splice(index, 1);
    }
  }

}

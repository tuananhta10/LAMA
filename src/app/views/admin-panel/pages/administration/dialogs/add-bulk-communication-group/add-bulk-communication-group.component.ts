import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-bulk-communication-group.action';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';

@Component({
  selector: 'app-add-bulk-communication-group',
  templateUrl: './add-bulk-communication-group.component.html',
  styleUrls: ['./add-bulk-communication-group.component.scss']
})
export class AddBulkCommunicationGroupComponent implements OnInit {
  private req: Subscription;
  private employeesData$: any;
  private clientsData$: any;
  private communicationGroupData$: any;

  public newGroupForm!: FormGroup;
  public loading: boolean = true;
  public employeeList: any[] = [];
  public clientList: any[] = [];
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public communicationType: string[] = ["Email", "SMS", "Chat"];  
  public listType: string[] = ["Dynamic", "Static"];  
  public recipientType: string[] = ["Participants", "Employees"];
  public stepper: number = 1;  
  public checkBoxOptions:any = [];
  public filteredCheckboxOptions: any = [];
  public checkAll: boolean = false;
  public searchBy: any;

  public communicationGroupDetail: any;

  constructor(private adminCommunicationGroup: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<AddBulkCommunicationGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminInterest: Store<AdminProfileState>,
    private employeeListStore: Store<EmployeeListState>,
    private clientListStore: Store<ClientListState>,
    private snackBar: MatSnackBar
  ) { 
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.getEmployeeListData();
    this.getClientListData();

    this.newGroupForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
      communication_type: [this.data ? this.data?.communication_type : '', [Validators.required]],
      //list_type: [this.data ? this.data?.list_type : '', [Validators.required]],
      recipient_type: [this.data ? this.data?.recipient_type : '', [Validators.required]],
    });

    this.subscribeToRecipientChange();

    if(this.data){
      this.subscribeCommunicationGroup();
      this.getCommunicationGroup();
    }
  }

  getCommunicationGroup(){
    this.adminCommunicationGroup.dispatch({
      type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP,
      payload: this.data?.id
    }); 
  }


  subscribeCommunicationGroup(){
    this.communicationGroupData$ = this.adminCommunicationGroup.pipe(select(state => state.communicationGroup));

    this.req =  this.communicationGroupData$.subscribe((communicationGroup: any) => {
      this.loading = communicationGroup.pending;

      if(communicationGroup?.communicationGroup){
        this.communicationGroupDetail = communicationGroup?.communicationGroup[0];
      }
    });
  }

  generateCheckBox(recipient_type: string){
    if(recipient_type === "Employees"){
      this.checkBoxOptions = [];
      this.employeeList.forEach((el) => {
        this.checkBoxOptions.push({
          id: el?.id,  
          full_name: `${el?.first_name} ${el?.last_name}`,  
          phone_number: `${el?.mobile_phone_no || el?.work_phone_no || el?.home_phone_no}`,
          checked: false,
          ...el
        });
      });

      this.checkBoxOptions = this.checkBoxOptions.sort((a,b) => a?.first_name.localeCompare(b?.first_name))
      this.filteredCheckboxOptions = [...this.checkBoxOptions].filter(el => el?.phone_number != "null" || el?.email_address);
    }

    else if(recipient_type === 'Participants'){
      this.checkBoxOptions = [];
      this.clientList.forEach((el) => {
        this.checkBoxOptions.push({
          id: el?.id,  
          full_name: `${el?.first_name} ${el?.last_name}`,  
          phone_number: `${el?.mobile_phone_no || el?.home_phone_no}`,
          checked: false,
          ...el
        });
      });

      this.checkBoxOptions = this.checkBoxOptions.sort((a,b) => a?.first_name.localeCompare(b?.first_name))
      this.filteredCheckboxOptions = [...this.checkBoxOptions].filter(el => el?.phone_number != "null" || el?.email_address);
    }
  }

  subscribeToRecipientChange(){
    this.newGroupForm.controls['recipient_type'].valueChanges
    .subscribe((result) => {
      this.generateCheckBox(result);
    });
  }

  // employee list data
  getEmployeeListData(){
    this.employeeListStore.dispatch({ type:  EmployeeListActionTypes.GET_EMPLOYEE_LIST })

    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      if(results?.employees?.employeeList?.length > 0){
        this.employeeList = results?.employees?.employeeList;
        let recipient_type = this.newGroupForm?.controls['recipient_type'].value;

        if(this.data && recipient_type && this.employeeList){
          this.generateCheckBox(recipient_type);
          setTimeout(() => {
            this.communicationGroupDetail?.communication_group_member?.forEach(el => {
              let index = this.filteredCheckboxOptions.findIndex(_el => el?.employee_id === _el?.id)
              
              if(index >= 0 && recipient_type === 'Employees'){
                this.filteredCheckboxOptions[index]['checked'] = true;
                console.log("EMPLOYEE", index, this.filteredCheckboxOptions)
              }  
            })

          }, 500)
        }
      }

      this.loading = results?.employees?.employeeListPending;
    });
  }

  getClientListData(){
    this.clientListStore.dispatch({ type: ClientListActionTypes.GET_CLIENT_LIST });
    
    // Subscribe to storage
    this.req = this.clientsData$.subscribe((results: any) => {
      // Subscribe to list store
      if(!results?.clients?.deletedData){
        this.clientList = results?.clients.clientList;
        let recipient_type = this.newGroupForm?.controls['recipient_type'].value;

        if(this.data && recipient_type && this.clientList){
          this.generateCheckBox(recipient_type)
          setTimeout(() => {
            this.communicationGroupDetail?.communication_group_member?.forEach(el => {
              let index = this.filteredCheckboxOptions.findIndex(_el => el?.client_id === _el?.id)
              
              if(index >= 0 && recipient_type === 'Participants'){
                this.filteredCheckboxOptions[index]['checked'] = true;
                console.log("PARTICIPANT", index)
              } 
            })
          }, 500)

          /*let index = this.filteredCheckboxOptions.findIndex(_el => el?.client_id === _el?.id)
          
          if(index >= 0 && recipient_type === 'Participants'){
            this.filteredCheckboxOptions[index]['checked'] = true;
            console.log("PARTICIPANT", index)
          } */
        }
      }
      this.loading = results?.clients?.clientListPending;
    });
  }


  onChangeCheckbox(event, i){

  }

  checkAllEmployee(){
    return this.filteredCheckboxOptions.forEach((el) => {
      el.checked = this.checkAll;
    });
  }

  searchDataSource(){
    const listDataSource = [...this.checkBoxOptions]
    .filter(el => {
      let source = {
        id: el?.id,  
        full_name: el?.full_name,  
        phone_number: el?.phone_number,  
        checked: el?.checked,  
      };

      return JSON.stringify(source).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.filteredCheckboxOptions = listDataSource.filter(el => el?.phone_number != "null");;
  }


  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newGroupForm.valid  && !this.data){
      let body = {
        created_by: this.loggedUser?.id,
        name: this.newGroupForm?.get('name')?.value,
        description: this.newGroupForm?.get('description')?.value,
        communication_type: this.newGroupForm?.get('communication_type')?.value,
        recipient_type: this.newGroupForm?.get('recipient_type')?.value,
        'communication-group-member': this.filteredCheckboxOptions.filter(el => el?.checked).map(el => {
          let recipient = this.newGroupForm?.get('recipient_type')?.value;
          
          if(recipient === 'Employees'){
            return {
              employee_id: el?.id
            }
          }

          else if(recipient === 'Participants'){
            return {
              client_id: el?.id
            }
          }
        })
      }

      console.log(body)

      this.adminInterest.dispatch({
        type: CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP,
        payload: body
      }); 

      this.close();
    }  

    else if(this.newGroupForm.valid  && this.data){
      let checked = this.filteredCheckboxOptions.filter(el => el?.checked);  
      let current = this.communicationGroupDetail?.communication_group_member;
      let recipient_type = this.newGroupForm?.get('recipient_type')?.value;

      let oldRecord: any[] = [];  
      let addToList: any[] = [];  
      let deleteToList: any[] = [];

      // groupValidator
      const groupValidator = (recipient_id, recordItem, el) => {
        // check to old record
        recordItem = current.find(_el => el?.id === _el[`${recipient_id}`])
        let obj = {
          id: recordItem?.id
        };

        // if it exist
        if(recordItem){
          // check if element is checked
          if(el?.checked === true){
            obj[`${recipient_id}`] = el?.id;
            oldRecord.push(obj)
          }

          // if you unchecked it
          else if(el?.checked === false){
            obj[`${recipient_id}`] = el?.id;
            deleteToList.push(obj)
          }
        }

        // if it's checked and not yet exist on old record
        else if(!recordItem && el.checked === true){
          obj[`${recipient_id}`] = el?.id;
          addToList.push(obj)
        }
      }

      this.filteredCheckboxOptions.forEach(el => {
        let recordItem;

        if(recipient_type === 'Employees'){
          groupValidator('employee_id', recordItem, el)
        }

        else {
          groupValidator('client_id', recordItem, el)
        }
      });

      //let add = 
      let body = {
        id: this.data.id,
        name: this.newGroupForm?.get('name')?.value,
        description: this.newGroupForm?.get('description')?.value,
        communication_type: this.newGroupForm?.get('communication_type')?.value,
        recipient_type: recipient_type,
        'communication-group-member': {
          add: addToList,
          //update: oldRecord,
          delete: deleteToList
        }
        
      }

      console.log(body)

      this.adminInterest.dispatch({
        type: CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP,
        payload: body
      }); 

      this.close();
    }

    else {
      this.close();
    }
  }
}

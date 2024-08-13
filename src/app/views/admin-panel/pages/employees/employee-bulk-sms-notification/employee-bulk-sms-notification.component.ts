import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { EmployeeBulkSMSActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-bulk-sms.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { CommunicationGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-bulk-communication-group.action';
import { CommunicationTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-communication-template.action';

@Component({
  selector: 'app-employee-bulk-sms-notification',
  animations: [mainAnimations],
  templateUrl: './employee-bulk-sms-notification.component.html',
  styleUrls: ['./employee-bulk-sms-notification.component.scss']
})
export class EmployeeBulkSmsNotificationComponent implements OnInit {
  private req: Subscription;
  private employeesData$: any;
  public employeeBulkSMS$: any;
  private communicationTemplateData$: any;
  private communicationGroupData$: any;

  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public loading: boolean = true;
  public employeeList: any[] = [{
    id: this.loggedUser?.id,  
    name: `${this.loggedUser?.first_name} ${this.loggedUser?.last_name}`
  }];
  public smsForm: FormGroup;
  public checkBoxOptions:any = [];
  public filteredCheckboxOptions: any = [];
  public test: string = "James";
  public checkAll: boolean = false;
  public searchBy: any;
  public templatesList: any[] = [];
  public groupList: any[] = [];
  public groupDetails: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private employeeListStore: Store<EmployeeListState>) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.getEmployeeData();
    this.subscribeToBulkSMS();  
    this.generateSMSForm();
  }

  subscribeToBulkSMS(){
    this.employeeBulkSMS$ = this.employeeListStore.pipe(select(state => state));
    this.communicationGroupData$ = this.employeeListStore.pipe(select(state => state));
    this.communicationTemplateData$ = this.employeeListStore.pipe(select(state => state));
    
    this.req =  this.employeeBulkSMS$.subscribe((employeeSMS: any) => {
      this.loading = employeeSMS?.employeeBulkSMS?.pending || employeeSMS?.employeeBulkSMS?.pendingTemplate;

      console.log(employeeSMS)
    })

    /*COMMUNICATION TEMPLATE*/
    this.req.add(
      this.communicationTemplateData$.subscribe((result: any) => {
        this.loading = result?.communicationTemplate.pending;

        console.log(result?.communicationTemplate)

        if(result?.communicationTemplate.communicationTemplateList.length > 0){
          this.templatesList = result?.communicationTemplate.communicationTemplateList.filter(el => el?.recipient_type === 'Employees' && el?.communication_type === 'SMS');
        }
      })
    );  

    /*COMMUNICATION GROUP*/
    this.req.add(
      this.communicationGroupData$.subscribe((result: any) => {
        this.loading = result?.communicationGroup.pending;

        console.log(result?.communicationGroup)

        if(result?.communicationGroup?.communicationGroupList?.length > 0){
          let groupList =  result?.communicationGroup?.communicationGroupList.filter(el => el?.recipient_type === 'Employees' && el?.communication_type === 'SMS');

          console.log("GROUP LIST", groupList)


          this.groupList = [{id: 1, name: "All Employees"}, ...groupList]
        }

        if(result?.communicationGroup?.communicationGroup?.length > 0){
          let groupMembers = result?.communicationGroup?.communicationGroup[0]?.communication_group_member.map(el => el?.employee[0]);

          console.log(groupMembers)

          this.generateCheckList(groupMembers)
        }
      })
    );  

    // DISPATCH
    this.employeeListStore.dispatch({
      type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP,
      payload: 0
    });

    this.employeeListStore.dispatch({
      type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST
    }); 


    this.employeeListStore.dispatch({
      type: CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST
    }); 
  }

  generateSMSForm(){
    this.smsForm = this.formBuilder.group({
      sms_from: [''],
      sms_from_phone_number: [''],
      sms_subject: [''],
      sms_template: [''],
      sms_group: [''],
      sms_content: [``]
    });

    this.smsForm.controls['sms_template'].valueChanges.subscribe((result) => {
      if(result){
        this.smsForm.controls['sms_content'].setValue(result?.content)
      }
    });

    // get all emails
    this.smsForm.controls['sms_group'].valueChanges.subscribe((result) => {
      if(result){
        this.employeeListStore.dispatch({
          type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP,
          payload: result
        });
      }
    });
  }

  sendSMS(){
    this.snackBar.open("Please wait. Sending sms is currently in progress.", "", {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    let body = { ...this.smsForm.value };  

    this.employeeListStore.dispatch({
      type: EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION,
      payload: body
    });
    
  }

  saveTemplate(){
    this.snackBar.open("Please wait. Saving template is currently in progress.", "", {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    let body = {  
      name: this.smsForm.controls['sms_subject'].value,
      communication_type: 'SMS',
      recipient_type: 'Employees',
      content:  this.smsForm.controls['sms_content'].value,
    }; 
    
    if(body?.content){
      this.employeeListStore.dispatch({
        type: EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE,
        payload: body
      })
    }

    else {
      this.snackBar.open("Error Saving Template. Please add SMS content.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });
    }
  }

  // employee list data
  getEmployeeData(){
    this.employeeListStore.dispatch({ type:  EmployeeListActionTypes.GET_EMPLOYEE_LIST })

    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      if(results?.employees?.employeeList?.length > 0){
        this.employeeList = results?.employees?.employeeList;
        this.generateCheckList(this.employeeList)
        /*this.filteredCheckboxOptions.forEach(el => {
          this.generateTemplate(el)
        });*/
      }

      this.loading = results?.employees?.employeeListPending;
    });
  }

  generateCheckList(array: any[]){
    this.filteredCheckboxOptions = [];
    this.checkBoxOptions = [];

    console.log(array)

    array.filter(el => (el?.mobile_phone_no || el?.work_phone_no || el?.home_phone_no)).forEach((el) => {
      this.checkBoxOptions.push({
        id: el?.id,  
        full_name: `${el?.first_name} ${el?.last_name}`,  
        phone_number: `${el?.mobile_phone_no || el?.work_phone_no || el?.home_phone_no}`,
        checked: false,
        ...el
      });
    });

    this.filteredCheckboxOptions = [...this.checkBoxOptions].filter(el => el?.phone_number != "null");
  }

  generateTemplate(el){
    let statc = `[[employee_position_display_name]] Team: 

      Please be informed that there will be an important meeting tomorrow at 10am in the conference room. 
      Agenda and necessary documents have been sent via sms, please review and come prepared to discuss. 

      Thank you.`.split(' ').map(_el => {
      // inside [[ text ]]
      if(_el?.match(/(?<=\[\[)([^\[\]]*)(?=\]\])/g)){
        let converted_el = _el?.replace('[[','').replace(']]','')

        _el = el[`${converted_el}`];

        return _el;
      }

      else return _el;
    });

    let template = statc.join(' ');

    return template;
  }

  onChangeCheckbox(event, i){}

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
}
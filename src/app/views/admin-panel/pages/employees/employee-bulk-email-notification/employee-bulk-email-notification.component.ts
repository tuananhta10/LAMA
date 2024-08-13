import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { CKEditor4 } from 'ckeditor4-angular';
import { EmployeeBulkEmailActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-bulk-email.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationGroupActionTypes } from '@main/views/admin-panel/store/actions/admin-bulk-communication-group.action';
import { CommunicationTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-communication-template.action';

@Component({
  selector: 'app-employee-bulk-email-notification',
  animations: [mainAnimations],
  templateUrl: './employee-bulk-email-notification.component.html',
  styleUrls: ['./employee-bulk-email-notification.component.scss']
})
export class EmployeeBulkEmailNotificationComponent implements OnInit {
  private req: Subscription;
  private communicationTemplateData$: any;
  private communicationGroupData$: any;
  public options: string[] = ["Test"]; 
  public emailForm: FormGroup;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public loading: boolean = true;
  public employeeList: any[] = [{
    id: this.loggedUser?.id,  
    name: `${this.loggedUser?.first_name} ${this.loggedUser?.last_name}`
  }];


  public editorConfig: any = {
    //uiColor: '#e4e4e4',
    width: '100%',
    height: '350px',
    addCss: './employee-bulk-email-notification.scss',
    format_tags: 'p;h1;h2;h3;h4;h5;h6',
    colorButton_colors: 'CF5D4E,454545,FFF,DDD,CCEAEE,66AB16',
    toolbarGroups: [
      //{ name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
      //{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
      //{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
      { name: 'basicstyles', groups: [ 'mode','basicstyles'/*, 'cleanup'*/ ] },
      { name: 'styles' },
      '/',
      { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'insertImage'/* 'bidi'*/ ] },
      { name: 'links' },
      { name: 'insert' },
      //{ name: 'forms' },
      { name: 'colors' },
      //{ name: 'tools' },
      //{ name: 'others' },
      //{ name: 'about' }
    ],
    //removeButtons: [ 'Underline', 'JustifyCenter' ]
  }
  public email_templates: any[] = [];
  public emailGroupList: any[] = [];

  public test: string = "James";
  public employeeBulkEmail$: any;
  public communicationGroupDetail: any;

  constructor(private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private adminEmployee: Store<AdminProfileState>) { }

  attachmentFunc(){}

  ngOnInit(): void {
    this.subscribeToBulkEmail();
    this.generateEmailForm();
    this.subscribeCommunicationGroupSelected();
  }

  subscribeToBulkEmail(){
    this.employeeBulkEmail$ = this.adminEmployee.pipe(select(state => state?.employeeBulkEmail));
    this.communicationGroupData$ = this.adminEmployee.pipe(select(state => state));
    this.communicationTemplateData$ = this.adminEmployee.pipe(select(state => state));
    
    this.req =  this.employeeBulkEmail$.subscribe((employeeEmail: any) => {
      this.loading = employeeEmail?.pending || employeeEmail?.pendingTemplate;

      console.log(employeeEmail)
    })

    /*COMMUNICATION TEMPLATE*/
    this.req.add(
      this.communicationTemplateData$.subscribe((result: any) => {
        this.loading = result?.communicationTemplate.pending;

        console.log(result?.communicationTemplate)

        if(result?.communicationTemplate.communicationTemplateList.length > 0){
          this.email_templates = result?.communicationTemplate.communicationTemplateList.filter(el => el?.recipient_type === 'Employees' && el?.communication_type === 'Email');
        }
      })
    );  

    /*COMMUNICATION GROUP*/
    this.req.add(
      this.communicationGroupData$.subscribe((result: any) => {
        this.loading = result?.communicationGroup.pending;

        console.log(result?.communicationGroup)

        if(result?.communicationGroup?.communicationGroupList?.length > 0){
          this.emailGroupList = result?.communicationGroup?.communicationGroupList.filter(el => el?.recipient_type === 'Employees' && el?.communication_type === 'Email');
        }
      })
    );  

    // DISPATCH
    this.adminEmployee.dispatch({
      type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP,
      payload: 0
    });

    this.adminEmployee.dispatch({
      type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST
    }); 


    this.adminEmployee.dispatch({
      type: CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST
    }); 
  }

  subscribeCommunicationGroupSelected(){
    this.communicationGroupData$ = this.adminEmployee.pipe(select(state => state));

    this.req =  this.communicationGroupData$.subscribe((result: any) => {
      this.loading = result?.communicationGroup.pending;

      if(result?.communicationGroup?.communicationGroup){
        this.communicationGroupDetail = result?.communicationGroup?.communicationGroup[0];
      }
    });
  }

  generateEmailForm(){
    this.emailForm = this.formBuilder.group({
      email_from: [''],
      email_subject: [''],
      email_report_date: [''],
      email_template: [''],
      email_group: [''],
      email_content: [`Type in your email content here`]
    });

    this.emailForm.controls['email_template'].valueChanges.subscribe((result) => {
      if(result){
        this.emailForm.controls['email_content'].setValue(result?.content)
      }
    });

    // get all emails
    this.emailForm.controls['email_group'].valueChanges.subscribe((result) => {
      if(result){
        this.adminEmployee.dispatch({
          type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP,
          payload: result
        });
      }
    });
  }

  sendEmail(){
    this.snackBar.open("Please wait. Sending email is currently in progress.", "", {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    let body = { ...this.emailForm.value };  

    body['email_report_date'] = convertTimestampUtc(body.email_report_date);
    
    this.adminEmployee.dispatch({
      type: EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION,
      payload: body
    });
    
  }


  saveTemplate(){
    this.snackBar.open("Please wait. Saving template is currently in progress.", "", {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    let body = {  
      name: this.emailForm.controls['email_subject'].value,
      communication_type: 'Email',
      recipient_type: 'Employees',
      content:  this.emailForm.controls['email_content'].value,
    };  


    if(body?.content){      
      this.adminEmployee.dispatch({
        type: EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE,
        payload: body
      })
    }

    else {
      this.snackBar.open("Error Saving Template. Please add Email content.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });
    }
  }


  onEditorChange(event){
    //console.log(event)
    //this.ckeditorContent = event;
  }
  onChange(event){
    console.log(this.emailForm.value)
  }

  onReady(event){}
  onFocus(event){}
  onBlur(event){}
  onContentDom(event){}
  onPaste(event){}
  onDrop(event){}
  onFileUploadRequest(event){}
  onFileUploadResponse(event){}

}

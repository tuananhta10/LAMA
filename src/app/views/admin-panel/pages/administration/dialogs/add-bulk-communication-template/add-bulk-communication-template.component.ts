import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-communication-template.action';
import { 
  participant_template,
  employee_template 
} from '../../utils/communication-template-model-interface';

@Component({
  selector: 'app-add-bulk-communication-template',
  templateUrl: './add-bulk-communication-template.component.html',
  styleUrls: ['./add-bulk-communication-template.component.scss']
})
export class AddBulkCommunicationTemplateComponent implements OnInit {
  private interest$: any;
  private req: Subscription;
  public newCommunicationTemplate!: FormGroup;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public communicationType: string[] = ["Email", "SMS"];  
  public listType: string[] = ["Dynamic", "Static"];  
  public recipientType: string[] = ["Participants", "Employees"];
  public editorConfig: any = {
    width: '100%',
    height: '350px',
    addCss: './employee-bulk-email-notification.scss',
    format_tags: 'p;h1;h2;h3;h4;h5;h6',
    colorButton_colors: 'CF5D4E,454545,FFF,DDD,CCEAEE,66AB16',
    toolbarGroups: [
      { name: 'basicstyles', groups: [ 'mode','basicstyles' ] },
      //'/',
      { name: 'styles' },
      '/',
      { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'insertImage', /* 'bidi'*/ ] },
      //'/',
      { name: 'links' },
      //{ name: 'insert' },
      { name: 'colors' }
    ],
  }

  public participant_template: any = participant_template.map(el => el?.title).flat();
  public employee_template: any = employee_template.map(el => el?.title).flat();
  public template_field: any;

  constructor(
    public dialogRef: MatDialogRef<AddBulkCommunicationTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminCommunicationTemplate: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newCommunicationTemplate = this.formBuilder.group({
      name: [this.data ? this.data?.name : ''],
      communication_type: [this.data ? this.data?.communication_type : 'Email', [Validators.required]],
      recipient_type: [this.data ? this.data?.recipient_type : ''],
      field_to_include: [this.data ? this.data?.field_to_include : ''],
      content: [this.data ? this.data?.content : ''],
    });

    this.newCommunicationTemplate.controls['communication_type'].valueChanges.subscribe((result) => {
      if(result && this.data?.communication_type !== result){
        this.newCommunicationTemplate.controls['content'].setValue(null);
      }

      else {
        this.newCommunicationTemplate.controls['content'].setValue(this.data?.content);
      }
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newCommunicationTemplate.valid  && !this.data){
      let body = {
        ...this.newCommunicationTemplate.value
      }

      this.adminCommunicationTemplate.dispatch({
        type: CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE,
        payload: body
      }); 

      this.close();
    }  else if(this.newCommunicationTemplate.valid  && this.data){

      let editData = {
        ...this.newCommunicationTemplate.value,
        id: this.data.id
      }

      this.adminCommunicationTemplate.dispatch({
        type: CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE,
        payload: editData
      }); 

      this.close();
    }

    else {
      this.close();
    }
  }

  includeToTemplate(){
    let communicationType = this.newCommunicationTemplate.controls['communication_type'].value;
    let currentVal = this.newCommunicationTemplate.controls['content'].value;
    let recipientType = this.newCommunicationTemplate.controls['recipient_type'].value;
    let selectedField = this.newCommunicationTemplate.controls['field_to_include'].value;
    let column = recipientType === 'Employees' ? employee_template.find(el => el.title == selectedField) : participant_template.find(el => el.title == selectedField);

    if(selectedField){
      let generatedValue = currentVal ? (currentVal + ' ' + '[[' + column?.col_name + ']]') : '[[' + column?.col_name + ']]';  

      if(communicationType === 'Email'){
        this.newCommunicationTemplate.controls['content'].setValue(`${generatedValue}`);
      }

      else {
        this.newCommunicationTemplate.controls['content'].setValue(`${generatedValue}`);
      }
    }
  }

  onEditorChange(event){
    //console.log(event)
    //this.ckeditorContent = event;
  }
  onChange(event){
    //console.log(this.emailForm.value)
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

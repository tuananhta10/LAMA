import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-profile-email',
  templateUrl: './add-profile-email.component.html',
  styleUrls: ['./add-profile-email.component.scss']
})
export class AddProfileEmailComponent implements OnInit {
  private req: Subscription;
  public newEmailForm!: FormGroup;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
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

  constructor(
    public dialogRef: MatDialogRef<AddProfileEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminInterest: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    let email_to = this.data && this.data?.action === 'reply' ? this.data?.content?.email 
    : this.data && this.data?.action === 'forward' ? ''
    : this.data?.employee?.email_address;
    
    let content = this.data && this.data?.action === 'forward' ? this.data?.content?.content : '';

    this.newEmailForm = this.formBuilder.group({
      email_from: [this.loggedUser?.email_address.toLowerCase()],
      email_subject: [this.data?.action === 'forward' ? 'RE: ' + this.data?.content?.subject : ''],
      email_to: [email_to],
      email_report_date: [new Date()],
      email_content: [content]
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newEmailForm.valid  && !this.data){
      let body = {
      }

      this.close();
    }  else if(this.newEmailForm.valid  && this.data){

      this.close();
    }

    else {
      this.close();
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

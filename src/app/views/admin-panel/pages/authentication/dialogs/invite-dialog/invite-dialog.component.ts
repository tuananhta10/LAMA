import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss']
})
export class InviteDialogComponent implements OnInit {

  public selection: string = '';
  inviteList:any[] = [{name:"", email:""}];
  inviteLink = "https://drive.google.com/file/d/14a42qs9FVif6G0AIyyqCjB";

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  
  }

  addInviteList(){
    this.inviteList.push({name:"", email:""});
  }

  copyText(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
 
  ngOnInit(): void {
  }

}

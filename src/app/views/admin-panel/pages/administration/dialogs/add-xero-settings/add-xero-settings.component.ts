import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { XeroSettingActionTypes } from '@main/views/admin-panel/store/actions/admin-xeroSetting.action';

@Component({
  selector: 'app-add-xero-setting',
  templateUrl: './add-xero-settings.component.html',
  styleUrls: ['./add-xero-settings.component.scss']
})
export class AddXeroSettingComponent implements OnInit {
  private xeroSetting$: any;
  private req: Subscription;
  loading: boolean = false;

  public addXeroSettingForm!: FormGroup;
  public file: File;
    
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddXeroSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminXeroSetting: Store<AdminProfileState>,
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    this.addXeroSettingForm = this.formBuilder.group({
      xero_app_id: [this.data ? this.data?.xero_app_id : '', [Validators.required]],
      client_id: [this.data ? this.data?.client_id : '', [Validators.required]],
      client_secret: [this.data ? this.data?.client_secret : '', [Validators.required]],
      redirect_uri: [this.data ? this.data?.redirect_uri : '', [Validators.required]]
    });
    this.file = this.data ? this.data.icon : null;
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    // let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));

    // if(this.addXeroSettingForm.valid && !this.data){
    //   let xeroSetting = {
    //     ...this.addXeroSettingForm.value,
    //     organization_id: loggedUser?.organization_id
    //   }

    //   this.adminXeroSetting.dispatch({
    //     type: XeroSettingActionTypes.SAVE_LANGUAGE,
    //     payload: xeroSetting
    //   });

    //   this.close();
    // }
    // else if(this.addXeroSettingForm.valid && this.data) {
    //   let editData = {
    //     id: this.data.id,
    //     name: this.addXeroSettingForm.value.name,
    //     code: this.addXeroSettingForm.value.code,
    //     icon: this.addXeroSettingForm.value.icon,
    //     organization_id: loggedUser?.organization_id
    //   }
    //   this.adminXeroSetting.dispatch({
    //     type: XeroSettingActionTypes.EDIT_LANGUAGE,
    //     payload: editData
    //   });

    //   this.close();
    
    // }
    this.close();
  }
}

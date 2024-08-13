import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageActionTypes } from '@main/views/admin-panel/store/actions/admin-language.action';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent implements OnInit {
  private language$: any;
  private req: Subscription;
  loading: boolean = false;

  public addLanguageForm!: FormGroup;
  public file: File;
    
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminLanguage: Store<AdminProfileState>,
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    this.addLanguageForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      code: [this.data ? this.data?.code : '', [Validators.required]],
      icon: ['']
    });
    this.file = this.data ? this.data.icon : null;
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));

    if(this.addLanguageForm.valid && !this.data){
      let language = {
        ...this.addLanguageForm.value,
        organization_id: loggedUser?.organization_id
      }

      this.adminLanguage.dispatch({
        type: LanguageActionTypes.SAVE_LANGUAGE,
        payload: language
      });

      this.close();
    }
    else if(this.addLanguageForm.valid && this.data) {
      let editData = {
        id: this.data.id,
        name: this.addLanguageForm.value.name,
        code: this.addLanguageForm.value.code,
        icon: this.addLanguageForm.value.icon,
        organization_id: loggedUser?.organization_id
      }
      this.adminLanguage.dispatch({
        type: LanguageActionTypes.EDIT_LANGUAGE,
        payload: editData
      });

      this.close();
    }
  }


  onUpload(file: any): void {
    this.addLanguageForm.get('icon').setValue(file);
  }

}

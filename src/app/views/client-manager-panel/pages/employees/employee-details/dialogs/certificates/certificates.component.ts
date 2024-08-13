import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { QualificationActionTypes } from '@main/views/admin-panel/store/actions/admin-qualification.action';
import { Subscription } from 'rxjs';
import { EmployeeCertificateActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-certificate.action';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  public certificateForm!: FormGroup;
  public required:boolean = true;
  public certificateOption:any[] = [
    "Certifications", "License", "Experience", "Education", "Others"
  ];

  public qualifications:any[] = [];
  loading: boolean = false;

  public file: File;

  enum$: any;  
  private req: Subscription;

  
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<CertificatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminEnumStore: Store<AdminProfileState>
  ) {
    console.log(data)

  }

  ngOnInit(): void {
    this.subscribeEnums();

    this.adminEnumStore.dispatch({
      type: QualificationActionTypes.GET_QUALIFICATION_LIST
    });

    this.certificateForm = this.formBuilder.group({
      type: [this.data ? this.data?.certificate?.type : '', [Validators.required]],
      qualification_id: [this.data ? this.data?.certificate?.qualification_id : '', [Validators.required]],
      description: [this.data ? this.data?.certificate?.description : '']
    });
  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));

    this.req = this.enum$.subscribe((results: any) => {
      if(results.qualification.qualificationList.length > 0){
        results.qualification.qualificationList.forEach(element => {
          element.name = element.qualification;
        });
        this.qualifications = results.qualification.qualificationList;
        
        // if(this.data?.certification && results?.qualification?.qualificationList?.length > 0 && this.certificateForm){
        //   this.certificateForm.controls['qualification'].setValue(results?.qualification?.qualificationList?.find(el => el.id == this.data?.certificate?.qualification)['id']);
        // }
      }
      this.loading = results.qualification.pending;
    });
  }

  onUpload(file: any): void {
    this.file = file;
  }

  close(): void {
    this.dialogRef.close(null);
  }

  save(): void {
    if(this.certificateForm.valid){

      let data = {
        ...this.certificateForm.value,
        file: this.file,
        employee_id: this.data.employee_id
      }

      this.adminEnumStore.dispatch({
        type: EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE,
        payload: data
      });

      this.close()
    }
  }
}

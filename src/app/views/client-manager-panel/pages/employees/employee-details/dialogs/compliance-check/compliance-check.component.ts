import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { QualificationActionTypes } from '@main/views/admin-panel/store/actions/admin-qualification.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compliance-check',
  templateUrl: './compliance-check.component.html',
  styleUrls: ['./compliance-check.component.scss']
})
export class ComplianceCheckComponent implements OnInit {

  public certificateForm!: FormGroup;
  public required:boolean = true;
  public typeOption:string[] = [
    "License", "Training", "Certification", "Experience", "Education", "Legal Document", "Form Document", "Other"
  ];

  private req: Subscription;
  loading:boolean = false;
  private qualificationData$: any;

  public qualificationList:any[] = [];

  public statusOption: string[] = [
    "Valid", "Pending", "Expired"
  ];

  public employeeOptions: any = [
    {name: "Mark Martinez", id: 1},
    {name: "James Vladimir", id: 2}
  ];

  public file: File;
  
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<ComplianceCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private employeeStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    let employeeName = `${this.data.employeeData.first_name} ${this.data.employeeData.last_name}`;
    console.log(employeeName)

    this.certificateForm = this.formBuilder.group({
      employeeName: [employeeName, [Validators.required]],
      status: [this.data?.item ? this.data?.item?.status : '', [Validators.required]],
      type: [this.data?.item ? this.data?.item?.type : ''],
      qualifications: [this.data?.item ? this.data?.item?.qualification_id : '', [Validators.required]],
      expiry_date: [this.data?.item?.expiry_date ? new Date(this.data?.item?.expiry_date * 1000) : ''],
      description: [this.data?.item ? this.data?.item?.description : ''],
      remarks: [this.data?.item ? this.data?.item?.notes : ''],
    });

    this.qualificationData$ = this.employeeStore.pipe(select(state => state.qualification));

    this.req =  this.qualificationData$.subscribe((qualification: any) => {
      this.loading = qualification.pending;

      if(qualification.qualificationList.length > 0){
        qualification.qualificationList.forEach(element => {
          element.name = element.qualification
        });

        this.qualificationList = qualification.qualificationList;
      }
    })

    this.getQualifications();
  }

  onUpload(file: any): void {
    this.file = file;
  }

  close(): void  {
    this.dialogRef.close(null);
  }

  save(): void {
    let body = {
      id: this.data.item?.id,
      notes: this.certificateForm.value.remarks,
      status: this.certificateForm.value.status,
      expiry_date: convertTimestampUtc(this.certificateForm.value.expiry_date),
      attachment: this.file,
    }

    if(this.certificateForm.valid && this.file){
      this.dialogRef.close(body);

      this.employeeStore.dispatch({
        type: EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION,
        payload: body,
        employee_id: this.data?.employeeData?.id 
      });
    }
  }

  getQualifications(){
    this.employeeStore.dispatch({
      type: QualificationActionTypes.GET_QUALIFICATION_LIST
    });
  }

}

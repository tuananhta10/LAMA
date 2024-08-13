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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public loading:boolean = false;
  private qualificationData$: any;
  public qualificationList:any[] = [];
  public statusOption: string[] = ["Valid", "Pending", "Expired"];
  public employeeOptions: any = [];
  public file: File;
  public currentFile: any;
  
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<ComplianceCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private employeeStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder
  ) {
    console.log("DATA COMPLIANCE", data?.item)
  }

  ngOnInit(): void {
    this.getQualifications();
    
    let employeeName = this.data.employeeData.name || `${this.data.employeeData.first_name} ${this.data.employeeData.last_name}`;

    this.certificateForm = this.formBuilder.group({
      employeeName: [employeeName, [Validators.required]],
      status: [this.data?.item ? this.data?.item?.status : '', [Validators.required]],
      type: [this.data?.item ? this.data?.item?.type : ''],
      qualifications: [this.data?.item ? this.data?.item?.qualification_id : '', [Validators.required]],
      expiry_date: [this.data?.item?.expiry_date ? new Date(this.data?.item?.expiry_date * 1000) : ''],
      completion_date:  [this.data?.item?.completion_date ? new Date(this.data?.item?.completion_date * 1000) : ''],
      description: [this.data?.item ? this.data?.item?.description : ''],
      remarks: [this.data?.item ? this.data?.item?.notes : ''],
    });

    this.qualificationData$ = this.employeeStore.pipe(select(state => state.qualification));
    this.req =  this.qualificationData$.subscribe((qualification: any) => {
      this.loading = qualification?.pending;

      if(qualification?.qualificationList?.length > 0){
        qualification?.qualificationList?.forEach(element => {
          element.name = element?.qualification
        });

        this.qualificationList = qualification?.qualificationList;
      }
    });

    if(this.data?.item)
      this.currentFile = this.data?.item?.attachment?.length > 0 ? this.data?.item?.attachment[0] : undefined;
    
  }

  onUpload(file: any): void {
    this.file = file;
  }

  close(): void  {
    this.dialogRef.close(null);
  }

  save(): void {
    this.snackBar.open(`Update in progress. Please don't close your browser while we upload your file.`,"", 
    {
      //duration: 4000,
      panelClass:'success-snackbar'
    });

    let body = {
      id: this.data.item?.id,
      form_data: this.certificateForm.value,
      employee_id: this.data?.employeeData?.id,
      qualification_id: this.data?.item?.qualification_id,
      notes: this.certificateForm.value.remarks,
      status: this.certificateForm.value.status,
      completion_date: this.certificateForm.value.completion_date ? convertTimestampUtc(this.certificateForm.value.completion_date) : null,
      expiry_date:this.certificateForm.value.expiry_date ? convertTimestampUtc(this.certificateForm.value.expiry_date) : null,
      attachment: this.file,
      update_type: this.data.type,
    }

    console.log("BODY", body)

    if(this.certificateForm.valid/* && this.file*/){
      if(!this.data?.fromEditDetail){
        this.dialog.closeAll();  
        
        this.employeeStore.dispatch({
          type: EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION,
          payload: body,
          employee_id: this.data?.employeeData?.id 
        });
      }

      else {
        this.dialogRef.close(body);
        
      }
    }
  }

  getQualifications(){
    this.employeeStore.dispatch({
      type: QualificationActionTypes.GET_QUALIFICATION_LIST
    });
  }

}

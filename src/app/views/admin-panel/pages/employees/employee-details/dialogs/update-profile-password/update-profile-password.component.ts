import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { EmployeePositionActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-position.action';
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-update-profile-password',
  templateUrl: './update-profile-password.component.html',
  styleUrls: ['./update-profile-password.component.scss']
})
export class UpdateProfilePasswordComponent implements OnInit {
  private positionReq: Subscription; 
  public userForm!: FormGroup;
  public loading: boolean = true;
  public required:boolean = true;
  public position: any[] = [];
  private enum$: any;
  private isFirstLoad:boolean = true;
  public errorMessage:string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateProfilePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private loginAuthentication: LoginAuthenticationService,
    private adminEnumStore: Store<AdminProfileState>, 
    private employeeStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder
  ) {
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    this.getEmployeePosition();

    let employeeName = `${this.data.employeeData.first_name} ${this.data.employeeData.last_name}`;

    if(!this.data?.employeeData?.first_name) employeeName = this.data?.employeeData?.name;

    this.userForm = this.formBuilder.group({
      employeeName: [employeeName, [Validators.required]],
      email_address: [this.data?.employeeData ? this.data?.employeeData?.email_address : '', [Validators.required]],
      position_id: [this.data?.employeeData ? this.data?.employeeData?.position_id : '', [Validators.required]],
      new_password: [''],
      confirm_new_password: [''],

      last_date: [''],  
      reason_for_leaving: ['']
    },{validator: this.checkIfMatchingPasswords('new_password', 'confirm_new_password')});

    // email validation
    this.userForm.get("email_address").valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(res=> {
      if(!this.isFirstLoad){
        this.validateEmail(res);
      }
      this.isFirstLoad = false;
    });
  }

  validateEmail(email: any){
    this.loginAuthentication
    .validateEmail(email)
    .subscribe((result: any) => {
      if(result?.data.existing_user && this.data?.employeeData?.email_address != email){
        this.userForm.controls['email_address'].setErrors({'incorrect': true});
        this.errorMessage="Email already exists"
      } else {
        this.userForm.controls['email_address'].setErrors(null);
        this.errorMessage=""
      }
    },
    (err: any) => {

    });    
  }

  getEmployeePosition(){
    this.adminEnumStore.dispatch({
      type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST
    });

    // employee position
    this.positionReq  = this.enum$.subscribe((results: any) => {
      results?.employeePosition.employeePositionList.forEach(el => {
        el.name = el.display_name;
      })

      this.position = results?.employeePosition.employeePositionList;
      this.loading = results.employeePosition.pending;
    })
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  close(): void  {
    this.dialogRef.close(null);
  }

  save(): void {
    if(this.userForm.valid){
      let data: any = {
        id : this.data?.employeeData?.id,
        email_address: this.userForm.controls['email_address'].value,
        position_id: this.userForm.controls['position_id'].value,
        password : this.userForm.controls['new_password'].value,


      }

      if(this.data?.deactivate){
        data = { 
          id : this.data?.employeeData?.id,
          last_date: convertTimestampUtc(this.userForm.controls['last_date'].value),
          reason_for_leaving: this.userForm.controls['reason_for_leaving'].value,
          status: 'inactive' 
        }
      }

      if(data?.email_address === this.data?.employeeData?.email_address){
        delete data['email_address'];
      }

      if(!data?.password){
        delete data['password'];
      }

      this.employeeStore.dispatch({
        type: EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD,
        payload: data
      });
      
      this.dialogRef.close(data);
    }
  }
}

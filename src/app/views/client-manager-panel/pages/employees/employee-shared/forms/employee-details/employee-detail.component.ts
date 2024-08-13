import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { 
  differenceInDays 
} from 'date-fns';

import { EmployeeConstants } from '../../../constants';

@Component({
  selector: 'app-employee-detail',
  animations: [mainAnimations],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  isLinear = false;
  employeeDetailForm!: FormGroup;
  required:boolean = true;
  dateNow: Date = new Date()
  typeOptions: any[] = ["Employee", "Contractor", "Other"];
  titleOptions:any[] = ["Mr", "Mrs", "Miss", "Dr", "Engr", "Arch"];
  genderOptions:any[] =["Male", "Female", "Trans and gender diverse", "LGBTQ+", "Prefer not to say" ];
  imgSrc: any;

  @Input() navigation: any = {};
  @Input() employeeDetailData: any;
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  @Input() isUpdate: boolean = false;

  loading:boolean = false;
  errorMessage:string = '';
  isFirstLoad:boolean = true;
  
  constructor(private formBuilder: FormBuilder, private loginAuthentication: LoginAuthenticationService) {
   
  }

  ngOnInit(): void {
    let profile = this.employeeDetailData?.profile_pic_url;

    this.employeeDetailForm = this.formBuilder.group({
      profile_pic_url: [''],
      id: [this.employeeDetailData ? this.employeeDetailData.id : ''],
      payroll_id: [this.employeeDetailData ? this.employeeDetailData.payroll_id : ''],
      title: [this.employeeDetailData ? this.employeeDetailData.title : '', [Validators.required]],
      type: [this.employeeDetailData ? this.employeeDetailData.type : '', [Validators.required]],
      last_name: [this.employeeDetailData ? this.employeeDetailData.last_name : '', [Validators.required]],
      first_name: [this.employeeDetailData ? this.employeeDetailData.first_name : '', [Validators.required]],
      middle_name: [this.employeeDetailData ? this.employeeDetailData.middle_name : ''],
      preferred_name: [this.employeeDetailData ? this.employeeDetailData.preferred_name : ''],
      gender: [this.employeeDetailData ? this.employeeDetailData.gender : '', this.employeeDetailData ? this.employeeDetailData : ''],
      birthdate: [this.employeeDetailData["birthdate"] ? new Date(this.employeeDetailData.birthdate * 1000) : null],
      age: [this.employeeDetailData ? this.employeeDetailData.age : '',],
      email_address: [this.employeeDetailData ? this.employeeDetailData.email_address : '', [Validators.required, Validators.email]],
      private_email: [this.employeeDetailData ? this.employeeDetailData.private_email : '', [Validators.required, Validators.email]],
    });
    this.formStep.emit(EmployeeConstants.employeeDetails);

    if(profile?.length > 0){
      this.imgSrc = profile[profile?.length - 1]?.download_url;
    }

    this.employeeDetailForm.get("email_address").valueChanges
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

  onUpload(file: any) {
    this.imgSrc = file.file;
    this.employeeDetailForm.get('profile_pic_url').setValue(file);
  }

  validateEmail(email: any){
    this.loginAuthentication
    .validateEmail(email)
    .subscribe((result: any) => {
      if(result?.data.existing_user && this.employeeDetailData?.email_address != email){
        this.employeeDetailForm.controls['email_address'].setErrors({'incorrect': true});
        this.errorMessage="Email already exists"
      } else {
        this.employeeDetailForm.controls['email_address'].setErrors(null);
        this.errorMessage=""
      }
    },
    (err: any) => {

    });    
  }

  computeAge(date){ 
    if(date){
      let age = differenceInDays(new Date(this.dateNow), new Date(date))
      this.employeeDetailForm.controls['age'].setValue(Math.floor(age/365));
    }
  }

  submit(){
    if(this.employeeDetailForm.valid){
      this.submitData.emit(this.employeeDetailForm.value);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  next(){
    if(this.employeeDetailForm.valid){
      this.submitData.emit(this.employeeDetailForm.value);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: 1, isValid: this.employeeDetailForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.employeeDetailForm.value);
    }
  }

}

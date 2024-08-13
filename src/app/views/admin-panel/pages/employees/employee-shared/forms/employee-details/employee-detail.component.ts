import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { 
  differenceInDays 
} from 'date-fns';
import { Location } from '@angular/common';
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
  titleOptions:any[] = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Mx", "N/A"];
  genderOptions:any[] =["Male", "Female", "Trans and gender diverse", "Prefer not to say" ];
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
  public statusOption: string[] = ["active", "pending", 'draft', "inactive"];
  private toBeUpdated: boolean = false;
  
  constructor(private formBuilder: FormBuilder, 
    private location: Location,
    private loginAuthentication: LoginAuthenticationService) {
   
  }

  ngOnInit(): void {
    let profile = this.employeeDetailData?.profile_pic_url;
    let bday = this.isUpdate ? this.employeeDetailData.birthdate * 1000 : this.employeeDetailData.birthdate;
    
    console.log(bday)

    this.employeeDetailForm = this.formBuilder.group({
      profile_pic: [''],
      id: [this.employeeDetailData ? this.employeeDetailData.id : ''],
      payroll_id: [this.employeeDetailData ? this.employeeDetailData.payroll_id : ''],
      title: [this.employeeDetailData ? this.employeeDetailData.title : '', [Validators.required]],
      type: [this.employeeDetailData ? this.employeeDetailData.type : '', [Validators.required]],
      last_name: [this.employeeDetailData ? this.employeeDetailData.last_name : '', [Validators.required]],
      first_name: [this.employeeDetailData ? this.employeeDetailData.first_name : '', [Validators.required]],
      middle_name: [this.employeeDetailData ? this.employeeDetailData.middle_name : ''],
      preferred_name: [this.employeeDetailData ? this.employeeDetailData.preferred_name : ''],
      gender: [this.employeeDetailData ? this.employeeDetailData.gender : ''],
      birthdate: [this.employeeDetailData["birthdate"] ? new Date(bday) : null],
      age: [this.employeeDetailData ? this.employeeDetailData.age * 1 : '',],
      email_address: [this.employeeDetailData ? this.employeeDetailData.email_address : '', [Validators.required, Validators.email]],
      private_email: [this.employeeDetailData ? this.employeeDetailData.private_email : ''],
      status: [this.employeeDetailData ? this.employeeDetailData?.status?.toLowerCase() : ''],

      last_date: [this.employeeDetailData?.status === 'inactive' ? new Date(this.employeeDetailData?.last_date * 1000) : ''],  
      reason_for_leaving: [this.employeeDetailData?.status === 'inactive' ? this.employeeDetailData?.reason_for_leaving : '']
    
    });
    this.formStep.emit(EmployeeConstants.employeeDetails);

    // AUTO SAVE
    this.subscribeAutoSave();

    this.checkExistingEmailAddress();    
    // this.formValueChanges()
  }

  checkExistingEmailAddress(){
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

  // private formValueChanges(): void{
  //   this.employeeDetailForm.get('type').valueChanges.subscribe({
  //     next: (val: any) => {
  //       const typeControl = this.employeeDetailForm.get('birthdate');
    
  //       if (val === 'Contractor') {
  //         typeControl.setValidators(null);
  //         typeControl.updateValueAndValidity();
  //       } else {
  //         typeControl.setValidators(Validators.required);
  //         typeControl.updateValueAndValidity();
  //       }
  //     },
  //     error:err => {
  //       console.error(err)
  //     }
  //   })
  // }

  subscribeAutoSave(){
    this.imgSrc = this.employeeDetailData?.profile_pic_url || this.employeeDetailData?.profile_pic?.file;
    
    /* VALUE CHANGE */
    this.employeeDetailForm.valueChanges.subscribe((change: any) => {
      let bday = this.isUpdate ? this.employeeDetailData.birthdate * 1000 : this.employeeDetailData.birthdate;
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        profile_pic: '',
        id: this.employeeDetailData ? this.employeeDetailData.id : '',
        payroll_id: this.employeeDetailData ? this.employeeDetailData.payroll_id : '',
        title: this.employeeDetailData ? this.employeeDetailData.title : '', 
        type: this.employeeDetailData ? this.employeeDetailData.type : '', 
        last_name: this.employeeDetailData ? this.employeeDetailData.last_name : '', 
        first_name: this.employeeDetailData ? this.employeeDetailData.first_name : '', 
        middle_name: this.employeeDetailData ? this.employeeDetailData.middle_name : '',
        preferred_name: this.employeeDetailData ? this.employeeDetailData.preferred_name : '',
        gender: this.employeeDetailData ? this.employeeDetailData.gender : '', //this.employeeDetailData ? this.employeeDetailData : '',
        birthdate: this.employeeDetailData["birthdate"] ? new Date(bday) : null,
        age: this.employeeDetailData ? this.employeeDetailData.age * 1 : '',
        email_address: this.employeeDetailData ? this.employeeDetailData.email_address : '',  
        private_email: this.employeeDetailData ? this.employeeDetailData.private_email : '',  
        status: this.employeeDetailData ? this.employeeDetailData?.status?.toLowerCase() : '',

        last_date: this.employeeDetailData?.status === 'inactive' ? new Date(this.employeeDetailData?.last_date * 1000) : '',  
        reason_for_leaving: this.employeeDetailData?.status === 'inactive' ? this.employeeDetailData?.reason_for_leaving : ''
        
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
  }

  onUpload(file: any) {
    this.imgSrc = file.file;
    this.employeeDetailForm.get('profile_pic').setValue(file);
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

  public submitting: boolean = false;

  submit(){
    if(this.employeeDetailForm.valid){
      this.submitting = true;
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

  public storageStep: any = sessionStorage.getItem('employeeFormStep');

  back(){
    if(sessionStorage.getItem('employeeFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.navigation?.previous);
  }

  @Output() saveEmployeeAsDraft: EventEmitter<any> = new EventEmitter<any>();
  @Input() currentStatus: string = '';

  saveAsDraft(){
    this.submitData.emit(this.employeeDetailForm.value);
    this.saveEmployeeAsDraft.emit(true);
  }

  ngOnDestroy(): void {
    if(this.toBeUpdated && !this.submitting) {
      this.submitData.emit(this.employeeDetailForm.value);
    }

    this.isValid.emit({formStep: 1, isValid: this.employeeDetailForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.employeeDetailForm.value);
    }
  }

}

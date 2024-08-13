import {
  Component,
  OnInit,
  Input,
  Output,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';

import { AdminService } from '@app-services/admin-panel/admin.service';
import { LoginAuthenticationService } from '@app-services/admin-panel/login-authentication.service';
import { mainAnimations } from '@app-main-animation';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';

import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-registration-form',
  animations: [mainAnimations],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Input() callBy: any;
  @Output() signupEvent: EventEmitter<any> = new EventEmitter<any>();

  private postReq? : Subscription;
  private admin_email : string = '';
  private admin_password : string = '';
  private unsubscribe$ = new Subject<void>();

  public adminSignupForm : FormGroup;
  public message : any = localStorage.getItem('signupMessage');
  public error : any = localStorage.getItem('signupError');
  public submitting: boolean = false;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private dialog: MatDialog,
    private signupService: LoginAuthenticationService) {
  }

  ngOnInit(){
    this.adminSignupForm = this.formBuilder.group({
      organization: [null, Validators.compose([Validators.required])],
      first_name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      isRegistered: [null],
      terms: [null, Validators.compose([Validators.requiredTrue])]
    });

    // update phone validation
    this.adminSignupForm.controls['phone'].valueChanges.subscribe((result) => {
      if(result && result.match(/[A-Za-z]/gi)){
        let tel = result.replace(/[A-Za-z]/gi, '');

        setTimeout(() => this.adminSignupForm.controls['phone'].setValue(tel), 100)
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('signupError');
    localStorage.removeItem('signupMessage');

    if(this.postReq) this.postReq.unsubscribe();
  }

  signupAdmin(): void {
    // initialize inputs
    let body  = {
      system_role: "admin",
      email_address: this.adminSignupForm?.get('email')?.value,
      password: this.adminSignupForm?.get('password')?.value,
      role_title: "Lama Admin",
      first_name: this.adminSignupForm?.get('first_name')?.value,
      last_name: this.adminSignupForm?.get('last_name')?.value,
      mobile_phone_no: this.adminSignupForm?.get('phone')?.value,
      registration_stage: "admin-registration",
      organization_input: this.adminSignupForm?.get('organization')?.value,
      ndis_registered: this.adminSignupForm?.get('isRegistered')?.value,
      adhere_to_covid_standard: this.adminSignupForm?.get('terms')?.value,
    };

    this.submitting = true;
    this.adminSignupForm.disable();

    // execute http post request
    this.postReq = this.signupService
    .postRegisterMain(body)
    .subscribe((result: any) => {
      let registrationData = result?.registrationData;
      let stripeData = result?.stripeData;

      localStorage.setItem('stripeId',result?.stripeData?.id)
      // if(result?.stripeData?.id){
      //   let payload = {
      //     email_add: registrationData?.data?.email_address,
      //     stripe_id: result?.stripeData?.id
      //   }
      //   this.signupService.updateOrg(payload).subscribe({
      //     next: (res:any) => {
      //       console.log(res)
      //     },
      //     error:(err:any) => {
      //       console.error(err)
      //     }
      //   })
      // }
      // set stripe login condition for different user types
      if(registrationData){
        // this.stripeCondition(stripeData); // Invoice creation transferred to CRON JOB

        // Registration Data
        setTimeout(() => {
          this.registrationCondition(registrationData);
        }, 2000);
      }
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      this.error = undefined;
      this.submitting = false;
      this.adminSignupForm.reset();

      const errorMessage = err?.error?.message 
        ? `Error. ${err?.error?.message?.replace('[Request Error] ', '')}`
        : 'Something went wrong please try again later or contact your administrator';

      if(err.status != 500)
        this.error = errorMessage;
      else
        this.error = errorMessage

      this.adminSignupForm.enable();
      localStorage.setItem('signupError', errorMessage);
      localStorage.setItem('sessionUrl', this.router.url);
    });
  }

  registrationCondition(registrationData){
    console.log(registrationData)
    if(!registrationData) localStorage.setItem('signupError', 'The server is taking too long to respond. Please try again.');

    // if no error, execute signup validation
    if(registrationData?.data?.access_token){
      this.adminSignupForm.enable();
      localStorage.setItem('token', registrationData?.data?.access_token);

      // temporary using teacher object for sample authentication
      localStorage.setItem('loggedUserData', JSON.stringify({
        system_role: 'admin',
        ...registrationData?.data
      }));

      // if from admin panel
      if(this.callBy){
        this.signupEvent.emit(registrationData);
      }

      else {
        this.adminSignupForm.reset();
        this.message = "Registration Successful! You successfully created your organisation";
        this.submitting = false;
        this.adminService.setAdminLogin(true);
      }
    }
  }

  stripeCondition(stripeData: any){
    console.log(stripeData)
    if(stripeData){
      sessionStorage.setItem('stripeCustomer', JSON.stringify(stripeData));

      // create subscription
      this.createSubscription();

      let date = new Date();
      let expiration_start = new Date("January 1, 2024");

      // adjust the condition to >=
      if(date >= expiration_start){
        this.createInvoice();
      }
    }
  }

  createInvoice(){
    this.postReq = this.signupService.createInvoiceSetupFee(30).subscribe((result: any) => {
      console.log(result)

    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  createSubscription(){
    this.postReq = this.signupService.createSubscription(14).subscribe((result: any) => {
      console.log(result)

    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('signupError');
    localStorage.removeItem('signupMessage');
    this.error   = undefined;
    this.message = undefined;
  }
}

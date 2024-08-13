import { 
  Component, 
  OnInit, 
  OnDestroy 
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
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

import { AdminService } from '@app-services/admin-panel/admin.service';
import { LoginAuthenticationService } from '@app-services/admin-panel/login-authentication.service';
import { mainAnimations } from '@app-main-animation';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';

import {ErrorStateMatcher} from '@angular/material/core';
import { SuccessSignupDialogComponent } from '../dialogs/success-signup-dialog/success-signup-dialog.component';
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

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('confirm_password').value
    && formGroup.get('email').value === formGroup.get('confirm_email').value)
    return null;
  else
    return {passwordMismatch: true};
};

@Component({
  selector: 'app-client-signup',
  animations: [mainAnimations],
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.scss']
})
export class ClientSignupComponent implements OnDestroy {
  private postReq? : Subscription;
  private admin_email : string = '';
  private admin_password : string = '';
  private unsubscribe$ = new Subject<void>();

  public clientSignupForm : FormGroup;
  public message : any = localStorage.getItem('signupMessage');
  public error : any = localStorage.getItem('signupError');
  public submitting: boolean = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private dialog: MatDialog,
    private signupService: LoginAuthenticationService) { 

    this.clientSignupForm = this.formBuilder.group({
      confirm_email: [null, Validators.compose([Validators.required])],
      first_name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      post_code: [null, Validators.compose([Validators.required])],
      terms: [null, Validators.compose([Validators.requiredTrue])],
      heardFrom: [0, Validators.compose([Validators.required])],
    }, {validator: passwordMatchValidator});

    /*this.adminService.adminStatus$.subscribe((result: any) => {
      if(result){
        this.snackBar.open(`You're already signed in, redirecting to Admin Page now.`, ' ', {
          duration: 4000
        });

        let returnURL = localStorage.getItem('returnURL');

        setTimeout(() => this.router.navigate(['/admin/signup/onboarding']), 1500)
      }
    });*/
  }

  ngOnDestroy(): void {
    localStorage.removeItem('signupError');
    localStorage.removeItem('signupMessage');

    if(this.postReq) this.postReq.unsubscribe();
  }

  openSuccessModal(){
    let createClientDialog = this.dialog.open(
      SuccessSignupDialogComponent,
      { 
        //width: '40vw',
        data: {
        },
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.clientSignupForm.reset();
      this.message = localStorage.getItem('signupMessage');
      this.submitting = false;
      this.adminService.setAdminLogin(true);
      this.router.navigate(['/signup/client/onboarding']);
    });
  }

  signupAdmin(): void {
    // initialize inputs
    let body  = {
      organization_id: 1,
      system_role:"client",
      first_name: this.clientSignupForm?.get('first_name')?.value,
      last_name: this.clientSignupForm?.get('last_name')?.value,
      email_address: this.clientSignupForm?.get('email')?.value,
      password: this.clientSignupForm?.get('password')?.value,
      registration_stage: "client-registration",
      mobile_phone_no: this.clientSignupForm?.get('phone')?.value,
      service_agreement: this.clientSignupForm?.get('terms')?.value,
      ads_from: this.clientSignupForm?.get('heardFrom')?.value,
      post_code: this.clientSignupForm?.get('post_code')?.value,
    };

    /*{    
        "organization_id":1,
        "system_role":"client",
        "email_address":"bocosamuel01@gmail.com",    
        "password":"password@123",
        "last_name":"Wolowitz",
        "first_name":"Howard",
        "registration_stage":"client-registration",
        "post_code":"4654354",    
        "ads_from":"internet",
        "mobile_phone_no":"16543544",
        "service_agreement":"1"
    }*/

    this.submitting = true;
    this.clientSignupForm.disable();

    // execute http post request
    this.postReq = this.signupService
    .postRegisterMain(body)
    .subscribe((result: any) => {

      console.log(result)
      if(!result) localStorage.setItem('signupError', 'The server is taking too long to respond. Please try again.');

      // if no error, execute signup validation
      if(result?.data?.access_token){
        this.clientSignupForm.enable();
        localStorage.setItem('token', result.data.access_token);

        // temporary using teacher object for sample authentication
        localStorage.setItem('loggedUserData', JSON.stringify({
          ...result?.data
        }));

        this.openSuccessModal();
      } 
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      this.error = undefined;
      this.submitting = false;
      this.clientSignupForm.reset();

      console.log(err)

      const errorMessage = err.error?.message || "Incorrect email or password";

      this.error = errorMessage;
      this.clientSignupForm.enable();
      localStorage.setItem('signupError', errorMessage);
      localStorage.setItem('sessionUrl', this.router.url);
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

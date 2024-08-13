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
} from '@angular/forms';

import { AdminService } from '@app-services/admin-panel/admin.service';
import { LoginAuthenticationService } from '@app-services/admin-panel/login-authentication.service';
import { mainAnimations } from '@app-main-animation';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';

import {ErrorStateMatcher} from '@angular/material/core';
import { SuccessSignupDialogComponent } from '../dialogs/success-signup-dialog/success-signup-dialog.component';
import { WelcomeDialogComponent } from '../dialogs/welcome-dialog/welcome-dialog.component';
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
  selector: 'app-careworker-signup',
  animations: [mainAnimations],
  templateUrl: './careworker-signup.component.html',
  styleUrls: ['./careworker-signup.component.scss']
})
export class CareworkerSignupComponent implements OnDestroy {
  private postReq? : Subscription;
  private admin_email : string = '';
  private admin_password : string = '';
  private unsubscribe$ = new Subject<void>();

  public careworkerSignup : FormGroup;
  public message : any = localStorage.getItem('signupMessage');
  public error : any = localStorage.getItem('signupError');
  public submitting: boolean = false;
  public step: number = 1;

  matcher = new MyErrorStateMatcher();

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private dialog: MatDialog,
    private signupService: LoginAuthenticationService) { 

    this.careworkerSignup = this.formBuilder.group({
      role: [0],
      organization: [null, Validators.compose([Validators.required])],
      manager_email: [null, Validators.compose([Validators.required, Validators.email])],
      first_name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      terms: [null, Validators.compose([Validators.requiredTrue])],
      title: [null],
      employee_docs: ['']
    });

    /*this.adminService.adminStatus$.subscribe((result: any) => {
      if(result){
        this.snackBar.open(`You're already signed in, redirecting to Admin Page now.`, ' ', {
          duration: 4000
        });

        let returnURL = localStorage.getItem('returnURL');

        setTimeout(() => this.router.navigate(['/admin/signup/onboarding']), 1500)
      }
    });*/
    if(sessionStorage.getItem('WelcomeEmployee'))
      this.openWelcomeModal()
  }

  ngOnDestroy(): void {
    localStorage.removeItem('signupError');
    localStorage.removeItem('signupMessage');
    sessionStorage.removeItem('WelcomeEmployee');
    if(this.postReq) this.postReq.unsubscribe();
  }

  openWelcomeModal(){
    let createClientDialog = this.dialog.open(
      WelcomeDialogComponent,
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
    });
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
      this.careworkerSignup.reset();
      this.message = localStorage.getItem('signupMessage');
      this.submitting = false;
      this.adminService.setAdminLogin(true);
      this.router.navigate(['/signup/careworker/onboarding']);
    });
  }

  signupCareworker(): void {
    /*
      requirement - check if client already updated his info
        - 
    */

    if(this.step === 1){
      this.step = 2;
      return;
    }


    // initialize inputs
    let body  = {
      system_role: "employee",
      role: this.careworkerSignup?.get('role')?.value,
      organization: this.careworkerSignup?.get('organization')?.value * 1,
      mobile_phone_no: this.careworkerSignup?.get('phone')?.value,
      manager_email: this.careworkerSignup?.get('manager_email').value,
      first_name: this.careworkerSignup?.get('first_name')?.value,
      last_name: this.careworkerSignup?.get('last_name')?.value,
      email_address: this.careworkerSignup?.get('email')?.value,
      password: this.careworkerSignup?.get('password')?.value,
      registration_stage: "post-request",
      'employee-docs': this.careworkerSignup?.get('employee_docs')?.value,
    };

    console.log(body)

    this.submitting = true;
    this.careworkerSignup.disable();

    // execute http post request
    this.postReq = this.signupService
    .postRegisterMain(body)
    .subscribe((result: any) => {
      console.log(result)

      if(!result) localStorage.setItem('signupError', 'The server is taking too long to respond. Please try again.');

      // if no error, execute signup validation
      if(result?.data?.access_token){
        this.careworkerSignup.enable();
        localStorage.setItem('token', result.data.access_token);

        // temporary using teacher object for sample authentication
        localStorage.setItem('loggedUserData', JSON.stringify({
          _id: 123444534534,
          first_name: result?.data?.first_name,
          last_name: result?.data?.last_name,
          role: result?.data?.role,
          email_address: result?.data?.email_address,
          onboarding: true
        }));

        this.openSuccessModal();
      } 
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      this.error = undefined;
      this.submitting = false;
      this.careworkerSignup.reset();

      const errorMessage = err?.message || "Incorrect email or password";

      this.error = errorMessage;
      this.careworkerSignup.enable();
      localStorage.setItem('signupError', errorMessage);
      localStorage.setItem('sessionUrl', this.router.url);
    });    
  }

  onUpload(file: any) {
    this.careworkerSignup.get('employee_docs').setValue(file);
  }

  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('signupError');
    localStorage.removeItem('signupMessage');
    this.error   = undefined;
    this.message = undefined;
  }


}

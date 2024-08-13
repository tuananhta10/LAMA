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
import { Observable, Subject, Subscription,  } from 'rxjs';
import { takeUntil, filter,switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';
import { LogoutService } from '@main/shared/services/admin-panel/logout-service.service';
import { Store,select } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { SendPasswordResetActionsTypes } from '@main/views/admin-panel/store/actions/admin-send-password-reset.action';
import { AuthenticationMessage } from '../utils/admin-auth-message.enum';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-admin-signin',
  animations: [mainAnimations],
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnDestroy{
  private postReq? : Subscription;
  private admin_email : string = '';
  private admin_password : string = '';

  public adminLoginForm : FormGroup;
  public adminPasswordResetForm : FormGroup;

  public message : any = localStorage.getItem('loginMessage');
  public error : any = localStorage.getItem('loginError');
  public submitting: boolean = false;
  public inputType: string = 'password';
  public loading: boolean = true;
  matcher = new MyErrorStateMatcher();

  public isLogin: boolean = true
  public sendPasswordState$: Observable<any>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private loginService: LoginAuthenticationService,
    private logoutService:LogoutService,
    private adminState: Store<AdminProfileState>) {
    this.adminService.adminStatus$.subscribe((result: any) => {
      if(result && this.router.url.match("admin/signin")){
        this.snackBar.open(`You're already signed in, redirecting to Admin Page now.`, ' ', {
          duration: 4000,
          panelClass: 'success-snackbar'
        });

        let returnURL = localStorage.getItem('returnURL');

        setTimeout(() => this.router.navigate(['/admin/dashboard']), 1500)
      }
    });

    this.sendPasswordState$ = this.adminState.pipe(select(state => state.sendPasswordReset))
  }

  adjustType(){
    if(this.inputType === 'password') this.inputType = 'text';
    else this.inputType = 'password';
  }

  ngOnInit(){
    this.adminLoginForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });

    this.adminPasswordResetForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, Validators.email])
      ]
    });

    setTimeout(() => {
      this.loading = false;
    }, 200)

  }

  ngOnDestroy(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');

    if(this.postReq) this.postReq.unsubscribe();
    this.unsubscribePasswordResetState()
  }

  public togglePage(){
    this.isLogin = !this.isLogin
    this.adminPasswordResetForm.reset()
  }

  resetPassword(){
    if(!this.adminPasswordResetForm.valid){
      this.snackBar.open(`${AuthenticationMessage.PASSWORD_FILL_UP_FIELDS}`, '',
        {
          duration: 3000,
          panelClass: ['danger-snackbar']
        });
      return
    }
    const payload ={
      ...this.adminPasswordResetForm.value
    }
    this.adminState.dispatch({
      type: SendPasswordResetActionsTypes.SEND_EMAIL,
      payload: payload
    });
    this.subscribePasswordResetState()
  }

  private subscribePasswordResetState(){
    this.sendPasswordState$
    .pipe(
      takeUntil(this.unsubscribe$),
      switchMap((value: any) => {
        if (value.success) {
          return this.handleSuccess();
        }
        if (value.error) {
          return this.handleError(value.error.message);
        }
        return [];
      })
    )
    .subscribe();
  }

  private handleSuccess() {
    this.togglePage();
    this.unsubscribePasswordResetState();

    this.snackBar.open(`${AuthenticationMessage.PASSWORD_EMAIL_SENT}`, ' ', {
      duration: 4000,
      panelClass: 'success-snackbar',
    });

    this.adminState.dispatch({
      type: SendPasswordResetActionsTypes.SEND_EMAIL_SUCCESS,
      payload: { result: null },
    });

    return [];
  }

  private handleError(errorMessage: string) {
    this.adminState.dispatch({
      type: SendPasswordResetActionsTypes.SEND_EMAIL_FAILED,
      payload: { statusText: null },
    });

    const message =
      errorMessage === AuthenticationMessage.USER_NOT_FOUND
        ? AuthenticationMessage.PASSWORD_EMAIL_NOT_REGISTERED
        : AuthenticationMessage.SERVER_ERROR;

    this.snackBar.open(`${message}`, ' ', {
      duration: 4000,
      panelClass: 'danger-snackbar',
    });

    this.unsubscribePasswordResetState();

    return [];
  }

  private unsubscribePasswordResetState(){
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  loginAdmin(): void {
    //get value from form controls
    this.admin_email = this.adminLoginForm?.get('email')?.value;
    this.admin_password = this.adminLoginForm?.get('password')?.value;

    // initialize inputs
    let body  = {
      username: "",
      email_address: this.admin_email,
      password: this.admin_password,
    };

    this.submitting = true;
    //this.adminLoginForm.controls['email'].disable();
    //this.adminLoginForm.controls['password'].disable();

    // execute http post request
    this.postReq = this.loginService
    .postLogin(body)
    .subscribe((result: any) => {
      let loginData = result?.data;
      // let stripeData = result?.stripeData;
      // let subscriptionData = result?.subscriptionData?.data[0];
      console.log(result)

      // Remove blocking of users
      // if(loginData?.role_title === 'Lama Admin' && (!subscriptionData || subscriptionData?.status === 'past_due')){
      //   this.submitting = false;
      //   this.error = `Thank you for your interest in Lama! We want to make sure you have the best experience with us, and it looks like you haven't subscribed yet.<br><br> No worries though, we're here to help! To reset your subscription or to subscribe for the first time, please contact us at info@lamacare.com.au and we'll be happy to assist you in any way we can.`;
      // } else {
        console.log("TRIGGER LOGIN")
        // set stripe login condition for different user types
        // this.stripeCondition(stripeData);

        // set login condition for different user types
        this.loginCondition(loginData);
      // }
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      this.error = undefined;
      this.submitting = false;
      this.adminLoginForm.reset();

      console.log("ERROR",err?.error?.error)
      const errorMessage = err.error?.message?.replace('[Request Error] ', '');

      if(err?.error?.error?.code == 'resource_missing'){
        this.error = `Thank you for your interest in Lama! We want to make sure you have the best experience with us, and it looks like you haven't subscribed yet.<br><br> No worries though, we're here to help! To reset your subscription or to subscribe for the first time, please contact us at info@lamacare.com.au and we'll be happy to assist you in any way we can.`;
      }

      if(errorMessage.match('Invalid Email')){
        this.error = "Invalid Email or Password. Please double check your credentials and try again."
      } else if(errorMessage.match('Organization expired')){
        this.error = `Thank you for your interest in Lama! We want to make sure you have the best experience with us, and it looks like you haven't subscribed yet.<br><br> No worries though, we're here to help! To reset your subscription or to subscribe for the first time, please contact us at info@lamacare.com.au and we'll be happy to assist you in any way we can.`
      }

      else {
        this.error = /*errorMessage ||*/ "There has been a problem with the server. Please refresh the page and try again or contact the administrator regarding this issue.";
      }

      this.adminLoginForm.reset();
      localStorage.setItem('loginError', this.error);
      localStorage.setItem('sessionUrl', this.router.url);
    });
  }



  loginCondition(loginData: any){
    if(!loginData) localStorage.setItem('loginError', 'The server is taking too long to respond. Please try again.');

    // if no error, execute login validation
    if(loginData?.access_token){
      this.adminLoginForm.controls['email'].enable();
      this.adminLoginForm.controls['password'].enable();

      localStorage.setItem('token', loginData?.access_token);
      // add user data to storage
      localStorage.setItem('loggedUserData', JSON.stringify({
        ...loginData
      }));

      this.adminLoginForm.reset();
      this.message = localStorage.getItem('loginMessage');
      this.submitting = false;
      this.adminService.setAdminLogin(true);
      this.logoutService.startWatch(1500,1800, 5);

      // ADMIN
      if(loginData?.organization_id && loginData?.system_role.toLowerCase() === 'admin'){
        setTimeout(() => {
          //this.router.navigate(['/admin/dashboard']);
          window.location.href = '/admin/dashboard';
        }, 1000);
      }

      // ADMIN ONBOARDING
      else if(!loginData?.organization_id && loginData?.system_role.toLowerCase() === 'admin'){
        this.router.navigate(['/signup/admin/onboarding']);
        this.snackBar.open('Please finish your onboarding details before accessing your dashboard.', '',
        {
          duration: 3000,
          panelClass: ['danger-snackbar']
        });
      }

      // SUPPORT WORKER APP
      else if(loginData?.organization_id && loginData?.system_role.toLowerCase() === 'support worker app'){
        setTimeout(() => {
          this.error = 'Your account is not allowed to access this site. Please use the LAMA support worker app instead which can be downloaded from the <a href="https://apps.apple.com/ph/app/lama-care-sw/id6444767928" target="_blank">App Store</a> or <a href="https://play.google.com/store/apps/details?id=au.com.lamacare" target="_blank">Google Play Store</a>.';
          this.message = undefined;
        }, 1000);
      }

      // SERVICE FACILITATOR AND SERVICE COORDINATOR
      else if(loginData?.organization_id
        && (loginData?.system_role.toLowerCase() === 'employee'
          //|| loginData?.system_role.toLowerCase() === 'support worker app'
          || loginData?.system_role.toLowerCase() === 'self-service portal - facilitator'
          || loginData?.system_role.toLowerCase() === 'self-service portal - coordinator'
          || loginData?.system_role.toLowerCase() === 'support coordinator'
          || loginData?.system_role.toLowerCase() === 'service facilitator')){

        this.message = undefined;
        this.error = undefined;
        this.error = `You're trying to login to the admin panel using the ${loginData?.system_role} account. Redirecting to the portal now.`;

        setTimeout(() => {
          // www.sc-lama.com/sso?token=asddasddasd&email=asd@gmail.com
          window.location.href = `https://portal.lamacare.com.au/sso?token=${loginData?.access_token}`;
        }, 4000);
      }

      // CLIENT
      else if(loginData?.id && loginData?.system_role.toLowerCase() === 'client'){
        setTimeout(() => {
          //this.router.navigate(['/client/dashboard']);
          //window.location.href = '/client/dashboard';
        }, 1000);
      }

      // CLIENT ONBOARDING
      else if(!loginData?.id && loginData?.system_role.toLowerCase() === 'client'){
        this.router.navigate(['/signup/client/onboarding']);
        this.snackBar.open('Please finish your onboarding details before accessing your dashboard.', '',
        {
          duration: 3000,
          panelClass: ['danger-snackbar']
        });
      }

      else if(!loginData?.organization_id && loginData?.system_role === 'employee')
        this.router.navigate(['/signup/admin/onboarding']);
    }
  }


  stripeCondition(stripeData: any){
    if(stripeData?.data[0]){
      sessionStorage.setItem('stripeCustomer', JSON.stringify(stripeData?.data[0]));
    }

  }

  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');
    this.error   = undefined;
    this.message = undefined;
  }

}

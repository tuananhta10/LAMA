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

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-admin-update-password',
  animations: [mainAnimations],
  templateUrl: './admin-update-password.component.html',
  styleUrls: ['./admin-update-password.component.scss']
})
export class AdminUpdatePasswordComponent implements OnInit {
  private postReq? : Subscription;
  private admin_email : string = '';
  private admin_password : string = '';

  public adminLoginForm : FormGroup;
  public message : any = localStorage.getItem('loginMessage');
  public error : any = localStorage.getItem('loginError');
  public submitting: boolean = false;
  public inputType: string = 'password';
  public loading: boolean = true;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private loginService: LoginAuthenticationService) { 
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
      ],
      confirmPassword: [
        "", 
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
    });

    setTimeout(() => {
      this.loading = false;
    }, 200)

  }

  ngOnDestroy(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');

    if(this.postReq) this.postReq.unsubscribe();
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
    this.adminLoginForm.controls['email'].disable();
    this.adminLoginForm.controls['password'].disable();

    // execute http post request
    this.postReq = this.loginService
    .postLogin(body)
    .subscribe((result: any) => {

      console.log(result)

      if(!result) localStorage.setItem('loginError', 'The server is taking too long to respond. Please try again.');

      // if no error, execute login validation
      if(result?.data?.access_token){
        this.adminLoginForm.controls['email'].enable();
        this.adminLoginForm.controls['password'].enable();

        localStorage.setItem('token', result.data.access_token);
        // add user data to storage
        localStorage.setItem('loggedUserData', JSON.stringify({
          ...result?.data
        }));
        
        this.adminLoginForm.reset();
        this.message = localStorage.getItem('loginMessage');
        this.submitting = false;
        this.adminService.setAdminLogin(true);

        // ADMIN
        if(result?.data.organization_id && result?.data.system_role.toLowerCase() === 'admin'){
          setTimeout(() => {
            //this.router.navigate(['/admin/dashboard']);
            window.location.href = '/admin/dashboard';
          }, 1000);
        }

        // ADMIN
        else if(result?.data.organization_id && result?.data.system_role.toLowerCase() === 'support worker app'){
          setTimeout(() => {
            this.error = 'Your account is not allowed to access this site. Please use the LAMA support worker app instead which can be downloaded from the <a href="https://apps.apple.com/ph/app/lama-care-sw/id6444767928" target="_blank">App Store</a> or <a href="https://play.google.com/store/apps/details?id=au.com.lamacare" target="_blank">Google Play Store</a>.';
            this.message = undefined;
          }, 1000);
        }

        // ADMIN ONBOARDING
        else if(!result?.data.organization_id && result?.data.system_role.toLowerCase() === 'admin'){
          this.router.navigate(['/signup/admin/onboarding']);
          this.snackBar.open('Please finish your onboarding details before accessing your dashboard.', '', 
          {
            duration: 3000,  
            panelClass: ['danger-snackbar']
          });
        }

        // EMPLOYEE
        else if(result?.data?.organization_id 
          && (result?.data.system_role.toLowerCase() === 'employee' 
            //|| result?.data.system_role.toLowerCase() === 'support worker app'
            || result?.data.system_role.toLowerCase() === 'self-service portal - facilitator'
            || result?.data.system_role.toLowerCase() === 'self-service portal - coordinator'
            || result?.data.system_role.toLowerCase() === 'support coordinator'
            || result?.data.system_role.toLowerCase() === 'service facilitator')){

          this.message = undefined;
          this.error = undefined;
          this.error = `You're trying to login to the admin panel using the ${result?.data?.system_role} account. Redirecting to the portal now.`;
          
          setTimeout(() => {
            // www.sc-lama.com/sso?token=asddasddasd&email=asd@gmail.com
            window.location.href = `https://portal.lamacare.com.au/sso?token=${result?.data?.access_token}`;
          }, 4000);
        }
          
        // CLIENT
        else if(result?.data.id && result?.data.system_role.toLowerCase() === 'client'){
          setTimeout(() => {
            //this.router.navigate(['/client/dashboard']);
            //window.location.href = '/client/dashboard';
          }, 1000);
        }

        // CLIENT ONBOARDING
        else if(!result?.data.id && result?.data.system_role.toLowerCase() === 'client'){
          this.router.navigate(['/signup/client/onboarding']);
          this.snackBar.open('Please finish your onboarding details before accessing your dashboard.', '', 
          {
            duration: 3000,  
            panelClass: ['danger-snackbar']
          });
        }

        else if(!result?.data.organization_id && result?.data?.system_role === 'employee')
          this.router.navigate(['/signup/admin/onboarding']);
      } 
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      console.log("ERR")

      this.error = undefined;
      this.submitting = false;
      this.adminLoginForm.reset();

      const errorMessage = err.error?.message?.replace('[Request Error] ', '');

      if(errorMessage.match('Invalid Email')){
        this.error = "Invalid Email or Password. Please double check your credentials and try again."
      }

      else {
        this.error = /*errorMessage ||*/ "There has been a problem with the server. Please refresh the page and try again or contact the administrator regarding this issue.";
      }
      
      this.adminLoginForm.controls['email'].enable();
      this.adminLoginForm.controls['password'].enable();
      localStorage.setItem('loginError', this.error);
      localStorage.setItem('sessionUrl', this.router.url);
    });   
  }

  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');
    this.error   = undefined;
    this.message = undefined;
  }


}

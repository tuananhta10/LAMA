import { 
  Component, 
  OnInit, 
  OnDestroy,
  HostListener
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
import { LoginAuthenticationService } from '@app-services/admin-panel/login-authentication.service';
import { mainAnimations } from '@app-main-animation';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
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
@Component({
  selector: 'app-client-signup-onboarding',
  animations: [mainAnimations],
  templateUrl: './client-signup-onboarding.component.html',
  styleUrls: ['./client-signup-onboarding.component.scss']
})
export class ClientSignupOnboardingComponent implements OnInit {
  private postReq? : Subscription;
  private req: Subscription;
  private admin_email : string = '';
  private admin_password : string = '';
  private unsubscribe$ = new Subject<void>();
  public loginForm : FormGroup;
  public message : any = localStorage.getItem('loginMessage');
  public error : any = localStorage.getItem('loginError');
  public submitting: boolean = false;
  public loading: boolean = true;
  public matcher = new MyErrorStateMatcher();
  public step:number = 1;
  public choices: any = {
    type: '',
    payment: '',
    fund_management: ''
  }

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private signupService: LoginAuthenticationService) { 

    
  }

  ngOnInit(){
    // Add event listener
    setTimeout(() => 
      {
        this.loading = false
      }, 500);
  }

  openSuccessModal(){
    let createClientDialog = this.dialog.open(
      SuccessSignupDialogComponent,
      { 
        //width: '40vw',
        data: {
          title: 'Onboarding Successful!'
        },
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));
      
      console.log(loggedUser)

      loggedUser.onboarding = false;
      localStorage.setItem('loggedUserData', JSON.stringify(loggedUser));
      this.router.navigate(['/client/dashboard']);
    });
  }


  saveOnboarding(){
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))['id'];
    let body  = {
      id: loggedUser,
      type_of_support: this.choices?.type,
      payment_type: this.choices?.payment,
      funding_type: this.choices?.fund_management
    };

    this.req = this.signupService.saveClientOnboarding(body)
    .subscribe((result: any) => {

    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');

    if(this.postReq) this.postReq.unsubscribe();
  }


  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');
    this.error   = undefined;
    this.message = undefined;
  }
}

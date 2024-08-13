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
  
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup-init',
  animations: [mainAnimations],
  templateUrl: './signup-init.component.html',
  styleUrls: ['./signup-init.component.scss']
})
export class SignupInitComponent implements OnInit {

  private postReq? : Subscription;
  private req: Subscription;

  private admin_email : string = '';
  private admin_password : string = '';

  public loginForm : FormGroup;
  public message : any = localStorage.getItem('loginMessage');
  public error : any = localStorage.getItem('loginError');
  public submitting: boolean = false;
  public loading: boolean = true;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginAuthenticationService) { 

    
  }



  ngOnInit(){
    // Add event listener
    setTimeout(() => 
      {
        this.loading = false
      }, 500);
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

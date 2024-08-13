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
  selector: 'app-admin-signup-from-link',
  animations: [mainAnimations],
  templateUrl: './admin-signup-from-link.component.html',
  styleUrls: ['./admin-signup-from-link.component.scss']
})
export class AdminSignupFromLinkComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  acceptInvite(){
    sessionStorage.setItem('WelcomeEmployee', 'true');
    this.router.navigate(['/signup/careworker'])
  }

}

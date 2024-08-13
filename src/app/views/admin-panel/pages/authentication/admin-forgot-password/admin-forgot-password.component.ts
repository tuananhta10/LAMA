import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mainAnimations } from '@main/shared/animations/main-animations';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { SendPasswordResetActionsTypes } from '@main/views/admin-panel/store/actions/admin-send-password-reset.action';
import { Store, select } from '@ngrx/store';
import { AuthenticationMessage } from '../utils/admin-auth-message.enum';
import { Subject } from 'rxjs'
import { takeUntil,switchMap } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-forgot-password',
  animations: [mainAnimations],
  templateUrl: './admin-forgot-password.component.html',
  styleUrls: ['./admin-forgot-password.component.scss'],
  providers:[JwtHelperService]
})
export class AdminForgotPasswordComponent implements OnInit {
  public adminPasswordResetForm: FormGroup;
  public submitting: boolean = false;
  public inputType: string = 'password';
  public loading: boolean = false;
  public message: string = "Passwords don't match. Please try again.";

  private unsubscribe$ = new Subject<void>()
  private passwordReset$: any;
  private readonly token: string = '';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminState: Store<AdminProfileState>,
    private snackbar: MatSnackBar,
    private jwtHelper: JwtHelperService
  ) {
    this.passwordReset$ = this.adminState.pipe(
      select((state) => state.sendPasswordReset)
    );
    
    this.activatedRoute.snapshot.queryParamMap.get('access_token') 
      ? localStorage.setItem('token',this.activatedRoute.snapshot.queryParamMap.get('access_token')) 
      : this.router.navigate(['/'])

    const token = localStorage.getItem('token')

    if (!token) {
      this.router.navigate(['/']);
    } else {
      if (this.validateToken(token)) {
        this.token = token;
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  ngOnInit(): void {
    this.adminPasswordResetForm = this.fb.group(
      {
        new_password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirm_password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      },
      { validators: [this.passwordMatchValidator] }
    );
  }

  private validateToken(token: string): boolean {
    try {
      const tokenData = this.jwtHelper.decodeToken(token);
      const isTokenExpired = this.jwtHelper.isTokenExpired(token);
  
      if (!isTokenExpired) {
        return true;
      } else {
        console.error('Token is expired');
        return false;
      }
    } catch (error) {
      console.error('Invalid token', error);
      return false;
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const new_password = group.get('new_password').value;
    const confirm_password = group.get('confirm_password').value;

    return new_password === confirm_password
      ? null
      : { passwordMismatch: true };
  }

  resetPassword() {
    if (!this.adminPasswordResetForm.valid) {
      this.snackbar.open(`${AuthenticationMessage.PASSWORD_FILL_UP_FIELDS}`, '', {
        duration: 3000,  
        panelClass: ['danger-snackbar']
      });
      return;
    }
    const payload = {
      body:{
        new_password: this.adminPasswordResetForm.controls['new_password'].value,
      },
      token: this.token,
    };

    this.adminState.dispatch({
      type: SendPasswordResetActionsTypes.PASSWORD_RESET,
      payload: payload,
    });

    this.subscribePasswordReset()
  }

  private subscribePasswordReset(){
    this.passwordReset$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((value: any) => {
        this.submitting = value.pending
        if (value.success) {
          return this.passwordResetSuccess();
        }
        if (value.error) {
          return this.passwordResetError();
        }
        return [];
      })
    ).subscribe()
  }

  private passwordResetSuccess() {
    this.unsubscribePasswordResetState()
    this.adminPasswordResetForm.reset()

    this.snackbar.open(`${AuthenticationMessage.PASSWORD_CHANGED}`, ' ', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });

    this.adminState.dispatch({
      type: SendPasswordResetActionsTypes.PASSWORD_RESET_SUCCESS,
      payload: { result: null }
    });

    this.router.navigate(['/signin'])
    return [];
  }

  private passwordResetError(){
    this.adminState.dispatch({
      type: SendPasswordResetActionsTypes.PASSWORD_RESET_FAILED,
      payload: {statusText:null}
    });

    this.snackbar.open(`${AuthenticationMessage.SERVER_ERROR}`, ' ', {
      duration: 4000,
      panelClass: 'danger-snackbar'
    });
    
    this.adminPasswordResetForm.reset()
    this.unsubscribePasswordResetState()
    return [];
  }


  private unsubscribePasswordResetState(){
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
    localStorage.removeItem('token')
  }

  adjustType() {
    if (this.inputType === 'password') this.inputType = 'text';
    else this.inputType = 'password';
  }

  onAlertClose() {
    //
  }
}

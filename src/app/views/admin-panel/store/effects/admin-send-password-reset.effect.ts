import { Injectable } from '@angular/core'
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SendPasswordResetActionsTypes } from '../actions/admin-send-password-reset.action';
import {
    catchError,
    map,
    switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs'
@Injectable()
export class SendPasswordResetEffect {
  constructor(
    private adminAuth: LoginAuthenticationService,
    private actions$: Actions
  ) {}

  public sendEmail = createEffect(() => 
    this.actions$.pipe(
      ofType(SendPasswordResetActionsTypes.SEND_EMAIL),
      switchMap((data: any) => {
        return this.adminAuth.sendPasswordResetEmail(data.payload).pipe(
          map((res: any) => {
            console.log(res)
            return {
              type: SendPasswordResetActionsTypes.SEND_EMAIL_SUCCESS,
              payload: res,
            };
          }),
          catchError((error: any) =>
            of({
              type: SendPasswordResetActionsTypes.SEND_EMAIL_FAILED,
              payload: error,
            })
          )
        );
      })
    )
  );
  public resetPassword = createEffect(() => 
    this.actions$.pipe(
      ofType(SendPasswordResetActionsTypes.PASSWORD_RESET),
      switchMap((data: any) => {
        return this.adminAuth.updatePassword(data.payload).pipe(
          map((res: any) => {
            console.log(res)
            return {
              type: SendPasswordResetActionsTypes.PASSWORD_RESET_SUCCESS,
              payload: res,
            };
          }),
          catchError((error: any) =>
            of({
              type: SendPasswordResetActionsTypes.PASSWORD_RESET_FAILED,
              payload: error,
            })
          )
        );
      })
    )
  );
}
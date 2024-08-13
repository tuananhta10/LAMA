import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';
import {
  Router
} from '@angular/router';

// import enum action types
import { ReferralActionTypes } from '../actions/admin-referral.action';
import { ReferralService } from '@main/shared/services/admin-panel/admin-referral.service';

@Injectable()
export class ReferralEffect {
  constructor(
    private referralsService: ReferralService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  public getReferralList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ReferralActionTypes.GET_REFERRAL_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.referralsService.getReferralListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ReferralActionTypes.GET_REFERRAL_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.GET_REFERRAL_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getReferral = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ReferralActionTypes.GET_REFERRAL),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.referralsService.getReferral(data.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ReferralActionTypes.GET_REFERRAL_SUCCESS,
                payload: result[0]
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.GET_REFERRAL_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveReferral = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ReferralActionTypes.SAVE_REFERRAL),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.referralsService.saveReferral(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              setTimeout(() => {
                 this.router.navigate(['/admin/referrals']);
               }, 500)

              return {
                type: ReferralActionTypes.SAVE_REFERRAL_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.SAVE_REFERRAL_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data:any) => {
        return this.referralsService.getReferralListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ReferralActionTypes.GET_REFERRAL_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.GET_REFERRAL_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editReferral = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ReferralActionTypes.EDIT_REFERRAL),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.referralsService.editReferral(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              if(!data?.fromForm){
                this.snackBar.open("Successfully updated referrals.", "", {
                  duration: 4000,
                  panelClass:'success-snackbar'
                });
              }

              else {
                this.snackBar.open("Successfully updated referral details.", "", {
                  duration: 4000,
                  panelClass:'success-snackbar'
                });
              }

              return {
                type: ReferralActionTypes.EDIT_REFERRAL_SUCCESS,
                payload: result,
                fromForm: data?.fromForm
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.EDIT_REFERRAL_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data:any) => {
        return this.referralsService.getReferralListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ReferralActionTypes.GET_REFERRAL_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.GET_REFERRAL_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),

    ),
  )

  public editReferralDetais = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ReferralActionTypes.EDIT_REFERRAL_DETAILS),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.referralsService.editReferral(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully updated referral details.", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: ReferralActionTypes.EDIT_REFERRAL_DETAILS_SUCCESS,
                payload: result,
                fromForm: data?.fromForm
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.EDIT_REFERRAL_DETAILS_FAIL,
                payload: error,
              }),
            ),
          );
      })

    ),
  )

  public deleteReferral = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ReferralActionTypes.DELETE_REFERRAL),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.referralsService.deleteReferral(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ReferralActionTypes.DELETE_REFERRAL_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.DELETE_REFERRAL_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteReferralComment = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ReferralActionTypes.DELETE_REFERRAL_COMMENT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.referralsService.deleteReferralComment(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully deleted referral comment", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: ReferralActionTypes.DELETE_REFERRAL_COMMENT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ReferralActionTypes.DELETE_REFERRAL_COMMENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

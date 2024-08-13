import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
} from 'rxjs/operators';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';

// import enum action types
import { CancellationPolicyActionTypes } from '../actions/admin-cancellation-policy.action';
import { CancellationPolicyService } from '@main/shared/services/admin-panel/admin-cancellation-policy.service';

@Injectable()
export class CancellationPolicyEffect {
  constructor(
    private cancellationPolicyService: CancellationPolicyService,
    private actions$: Actions
  ) {}

  public getCancellationPolicyList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.cancellationPolicyService.getCancellationPolicyListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveCancellationPolicy = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.cancellationPolicyService.saveCancellationPolicy(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editCancellationPolicy = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.cancellationPolicyService.editCancellationPolicy(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteCancellationPolicy = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.cancellationPolicyService.deleteCancellationPolicy(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

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
import { PayRateActionTypes } from '../actions/admin-pay-rate.action';
import { PayRateService } from '@main/shared/services/admin-panel/admin-pay-rate.service';

@Injectable()
export class PayRateEffect {
  constructor(
    private payrateService: PayRateService,
    private actions$: Actions
  ) {}

  public getPayRateList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PayRateActionTypes.GET_PAY_RATE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.payrateService.getPayRateListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PayRateActionTypes.GET_PAY_RATE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PayRateActionTypes.GET_PAY_RATE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public savePayRate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PayRateActionTypes.SAVE_PAY_RATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.payrateService.savePayRate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PayRateActionTypes.SAVE_PAY_RATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PayRateActionTypes.SAVE_PAY_RATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editPayRate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PayRateActionTypes.EDIT_PAY_RATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.payrateService.editPayRate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PayRateActionTypes.EDIT_PAY_RATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PayRateActionTypes.EDIT_PAY_RATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deletePayRate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PayRateActionTypes.DELETE_PAY_RATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.payrateService.deletePayRate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PayRateActionTypes.DELETE_PAY_RATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PayRateActionTypes.DELETE_PAY_RATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

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
import { EmployeePayRateLoadingActionTypes } from '../actions/admin-employee-pay-rate-loading.action';
import { EmployeePayRateLoadingService } from '@main/shared/services/admin-panel/admin-employee-pay-rate-loading.service';
import { EmployeePositionService } from '@main/shared/services/admin-panel/admin-employee-position.service';

@Injectable()
export class EmployeePayRateLoadingEffect {
  constructor(
    private employeePayrate: EmployeePayRateLoadingService,
    private employeePositionService: EmployeePositionService,
    private actions$: Actions
  ) {}

  public getEmployeePayRateLoadingList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePayrate.getEmployeePayRateLoadingListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeePayRateLoading = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePayrate.saveEmployeePayRateLoading(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editEmployeePayRateLoading = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePayrate.editEmployeePayRateLoading(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeePayRateLoading = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePayrate.deleteEmployeePayRateLoading(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public uploadEmployeePosition = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeePositionService.uploadEmployeePosition(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
  )


}

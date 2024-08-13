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
import { EmployeePayRateActionTypes } from '../actions/admin-employee-pay-rate.action';
import { EmployeePayRateService } from '@main/shared/services/admin-panel/admin-employee-pay-rate.service';
import { EmployeePositionService } from '@main/shared/services/admin-panel/admin-employee-position.service';

@Injectable()
export class EmployeePayRateEffect {
  constructor(
    private employeePayrate: EmployeePayRateService,
    private employeePositionService: EmployeePositionService,
    private actions$: Actions
  ) {}

  public getEmployeePayRateList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePayrate.getEmployeePayRateListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeePayRate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePayrate.saveEmployeePayRate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editEmployeePayRate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePayrate.editEmployeePayRate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeePayRate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePayrate.deleteEmployeePayRate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE_FAIL,
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
    ofType(EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeePositionService.uploadEmployeePosition(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
  )


}

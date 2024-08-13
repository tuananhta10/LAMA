import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap
} from 'rxjs/operators';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';

// import enum action types
import { EmployeeLeaveActionTypes } from '../actions/admin-employee-leave.action';
import { EmployeeLeaveService } from '@main/shared/services/admin-panel/admin-employee-leave.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EmployeeLeaveEffect {
  constructor(
    private employeeLeaveService: EmployeeLeaveService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getEmployeeLeaveList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeeLeaveService.getEmployeeLeaveListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeeLeave = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeLeaveService.saveEmployeeLeave(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        return this.employeeLeaveService.getEmployeeLeaveListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editEmployeeLeave = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeLeaveService.editEmployeeLeave(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeeLeave = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeeLeaveService.deleteEmployeeLeave(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ))

  public uploadEmployeeLeave = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeeLeaveService.uploadEmployeeLeave(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ))
}

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
import { EmployeePositionActionTypes } from '../actions/admin-employee-position.action';
import { EmployeePositionService } from '@main/shared/services/admin-panel/admin-employee-position.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EmployeePositionEffect {
  constructor(
    private employeePositionService: EmployeePositionService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getEmployeePositionList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getEmployeePositionListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeePosition = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveEmployeePosition(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        return this.employeePositionService.getEmployeePositionListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editEmployeePosition = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editEmployeePosition(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeePosition = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.deleteEmployeePosition(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION_FAIL,
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
    ofType(EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeePositionService.uploadEmployeePosition(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
  )
}

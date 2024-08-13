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
import { EmployeeDocActionTypes } from '../actions/admin-employee-doc.action';
import { EmployeeDocService } from '@main/shared/services/admin-panel/admin-employee-doc.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '@main/shared/services/admin-panel/admin-employee.service';
import { EmployeeActionTypes } from '../actions/admin-employee.action';

@Injectable()
export class EmployeeDocEffect {
  constructor(
    private employeeDocService: EmployeeDocService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
  ) {}

  public getEmployeeDocList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeeDocService.getEmployeeDocListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeeDoc = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeDocService.saveEmployeeDoc(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        let obj = {
          type: 'profile-employee-detail',
          id: data.payload?.data[0]?.employee_id,
          key: 'profileEmployeeDetail'
        }

        return this.employeeService.getEmployeeData(obj)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: `profileEmployeeDetail`,
                result: result
              }

              return {
                type: EmployeeActionTypes.GET_EMPLOYEE_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeActionTypes.GET_EMPLOYEE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editEmployeeDoc = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeDocService.editEmployeeDoc(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully updated the record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        let obj = {
          type: 'profile-employee-detail',
          id: data.payload?.data[0]?.employee_id,
          key: 'profileEmployeeDetail'
        }

        return this.employeeService.getEmployeeData(obj)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: `profileEmployeeDetail`,
                result: result
              }

              return {
                type: EmployeeActionTypes.GET_EMPLOYEE_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeActionTypes.GET_EMPLOYEE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeeDoc = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        this.snackBar.open("Successfully deleted record", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        return this.employeeDocService.deleteEmployeeDoc(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC_SUCCESS,
                payload: result,
                employee_id: data?.employee_id
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        let obj = {
          type: 'profile-employee-detail',
          id: data.employee_id,
          key: 'profileEmployeeDetail'
        }

        return this.employeeService.getEmployeeData(obj)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: `profileEmployeeDetail`,
                result: result
              }

              return {
                type: EmployeeActionTypes.GET_EMPLOYEE_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeActionTypes.GET_EMPLOYEE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

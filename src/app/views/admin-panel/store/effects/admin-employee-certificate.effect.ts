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
import { EmployeeCertificateActionTypes } from '../actions/admin-employee-certificate.action';
import { EmployeeCertificateService } from '@main/shared/services/admin-panel/admin-employee-certificate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '@app-services/admin-panel/admin-employee.service';
import { EmployeeActionTypes } from '../actions/admin-employee.action';

@Injectable()
export class EmployeeCertificateEffect {
  constructor(
    private employeeCertificateService: EmployeeCertificateService,
    private employeeService: EmployeeService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getEmployeeCertificateList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeeCertificateService.getEmployeeCertificateListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeeCertificate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeCertificateService.saveEmployeeCertificate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE_FAIL,
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

  public editEmployeeCertificate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeCertificateService.editEmployeeCertificate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully edited a record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE_FAIL,
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

  public deleteEmployeeCertificate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeCertificateService.deleteEmployeeCertificate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully deleted a record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE_SUCCESS,
                payload: result,
                employee_id: data?.employee_id
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE_FAIL,
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

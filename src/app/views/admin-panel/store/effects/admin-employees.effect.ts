import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  takeUntil,
  switchMap,
} from 'rxjs/operators';

import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import { State } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
// import enum action types
import { EmployeeListActionTypes } from '../actions/admin-employees.actions';
import { AdminProfileState } from '..'; // Get initial state
import { EmployeeListService } from '@app-services/admin-panel/employee-list.service';

@Injectable()
export class EmployeeListEffect {
  constructor(
    private employeeListService: EmployeeListService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getEmployeeList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeListActionTypes.GET_EMPLOYEE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeListService.getEmployeeListData(data?.payload).pipe(
          // return payload
          map((result: any) => {
            console.log('SUCCESS GETTING EMPLOYEES');

            return {
              type: EmployeeListActionTypes.GET_EMPLOYEE_LIST_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeListActionTypes.GET_EMPLOYEE_LIST_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getEmployeeListCompliance = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeListService.getEmployeeListCompliance().pipe(
          // return payload
          map((result: any) => {
            console.log('SUCCESS GETTING EMPLOYEES COMPLIANCE');

            return {
              type: EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public deleteEmployee = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeListActionTypes.DELETE_EMPLOYEE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeListService.deleteEmployeeData(data?.payload).pipe(
          // return payload
          map((result: any) => {
            console.log('SUCCESS');

            this.snackBar.open("Successfully deleted employee data.", "", {
              duration: 7000,
              panelClass:'success-snackbar'
            });

            return {
              type: EmployeeListActionTypes.DELETE_EMPLOYEE_LIST_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeListActionTypes.DELETE_EMPLOYEE_LIST_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getEmployeeClientsList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.employeeListService.getEmployeeClients().pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getEmployeeLiveFeed = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.employeeListService.getEmployeeFeedData().pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public uploadEmployee = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeListActionTypes.UPLOAD_EMPLOYEE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeListService.uploadEmployee(data?.payload).pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeeListActionTypes.UPLOAD_EMPLOYEE_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) => 
            {
              this.snackBar.open("There's seems to be a problem with your file. We can't read the data format properly. Please check the file for inconsistency.", "", {
                duration: 7000,
                panelClass:'danger-snackbar'
              });

              return of({
                type: EmployeeListActionTypes.UPLOAD_EMPLOYEE_FAIL,
                payload: error,
              })
            },
          ),
        );
      })
    )
  );
}

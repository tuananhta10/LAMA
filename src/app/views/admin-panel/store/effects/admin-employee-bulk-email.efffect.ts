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
import { EmployeeBulkEmailActionTypes } from '../actions/admin-employee-bulk-email.action';
import { AdminEmployeeBulkEmailNotificationService } from '@main/shared/services/admin-panel/admin-employee-bulk-email-notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '@app-services/admin-panel/admin-employee.service';
import { EmployeeActionTypes } from '../actions/admin-employee.action';

@Injectable()
export class EmployeeBulkEmailEffect {
  constructor(
    private employeeBulkEmailNotificationService: AdminEmployeeBulkEmailNotificationService,
    private employeeService: EmployeeService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getEmployeeBulkEmailList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeeBulkEmailNotificationService.getEmployeeBulkEmailListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeeBulkEmail = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeBulkEmailNotificationService.saveEmployeeBulkEmail(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully sent bulk emails to selected employee group.", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) => {
              this.snackBar.open("Error sending emails. Please contact the administrator to resolve this issue.", "", {
                duration: 5000,
                panelClass:'danger-snackbar'
              });

              return of({
                type: EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL,
                payload: error || "Error sending emails. Please contact the administrator to resolve this issue.",
              })
            },
              
            ),
          );
      })
    ),
  )

  public saveEmployeeTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeBulkEmailNotificationService.saveEmployeeEmailTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully saved the communication template.", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) => {
              this.snackBar.open("Error saving email template. Please contact the administrator to resolve this issue.", "", {
                duration: 5000,
                panelClass:'danger-snackbar'
              });

              return of({
                type: EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE_FAIL,
                payload: error || "Error saving email template. Please contact the administrator to resolve this issue.",
              })
            },
              
            ),
          );
      })
    ),
  )

  public editEmployeeBulkEmail = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeBulkEmailNotificationService.editEmployeeBulkEmail(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully edited a record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeeBulkEmail = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeBulkEmailNotificationService.deleteEmployeeBulkEmail(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully deleted a record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS,
                payload: result,
                employee_id: data?.employee_id
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

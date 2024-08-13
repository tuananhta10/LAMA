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
import { EmployeeBulkSMSActionTypes } from '../actions/admin-employee-bulk-sms.action';
import { AdminEmployeeBulkSmsNotificationService } from '@main/shared/services/admin-panel/admin-employee-bulk-sms-notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '@app-services/admin-panel/admin-employee.service';
import { EmployeeActionTypes } from '../actions/admin-employee.action';

@Injectable()
export class EmployeeBulkSMSEffect {
  constructor(
    private employeeBulkSMSNotificationService: AdminEmployeeBulkSmsNotificationService,
    private employeeService: EmployeeService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getEmployeeBulkSMSList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeeBulkSMSNotificationService.getEmployeeBulkSMSListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeeBulkSMS = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeBulkSMSNotificationService.saveEmployeeBulkSMS(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully sent bulk smss to selected employee group.", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) => {
              this.snackBar.open("Error sending smss. Please contact the administrator to resolve this issue.", "", {
                duration: 5000,
                panelClass:'danger-snackbar'
              });

              return of({
                type: EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL,
                payload: error || "Error sending smss. Please contact the administrator to resolve this issue.",
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
      ofType(EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeBulkSMSNotificationService.saveEmployeeSMSTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully saved the communication template.", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) => {
              this.snackBar.open("Error saving sms template. Please contact the administrator to resolve this issue.", "", {
                duration: 5000,
                panelClass:'danger-snackbar'
              });

              return of({
                type: EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE_FAIL,
                payload: error || "Error saving sms template. Please contact the administrator to resolve this issue.",
              })
            },
              
            ),
          );
      })
    ),
  )

  public editEmployeeBulkSMS = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeBulkSMSNotificationService.editEmployeeBulkSMS(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully edited a record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeeBulkSMS = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeBulkSMSNotificationService.deleteEmployeeBulkSMS(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully deleted a record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS,
                payload: result,
                employee_id: data?.employee_id
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

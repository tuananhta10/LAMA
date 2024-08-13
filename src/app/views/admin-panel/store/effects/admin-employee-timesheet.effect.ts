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
import { EmployeeTimesheetActionTypes } from '../actions/admin-employee-timesheet.action';
import { EmployeeTimesheetService } from '@main/shared/services/admin-panel/admin-employee-timesheet.service';

@Injectable()
export class EmployeeTimesheetEffect {
  constructor(
    private employeeTimesheetService: EmployeeTimesheetService,
    private actions$: Actions
  ) {}

  public getEmployeeTimesheetList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeeTimesheetService.getEmployeeTimesheetListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeeTimesheet = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeTimesheetService.saveEmployeeTimesheet(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editEmployeeShift = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeTimesheetService.editEmployeeTimesheet(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeeShift = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeTimesheetService.deleteEmployeeTimesheet(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

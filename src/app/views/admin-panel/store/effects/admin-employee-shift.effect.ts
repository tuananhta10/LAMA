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
import { EmployeeShiftActionTypes } from '../actions/admin-employee-shift.action';
import { EmployeeShiftService } from '@main/shared/services/admin-panel/admin-employee-shift.service';

@Injectable()
export class EmployeeShiftEffect {
  constructor(
    private employeeShiftService: EmployeeShiftService,
    private actions$: Actions
  ) {}

  public getEmployeeShiftList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeeShiftService.getEmployeeShiftListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeeShift = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeShiftService.saveEmployeeShift(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT_FAIL,
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
      ofType(EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeShiftService.editEmployeeShift(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT_FAIL,
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
      ofType(EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeShiftService.deleteEmployeeShift(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

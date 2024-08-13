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
import { EmployeeTaskActionTypes } from '../actions/admin-employee-task.action';
import { EmployeeTaskService } from '@main/shared/services/admin-panel/admin-employee-task.service';

@Injectable()
export class EmployeeTaskEffect {
  constructor(
    private employeePositionService: EmployeeTaskService,
    private actions$: Actions
  ) {}

  public getEmployeeTaskList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getEmployeeTaskListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmployeeTask = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveEmployeeTask(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editEmployeeTask = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editEmployeeTask(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmployeeTask = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.deleteEmployeeTask(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

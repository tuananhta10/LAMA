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

// import enum action types
import { EmployeeActionTypes } from '../actions/admin-employee.action';
import { AdminProfileState } from '..'; // Get initial state
import { EmployeeService } from '@app-services/admin-panel/admin-employee.service';
import { AdminChangePasswordsService } from '@main/shared/services/admin-panel/admin-change-passwords.service';
import { EmployeeListActionTypes } from '../actions/admin-employees.actions';
import { EmployeeListService } from '@app-services/admin-panel/employee-list.service';

@Injectable()
export class EmployeeEffect {
  constructor(
    private employeeService: EmployeeService,
    private employeeListService: EmployeeListService,
    private actions$: Actions,
    private adminChangePasswordsService: AdminChangePasswordsService
  ) {}

  public getEmployee = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeActionTypes.GET_EMPLOYEE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeService.getEmployeeData(data?.payload).pipe(
          // return payload
          map((result: any) => {
            let retData = {
              key: data.payload.key,
              result: result,
            };

            return {
              type: EmployeeActionTypes.GET_EMPLOYEE_SUCCESS,
              payload: retData,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeActionTypes.GET_EMPLOYEE_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public saveEmployee = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeActionTypes.SAVE_EMPLOYEE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeService.saveEmployee(data?.payload).pipe(
          // return payload
          map((result: any) => {
            console.log(result, 'SUCCESS');

            return {
              type: EmployeeActionTypes.SAVE_EMPLOYEE_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeActionTypes.SAVE_EMPLOYEE_FAIL,
              payload: error,
            })
          )
        );
      }),
      // mergeMap((data: any) => {
      //   if (!data?.payload?.error) {
      //     console.log('SUCCESS CREATING', data);
      //     return this.employeeService.getEmployeeData(data?.payload).pipe(
      //       // return payload
      //       map((result: any) => {
      //         let retData = {
      //           key: data.payload.key,
      //           result: result,
      //         };

      /*mergeMap((data: any) => {
        if (!data?.payload?.error) {
          console.log('SUCCESS CREATING', data);
          
        }

        return this.employeeService.getEmployeeData(data?.payload).pipe(
          // return payload
          map((result: any) => {
            let retData = {
              key: data.payload.key,
              result: result,
            };

            if(!data?.payload?.error){
              return {
                type: EmployeeActionTypes.GET_EMPLOYEE_SUCCESS,
                payload: retData,
              };
            }

            else return {
              type: EmployeeActionTypes.GET_EMPLOYEE_FAIL,
              payload: data?.payload?.error,
            }
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeActionTypes.GET_EMPLOYEE_FAIL,
              payload: error,
            })
          )
        );
      })*/
    )
  );

  public saveDraftEmployee = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeService.saveEmployee(data?.payload).pipe(
          // return payload
          map((result: any) => {
            console.log(result, 'SUCCESS');

            return {
              type: EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE_FAIL,
              payload: error,
            })
          )
        );
      }),
    )
  );

  public editEmployee = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeActionTypes.EDIT_EMPLOYEE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeService.editEmployee(data?.payload).pipe(
          // return payload
          map((result: any) => {
            return {
              type: EmployeeActionTypes.EDIT_EMPLOYEE_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: EmployeeActionTypes.EDIT_EMPLOYEE_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public editPassword = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.adminChangePasswordsService
          .updateEmployeePassword(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD_SUCCESS,
                payload: result,
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD_FAIL,
                payload: error,
              })
            )
          );
      })
    )
  );

  public getEmployeeStats = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeActionTypes.GET_EMPLOYEE_STATS),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeeService.getEmployeeStats(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: data.payload.key,
                result: result
              }

              return {
                type: EmployeeActionTypes.GET_EMPLOYEE_STATS_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeActionTypes.GET_EMPLOYEE_STATS_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editQualification = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeService
          .editEmployeeQualification(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION_FAIL,
                payload: error,
              })
            )
          );
      }),

      // mergeMap((data: any) => {
      //   console.log(data)

      //   let obj = {
      //     type: 'profile-employee-detail',
      //     id: data.employee_id,
      //     key: 'profileEmployeeDetail'
      //   }

      //   console.log(obj)

      //   return this.employeeService.getEmployeeData(obj)
      //     .pipe(
      //       // return payload
      //       map((result: any) => {
      //         let retData = {
      //           key: `profileEmployeeDetail`,
      //           result: result
      //         }

      //         return {
      //           type: EmployeeActionTypes.GET_EMPLOYEE_SUCCESS,
      //           payload: retData
      //         };
      //       }),
      //       catchError((error: any) =>
      //         // error handler
      //         of({
      //           type: EmployeeActionTypes.GET_EMPLOYEE_FAIL,
      //           payload: error,
      //         }),
      //       ),
      //     );
      // }),
    )
  );

  public editEmployeeDetailsQualification = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeeService
          .editEmployeeQualification(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION_SUCCESS,
                payload: result,
                employee: data?.employee_id
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION_FAIL,
                payload: error,
              })
            )
          );
      }),
      /*mergeMap((data: any) => {
        let obj = {
          type: 'employee-service',
          id: data.employee,
          key: 'serviceDetail'
        }

        return this.employeeService.getEmployeeData(obj)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: `serviceDetail`,
                result: result
              }

              console.log(retData)

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
      }),*/
    )
  );
}

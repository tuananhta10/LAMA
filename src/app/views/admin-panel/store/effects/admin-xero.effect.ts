import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';

// import enum action types
import { SyncToXeroActionTypes } from '../actions/admin-xero.action';
import { AdminXeroAuthService } from '@main/shared/services/admin-panel/admin-xero-auth.service';

@Injectable()
export class SyncToXeroEffect {
  constructor(
    private xeroService: AdminXeroAuthService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getXeroProgressList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(SyncToXeroActionTypes.SYNC_TO_XERO_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.xeroService.getXeroListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public syncToXero = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(SyncToXeroActionTypes.SYNC_TO_XERO),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.xeroService.syncToXero(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {

              return {
                type: SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: SyncToXeroActionTypes.SYNC_TO_XERO_FAIL,
                payload: error,
              }),
            ),
          );
      })
    ),
  )

  public getPayrollCalendarOptions = createEffect(() =>
    this.actions$.pipe(
      ofType(SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR),
      switchMap((data:any) => {

        return this.xeroService.getXeroPayrollOptions().pipe(
          map((result:any) => {

            return {
              type: SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR_SUCCESS,
              payload: result
            }
          }),
          catchError((error: any) => 
            of({
              type:SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR_FAIL,
              payload:error
            })
          )
        )
      })
    )
  )

  public getMYOBSettingsLists = createEffect(() =>
  this.actions$.pipe(
    ofType(SyncToXeroActionTypes.GET_MYOB_SETTINGS),
    switchMap((data:any) => {

      return this.xeroService.getMYOBConfigurationLists().pipe(
        map((result:any) => {

          return {
            type: SyncToXeroActionTypes.GET_MYOB_SETTINGS_SUCCESS,
            payload: result
          }
        }),
        catchError((error: any) => 
          of({
            type:SyncToXeroActionTypes.GET_MYOB_SETTINGS_FAIL,
            payload:error
          })
        )
      )
    })
  )
)
public getMYOBCompanyFileLists = createEffect(() =>
this.actions$.pipe(
  ofType(SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE),
  switchMap((data:any) => {

    return this.xeroService.getMYOBCompanyFile().pipe(
      map((result:any) => {

        return {
          type: SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE_SUCCESS,
          payload: result
        }
      }),
      catchError((error: any) => 
        of({
          type:SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE_FAIL,
          payload:error
        })
      )
    )
  })
)
)
}

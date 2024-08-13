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
import { FundingSourceActionTypes } from '../actions/admin-funding-source.action';
import { FundingSourceService } from '@main/shared/services/admin-panel/admin-funding-source.service';

@Injectable()
export class FundingSourceEffect {
  constructor(
    private employeePositionService: FundingSourceService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getFundingSourceList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getFundingSourceListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveFundingSource = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FundingSourceActionTypes.SAVE_FUNDING_SOURCE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveFundingSource(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: FundingSourceActionTypes.SAVE_FUNDING_SOURCE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingSourceActionTypes.SAVE_FUNDING_SOURCE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data:any) => {
        return this.employeePositionService.getFundingSourceListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editFundingSource = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FundingSourceActionTypes.EDIT_FUNDING_SOURCE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editFundingSource(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FundingSourceActionTypes.EDIT_FUNDING_SOURCE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingSourceActionTypes.EDIT_FUNDING_SOURCE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteFundingSource = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FundingSourceActionTypes.DELETE_FUNDING_SOURCE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.deleteFundingSource(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FundingSourceActionTypes.DELETE_FUNDING_SOURCE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingSourceActionTypes.DELETE_FUNDING_SOURCE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public uploadClient = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeePositionService.uploadClientFunding(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
  )
}

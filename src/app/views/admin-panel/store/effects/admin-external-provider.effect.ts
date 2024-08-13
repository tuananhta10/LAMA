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
import { ExternalProviderActionTypes } from '../actions/admin-external-provider.action';
import { AdminExternalProviderService } from '@main/shared/services/admin-panel/admin-external-provider.service';

@Injectable()
export class ExternalProviderEffect {
  constructor(
    private externalProviderService: AdminExternalProviderService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getExternalProviderList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.externalProviderService.getExternalProviderListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveExternalProvider = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.externalProviderService.saveExternalProvider(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data:any) => {
        return this.externalProviderService.getExternalProviderListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editExternalProvider = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.externalProviderService.editExternalProvider(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully updated external provider record", "", {
                duration: 4000,
                panelClass: 'success-snackbar'
              });

              return {
                type: ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data:any) => {
        return this.externalProviderService.getExternalProviderListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )


  public deleteExternalProvider = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.externalProviderService.deleteExternalProvider(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully deleted external provider record", "", {
                duration: 4000,
                panelClass:'success-snackbar'

              });
              return {
                type: ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data:any) => {
        return this.externalProviderService.getExternalProviderListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

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
import { ServiceTypeActionTypes } from '../actions/admin-service-type.action';
import { ServiceTypeService } from '@main/shared/services/admin-panel/admin-service-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ServiceTypeEffect {
  constructor(
    private serviceTypeService: ServiceTypeService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getServiceTypeList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.serviceTypeService.getServiceTypeListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveServiceType = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ServiceTypeActionTypes.SAVE_SERVICE_TYPE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.serviceTypeService.saveServiceType(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: ServiceTypeActionTypes.SAVE_SERVICE_TYPE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ServiceTypeActionTypes.SAVE_SERVICE_TYPE_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        return this.serviceTypeService.getServiceTypeListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editServiceType = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ServiceTypeActionTypes.EDIT_SERVICE_TYPE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.serviceTypeService.editServiceType(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ServiceTypeActionTypes.EDIT_SERVICE_TYPE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ServiceTypeActionTypes.EDIT_SERVICE_TYPE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

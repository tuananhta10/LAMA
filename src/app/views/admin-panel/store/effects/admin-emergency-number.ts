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
import { EmergencyNumberActionTypes } from '../actions/admin-emergency-number.action';
import { EmergencyNumberService } from '@main/shared/services/admin-panel/admin-emergency-number.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EmergencyNumberEffect {
  constructor(
    private emergencyNumberService: EmergencyNumberService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getEmergencyNumberList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.emergencyNumberService.getEmergencyNumberListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveEmergencyNumber = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.emergencyNumberService.saveEmergencyNumber(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        return this.emergencyNumberService.getEmergencyNumberListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editEmergencyNumber = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.emergencyNumberService.editEmergencyNumber(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteEmergencyNumber = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.emergencyNumberService.deleteEmergencyNumber(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

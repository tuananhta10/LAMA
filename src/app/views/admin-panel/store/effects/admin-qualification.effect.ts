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
import { QualificationActionTypes } from '../actions/admin-qualification.action';
import { QualificationService } from '@main/shared/services/admin-panel/admin-qualification.service';

@Injectable()
export class QualificationEffect {
  constructor(
    private employeePositionService: QualificationService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getQualificationList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(QualificationActionTypes.GET_QUALIFICATION_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getQualificationListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: QualificationActionTypes.GET_QUALIFICATION_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: QualificationActionTypes.GET_QUALIFICATION_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveQualification = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(QualificationActionTypes.SAVE_QUALIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveQualification(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: QualificationActionTypes.SAVE_QUALIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: QualificationActionTypes.SAVE_QUALIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data:any) => {
        return this.employeePositionService.getQualificationListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: QualificationActionTypes.GET_QUALIFICATION_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: QualificationActionTypes.GET_QUALIFICATION_LIST_FAIL,
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
      ofType(QualificationActionTypes.EDIT_QUALIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editQualification(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: QualificationActionTypes.EDIT_QUALIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: QualificationActionTypes.EDIT_QUALIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteQualification = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(QualificationActionTypes.DELETE_QUALIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.deleteQualification(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: QualificationActionTypes.DELETE_QUALIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: QualificationActionTypes.DELETE_QUALIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

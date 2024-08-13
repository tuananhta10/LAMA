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
import { JobTypesActionTypes } from '../actions/admin-job-types.action';
import { AdminJobTypeService } from '@main/shared/services/admin-panel/admin-job-type.service';

@Injectable()
export class JobTypesEffect {
  constructor(
    private jobTypesService: AdminJobTypeService,
    private actions$: Actions
  ) {}

  public getJobTypesList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(JobTypesActionTypes.GET_JOB_TYPES_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.jobTypesService.getJobTypesListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: JobTypesActionTypes.GET_JOB_TYPES_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: JobTypesActionTypes.GET_JOB_TYPES_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveJobTypes = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(JobTypesActionTypes.SAVE_JOB_TYPES),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.jobTypesService.saveJobTypes(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: JobTypesActionTypes.SAVE_JOB_TYPES_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: JobTypesActionTypes.SAVE_JOB_TYPES_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editJobTypes = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(JobTypesActionTypes.EDIT_JOB_TYPES),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.jobTypesService.editJobTypes(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: JobTypesActionTypes.EDIT_JOB_TYPES_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: JobTypesActionTypes.EDIT_JOB_TYPES_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteJobTypes = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(JobTypesActionTypes.DELETE_JOB_TYPES),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.jobTypesService.deleteJobTypes(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: JobTypesActionTypes.DELETE_JOB_TYPES_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: JobTypesActionTypes.DELETE_JOB_TYPES_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

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
import { GenderActionTypes } from '../actions/admin-gender.action';
import { AdminGenderService } from '@main/shared/services/admin-panel/admin-gender.service';

@Injectable()
export class GenderEffect {
  constructor(
    private genderService: AdminGenderService,
    private actions$: Actions
  ) {}

  public getGenderList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(GenderActionTypes.GET_GENDER_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.genderService.getGenderListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: GenderActionTypes.GET_GENDER_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: GenderActionTypes.GET_GENDER_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveGender = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(GenderActionTypes.SAVE_GENDER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.genderService.saveGender(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: GenderActionTypes.SAVE_GENDER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: GenderActionTypes.SAVE_GENDER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editGender = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(GenderActionTypes.EDIT_GENDER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.genderService.editGender(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: GenderActionTypes.EDIT_GENDER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: GenderActionTypes.EDIT_GENDER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteGender = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(GenderActionTypes.DELETE_GENDER),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.genderService.deleteGender(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: GenderActionTypes.DELETE_GENDER_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: GenderActionTypes.DELETE_GENDER_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

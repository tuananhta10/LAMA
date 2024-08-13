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
import { HobbiesActionTypes } from '../actions/admin-hobbies.action';
import { AdminHobbiesService } from '@main/shared/services/admin-panel/admin-hobbies.service';

@Injectable()
export class HobbiesEffect {
  constructor(
    private hobbiesService: AdminHobbiesService,
    private actions$: Actions
  ) {}

  public getHobbiesList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(HobbiesActionTypes.GET_HOBBIES_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.hobbiesService.getHobbiesListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: HobbiesActionTypes.GET_HOBBIES_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: HobbiesActionTypes.GET_HOBBIES_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveHobbies = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(HobbiesActionTypes.SAVE_HOBBIES),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.hobbiesService.saveHobbies(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: HobbiesActionTypes.SAVE_HOBBIES_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: HobbiesActionTypes.SAVE_HOBBIES_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editHobbies = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(HobbiesActionTypes.EDIT_HOBBIES),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.hobbiesService.editHobbies(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: HobbiesActionTypes.EDIT_HOBBIES_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: HobbiesActionTypes.EDIT_HOBBIES_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteHobbies = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(HobbiesActionTypes.DELETE_HOBBIES),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.hobbiesService.deleteHobbies(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: HobbiesActionTypes.DELETE_HOBBIES_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: HobbiesActionTypes.DELETE_HOBBIES_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

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
import { PublicHolidayActionTypes } from '../actions/admin-public-holiday.action';
import { PublicHolidayService } from '@main/shared/services/admin-panel/admin-public-holiday.service';

@Injectable()
export class PublicHolidayEffect {
  constructor(
    private publicHolidayService: PublicHolidayService,
    private actions$: Actions
  ) {}

  public getPublicHolidayList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.publicHolidayService.getPublicHolidayListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public savePublicHoliday = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.publicHolidayService.savePublicHoliday(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editPublicHoliday = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.publicHolidayService.editPublicHoliday(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deletePublicHoliday = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.publicHolidayService.deletePublicHoliday(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

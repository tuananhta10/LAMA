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
import { InterestActionTypes } from '../actions/admin-interest.action';
import { InterestService } from '@main/shared/services/admin-panel/admin-interest.service';

@Injectable()
export class InterestEffect {
  constructor(
    private employeePositionService: InterestService,
    private actions$: Actions
  ) {}

  public getInterestList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InterestActionTypes.GET_INTEREST_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getInterestListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InterestActionTypes.GET_INTEREST_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InterestActionTypes.GET_INTEREST_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveInterest = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InterestActionTypes.SAVE_INTEREST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveInterest(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InterestActionTypes.SAVE_INTEREST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InterestActionTypes.SAVE_INTEREST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editInterest = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InterestActionTypes.EDIT_INTEREST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editInterest(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InterestActionTypes.EDIT_INTEREST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InterestActionTypes.EDIT_INTEREST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteInterest = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(InterestActionTypes.DELETE_INTEREST),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeePositionService.deleteInterest(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: InterestActionTypes.DELETE_INTEREST_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: InterestActionTypes.DELETE_INTEREST_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

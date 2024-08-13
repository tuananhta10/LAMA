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
import { ScheduleBoardActionTypes } from '../actions/admin-schedule-board.action';
import { ScheduleBoardService } from '@main/shared/services/admin-panel/admin-schedule-board.service';
import { format } from 'date-fns';

@Injectable()
export class ScheduleBoardEffect {
  public days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  constructor(
    private scheduleBoardService: ScheduleBoardService,
    private actions$: Actions
  ) {}

  public getScheduleBoardList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.scheduleBoardService.getScheduleBoardListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getScheduleListParticipant = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.scheduleBoardService.getSingleSchedulePerClient(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveScheduleBoard = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.scheduleBoardService.saveScheduleBoard(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editScheduleBoard = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.scheduleBoardService.editScheduleBoard(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public assignEmployee = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ScheduleBoardActionTypes.ASSIGN_EMPLOYEE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.scheduleBoardService.assignEmployee(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ScheduleBoardActionTypes.ASSIGN_EMPLOYEE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ScheduleBoardActionTypes.ASSIGN_EMPLOYEE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteScheduleBoard = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.scheduleBoardService.deleteScheduleBoard(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getVacantEmployees = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE),
    // switch to a new observable and cancel previous subscription
    switchMap((data:any) => {
      return this.scheduleBoardService.getVacantEmployees(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

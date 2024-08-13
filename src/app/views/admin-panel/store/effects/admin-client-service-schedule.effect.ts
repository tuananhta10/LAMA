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
import { ClientServiceScheduleActionTypes } from '../actions/admin-client-service-schedule.action';
import { ClientServiceScheduleService } from '@main/shared/services/admin-panel/admin-client-service-schedule.service';

@Injectable()
export class ClientServiceScheduleEffect {
  constructor(
    private clientServiceScheduleService: ClientServiceScheduleService,
    private actions$: Actions
  ) {}

  public getClientServiceScheduleDetails = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        console.log(data)

        return this.clientServiceScheduleService.getClientServiceScheduleDetails(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getClientServiceScheduleList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientServiceScheduleService.getClientServiceScheduleListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveClientServiceSchedule = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientServiceScheduleService.saveClientServiceSchedule(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )


  /* RECURRING SCHEDULE */
  public saveClientServiceScheduleRecurring = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientServiceScheduleService.saveClientServiceScheduleRecurring(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public updateClientServiceScheduleRecurring = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientServiceScheduleService.updateClientServiceScheduleRecurring(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              if(result){
                return {
                  type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_SUCCESS,
                  payload: result
                };
              }
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public reschedulingOnEmployee = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(ClientServiceScheduleActionTypes.RESCHEDULE_SCHEDULE_EMPLOYEE),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.clientServiceScheduleService.reschedulingScheduleEmployee(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            if(result){
              return {
                type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_SUCCESS,
                payload: result
              };
            }
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)

  /* GROUP SCHEDULE */
  public saveClientServiceScheduleGroup = createEffect(() =>
      this.actions$.pipe(
        // set type
        ofType(ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP),
        // switch to a new observable and cancel previous subscription
        switchMap((data: any) => {
          return this.clientServiceScheduleService.saveClientServiceScheduleGroup(data?.payload)
            .pipe(
              // return payload
              map((result: any) => {
                return {
                  type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP_SUCCESS,
                  payload: result
                };
              }),
              catchError((error: any) =>
                // error handler
                of({
                  type: ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP_FAIL,
                  payload: error,
                }),
              ),
            );
        }),
      ),
  )

  public updateClientServiceScheduleGroup = createEffect(() =>
      this.actions$.pipe(
        // set type
        ofType(ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP),
        // switch to a new observable and cancel previous subscription
        switchMap((data: any) => {
          return this.clientServiceScheduleService.updateClientServiceScheduleGroup(data?.payload)
            .pipe(
              // return payload
              map((result: any) => {
                return {
                  type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP_SUCCESS,
                  payload: result
                };
              }),
              catchError((error: any) =>
                // error handler
                of({
                  type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP_FAIL,
                  payload: error,
                }),
              ),
            );
        }),
      ),
  )

  public editClientServiceSchedule = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientServiceScheduleService.editClientServiceSchedule(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteClientServiceSchedule = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.clientServiceScheduleService.deleteClientServiceSchedule(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

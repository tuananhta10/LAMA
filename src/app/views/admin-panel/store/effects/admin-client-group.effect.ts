import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';

import {
  Actions,
  ofType,
  Effect,
  createEffect
} from '@ngrx/effects';

// import enum action types
import { ClientGroupActionTypes } from '../actions/admin-client-group.action';
import { ClientGroupService } from '@main/shared/services/admin-panel/admin-client-group.service';
import { ClientService } from '@main/shared/services/admin-panel/admin-client.service';

@Injectable()
export class ClientGroupEffect {
  constructor(
    private clientGroupService: ClientGroupService,
    private actions$: Actions
  ) {}

  public getClientGroup = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientGroupActionTypes.GET_CLIENT_GROUP),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientGroupService.getClientGroupData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientGroupActionTypes.GET_CLIENT_GROUP_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientGroupActionTypes.GET_CLIENT_GROUP_FAIL,
                payload: error,
              }),
            ),
          );
      }), 
    ),
  )

  public getClientGroupList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientGroupActionTypes.GET_CLIENT_GROUP_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientGroupService.getClientGroupListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientGroupActionTypes.GET_CLIENT_GROUP_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientGroupActionTypes.GET_CLIENT_GROUP_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }), 
    ),
  )

  public getClientGroupSchedule = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientGroupService.getClientGroupListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE_FAIL,
                payload: error,
              }),
            ),
          );
      }), 
    ),
  )

  public saveClientGroup = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientGroupActionTypes.SAVE_CLIENT_GROUP),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientGroupService.saveClientGroup(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientGroupActionTypes.SAVE_CLIENT_GROUP_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientGroupActionTypes.SAVE_CLIENT_GROUP_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editClientGroup = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientGroupActionTypes.EDIT_CLIENT_GROUP),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientGroupService.editClientGroup(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientGroupActionTypes.EDIT_CLIENT_GROUP_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientGroupActionTypes.EDIT_CLIENT_GROUP_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteClientGroup = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientGroupActionTypes.DELETE_CLIENT_GROUP),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientGroupService.deleteClientGroup(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientGroupActionTypes.DELETE_CLIENT_GROUP_SUCCESS,
                payload: result,
                client_id: data?.client_id
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientGroupActionTypes.DELETE_CLIENT_GROUP_FAIL,
                payload: error,
              }),
            ),
          );
      })
    ),
  )
}

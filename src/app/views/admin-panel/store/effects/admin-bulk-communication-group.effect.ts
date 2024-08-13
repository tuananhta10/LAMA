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
import { CommunicationGroupActionTypes } from '../actions/admin-bulk-communication-group.action';
import { AdminBulkCommunicationGroupService } from '@main/shared/services/admin-panel/admin-bulk-communication-group.service';

@Injectable()
export class CommunicationGroupEffect {
  constructor(
    private communicationGroupService: AdminBulkCommunicationGroupService,
    private actions$: Actions
  ) {}

  public getCommunicationGroup = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.communicationGroupService.getCommunicationGroupData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getCommunicationGroupList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.communicationGroupService.getCommunicationGroupListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveCommunicationGroup = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.communicationGroupService.saveCommunicationGroup(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editCommunicationGroup = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.communicationGroupService.editCommunicationGroup(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteCommunicationGroup = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.communicationGroupService.deleteCommunicationGroup(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

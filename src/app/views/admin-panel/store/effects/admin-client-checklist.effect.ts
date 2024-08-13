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
import { ClientChecklistActionTypes } from '../actions/admin-client-checklist.action';
import { ClientChecklistService } from '@main/shared/services/admin-panel/admin-client-checklist.service';

@Injectable()
export class ClientChecklistEffect {
  constructor(
    private clientChecklistService: ClientChecklistService,
    private actions$: Actions
  ) {}

  public getClientChecklistList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientChecklistService.getClientChecklistListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveClientChecklist = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientChecklistService.saveClientChecklist(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editClientChecklist = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientChecklistService.editClientChecklist(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteClientChecklist = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.clientChecklistService.deleteClientChecklist(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

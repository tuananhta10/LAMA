import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  takeUntil,
  switchMap,
} from 'rxjs/operators';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';
import { State } from '@ngrx/store'

// import enum action types
import { ClientCareworkerActionTypes } from '../actions/admin-client-careworker.action';
import { AdminProfileState } from '..'; // Get initial state
import { ClientService } from '@app-services/admin-panel/admin-client.service';

@Injectable()
export class ClientCareworkerEffect {
  constructor(
    private clientService: ClientService,
    private actions$: Actions
  ) {}

  public getClientCareworker = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.getClientData(data.payload)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: data.payload.key,
                result: result
              }
              return {
                type: ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveClientCareworker = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.saveClient(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editClientCareworker = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.editClient(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

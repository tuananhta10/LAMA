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
import { ClientDocActionTypes } from '../actions/admin-client-doc.action';
import { ClientDocService } from '@main/shared/services/admin-panel/admin-client-doc.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '@main/shared/services/admin-panel/admin-client.service';
import { ClientActionTypes } from '../actions/admin-client.action';

@Injectable()
export class ClientDocEffect {
  constructor(
    private clientDocService: ClientDocService,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private actions$: Actions
  ) {}

  public getClientDocList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientDocActionTypes.GET_CLIENT_DOC_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientDocService.getClientDocListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientDocActionTypes.GET_CLIENT_DOC_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientDocActionTypes.GET_CLIENT_DOC_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }), 
    ),
  )

  public saveClientDoc = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientDocActionTypes.SAVE_CLIENT_DOC),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientDocService.saveClientDoc(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added a new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: ClientDocActionTypes.SAVE_CLIENT_DOC_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientDocActionTypes.SAVE_CLIENT_DOC_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        let obj = {
          type: 'profile-client-detail',
          id: data.payload?.data[0]?.client_id,
          key: 'profileClientDetail'
        }

        return this.clientService.getClientData(obj)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: `profileClientDetails`,
                result: result
              }

              return {
                type: ClientActionTypes.GET_CLIENT_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.GET_CLIENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editClientDoc = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientDocActionTypes.EDIT_CLIENT_DOC),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientDocService.editClientDoc(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully updated the record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: ClientDocActionTypes.EDIT_CLIENT_DOC_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientDocActionTypes.EDIT_CLIENT_DOC_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data: any) => {
        let obj = {
          type: 'profile-client-detail',
          id: data.payload?.data[0]?.client_id,
          key: 'profileClientDetail'
        }

        return this.clientService.getClientData(obj)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: `profileClientDetails`,
                result: result
              }

              return {
                type: ClientActionTypes.GET_CLIENT_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.GET_CLIENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteClientDoc = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientDocActionTypes.DELETE_CLIENT_DOC),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientDocService.deleteClientDoc(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully deleted record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: ClientDocActionTypes.DELETE_CLIENT_DOC_SUCCESS,
                payload: result,
                client_id: data?.client_id
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientDocActionTypes.DELETE_CLIENT_DOC_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data: any) => {
        let obj = {
          type: 'profile-client-detail',
          id: data?.client_id,
          key: 'profileClientDetail'
        }

        return this.clientService.getClientData(obj)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: `profileClientDetails`,
                result: result
              }

              return {
                type: ClientActionTypes.GET_CLIENT_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.GET_CLIENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

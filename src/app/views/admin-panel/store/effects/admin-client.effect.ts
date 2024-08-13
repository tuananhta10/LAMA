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
import { ClientActionTypes } from '../actions/admin-client.action';
import { AdminProfileState } from '..'; // Get initial state
import { ClientService } from '@app-services/admin-panel/admin-client.service';
import { AdminChangePasswordsService } from '@main/shared/services/admin-panel/admin-change-passwords.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ClientEffect {
  constructor(
    private clientService: ClientService,
    private adminChangePasswordsService: AdminChangePasswordsService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getClient = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.GET_CLIENT),
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

  public saveClient = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.SAVE_CLIENT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.saveClient(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientActionTypes.SAVE_CLIENT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.SAVE_CLIENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveClientDraft = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.SAVE_DRAFT_CLIENT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.saveClient(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientActionTypes.SAVE_DRAFT_CLIENT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.SAVE_DRAFT_CLIENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editClient = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.EDIT_CLIENT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.editClient(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientActionTypes.EDIT_CLIENT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.EDIT_CLIENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editPassword = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.EDIT_CLIENT_PASSWORD),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.adminChangePasswordsService.updateClientPassword(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientActionTypes.EDIT_CLIENT_PASSWORD_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.EDIT_CLIENT_PASSWORD_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getClientStats = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.GET_CLIENT_STATS),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.getClientStats(data.payload)
          .pipe(
            // return payload
            map((result: any) => {
              let retData = {
                key: data.payload.key,
                result: result
              }

              return {
                type: ClientActionTypes.GET_CLIENT_STATS_SUCCESS,
                payload: retData
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.GET_CLIENT_STATS_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveClientEmergencyContact = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.createClientEmergencyContact(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open(`Successfully added participant's emergency contact`, "", {
                duration: 7000,
                panelClass:'success-snackbar'
              });

              return {
                type: ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editClientEmergencyContact = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.updateClientEmergencyContact(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open(`Successfully updated participant's emergency contact`, "", {
                duration: 7000,
                panelClass:'success-snackbar'
              });

              return {
                type: ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteClientEmergencyContact = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientService.deleteClientEmergencyContact(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open(`Successfully deleted participant's emergency contact`, "", {
                duration: 7000,
                panelClass:'success-snackbar'
              });

              return {
                type: ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

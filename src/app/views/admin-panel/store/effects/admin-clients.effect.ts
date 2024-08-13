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
import { MatSnackBar } from '@angular/material/snack-bar';
// import enum action types
import { ClientListActionTypes } from '../actions/admin-clients.action';
import { AdminProfileState } from '..'; // Get initial state
import { ClientListService } from '@app-services/admin-panel/client-list.service';

@Injectable()
export class ClientListEffect {
  constructor(
    private clientListService: ClientListService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getClientList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientListActionTypes.GET_CLIENT_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        let apiService  = this.clientListService.getClientListData(data?.payload || undefined);

        if(data?.from){
          apiService = this.clientListService.getClientsWithFunding();
        }

        return apiService.pipe(
            // return payload
            map((result: any) => {
              console.log("SUCCESS", data)

              return {
                type: ClientListActionTypes.GET_CLIENT_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientListActionTypes.GET_CLIENT_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  );

  public deleteClient = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientListActionTypes.DELETE_CLIENT_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientListService.deleteClientData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              console.log("SUCCESS")

              return {
                type: ClientListActionTypes.DELETE_CLIENT_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientListActionTypes.DELETE_CLIENT_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  );

  public getClientLiveFeed = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientListActionTypes.GET_CLIENT_LIVE_FEED),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.clientListService.getClientFeedData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientListActionTypes.GET_CLIENT_LIVE_FEED_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientListActionTypes.GET_CLIENT_LIVE_FEED_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  );

  public uploadClient = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(ClientListActionTypes.UPLOAD_CLIENT),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.clientListService.uploadClient(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            this.snackBar.open("Successfully uploaded Participants Record", "", {
              duration: 7000,
              panelClass:'success-snackbar'
            });
            
            return {
              type: ClientListActionTypes.UPLOAD_CLIENT_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) => 
            {
              this.snackBar.open("There's seems to be a problem with your file. We can't read the data format properly. Please check the file for inconsistency.", "", {
                duration: 7000,
                panelClass:'danger-snackbar'
              });

              return of({
                type: ClientListActionTypes.UPLOAD_CLIENT_FAIL,
                payload: error,
              })
            },
          ),
        );
    }),
  ),
  )
}

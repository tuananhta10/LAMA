import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
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
import { ClientFundingActionTypes } from '../actions/admin-client-funding.action';
import { ClientFundingService } from '@main/shared/services/admin-panel/admin-client-funding.service';

@Injectable()
export class ClientFundingEffect {
  constructor(
    private employeePositionService: ClientFundingService,
    private actions$: Actions
  ) {}

  public getClientFunding = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientFundingActionTypes.GET_CLIENT_FUNDING),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getClientFundingDetails(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientFundingActionTypes.GET_CLIENT_FUNDING_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientFundingActionTypes.GET_CLIENT_FUNDING_FAIL,
                payload: error,
              }),
            ),
          );
      }), 
    ),
  )


  public getClientFundingList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getClientFundingListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }), 
    ),
  )

  public getClientByFundingItem = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getClientByFundingItem(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM_FAIL,
                payload: error,
              }),
            ),
          );
      }), 
    ),
  )

  public saveClientFunding = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientFundingActionTypes.SAVE_CLIENT_FUNDING),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveClientFunding(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientFundingActionTypes.SAVE_CLIENT_FUNDING_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editClientFunding = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientFundingActionTypes.EDIT_CLIENT_FUNDING),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editClientFunding(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientFundingActionTypes.EDIT_CLIENT_FUNDING_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientFundingActionTypes.EDIT_CLIENT_FUNDING_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteClientFunding = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientFundingActionTypes.DELETE_CLIENT_FUNDING),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.deleteClientFunding(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientFundingActionTypes.DELETE_CLIENT_FUNDING_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientFundingActionTypes.DELETE_CLIENT_FUNDING_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public uploadClient = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeePositionService.uploadClientFunding(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
  )
}

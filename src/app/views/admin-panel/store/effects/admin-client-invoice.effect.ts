import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  concatMap
} from 'rxjs/operators';

import {
  Actions,
  ofType,
  Effect,
  createEffect
} from '@ngrx/effects';

// import enum action types
import { ClientInvoiceActionTypes } from '../actions/admin-client-invoice.action';
import { ClientInvoiceService } from '@main/shared/services/admin-panel/admin-client-invoice.service';
import { InvoiceBatchActionTypes } from '../actions/admin-invoice-batch.action';

@Injectable()
export class ClientInvoiceEffect {
  constructor(
    private clientInvoiceService: ClientInvoiceService,
    private actions$: Actions
  ) {}

  public getClientInvoiceItems = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientInvoiceActionTypes.GET_CLIENT_INVOICE),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientInvoiceService.getInvoiceItems(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getClientInvoiceReferrence = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientInvoiceService.getInvoiceReferrence(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getClientInvoiceList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.clientInvoiceService.getClientInvoiceListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveClientInvoice = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientInvoiceService.saveClientInvoice(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editClientInvoice = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientInvoiceService.editClientInvoice(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteClientInvoice = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.clientInvoiceService.deleteClientInvoice(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE_SUCCESS,
                payload: result
              };
            }),
            concatMap(() => [
              {
                type: InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST,
              },
            ]),
            
            catchError((error: any) =>
              // error handler
              of({
                type: ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

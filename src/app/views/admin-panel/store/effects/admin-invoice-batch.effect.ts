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
import { InvoiceBatchActionTypes } from '../actions/admin-invoice-batch.action';
import { InvoiceBatchService } from '@main/shared/services/admin-panel/admin-invoice-batch.service';

@Injectable()
export class InvoiceBatchEffect {
  constructor(
    private invoiceBatchService: InvoiceBatchService,
    private actions$: Actions
  ) {}

  public getInvoiceBatchList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.invoiceBatchService.getInvoiceBatchListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveInvoiceBatch = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceBatchActionTypes.SAVE_INVOICE_BATCH),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.invoiceBatchService.saveInvoiceBatch(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceBatchActionTypes.SAVE_INVOICE_BATCH_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceBatchActionTypes.SAVE_INVOICE_BATCH_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editInvoiceBatch = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceBatchActionTypes.EDIT_INVOICE_BATCH),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.invoiceBatchService.editInvoiceBatch(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceBatchActionTypes.EDIT_INVOICE_BATCH_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceBatchActionTypes.EDIT_INVOICE_BATCH_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteInvoiceBatch = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceBatchActionTypes.DELETE_INVOICE_BATCH),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.invoiceBatchService.deleteInvoiceBatch(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceBatchActionTypes.DELETE_INVOICE_BATCH_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceBatchActionTypes.DELETE_INVOICE_BATCH_FAIL,
                payload: error,
              }),
            ),
          );
      })
    ),
  )
}

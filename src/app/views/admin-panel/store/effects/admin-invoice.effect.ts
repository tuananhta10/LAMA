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
import { InvoiceActionTypes } from '../actions/admin-invoice.action';
import { InvoiceService } from '@main/shared/services/admin-panel/admin-invoice.service';

@Injectable()
export class InvoiceEffect {
  constructor(
    private invoiceService: InvoiceService,
    private actions$: Actions
  ) { }

  public getInvoiceItems = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceActionTypes.GET_INVOICE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.invoiceService.getInvoiceItems(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceActionTypes.GET_INVOICE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceActionTypes.GET_INVOICE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getInvoiceList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceActionTypes.GET_INVOICE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.invoiceService.getInvoiceListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceActionTypes.GET_INVOICE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceActionTypes.GET_INVOICE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveInvoice = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceActionTypes.SAVE_INVOICE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.invoiceService.saveInvoice(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceActionTypes.SAVE_INVOICE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceActionTypes.SAVE_INVOICE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editInvoice = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceActionTypes.EDIT_INVOICE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.invoiceService.editInvoice(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceActionTypes.EDIT_INVOICE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceActionTypes.EDIT_INVOICE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteInvoice = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(InvoiceActionTypes.DELETE_INVOICE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.invoiceService.deleteInvoice(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: InvoiceActionTypes.DELETE_INVOICE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: InvoiceActionTypes.DELETE_INVOICE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

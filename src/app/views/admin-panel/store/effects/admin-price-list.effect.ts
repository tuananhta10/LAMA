import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';

// import enum action types
import { PriceListActionTypes } from '../actions/admin-price-list.action';
import { PriceListService } from '@main/shared/services/admin-panel/admin-price-list.service';

@Injectable()
export class PriceListEffect {
  constructor(
    private priceListService: PriceListService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getPriceListList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PriceListActionTypes.GET_PRICE_LIST_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.priceListService.getPriceListListData(data?.payload || '')
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PriceListActionTypes.GET_PRICE_LIST_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PriceListActionTypes.GET_PRICE_LIST_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public savePriceList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PriceListActionTypes.SAVE_PRICE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.priceListService.savePriceList(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully Updated pricelist value", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: PriceListActionTypes.SAVE_PRICE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PriceListActionTypes.SAVE_PRICE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data:any) => {
        return this.priceListService.getPriceListListData()
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully Updated pricelist value", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: PriceListActionTypes.GET_PRICE_LIST_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PriceListActionTypes.GET_PRICE_LIST_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editPriceList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PriceListActionTypes.EDIT_PRICE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.priceListService.editPriceList(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: PriceListActionTypes.EDIT_PRICE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PriceListActionTypes.EDIT_PRICE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data:any) => {
        return this.priceListService.getPriceListListData()
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully Updated pricelist value", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: PriceListActionTypes.GET_PRICE_LIST_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PriceListActionTypes.GET_PRICE_LIST_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editPriceListInline = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(PriceListActionTypes.EDIT_PRICE_LIST_INLINE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.priceListService.editPriceList(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully Updated pricelist value", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: PriceListActionTypes.EDIT_PRICE_LIST_INLINE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PriceListActionTypes.EDIT_PRICE_LIST_INLINE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      /*mergeMap((data:any) => {
        return this.priceListService.getPriceListListData()
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully Updated pricelist value", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: PriceListActionTypes.GET_PRICE_LIST_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: PriceListActionTypes.GET_PRICE_LIST_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),*/
    ),
  )

  public uploadPriceList = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(PriceListActionTypes.UPLOAD_PRICE_LIST),
    // switch to a new observable and cancel previous subscription
    switchMap((data:any) => {
      console.log(data)
      return this.priceListService.uploadPriceList(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: PriceListActionTypes.UPLOAD_PRICE_LIST_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: PriceListActionTypes.UPLOAD_PRICE_LIST_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

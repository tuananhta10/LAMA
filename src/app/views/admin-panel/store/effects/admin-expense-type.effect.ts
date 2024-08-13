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
import { ExpenseTypeActionTypes } from '../actions/admin-expense-type.action';
import { ExpenseTypeService } from '@main/shared/services/admin-panel/admin-expense-type.service';

@Injectable()
export class ExpenseTypeEffect {
  constructor(
    private expenseTypeService: ExpenseTypeService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getExpenseTypeList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.expenseTypeService.getExpenseTypeListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveExpenseType = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.expenseTypeService.saveExpenseType(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });

              return {
                type: ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
      mergeMap((data:any) => {
        return this.expenseTypeService.getExpenseTypeListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editExpenseType = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.expenseTypeService.editExpenseType(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

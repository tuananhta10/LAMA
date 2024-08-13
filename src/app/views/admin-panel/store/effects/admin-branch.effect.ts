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
import { BranchActionTypes } from '../actions/admin-branch.action';
import { BranchService } from '@main/shared/services/admin-panel/admin-branch.service';

@Injectable()
export class BranchEffect {
  constructor(
    private employeePositionService: BranchService,
    private actions$: Actions
  ) {}

  public getBranchList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(BranchActionTypes.GET_BRANCH_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getBranchListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: BranchActionTypes.GET_BRANCH_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: BranchActionTypes.GET_BRANCH_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getBranch = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(BranchActionTypes.GET_BRANCH),
    // switch to a new observable and cancel previous subscription
    switchMap((data:any) => {
      return this.employeePositionService.getBranchData(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: BranchActionTypes.GET_BRANCH_SUCCESS,
              payload: result[0]
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: BranchActionTypes.GET_BRANCH_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)

  public saveBranch = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(BranchActionTypes.SAVE_BRANCH),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveBranch(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: BranchActionTypes.SAVE_BRANCH_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: BranchActionTypes.SAVE_BRANCH_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editBranch = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(BranchActionTypes.EDIT_BRANCH),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editBranch(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: BranchActionTypes.EDIT_BRANCH_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: BranchActionTypes.EDIT_BRANCH_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteBranch = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(BranchActionTypes.DELETE_BRANCH),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeePositionService.deleteBranch(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: BranchActionTypes.DELETE_BRANCH_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: BranchActionTypes.DELETE_BRANCH_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}

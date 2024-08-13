import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap
} from 'rxjs/operators';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';

// import enum action types
import { TimesheetApprovalActionTypes } from '../actions/admin-timesheet-approval.action';
import { TimesheetApprovalService } from '@main/shared/services/admin-panel/admin-timesheet-approval.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TimesheetApprovalEffect {
  constructor(
    private timesheetApprovalService: TimesheetApprovalService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  public getTimesheetApprovalList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.timesheetApprovalService.getTimesheetApprovalListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveTimesheetApproval = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.timesheetApprovalService.saveTimesheetApproval(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully added new record", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        return this.timesheetApprovalService.getTimesheetApprovalListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editTimesheetApproval = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.timesheetApprovalService.editTimesheetApproval(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public approveDeclineTimesheet = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.timesheetApprovalService.saveTimesheetApproval(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              this.snackBar.open("Successfully Approve/Declined Timesheet", "", {
                duration: 4000,
                panelClass:'success-snackbar'
              });
              
              return {
                type: TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      mergeMap((data: any) => {
        return this.timesheetApprovalService.getTimesheetApprovalListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public getApprovedTimesheet = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.timesheetApprovalService.getApprovedTimesheets(data.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public generateClaim = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(TimesheetApprovalActionTypes.GENERATE_CLAIM),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.timesheetApprovalService.generateClaim(data.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: TimesheetApprovalActionTypes.GENERATE_CLAIM_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.GENERATE_CLAIM_FAIL,
                payload: error,
              }),
            ),
          );
      }),

      /*mergeMap((data: any) => {
        return this.timesheetApprovalService.getTimesheetApprovalListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),*/
    ),
  )
}

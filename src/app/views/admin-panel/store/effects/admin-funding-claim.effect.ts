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
import { FundingClaimActionTypes } from '../actions/admin-funding-claim.action';
import { FundingClaimService } from '@main/shared/services/admin-panel/admin-funding-claim.service';

@Injectable()
export class FundingClaimEffect {
  constructor(
    private fundingClaimService: FundingClaimService,
    private actions$: Actions
  ) {}

  public getFundingClaimList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.fundingClaimService.getFundingClaimListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveFundingClaim = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FundingClaimActionTypes.SAVE_FUNDING_CLAIM),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.fundingClaimService.saveFundingClaim(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FundingClaimActionTypes.SAVE_FUNDING_CLAIM_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingClaimActionTypes.SAVE_FUNDING_CLAIM_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editFundingClaim = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FundingClaimActionTypes.EDIT_FUNDING_CLAIM),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.fundingClaimService.editFundingClaim(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FundingClaimActionTypes.EDIT_FUNDING_CLAIM_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingClaimActionTypes.EDIT_FUNDING_CLAIM_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteFundingClaim = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FundingClaimActionTypes.DELETE_FUNDING_CLAIM),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.fundingClaimService.deleteFundingClaim(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FundingClaimActionTypes.DELETE_FUNDING_CLAIM_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FundingClaimActionTypes.DELETE_FUNDING_CLAIM_FAIL,
                payload: error,
              }),
            ),
          );
      })
    ),
  )
}

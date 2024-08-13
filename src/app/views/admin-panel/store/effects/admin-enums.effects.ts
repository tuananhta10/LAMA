import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  takeUntil,
  switchMap,
} from 'rxjs/operators';

import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import { State } from '@ngrx/store';

// import enum action types
import { AdminEnumsActionTypes } from '../actions/admin-enums.actions';
import { AdminProfileState } from '..'; // Get initial state
import { AdminEnumsService } from '@main/shared/services/admin-panel/admin-enums.service';

@Injectable()
export class AdminEnumsEffect {
  constructor(
    private adminEnumService: AdminEnumsService,
    private actions$: Actions
  ) {}

  public getBranches = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_BRANCHES),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getBranchesData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_BRANCHES_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_BRANCHES_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getCountries = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_COUNTRIES),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getCountriesData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_COUNTRIES_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_COUNTRIES_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getReligions = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_RELIGIONS),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.geReligionsData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_RELIGIONS_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_RELIGIONS_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getLanguages = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_LANGUAGES),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getLanguagesData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_LANGUAGES_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_LANGUAGES_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getPrograms = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_PROGRAMS),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getProgramsData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_PROGRAMS_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_PROGRAMS_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getClassifications = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_CLASSIFICATIONS),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getClassificationsData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_CLASSIFICATIONS_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_CLASSIFICATIONS_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getManagers = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_MANAGERS),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getManagersData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_MANAGERS_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_MANAGERS_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getPositions = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_POSITIONS),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getPositionsData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_POSITIONS_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_POSITIONS_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getEmploymentTypes = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getEmploymentTypesData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getPriceLists = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminEnumsActionTypes.GET_PRICE_LISTS),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminEnumService.getPriceListsData().pipe(
          // return payload
          map((result: any) => {
            

            return {
              type: AdminEnumsActionTypes.GET_PRICE_LISTS_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: AdminEnumsActionTypes.GET_PRICE_LISTS_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );
}

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
import { LanguageActionTypes } from '../actions/admin-language.action';
import { LanguageService } from '@main/shared/services/admin-panel/admin-language.service';

@Injectable()
export class LanguageEffect {
  constructor(
    private languageService: LanguageService,
    private actions$: Actions
  ) { }

  public getLanguageList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(LanguageActionTypes.GET_LANGUAGE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.languageService.getLanguageListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: LanguageActionTypes.GET_LANGUAGE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: LanguageActionTypes.GET_LANGUAGE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveLanguage = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(LanguageActionTypes.SAVE_LANGUAGE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.languageService.saveLanguage(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: LanguageActionTypes.SAVE_LANGUAGE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: LanguageActionTypes.SAVE_LANGUAGE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editLanguage = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(LanguageActionTypes.EDIT_LANGUAGE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.languageService.editLanguage(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: LanguageActionTypes.EDIT_LANGUAGE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: LanguageActionTypes.EDIT_LANGUAGE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteLanguage = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(LanguageActionTypes.DELETE_LANGUAGE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.languageService.deleteLanguage(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: LanguageActionTypes.DELETE_LANGUAGE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: LanguageActionTypes.DELETE_LANGUAGE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

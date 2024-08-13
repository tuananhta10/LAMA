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
import { FormTemplateActionTypes } from '../actions/admin-form-template.action';
import { FormTemplateService } from '@main/shared/services/admin-panel/admin-form-template.service';

@Injectable()
export class FormTemplateEffect {
  constructor(
    private employeePositionService: FormTemplateService,
    private actions$: Actions
  ) {}

  public getFormTemplateList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getFormTemplateListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveFormTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FormTemplateActionTypes.SAVE_FORM_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveFormTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FormTemplateActionTypes.SAVE_FORM_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FormTemplateActionTypes.SAVE_FORM_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editFormTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FormTemplateActionTypes.EDIT_FORM_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editFormTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FormTemplateActionTypes.EDIT_FORM_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FormTemplateActionTypes.EDIT_FORM_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteFormTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(FormTemplateActionTypes.DELETE_FORM_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.deleteFormTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: FormTemplateActionTypes.DELETE_FORM_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: FormTemplateActionTypes.DELETE_FORM_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

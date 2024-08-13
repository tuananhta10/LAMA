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
import { CommunicationTemplateActionTypes } from '../actions/admin-communication-template.action';
import { AdminCommunicationTemplateService } from '@main/shared/services/admin-panel/admin-communication-template.service';

@Injectable()
export class CommunicationTemplateEffect {
  constructor(
    private communicationTemplateService: AdminCommunicationTemplateService,
    private actions$: Actions
  ) {}

  public getCommunicationTemplateList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.communicationTemplateService.getCommunicationTemplateListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveCommunicationTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.communicationTemplateService.saveCommunicationTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editCommunicationTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.communicationTemplateService.editCommunicationTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteCommunicationTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.communicationTemplateService.deleteCommunicationTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

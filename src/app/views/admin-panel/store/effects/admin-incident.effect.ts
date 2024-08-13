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
import { IncidentActionTypes } from '../actions/admin-incident.action';
import { IncidentService } from '@main/shared/services/admin-panel/admin-incident.service';

@Injectable()
export class IncidentEffect {
  constructor(
    private employeePositionService: IncidentService,
    private actions$: Actions
  ) {}

  public getIncidentList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(IncidentActionTypes.GET_INCIDENT_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getIncidentListData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: IncidentActionTypes.GET_INCIDENT_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: IncidentActionTypes.GET_INCIDENT_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveIncident = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(IncidentActionTypes.SAVE_INCIDENT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveIncident(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: IncidentActionTypes.SAVE_INCIDENT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: IncidentActionTypes.SAVE_INCIDENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editIncident = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(IncidentActionTypes.EDIT_INCIDENT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editIncident(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: IncidentActionTypes.EDIT_INCIDENT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: IncidentActionTypes.EDIT_INCIDENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteIncident = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(IncidentActionTypes.DELETE_INCIDENT),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.employeePositionService.deleteIncident(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: IncidentActionTypes.DELETE_INCIDENT_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: IncidentActionTypes.DELETE_INCIDENT_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ))

  public uploadIncident = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(IncidentActionTypes.UPLOAD_INCIDENT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.uploadIncident(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: IncidentActionTypes.UPLOAD_INCIDENT_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: IncidentActionTypes.UPLOAD_INCIDENT_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

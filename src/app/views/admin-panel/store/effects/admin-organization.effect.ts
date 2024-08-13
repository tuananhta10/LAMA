import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';

// import enum action types
import { OrganizationActionTypes } from '../actions/admin-organization.action';
import { OrganizationService } from '@main/shared/services/admin-panel/admin-organization.service';

@Injectable()
export class OrganizationEffect {
  constructor(
    private organizationService: OrganizationService,
    private actions$: Actions
  ) {}

  public getOrganizationList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(OrganizationActionTypes.GET_ORGANIZATION_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.organizationService.getOrganizationListData().pipe(
          // return payload
          map((result: any) => {
            return {
              type: OrganizationActionTypes.GET_ORGANIZATION_LIST_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: OrganizationActionTypes.GET_ORGANIZATION_LIST_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getOrganization = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(OrganizationActionTypes.GET_ORGANIZATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.organizationService
          .getOrganizationData(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: OrganizationActionTypes.GET_ORGANIZATION_SUCCESS,
                payload: result[0],
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: OrganizationActionTypes.GET_ORGANIZATION_FAIL,
                payload: error,
              })
            )
          );
      })
    )
  );

  public saveOrganization = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(OrganizationActionTypes.SAVE_ORGANIZATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.organizationService
          .saveOrganization(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: OrganizationActionTypes.SAVE_ORGANIZATION_SUCCESS,
                payload: result,
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: OrganizationActionTypes.SAVE_ORGANIZATION_FAIL,
                payload: error,
              })
            )
          );
      })
    )
  );

  public editOrganization = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(OrganizationActionTypes.EDIT_ORGANIZATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.organizationService
          .editOrganization(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: OrganizationActionTypes.EDIT_ORGANIZATION_SUCCESS,
                payload: result,
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: OrganizationActionTypes.EDIT_ORGANIZATION_FAIL,
                payload: error,
              })
            )
          );
      })
    )
  );

  public deleteOrganization = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(OrganizationActionTypes.DELETE_ORGANIZATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.organizationService
          .deleteOrganization(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: OrganizationActionTypes.DELETE_ORGANIZATION_SUCCESS,
                payload: result,
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: OrganizationActionTypes.DELETE_ORGANIZATION_FAIL,
                payload: error,
              })
            )
          );
      })
    )
  );
}

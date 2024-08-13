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
import { NotificationActionTypes } from '../actions/admin-notification.action';
import { NotificationService } from '@main/shared/services/admin-panel/admin-notification.service';

@Injectable()
export class NotificationEffect {
  constructor(
    private notificationService: NotificationService,
    private actions$: Actions
  ) { }

  public getNotificationList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(NotificationActionTypes.GET_NOTIFICATION_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.notificationService.getNotificationListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: NotificationActionTypes.GET_NOTIFICATION_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: NotificationActionTypes.GET_NOTIFICATION_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveNotification = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(NotificationActionTypes.SAVE_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.notificationService.saveNotification(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: NotificationActionTypes.SAVE_NOTIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: NotificationActionTypes.SAVE_NOTIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editNotification = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(NotificationActionTypes.EDIT_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.notificationService.editNotification(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: NotificationActionTypes.EDIT_NOTIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: NotificationActionTypes.EDIT_NOTIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteNotification = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(NotificationActionTypes.DELETE_NOTIFICATION),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.notificationService.deleteNotification(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: NotificationActionTypes.DELETE_NOTIFICATION_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: NotificationActionTypes.DELETE_NOTIFICATION_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

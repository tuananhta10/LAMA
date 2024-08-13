import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  takeUntil,
  switchMap,
} from 'rxjs/operators';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';
import { State } from '@ngrx/store'

// import enum action types
import { AdminProfileActionTypes } from '../actions/admin-profile.action';
import { AdminProfileState } from '..'; // Get initial state
import { AdminService } from '@app-services/admin-panel/admin.service';

@Injectable()
export class AdminProfileEffect {
  constructor(
    private adminService: AdminService,
    private actions$: Actions
  ) {}

  public getAdminProfile = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(AdminProfileActionTypes.GET_ADMIN_PROFILE),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.adminService.getAdminProfile()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: AdminProfileActionTypes.GET_ADMIN_PROFILE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: AdminProfileActionTypes.GET_ADMIN_PROFILE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

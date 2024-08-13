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
import { ClientManagerActionTypes } from '../actions/client-manager.actions';
import { ClientManagerState } from '..'; // Get initial state
import { ClientListService } from '@app-services/admin-panel/client-list.service';

@Injectable()
export class ClientManagerEffect {
  constructor(
    private clientService: ClientListService,
    private actions$: Actions
  ) {}

  public getClientManagerList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(ClientManagerActionTypes.GET_CLIENTS_MANAGER),
      // switch to a new observable and cancel previous subscription
      switchMap(() => {
        return this.clientService.getClientListData()
          .pipe(
            // return payload
            map((result: any) => {
              console.log("SUCCESS")

              return {
                type: ClientManagerActionTypes.GET_CLIENTS_MANAGER_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: ClientManagerActionTypes.GET_CLIENTS_MANAGER_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}

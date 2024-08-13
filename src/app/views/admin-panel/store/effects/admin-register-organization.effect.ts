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
import { RegisterOrganizationActionTypes } from '../actions/admin-register-organization.action';
import { AdminProfileState } from '..'; // Get initial state
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service';

@Injectable()
export class RegisterOrganizationEffect {
  constructor(
    
    private loginService: LoginAuthenticationService,
    private actions$: Actions
  ) {}

//   public saveRegisterOrganization = createEffect(() =>
//     this.actions$.pipe(
//       // set type
//       ofType(RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION),
//       // switch to a new observable and cancel previous subscription
//       switchMap((data: any) => {
//         return this.loginService.saveAdminOnboarding(data?.payload)
//           .pipe(
//             // return payload
//             map((result: any) => {
//               return {
//                 type: RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION_SUCCESS,
//                 payload: result
//               };
//             }),
//             catchError((error: any) =>
//               // error handler
//               of({
//                 type: RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION_FAIL,
//                 payload: error,
//               }),
//             ),
//           );
//       }),
//     ),
//   )
}

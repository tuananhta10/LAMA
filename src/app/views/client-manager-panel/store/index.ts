// THIS FILE IS FOR MAPPING REDUCER AND ACTION

import * as clientReducer from './reducers/client-manager.reducers';
import { ActionReducerMap } from '@ngrx/store';

// generate app state interface
export interface ClientManagerState {
  clientManager: clientReducer.ClientManagerState

};

// set initial state
export const INITIAL_STATE: ClientManagerState = {
  clientManager: clientReducer.CLIENT_MANAGER_INITIAL_STATE,
}

// create action reducer map
// add appstate type any
/*export const appReducer: ActionReducerMap<AdminProfileState, any> = {
	adminProfile: reducers.AdminProfileReducer,
  clientList: adminClientReducers.ClientListReducer
};
*/

// Clear state
export function clearState(reducer: any) {
  return function(state: any, action: any) {
    // if (action.type === AuthActionTypes.LOGOUT) {
    //   state = INITIAL_STATE;
    // }

    return reducer(state, action);
  };
}

export const routerStateConfig = {
  stateKey: 'router', // state-slice name for routing state
};
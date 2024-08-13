import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';

import { environment } from '../environments/environment';

export interface AppState {}

export const appReducer: ActionReducerMap<AppState> = {};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        const result = reducer(state, action);
        // console.groupCollapsed(action.type);
        // console.log('prev state', state);
        // console.log('action', action);
        // console.log('next state', result);
        // console.groupEnd();
        return result;
    };
}
  
export const metaReducers: MetaReducer[] = environment.isDebug ?
    // [logger, storeFreeze]
    [logger]
    : [];
import {
    ClientGroupAction,
    ClientGroupActionTypes
  
  } from '../actions/admin-client-group.action';
  
  // Create new interface for reducer
  export interface ClientGroupState {
    clientGroup: any;
    clientGroupList: any;
    clientGroupSchedule: any;
    pending: any;
    error: any;
    success: any;
  }
  
  // Set initial state of the data
  export const CLIENT_GROUP_INITIAL_STATE: ClientGroupState = {
    clientGroup: {},
    clientGroupList: [],
    clientGroupSchedule: {},
    pending: false,
    error: null,
    success: null
  }
  
  
  /*
    Create Reducer
    Take 2 Parameter: from ClientGroup
    @param
      state: value (clientGroup, pending, error)
      action: from action type
  */
  export const ClientGroupReducer = (
    state: ClientGroupState = CLIENT_GROUP_INITIAL_STATE,
    action: ClientGroupAction,
  ): ClientGroupState => {
    switch (action.type) {
  
      case ClientGroupActionTypes.GET_CLIENT_GROUP:
        return { ...state, pending: true };
  
      case ClientGroupActionTypes.GET_CLIENT_GROUP_SUCCESS:
        return { ...state, clientGroup: action.payload, pending: false }
  
      case ClientGroupActionTypes.GET_CLIENT_GROUP_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientGroupActionTypes.GET_CLIENT_GROUP_LIST:
        return { ...state, pending: true };

      case ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE:
        return { ...state, pending: true };
      
      case ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE_SUCCESS:
        return { ...state, clientGroupSchedule: action.payload, pending: false }
      
      case ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE_FAIL:
        return { ...state, pending: false, error: action.payload }
      
      case ClientGroupActionTypes.GET_CLIENT_GROUP_LIST:
        return { ...state, pending: true };
  
      case ClientGroupActionTypes.GET_CLIENT_GROUP_LIST_SUCCESS:
        return { ...state, clientGroupList: action.payload, pending: false }
  
      case ClientGroupActionTypes.GET_CLIENT_GROUP_LIST_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientGroupActionTypes.SAVE_CLIENT_GROUP:
        return { ...state, pending: true };
  
      case ClientGroupActionTypes.SAVE_CLIENT_GROUP_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientGroupActionTypes.SAVE_CLIENT_GROUP_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientGroupActionTypes.EDIT_CLIENT_GROUP:
        return { ...state, pending: true };
  
      case ClientGroupActionTypes.EDIT_CLIENT_GROUP_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientGroupActionTypes.EDIT_CLIENT_GROUP_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientGroupActionTypes.DELETE_CLIENT_GROUP:
        return { ...state, pending: true };
  
      case ClientGroupActionTypes.DELETE_CLIENT_GROUP_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientGroupActionTypes.DELETE_CLIENT_GROUP_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      default:
        return state;
    }
  }
  
  
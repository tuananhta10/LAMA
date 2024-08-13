import {
    ClientDocAction,
    ClientDocActionTypes
  
  } from '../actions/admin-client-doc.action';
  
  // Create new interface for reducer
  export interface ClientDocState {
    clientDoc: any;
    clientDocList: any;
    pending: any;
    error: any;
    success: any;
  }
  
  // Set initial state of the data
  export const CLIENT_DOC_INITIAL_STATE: ClientDocState = {
    clientDoc: {},
    clientDocList: [],
    pending: false,
    error: null,
    success: null
  }
  
  
  /*
    Create Reducer
    Take 2 Parameter: from ClientDoc
    @param
      state: value (clientDoc, pending, error)
      action: from action type
  */
  export const ClientDocReducer = (
    state: ClientDocState = CLIENT_DOC_INITIAL_STATE,
    action: ClientDocAction,
  ): ClientDocState => {
    switch (action.type) {
  
      case ClientDocActionTypes.GET_CLIENT_DOC:
        return { ...state, pending: true };
  
      case ClientDocActionTypes.GET_CLIENT_DOC_SUCCESS:
        return { ...state, clientDoc: action.payload, pending: false }
  
      case ClientDocActionTypes.GET_CLIENT_DOC_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientDocActionTypes.GET_CLIENT_DOC_LIST:
        return { ...state, pending: true };
  
      case ClientDocActionTypes.GET_CLIENT_DOC_LIST_SUCCESS:
        return { ...state, clientDocList: action.payload, pending: false }
  
      case ClientDocActionTypes.GET_CLIENT_DOC_LIST_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientDocActionTypes.SAVE_CLIENT_DOC:
        return { ...state, pending: true };
  
      case ClientDocActionTypes.SAVE_CLIENT_DOC_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientDocActionTypes.SAVE_CLIENT_DOC_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientDocActionTypes.EDIT_CLIENT_DOC:
        return { ...state, pending: true };
  
      case ClientDocActionTypes.EDIT_CLIENT_DOC_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientDocActionTypes.EDIT_CLIENT_DOC_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientDocActionTypes.DELETE_CLIENT_DOC:
        return { ...state, pending: true };
  
      case ClientDocActionTypes.DELETE_CLIENT_DOC_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientDocActionTypes.DELETE_CLIENT_DOC_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      default:
        return state;
    }
  }
  
  
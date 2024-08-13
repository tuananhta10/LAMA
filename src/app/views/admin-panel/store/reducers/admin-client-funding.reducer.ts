import {
    ClientFundingAction,
    ClientFundingActionTypes
  
  } from '../actions/admin-client-funding.action';
  
  // Create new interface for reducer
  export interface ClientFundingState {
    clientFunding: any;
    clientFundingReturn: any;
    clientFundingList: any;
    clientFundingUpload: any;
    clientList: any;
    clientLoading: boolean;
    pending: any;
    pendingDetails: any;
    error: any;
    success: any;
  }
  
  // Set initial state of the data
  export const CLIENT_FUNDING_INITIAL_STATE: ClientFundingState = {
    clientFunding: [],
    clientFundingReturn: null,
    clientFundingList: [],
    clientList: [],
    clientFundingUpload: null,
    clientLoading: false,
    pending: false,
    pendingDetails: false,
    error: null,
    success: null
  }
  
  
  /*
    Create Reducer
    Take 2 Parameter: from ClientFunding
    @param
      state: value (clientFunding, pending, error)
      action: from action type
  */
  export const ClientFundingReducer = (
    state: ClientFundingState = CLIENT_FUNDING_INITIAL_STATE,
    action: ClientFundingAction,
  ): ClientFundingState => {
    switch (action.type) {
  
      case ClientFundingActionTypes.GET_CLIENT_FUNDING:
        return { ...state, pendingDetails: true, clientFunding: null };
  
      case ClientFundingActionTypes.GET_CLIENT_FUNDING_SUCCESS:
        return { ...state, clientFunding: action.payload, pendingDetails: false }
  
      case ClientFundingActionTypes.GET_CLIENT_FUNDING_FAIL:
        return { ...state, pendingDetails: false, error: action.payload }
  
      case ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST:
        return { ...state, pending: true, clientFundingList: [] };
  
      case ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST_SUCCESS:
        return { ...state, clientFundingList: action.payload, pending: false }
  
      case ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST_FAIL:
        return { ...state, pending: false, error: action.payload }

      case ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM:
        return { ...state, clientLoading: true, clientList: [] };
      
      case ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM_SUCCESS:
        return { ...state, clientList: action.payload, clientLoading: false }
      
      case ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM_FAIL:
        return { ...state, clientLoading: false, error: action.payload }
  
      case ClientFundingActionTypes.SAVE_CLIENT_FUNDING:
        return { ...state, pending: true };
  
      case ClientFundingActionTypes.SAVE_CLIENT_FUNDING_SUCCESS:
        return { ...state, success: action.payload.message,clientFundingReturn: action.payload.data, pending: false }
  
      case ClientFundingActionTypes.SAVE_CLIENT_FUNDING_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientFundingActionTypes.EDIT_CLIENT_FUNDING:
        return { ...state, pending: true };
  
      case ClientFundingActionTypes.EDIT_CLIENT_FUNDING_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientFundingActionTypes.EDIT_CLIENT_FUNDING_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientFundingActionTypes.DELETE_CLIENT_FUNDING:
        return { ...state, pending: true };
  
      case ClientFundingActionTypes.DELETE_CLIENT_FUNDING_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientFundingActionTypes.DELETE_CLIENT_FUNDING_FAIL:
        return { ...state, pending: false, error: action.payload }

      case ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING:
        return { ...state, pending: true};
  
      case ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING_SUCCESS:
      return { ...state, pending: false, clientFundingUpload: action.payload }

      case ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING_FAIL:
      return { ...state, pending: false, error: action.payload }
  
      default:
        return state;
    }
  }
  
  
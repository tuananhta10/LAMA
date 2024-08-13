import {
  FundingSourceAction,
  FundingSourceActionTypes

} from '../actions/admin-funding-source.action';

// Create new interface for reducer
export interface FundingSourceState {
  fundingSource: any;
  fundingSourceList: any;
  clientFundingUpload: any;
  pending: any;
  error: any;
  success: any;
}

// Set initial state of the data
export const FUNDING_SOURCE_INITIAL_STATE: FundingSourceState = {
  fundingSource: {},
  fundingSourceList: [],
  clientFundingUpload: null,
  pending: false,
  error: null,
  success: null
}


/*
  Create Reducer
  Take 2 Parameter: from FundingSource
  @param
    state: value (fundingSource, pending, error)
    action: from action type
*/
export const FundingSourceReducer = (
  state: FundingSourceState = FUNDING_SOURCE_INITIAL_STATE,
  action: FundingSourceAction,
): FundingSourceState => {
  switch (action.type) {

    case FundingSourceActionTypes.GET_FUNDING_SOURCE:
      return { ...state, pending: true };

    case FundingSourceActionTypes.GET_FUNDING_SOURCE_SUCCESS:
      return { ...state, fundingSource: action.payload, pending: false }

    case FundingSourceActionTypes.GET_FUNDING_SOURCE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST:
      return { ...state, pending: true, fundingSourceList: [] };

    case FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST_SUCCESS:
      return { ...state, fundingSourceList: action.payload, pending: false }

    case FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST_FAIL:
      return { ...state, pending: false, error: action.payload }

    case FundingSourceActionTypes.SAVE_FUNDING_SOURCE:
      return { ...state, pending: true };

    case FundingSourceActionTypes.SAVE_FUNDING_SOURCE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case FundingSourceActionTypes.SAVE_FUNDING_SOURCE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case FundingSourceActionTypes.EDIT_FUNDING_SOURCE:
      return { ...state, pending: true };

    case FundingSourceActionTypes.EDIT_FUNDING_SOURCE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case FundingSourceActionTypes.EDIT_FUNDING_SOURCE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case FundingSourceActionTypes.DELETE_FUNDING_SOURCE:
      return { ...state, pending: true };

    case FundingSourceActionTypes.DELETE_FUNDING_SOURCE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case FundingSourceActionTypes.DELETE_FUNDING_SOURCE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING:
      return { ...state, pending: true};
    
    case FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING_SUCCESS:
    return { ...state, pending: false, success: action.payload.message }

    case FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING_FAIL:
    return { ...state, pending: false, error: action.payload }

    default:
      return state;
  }
}


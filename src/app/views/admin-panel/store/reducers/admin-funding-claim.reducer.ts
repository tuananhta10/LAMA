import {
    FundingClaimAction,
    FundingClaimActionTypes
  
  } from '../actions/admin-funding-claim.action';
  
  // Create new interface for reducer
  export interface FundingClaimState {
    fundingClaim: any;
    fundingClaimList: any;
    pending: any;
    error: any;
    success: any;
  }
  
  // Set initial state of the data
  export const FUNDING_CLAIM_INITIAL_STATE: FundingClaimState = {
    fundingClaim: {},
    fundingClaimList: [],
    pending: false,
    error: null,
    success: null
  }
  
  
  /*
    Create Reducer
    Take 2 Parameter: from FundingClaim
    @param
      state: value (fundingClaim, pending, error)
      action: from action type
  */
  export const FundingClaimReducer = (
    state: FundingClaimState = FUNDING_CLAIM_INITIAL_STATE,
    action: FundingClaimAction,
  ): FundingClaimState => {
    switch (action.type) {
  
      case FundingClaimActionTypes.GET_FUNDING_CLAIM:
        return { ...state, pending: true };
  
      case FundingClaimActionTypes.GET_FUNDING_CLAIM_SUCCESS:
        return { ...state, fundingClaim: action.payload, pending: false }
  
      case FundingClaimActionTypes.GET_FUNDING_CLAIM_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST:
        return { ...state, pending: true };
  
      case FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST_SUCCESS:
        return { ...state, fundingClaimList: action.payload, pending: false }
  
      case FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case FundingClaimActionTypes.SAVE_FUNDING_CLAIM:
        return { ...state, pending: true };
  
      case FundingClaimActionTypes.SAVE_FUNDING_CLAIM_SUCCESS:
        return { ...state, success: action.payload?.message, pending: false }
  
      case FundingClaimActionTypes.SAVE_FUNDING_CLAIM_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case FundingClaimActionTypes.EDIT_FUNDING_CLAIM:
        return { ...state, pending: true };
  
      case FundingClaimActionTypes.EDIT_FUNDING_CLAIM_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case FundingClaimActionTypes.EDIT_FUNDING_CLAIM_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case FundingClaimActionTypes.DELETE_FUNDING_CLAIM:
        return { ...state, pending: true };
  
      case FundingClaimActionTypes.DELETE_FUNDING_CLAIM_SUCCESS:
        return { ...state, success: action?.payload?.message, pending: false }
  
      case FundingClaimActionTypes.DELETE_FUNDING_CLAIM_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      default:
        return state;
    }
  }
  
  
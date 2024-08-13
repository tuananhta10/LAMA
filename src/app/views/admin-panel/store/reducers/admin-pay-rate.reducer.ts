import {
  PayRateAction,
  PayRateActionTypes

} from '../actions/admin-pay-rate.action';

// Create new interface for reducer
export interface PayRateState {
  payRate: any;
  payRateList: any;
  pending: any;
  error: any;
  success: any;
}

// Set initial state of the data
export const PAY_RATE_INITIAL_STATE: PayRateState = {
  payRate: {},
  payRateList: [],
  pending: false,
  error: null,
  success: null
}


/*
  Create Reducer
  Take 2 Parameter: from PayRate
  @param
    state: value (payRate, pending, error)
    action: from action type
*/
export const PayRateReducer = (
  state: PayRateState = PAY_RATE_INITIAL_STATE,
  action: PayRateAction,
): PayRateState => {
  switch (action.type) {

    case PayRateActionTypes.GET_PAY_RATE:
      return { ...state, pending: true };

    case PayRateActionTypes.GET_PAY_RATE_SUCCESS:
      return { ...state, payRate: action.payload, pending: false }

    case PayRateActionTypes.GET_PAY_RATE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case PayRateActionTypes.GET_PAY_RATE_LIST:
      return { ...state, pending: true };

    case PayRateActionTypes.GET_PAY_RATE_LIST_SUCCESS:
      return { ...state, payRateList: action.payload, pending: false }

    case PayRateActionTypes.GET_PAY_RATE_LIST_FAIL:
      return { ...state, pending: false, error: action.payload }

    case PayRateActionTypes.SAVE_PAY_RATE:
      return { ...state, pending: true };

    case PayRateActionTypes.SAVE_PAY_RATE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case PayRateActionTypes.SAVE_PAY_RATE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case PayRateActionTypes.EDIT_PAY_RATE:
      return { ...state, pending: true };

    case PayRateActionTypes.EDIT_PAY_RATE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case PayRateActionTypes.EDIT_PAY_RATE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case PayRateActionTypes.DELETE_PAY_RATE:
      return { ...state, pending: true };

    case PayRateActionTypes.DELETE_PAY_RATE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case PayRateActionTypes.DELETE_PAY_RATE_FAIL:
      return { ...state, pending: false, error: action.payload }

    default:
      return state;
  }
}


import {
  EmployeePayRateLoadingAction,
  EmployeePayRateLoadingActionTypes
} from '../actions/admin-employee-pay-rate-loading.action';

// Create new interface for reducer
export interface EmployeePayRateLoadingState {
  employeePayRateLoading: any;
  employeePayRateLoadingList: any;
  employeePayRateLoadingUpload: any;
  pending: any;
  error: any;
  success: any;
}

// Set initial state of the data
export const EMPLOYEE_PAY_RATE_LOADING_INITIAL_STATE: EmployeePayRateLoadingState = {
  employeePayRateLoading: {},
  employeePayRateLoadingList: [],
  employeePayRateLoadingUpload: null,
  pending: false,
  error: null,
  success: null
}


/*
  Create Reducer
  Take 2 Parameter: from EmployeePayRateLoading
  @param
    state: value (employeePayRateLoading, pending, error)
    action: from action type
*/
export const EmployeePayRateLoadingReducer = (
  state: EmployeePayRateLoadingState = EMPLOYEE_PAY_RATE_LOADING_INITIAL_STATE,
  action: EmployeePayRateLoadingAction,
): EmployeePayRateLoadingState => {
  switch (action.type) {

    case EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING:
      return { ...state, pending: true };

    case EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_SUCCESS:
      return { ...state, employeePayRateLoading: action.payload, pending: false }

    case EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST:
      return { ...state, pending: true };

    case EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST_SUCCESS:
      return { ...state, employeePayRateLoadingList: action.payload, pending: false }

    case EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING:
      return { ...state, pending: true };

    case EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING:
      return { ...state, pending: true };

    case EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING:
      return { ...state, pending: true };

    case EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING:
    return { ...state, pending: true};
    
    case EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING_SUCCESS:
    return { ...state, pending: false, employeePayRateLoadingUpload: action.payload }

    case EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING_FAIL:
    return { ...state, pending: false, error: action.payload }

    default:
      return state;
  }
}


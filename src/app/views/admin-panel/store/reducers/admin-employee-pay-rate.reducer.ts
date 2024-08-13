import {
  EmployeePayRateAction,
  EmployeePayRateActionTypes

} from '../actions/admin-employee-pay-rate.action';

// Create new interface for reducer
export interface EmployeePayRateState {
  employeePayRate: any;
  employeePayRateList: any;
  employeePositionUpload: any;
  pending: any;
  error: any;
  success: any;
}

// Set initial state of the data
export const EMPLOYEE_PAY_RATE_INITIAL_STATE: EmployeePayRateState = {
  employeePayRate: {},
  employeePayRateList: [],
  employeePositionUpload: null,
  pending: false,
  error: null,
  success: null
}


/*
  Create Reducer
  Take 2 Parameter: from EmployeePayRate
  @param
    state: value (employeePayRate, pending, error)
    action: from action type
*/
export const EmployeePayRateReducer = (
  state: EmployeePayRateState = EMPLOYEE_PAY_RATE_INITIAL_STATE,
  action: EmployeePayRateAction,
): EmployeePayRateState => {
  switch (action.type) {

    case EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE:
      return { ...state, pending: true };

    case EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_SUCCESS:
      return { ...state, employeePayRate: action.payload, pending: false }

    case EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST:
      return { ...state, pending: true };

    case EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST_SUCCESS:
      return { ...state, employeePayRateList: action.payload, pending: false }

    case EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE:
      return { ...state, pending: true };

    case EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE:
      return { ...state, pending: true };

    case EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE:
      return { ...state, pending: true };

    case EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION:
    return { ...state, pending: true};
    
    case EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION_SUCCESS:
    return { ...state, pending: false, employeePositionUpload: action.payload, success: action.payload.message }

    case EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION_FAIL:
    return { ...state, pending: false, error: action.payload }

    default:
      return state;
  }
}


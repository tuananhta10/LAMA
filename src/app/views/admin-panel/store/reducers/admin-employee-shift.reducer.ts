import {
	EmployeeShiftAction,
	EmployeeShiftActionTypes

} from '../actions/admin-employee-shift.action';

// Create new interface for reducer
export interface EmployeeShiftState {
	employeeShift: any;
	employeeShiftList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const EMPLOYEE_SHIFT_INITIAL_STATE: EmployeeShiftState = {
	employeeShift: {},
	employeeShiftList: [],
	pending: false,
	error: null,
	success: null,
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeeShift
	@param 
		state: value (employeeShift, pending, error)
		action: from action type
*/
export const EmployeeShiftReducer = (
	state: EmployeeShiftState = EMPLOYEE_SHIFT_INITIAL_STATE,
	action: EmployeeShiftAction,
): EmployeeShiftState => {
	switch (action.type) {

		case EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT:
			return { ...state, pending: true, success: null };

		case EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_SUCCESS:
			return { ...state, employeeShift: action.payload, pending: false }

		case EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST:
			return { ...state, pending: true };

		case EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST_SUCCESS:
			return { ...state, employeeShiftList: action.payload, pending: false }

		case EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT:
			return { ...state, pending: true };

		case EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT:
			return { ...state, pending: true };

		case EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT:
			return { ...state, pending: true };

		case EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT_FAIL:
			return { ...state, pending: false, error: action.payload }

		default:
			return state;
	}
}


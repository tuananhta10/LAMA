import {
	EmployeeLeaveAction,
	EmployeeLeaveActionTypes

} from '../actions/admin-employee-leave.action';

// Create new interface for reducer
export interface EmployeeLeaveState {
	employeeLeave: any;
	employeeLeaveList: any;
	employeeLeaveUpload:any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const EMPLOYEE_LEAVE_INITIAL_STATE: EmployeeLeaveState = {
	employeeLeave: {},
	employeeLeaveList: [],
	employeeLeaveUpload: null,
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeeLeave 
	@param 
		state: value (employeeLeave, pending, error)
		action: from action type
*/
export const EmployeeLeaveReducer = (
	state: EmployeeLeaveState = EMPLOYEE_LEAVE_INITIAL_STATE,
	action: EmployeeLeaveAction,
): EmployeeLeaveState => {
	switch (action.type) {

		case EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE:
			return { ...state, pending: true, success: null };

		case EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_SUCCESS:
			return { ...state, employeeLeave: action.payload, pending: false }

		case EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST:
			return { ...state, pending: true };

		case EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST_SUCCESS:
			return { ...state, employeeLeaveList: action.payload, pending: false }

		case EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE:
			return { ...state, pending: true };

		case EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE:
			return { ...state, pending: true };

		case EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE:
			return { ...state, pending: true };

		case EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE:
		return { ...state, pending: true};

		case EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE_SUCCESS:
		return { ...state, pending: false, employeeLeaveUpload: action.payload }

		case EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE_FAIL:
		return { ...state, pending: false, error: action.payload }

		default:
			return state;
	}
}


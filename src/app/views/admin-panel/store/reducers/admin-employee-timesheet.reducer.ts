import {
	EmployeeTimesheetAction,
	EmployeeTimesheetActionTypes

} from '../actions/admin-employee-timesheet.action';

// Create new interface for reducer
export interface EmployeeTimesheetState {
	employeeTimesheet: any;
	employeeTimesheetList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const EMPLOYEE_TIMESHEET_INITIAL_STATE: EmployeeTimesheetState = {
	employeeTimesheet: {},
	employeeTimesheetList: [],
	pending: false,
	error: null,
	success: null,
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeeTimesheet 
	@param 
		state: value (employeeTimesheet, pending, error)
		action: from action type
*/
export const EmployeeTimesheetReducer = (
	state: EmployeeTimesheetState = EMPLOYEE_TIMESHEET_INITIAL_STATE,
	action: EmployeeTimesheetAction,
): EmployeeTimesheetState => {
	switch (action.type) {

		case EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET:
			return { ...state, pending: true, success: null };

		case EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_SUCCESS:
			return { ...state, employeeTimesheet: action.payload, pending: false }

		case EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST:
			return { ...state, pending: true };

		case EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST_SUCCESS:
			return { ...state, employeeTimesheetList: action.payload, pending: false }

		case EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET:
			return { ...state, pending: true };

		case EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET:
			return { ...state, pending: true };

		case EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET:
			return { ...state, pending: true };

		case EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET_FAIL:
			return { ...state, pending: false, error: action.payload }

		default:
			return state;
	}
}


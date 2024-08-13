import {
	EmployeeTaskAction,
	EmployeeTaskActionTypes

} from '../actions/admin-employee-task.action';

// Create new interface for reducer
export interface EmployeeTaskState {
	employeeTask: any;
	employeeTaskList: any;
	pending: any;
	error: any;
	success: any;
	successEdit: any;
	successDelete: any;
}

// Set initial state of the data
export const EMPLOYEE_TASK_INITIAL_STATE: EmployeeTaskState = {
	employeeTask: {},
	employeeTaskList: [],
	pending: false,
	error: null,
	success: null,
	successEdit: null,
	successDelete: null,
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeeTask 
	@param 
		state: value (employeeTask, pending, error)
		action: from action type
*/
export const EmployeeTaskReducer = (
	state: EmployeeTaskState = EMPLOYEE_TASK_INITIAL_STATE,
	action: EmployeeTaskAction,
): EmployeeTaskState => {
	switch (action.type) {

		case EmployeeTaskActionTypes.GET_EMPLOYEE_TASK:
			return { ...state, pending: true };

		case EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_SUCCESS:
			return { ...state, employeeTask: action.payload, pending: false }

		case EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST:
			return { ...state, pending: true };

		case EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST_SUCCESS:
			return { ...state, employeeTaskList: action.payload, pending: false }

		case EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK:
			return { ...state, pending: true };

		case EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK:
			return { ...state, pending: true };

		case EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_SUCCESS:
			return { ...state, successEdit: action.payload.message, pending: false }

		case EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_FAIL:
			return { ...state, pending: false, error: action.payload }

		case EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK:
			return { ...state, pending: true };

		case EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK_SUCCESS:
			return { ...state, successEdit: action.payload.message, pending: false }

		case EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK_FAIL:
			return { ...state, pending: false, error: action.payload }

		default:
			return state;
	}
}


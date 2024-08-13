import {
	EmployeeAction,
	EmployeeActionTypes

} from '../actions/admin-employee.action';

// Create new interface for reducer
export interface EmployeeState {
	employee: any;
	name: any;
	success: any;
	pending: any;
	pendingStat: any;
	pendingQualification: boolean,
	pendingQualificationEdit: any;
	errorDraft: any;
	successDraft: any;
	successCreate: any;
	successPassword:any;
	successUpdate: any;
	successQualification: any;
	error: any;
	employeeStats: any;
}

// Set initial state of the data
export const EMPLOYEE_INITIAL_STATE: EmployeeState = {
	employee: {
		employeeDetail: {},
		profileDetail: {},
		careWorkersDetail: {},
		serviceDetail: {},
		workDays: {},
		contactDetail: {},
		employeeDocs: {}
	},
	name: null,
	pending: false,
	pendingQualification: false,
	pendingStat: false,
	pendingQualificationEdit: false,
	success: null,
	errorDraft: null,
	successDraft: null,
	successCreate: null,
	successUpdate: null,
	successPassword: null,
	successQualification: null,
	error: null,
	employeeStats: null,
}


/*
	Create Reducer
	Take 2 Parameter: from Employee
	@param
		state: value (employee, pending, error)
		action: from action type
*/
export const EmployeeReducer = (
	state: EmployeeState = EMPLOYEE_INITIAL_STATE,
	action: EmployeeAction,
	): EmployeeState => {
		switch (action.type){

			case EmployeeActionTypes.GET_EMPLOYEE:
			return { ...state, pending: true, success: null, name: null, successCreate: null, successDraft: null };

			case EmployeeActionTypes.GET_EMPLOYEE_SUCCESS:
			return { ...state, employee: { ...state.employee, [action.payload.key]: action.payload.result[0]}, name: action.payload.result[0], pending: false }

			case EmployeeActionTypes.GET_EMPLOYEE_FAIL:
			return { ...state, pending: false, error: action.payload, success: null }

			case EmployeeActionTypes.SAVE_EMPLOYEE:
			return { ...state, pending: true, successCreate: null };

			case EmployeeActionTypes.SAVE_EMPLOYEE_SUCCESS:
			return { ...state, successCreate: action.payload.data[0], pending: false }

			case EmployeeActionTypes.SAVE_EMPLOYEE_FAIL:
			return { ...state, pending: false, error: action.payload, successCreate: null }

			case EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE:
			return { ...state, pending: true, successDraft: null };

			case EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE_SUCCESS:
			return { ...state, successDraft: action.payload.data[0], pending: false }

			case EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE_FAIL:
			return { ...state, pending: false, errorDraft: action.payload, successDraft: null }

			case EmployeeActionTypes.EDIT_EMPLOYEE:
			return { ...state, pending: true, successUpdate: null };

			case EmployeeActionTypes.EDIT_EMPLOYEE_SUCCESS:
			return { ...state, successUpdate: action.payload, pending: false }

			case EmployeeActionTypes.EDIT_EMPLOYEE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD:
			return { ...state, pending: true, success: null };

			case EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD_SUCCESS:
			return { ...state, successPassword: action.payload.message, pending: false }

			case EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeActionTypes.GET_EMPLOYEE_STATS:
			return { ...state, pendingStat: true, success: null };

			case EmployeeActionTypes.GET_EMPLOYEE_STATS_SUCCESS:
			return { ...state, employeeStats: action.payload, pendingStat: false }

			case EmployeeActionTypes.GET_EMPLOYEE_STATS_FAIL:
			return { ...state, pendingStat: false, error: action.payload }

			case EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION:
			return { ...state, pending: true, successQualification: null };

			case EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION_SUCCESS:
			return { ...state, successQualification: action.payload.message, pending: false }

			case EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }


			case EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION:
			return { ...state, pendingQualification: true, successQualification: null };

			case EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION_SUCCESS:
			return { ...state, successQualification: action.payload.message, pendingQualification: false }

			case EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION_FAIL:
			return { ...state, pendingQualification: false, error: action.payload }

			default:
			return state;
		}
	}


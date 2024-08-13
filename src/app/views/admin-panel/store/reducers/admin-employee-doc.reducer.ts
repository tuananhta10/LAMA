import { 
	EmployeeDocAction,
	EmployeeDocActionTypes
	
} from '../actions/admin-employee-doc.action';

// Create new interface for reducer
export interface EmployeeDocState {
	employeeDoc: any;
    employeeDocList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const EMPLOYEE_DOC_INITIAL_STATE: EmployeeDocState = {
	employeeDoc: {},
    employeeDocList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeeDoc 
	@param 
		state: value (employeeDoc, pending, error)
		action: from action type
*/
export const EmployeeDocReducer = (
	state: EmployeeDocState = EMPLOYEE_DOC_INITIAL_STATE,
	action: EmployeeDocAction,
	): EmployeeDocState => {
		switch (action.type){

			case EmployeeDocActionTypes.GET_EMPLOYEE_DOC:
			return { ...state, pending: true, success: null };

			case EmployeeDocActionTypes.GET_EMPLOYEE_DOC_SUCCESS:
			return { ...state, employeeDoc: action.payload, pending: false }

			case EmployeeDocActionTypes.GET_EMPLOYEE_DOC_FAIL:
			return { ...state, pending: false, error: action.payload }

            case EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST:
            return { ...state, pending: true };

            case EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST_SUCCESS:
            return { ...state, employeeDocList: action.payload, pending: false }

            case EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC:
			return { ...state, pending: true };

			case EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC:
			return { ...state, pending: true };

			case EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC:
			return { ...state, pending: true };

			case EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

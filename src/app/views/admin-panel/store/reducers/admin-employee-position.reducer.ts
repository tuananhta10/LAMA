import { 
	EmployeePositionAction,
	EmployeePositionActionTypes
	
} from '../actions/admin-employee-position.action';

// Create new interface for reducer
export interface EmployeePositionState {
	employeePosition: any;
    employeePositionList: any;
    employeePositionUpload: any;
	pending: any;
	error: any;
	success: any;
	success_update: any;
}

// Set initial state of the data
export const EMPLOYEE_POSITION_INITIAL_STATE: EmployeePositionState = {
	employeePosition: {},
    employeePositionList: [],
    employeePositionUpload: null,
	pending: false,
	error: null,
	success: null,
	success_update: null
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeePosition 
	@param 
		state: value (employeePosition, pending, error)
		action: from action type
*/
export const EmployeePositionReducer = (
	state: EmployeePositionState = EMPLOYEE_POSITION_INITIAL_STATE,
	action: EmployeePositionAction,
	): EmployeePositionState => {
		switch (action.type){

			case EmployeePositionActionTypes.GET_EMPLOYEE_POSITION:
			return { ...state, pending: true, success: null };

			case EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_SUCCESS:
			return { ...state, employeePosition: action.payload, pending: false }

			case EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_FAIL:
			return { ...state, pending: false, error: action.payload }

            case EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST:
            return { ...state, pending: true };

            case EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST_SUCCESS:
            return { ...state, employeePositionList: action.payload, pending: false }

            case EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION:
			return { ...state, pending: true };

			case EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION:
			return { ...state, pending: true, success_update: null };

			case EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_SUCCESS:
			return { ...state, success_update: action.payload.message, pending: false }

			case EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION:
			return { ...state, pending: true };

			case EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION:
			return { ...state, pending: true};
			
			case EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION_SUCCESS:
			return { ...state, pending: false, employeePositionUpload: action.payload }

			case EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

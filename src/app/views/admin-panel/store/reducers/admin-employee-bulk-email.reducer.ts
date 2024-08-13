import { 
	EmployeeBulkEmailAction,
	EmployeeBulkEmailActionTypes
} from '../actions/admin-employee-bulk-email.action';

// Create new interface for reducer
export interface EmployeeBulkEmailState {
	employeeBulkEmail: any;
    employeeBulkEmailList: any;
	pending: any;
	error: any;
	success: any;
	pendingTemplate: any;
	successTemplate: any;
}

// Set initial state of the data
export const EMPLOYEE_BULK_EMAIL_NOTIFICATION_INITIAL_STATE: EmployeeBulkEmailState = {
	employeeBulkEmail: {},
    employeeBulkEmailList: [],
	pending: false,
	error: null,
	success: null,
	pendingTemplate: null,
	successTemplate: null,
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeeBulkEmail 
	@param 
		state: value (employeeBulkEmail, pending, error)
		action: from action type
*/
export const EmployeeBulkEmailReducer = (
	state: EmployeeBulkEmailState = EMPLOYEE_BULK_EMAIL_NOTIFICATION_INITIAL_STATE,
	action: EmployeeBulkEmailAction,
	): EmployeeBulkEmailState => {
		switch (action.type){

			case EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION:
			return { ...state, pending: true, success: null };

			case EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS:
			return { ...state, employeeBulkEmail: action.payload, pending: false }

			case EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }


            case EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST:
            return { ...state, pending: true };

            case EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST_SUCCESS:
            return { ...state, employeeBulkEmailList: action.payload, pending: false }

            case EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }


			case EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION:
			return { ...state, pending: true };

			case EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE:
			return { ...state, pendingTemplate: true };

			case EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE_SUCCESS:
			return { ...state, successTemplate: action.payload.message, pendingTemplate: false }

			case EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE_FAIL:
			return { ...state, pendingTemplate: false, error: action.payload }


			case EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION:
			return { ...state, pending: true };

			case EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }


			case EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION:
			return { ...state, pending: true };

			case EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

import { 
	EmployeeBulkSMSAction,
	EmployeeBulkSMSActionTypes
} from '../actions/admin-employee-bulk-sms.action';

// Create new interface for reducer
export interface EmployeeBulkSMSState {
	employeeBulkSMS: any;
    employeeBulkSMSList: any;
	pending: any;
	error: any;
	success: any;
	pendingTemplate: any;
	successTemplate: any;
}

// Set initial state of the data
export const EMPLOYEE_BULK_SMS_NOTIFICATION_INITIAL_STATE: EmployeeBulkSMSState = {
	employeeBulkSMS: {},
    employeeBulkSMSList: [],
	pending: false,
	error: null,
	success: null,
	pendingTemplate: null,
	successTemplate: null,
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeeBulkSMS 
	@param 
		state: value (employeeBulkSMS, pending, error)
		action: from action type
*/
export const EmployeeBulkSMSReducer = (
	state: EmployeeBulkSMSState = EMPLOYEE_BULK_SMS_NOTIFICATION_INITIAL_STATE,
	action: EmployeeBulkSMSAction,
	): EmployeeBulkSMSState => {
		switch (action.type){

			case EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION:
			return { ...state, pending: true, success: null };

			case EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS:
			return { ...state, employeeBulkSMS: action.payload, pending: false }

			case EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }


            case EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST:
            return { ...state, pending: true };

            case EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST_SUCCESS:
            return { ...state, employeeBulkSMSList: action.payload, pending: false }

            case EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }


			case EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION:
			return { ...state, pending: true };

			case EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE:
			return { ...state, pendingTemplate: true };

			case EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE_SUCCESS:
			return { ...state, successTemplate: action.payload.message, pendingTemplate: false }

			case EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE_FAIL:
			return { ...state, pendingTemplate: false, error: action.payload }


			case EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION:
			return { ...state, pending: true };

			case EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }


			case EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION:
			return { ...state, pending: true };

			case EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

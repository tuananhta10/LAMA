import { 
	EmployeeCertificateAction,
	EmployeeCertificateActionTypes
	
} from '../actions/admin-employee-certificate.action';

// Create new interface for reducer
export interface EmployeeCertificateState {
	employeeCertificate: any;
    employeeCertificateList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const EMPLOYEE_CERTIFICATE_INITIAL_STATE: EmployeeCertificateState = {
	employeeCertificate: {},
    employeeCertificateList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from EmployeeCertificate 
	@param 
		state: value (employeeCertificate, pending, error)
		action: from action type
*/
export const EmployeeCertificateReducer = (
	state: EmployeeCertificateState = EMPLOYEE_CERTIFICATE_INITIAL_STATE,
	action: EmployeeCertificateAction,
	): EmployeeCertificateState => {
		switch (action.type){

			case EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE:
			return { ...state, pending: true, success: null };

			case EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_SUCCESS:
			return { ...state, employeeCertificate: action.payload, pending: false }

			case EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_FAIL:
			return { ...state, pending: false, error: action.payload }

            case EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST:
            return { ...state, pending: true };

            case EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST_SUCCESS:
            return { ...state, employeeCertificateList: action.payload, pending: false }

            case EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE:
			return { ...state, pending: true };

			case EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE:
			return { ...state, pending: true };

			case EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE:
			return { ...state, pending: true };

			case EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

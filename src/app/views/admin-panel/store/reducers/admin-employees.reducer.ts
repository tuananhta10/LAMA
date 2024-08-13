import { 
	EmployeeListAction,
	EmployeeListActionTypes	
} from '../actions/admin-employees.actions';

// Create new interface for reducer
export interface EmployeeListState {
	employeeList: any[];
	employeeCompliance: any[];
	employeeClientsList: any[];
	employeeLiveFeed: any[];
	deleteEmployeePending: boolean;
	deletedData: any;
	employeeUpload: any;
	employeeListPending: any;
	pending: any;
	pendingCompliance: boolean;
	error: any;
	success: any;
}

// Set initial state of the data
export const EMPLOYEE_LIST_INITIAL_STATE: EmployeeListState = {
	employeeList: [],
	employeeCompliance: [],
	employeeClientsList: [],
	employeeLiveFeed: [],
	deleteEmployeePending: false,
	deletedData: null,
	employeeUpload: null,
	employeeListPending: false,
	pending: false,
	pendingCompliance: false,
	error: null,
	success: null,
}


/*
	Create Reducer
	Take 2 Parameter: from Employee List
	@param 
		state: value (employeeList, pending, error)
		action: from action type
*/
export const EmployeeListReducer = (
	state: EmployeeListState = EMPLOYEE_LIST_INITIAL_STATE,
	action: EmployeeListAction,
	): EmployeeListState => {
		switch (action.type){

			// get employee list
			case EmployeeListActionTypes.GET_EMPLOYEE_LIST:
			return { ...state, employeeListPending: true, success: null, deletedData: null, employeeList: [] };
			// if success return data
			case EmployeeListActionTypes.GET_EMPLOYEE_LIST_SUCCESS:
			return { ...state, employeeList: action.payload, employeeListPending: false }
			// if fail
			case EmployeeListActionTypes.GET_EMPLOYEE_LIST_FAIL:
			return { ...state, employeeListPending: false, error: action.payload }


			// get employee list compliance
			case EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE:
			return { ...state, pendingCompliance: true, success: null, deletedData: null };
			// if success return data
			case EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE_SUCCESS:
			return { ...state, employeeCompliance: action.payload, pendingCompliance: false }
			// if fail
			case EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE_FAIL:
			return { ...state, pendingCompliance: false, error: action.payload }

			// Delete Employee from client list
			case EmployeeListActionTypes.DELETE_EMPLOYEE_LIST:
			return { ...state, deleteEmployeePending: true, employeeListPending: true };

			// if success return data
			case EmployeeListActionTypes.DELETE_EMPLOYEE_LIST_SUCCESS:
			return { ...state, success: true, deletedData: action.payload?.data.deleted, deleteEmployeePending: false }

			// if fail
			case EmployeeListActionTypes.DELETE_EMPLOYEE_LIST_FAIL:
			return { ...state, deleteEmployeePending: false, error: action.payload }

			// get employee clients
			case EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST:
			return { ...state, pending: true };
			// if success return data
			case EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST_SUCCESS:
			return { ...state, employeeClientsList: action.payload, pending: false }
			// if fail
			case EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }


			// get employee live feed
			case EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED:
			return { ...state, pending: true };
			// if success return data
			case EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED_SUCCESS:
			return { ...state, employeeLiveFeed: action.payload, pending: false }
			// if fail
			case EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmployeeListActionTypes.UPLOAD_EMPLOYEE:
			return { ...state, pending: true};

			case EmployeeListActionTypes.UPLOAD_EMPLOYEE_SUCCESS:
			return { ...state, pending: false, employeeUpload: action.payload }

			case EmployeeListActionTypes.UPLOAD_EMPLOYEE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

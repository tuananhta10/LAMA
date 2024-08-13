import { 
	SyncToXeroAction,
	SyncToXeroActionTypes
	
} from '../actions/admin-xero.action';

// Create new interface for reducer
export interface SyncToXeroState {

    syncToXeroListProgress: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const SYNC_TO_XERO_INITIAL_STATE: SyncToXeroState = {

    syncToXeroListProgress: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from SyncToXero 
	@param 
		state: value (serviceType, pending, error)
		action: from action type
*/
export const SyncToXeroReducer = (
	state: SyncToXeroState = SYNC_TO_XERO_INITIAL_STATE,
	action: SyncToXeroAction,
	): SyncToXeroState => {
		switch (action.type){

			case SyncToXeroActionTypes.SYNC_TO_XERO_LIST:
			return { ...state, pending: true, success: null };

			case SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS:
			return { ...state, success: action.payload, syncToXeroListProgress: action.payload, pending: false }

			case SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

			case SyncToXeroActionTypes.SYNC_TO_XERO_LIST:
			return { ...state, pending: true, success: null };

			// case SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS:
			// return { ...state, success: action.payload, pending: false }

			case SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

			case SyncToXeroActionTypes.SYNC_TO_XERO:
			return { ...state, pending: true, success: null };

			case SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS:
			return { ...state, success: action.payload, pending: false }

			case SyncToXeroActionTypes.SYNC_TO_XERO_FAIL:
			return { ...state, pending: false, error: action.payload }

			case SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR:
			return { ...state, pending: true, success:null }

			case SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR_SUCCESS:
			return { ...state, success: action.payload, pending: false }

			case SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR_FAIL:
			return { ...state, pending: false, error: action.payload }
			
			case SyncToXeroActionTypes.GET_MYOB_SETTINGS:
			return { ...state, pending: true, success:null }

			case SyncToXeroActionTypes.GET_MYOB_SETTINGS_SUCCESS:
			return { ...state, success: action.payload, pending: false }

			case SyncToXeroActionTypes.GET_MYOB_SETTINGS_FAIL:
			return { ...state, pending: false, error: action.payload }

			case SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE:
			return { ...state, pending: true, success:null }

			case SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE_SUCCESS:
			return { ...state, success: action.payload, pending: false }

			case SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE_FAIL:
			return { ...state, pending: false, error: action.payload }
			
			default:
			return state;
		}
	}
	

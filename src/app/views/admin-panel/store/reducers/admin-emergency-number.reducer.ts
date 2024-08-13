import { 
	EmergencyNumberAction,
	EmergencyNumberActionTypes
	
} from '../actions/admin-emergency-number.action';

// Create new interface for reducer
export interface EmergencyNumberState {
	emergencyNumber: any;
    emergencyNumberList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const EMERGENCY_NUMBER_INITIAL_STATE: EmergencyNumberState = {
	emergencyNumber: {},
    emergencyNumberList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from EmergencyNumber 
	@param 
		state: value (emergencyNumber, pending, error)
		action: from action type
*/
export const EmergencyNumberReducer = (
	state: EmergencyNumberState = EMERGENCY_NUMBER_INITIAL_STATE,
	action: EmergencyNumberAction,
	): EmergencyNumberState => {
		switch (action.type){

			case EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER:
			return { ...state, pending: true, success: null };

			case EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_SUCCESS:
			return { ...state, emergencyNumber: action.payload, pending: false }

			case EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_FAIL:
			return { ...state, pending: false, error: action.payload }

            case EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST:
            return { ...state, pending: true };

            case EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST_SUCCESS:
            return { ...state, emergencyNumberList: action.payload, pending: false }

            case EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER:
			return { ...state, pending: true };

			case EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER:
			return { ...state, pending: true };

			case EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER_FAIL:
			return { ...state, pending: false, error: action.payload }

			case EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER:
			return { ...state, pending: true };

			case EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

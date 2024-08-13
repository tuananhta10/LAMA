import { 
	ServiceTypeAction,
	ServiceTypeActionTypes
	
} from '../actions/admin-service-type.action';

// Create new interface for reducer
export interface ServiceTypeState {
	serviceType: any;
    serviceTypeList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const SERVICE_TYPE_INITIAL_STATE: ServiceTypeState = {
	serviceType: {},
    serviceTypeList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from ServiceType 
	@param 
		state: value (serviceType, pending, error)
		action: from action type
*/
export const ServiceTypeReducer = (
	state: ServiceTypeState = SERVICE_TYPE_INITIAL_STATE,
	action: ServiceTypeAction,
	): ServiceTypeState => {
		switch (action.type){

			case ServiceTypeActionTypes.GET_SERVICE_TYPE:
			return { ...state, pending: true, success: null };

			case ServiceTypeActionTypes.GET_SERVICE_TYPE_SUCCESS:
			return { ...state, serviceType: action.payload, pending: false }

			case ServiceTypeActionTypes.GET_SERVICE_TYPE_FAIL:
			return { ...state, pending: false, error: action.payload }

            case ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST:
            return { ...state, pending: true };

            case ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST_SUCCESS:
            return { ...state, serviceTypeList: action.payload, pending: false }

            case ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case ServiceTypeActionTypes.SAVE_SERVICE_TYPE:
			return { ...state, pending: true };

			case ServiceTypeActionTypes.SAVE_SERVICE_TYPE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ServiceTypeActionTypes.SAVE_SERVICE_TYPE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ServiceTypeActionTypes.EDIT_SERVICE_TYPE:
			return { ...state, pending: true };

			case ServiceTypeActionTypes.EDIT_SERVICE_TYPE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ServiceTypeActionTypes.EDIT_SERVICE_TYPE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

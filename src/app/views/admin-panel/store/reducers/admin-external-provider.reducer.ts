import { 
	ExternalProviderAction,
	ExternalProviderActionTypes
	
} from '../actions/admin-external-provider.action';

// Create new interface for reducer
export interface ExternalProviderState {
	externalProvider: any;
    externalProviderList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const EXTERNAL_PROVIDER_INITIAL_STATE: ExternalProviderState = {
	externalProvider: {},
    externalProviderList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from ExternalProvider 
	@param 
		state: value (externalProvider, pending, error)
		action: from action type
*/
export const ExternalProviderReducer = (
	state: ExternalProviderState = EXTERNAL_PROVIDER_INITIAL_STATE,
	action: ExternalProviderAction,
	): ExternalProviderState => {
		switch (action.type){

			case ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER:
			return { ...state, pending: true };

			case ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_SUCCESS:
			return { ...state, externalProvider: action.payload, pending: false }

			case ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_FAIL:
			return { ...state, pending: false, error: action.payload }

            case ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST:
            return { ...state, pending: true };

            case ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_SUCCESS:
            return { ...state, externalProviderList: action.payload, pending: false }

            case ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER:
			return { ...state, pending: true };

			case ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER:
			return { ...state, pending: true };

			case ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER:
			return { ...state, pending: true };

			case ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

import { 
	ClientCareworkerAction,
	ClientCareworkerActionTypes
	
} from '../actions/admin-client-careworker.action';

// Create new interface for reducer
export interface ClientCareworkerState {
	client: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const CLIENT_CAREWORKER_INITIAL_STATE: ClientCareworkerState = {
	client: {
		careWorkers: {},
	},
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from ClientCareworker 
	@param 
		state: value (client, pending, error)
		action: from action type
*/
export const ClientCareworkerReducer = (
	state: ClientCareworkerState = CLIENT_CAREWORKER_INITIAL_STATE,
	action: ClientCareworkerAction,
	): ClientCareworkerState => {
		switch (action.type){

			case ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER:
			return { ...state, pending: true, client: CLIENT_CAREWORKER_INITIAL_STATE.client };

			case ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER_SUCCESS:
			return { ...state, client: { ...state.client, [action.payload.key]: action.payload.result[0]}, pending: false }

			case ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER:
			return { ...state, pending: true };

			case ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER:
			return { ...state, pending: true };

			case ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

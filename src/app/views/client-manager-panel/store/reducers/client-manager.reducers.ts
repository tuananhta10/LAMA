import { 
	ClientManagerAction,
	ClientManagerActionTypes
	
} from '../actions/client-manager.actions';

// Create new interface for reducer
export interface ClientManagerState {
	clients: any[];
	pending: any;
	error: any;
}

// Set initial state of the data
export const CLIENT_MANAGER_INITIAL_STATE: ClientManagerState = {
	clients: [],
	pending: false,
	error: null
}

export const ClientManagerReducer = (
	state: ClientManagerState = CLIENT_MANAGER_INITIAL_STATE,
	action: ClientManagerAction,
	): ClientManagerState => {
		switch (action.type){

			case ClientManagerActionTypes.GET_CLIENTS_MANAGER:
			return { ...state, pending: true };

			case ClientManagerActionTypes.GET_CLIENTS_MANAGER_SUCCESS:
			return { ...state, clients: action.payload, pending: false }

			case ClientManagerActionTypes.GET_CLIENTS_MANAGER_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

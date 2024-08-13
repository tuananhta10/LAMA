import { 
	ClientListAction,
	ClientListActionTypes
	
} from '../actions/admin-clients.action';

// Create new interface for reducer
export interface ClientListState {
	clientList: any[];
	clientLiveFeed: any[];
	pending: any;
	clientListPending: boolean;
	deleteClientPending: boolean;
	clientUpload: any;
	deletedData: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const CLIENT_LIST_INITIAL_STATE: ClientListState = {
	clientList: [],
	clientLiveFeed: [],
	pending: false,
	clientListPending: false,
	deleteClientPending: false,
	clientUpload: null,
	deletedData: null,
	error: null,
	success: null,

}


/*
	Create Reducer
	Take 2 Parameter: from Client List
	@param 
		state: value (clientList, pending, error)
		action: from action type
*/
export const ClientListReducer = (
	state: ClientListState = CLIENT_LIST_INITIAL_STATE,
	action: ClientListAction,
	): ClientListState => {
		switch (action.type){

			// get client list
			case ClientListActionTypes.GET_CLIENT_LIST:
			return { ...state, clientListPending: true, success: null, clientList: [] };

			// if success return data
			case ClientListActionTypes.GET_CLIENT_LIST_SUCCESS:
			return { ...state, clientList: action.payload, clientListPending: false, deletedData: null }

			// if fail
			case ClientListActionTypes.GET_CLIENT_LIST_FAIL:
			return { ...state, clientListPending: false, error: action.payload }

			// Delete Client from client list
			case ClientListActionTypes.DELETE_CLIENT_LIST:
			return { ...state, deleteClientPending: true, clientListPending: true };

			// if success return data
			case ClientListActionTypes.DELETE_CLIENT_LIST_SUCCESS:
			return { ...state, success: true, deletedData: action.payload?.data.deleted, deleteClientPending: false }

			// if fail
			case ClientListActionTypes.DELETE_CLIENT_LIST_FAIL:
			return { ...state, deleteClientPending: false, error: action.payload }


			// get admin profile
			case ClientListActionTypes.GET_CLIENT_LIVE_FEED:
			return { ...state, pending: true };

			// if success return data
			case ClientListActionTypes.GET_CLIENT_LIVE_FEED_SUCCESS:
			return { ...state, clientLiveFeed: action.payload, pending: false }

			// if fail
			case ClientListActionTypes.GET_CLIENT_LIVE_FEED_FAIL:
			return { ...state, pending: false, error: action.payload }

			
			case ClientListActionTypes.UPLOAD_CLIENT:
			return { ...state, pending: true, success: false};

			case ClientListActionTypes.UPLOAD_CLIENT_SUCCESS:
			return { ...state, pending: false, clientUpload: action.payload, success: action.payload }

			case ClientListActionTypes.UPLOAD_CLIENT_FAIL:
			return { ...state, pending: false, error: action.payload, success: false }

			default:
			return state;
		}
	}
	

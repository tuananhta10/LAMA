import { 
	ClientAction,
	ClientActionTypes
	
} from '../actions/admin-client.action';

// Create new interface for reducer
export interface ClientState {
	client: any;
	name: any;
	pending: any;
	pendingStat: any;
	error: any;
	errorDraft: any;
	successCreate: any;
	successDraft: any;
	success: any;
	successStat: any;
	successPassword: any;
	clientStats: any
}

// Set initial state of the data
export const CLIENT_INITIAL_STATE: ClientState = {
	client: {
		clientDetail: {},
		demographics:{},
		/*intake: {},*/
		onboardingNotes: {},
		careWorkers: {},
		medicationClientNotes: {},
		serviceDetails: {},
		contactDetails: {},
		clientDocs: {},
		profileClientDetails: {},
		
	},
	name: null,
	pending: false,
	pendingStat: false,
	error: null,
	errorDraft: null,
	successCreate: null,
	successDraft: null,
	success: null,
	successStat: null,
	successPassword: null,
	clientStats: null
}


/*
	Create Reducer
	Take 2 Parameter: from Client 
	@param 
		state: value (client, pending, error)
		action: from action type
*/
export const ClientReducer = (
	state: ClientState = CLIENT_INITIAL_STATE,
	action: ClientAction,
	): ClientState => {
		switch (action.type){

			case ClientActionTypes.GET_CLIENT:
			return { ...state, pending: true,  name: null,  success: null,  successCreate: null, successDraft: null };

			case ClientActionTypes.GET_CLIENT_SUCCESS:
			return { ...state, 
				name: action?.payload?.result[0],
				client: { 
					...state.client, 
					[action?.payload?.key]: action?.payload?.result[0], 
					},
					pending: false
				}

			case ClientActionTypes.GET_CLIENT_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientActionTypes.SAVE_CLIENT:
			return { ...state, pending: true, successCreate: null };

			case ClientActionTypes.SAVE_CLIENT_SUCCESS:
			return { ...state, successCreate: action?.payload?.data[0], pending: false }

			case ClientActionTypes.SAVE_CLIENT_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientActionTypes.SAVE_DRAFT_CLIENT:
			return { ...state, pending: true, successDraft: null };

			case ClientActionTypes.SAVE_DRAFT_CLIENT_SUCCESS:
			return { ...state, successDraft: action.payload.data[0], pending: false }

			case ClientActionTypes.SAVE_DRAFT_CLIENT_FAIL:
			return { ...state, pending: false, errorDraft: action.payload, successDraft: null }

			case ClientActionTypes.EDIT_CLIENT:
			return { ...state, pending: true, success: null };

			case ClientActionTypes.EDIT_CLIENT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientActionTypes.EDIT_CLIENT_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientActionTypes.EDIT_CLIENT_PASSWORD:
			return { ...state, pending: true, success: null };

			case ClientActionTypes.EDIT_CLIENT_PASSWORD_SUCCESS:
			return { ...state, successPassword: action.payload.message, pending: false }

			case ClientActionTypes.EDIT_CLIENT_PASSWORD_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientActionTypes.GET_CLIENT_STATS:
			return { ...state, pendingStat: true, clientStats: CLIENT_INITIAL_STATE.clientStats };

			case ClientActionTypes.GET_CLIENT_STATS_SUCCESS:
			return { ...state, clientStats: action.payload?.result, pendingStat: false }

			case ClientActionTypes.GET_CLIENT_STATS_FAIL:
			return { ...state, pendingStat: false, error: action.payload }


			// Emergency Contact
			case ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT:
			return { ...state, pending: true, success: null };

			case ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT:
			return { ...state, pending: true, success: null };

			case ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT:
			return { ...state, pending: true, success: null };

			case ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

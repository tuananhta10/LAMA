import {
	ClientChecklistAction,
	ClientChecklistActionTypes

} from '../actions/admin-client-checklist.action';

// Create new interface for reducer
export interface ClientChecklistState {
	clientChecklist: any;
	clientChecklistList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const CLIENT_CHECKLIST_INITIAL_STATE: ClientChecklistState = {
	clientChecklist: {},
	clientChecklistList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from ClientChecklist 
	@param 
		state: value (clientChecklist, pending, error)
		action: from action type
*/
export const ClientChecklistReducer = (
	state: ClientChecklistState = CLIENT_CHECKLIST_INITIAL_STATE,
	action: ClientChecklistAction,
): ClientChecklistState => {
	switch (action.type) {

		case ClientChecklistActionTypes.GET_CLIENT_CHECKLIST:
			return { ...state, pending: true };

		case ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_SUCCESS:
			return { ...state, clientChecklist: action.payload, pending: false }

		case ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		case ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST:
			return { ...state, pending: true };

		case ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST_SUCCESS:
			return { ...state, clientChecklistList: action.payload, pending: false }

		case ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		case ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST:
			return { ...state, pending: true };

		case ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		case ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST:
			return { ...state, pending: true };

		case ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		case ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST:
			return { ...state, pending: true };

		case ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

		case ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST_FAIL:
			return { ...state, pending: false, error: action.payload }

		default:
			return state;
	}
}


import { 
	CommunicationGroupAction,
	CommunicationGroupActionTypes
} from '../actions/admin-bulk-communication-group.action';

// Create new interface for reducer
export interface CommunicationGroupState {
	communicationGroup: any;
    communicationGroupList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const COMMUNICATION_GROUP_INITIAL_STATE: CommunicationGroupState = {
	communicationGroup: {},
    communicationGroupList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from CommunicationGroup 
	@param 
		state: value (communicationGroup, pending, error)
		action: from action type
*/
export const CommunicationGroupReducer = (
	state: CommunicationGroupState = COMMUNICATION_GROUP_INITIAL_STATE,
	action: CommunicationGroupAction,
	): CommunicationGroupState => {
		switch (action.type){

			case CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP:
			return { ...state, pending: true };

			case CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_SUCCESS:
			return { ...state, communicationGroup: action.payload, pending: false }

			case CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_FAIL:
			return { ...state, pending: false, error: action.payload }

            case CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST:
            return { ...state, pending: true };

            case CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST_SUCCESS:
            return { ...state, communicationGroupList: action.payload, pending: false }

            case CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP:
			return { ...state, pending: true };

			case CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP_FAIL:
			return { ...state, pending: false, error: action.payload }

			case CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP:
			return { ...state, pending: true };

			case CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP_FAIL:
			return { ...state, pending: false, error: action.payload }

			case CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP:
			return { ...state, pending: true };

			case CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

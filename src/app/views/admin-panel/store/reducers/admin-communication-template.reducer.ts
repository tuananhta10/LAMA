import { 
	CommunicationTemplateAction,
	CommunicationTemplateActionTypes
	
} from '../actions/admin-communication-template.action';

// Create new interface for reducer
export interface CommunicationTemplateState {
	communicationTemplate: any;
    communicationTemplateList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const COMMUNICATION_TEMPLATE_INITIAL_STATE: CommunicationTemplateState = {
	communicationTemplate: {},
    communicationTemplateList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from CommunicationTemplate 
	@param 
		state: value (communicationTemplate, pending, error)
		action: from action type
*/
export const CommunicationTemplateReducer = (
	state: CommunicationTemplateState = COMMUNICATION_TEMPLATE_INITIAL_STATE,
	action: CommunicationTemplateAction,
	): CommunicationTemplateState => {
		switch (action.type){

			case CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE:
			return { ...state, pending: true };

			case CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_SUCCESS:
			return { ...state, communicationTemplate: action.payload, pending: false }

			case CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

            case CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST:
            return { ...state, pending: true };

            case CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST_SUCCESS:
            return { ...state, communicationTemplateList: action.payload, pending: false }

            case CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE:
			return { ...state, pending: true };

			case CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE:
			return { ...state, pending: true };

			case CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE:
			return { ...state, pending: true };

			case CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

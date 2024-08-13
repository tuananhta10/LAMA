import { 
	OrganizationAction,
	OrganizationActionTypes
	
} from '../actions/admin-organization.action';

// Create new interface for reducer
export interface OrganizationState {
	organization: any;
    organizationList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const ORGANIZATION_INITIAL_STATE: OrganizationState = {
	organization: null,
    organizationList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Organization 
	@param 
		state: value (organization, pending, error)
		action: from action type
*/
export const OrganizationReducer = (
	state: OrganizationState = ORGANIZATION_INITIAL_STATE,
	action: OrganizationAction,
	): OrganizationState => {
		switch (action.type){

			case OrganizationActionTypes.GET_ORGANIZATION:
			return { ...state, pending: true };

			case OrganizationActionTypes.GET_ORGANIZATION_SUCCESS:
			return { ...state, organization: action.payload, pending: false }

			case OrganizationActionTypes.GET_ORGANIZATION_FAIL:
			return { ...state, pending: false, error: action.payload }

            case OrganizationActionTypes.GET_ORGANIZATION_LIST:
            return { ...state, pending: true };

            case OrganizationActionTypes.GET_ORGANIZATION_LIST_SUCCESS:
            return { ...state, organizationList: action.payload, pending: false }

            case OrganizationActionTypes.GET_ORGANIZATION_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case OrganizationActionTypes.SAVE_ORGANIZATION:
			return { ...state, pending: true };

			case OrganizationActionTypes.SAVE_ORGANIZATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case OrganizationActionTypes.SAVE_ORGANIZATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case OrganizationActionTypes.EDIT_ORGANIZATION:
			return { ...state, pending: true };

			case OrganizationActionTypes.EDIT_ORGANIZATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case OrganizationActionTypes.EDIT_ORGANIZATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case OrganizationActionTypes.DELETE_ORGANIZATION:
			return { ...state, pending: true };

			case OrganizationActionTypes.DELETE_ORGANIZATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case OrganizationActionTypes.DELETE_ORGANIZATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

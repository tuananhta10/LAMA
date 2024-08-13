import { 
	RegisterOrganizationAction,
	RegisterOrganizationActionTypes
	
} from '../actions/admin-register-organization.action';

// Create new interface for reducer
export interface RegisterOrganizationState {
	registerOrganization: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const REGISTER_ORGANIZATION_INITIAL_STATE: RegisterOrganizationState = {
	registerOrganization: {},
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from RegisterOrganization 
	@param 
		state: value (registerOrganization, pending, error)
		action: from action type
*/
export const RegisterOrganizationReducer = (
	state: RegisterOrganizationState = REGISTER_ORGANIZATION_INITIAL_STATE,
	action: RegisterOrganizationAction,
	): RegisterOrganizationState => {
		switch (action.type){

			case RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION:
			return { ...state, pending: true };

			case RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

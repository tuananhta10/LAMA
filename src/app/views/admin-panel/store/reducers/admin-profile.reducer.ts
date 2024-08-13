import { 
	AdminProfileAction,
	AdminProfileActionTypes
} from '../actions/admin-profile.action';

// Create new interface for reducer
export interface AdminProfileState {
	adminProfile: any;
	pending: any;
	error: any;
}

// Set initial state of the data
export const ADMIN_PROFILE_INITIAL_STATE: AdminProfileState = {
	adminProfile: {},
	pending: false,
	error: null
}

/*
	Create Reducer
	Take 2 Parameter: from Admin Profile
	@param 
		state: value (admin_profile, pending, error)
		action: from action type
*/
export const AdminProfileReducer = (
	state: AdminProfileState = ADMIN_PROFILE_INITIAL_STATE,
	action: AdminProfileAction,
	): AdminProfileState => {
		switch (action.type){

			// get admin profile
			case AdminProfileActionTypes.GET_ADMIN_PROFILE:
			return { ...state, pending: true };

			// if success return data
			case AdminProfileActionTypes.GET_ADMIN_PROFILE_SUCCESS:
			return { ...state, adminProfile: action.payload.teacher, pending: false }

			// if fail
			case AdminProfileActionTypes.GET_ADMIN_PROFILE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

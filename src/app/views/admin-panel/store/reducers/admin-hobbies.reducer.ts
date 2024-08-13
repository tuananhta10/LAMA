import { 
	HobbiesAction,
	HobbiesActionTypes
	
} from '../actions/admin-hobbies.action';

// Create new interface for reducer
export interface HobbiesState {
	hobbies: any;
    hobbiesList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const HOBBIES_INITIAL_STATE: HobbiesState = {
	hobbies: {},
    hobbiesList: [],
	pending: false,
	error: null,
	success: null
}

/*
	Create Reducer
	Take 2 Parameter: from Hobbies 
	@param 
		state: value (hobbies, pending, error)
		action: from action type
*/
export const HobbiesReducer = (
	state: HobbiesState = HOBBIES_INITIAL_STATE,
	action: HobbiesAction,
	): HobbiesState => {
		switch (action.type){

			case HobbiesActionTypes.GET_HOBBIES:
			return { ...state, pending: true };

			case HobbiesActionTypes.GET_HOBBIES_SUCCESS:
			return { ...state, hobbies: action.payload, pending: false }

			case HobbiesActionTypes.GET_HOBBIES_FAIL:
			return { ...state, pending: false, error: action.payload }

            case HobbiesActionTypes.GET_HOBBIES_LIST:
            return { ...state, pending: true };

            case HobbiesActionTypes.GET_HOBBIES_LIST_SUCCESS:
            return { ...state, hobbiesList: action.payload, pending: false }

            case HobbiesActionTypes.GET_HOBBIES_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case HobbiesActionTypes.SAVE_HOBBIES:
			return { ...state, pending: true };

			case HobbiesActionTypes.SAVE_HOBBIES_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case HobbiesActionTypes.SAVE_HOBBIES_FAIL:
			return { ...state, pending: false, error: action.payload }

			case HobbiesActionTypes.EDIT_HOBBIES:
			return { ...state, pending: true };

			case HobbiesActionTypes.EDIT_HOBBIES_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case HobbiesActionTypes.EDIT_HOBBIES_FAIL:
			return { ...state, pending: false, error: action.payload }

			case HobbiesActionTypes.DELETE_HOBBIES:
			return { ...state, pending: true };

			case HobbiesActionTypes.DELETE_HOBBIES_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case HobbiesActionTypes.DELETE_HOBBIES_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

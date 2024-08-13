import { 
	GenderAction,
	GenderActionTypes
	
} from '../actions/admin-gender.action';

// Create new interface for reducer
export interface GenderState {
	gender: any;
    genderList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const GENDER_INITIAL_STATE: GenderState = {
	gender: {},
    genderList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Gender 
	@param 
		state: value (gender, pending, error)
		action: from action type
*/
export const GenderReducer = (
	state: GenderState = GENDER_INITIAL_STATE,
	action: GenderAction,
	): GenderState => {
		switch (action.type){

			case GenderActionTypes.GET_GENDER:
			return { ...state, pending: true };

			case GenderActionTypes.GET_GENDER_SUCCESS:
			return { ...state, gender: action.payload, pending: false }

			case GenderActionTypes.GET_GENDER_FAIL:
			return { ...state, pending: false, error: action.payload }

            case GenderActionTypes.GET_GENDER_LIST:
            return { ...state, pending: true };

            case GenderActionTypes.GET_GENDER_LIST_SUCCESS:
            return { ...state, genderList: action.payload, pending: false }

            case GenderActionTypes.GET_GENDER_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case GenderActionTypes.SAVE_GENDER:
			return { ...state, pending: true };

			case GenderActionTypes.SAVE_GENDER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case GenderActionTypes.SAVE_GENDER_FAIL:
			return { ...state, pending: false, error: action.payload }

			case GenderActionTypes.EDIT_GENDER:
			return { ...state, pending: true };

			case GenderActionTypes.EDIT_GENDER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case GenderActionTypes.EDIT_GENDER_FAIL:
			return { ...state, pending: false, error: action.payload }

			case GenderActionTypes.DELETE_GENDER:
			return { ...state, pending: true };

			case GenderActionTypes.DELETE_GENDER_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case GenderActionTypes.DELETE_GENDER_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

import { 
	InterestAction,
	InterestActionTypes
	
} from '../actions/admin-interest.action';

// Create new interface for reducer
export interface InterestState {
	interest: any;
    interestList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const INTEREST_INITIAL_STATE: InterestState = {
	interest: {},
    interestList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Interest 
	@param 
		state: value (interest, pending, error)
		action: from action type
*/
export const InterestReducer = (
	state: InterestState = INTEREST_INITIAL_STATE,
	action: InterestAction,
	): InterestState => {
		switch (action.type){

			case InterestActionTypes.GET_INTEREST:
			return { ...state, pending: true };

			case InterestActionTypes.GET_INTEREST_SUCCESS:
			return { ...state, interest: action.payload, pending: false }

			case InterestActionTypes.GET_INTEREST_FAIL:
			return { ...state, pending: false, error: action.payload }

            case InterestActionTypes.GET_INTEREST_LIST:
            return { ...state, pending: true };

            case InterestActionTypes.GET_INTEREST_LIST_SUCCESS:
            return { ...state, interestList: action.payload, pending: false }

            case InterestActionTypes.GET_INTEREST_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case InterestActionTypes.SAVE_INTEREST:
			return { ...state, pending: true };

			case InterestActionTypes.SAVE_INTEREST_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case InterestActionTypes.SAVE_INTEREST_FAIL:
			return { ...state, pending: false, error: action.payload }

			case InterestActionTypes.EDIT_INTEREST:
			return { ...state, pending: true };

			case InterestActionTypes.EDIT_INTEREST_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case InterestActionTypes.EDIT_INTEREST_FAIL:
			return { ...state, pending: false, error: action.payload }

			case InterestActionTypes.DELETE_INTEREST:
			return { ...state, pending: true };

			case InterestActionTypes.DELETE_INTEREST_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case InterestActionTypes.DELETE_INTEREST_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

import { 
	ReferralAction,
	ReferralActionTypes
	
} from '../actions/admin-referral.action';

// Create new interface for reducer
export interface ReferralState {
	referral: any;
    referralList: any;
	pending: any;
	pendingSave: any;
	error: any;
	success: any;
	successEdit: any;
}

// Set initial state of the data
export const REFERRAL_INITIAL_STATE: ReferralState = {
	referral: {},
    referralList: [],
	pending: false,
	pendingSave: false,
	error: null,
	success: null,
	successEdit: null
}


/*
	Create Reducer
	Take 2 Parameter: from Referral 
	@param 
		state: value (referral, pending, error)
		action: from action type
*/
export const ReferralReducer = (
	state: ReferralState = REFERRAL_INITIAL_STATE,
	action: ReferralAction,
	): ReferralState => {
		switch (action.type){

			case ReferralActionTypes.GET_REFERRAL:
			return { ...state, pending: true, referral: {} };

			case ReferralActionTypes.GET_REFERRAL_SUCCESS:
			return { ...state, referral: action.payload, pending: false }

			case ReferralActionTypes.GET_REFERRAL_FAIL:
			return { ...state, pending: false, error: action.payload }

            case ReferralActionTypes.GET_REFERRAL_LIST:
            return { ...state, pending: true };

            case ReferralActionTypes.GET_REFERRAL_LIST_SUCCESS:
            return { ...state, referralList: action.payload, pending: false }

            case ReferralActionTypes.GET_REFERRAL_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case ReferralActionTypes.SAVE_REFERRAL:
			return { ...state, pending: true };

			case ReferralActionTypes.SAVE_REFERRAL_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ReferralActionTypes.SAVE_REFERRAL_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ReferralActionTypes.EDIT_REFERRAL:
			return { ...state, pending: true, successEdit: false };

			case ReferralActionTypes.EDIT_REFERRAL_SUCCESS:
			return { ...state, successEdit: action.payload.message, pending: false }

			case ReferralActionTypes.EDIT_REFERRAL_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ReferralActionTypes.EDIT_REFERRAL_DETAILS:
			return { ...state, pending: true, successEdit: false };

			case ReferralActionTypes.EDIT_REFERRAL_DETAILS_SUCCESS:
			return { ...state, successEdit: action.payload.message, pending: false }

			case ReferralActionTypes.EDIT_REFERRAL_DETAILS_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ReferralActionTypes.DELETE_REFERRAL:
			return { ...state, pending: true };

			case ReferralActionTypes.DELETE_REFERRAL_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ReferralActionTypes.DELETE_REFERRAL_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ReferralActionTypes.DELETE_REFERRAL_COMMENT:
			return { ...state, pending: true };

			case ReferralActionTypes.DELETE_REFERRAL_COMMENT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ReferralActionTypes.DELETE_REFERRAL_COMMENT_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

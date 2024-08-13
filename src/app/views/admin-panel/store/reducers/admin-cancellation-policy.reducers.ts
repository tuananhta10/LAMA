import { 
	CancellationPolicyAction,
	CancellationPolicyActionTypes
	
} from '../actions/admin-cancellation-policy.action';

// Create new interface for reducer
export interface CancellationPolicyState {
	cancellationPolicy: any;
    cancellationPolicyList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const CANCELLATION_POLICY_INITIAL_STATE: CancellationPolicyState = {
	cancellationPolicy: {},
    cancellationPolicyList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from CancellationPolicy 
	@param 
		state: value (cancellationPolicy, pending, error)
		action: from action type
*/
export const CancellationPolicyReducer = (
	state: CancellationPolicyState = CANCELLATION_POLICY_INITIAL_STATE,
	action: CancellationPolicyAction,
	): CancellationPolicyState => {
		switch (action.type){

			case CancellationPolicyActionTypes.GET_CANCELLATION_POLICY:
			return { ...state, pending: true };

			case CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_SUCCESS:
			return { ...state, cancellationPolicy: action.payload, pending: false }

			case CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_FAIL:
			return { ...state, pending: false, error: action.payload }

            case CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST:
            return { ...state, pending: true };

            case CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST_SUCCESS:
            return { ...state, cancellationPolicyList: action.payload, pending: false }

            case CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY:
			return { ...state, pending: true };

			case CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY_FAIL:
			return { ...state, pending: false, error: action.payload }

			case CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY:
			return { ...state, pending: true };

			case CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY_FAIL:
			return { ...state, pending: false, error: action.payload }

			case CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY:
			return { ...state, pending: true };

			case CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

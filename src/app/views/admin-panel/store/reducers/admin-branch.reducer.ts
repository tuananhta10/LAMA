import { 
	BranchAction,
	BranchActionTypes
	
} from '../actions/admin-branch.action';

// Create new interface for reducer
export interface BranchState {
	branch: any;
    branchList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const BRANCH_INITIAL_STATE: BranchState = {
	branch: null,
    branchList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Branch 
	@param 
		state: value (branch, pending, error)
		action: from action type
*/
export const BranchReducer = (
	state: BranchState = BRANCH_INITIAL_STATE,
	action: BranchAction,
	): BranchState => {
		switch (action.type){

			case BranchActionTypes.GET_BRANCH:
			return { ...state, pending: true };

			case BranchActionTypes.GET_BRANCH_SUCCESS:
			return { ...state, branch: action.payload, pending: false }

			case BranchActionTypes.GET_BRANCH_FAIL:
			return { ...state, pending: false, error: action.payload }

            case BranchActionTypes.GET_BRANCH_LIST:
            return { ...state, pending: true };

            case BranchActionTypes.GET_BRANCH_LIST_SUCCESS:
            return { ...state, branchList: action.payload, pending: false }

            case BranchActionTypes.GET_BRANCH_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case BranchActionTypes.SAVE_BRANCH:
			return { ...state, pending: true };

			case BranchActionTypes.SAVE_BRANCH_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case BranchActionTypes.SAVE_BRANCH_FAIL:
			return { ...state, pending: false, error: action.payload.message }

			case BranchActionTypes.EDIT_BRANCH:
			return { ...state, pending: true };

			case BranchActionTypes.EDIT_BRANCH_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case BranchActionTypes.EDIT_BRANCH_FAIL:
			return { ...state, pending: false, error: action.payload.message }

			case BranchActionTypes.DELETE_BRANCH:
			return { ...state, pending: true };

			case BranchActionTypes.DELETE_BRANCH_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case BranchActionTypes.DELETE_BRANCH_FAIL:
			return { ...state, pending: false, error: action.payload.message }

			default:
			return state;
		}
	}
	

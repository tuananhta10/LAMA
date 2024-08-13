import { 
	JobTypesAction,
	JobTypesActionTypes
	
} from '../actions/admin-job-types.action';

// Create new interface for reducer
export interface JobTypesState {
	jobTypes: any;
    jobTypesList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const JOB_TYPES_INITIAL_STATE: JobTypesState = {
	jobTypes: {},
    jobTypesList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from JobTypes 
	@param 
		state: value (jobTypes, pending, error)
		action: from action type
*/
export const JobTypesReducer = (
	state: JobTypesState = JOB_TYPES_INITIAL_STATE,
	action: JobTypesAction,
	): JobTypesState => {
		switch (action.type){

			case JobTypesActionTypes.GET_JOB_TYPES:
			return { ...state, pending: true };

			case JobTypesActionTypes.GET_JOB_TYPES_SUCCESS:
			return { ...state, jobTypes: action.payload, pending: false }

			case JobTypesActionTypes.GET_JOB_TYPES_FAIL:
			return { ...state, pending: false, error: action.payload }

            case JobTypesActionTypes.GET_JOB_TYPES_LIST:
            return { ...state, pending: true };

            case JobTypesActionTypes.GET_JOB_TYPES_LIST_SUCCESS:
            return { ...state, jobTypesList: action.payload, pending: false }

            case JobTypesActionTypes.GET_JOB_TYPES_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case JobTypesActionTypes.SAVE_JOB_TYPES:
			return { ...state, pending: true };

			case JobTypesActionTypes.SAVE_JOB_TYPES_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case JobTypesActionTypes.SAVE_JOB_TYPES_FAIL:
			return { ...state, pending: false, error: action.payload }

			case JobTypesActionTypes.EDIT_JOB_TYPES:
			return { ...state, pending: true };

			case JobTypesActionTypes.EDIT_JOB_TYPES_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case JobTypesActionTypes.EDIT_JOB_TYPES_FAIL:
			return { ...state, pending: false, error: action.payload }

			case JobTypesActionTypes.DELETE_JOB_TYPES:
			return { ...state, pending: true };

			case JobTypesActionTypes.DELETE_JOB_TYPES_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case JobTypesActionTypes.DELETE_JOB_TYPES_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

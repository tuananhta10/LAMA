import { 
	QualificationAction,
	QualificationActionTypes
	
} from '../actions/admin-qualification.action';

// Create new interface for reducer
export interface QualificationState {
	qualification: any;
    qualificationList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const QUALIFICATION_INITIAL_STATE: QualificationState = {
	qualification: {},
    qualificationList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Qualification 
	@param 
		state: value (qualification, pending, error)
		action: from action type
*/
export const QualificationReducer = (
	state: QualificationState = QUALIFICATION_INITIAL_STATE,
	action: QualificationAction,
	): QualificationState => {
		switch (action.type){

			case QualificationActionTypes.GET_QUALIFICATION:
			return { ...state, pending: true };

			case QualificationActionTypes.GET_QUALIFICATION_SUCCESS:
			return { ...state, qualification: action.payload, pending: false }

			case QualificationActionTypes.GET_QUALIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

            case QualificationActionTypes.GET_QUALIFICATION_LIST:
            return { ...state, pending: true };

            case QualificationActionTypes.GET_QUALIFICATION_LIST_SUCCESS:
            return { ...state, qualificationList: action.payload, pending: false }

            case QualificationActionTypes.GET_QUALIFICATION_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case QualificationActionTypes.SAVE_QUALIFICATION:
			return { ...state, pending: true };

			case QualificationActionTypes.SAVE_QUALIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case QualificationActionTypes.SAVE_QUALIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case QualificationActionTypes.EDIT_QUALIFICATION:
			return { ...state, pending: true };

			case QualificationActionTypes.EDIT_QUALIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case QualificationActionTypes.EDIT_QUALIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case QualificationActionTypes.DELETE_QUALIFICATION:
			return { ...state, pending: true };

			case QualificationActionTypes.DELETE_QUALIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case QualificationActionTypes.DELETE_QUALIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

import { 
	LanguageAction,
	LanguageActionTypes
	
} from '../actions/admin-language.action';

// Create new interface for reducer
export interface LanguageState {
	language: any;
    languageList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const LANGUAGE_INITIAL_STATE: LanguageState = {
	language: {},
    languageList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Language 
	@param 
		state: value (language, pending, error)
		action: from action type
*/
export const LanguageReducer = (
	state: LanguageState = LANGUAGE_INITIAL_STATE,
	action: LanguageAction,
	): LanguageState => {
		switch (action.type){

			case LanguageActionTypes.GET_LANGUAGE:
			return { ...state, pending: true };

			case LanguageActionTypes.GET_LANGUAGE_SUCCESS:
			return { ...state, language: action.payload, pending: false }

			case LanguageActionTypes.GET_LANGUAGE_FAIL:
			return { ...state, pending: false, error: action.payload }

            case LanguageActionTypes.GET_LANGUAGE_LIST:
            return { ...state, pending: true };

            case LanguageActionTypes.GET_LANGUAGE_LIST_SUCCESS:
            return { ...state, languageList: action.payload, pending: false }

            case LanguageActionTypes.GET_LANGUAGE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case LanguageActionTypes.SAVE_LANGUAGE:
			return { ...state, pending: true };

			case LanguageActionTypes.SAVE_LANGUAGE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case LanguageActionTypes.SAVE_LANGUAGE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case LanguageActionTypes.EDIT_LANGUAGE:
			return { ...state, pending: true };

			case LanguageActionTypes.EDIT_LANGUAGE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case LanguageActionTypes.EDIT_LANGUAGE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case LanguageActionTypes.DELETE_LANGUAGE:
			return { ...state, pending: true };

			case LanguageActionTypes.DELETE_LANGUAGE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case LanguageActionTypes.DELETE_LANGUAGE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

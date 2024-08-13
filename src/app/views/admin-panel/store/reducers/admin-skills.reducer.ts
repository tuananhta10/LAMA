import { 
	SkillsAction,
	SkillsActionTypes
	
} from '../actions/admin-skills.action';

// Create new interface for reducer
export interface SkillsState {
	skill: any;
    skillList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const SKILLS_INITIAL_STATE: SkillsState = {
	skill: {},
    skillList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Skills 
	@param 
		state: value (skill, pending, error)
		action: from action type
*/
export const SkillsReducer = (
	state: SkillsState = SKILLS_INITIAL_STATE,
	action: SkillsAction,
	): SkillsState => {
		switch (action.type){

			case SkillsActionTypes.GET_SKILLS:
			return { ...state, pending: true };

			case SkillsActionTypes.GET_SKILLS_SUCCESS:
			return { ...state, skill: action.payload, pending: false }

			case SkillsActionTypes.GET_SKILLS_FAIL:
			return { ...state, pending: false, error: action.payload }

            case SkillsActionTypes.GET_SKILLS_LIST:
            return { ...state, pending: true };

            case SkillsActionTypes.GET_SKILLS_LIST_SUCCESS:
            return { ...state, skillList: action.payload, pending: false }

            case SkillsActionTypes.GET_SKILLS_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case SkillsActionTypes.SAVE_SKILLS:
			return { ...state, pending: true };

			case SkillsActionTypes.SAVE_SKILLS_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case SkillsActionTypes.SAVE_SKILLS_FAIL:
			return { ...state, pending: false, error: action.payload }

			case SkillsActionTypes.EDIT_SKILLS:
			return { ...state, pending: true };

			case SkillsActionTypes.EDIT_SKILLS_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case SkillsActionTypes.EDIT_SKILLS_FAIL:
			return { ...state, pending: false, error: action.payload }

			case SkillsActionTypes.DELETE_SKILLS:
			return { ...state, pending: true };

			case SkillsActionTypes.DELETE_SKILLS_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case SkillsActionTypes.DELETE_SKILLS_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

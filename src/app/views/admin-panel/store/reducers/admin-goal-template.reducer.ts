import { 
	GoalTemplateAction,
	GoalTemplateActionTypes
	
} from '../actions/admin-goal-template.action';

// Create new interface for reducer
export interface GoalTemplateState {
	goalTemplate: any;
    goalTemplateList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const GOAL_TEMPLATE_INITIAL_STATE: GoalTemplateState = {
	goalTemplate: {},
    goalTemplateList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from GoalTemplate 
	@param 
		state: value (goalTemplate, pending, error)
		action: from action type
*/
export const GoalTemplateReducer = (
	state: GoalTemplateState = GOAL_TEMPLATE_INITIAL_STATE,
	action: GoalTemplateAction,
	): GoalTemplateState => {
		switch (action.type){

			case GoalTemplateActionTypes.GET_GOAL_TEMPLATE:
			return { ...state, pending: true };

			case GoalTemplateActionTypes.GET_GOAL_TEMPLATE_SUCCESS:
			return { ...state, goalTemplate: action.payload, pending: false }

			case GoalTemplateActionTypes.GET_GOAL_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

            case GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST:
            return { ...state, pending: true };

            case GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST_SUCCESS:
            return { ...state, goalTemplateList: action.payload, pending: false }

            case GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE:
			return { ...state, pending: true };

			case GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE:
			return { ...state, pending: true };

			case GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE:
			return { ...state, pending: true };

			case GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

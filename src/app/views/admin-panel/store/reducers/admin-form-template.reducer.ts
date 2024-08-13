import { 
	FormTemplateAction,
	FormTemplateActionTypes
	
} from '../actions/admin-form-template.action';

// Create new interface for reducer
export interface FormTemplateState {
	formTemplate: any;
    formTemplateList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const FORM_TEMPLATE_INITIAL_STATE: FormTemplateState = {
	formTemplate: {},
    formTemplateList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from FormTemplate 
	@param 
		state: value (formTemplate, pending, error)
		action: from action type
*/
export const FormTemplateReducer = (
	state: FormTemplateState = FORM_TEMPLATE_INITIAL_STATE,
	action: FormTemplateAction,
	): FormTemplateState => {
		switch (action.type){

			case FormTemplateActionTypes.GET_FORM_TEMPLATE:
			return { ...state, pending: true };

			case FormTemplateActionTypes.GET_FORM_TEMPLATE_SUCCESS:
			return { ...state, formTemplate: action.payload, pending: false }

			case FormTemplateActionTypes.GET_FORM_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

            case FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST:
            return { ...state, pending: true };

            case FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST_SUCCESS:
            return { ...state, formTemplateList: action.payload, pending: false }

            case FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case FormTemplateActionTypes.SAVE_FORM_TEMPLATE:
			return { ...state, pending: true };

			case FormTemplateActionTypes.SAVE_FORM_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case FormTemplateActionTypes.SAVE_FORM_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case FormTemplateActionTypes.EDIT_FORM_TEMPLATE:
			return { ...state, pending: true };

			case FormTemplateActionTypes.EDIT_FORM_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case FormTemplateActionTypes.EDIT_FORM_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case FormTemplateActionTypes.DELETE_FORM_TEMPLATE:
			return { ...state, pending: true };

			case FormTemplateActionTypes.DELETE_FORM_TEMPLATE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case FormTemplateActionTypes.DELETE_FORM_TEMPLATE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

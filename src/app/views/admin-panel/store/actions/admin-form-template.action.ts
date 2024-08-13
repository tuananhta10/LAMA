import { Action } from '@ngrx/store';

/* FOR FORM_TEMPLATE  
*/
export const enum FormTemplateActionTypes {
	GET_FORM_TEMPLATE = '[FormTemplate] Get FormTemplate', 
	GET_FORM_TEMPLATE_SUCCESS = '[FormTemplate] Get FormTemplate Success', 
	GET_FORM_TEMPLATE_FAIL = '[FormTemplate] Get FormTemplate Fail', 

    GET_FORM_TEMPLATE_LIST = '[FormTemplate] Get FormTemplate list', 
	GET_FORM_TEMPLATE_LIST_SUCCESS = '[FormTemplate] Get FormTemplate list Success', 
	GET_FORM_TEMPLATE_LIST_FAIL = '[FormTemplate] Get FormTemplate list Fail',

	SAVE_FORM_TEMPLATE = '[FormTemplate] Save FormTemplate', 
	SAVE_FORM_TEMPLATE_SUCCESS = '[FormTemplate] Save FormTemplate Success', 
	SAVE_FORM_TEMPLATE_FAIL = '[FormTemplate] Save FormTemplate Fail',
	
	EDIT_FORM_TEMPLATE = '[FormTemplate] Edit FormTemplate', 
	EDIT_FORM_TEMPLATE_SUCCESS = '[FormTemplate] Edit FormTemplate Success', 
	EDIT_FORM_TEMPLATE_FAIL = '[FormTemplate] Edit FormTemplate Fail',

	DELETE_FORM_TEMPLATE = '[FormTemplate] Delete FormTemplate', 
	DELETE_FORM_TEMPLATE_SUCCESS = '[FormTemplate] Delete FormTemplate Success', 
	DELETE_FORM_TEMPLATE_FAIL = '[FormTemplate] Delete FormTemplate Fail',
}

export class GetFormTemplate implements Action {
	public readonly type = FormTemplateActionTypes.GET_FORM_TEMPLATE;
	constructor(public payload: any) { }
}

export class GetFormTemplateSuccess implements Action {
	public readonly type = FormTemplateActionTypes.GET_FORM_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetFormTemplateFail implements Action {
	public readonly type = FormTemplateActionTypes.GET_FORM_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class GetFormTemplateList implements Action {
	public readonly type = FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST;
	constructor(public payload: any) { }
}

export class GetFormTemplateListSuccess implements Action {
	public readonly type = FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetFormTemplateListFail implements Action {
	public readonly type = FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveFormTemplate implements Action {
	public readonly type = FormTemplateActionTypes.SAVE_FORM_TEMPLATE;
	constructor(public payload: any) { }
}

export class SaveFormTemplateSuccess implements Action {
	public readonly type = FormTemplateActionTypes.SAVE_FORM_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveFormTemplateFail implements Action {
	public readonly type = FormTemplateActionTypes.SAVE_FORM_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class EditFormTemplate implements Action {
	public readonly type = FormTemplateActionTypes.EDIT_FORM_TEMPLATE;
	constructor(public payload: any) { }
}

export class EditFormTemplateSuccess implements Action {
	public readonly type = FormTemplateActionTypes.EDIT_FORM_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditFormTemplateFail implements Action {
	public readonly type = FormTemplateActionTypes.EDIT_FORM_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteFormTemplate implements Action {
	public readonly type = FormTemplateActionTypes.DELETE_FORM_TEMPLATE;
	constructor(public payload: any) { }
}

export class DeleteFormTemplateSuccess implements Action {
	public readonly type = FormTemplateActionTypes.DELETE_FORM_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteFormTemplateFail implements Action {
	public readonly type = FormTemplateActionTypes.DELETE_FORM_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}


export type FormTemplateAction =
	GetFormTemplate
|	GetFormTemplateSuccess
|  	GetFormTemplateFail
|   GetFormTemplateList
|   GetFormTemplateListSuccess
|   GetFormTemplateListFail
|	SaveFormTemplate
|	SaveFormTemplateSuccess
|	SaveFormTemplateFail
|	EditFormTemplate
|	EditFormTemplateSuccess
|	EditFormTemplateFail
|   DeleteFormTemplate
|	DeleteFormTemplateSuccess
|	DeleteFormTemplateFail;



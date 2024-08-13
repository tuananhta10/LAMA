import { Action } from '@ngrx/store';

/* FOR COMMUNICATION_TEMPLATE  
*/
export const enum CommunicationTemplateActionTypes {
	GET_COMMUNICATION_TEMPLATE = '[CommunicationTemplate] Get CommunicationTemplate', 
	GET_COMMUNICATION_TEMPLATE_SUCCESS = '[CommunicationTemplate] Get CommunicationTemplate Success', 
	GET_COMMUNICATION_TEMPLATE_FAIL = '[CommunicationTemplate] Get CommunicationTemplate Fail', 

    GET_COMMUNICATION_TEMPLATE_LIST = '[CommunicationTemplate] Get CommunicationTemplate list', 
	GET_COMMUNICATION_TEMPLATE_LIST_SUCCESS = '[CommunicationTemplate] Get CommunicationTemplate list Success', 
	GET_COMMUNICATION_TEMPLATE_LIST_FAIL = '[CommunicationTemplate] Get CommunicationTemplate list Fail',

	SAVE_COMMUNICATION_TEMPLATE = '[CommunicationTemplate] Save CommunicationTemplate', 
	SAVE_COMMUNICATION_TEMPLATE_SUCCESS = '[CommunicationTemplate] Save CommunicationTemplate Success', 
	SAVE_COMMUNICATION_TEMPLATE_FAIL = '[CommunicationTemplate] Save CommunicationTemplate Fail',
	
	EDIT_COMMUNICATION_TEMPLATE = '[CommunicationTemplate] Edit CommunicationTemplate', 
	EDIT_COMMUNICATION_TEMPLATE_SUCCESS = '[CommunicationTemplate] Edit CommunicationTemplate Success', 
	EDIT_COMMUNICATION_TEMPLATE_FAIL = '[CommunicationTemplate] Edit CommunicationTemplate Fail',

	DELETE_COMMUNICATION_TEMPLATE = '[CommunicationTemplate] Delete CommunicationTemplate', 
	DELETE_COMMUNICATION_TEMPLATE_SUCCESS = '[CommunicationTemplate] Delete CommunicationTemplate Success', 
	DELETE_COMMUNICATION_TEMPLATE_FAIL = '[CommunicationTemplate] Delete CommunicationTemplate Fail',
}

export class GetCommunicationTemplate implements Action {
	public readonly type = CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE;
	constructor(public payload: any) { }
}

export class GetCommunicationTemplateSuccess implements Action {
	public readonly type = CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetCommunicationTemplateFail implements Action {
	public readonly type = CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class GetCommunicationTemplateList implements Action {
	public readonly type = CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST;
	constructor(public payload: any) { }
}

export class GetCommunicationTemplateListSuccess implements Action {
	public readonly type = CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetCommunicationTemplateListFail implements Action {
	public readonly type = CommunicationTemplateActionTypes.GET_COMMUNICATION_TEMPLATE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveCommunicationTemplate implements Action {
	public readonly type = CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE;
	constructor(public payload: any) { }
}

export class SaveCommunicationTemplateSuccess implements Action {
	public readonly type = CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveCommunicationTemplateFail implements Action {
	public readonly type = CommunicationTemplateActionTypes.SAVE_COMMUNICATION_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class EditCommunicationTemplate implements Action {
	public readonly type = CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE;
	constructor(public payload: any) { }
}

export class EditCommunicationTemplateSuccess implements Action {
	public readonly type = CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditCommunicationTemplateFail implements Action {
	public readonly type = CommunicationTemplateActionTypes.EDIT_COMMUNICATION_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteCommunicationTemplate implements Action {
	public readonly type = CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE;
	constructor(public payload: any) { }
}

export class DeleteCommunicationTemplateSuccess implements Action {
	public readonly type = CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteCommunicationTemplateFail implements Action {
	public readonly type = CommunicationTemplateActionTypes.DELETE_COMMUNICATION_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export type CommunicationTemplateAction =
	GetCommunicationTemplate
|	GetCommunicationTemplateSuccess
|  	GetCommunicationTemplateFail
|   GetCommunicationTemplateList
|   GetCommunicationTemplateListSuccess
|   GetCommunicationTemplateListFail
|	SaveCommunicationTemplate
|	SaveCommunicationTemplateSuccess
|	SaveCommunicationTemplateFail
|	EditCommunicationTemplate
|	EditCommunicationTemplateSuccess
|	EditCommunicationTemplateFail
|	DeleteCommunicationTemplate
|	DeleteCommunicationTemplateSuccess
|	DeleteCommunicationTemplateFail;



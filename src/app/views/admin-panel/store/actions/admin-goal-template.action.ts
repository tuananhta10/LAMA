import { Action } from '@ngrx/store';

/* FOR GOAL_TEMPLATE  
*/
export const enum GoalTemplateActionTypes {
	GET_GOAL_TEMPLATE = '[GoalTemplate] Get GoalTemplate', 
	GET_GOAL_TEMPLATE_SUCCESS = '[GoalTemplate] Get GoalTemplate Success', 
	GET_GOAL_TEMPLATE_FAIL = '[GoalTemplate] Get GoalTemplate Fail', 

    GET_GOAL_TEMPLATE_LIST = '[GoalTemplate] Get GoalTemplate list', 
	GET_GOAL_TEMPLATE_LIST_SUCCESS = '[GoalTemplate] Get GoalTemplate list Success', 
	GET_GOAL_TEMPLATE_LIST_FAIL = '[GoalTemplate] Get GoalTemplate list Fail',

	SAVE_GOAL_TEMPLATE = '[GoalTemplate] Save GoalTemplate', 
	SAVE_GOAL_TEMPLATE_SUCCESS = '[GoalTemplate] Save GoalTemplate Success', 
	SAVE_GOAL_TEMPLATE_FAIL = '[GoalTemplate] Save GoalTemplate Fail',
	
	EDIT_GOAL_TEMPLATE = '[GoalTemplate] Edit GoalTemplate', 
	EDIT_GOAL_TEMPLATE_SUCCESS = '[GoalTemplate] Edit GoalTemplate Success', 
	EDIT_GOAL_TEMPLATE_FAIL = '[GoalTemplate] Edit GoalTemplate Fail',

	DELETE_GOAL_TEMPLATE = '[GoalTemplate] Delete GoalTemplate', 
	DELETE_GOAL_TEMPLATE_SUCCESS = '[GoalTemplate] Delete GoalTemplate Success', 
	DELETE_GOAL_TEMPLATE_FAIL = '[GoalTemplate] Delete GoalTemplate Fail',
}

export class GetGoalTemplate implements Action {
	public readonly type = GoalTemplateActionTypes.GET_GOAL_TEMPLATE;
	constructor(public payload: any) { }
}

export class GetGoalTemplateSuccess implements Action {
	public readonly type = GoalTemplateActionTypes.GET_GOAL_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetGoalTemplateFail implements Action {
	public readonly type = GoalTemplateActionTypes.GET_GOAL_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class GetGoalTemplateList implements Action {
	public readonly type = GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST;
	constructor(public payload: any) { }
}

export class GetGoalTemplateListSuccess implements Action {
	public readonly type = GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetGoalTemplateListFail implements Action {
	public readonly type = GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveGoalTemplate implements Action {
	public readonly type = GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE;
	constructor(public payload: any) { }
}

export class SaveGoalTemplateSuccess implements Action {
	public readonly type = GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveGoalTemplateFail implements Action {
	public readonly type = GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class EditGoalTemplate implements Action {
	public readonly type = GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE;
	constructor(public payload: any) { }
}

export class EditGoalTemplateSuccess implements Action {
	public readonly type = GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditGoalTemplateFail implements Action {
	public readonly type = GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteGoalTemplate implements Action {
	public readonly type = GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE;
	constructor(public payload: any) { }
}

export class DeleteGoalTemplateSuccess implements Action {
	public readonly type = GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteGoalTemplateFail implements Action {
	public readonly type = GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export type GoalTemplateAction =
	GetGoalTemplate
|	GetGoalTemplateSuccess
|  	GetGoalTemplateFail
|   GetGoalTemplateList
|   GetGoalTemplateListSuccess
|   GetGoalTemplateListFail
|	SaveGoalTemplate
|	SaveGoalTemplateSuccess
|	SaveGoalTemplateFail
|	EditGoalTemplate
|	EditGoalTemplateSuccess
|	EditGoalTemplateFail
|	DeleteGoalTemplate
|	DeleteGoalTemplateSuccess
|	DeleteGoalTemplateFail;



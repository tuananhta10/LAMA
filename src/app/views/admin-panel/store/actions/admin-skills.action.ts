import { Action } from '@ngrx/store';

/* FOR SKILLS  
*/
export const enum SkillsActionTypes {
	GET_SKILLS = '[Skills] Get Skills', 
	GET_SKILLS_SUCCESS = '[Skills] Get Skills Success', 
	GET_SKILLS_FAIL = '[Skills] Get Skills Fail', 

    GET_SKILLS_LIST = '[Skills] Get Skills list', 
	GET_SKILLS_LIST_SUCCESS = '[Skills] Get Skills list Success', 
	GET_SKILLS_LIST_FAIL = '[Skills] Get Skills list Fail',

	SAVE_SKILLS = '[Skills] Save Skills', 
	SAVE_SKILLS_SUCCESS = '[Skills] Save Skills Success', 
	SAVE_SKILLS_FAIL = '[Skills] Save Skills Fail',
	
	EDIT_SKILLS = '[Skills] Edit Skills', 
	EDIT_SKILLS_SUCCESS = '[Skills] Edit Skills Success', 
	EDIT_SKILLS_FAIL = '[Skills] Edit Skills Fail',

	DELETE_SKILLS = '[Skills] Delete Skills', 
	DELETE_SKILLS_SUCCESS = '[Skills] Delete Skills Success', 
	DELETE_SKILLS_FAIL = '[Skills] Delete Skills Fail',
}

export class GetSkills implements Action {
	public readonly type = SkillsActionTypes.GET_SKILLS;
	constructor(public payload: any) { }
}

export class GetSkillsSuccess implements Action {
	public readonly type = SkillsActionTypes.GET_SKILLS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetSkillsFail implements Action {
	public readonly type = SkillsActionTypes.GET_SKILLS_FAIL;
	constructor(public payload: any) { }
}

export class GetSkillsList implements Action {
	public readonly type = SkillsActionTypes.GET_SKILLS_LIST;
	constructor(public payload: any) { }
}

export class GetSkillsListSuccess implements Action {
	public readonly type = SkillsActionTypes.GET_SKILLS_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetSkillsListFail implements Action {
	public readonly type = SkillsActionTypes.GET_SKILLS_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveSkills implements Action {
	public readonly type = SkillsActionTypes.SAVE_SKILLS;
	constructor(public payload: any) { }
}

export class SaveSkillsSuccess implements Action {
	public readonly type = SkillsActionTypes.SAVE_SKILLS_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveSkillsFail implements Action {
	public readonly type = SkillsActionTypes.SAVE_SKILLS_FAIL;
	constructor(public payload: any) { }
}

export class EditSkills implements Action {
	public readonly type = SkillsActionTypes.EDIT_SKILLS;
	constructor(public payload: any) { }
}

export class EditSkillsSuccess implements Action {
	public readonly type = SkillsActionTypes.EDIT_SKILLS_SUCCESS;
	constructor(public payload: any) { }
}

export class EditSkillsFail implements Action {
	public readonly type = SkillsActionTypes.EDIT_SKILLS_FAIL;
	constructor(public payload: any) { }
}

export class DeleteSkills implements Action {
	public readonly type = SkillsActionTypes.DELETE_SKILLS;
	constructor(public payload: any) { }
}

export class DeleteSkillsSuccess implements Action {
	public readonly type = SkillsActionTypes.DELETE_SKILLS_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteSkillsFail implements Action {
	public readonly type = SkillsActionTypes.DELETE_SKILLS_FAIL;
	constructor(public payload: any) { }
}

export type SkillsAction =
	GetSkills
|	GetSkillsSuccess
|  	GetSkillsFail
|   GetSkillsList
|   GetSkillsListSuccess
|   GetSkillsListFail
|	SaveSkills
|	SaveSkillsSuccess
|	SaveSkillsFail
|	EditSkills
|	EditSkillsSuccess
|	EditSkillsFail
|	DeleteSkills
|	DeleteSkillsSuccess
|	DeleteSkillsFail;



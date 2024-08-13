import { Action } from '@ngrx/store';

/* FOR JOB_TYPES  
*/
export const enum JobTypesActionTypes {
	GET_JOB_TYPES = '[JobTypes] Get JobTypes', 
	GET_JOB_TYPES_SUCCESS = '[JobTypes] Get JobTypes Success', 
	GET_JOB_TYPES_FAIL = '[JobTypes] Get JobTypes Fail', 

    GET_JOB_TYPES_LIST = '[JobTypes] Get JobTypes list', 
	GET_JOB_TYPES_LIST_SUCCESS = '[JobTypes] Get JobTypes list Success', 
	GET_JOB_TYPES_LIST_FAIL = '[JobTypes] Get JobTypes list Fail',

	SAVE_JOB_TYPES = '[JobTypes] Save JobTypes', 
	SAVE_JOB_TYPES_SUCCESS = '[JobTypes] Save JobTypes Success', 
	SAVE_JOB_TYPES_FAIL = '[JobTypes] Save JobTypes Fail',
	
	EDIT_JOB_TYPES = '[JobTypes] Edit JobTypes', 
	EDIT_JOB_TYPES_SUCCESS = '[JobTypes] Edit JobTypes Success', 
	EDIT_JOB_TYPES_FAIL = '[JobTypes] Edit JobTypes Fail',

	DELETE_JOB_TYPES = '[JobTypes] Delete JobTypes', 
	DELETE_JOB_TYPES_SUCCESS = '[JobTypes] Delete JobTypes Success', 
	DELETE_JOB_TYPES_FAIL = '[JobTypes] Delete JobTypes Fail',
}

export class GetJobTypes implements Action {
	public readonly type = JobTypesActionTypes.GET_JOB_TYPES;
	constructor(public payload: any) { }
}

export class GetJobTypesSuccess implements Action {
	public readonly type = JobTypesActionTypes.GET_JOB_TYPES_SUCCESS;
	constructor(public payload: any) { }
}

export class GetJobTypesFail implements Action {
	public readonly type = JobTypesActionTypes.GET_JOB_TYPES_FAIL;
	constructor(public payload: any) { }
}

export class GetJobTypesList implements Action {
	public readonly type = JobTypesActionTypes.GET_JOB_TYPES_LIST;
	constructor(public payload: any) { }
}

export class GetJobTypesListSuccess implements Action {
	public readonly type = JobTypesActionTypes.GET_JOB_TYPES_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetJobTypesListFail implements Action {
	public readonly type = JobTypesActionTypes.GET_JOB_TYPES_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveJobTypes implements Action {
	public readonly type = JobTypesActionTypes.SAVE_JOB_TYPES;
	constructor(public payload: any) { }
}

export class SaveJobTypesSuccess implements Action {
	public readonly type = JobTypesActionTypes.SAVE_JOB_TYPES_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveJobTypesFail implements Action {
	public readonly type = JobTypesActionTypes.SAVE_JOB_TYPES_FAIL;
	constructor(public payload: any) { }
}

export class EditJobTypes implements Action {
	public readonly type = JobTypesActionTypes.EDIT_JOB_TYPES;
	constructor(public payload: any) { }
}

export class EditJobTypesSuccess implements Action {
	public readonly type = JobTypesActionTypes.EDIT_JOB_TYPES_SUCCESS;
	constructor(public payload: any) { }
}

export class EditJobTypesFail implements Action {
	public readonly type = JobTypesActionTypes.EDIT_JOB_TYPES_FAIL;
	constructor(public payload: any) { }
}

export class DeleteJobTypes implements Action {
	public readonly type = JobTypesActionTypes.DELETE_JOB_TYPES;
	constructor(public payload: any) { }
}

export class DeleteJobTypesSuccess implements Action {
	public readonly type = JobTypesActionTypes.DELETE_JOB_TYPES_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteJobTypesFail implements Action {
	public readonly type = JobTypesActionTypes.DELETE_JOB_TYPES_FAIL;
	constructor(public payload: any) { }
}

export type JobTypesAction =
	GetJobTypes
|	GetJobTypesSuccess
|  	GetJobTypesFail
|   GetJobTypesList
|   GetJobTypesListSuccess
|   GetJobTypesListFail
|	SaveJobTypes
|	SaveJobTypesSuccess
|	SaveJobTypesFail
|	EditJobTypes
|	EditJobTypesSuccess
|	EditJobTypesFail
|	DeleteJobTypes
|	DeleteJobTypesSuccess
|	DeleteJobTypesFail;



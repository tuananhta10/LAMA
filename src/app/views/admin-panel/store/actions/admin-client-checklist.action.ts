import { Action } from '@ngrx/store';

/* FOR CLIENT_CHECKLIST  
*/
export const enum ClientChecklistActionTypes {
	GET_CLIENT_CHECKLIST = '[ClientChecklist] Get ClientChecklist', 
	GET_CLIENT_CHECKLIST_SUCCESS = '[ClientChecklist] Get ClientChecklist Success', 
	GET_CLIENT_CHECKLIST_FAIL = '[ClientChecklist] Get ClientChecklist Fail', 

    GET_CLIENT_CHECKLIST_LIST = '[ClientChecklist] Get ClientChecklist list', 
	GET_CLIENT_CHECKLIST_LIST_SUCCESS = '[ClientChecklist] Get ClientChecklist list Success', 
	GET_CLIENT_CHECKLIST_LIST_FAIL = '[ClientChecklist] Get ClientChecklist list Fail',

	SAVE_CLIENT_CHECKLIST = '[ClientChecklist] Save ClientChecklist', 
	SAVE_CLIENT_CHECKLIST_SUCCESS = '[ClientChecklist] Save ClientChecklist Success', 
	SAVE_CLIENT_CHECKLIST_FAIL = '[ClientChecklist] Save ClientChecklist Fail',
	
	EDIT_CLIENT_CHECKLIST = '[ClientChecklist] Edit ClientChecklist', 
	EDIT_CLIENT_CHECKLIST_SUCCESS = '[ClientChecklist] Edit ClientChecklist Success', 
	EDIT_CLIENT_CHECKLIST_FAIL = '[ClientChecklist] Edit ClientChecklist Fail',

	DELETE_CLIENT_CHECKLIST = '[ClientChecklist] Delete ClientChecklist', 
	DELETE_CLIENT_CHECKLIST_SUCCESS = '[ClientChecklist] Delete ClientChecklist Success', 
	DELETE_CLIENT_CHECKLIST_FAIL = '[ClientChecklist] Delete ClientChecklist Fail',
}

export class GetClientChecklist implements Action {
	public readonly type = ClientChecklistActionTypes.GET_CLIENT_CHECKLIST;
	constructor(public payload: any) { }
}

export class GetClientChecklistSuccess implements Action {
	public readonly type = ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientChecklistFail implements Action {
	public readonly type = ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_FAIL;
	constructor(public payload: any) { }
}

export class GetClientChecklistList implements Action {
	public readonly type = ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST;
	constructor(public payload: any) { }
}

export class GetClientChecklistListSuccess implements Action {
	public readonly type = ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientChecklistListFail implements Action {
	public readonly type = ClientChecklistActionTypes.GET_CLIENT_CHECKLIST_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveClientChecklist implements Action {
	public readonly type = ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST;
	constructor(public payload: any) { }
}

export class SaveClientChecklistSuccess implements Action {
	public readonly type = ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveClientChecklistFail implements Action {
	public readonly type = ClientChecklistActionTypes.SAVE_CLIENT_CHECKLIST_FAIL;
	constructor(public payload: any) { }
}

export class EditClientChecklist implements Action {
	public readonly type = ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST;
	constructor(public payload: any) { }
}

export class EditClientChecklistSuccess implements Action {
	public readonly type = ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST_SUCCESS;
	constructor(public payload: any) { }
}

export class EditClientChecklistFail implements Action {
	public readonly type = ClientChecklistActionTypes.EDIT_CLIENT_CHECKLIST_FAIL;
	constructor(public payload: any) { }
}

export class DeleteClientChecklist implements Action {
	public readonly type = ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST;
	constructor(public payload: any) { }
}

export class DeleteClientChecklistSuccess implements Action {
	public readonly type = ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteClientChecklistFail implements Action {
	public readonly type = ClientChecklistActionTypes.DELETE_CLIENT_CHECKLIST_FAIL;
	constructor(public payload: any) { }
}

export type ClientChecklistAction =
	GetClientChecklist
|	GetClientChecklistSuccess
|  	GetClientChecklistFail
|   GetClientChecklistList
|   GetClientChecklistListSuccess
|   GetClientChecklistListFail
|	SaveClientChecklist
|	SaveClientChecklistSuccess
|	SaveClientChecklistFail
|	EditClientChecklist
|	EditClientChecklistSuccess
|	EditClientChecklistFail
|	DeleteClientChecklist
|	DeleteClientChecklistSuccess
|	DeleteClientChecklistFail;



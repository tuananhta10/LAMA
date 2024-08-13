import { Action } from '@ngrx/store';

/* FOR CLIENT_CAREWORKER  
*/
export const enum ClientCareworkerActionTypes {
	GET_CLIENT_CAREWORKER = '[ClientCareworker] Get ClientCareworker', 
	GET_CLIENT_CAREWORKER_SUCCESS = '[ClientCareworker] Get ClientCareworker Success', 
	GET_CLIENT_CAREWORKER_FAIL = '[ClientCareworker] Get ClientCareworker Fail', 

	SAVE_CLIENT_CAREWORKER = '[ClientCareworker] Save ClientCareworker', 
	SAVE_CLIENT_CAREWORKER_SUCCESS = '[ClientCareworker] Save ClientCareworker Success', 
	SAVE_CLIENT_CAREWORKER_FAIL = '[ClientCareworker] Save ClientCareworker Fail',
	
	EDIT_CLIENT_CAREWORKER = '[ClientCareworker] Edit ClientCareworker', 
	EDIT_CLIENT_CAREWORKER_SUCCESS = '[ClientCareworker] Edit ClientCareworker Success', 
	EDIT_CLIENT_CAREWORKER_FAIL = '[ClientCareworker] Edit ClientCareworker Fail',
}

export class GetClientCareworker implements Action {
	public readonly type = ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER;
	constructor(public payload: any) { }
}

export class GetClientCareworkerSuccess implements Action {
	public readonly type = ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientCareworkerFail implements Action {
	public readonly type = ClientCareworkerActionTypes.GET_CLIENT_CAREWORKER_FAIL;
	constructor(public payload: any) { }
}

export class SaveClientCareworker implements Action {
	public readonly type = ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER;
	constructor(public payload: any) { }
}

export class SaveClientCareworkerSuccess implements Action {
	public readonly type = ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveClientCareworkerFail implements Action {
	public readonly type = ClientCareworkerActionTypes.SAVE_CLIENT_CAREWORKER_FAIL;
	constructor(public payload: any) { }
}

export class EditClientCareworker implements Action {
	public readonly type = ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER;
	constructor(public payload: any) { }
}

export class EditClientCareworkerSuccess implements Action {
	public readonly type = ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER_SUCCESS;
	constructor(public payload: any) { }
}

export class EditClientCareworkerFail implements Action {
	public readonly type = ClientCareworkerActionTypes.EDIT_CLIENT_CAREWORKER_FAIL;
	constructor(public payload: any) { }
}

export type ClientCareworkerAction =
	GetClientCareworker
|	GetClientCareworkerSuccess
|  	GetClientCareworkerFail
|	SaveClientCareworker
|	SaveClientCareworkerSuccess
|	SaveClientCareworkerFail
|	EditClientCareworker
|	EditClientCareworkerSuccess
|	EditClientCareworkerFail;



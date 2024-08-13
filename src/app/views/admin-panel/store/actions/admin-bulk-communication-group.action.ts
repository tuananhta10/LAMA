import { Action } from '@ngrx/store';

/* FOR COMMUNICATION_GROUP  
*/
export const enum CommunicationGroupActionTypes {
	GET_COMMUNICATION_GROUP = '[CommunicationGroup] Get CommunicationGroup', 
	GET_COMMUNICATION_GROUP_SUCCESS = '[CommunicationGroup] Get CommunicationGroup Success', 
	GET_COMMUNICATION_GROUP_FAIL = '[CommunicationGroup] Get CommunicationGroup Fail', 

    GET_COMMUNICATION_GROUP_LIST = '[CommunicationGroup] Get CommunicationGroup list', 
	GET_COMMUNICATION_GROUP_LIST_SUCCESS = '[CommunicationGroup] Get CommunicationGroup list Success', 
	GET_COMMUNICATION_GROUP_LIST_FAIL = '[CommunicationGroup] Get CommunicationGroup list Fail',

	SAVE_COMMUNICATION_GROUP = '[CommunicationGroup] Save CommunicationGroup', 
	SAVE_COMMUNICATION_GROUP_SUCCESS = '[CommunicationGroup] Save CommunicationGroup Success', 
	SAVE_COMMUNICATION_GROUP_FAIL = '[CommunicationGroup] Save CommunicationGroup Fail',
	
	EDIT_COMMUNICATION_GROUP = '[CommunicationGroup] Edit CommunicationGroup', 
	EDIT_COMMUNICATION_GROUP_SUCCESS = '[CommunicationGroup] Edit CommunicationGroup Success', 
	EDIT_COMMUNICATION_GROUP_FAIL = '[CommunicationGroup] Edit CommunicationGroup Fail',

	DELETE_COMMUNICATION_GROUP = '[CommunicationGroup] Delete CommunicationGroup', 
	DELETE_COMMUNICATION_GROUP_SUCCESS = '[CommunicationGroup] Delete CommunicationGroup Success', 
	DELETE_COMMUNICATION_GROUP_FAIL = '[CommunicationGroup] Delete CommunicationGroup Fail',
}

export class GetCommunicationGroup implements Action {
	public readonly type = CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP;
	constructor(public payload: any) { }
}

export class GetCommunicationGroupSuccess implements Action {
	public readonly type = CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_SUCCESS;
	constructor(public payload: any) { }
}

export class GetCommunicationGroupFail implements Action {
	public readonly type = CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_FAIL;
	constructor(public payload: any) { }
}

export class GetCommunicationGroupList implements Action {
	public readonly type = CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST;
	constructor(public payload: any) { }
}

export class GetCommunicationGroupListSuccess implements Action {
	public readonly type = CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetCommunicationGroupListFail implements Action {
	public readonly type = CommunicationGroupActionTypes.GET_COMMUNICATION_GROUP_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveCommunicationGroup implements Action {
	public readonly type = CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP;
	constructor(public payload: any) { }
}

export class SaveCommunicationGroupSuccess implements Action {
	public readonly type = CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveCommunicationGroupFail implements Action {
	public readonly type = CommunicationGroupActionTypes.SAVE_COMMUNICATION_GROUP_FAIL;
	constructor(public payload: any) { }
}

export class EditCommunicationGroup implements Action {
	public readonly type = CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP;
	constructor(public payload: any) { }
}

export class EditCommunicationGroupSuccess implements Action {
	public readonly type = CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP_SUCCESS;
	constructor(public payload: any) { }
}

export class EditCommunicationGroupFail implements Action {
	public readonly type = CommunicationGroupActionTypes.EDIT_COMMUNICATION_GROUP_FAIL;
	constructor(public payload: any) { }
}

export class DeleteCommunicationGroup implements Action {
	public readonly type = CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP;
	constructor(public payload: any) { }
}

export class DeleteCommunicationGroupSuccess implements Action {
	public readonly type = CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteCommunicationGroupFail implements Action {
	public readonly type = CommunicationGroupActionTypes.DELETE_COMMUNICATION_GROUP_FAIL;
	constructor(public payload: any) { }
}

export type CommunicationGroupAction =
	GetCommunicationGroup
|	GetCommunicationGroupSuccess
|  	GetCommunicationGroupFail
|   GetCommunicationGroupList
|   GetCommunicationGroupListSuccess
|   GetCommunicationGroupListFail
|	SaveCommunicationGroup
|	SaveCommunicationGroupSuccess
|	SaveCommunicationGroupFail
|	EditCommunicationGroup
|	EditCommunicationGroupSuccess
|	EditCommunicationGroupFail
|	DeleteCommunicationGroup
|	DeleteCommunicationGroupSuccess
|	DeleteCommunicationGroupFail;



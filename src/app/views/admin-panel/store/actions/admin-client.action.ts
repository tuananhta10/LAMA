import { Action } from '@ngrx/store';

/* FOR CLIENT  
*/
export const enum ClientActionTypes {
	GET_CLIENT = '[Client] Get Client', 
	GET_CLIENT_SUCCESS = '[Client] Get Client Success', 
	GET_CLIENT_FAIL = '[Client] Get Client Fail', 
	SAVE_CLIENT = '[Client] Save Client', 
	SAVE_CLIENT_SUCCESS = '[Client] Save Client Success', 
	SAVE_CLIENT_FAIL = '[Client] Save Client Fail',

	SAVE_DRAFT_CLIENT = '[Client] Save Client as Draft', 
	SAVE_DRAFT_CLIENT_SUCCESS = '[Client] Save Client as Draft Success', 
	SAVE_DRAFT_CLIENT_FAIL = '[Client] Save Client as Draft Fail',

	EDIT_CLIENT = '[Client] Edit Client', 
	EDIT_CLIENT_SUCCESS = '[Client] Edit Client Success', 
	EDIT_CLIENT_FAIL = '[Client] Edit Client Fail',

	EDIT_CLIENT_PASSWORD = '[Client] Edit Client Password', 
	EDIT_CLIENT_PASSWORD_SUCCESS = '[Client] Edit Client Password Success', 
	EDIT_CLIENT_PASSWORD_FAIL = '[Client] Edit Client Password Fail',

	GET_CLIENT_STATS = '[Client] Get Client stats', 
	GET_CLIENT_STATS_SUCCESS = '[Client] Get Client Stats Success', 
	GET_CLIENT_STATS_FAIL = '[Client] Get Client Stats Fail', 

	CREATE_CLIENT_EMERGENCY_CONTACT = '[Client] Create Client Emergency Contact', 
	CREATE_CLIENT_EMERGENCY_CONTACT_SUCCESS = '[Client] Create Client Emergency Contact Success', 
	CREATE_CLIENT_EMERGENCY_CONTACT_FAIL = '[Client] Create Client Emergency Contact Fail',

	EDIT_CLIENT_EMERGENCY_CONTACT = '[Client] Edit Client Emergency Contact', 
	EDIT_CLIENT_EMERGENCY_CONTACT_SUCCESS = '[Client] Edit Client Emergency Contact Success', 
	EDIT_CLIENT_EMERGENCY_CONTACT_FAIL = '[Client] Edit Client Emergency Contact Fail',

	DELETE_CLIENT_EMERGENCY_CONTACT = '[Client] Delete Client Emergency Contact', 
	DELETE_CLIENT_EMERGENCY_CONTACT_SUCCESS = '[Client] Delete Client Emergency Contact Success', 
	DELETE_CLIENT_EMERGENCY_CONTACT_FAIL = '[Client] Delete Client Emergency Contact Fail',
}


export class GetClient implements Action {
	public readonly type = ClientActionTypes.GET_CLIENT;
	constructor(public payload: any) { }
}

export class GetClientSuccess implements Action {
	public readonly type = ClientActionTypes.GET_CLIENT_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientFail implements Action {
	public readonly type = ClientActionTypes.GET_CLIENT_FAIL;
	constructor(public payload: any) { }
}

export class SaveClient implements Action {
	public readonly type = ClientActionTypes.SAVE_CLIENT;
	constructor(public payload: any) { }
}

export class SaveClientSuccess implements Action {
	public readonly type = ClientActionTypes.SAVE_CLIENT_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveClientFail implements Action {
	public readonly type = ClientActionTypes.SAVE_CLIENT_FAIL;
	constructor(public payload: any) { }
}

export class SaveDraftClient implements Action {
	public readonly type = ClientActionTypes.SAVE_DRAFT_CLIENT;
	constructor(public payload: any) { }
}

export class SaveDraftClientSuccess implements Action {
	public readonly type = ClientActionTypes.SAVE_DRAFT_CLIENT_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveDraftClientFail implements Action {
	public readonly type = ClientActionTypes.SAVE_DRAFT_CLIENT_FAIL;
	constructor(public payload: any) { }
}

export class EditClient implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT;
	constructor(public payload: any) { }
}

export class EditClientSuccess implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT_SUCCESS;
	constructor(public payload: any) { }
}

export class EditClientFail implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT_FAIL;
	constructor(public payload: any) { }
}

export class EditClientPassword implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT_PASSWORD;
	constructor(public payload: any) { }
}

export class EditClientPasswordSuccess implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT_PASSWORD_SUCCESS;
	constructor(public payload: any) { }
}

export class EditClientPasswordFail implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT_PASSWORD_FAIL;
	constructor(public payload: any) { }
}

export class GetClientStats implements Action {
	public readonly type = ClientActionTypes.GET_CLIENT_STATS;
	constructor(public payload: any) { }
}

export class GetClientStatsSuccess implements Action {
	public readonly type = ClientActionTypes.GET_CLIENT_STATS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientStatsFail implements Action {
	public readonly type = ClientActionTypes.GET_CLIENT_STATS_FAIL;
	constructor(public payload: any) { }
}

//////////// CREATE EMERGENCY CONTACT
export class CreateClientEmergencyContact implements Action {
	public readonly type = ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT;
	constructor(public payload: any) { }
}

export class CreateClientEmergencyContactSuccess implements Action {
	public readonly type = ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT_SUCCESS;
	constructor(public payload: any) { }
}

export class CreateClientEmergencyContactFail implements Action {
	public readonly type = ClientActionTypes.CREATE_CLIENT_EMERGENCY_CONTACT_FAIL;
	constructor(public payload: any) { }
}

//////////// EDIT EMERGENCY CONTACT
export class EditClientEmergencyContact implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT;
	constructor(public payload: any) { }
}

export class EditClientEmergencyContactSuccess implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT_SUCCESS;
	constructor(public payload: any) { }
}

export class EditClientEmergencyContactFail implements Action {
	public readonly type = ClientActionTypes.EDIT_CLIENT_EMERGENCY_CONTACT_FAIL;
	constructor(public payload: any) { }
}

//////////// DELETE EMERGENCY CONTACT
export class DeleteClientEmergencyContact implements Action {
	public readonly type = ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT;
	constructor(public payload: any) { }
}

export class DeleteClientEmergencyContactSuccess implements Action {
	public readonly type = ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteClientEmergencyContactFail implements Action {
	public readonly type = ClientActionTypes.DELETE_CLIENT_EMERGENCY_CONTACT_FAIL;
	constructor(public payload: any) { }
}

export type ClientAction =
	GetClient
|	GetClientSuccess
|  	GetClientFail
|	SaveClient
|	SaveClientSuccess
|	SaveClientFail
|	SaveDraftClient
|	SaveDraftClientSuccess
|	SaveDraftClientFail
|	EditClient
|	EditClientSuccess
|	EditClientFail
|	EditClientPassword
|	EditClientPasswordSuccess
|	EditClientPasswordFail
|   GetClientStats
|	GetClientStatsSuccess
|  	GetClientStatsFail
|  	CreateClientEmergencyContact
|  	CreateClientEmergencyContactSuccess
|  	CreateClientEmergencyContactFail
|  	EditClientEmergencyContact
|  	EditClientEmergencyContactSuccess
|  	EditClientEmergencyContactFail
|  	DeleteClientEmergencyContact
|  	DeleteClientEmergencyContactSuccess
|  	DeleteClientEmergencyContactFail




import { Action } from '@ngrx/store';

/* FOR INCIDENT  
*/
export const enum IncidentActionTypes {
	GET_INCIDENT = '[Incident] Get Incident', 
	GET_INCIDENT_SUCCESS = '[Incident] Get Incident Success', 
	GET_INCIDENT_FAIL = '[Incident] Get Incident Fail', 

    GET_INCIDENT_LIST = '[Incident] Get Incident list', 
	GET_INCIDENT_LIST_SUCCESS = '[Incident] Get Incident list Success', 
	GET_INCIDENT_LIST_FAIL = '[Incident] Get Incident list Fail',

	SAVE_INCIDENT = '[Incident] Save Incident', 
	SAVE_INCIDENT_SUCCESS = '[Incident] Save Incident Success', 
	SAVE_INCIDENT_FAIL = '[Incident] Save Incident Fail',
	
	EDIT_INCIDENT = '[Incident] Edit Incident', 
	EDIT_INCIDENT_SUCCESS = '[Incident] Edit Incident Success', 
	EDIT_INCIDENT_FAIL = '[Incident] Edit Incident Fail',

	DELETE_INCIDENT = '[Incident] Delete Incident', 
	DELETE_INCIDENT_SUCCESS = '[Incident] Delete Incident Success', 
	DELETE_INCIDENT_FAIL = '[Incident] Delete Incident Fail',

	UPLOAD_INCIDENT = '[Incident] Upload Incident', 
	UPLOAD_INCIDENT_SUCCESS = '[Incident] Delete Upload Success', 
	UPLOAD_INCIDENT_FAIL = '[Incident] Delete Upload Fail',
}

export class GetIncident implements Action {
	public readonly type = IncidentActionTypes.GET_INCIDENT;
	constructor(public payload: any) { }
}

export class GetIncidentSuccess implements Action {
	public readonly type = IncidentActionTypes.GET_INCIDENT_SUCCESS;
	constructor(public payload: any) { }
}

export class GetIncidentFail implements Action {
	public readonly type = IncidentActionTypes.GET_INCIDENT_FAIL;
	constructor(public payload: any) { }
}

export class GetIncidentList implements Action {
	public readonly type = IncidentActionTypes.GET_INCIDENT_LIST;
	constructor(public payload: any) { }
}

export class GetIncidentListSuccess implements Action {
	public readonly type = IncidentActionTypes.GET_INCIDENT_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetIncidentListFail implements Action {
	public readonly type = IncidentActionTypes.GET_INCIDENT_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveIncident implements Action {
	public readonly type = IncidentActionTypes.SAVE_INCIDENT;
	constructor(public payload: any) { }
}

export class SaveIncidentSuccess implements Action {
	public readonly type = IncidentActionTypes.SAVE_INCIDENT_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveIncidentFail implements Action {
	public readonly type = IncidentActionTypes.SAVE_INCIDENT_FAIL;
	constructor(public payload: any) { }
}

export class EditIncident implements Action {
	public readonly type = IncidentActionTypes.EDIT_INCIDENT;
	constructor(public payload: any) { }
}

export class EditIncidentSuccess implements Action {
	public readonly type = IncidentActionTypes.EDIT_INCIDENT_SUCCESS;
	constructor(public payload: any) { }
}

export class EditIncidentFail implements Action {
	public readonly type = IncidentActionTypes.EDIT_INCIDENT_FAIL;
	constructor(public payload: any) { }
}

export class DeleteIncident implements Action {
	public readonly type = IncidentActionTypes.DELETE_INCIDENT;
	constructor(public payload: any) { }
}

export class DeleteIncidentSuccess implements Action {
	public readonly type = IncidentActionTypes.DELETE_INCIDENT_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteIncidentFail implements Action {
	public readonly type = IncidentActionTypes.DELETE_INCIDENT_FAIL;
	constructor(public payload: any) { }
}

export class UploadIncident implements Action {
	public readonly type = IncidentActionTypes.UPLOAD_INCIDENT;
	constructor(public payload: any) { }
}

export class UploadIncidentSuccess implements Action {
	public readonly type = IncidentActionTypes.UPLOAD_INCIDENT_SUCCESS;
	constructor(public payload: any) { }
}

export class UploadIncidentFail implements Action {
	public readonly type = IncidentActionTypes.UPLOAD_INCIDENT_FAIL;
	constructor(public payload: any) { }
}

export type IncidentAction =
	GetIncident
|	GetIncidentSuccess
|  	GetIncidentFail
|   GetIncidentList
|   GetIncidentListSuccess
|   GetIncidentListFail
|	SaveIncident
|	SaveIncidentSuccess
|	SaveIncidentFail
|	EditIncident
|	EditIncidentSuccess
|	EditIncidentFail
|	DeleteIncident
|	DeleteIncidentSuccess
|	DeleteIncidentFail
|	UploadIncident
|	UploadIncidentSuccess
|	UploadIncidentFail;



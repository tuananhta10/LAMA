import { Action } from '@ngrx/store';

/* FOR EMERGENCY_NUMBER  
*/
export const enum EmergencyNumberActionTypes {
	GET_EMERGENCY_NUMBER = '[EmergencyNumber] Get EmergencyNumber', 
	GET_EMERGENCY_NUMBER_SUCCESS = '[EmergencyNumber] Get EmergencyNumber Success', 
	GET_EMERGENCY_NUMBER_FAIL = '[EmergencyNumber] Get EmergencyNumber Fail', 

    GET_EMERGENCY_NUMBER_LIST = '[EmergencyNumber] Get EmergencyNumber list', 
	GET_EMERGENCY_NUMBER_LIST_SUCCESS = '[EmergencyNumber] Get EmergencyNumber list Success', 
	GET_EMERGENCY_NUMBER_LIST_FAIL = '[EmergencyNumber] Get EmergencyNumber list Fail',

	SAVE_EMERGENCY_NUMBER = '[EmergencyNumber] Save EmergencyNumber', 
	SAVE_EMERGENCY_NUMBER_SUCCESS = '[EmergencyNumber] Save EmergencyNumber Success', 
	SAVE_EMERGENCY_NUMBER_FAIL = '[EmergencyNumber] Save EmergencyNumber Fail',
	
	EDIT_EMERGENCY_NUMBER = '[EmergencyNumber] Edit EmergencyNumber', 
	EDIT_EMERGENCY_NUMBER_SUCCESS = '[EmergencyNumber] Edit EmergencyNumber Success', 
	EDIT_EMERGENCY_NUMBER_FAIL = '[EmergencyNumber] Edit EmergencyNumber Fail',

	DELETE_EMERGENCY_NUMBER = '[EmergencyNumber] Delete EmergencyNumber', 
	DELETE_EMERGENCY_NUMBER_SUCCESS = '[EmergencyNumber] Delete EmergencyNumber Success', 
	DELETE_EMERGENCY_NUMBER_FAIL = '[EmergencyNumber] Delete EmergencyNumber Fail',

	// FOR EMPLOYEE POSITION QUALIFICATION
	GET_EMERGENCY_NUMBER_QUALIFICATIONS = '[EmergencyNumberQualification] Get EmergencyNumber Qualification', 
	GET_EMERGENCY_NUMBER_QUALIFICATIONS_SUCCESS = '[EmergencyNumberQualification] Get EmergencyNumber Qualification Success', 
	GET_EMERGENCY_NUMBER_QUALIFICATIONS_FAIL = '[EmergencyNumberQualification] Get EmergencyNumber Qualification Fail', 
}

export class GetEmergencyNumber implements Action {
	public readonly type = EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER;
	constructor(public payload: any) { }
}

export class GetEmergencyNumberSuccess implements Action {
	public readonly type = EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmergencyNumberFail implements Action {
	public readonly type = EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_FAIL;
	constructor(public payload: any) { }
}

export class GetEmergencyNumberList implements Action {
	public readonly type = EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST;
	constructor(public payload: any) { }
}

export class GetEmergencyNumberListSuccess implements Action {
	public readonly type = EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmergencyNumberListFail implements Action {
	public readonly type = EmergencyNumberActionTypes.GET_EMERGENCY_NUMBER_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmergencyNumber implements Action {
	public readonly type = EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER;
	constructor(public payload: any) { }
}

export class SaveEmergencyNumberSuccess implements Action {
	public readonly type = EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmergencyNumberFail implements Action {
	public readonly type = EmergencyNumberActionTypes.SAVE_EMERGENCY_NUMBER_FAIL;
	constructor(public payload: any) { }
}

export class EditEmergencyNumber implements Action {
	public readonly type = EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER;
	constructor(public payload: any) { }
}

export class EditEmergencyNumberSuccess implements Action {
	public readonly type = EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmergencyNumberFail implements Action {
	public readonly type = EmergencyNumberActionTypes.EDIT_EMERGENCY_NUMBER_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmergencyNumber implements Action {
	public readonly type = EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER;
	constructor(public payload: any) { }
}

export class DeleteEmergencyNumberSuccess implements Action {
	public readonly type = EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmergencyNumberFail implements Action {
	public readonly type = EmergencyNumberActionTypes.DELETE_EMERGENCY_NUMBER_FAIL;
	constructor(public payload: any) { }
}

export type EmergencyNumberAction =
	GetEmergencyNumber
|	GetEmergencyNumberSuccess
|  	GetEmergencyNumberFail
|   GetEmergencyNumberList
|   GetEmergencyNumberListSuccess
|   GetEmergencyNumberListFail
|	SaveEmergencyNumber
|	SaveEmergencyNumberSuccess
|	SaveEmergencyNumberFail
|	EditEmergencyNumber
|	EditEmergencyNumberSuccess
|	EditEmergencyNumberFail
|	DeleteEmergencyNumber
|	DeleteEmergencyNumberSuccess
|	DeleteEmergencyNumberFail;



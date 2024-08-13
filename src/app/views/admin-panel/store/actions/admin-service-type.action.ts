import { Action } from '@ngrx/store';

/* FOR SERVICE_TYPE  
*/
export const enum ServiceTypeActionTypes {
	GET_SERVICE_TYPE = '[ServiceType] Get ServiceType', 
	GET_SERVICE_TYPE_SUCCESS = '[ServiceType] Get ServiceType Success', 
	GET_SERVICE_TYPE_FAIL = '[ServiceType] Get ServiceType Fail', 

    GET_SERVICE_TYPE_LIST = '[ServiceType] Get ServiceType list', 
	GET_SERVICE_TYPE_LIST_SUCCESS = '[ServiceType] Get ServiceType list Success', 
	GET_SERVICE_TYPE_LIST_FAIL = '[ServiceType] Get ServiceType list Fail',

	SAVE_SERVICE_TYPE = '[ServiceType] Save ServiceType', 
	SAVE_SERVICE_TYPE_SUCCESS = '[ServiceType] Save ServiceType Success', 
	SAVE_SERVICE_TYPE_FAIL = '[ServiceType] Save ServiceType Fail',
	
	EDIT_SERVICE_TYPE = '[ServiceType] Edit ServiceType', 
	EDIT_SERVICE_TYPE_SUCCESS = '[ServiceType] Edit ServiceType Success', 
	EDIT_SERVICE_TYPE_FAIL = '[ServiceType] Edit ServiceType Fail',
}

export class GetServiceType implements Action {
	public readonly type = ServiceTypeActionTypes.GET_SERVICE_TYPE;
	constructor(public payload: any) { }
}

export class GetServiceTypeSuccess implements Action {
	public readonly type = ServiceTypeActionTypes.GET_SERVICE_TYPE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetServiceTypeFail implements Action {
	public readonly type = ServiceTypeActionTypes.GET_SERVICE_TYPE_FAIL;
	constructor(public payload: any) { }
}

export class GetServiceTypeList implements Action {
	public readonly type = ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST;
	constructor(public payload: any) { }
}

export class GetServiceTypeListSuccess implements Action {
	public readonly type = ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetServiceTypeListFail implements Action {
	public readonly type = ServiceTypeActionTypes.GET_SERVICE_TYPE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveServiceType implements Action {
	public readonly type = ServiceTypeActionTypes.SAVE_SERVICE_TYPE;
	constructor(public payload: any) { }
}

export class SaveServiceTypeSuccess implements Action {
	public readonly type = ServiceTypeActionTypes.SAVE_SERVICE_TYPE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveServiceTypeFail implements Action {
	public readonly type = ServiceTypeActionTypes.SAVE_SERVICE_TYPE_FAIL;
	constructor(public payload: any) { }
}

export class EditServiceType implements Action {
	public readonly type = ServiceTypeActionTypes.EDIT_SERVICE_TYPE;
	constructor(public payload: any) { }
}

export class EditServiceTypeSuccess implements Action {
	public readonly type = ServiceTypeActionTypes.EDIT_SERVICE_TYPE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditServiceTypeFail implements Action {
	public readonly type = ServiceTypeActionTypes.EDIT_SERVICE_TYPE_FAIL;
	constructor(public payload: any) { }
}

export type ServiceTypeAction =
	GetServiceType
|	GetServiceTypeSuccess
|  	GetServiceTypeFail
|   GetServiceTypeList
|   GetServiceTypeListSuccess
|   GetServiceTypeListFail
|	SaveServiceType
|	SaveServiceTypeSuccess
|	SaveServiceTypeFail
|	EditServiceType
|	EditServiceTypeSuccess
|	EditServiceTypeFail;



import { Action } from '@ngrx/store';

/* FOR ORGANIZATION  
*/
export const enum OrganizationActionTypes {
	GET_ORGANIZATION = '[Organization] Get Organization', 
	GET_ORGANIZATION_SUCCESS = '[Organization] Get Organization Success', 
	GET_ORGANIZATION_FAIL = '[Organization] Get Organization Fail', 

    GET_ORGANIZATION_LIST = '[Organization] Get Organization list', 
	GET_ORGANIZATION_LIST_SUCCESS = '[Organization] Get Organization list Success', 
	GET_ORGANIZATION_LIST_FAIL = '[Organization] Get Organization list Fail',

	SAVE_ORGANIZATION = '[Organization] Save Organization', 
	SAVE_ORGANIZATION_SUCCESS = '[Organization] Save Organization Success', 
	SAVE_ORGANIZATION_FAIL = '[Organization] Save Organization Fail',
	
	EDIT_ORGANIZATION = '[Organization] Edit Organization', 
	EDIT_ORGANIZATION_SUCCESS = '[Organization] Edit Organization Success', 
	EDIT_ORGANIZATION_FAIL = '[Organization] Edit Organization Fail',

	DELETE_ORGANIZATION = '[Organization] Delete Organization', 
	DELETE_ORGANIZATION_SUCCESS = '[Organization] Delete Organization Success', 
	DELETE_ORGANIZATION_FAIL = '[Organization] Delete Organization Fail',
}

export class GetOrganization implements Action {
	public readonly type = OrganizationActionTypes.GET_ORGANIZATION;
	constructor(public payload: any) { }
}

export class GetOrganizationSuccess implements Action {
	public readonly type = OrganizationActionTypes.GET_ORGANIZATION_SUCCESS;
	constructor(public payload: any) { }
}

export class GetOrganizationFail implements Action {
	public readonly type = OrganizationActionTypes.GET_ORGANIZATION_FAIL;
	constructor(public payload: any) { }
}

export class GetOrganizationList implements Action {
	public readonly type = OrganizationActionTypes.GET_ORGANIZATION_LIST;
	constructor(public payload: any) { }
}

export class GetOrganizationListSuccess implements Action {
	public readonly type = OrganizationActionTypes.GET_ORGANIZATION_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetOrganizationListFail implements Action {
	public readonly type = OrganizationActionTypes.GET_ORGANIZATION_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveOrganization implements Action {
	public readonly type = OrganizationActionTypes.SAVE_ORGANIZATION;
	constructor(public payload: any) { }
}

export class SaveOrganizationSuccess implements Action {
	public readonly type = OrganizationActionTypes.SAVE_ORGANIZATION_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveOrganizationFail implements Action {
	public readonly type = OrganizationActionTypes.SAVE_ORGANIZATION_FAIL;
	constructor(public payload: any) { }
}

export class EditOrganization implements Action {
	public readonly type = OrganizationActionTypes.EDIT_ORGANIZATION;
	constructor(public payload: any) { }
}

export class EditOrganizationSuccess implements Action {
	public readonly type = OrganizationActionTypes.EDIT_ORGANIZATION_SUCCESS;
	constructor(public payload: any) { }
}

export class EditOrganizationFail implements Action {
	public readonly type = OrganizationActionTypes.EDIT_ORGANIZATION_FAIL;
	constructor(public payload: any) { }
}

export class DeleteOrganization implements Action {
	public readonly type = OrganizationActionTypes.DELETE_ORGANIZATION;
	constructor(public payload: any) { }
}

export class DeleteOrganizationSuccess implements Action {
	public readonly type = OrganizationActionTypes.DELETE_ORGANIZATION_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteOrganizationFail implements Action {
	public readonly type = OrganizationActionTypes.DELETE_ORGANIZATION_FAIL;
	constructor(public payload: any) { }
}

export type OrganizationAction =
	GetOrganization
|	GetOrganizationSuccess
|  	GetOrganizationFail
|   GetOrganizationList
|   GetOrganizationListSuccess
|   GetOrganizationListFail
|	SaveOrganization
|	SaveOrganizationSuccess
|	SaveOrganizationFail
|	EditOrganization
|	EditOrganizationSuccess
|	EditOrganizationFail
|	DeleteOrganization
|	DeleteOrganizationSuccess
|	DeleteOrganizationFail;



import { Action } from '@ngrx/store';

/* FOR REGISTER_ORGANIZATION  
*/
export const enum RegisterOrganizationActionTypes {
	SAVE_REGISTER_ORGANIZATION = '[RegisterOrganization] Save RegisterOrganization', 
	SAVE_REGISTER_ORGANIZATION_SUCCESS = '[RegisterOrganization] Save RegisterOrganization Success', 
	SAVE_REGISTER_ORGANIZATION_FAIL = '[RegisterOrganization] Save RegisterOrganization Fail',
}


export class SaveRegisterOrganization implements Action {
	public readonly type = RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION;
	constructor(public payload: any) { }
}

export class SaveRegisterOrganizationSuccess implements Action {
	public readonly type = RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveRegisterOrganizationFail implements Action {
	public readonly type = RegisterOrganizationActionTypes.SAVE_REGISTER_ORGANIZATION_FAIL;
	constructor(public payload: any) { }
}

export type RegisterOrganizationAction =
	SaveRegisterOrganization
|	SaveRegisterOrganizationSuccess
|	SaveRegisterOrganizationFail;



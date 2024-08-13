import { Action } from '@ngrx/store';

export const enum AdminProfileActionTypes {
	/*  CAPITAL FOR ACTION TYPE = [Title] Description */
	GET_ADMIN_PROFILE = '[Admin Profile] Get Admin Profile', 
	GET_ADMIN_PROFILE_SUCCESS = '[Admin Profile] Get Admin Profile Success', 
	GET_ADMIN_PROFILE_FAIL = '[Admin Profile] Get Admin Profile Fail', 
}

// Set interface for each action types
export class GetAdminProfile implements Action {
	public readonly type = AdminProfileActionTypes.GET_ADMIN_PROFILE;
	constructor(public payload: any) { }
}

export class GetAdminProfileSuccess implements Action {
	public readonly type = AdminProfileActionTypes.GET_ADMIN_PROFILE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetAdminProfileFail implements Action {
	public readonly type = AdminProfileActionTypes.GET_ADMIN_PROFILE_FAIL;
	constructor(public payload: any) { }
}


// Export each interface
export type AdminProfileAction =
	GetAdminProfile
|	GetAdminProfileSuccess
|  	GetAdminProfileFail;
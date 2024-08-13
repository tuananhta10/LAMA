import { Action } from '@ngrx/store';

/* FOR CANCELLATION_POLICY  
*/
export const enum CancellationPolicyActionTypes {
	GET_CANCELLATION_POLICY = '[CancellationPolicy] Get CancellationPolicy', 
	GET_CANCELLATION_POLICY_SUCCESS = '[CancellationPolicy] Get CancellationPolicy Success', 
	GET_CANCELLATION_POLICY_FAIL = '[CancellationPolicy] Get CancellationPolicy Fail', 

    GET_CANCELLATION_POLICY_LIST = '[CancellationPolicy] Get CancellationPolicy list', 
	GET_CANCELLATION_POLICY_LIST_SUCCESS = '[CancellationPolicy] Get CancellationPolicy list Success', 
	GET_CANCELLATION_POLICY_LIST_FAIL = '[CancellationPolicy] Get CancellationPolicy list Fail',

	SAVE_CANCELLATION_POLICY = '[CancellationPolicy] Save CancellationPolicy', 
	SAVE_CANCELLATION_POLICY_SUCCESS = '[CancellationPolicy] Save CancellationPolicy Success', 
	SAVE_CANCELLATION_POLICY_FAIL = '[CancellationPolicy] Save CancellationPolicy Fail',
	
	EDIT_CANCELLATION_POLICY = '[CancellationPolicy] Edit CancellationPolicy', 
	EDIT_CANCELLATION_POLICY_SUCCESS = '[CancellationPolicy] Edit CancellationPolicy Success', 
	EDIT_CANCELLATION_POLICY_FAIL = '[CancellationPolicy] Edit CancellationPolicy Fail',

	DELETE_CANCELLATION_POLICY = '[CancellationPolicy] Delete CancellationPolicy', 
	DELETE_CANCELLATION_POLICY_SUCCESS = '[CancellationPolicy] Delete CancellationPolicy Success', 
	DELETE_CANCELLATION_POLICY_FAIL = '[CancellationPolicy] Delete CancellationPolicy Fail',
}

export class GetCancellationPolicy implements Action {
	public readonly type = CancellationPolicyActionTypes.GET_CANCELLATION_POLICY;
	constructor(public payload: any) { }
}

export class GetCancellationPolicySuccess implements Action {
	public readonly type = CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_SUCCESS;
	constructor(public payload: any) { }
}

export class GetCancellationPolicyFail implements Action {
	public readonly type = CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_FAIL;
	constructor(public payload: any) { }
}

export class GetCancellationPolicyList implements Action {
	public readonly type = CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST;
	constructor(public payload: any) { }
}

export class GetCancellationPolicyListSuccess implements Action {
	public readonly type = CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetCancellationPolicyListFail implements Action {
	public readonly type = CancellationPolicyActionTypes.GET_CANCELLATION_POLICY_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveCancellationPolicy implements Action {
	public readonly type = CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY;
	constructor(public payload: any) { }
}

export class SaveCancellationPolicySuccess implements Action {
	public readonly type = CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveCancellationPolicyFail implements Action {
	public readonly type = CancellationPolicyActionTypes.SAVE_CANCELLATION_POLICY_FAIL;
	constructor(public payload: any) { }
}

export class EditCancellationPolicy implements Action {
	public readonly type = CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY;
	constructor(public payload: any) { }
}

export class EditCancellationPolicySuccess implements Action {
	public readonly type = CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY_SUCCESS;
	constructor(public payload: any) { }
}

export class EditCancellationPolicyFail implements Action {
	public readonly type = CancellationPolicyActionTypes.EDIT_CANCELLATION_POLICY_FAIL;
	constructor(public payload: any) { }
}

export class DeleteCancellationPolicy implements Action {
	public readonly type = CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY;
	constructor(public payload: any) { }
}

export class DeleteCancellationPolicySuccess implements Action {
	public readonly type = CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteCancellationPolicyFail implements Action {
	public readonly type = CancellationPolicyActionTypes.DELETE_CANCELLATION_POLICY_FAIL;
	constructor(public payload: any) { }
}

export type CancellationPolicyAction =
	GetCancellationPolicy
|	GetCancellationPolicySuccess
|  	GetCancellationPolicyFail
|   GetCancellationPolicyList
|   GetCancellationPolicyListSuccess
|   GetCancellationPolicyListFail
|	SaveCancellationPolicy
|	SaveCancellationPolicySuccess
|	SaveCancellationPolicyFail
|	EditCancellationPolicy
|	EditCancellationPolicySuccess
|	EditCancellationPolicyFail
|	DeleteCancellationPolicy
|	DeleteCancellationPolicySuccess
|	DeleteCancellationPolicyFail;



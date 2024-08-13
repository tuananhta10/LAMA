import { Action } from '@ngrx/store';

/* FOR REFERRAL  
*/
export const enum ReferralActionTypes {
	GET_REFERRAL = '[Referral] Get Referral', 
	GET_REFERRAL_SUCCESS = '[Referral] Get Referral Success', 
	GET_REFERRAL_FAIL = '[Referral] Get Referral Fail', 

    GET_REFERRAL_LIST = '[Referral] Get Referral list', 
	GET_REFERRAL_LIST_SUCCESS = '[Referral] Get Referral list Success', 
	GET_REFERRAL_LIST_FAIL = '[Referral] Get Referral list Fail',

	SAVE_REFERRAL = '[Referral] Save Referral', 
	SAVE_REFERRAL_SUCCESS = '[Referral] Save Referral Success', 
	SAVE_REFERRAL_FAIL = '[Referral] Save Referral Fail',
	
	EDIT_REFERRAL = '[Referral] Edit Referral', 
	EDIT_REFERRAL_SUCCESS = '[Referral] Edit Referral Success', 
	EDIT_REFERRAL_FAIL = '[Referral] Edit Referral Fail',

	EDIT_REFERRAL_DETAILS = '[Referral] Edit Referral Details ', 
	EDIT_REFERRAL_DETAILS_SUCCESS = '[Referral] Edit Referral Details Success', 
	EDIT_REFERRAL_DETAILS_FAIL = '[Referral] Edit Referral Details Fail',

	DELETE_REFERRAL = '[Referral] Delete Referral', 
	DELETE_REFERRAL_SUCCESS = '[Referral] Delete Referral Success', 
	DELETE_REFERRAL_FAIL = '[Referral] Delete Referral Fail',

	DELETE_REFERRAL_COMMENT = '[Referral] Delete Referral Comment', 
	DELETE_REFERRAL_COMMENT_SUCCESS = '[Referral] Delete Referral Comment Success', 
	DELETE_REFERRAL_COMMENT_FAIL = '[Referral] Delete Referral Comment Fail',
}

export class GetReferral implements Action {
	public readonly type = ReferralActionTypes.GET_REFERRAL;
	constructor(public payload: any) { }
}

export class GetReferralSuccess implements Action {
	public readonly type = ReferralActionTypes.GET_REFERRAL_SUCCESS;
	constructor(public payload: any) { }
}

export class GetReferralFail implements Action {
	public readonly type = ReferralActionTypes.GET_REFERRAL_FAIL;
	constructor(public payload: any) { }
}

export class GetReferralList implements Action {
	public readonly type = ReferralActionTypes.GET_REFERRAL_LIST;
	constructor(public payload: any) { }
}

export class GetReferralListSuccess implements Action {
	public readonly type = ReferralActionTypes.GET_REFERRAL_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetReferralListFail implements Action {
	public readonly type = ReferralActionTypes.GET_REFERRAL_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveReferral implements Action {
	public readonly type = ReferralActionTypes.SAVE_REFERRAL;
	constructor(public payload: any) { }
}

export class SaveReferralSuccess implements Action {
	public readonly type = ReferralActionTypes.SAVE_REFERRAL_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveReferralFail implements Action {
	public readonly type = ReferralActionTypes.SAVE_REFERRAL_FAIL;
	constructor(public payload: any) { }
}

export class EditReferral implements Action {
	public readonly type = ReferralActionTypes.EDIT_REFERRAL;
	constructor(public payload: any) { }
}

export class EditReferralSuccess implements Action {
	public readonly type = ReferralActionTypes.EDIT_REFERRAL_SUCCESS;
	constructor(public payload: any) { }
}

export class EditReferralFail implements Action {
	public readonly type = ReferralActionTypes.EDIT_REFERRAL_FAIL;
	constructor(public payload: any) { }
}

export class EditReferralDetails implements Action {
	public readonly type = ReferralActionTypes.EDIT_REFERRAL_DETAILS;
	constructor(public payload: any) { }
}

export class EditReferralDetailsSuccess implements Action {
	public readonly type = ReferralActionTypes.EDIT_REFERRAL_DETAILS_SUCCESS;
	constructor(public payload: any) { }
}

export class EditReferralDetailsFail implements Action {
	public readonly type = ReferralActionTypes.EDIT_REFERRAL_DETAILS_FAIL;
	constructor(public payload: any) { }
}

export class DeleteReferral implements Action {
	public readonly type = ReferralActionTypes.DELETE_REFERRAL;
	constructor(public payload: any) { }
}

export class DeleteReferralSuccess implements Action {
	public readonly type = ReferralActionTypes.DELETE_REFERRAL_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteReferralFail implements Action {
	public readonly type = ReferralActionTypes.DELETE_REFERRAL_FAIL;
	constructor(public payload: any) { }
}

export class DeleteReferralComment implements Action {
	public readonly type = ReferralActionTypes.DELETE_REFERRAL_COMMENT;
	constructor(public payload: any) { }
}

export class DeleteReferralCommentSuccess implements Action {
	public readonly type = ReferralActionTypes.DELETE_REFERRAL_COMMENT_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteReferralCommentFail implements Action {
	public readonly type = ReferralActionTypes.DELETE_REFERRAL_COMMENT_FAIL;
	constructor(public payload: any) { }
}

export type ReferralAction =
	GetReferral
|	GetReferralSuccess
|  	GetReferralFail
|   GetReferralList
|   GetReferralListSuccess
|   GetReferralListFail
|	SaveReferral
|	SaveReferralSuccess
|	SaveReferralFail
|	EditReferral
|	EditReferralSuccess
|	EditReferralFail
|	EditReferralDetails
|	EditReferralDetailsSuccess
|	EditReferralDetailsFail
|   DeleteReferral
|   DeleteReferralSuccess
|   DeleteReferralFail
|   DeleteReferralComment
|   DeleteReferralCommentSuccess
|   DeleteReferralCommentFail;



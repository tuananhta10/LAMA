import { Action } from '@ngrx/store';

/* FOR INTEREST  
*/
export const enum InterestActionTypes {
	GET_INTEREST = '[Interest] Get Interest', 
	GET_INTEREST_SUCCESS = '[Interest] Get Interest Success', 
	GET_INTEREST_FAIL = '[Interest] Get Interest Fail', 

    GET_INTEREST_LIST = '[Interest] Get Interest list', 
	GET_INTEREST_LIST_SUCCESS = '[Interest] Get Interest list Success', 
	GET_INTEREST_LIST_FAIL = '[Interest] Get Interest list Fail',

	SAVE_INTEREST = '[Interest] Save Interest', 
	SAVE_INTEREST_SUCCESS = '[Interest] Save Interest Success', 
	SAVE_INTEREST_FAIL = '[Interest] Save Interest Fail',
	
	EDIT_INTEREST = '[Interest] Edit Interest', 
	EDIT_INTEREST_SUCCESS = '[Interest] Edit Interest Success', 
	EDIT_INTEREST_FAIL = '[Interest] Edit Interest Fail',

	DELETE_INTEREST = '[Interest] Delete Interest', 
	DELETE_INTEREST_SUCCESS = '[Interest] Delete Interest Success', 
	DELETE_INTEREST_FAIL = '[Interest] Delete Interest Fail',
}

export class GetInterest implements Action {
	public readonly type = InterestActionTypes.GET_INTEREST;
	constructor(public payload: any) { }
}

export class GetInterestSuccess implements Action {
	public readonly type = InterestActionTypes.GET_INTEREST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetInterestFail implements Action {
	public readonly type = InterestActionTypes.GET_INTEREST_FAIL;
	constructor(public payload: any) { }
}

export class GetInterestList implements Action {
	public readonly type = InterestActionTypes.GET_INTEREST_LIST;
	constructor(public payload: any) { }
}

export class GetInterestListSuccess implements Action {
	public readonly type = InterestActionTypes.GET_INTEREST_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetInterestListFail implements Action {
	public readonly type = InterestActionTypes.GET_INTEREST_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveInterest implements Action {
	public readonly type = InterestActionTypes.SAVE_INTEREST;
	constructor(public payload: any) { }
}

export class SaveInterestSuccess implements Action {
	public readonly type = InterestActionTypes.SAVE_INTEREST_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveInterestFail implements Action {
	public readonly type = InterestActionTypes.SAVE_INTEREST_FAIL;
	constructor(public payload: any) { }
}

export class EditInterest implements Action {
	public readonly type = InterestActionTypes.EDIT_INTEREST;
	constructor(public payload: any) { }
}

export class EditInterestSuccess implements Action {
	public readonly type = InterestActionTypes.EDIT_INTEREST_SUCCESS;
	constructor(public payload: any) { }
}

export class EditInterestFail implements Action {
	public readonly type = InterestActionTypes.EDIT_INTEREST_FAIL;
	constructor(public payload: any) { }
}

export class DeleteInterest implements Action {
	public readonly type = InterestActionTypes.DELETE_INTEREST;
	constructor(public payload: any) { }
}

export class DeleteInterestSuccess implements Action {
	public readonly type = InterestActionTypes.DELETE_INTEREST_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteInterestFail implements Action {
	public readonly type = InterestActionTypes.DELETE_INTEREST_FAIL;
	constructor(public payload: any) { }
}

export type InterestAction =
	GetInterest
|	GetInterestSuccess
|  	GetInterestFail
|   GetInterestList
|   GetInterestListSuccess
|   GetInterestListFail
|	SaveInterest
|	SaveInterestSuccess
|	SaveInterestFail
|	EditInterest
|	EditInterestSuccess
|	EditInterestFail
|	DeleteInterest
|	DeleteInterestSuccess
|	DeleteInterestFail;



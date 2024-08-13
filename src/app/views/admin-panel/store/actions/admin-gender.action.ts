import { Action } from '@ngrx/store';

/* FOR GENDER  
*/
export const enum GenderActionTypes {
	GET_GENDER = '[Gender] Get Gender', 
	GET_GENDER_SUCCESS = '[Gender] Get Gender Success', 
	GET_GENDER_FAIL = '[Gender] Get Gender Fail', 

    GET_GENDER_LIST = '[Gender] Get Gender list', 
	GET_GENDER_LIST_SUCCESS = '[Gender] Get Gender list Success', 
	GET_GENDER_LIST_FAIL = '[Gender] Get Gender list Fail',

	SAVE_GENDER = '[Gender] Save Gender', 
	SAVE_GENDER_SUCCESS = '[Gender] Save Gender Success', 
	SAVE_GENDER_FAIL = '[Gender] Save Gender Fail',
	
	EDIT_GENDER = '[Gender] Edit Gender', 
	EDIT_GENDER_SUCCESS = '[Gender] Edit Gender Success', 
	EDIT_GENDER_FAIL = '[Gender] Edit Gender Fail',

	DELETE_GENDER = '[Gender] Delete Gender', 
	DELETE_GENDER_SUCCESS = '[Gender] Delete Gender Success', 
	DELETE_GENDER_FAIL = '[Gender] Delete Gender Fail',
}

export class GetGender implements Action {
	public readonly type = GenderActionTypes.GET_GENDER;
	constructor(public payload: any) { }
}

export class GetGenderSuccess implements Action {
	public readonly type = GenderActionTypes.GET_GENDER_SUCCESS;
	constructor(public payload: any) { }
}

export class GetGenderFail implements Action {
	public readonly type = GenderActionTypes.GET_GENDER_FAIL;
	constructor(public payload: any) { }
}

export class GetGenderList implements Action {
	public readonly type = GenderActionTypes.GET_GENDER_LIST;
	constructor(public payload: any) { }
}

export class GetGenderListSuccess implements Action {
	public readonly type = GenderActionTypes.GET_GENDER_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetGenderListFail implements Action {
	public readonly type = GenderActionTypes.GET_GENDER_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveGender implements Action {
	public readonly type = GenderActionTypes.SAVE_GENDER;
	constructor(public payload: any) { }
}

export class SaveGenderSuccess implements Action {
	public readonly type = GenderActionTypes.SAVE_GENDER_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveGenderFail implements Action {
	public readonly type = GenderActionTypes.SAVE_GENDER_FAIL;
	constructor(public payload: any) { }
}

export class EditGender implements Action {
	public readonly type = GenderActionTypes.EDIT_GENDER;
	constructor(public payload: any) { }
}

export class EditGenderSuccess implements Action {
	public readonly type = GenderActionTypes.EDIT_GENDER_SUCCESS;
	constructor(public payload: any) { }
}

export class EditGenderFail implements Action {
	public readonly type = GenderActionTypes.EDIT_GENDER_FAIL;
	constructor(public payload: any) { }
}

export class DeleteGender implements Action {
	public readonly type = GenderActionTypes.DELETE_GENDER;
	constructor(public payload: any) { }
}

export class DeleteGenderSuccess implements Action {
	public readonly type = GenderActionTypes.DELETE_GENDER_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteGenderFail implements Action {
	public readonly type = GenderActionTypes.DELETE_GENDER_FAIL;
	constructor(public payload: any) { }
}

export type GenderAction =
	GetGender
|	GetGenderSuccess
|  	GetGenderFail
|   GetGenderList
|   GetGenderListSuccess
|   GetGenderListFail
|	SaveGender
|	SaveGenderSuccess
|	SaveGenderFail
|	EditGender
|	EditGenderSuccess
|	EditGenderFail
|	DeleteGender
|	DeleteGenderSuccess
|	DeleteGenderFail;



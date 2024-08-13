import { Action } from '@ngrx/store';

/* FOR HOBBIES  
*/
export const enum HobbiesActionTypes {
	GET_HOBBIES = '[Hobbies] Get Hobbies', 
	GET_HOBBIES_SUCCESS = '[Hobbies] Get Hobbies Success', 
	GET_HOBBIES_FAIL = '[Hobbies] Get Hobbies Fail', 

    GET_HOBBIES_LIST = '[Hobbies] Get Hobbies list', 
	GET_HOBBIES_LIST_SUCCESS = '[Hobbies] Get Hobbies list Success', 
	GET_HOBBIES_LIST_FAIL = '[Hobbies] Get Hobbies list Fail',

	SAVE_HOBBIES = '[Hobbies] Save Hobbies', 
	SAVE_HOBBIES_SUCCESS = '[Hobbies] Save Hobbies Success', 
	SAVE_HOBBIES_FAIL = '[Hobbies] Save Hobbies Fail',
	
	EDIT_HOBBIES = '[Hobbies] Edit Hobbies', 
	EDIT_HOBBIES_SUCCESS = '[Hobbies] Edit Hobbies Success', 
	EDIT_HOBBIES_FAIL = '[Hobbies] Edit Hobbies Fail',

	DELETE_HOBBIES = '[Hobbies] Delete Hobbies', 
	DELETE_HOBBIES_SUCCESS = '[Hobbies] Delete Hobbies Success', 
	DELETE_HOBBIES_FAIL = '[Hobbies] Delete Hobbies Fail',
}

export class GetHobbies implements Action {
	public readonly type = HobbiesActionTypes.GET_HOBBIES;
	constructor(public payload: any) { }
}

export class GetHobbiesSuccess implements Action {
	public readonly type = HobbiesActionTypes.GET_HOBBIES_SUCCESS;
	constructor(public payload: any) { }
}

export class GetHobbiesFail implements Action {
	public readonly type = HobbiesActionTypes.GET_HOBBIES_FAIL;
	constructor(public payload: any) { }
}

export class GetHobbiesList implements Action {
	public readonly type = HobbiesActionTypes.GET_HOBBIES_LIST;
	constructor(public payload: any) { }
}

export class GetHobbiesListSuccess implements Action {
	public readonly type = HobbiesActionTypes.GET_HOBBIES_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetHobbiesListFail implements Action {
	public readonly type = HobbiesActionTypes.GET_HOBBIES_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveHobbies implements Action {
	public readonly type = HobbiesActionTypes.SAVE_HOBBIES;
	constructor(public payload: any) { }
}

export class SaveHobbiesSuccess implements Action {
	public readonly type = HobbiesActionTypes.SAVE_HOBBIES_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveHobbiesFail implements Action {
	public readonly type = HobbiesActionTypes.SAVE_HOBBIES_FAIL;
	constructor(public payload: any) { }
}

export class EditHobbies implements Action {
	public readonly type = HobbiesActionTypes.EDIT_HOBBIES;
	constructor(public payload: any) { }
}

export class EditHobbiesSuccess implements Action {
	public readonly type = HobbiesActionTypes.EDIT_HOBBIES_SUCCESS;
	constructor(public payload: any) { }
}

export class EditHobbiesFail implements Action {
	public readonly type = HobbiesActionTypes.EDIT_HOBBIES_FAIL;
	constructor(public payload: any) { }
}

export class DeleteHobbies implements Action {
	public readonly type = HobbiesActionTypes.DELETE_HOBBIES;
	constructor(public payload: any) { }
}

export class DeleteHobbiesSuccess implements Action {
	public readonly type = HobbiesActionTypes.DELETE_HOBBIES_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteHobbiesFail implements Action {
	public readonly type = HobbiesActionTypes.DELETE_HOBBIES_FAIL;
	constructor(public payload: any) { }
}

export type HobbiesAction =
	GetHobbies
|	GetHobbiesSuccess
|  	GetHobbiesFail
|   GetHobbiesList
|   GetHobbiesListSuccess
|   GetHobbiesListFail
|	SaveHobbies
|	SaveHobbiesSuccess
|	SaveHobbiesFail
|	EditHobbies
|	EditHobbiesSuccess
|	EditHobbiesFail
|	DeleteHobbies
|	DeleteHobbiesSuccess
|	DeleteHobbiesFail;



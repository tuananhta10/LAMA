import { Action } from '@ngrx/store';

/* FOR QUALIFICATION  
*/
export const enum QualificationActionTypes {
	GET_QUALIFICATION = '[Qualification] Get Qualification', 
	GET_QUALIFICATION_SUCCESS = '[Qualification] Get Qualification Success', 
	GET_QUALIFICATION_FAIL = '[Qualification] Get Qualification Fail', 

    GET_QUALIFICATION_LIST = '[Qualification] Get Qualification list', 
	GET_QUALIFICATION_LIST_SUCCESS = '[Qualification] Get Qualification list Success', 
	GET_QUALIFICATION_LIST_FAIL = '[Qualification] Get Qualification list Fail',

	SAVE_QUALIFICATION = '[Qualification] Save Qualification', 
	SAVE_QUALIFICATION_SUCCESS = '[Qualification] Save Qualification Success', 
	SAVE_QUALIFICATION_FAIL = '[Qualification] Save Qualification Fail',
	
	EDIT_QUALIFICATION = '[Qualification] Edit Qualification', 
	EDIT_QUALIFICATION_SUCCESS = '[Qualification] Edit Qualification Success', 
	EDIT_QUALIFICATION_FAIL = '[Qualification] Edit Qualification Fail',

	DELETE_QUALIFICATION = '[Qualification] Delete Qualification', 
	DELETE_QUALIFICATION_SUCCESS = '[Qualification] Delete Qualification Success', 
	DELETE_QUALIFICATION_FAIL = '[Qualification] Delete Qualification Fail',
}

export class GetQualification implements Action {
	public readonly type = QualificationActionTypes.GET_QUALIFICATION;
	constructor(public payload: any) { }
}

export class GetQualificationSuccess implements Action {
	public readonly type = QualificationActionTypes.GET_QUALIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class GetQualificationFail implements Action {
	public readonly type = QualificationActionTypes.GET_QUALIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class GetQualificationList implements Action {
	public readonly type = QualificationActionTypes.GET_QUALIFICATION_LIST;
	constructor(public payload: any) { }
}

export class GetQualificationListSuccess implements Action {
	public readonly type = QualificationActionTypes.GET_QUALIFICATION_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetQualificationListFail implements Action {
	public readonly type = QualificationActionTypes.GET_QUALIFICATION_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveQualification implements Action {
	public readonly type = QualificationActionTypes.SAVE_QUALIFICATION;
	constructor(public payload: any) { }
}

export class SaveQualificationSuccess implements Action {
	public readonly type = QualificationActionTypes.SAVE_QUALIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveQualificationFail implements Action {
	public readonly type = QualificationActionTypes.SAVE_QUALIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class EditQualification implements Action {
	public readonly type = QualificationActionTypes.EDIT_QUALIFICATION;
	constructor(public payload: any) { }
}

export class EditQualificationSuccess implements Action {
	public readonly type = QualificationActionTypes.EDIT_QUALIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class EditQualificationFail implements Action {
	public readonly type = QualificationActionTypes.EDIT_QUALIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class DeleteQualification implements Action {
	public readonly type = QualificationActionTypes.DELETE_QUALIFICATION;
	constructor(public payload: any) { }
}

export class DeleteQualificationSuccess implements Action {
	public readonly type = QualificationActionTypes.DELETE_QUALIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteQualificationFail implements Action {
	public readonly type = QualificationActionTypes.DELETE_QUALIFICATION_FAIL;
	constructor(public payload: any) { }
}

export type QualificationAction =
	GetQualification
|	GetQualificationSuccess
|  	GetQualificationFail
|   GetQualificationList
|   GetQualificationListSuccess
|   GetQualificationListFail
|	SaveQualification
|	SaveQualificationSuccess
|	SaveQualificationFail
|	EditQualification
|	EditQualificationSuccess
|	EditQualificationFail
|   DeleteQualification
|   DeleteQualificationSuccess
|   DeleteQualificationFail;



import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_POSITION  
*/
export const enum EmployeePositionActionTypes {
	GET_EMPLOYEE_POSITION = '[EmployeePosition] Get EmployeePosition', 
	GET_EMPLOYEE_POSITION_SUCCESS = '[EmployeePosition] Get EmployeePosition Success', 
	GET_EMPLOYEE_POSITION_FAIL = '[EmployeePosition] Get EmployeePosition Fail', 

    GET_EMPLOYEE_POSITION_LIST = '[EmployeePosition] Get EmployeePosition list', 
	GET_EMPLOYEE_POSITION_LIST_SUCCESS = '[EmployeePosition] Get EmployeePosition list Success', 
	GET_EMPLOYEE_POSITION_LIST_FAIL = '[EmployeePosition] Get EmployeePosition list Fail',

	SAVE_EMPLOYEE_POSITION = '[EmployeePosition] Save EmployeePosition', 
	SAVE_EMPLOYEE_POSITION_SUCCESS = '[EmployeePosition] Save EmployeePosition Success', 
	SAVE_EMPLOYEE_POSITION_FAIL = '[EmployeePosition] Save EmployeePosition Fail',
	
	EDIT_EMPLOYEE_POSITION = '[EmployeePosition] Edit EmployeePosition', 
	EDIT_EMPLOYEE_POSITION_SUCCESS = '[EmployeePosition] Edit EmployeePosition Success', 
	EDIT_EMPLOYEE_POSITION_FAIL = '[EmployeePosition] Edit EmployeePosition Fail',

	DELETE_EMPLOYEE_POSITION = '[EmployeePosition] Delete EmployeePosition', 
	DELETE_EMPLOYEE_POSITION_SUCCESS = '[EmployeePosition] Delete EmployeePosition Success', 
	DELETE_EMPLOYEE_POSITION_FAIL = '[EmployeePosition] Delete EmployeePosition Fail',

	// FOR EMPLOYEE POSITION QUALIFICATION
	GET_EMPLOYEE_POSITION_QUALIFICATIONS = '[EmployeePositionQualification] Get EmployeePosition Qualification', 
	GET_EMPLOYEE_POSITION_QUALIFICATIONS_SUCCESS = '[EmployeePositionQualification] Get EmployeePosition Qualification Success', 
	GET_EMPLOYEE_POSITION_QUALIFICATIONS_FAIL = '[EmployeePositionQualification] Get EmployeePosition Qualification Fail', 

	UPLOAD_EMPLOYEE_POSITION = '[Client] Upload employee position', 
	UPLOAD_EMPLOYEE_POSITION_SUCCESS = '[Client] Upload employee position Success', 
	UPLOAD_EMPLOYEE_POSITION_FAIL = '[Client] Upload employee position Fail', 
}

export class GetEmployeePosition implements Action {
	public readonly type = EmployeePositionActionTypes.GET_EMPLOYEE_POSITION;
	constructor(public payload: any) { }
}

export class GetEmployeePositionSuccess implements Action {
	public readonly type = EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeePositionFail implements Action {
	public readonly type = EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeePositionList implements Action {
	public readonly type = EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeePositionListSuccess implements Action {
	public readonly type = EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeePositionListFail implements Action {
	public readonly type = EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeePosition implements Action {
	public readonly type = EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION;
	constructor(public payload: any) { }
}

export class SaveEmployeePositionSuccess implements Action {
	public readonly type = EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeePositionFail implements Action {
	public readonly type = EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeePosition implements Action {
	public readonly type = EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION;
	constructor(public payload: any) { }
}

export class EditEmployeePositionSuccess implements Action {
	public readonly type = EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeePositionFail implements Action {
	public readonly type = EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeePosition implements Action {
	public readonly type = EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION;
	constructor(public payload: any) { }
}

export class DeleteEmployeePositionSuccess implements Action {
	public readonly type = EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeePositionFail implements Action {
	public readonly type = EmployeePositionActionTypes.DELETE_EMPLOYEE_POSITION_FAIL;
	constructor(public payload: any) { }
}

export class UploadEmployeePosition implements Action {
	public readonly type = EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION;
	constructor(public payload: any) { }
}

export class UploadEmployeePositionSuccess implements Action {
	public readonly type = EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION_SUCCESS;
	constructor(public payload: any) { }
}

export class UploadEmployeePositionFail implements Action {
	public readonly type = EmployeePositionActionTypes.UPLOAD_EMPLOYEE_POSITION_FAIL;
	constructor(public payload: any) { }
}


export type EmployeePositionAction =
	GetEmployeePosition
|	GetEmployeePositionSuccess
|  	GetEmployeePositionFail
|   GetEmployeePositionList
|   GetEmployeePositionListSuccess
|   GetEmployeePositionListFail
|	SaveEmployeePosition
|	SaveEmployeePositionSuccess
|	SaveEmployeePositionFail
|	EditEmployeePosition
|	EditEmployeePositionSuccess
|	EditEmployeePositionFail
|	DeleteEmployeePosition
|	DeleteEmployeePositionSuccess
|	DeleteEmployeePositionFail
| 	UploadEmployeePosition
|	UploadEmployeePositionSuccess
| 	UploadEmployeePositionFail;



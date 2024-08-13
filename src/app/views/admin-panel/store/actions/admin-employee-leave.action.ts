import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_LEAVE  
*/
export const enum EmployeeLeaveActionTypes {
	GET_EMPLOYEE_LEAVE = '[EmployeeLeave] Get EmployeeLeave', 
	GET_EMPLOYEE_LEAVE_SUCCESS = '[EmployeeLeave] Get EmployeeLeave Success', 
	GET_EMPLOYEE_LEAVE_FAIL = '[EmployeeLeave] Get EmployeeLeave Fail', 

    GET_EMPLOYEE_LEAVE_LIST = '[EmployeeLeave] Get EmployeeLeave list', 
	GET_EMPLOYEE_LEAVE_LIST_SUCCESS = '[EmployeeLeave] Get EmployeeLeave list Success', 
	GET_EMPLOYEE_LEAVE_LIST_FAIL = '[EmployeeLeave] Get EmployeeLeave list Fail',

	SAVE_EMPLOYEE_LEAVE = '[EmployeeLeave] Save EmployeeLeave', 
	SAVE_EMPLOYEE_LEAVE_SUCCESS = '[EmployeeLeave] Save EmployeeLeave Success', 
	SAVE_EMPLOYEE_LEAVE_FAIL = '[EmployeeLeave] Save EmployeeLeave Fail',
	
	EDIT_EMPLOYEE_LEAVE = '[EmployeeLeave] Edit EmployeeLeave', 
	EDIT_EMPLOYEE_LEAVE_SUCCESS = '[EmployeeLeave] Edit EmployeeLeave Success', 
	EDIT_EMPLOYEE_LEAVE_FAIL = '[EmployeeLeave] Edit EmployeeLeave Fail',
	
	DELETE_EMPLOYEE_LEAVE = '[EmployeeLeave] Delete EmployeeLeave', 
	DELETE_EMPLOYEE_LEAVE_SUCCESS = '[EmployeeLeave] Delete EmployeeLeave Success', 
	DELETE_EMPLOYEE_LEAVE_FAIL = '[EmployeeLeave] Delete EmployeeLeave Fail',

	UPLOAD_EMPLOYEE_LEAVE = '[Client] Upload employee leave', 
	UPLOAD_EMPLOYEE_LEAVE_SUCCESS = '[Client] Upload employee leave Success', 
	UPLOAD_EMPLOYEE_LEAVE_FAIL = '[Client] Upload employee leave Fail', 
}

export class GetEmployeeLeave implements Action {
	public readonly type = EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE;
	constructor(public payload: any) { }
}

export class GetEmployeeLeaveSuccess implements Action {
	public readonly type = EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeLeaveFail implements Action {
	public readonly type = EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeLeaveList implements Action {
	public readonly type = EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeeLeaveListSuccess implements Action {
	public readonly type = EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeLeaveListFail implements Action {
	public readonly type = EmployeeLeaveActionTypes.GET_EMPLOYEE_LEAVE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeLeave implements Action {
	public readonly type = EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE;
	constructor(public payload: any) { }
}

export class SaveEmployeeLeaveSuccess implements Action {
	public readonly type = EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeLeaveFail implements Action {
	public readonly type = EmployeeLeaveActionTypes.SAVE_EMPLOYEE_LEAVE_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeLeave implements Action {
	public readonly type = EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE;
	constructor(public payload: any) { }
}

export class EditEmployeeLeaveSuccess implements Action {
	public readonly type = EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeLeaveFail implements Action {
	public readonly type = EmployeeLeaveActionTypes.EDIT_EMPLOYEE_LEAVE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeLeave implements Action {
	public readonly type = EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE;
	constructor(public payload: any) { }
}

export class DeleteEmployeeLeaveSuccess implements Action {
	public readonly type = EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeLeaveFail implements Action {
	public readonly type = EmployeeLeaveActionTypes.DELETE_EMPLOYEE_LEAVE_FAIL;
	constructor(public payload: any) { }
}

export class UploadEmployeeLeave implements Action {
	public readonly type = EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE;
	constructor(public payload: any) { }
}

export class UploadEmployeeLeaveSuccess implements Action {
	public readonly type = EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE_SUCCESS;
	constructor(public payload: any) { }
}

export class UploadEmployeeLeaveFail implements Action {
	public readonly type = EmployeeLeaveActionTypes.UPLOAD_EMPLOYEE_LEAVE_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeLeaveAction =
	GetEmployeeLeave
|	GetEmployeeLeaveSuccess
|  	GetEmployeeLeaveFail
|   GetEmployeeLeaveList
|   GetEmployeeLeaveListSuccess
|   GetEmployeeLeaveListFail
|	SaveEmployeeLeave
|	SaveEmployeeLeaveSuccess
|	SaveEmployeeLeaveFail
|	EditEmployeeLeave
|	EditEmployeeLeaveSuccess
|	EditEmployeeLeaveFail
|	DeleteEmployeeLeave
|	DeleteEmployeeLeaveSuccess
|	DeleteEmployeeLeaveFail
|	UploadEmployeeLeave
|	UploadEmployeeLeaveSuccess
|	UploadEmployeeLeaveFail;



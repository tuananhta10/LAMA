import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_SHIFT 
*/
export const enum EmployeeShiftActionTypes {
	GET_EMPLOYEE_SHIFT = '[EmployeeShift] Get EmployeeShift', 
	GET_EMPLOYEE_SHIFT_SUCCESS = '[EmployeeShift] Get EmployeeShift Success', 
	GET_EMPLOYEE_SHIFT_FAIL = '[EmployeeShift] Get EmployeeShift Fail', 

    GET_EMPLOYEE_SHIFT_LIST = '[EmployeeShift] Get EmployeeShift list', 
	GET_EMPLOYEE_SHIFT_LIST_SUCCESS = '[EmployeeShift] Get EmployeeShift list Success', 
	GET_EMPLOYEE_SHIFT_LIST_FAIL = '[EmployeeShift] Get EmployeeShift list Fail',

	SAVE_EMPLOYEE_SHIFT = '[EmployeeShift] Save EmployeeShift', 
	SAVE_EMPLOYEE_SHIFT_SUCCESS = '[EmployeeShift] Save EmployeeShift Success', 
	SAVE_EMPLOYEE_SHIFT_FAIL = '[EmployeeShift] Save EmployeeShift Fail',
	
	EDIT_EMPLOYEE_SHIFT = '[EmployeeShift] Edit EmployeeShift', 
	EDIT_EMPLOYEE_SHIFT_SUCCESS = '[EmployeeShift] Edit EmployeeShift Success', 
	EDIT_EMPLOYEE_SHIFT_FAIL = '[EmployeeShift] Edit EmployeeShift Fail',

	DELETE_EMPLOYEE_SHIFT = '[EmployeeShift] Delete EmployeeShift', 
	DELETE_EMPLOYEE_SHIFT_SUCCESS = '[EmployeeShift] Delete EmployeeShift Success', 
	DELETE_EMPLOYEE_SHIFT_FAIL = '[EmployeeShift] Delete EmployeeShift Fail',
}

export class GetEmployeeShift implements Action {
	public readonly type = EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT;
	constructor(public payload: any) { }
}

export class GetEmployeeShiftSuccess implements Action {
	public readonly type = EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeShiftFail implements Action {
	public readonly type = EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeShiftList implements Action {
	public readonly type = EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeeShiftListSuccess implements Action {
	public readonly type = EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeShiftListFail implements Action {
	public readonly type = EmployeeShiftActionTypes.GET_EMPLOYEE_SHIFT_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeShift implements Action {
	public readonly type = EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT;
	constructor(public payload: any) { }
}

export class SaveEmployeeShiftSuccess implements Action {
	public readonly type = EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeShiftFail implements Action {
	public readonly type = EmployeeShiftActionTypes.SAVE_EMPLOYEE_SHIFT_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeShift implements Action {
	public readonly type = EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT;
	constructor(public payload: any) { }
}

export class EditEmployeeShiftSuccess implements Action {
	public readonly type = EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeShiftFail implements Action {
	public readonly type = EmployeeShiftActionTypes.EDIT_EMPLOYEE_SHIFT_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeShift implements Action {
	public readonly type = EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT;
	constructor(public payload: any) { }
}

export class DeleteEmployeeShiftSuccess implements Action {
	public readonly type = EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeShiftFail implements Action {
	public readonly type = EmployeeShiftActionTypes.DELETE_EMPLOYEE_SHIFT_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeShiftAction =
    GetEmployeeShift
|	GetEmployeeShiftSuccess
|  	GetEmployeeShiftFail
|   GetEmployeeShiftList
|   GetEmployeeShiftListSuccess
|   GetEmployeeShiftListFail
|	SaveEmployeeShift
|	SaveEmployeeShiftSuccess
|	SaveEmployeeShiftFail
|	EditEmployeeShift
|	EditEmployeeShiftSuccess
|	EditEmployeeShiftFail
|	DeleteEmployeeShift
|	DeleteEmployeeShiftSuccess
|	DeleteEmployeeShiftFail;



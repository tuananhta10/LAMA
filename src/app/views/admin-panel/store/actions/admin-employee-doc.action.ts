import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_DOC  
*/
export const enum EmployeeDocActionTypes {
	GET_EMPLOYEE_DOC = '[EmployeeDoc] Get EmployeeDoc', 
	GET_EMPLOYEE_DOC_SUCCESS = '[EmployeeDoc] Get EmployeeDoc Success', 
	GET_EMPLOYEE_DOC_FAIL = '[EmployeeDoc] Get EmployeeDoc Fail', 

    GET_EMPLOYEE_DOC_LIST = '[EmployeeDoc] Get EmployeeDoc list', 
	GET_EMPLOYEE_DOC_LIST_SUCCESS = '[EmployeeDoc] Get EmployeeDoc list Success', 
	GET_EMPLOYEE_DOC_LIST_FAIL = '[EmployeeDoc] Get EmployeeDoc list Fail',

	SAVE_EMPLOYEE_DOC = '[EmployeeDoc] Save EmployeeDoc', 
	SAVE_EMPLOYEE_DOC_SUCCESS = '[EmployeeDoc] Save EmployeeDoc Success', 
	SAVE_EMPLOYEE_DOC_FAIL = '[EmployeeDoc] Save EmployeeDoc Fail',
	
	EDIT_EMPLOYEE_DOC = '[EmployeeDoc] Edit EmployeeDoc', 
	EDIT_EMPLOYEE_DOC_SUCCESS = '[EmployeeDoc] Edit EmployeeDoc Success', 
	EDIT_EMPLOYEE_DOC_FAIL = '[EmployeeDoc] Edit EmployeeDoc Fail',

	DELETE_EMPLOYEE_DOC = '[EmployeeDoc] Delete EmployeeDoc', 
	DELETE_EMPLOYEE_DOC_SUCCESS = '[EmployeeDoc] Delete EmployeeDoc Success', 
	DELETE_EMPLOYEE_DOC_FAIL = '[EmployeeDoc] Delete EmployeeDoc Fail',
}

export class GetEmployeeDoc implements Action {
	public readonly type = EmployeeDocActionTypes.GET_EMPLOYEE_DOC;
	constructor(public payload: any) { }
}

export class GetEmployeeDocSuccess implements Action {
	public readonly type = EmployeeDocActionTypes.GET_EMPLOYEE_DOC_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeDocFail implements Action {
	public readonly type = EmployeeDocActionTypes.GET_EMPLOYEE_DOC_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeDocList implements Action {
	public readonly type = EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeeDocListSuccess implements Action {
	public readonly type = EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeDocListFail implements Action {
	public readonly type = EmployeeDocActionTypes.GET_EMPLOYEE_DOC_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeDoc implements Action {
	public readonly type = EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC;
	constructor(public payload: any) { }
}

export class SaveEmployeeDocSuccess implements Action {
	public readonly type = EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeDocFail implements Action {
	public readonly type = EmployeeDocActionTypes.SAVE_EMPLOYEE_DOC_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeDoc implements Action {
	public readonly type = EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC;
	constructor(public payload: any) { }
}

export class EditEmployeeDocSuccess implements Action {
	public readonly type = EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeDocFail implements Action {
	public readonly type = EmployeeDocActionTypes.EDIT_EMPLOYEE_DOC_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeDoc implements Action {
	public readonly type = EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC;
	constructor(public payload: any) { }
}

export class DeleteEmployeeDocSuccess implements Action {
	public readonly type = EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeDocFail implements Action {
	public readonly type = EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeDocAction =
	GetEmployeeDoc
|	GetEmployeeDocSuccess
|  	GetEmployeeDocFail
|   GetEmployeeDocList
|   GetEmployeeDocListSuccess
|   GetEmployeeDocListFail
|	SaveEmployeeDoc
|	SaveEmployeeDocSuccess
|	SaveEmployeeDocFail
|	EditEmployeeDoc
|	EditEmployeeDocSuccess
|	EditEmployeeDocFail
|	DeleteEmployeeDoc
|	DeleteEmployeeDocSuccess
|	DeleteEmployeeDocFail;



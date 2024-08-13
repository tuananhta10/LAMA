import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_TASK  
*/
export const enum EmployeeTaskActionTypes {
	GET_EMPLOYEE_TASK = '[EmployeeTask] Get EmployeeTask', 
	GET_EMPLOYEE_TASK_SUCCESS = '[EmployeeTask] Get EmployeeTask Success', 
	GET_EMPLOYEE_TASK_FAIL = '[EmployeeTask] Get EmployeeTask Fail', 

    GET_EMPLOYEE_TASK_LIST = '[EmployeeTask] Get EmployeeTask list', 
	GET_EMPLOYEE_TASK_LIST_SUCCESS = '[EmployeeTask] Get EmployeeTask list Success', 
	GET_EMPLOYEE_TASK_LIST_FAIL = '[EmployeeTask] Get EmployeeTask list Fail',

	SAVE_EMPLOYEE_TASK = '[EmployeeTask] Save EmployeeTask', 
	SAVE_EMPLOYEE_TASK_SUCCESS = '[EmployeeTask] Save EmployeeTask Success', 
	SAVE_EMPLOYEE_TASK_FAIL = '[EmployeeTask] Save EmployeeTask Fail',
	
	EDIT_EMPLOYEE_TASK = '[EmployeeTask] Edit EmployeeTask', 
	EDIT_EMPLOYEE_TASK_SUCCESS = '[EmployeeTask] Edit EmployeeTask Success', 
	EDIT_EMPLOYEE_TASK_FAIL = '[EmployeeTask] Edit EmployeeTask Fail',

	DELETE_EMPLOYEE_TASK = '[EmployeeTask] Delete EmployeeTask', 
	DELETE_EMPLOYEE_TASK_SUCCESS = '[EmployeeTask] Delete EmployeeTask Success', 
	DELETE_EMPLOYEE_TASK_FAIL = '[EmployeeTask] Delete EmployeeTask Fail',
}

export class GetEmployeeTask implements Action {
	public readonly type = EmployeeTaskActionTypes.GET_EMPLOYEE_TASK;
	constructor(public payload: any) { }
}

export class GetEmployeeTaskSuccess implements Action {
	public readonly type = EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeTaskFail implements Action {
	public readonly type = EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeTaskList implements Action {
	public readonly type = EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeeTaskListSuccess implements Action {
	public readonly type = EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeTaskListFail implements Action {
	public readonly type = EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeTask implements Action {
	public readonly type = EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK;
	constructor(public payload: any) { }
}

export class SaveEmployeeTaskSuccess implements Action {
	public readonly type = EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeTaskFail implements Action {
	public readonly type = EmployeeTaskActionTypes.SAVE_EMPLOYEE_TASK_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeTask implements Action {
	public readonly type = EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK;
	constructor(public payload: any) { }
}

export class EditEmployeeTaskSuccess implements Action {
	public readonly type = EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeTaskFail implements Action {
	public readonly type = EmployeeTaskActionTypes.EDIT_EMPLOYEE_TASK_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeTask implements Action {
	public readonly type = EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK;
	constructor(public payload: any) { }
}

export class DeleteEmployeeTaskSuccess implements Action {
	public readonly type = EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeTaskFail implements Action {
	public readonly type = EmployeeTaskActionTypes.DELETE_EMPLOYEE_TASK_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeTaskAction =
	GetEmployeeTask
|	GetEmployeeTaskSuccess
|  	GetEmployeeTaskFail
|   GetEmployeeTaskList
|   GetEmployeeTaskListSuccess
|   GetEmployeeTaskListFail
|	SaveEmployeeTask
|	SaveEmployeeTaskSuccess
|	SaveEmployeeTaskFail
|	EditEmployeeTask
|	EditEmployeeTaskSuccess
|	EditEmployeeTaskFail
|	DeleteEmployeeTask
|	DeleteEmployeeTaskSuccess
|	DeleteEmployeeTaskFail;



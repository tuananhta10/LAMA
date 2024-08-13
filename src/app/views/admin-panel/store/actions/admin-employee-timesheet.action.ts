import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_TIMESHEET
*/
export const enum EmployeeTimesheetActionTypes {
	GET_EMPLOYEE_TIMESHEET = '[EmployeeTimesheet] Get EmployeeTimesheet', 
	GET_EMPLOYEE_TIMESHEET_SUCCESS = '[EmployeeTimesheet] Get EmployeeTimesheet Success', 
	GET_EMPLOYEE_TIMESHEET_FAIL = '[EmployeeTimesheet] Get EmployeeTimesheet Fail', 

    GET_EMPLOYEE_TIMESHEET_LIST = '[EmployeeTimesheet] Get EmployeeTimesheet list', 
	GET_EMPLOYEE_TIMESHEET_LIST_SUCCESS = '[EmployeeTimesheet] Get EmployeeTimesheet list Success', 
	GET_EMPLOYEE_TIMESHEET_LIST_FAIL = '[EmployeeTimesheet] Get EmployeeTimesheet list Fail',

	SAVE_EMPLOYEE_TIMESHEET = '[EmployeeTimesheet] Save EmployeeTimesheet', 
	SAVE_EMPLOYEE_TIMESHEET_SUCCESS = '[EmployeeTimesheet] Save EmployeeTimesheet Success', 
	SAVE_EMPLOYEE_TIMESHEET_FAIL = '[EmployeeTimesheet] Save EmployeeTimesheet Fail',
	
	EDIT_EMPLOYEE_TIMESHEET = '[EmployeeTimesheet] Edit EmployeeTimesheet', 
	EDIT_EMPLOYEE_TIMESHEET_SUCCESS = '[EmployeeTimesheet] Edit EmployeeTimesheet Success', 
	EDIT_EMPLOYEE_TIMESHEET_FAIL = '[EmployeeTimesheet] Edit EmployeeTimesheet Fail',

	DELETE_EMPLOYEE_TIMESHEET = '[EmployeeTimesheet] Delete EmployeeTimesheet', 
	DELETE_EMPLOYEE_TIMESHEET_SUCCESS = '[EmployeeTimesheet] Delete EmployeeTimesheet Success', 
	DELETE_EMPLOYEE_TIMESHEET_FAIL = '[EmployeeTimesheet] Delete EmployeeTimesheet Fail',
}

export class GetEmployeeTimesheet implements Action {
	public readonly type = EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET;
	constructor(public payload: any) { }
}

export class GetEmployeeTimesheetSuccess implements Action {
	public readonly type = EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeTimesheetFail implements Action {
	public readonly type = EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeTimesheetList implements Action {
	public readonly type = EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeeTimesheetListSuccess implements Action {
	public readonly type = EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeTimesheetListFail implements Action {
	public readonly type = EmployeeTimesheetActionTypes.GET_EMPLOYEE_TIMESHEET_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeTimesheet implements Action {
	public readonly type = EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET;
	constructor(public payload: any) { }
}

export class SaveEmployeeTimesheetSuccess implements Action {
	public readonly type = EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeTimesheetFail implements Action {
	public readonly type = EmployeeTimesheetActionTypes.SAVE_EMPLOYEE_TIMESHEET_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeTimesheet implements Action {
	public readonly type = EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET;
	constructor(public payload: any) { }
}

export class EditEmployeeTimesheetSuccess implements Action {
	public readonly type = EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeTimesheetFail implements Action {
	public readonly type = EmployeeTimesheetActionTypes.EDIT_EMPLOYEE_TIMESHEET_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeTimesheet implements Action {
	public readonly type = EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET;
	constructor(public payload: any) { }
}

export class DeleteEmployeeTimesheetSuccess implements Action {
	public readonly type = EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeTimesheetFail implements Action {
	public readonly type = EmployeeTimesheetActionTypes.DELETE_EMPLOYEE_TIMESHEET_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeTimesheetAction =
    GetEmployeeTimesheet
|	GetEmployeeTimesheetSuccess
|  	GetEmployeeTimesheetFail
|   GetEmployeeTimesheetList
|   GetEmployeeTimesheetListSuccess
|   GetEmployeeTimesheetListFail
|	SaveEmployeeTimesheet
|	SaveEmployeeTimesheetSuccess
|	SaveEmployeeTimesheetFail
|	EditEmployeeTimesheet
|	EditEmployeeTimesheetSuccess
|	EditEmployeeTimesheetFail
|	DeleteEmployeeTimesheet
|	DeleteEmployeeTimesheetSuccess
|	DeleteEmployeeTimesheetFail;



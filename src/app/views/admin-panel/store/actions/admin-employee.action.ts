import { Action } from '@ngrx/store';

/* FOR EMPLOYEE  
*/
export const enum EmployeeActionTypes {
	GET_EMPLOYEE = '[Employee] Get Employee', 
	GET_EMPLOYEE_SUCCESS = '[Employee] Get Employee Success', 
	GET_EMPLOYEE_FAIL = '[Employee] Get Employee Fail', 
	SAVE_EMPLOYEE = '[Employee] Save Employee', 
	SAVE_EMPLOYEE_SUCCESS = '[Employee] Save Employee Success', 
	SAVE_EMPLOYEE_FAIL = '[Employee] Save Employee Fail',

	SAVE_DRAFT_EMPLOYEE = '[Employee] Save Draft Employee', 
	SAVE_DRAFT_EMPLOYEE_SUCCESS = '[Employee] Save Draft Employee Success', 
	SAVE_DRAFT_EMPLOYEE_FAIL = '[Employee] Save Draft Employee Fail',

	EDIT_EMPLOYEE = '[Employee] Edit Employee', 
	EDIT_EMPLOYEE_SUCCESS = '[Employee] Edit Employee Success', 
	EDIT_EMPLOYEE_FAIL = '[Employee] Edit Employee Fail',
	EDIT_EMPLOYEE_PASSWORD = '[Employee] Edit Employee Password', 
	EDIT_EMPLOYEE_PASSWORD_SUCCESS = '[Employee] Edit Employee Password Success', 
	EDIT_EMPLOYEE_PASSWORD_FAIL = '[Employee] Edit Employee Password Fail',
	GET_EMPLOYEE_STATS = '[Employee] Get Employee Stats', 
	GET_EMPLOYEE_STATS_SUCCESS = '[Employee] Get Employee Stats Success', 
	GET_EMPLOYEE_STATS_FAIL = '[Employee] Get Employee Stats Fail', 
	
	EDIT_EMPLOYEE_QUALIFICATION = '[Employee] Edit Employee Qualification', 
	EDIT_EMPLOYEE_QUALIFICATION_SUCCESS = '[Employee] Edit Employee Qualification Success', 
	EDIT_EMPLOYEE_QUALIFICATION_FAIL = '[Employee] Edit Employee Qualification Fail',

	EDIT_EMPLOYEE_DETAILS_QUALIFICATION = '[Employee] Edit Employee Qualification From Edit Details', 
	EDIT_EMPLOYEE_DETAILS_QUALIFICATION_SUCCESS = '[Employee] Edit Employee Qualification From Edit Details Success', 
	EDIT_EMPLOYEE_DETAILS_QUALIFICATION_FAIL = '[Employee] Edit Employee Qualification From Edit Details Fail',
}

export class GetEmployee implements Action {
	public readonly type = EmployeeActionTypes.GET_EMPLOYEE;
	constructor(public payload: any) { }
}

export class GetEmployeeSuccess implements Action {
	public readonly type = EmployeeActionTypes.GET_EMPLOYEE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeFail implements Action {
	public readonly type = EmployeeActionTypes.GET_EMPLOYEE_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployee implements Action {
	public readonly type = EmployeeActionTypes.SAVE_EMPLOYEE;
	constructor(public payload: any) { }
}

export class SaveEmployeeSuccess implements Action {
	public readonly type = EmployeeActionTypes.SAVE_EMPLOYEE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveDraftEmployeeFail implements Action {
	public readonly type = EmployeeActionTypes.SAVE_EMPLOYEE_FAIL;
	constructor(public payload: any) { }
}

export class SaveDraftEmployee implements Action {
	public readonly type = EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE;
	constructor(public payload: any) { }
}

export class SaveDraftEmployeeSuccess implements Action {
	public readonly type = EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeFail implements Action {
	public readonly type = EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployee implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE;
	constructor(public payload: any) { }
}

export class EditEmployeeSuccess implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeFail implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeePassword implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD;
	constructor(public payload: any) { }
}

export class EditEmployeePasswordSuccess implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeePasswordFail implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_PASSWORD_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeStats implements Action {
	public readonly type = EmployeeActionTypes.GET_EMPLOYEE_STATS;
	constructor(public payload: any) { }
}

export class GetEmployeeStatsSuccess implements Action {
	public readonly type = EmployeeActionTypes.GET_EMPLOYEE_STATS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeStatsFail implements Action {
	public readonly type = EmployeeActionTypes.GET_EMPLOYEE_STATS_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeQualification implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION;
	constructor(public payload: any) { }
}

export class EditEmployeeQualificationSuccess implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeQualificationFail implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_QUALIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeDetailsQualification implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION;
	constructor(public payload: any) { }
}

export class EditEmployeeDetailsQualificationSuccess implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeDetailsQualificationFail implements Action {
	public readonly type = EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeAction =
	GetEmployee
|	GetEmployeeSuccess
|  	GetEmployeeFail
|	SaveEmployee
|	SaveEmployeeSuccess
|	SaveEmployeeFail
|	SaveDraftEmployeeFail
|	SaveDraftEmployee
|	SaveDraftEmployeeSuccess
|	EditEmployee
|	EditEmployeeSuccess
|	EditEmployeeFail
|	EditEmployeePassword
|	EditEmployeePasswordSuccess
|	EditEmployeePasswordFail
|   GetEmployeeStats
|	GetEmployeeStatsSuccess
|  	GetEmployeeStatsFail
|	EditEmployeeQualification
|	EditEmployeeQualificationSuccess
|	EditEmployeeQualificationFail
|	EditEmployeeDetailsQualification
|	EditEmployeeDetailsQualificationSuccess
|	EditEmployeeDetailsQualificationFail;


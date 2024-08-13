import { Action } from '@ngrx/store';

/* FOR EMPLOYEE LIST 
*/
export const enum EmployeeListActionTypes {
	/*  CAPITAL FOR ACTION TYPE = [Title] Description */
	GET_EMPLOYEE_LIST = '[Employee List] Get Employee List for Admin Panel', 
	GET_EMPLOYEE_LIST_SUCCESS = '[Employee List] Get Employee List for Admin Panel Success', 
	GET_EMPLOYEE_LIST_FAIL = '[Employee List] Get Employee List for Admin Panel Fail', 

	GET_EMPLOYEE_LIST_COMPLIANCE = '[Employee List Compliance] Get Employee List Compliance for Admin Panel', 
	GET_EMPLOYEE_LIST_COMPLIANCE_SUCCESS = '[Employee List Compliance] Get Employee List Compliance for Admin Panel Success', 
	GET_EMPLOYEE_LIST_COMPLIANCE_FAIL = '[Employee List Compliance] Get Employee List Compliance for Admin Panel Fail', 

	DELETE_EMPLOYEE_LIST = '[Delete Employee List] Delete Employee from List for Admin Panel', 
	DELETE_EMPLOYEE_LIST_SUCCESS = '[Delete Employee List] Delete Employee  fromList for Admin Panel Success', 
	DELETE_EMPLOYEE_LIST_FAIL = '[Delete Employee List] Delete Employee from List for Admin Panel Fail', 

	/*  CAPITAL FOR ACTION TYPE = [Title] Description */
	GET_EMPLOYEE_CLIENTS_LIST = '[Employee Clients List] Get Employee Clients List for Admin Panel', 
	GET_EMPLOYEE_CLIENTS_LIST_SUCCESS = '[Employee Clients List] Get Employee Clients List for Admin Panel Success', 
	GET_EMPLOYEE_CLIENTS_LIST_FAIL = '[Employee Clients List] Get Employee Clients List for Admin Panel Fail', 

	GET_EMPLOYEE_LIVE_FEED = '[Employee Live Feed] Get Employee Live Feed for Admin Panel', 
	GET_EMPLOYEE_LIVE_FEED_SUCCESS = '[Employee Live Feed] Get Employee Live Feed for Admin Panel Success', 
	GET_EMPLOYEE_LIVE_FEED_FAIL = '[Employee Live Feed] Get Employee Live Feed for Admin Panel Fail', 

	UPLOAD_EMPLOYEE = '[Client] Upload employee', 
	UPLOAD_EMPLOYEE_SUCCESS = '[Client] Upload employee Success', 
	UPLOAD_EMPLOYEE_FAIL = '[Client] Upload employee Fail', 
}

/* EMPLOYEE LIST */
export class GetEmployeeList implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIST;
	constructor(public payload: any) { }
}
export class GetEmployeeListSuccess implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIST_SUCCESS;
	constructor(public payload: any) { }
}
export class GetEmployeeListFail implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeListCompliance implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE;
	constructor(public payload: any) { }
}
export class GetEmployeeListComplianceSuccess implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE_SUCCESS;
	constructor(public payload: any) { }
}
export class GetEmployeeListComplianceFail implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIST_COMPLIANCE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeList implements Action {
	public readonly type = EmployeeListActionTypes.DELETE_EMPLOYEE_LIST;
	constructor(public payload: any) { }
}

export class DeleteEmployeeListSuccess implements Action {
	public readonly type = EmployeeListActionTypes.DELETE_EMPLOYEE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeListFail implements Action {
	public readonly type = EmployeeListActionTypes.DELETE_EMPLOYEE_LIST_FAIL;
	constructor(public payload: any) { }
}

/* EMPLOYEE CLIENTS */
export class GetEmployeeClientsList implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST;
	constructor(public payload: any) { }
}
export class GetEmployeeClientsListSuccess implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST_SUCCESS;
	constructor(public payload: any) { }
}
export class GetEmployeeClientsListFail implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_CLIENTS_LIST_FAIL;
	constructor(public payload: any) { }
}

/* EMPLOYEE LIVE FEEDS */
export class GetEmployeeLiveFeed implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED;
	constructor(public payload: any) { }
}
export class GetEmployeeLiveFeedSuccess implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED_SUCCESS;
	constructor(public payload: any) { }
}
export class GetEmployeeLiveFeedFail implements Action {
	public readonly type = EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED_FAIL;
	constructor(public payload: any) { }
}

export class UploadEmployee implements Action {
	public readonly type = EmployeeListActionTypes.UPLOAD_EMPLOYEE;
	constructor(public payload: any) { }
}

export class UploadEmployeeSuccess implements Action {
	public readonly type = EmployeeListActionTypes.UPLOAD_EMPLOYEE_SUCCESS;
	constructor(public payload: any) { }
}

export class UploadEmployeeFail implements Action {
	public readonly type = EmployeeListActionTypes.UPLOAD_EMPLOYEE_FAIL;
	constructor(public payload: any) { }
}





// Export each interface
export type EmployeeListAction =
	GetEmployeeList
|	GetEmployeeListSuccess
|  	GetEmployeeListFail
|	GetEmployeeListCompliance
|	GetEmployeeListComplianceSuccess
|	GetEmployeeListComplianceFail
|	DeleteEmployeeList
|	DeleteEmployeeListSuccess
|	DeleteEmployeeListFail
|	GetEmployeeLiveFeed
|	GetEmployeeLiveFeedSuccess
|  	GetEmployeeLiveFeedFail
|	GetEmployeeClientsList
|	GetEmployeeClientsListSuccess
|	GetEmployeeClientsListFail
|	UploadEmployee
|	UploadEmployeeSuccess
|	UploadEmployeeFail;



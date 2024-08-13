import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_CERTIFICATE  
*/
export const enum EmployeeCertificateActionTypes {
	GET_EMPLOYEE_CERTIFICATE = '[EmployeeCertificate] Get EmployeeCertificate', 
	GET_EMPLOYEE_CERTIFICATE_SUCCESS = '[EmployeeCertificate] Get EmployeeCertificate Success', 
	GET_EMPLOYEE_CERTIFICATE_FAIL = '[EmployeeCertificate] Get EmployeeCertificate Fail', 

    GET_EMPLOYEE_CERTIFICATE_LIST = '[EmployeeCertificate] Get EmployeeCertificate list', 
	GET_EMPLOYEE_CERTIFICATE_LIST_SUCCESS = '[EmployeeCertificate] Get EmployeeCertificate list Success', 
	GET_EMPLOYEE_CERTIFICATE_LIST_FAIL = '[EmployeeCertificate] Get EmployeeCertificate list Fail',

	SAVE_EMPLOYEE_CERTIFICATE = '[EmployeeCertificate] Save EmployeeCertificate', 
	SAVE_EMPLOYEE_CERTIFICATE_SUCCESS = '[EmployeeCertificate] Save EmployeeCertificate Success', 
	SAVE_EMPLOYEE_CERTIFICATE_FAIL = '[EmployeeCertificate] Save EmployeeCertificate Fail',
	
	EDIT_EMPLOYEE_CERTIFICATE = '[EmployeeCertificate] Edit EmployeeCertificate', 
	EDIT_EMPLOYEE_CERTIFICATE_SUCCESS = '[EmployeeCertificate] Edit EmployeeCertificate Success', 
	EDIT_EMPLOYEE_CERTIFICATE_FAIL = '[EmployeeCertificate] Edit EmployeeCertificate Fail',

	DELETE_EMPLOYEE_CERTIFICATE = '[EmployeeCertificate] Delete EmployeeCertificate', 
	DELETE_EMPLOYEE_CERTIFICATE_SUCCESS = '[EmployeeCertificate] Delete EmployeeCertificate Success', 
	DELETE_EMPLOYEE_CERTIFICATE_FAIL = '[EmployeeCertificate] Delete EmployeeCertificate Fail',
}

export class GetEmployeeCertificate implements Action {
	public readonly type = EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE;
	constructor(public payload: any) { }
}

export class GetEmployeeCertificateSuccess implements Action {
	public readonly type = EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeCertificateFail implements Action {
	public readonly type = EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeCertificateList implements Action {
	public readonly type = EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeeCertificateListSuccess implements Action {
	public readonly type = EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeCertificateListFail implements Action {
	public readonly type = EmployeeCertificateActionTypes.GET_EMPLOYEE_CERTIFICATE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeCertificate implements Action {
	public readonly type = EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE;
	constructor(public payload: any) { }
}

export class SaveEmployeeCertificateSuccess implements Action {
	public readonly type = EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeCertificateFail implements Action {
	public readonly type = EmployeeCertificateActionTypes.SAVE_EMPLOYEE_CERTIFICATE_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeCertificate implements Action {
	public readonly type = EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE;
	constructor(public payload: any) { }
}

export class EditEmployeeCertificateSuccess implements Action {
	public readonly type = EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeCertificateFail implements Action {
	public readonly type = EmployeeCertificateActionTypes.EDIT_EMPLOYEE_CERTIFICATE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeCertificate implements Action {
	public readonly type = EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE;
	constructor(public payload: any) { }
}

export class DeleteEmployeeCertificateSuccess implements Action {
	public readonly type = EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeCertificateFail implements Action {
	public readonly type = EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeCertificateAction =
	GetEmployeeCertificate
|	GetEmployeeCertificateSuccess
|  	GetEmployeeCertificateFail
|   GetEmployeeCertificateList
|   GetEmployeeCertificateListSuccess
|   GetEmployeeCertificateListFail
|	SaveEmployeeCertificate
|	SaveEmployeeCertificateSuccess
|	SaveEmployeeCertificateFail
|	EditEmployeeCertificate
|	EditEmployeeCertificateSuccess
|	EditEmployeeCertificateFail
|	DeleteEmployeeCertificate
|	DeleteEmployeeCertificateSuccess
|	DeleteEmployeeCertificateFail;



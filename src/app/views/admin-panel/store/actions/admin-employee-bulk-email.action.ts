import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_BULK_EMAIL_NOTIFICATION  
*/
export const enum EmployeeBulkEmailActionTypes {
	GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION = '[EmployeeBulkEmail] Get EmployeeBulkEmail', 
	GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS = '[EmployeeBulkEmail] Get EmployeeBulkEmail Success', 
	GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL = '[EmployeeBulkEmail] Get EmployeeBulkEmail Fail', 

    GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST = '[EmployeeBulkEmail] Get EmployeeBulkEmail list', 
	GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST_SUCCESS = '[EmployeeBulkEmail] Get EmployeeBulkEmail list Success', 
	GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST_FAIL = '[EmployeeBulkEmail] Get EmployeeBulkEmail list Fail',

	SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION = '[EmployeeBulkEmail] Save EmployeeBulkEmail', 
	SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS = '[EmployeeBulkEmail] Save EmployeeBulkEmail Success', 
	SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL = '[EmployeeBulkEmail] Save EmployeeBulkEmail Fail',
	
	SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE = '[EmployeeBulkEmail] Save EmployeeBulkEmail Template', 
	SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE_SUCCESS = '[EmployeeBulkEmail] Save EmployeeBulkEmail Template Success', 
	SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE_FAIL = '[EmployeeBulkEmail] Save EmployeeBulkEmail Template Fail',
	

	EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION = '[EmployeeBulkEmail] Edit EmployeeBulkEmail', 
	EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS = '[EmployeeBulkEmail] Edit EmployeeBulkEmail Success', 
	EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL = '[EmployeeBulkEmail] Edit EmployeeBulkEmail Fail',

	DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION = '[EmployeeBulkEmail] Delete EmployeeBulkEmail', 
	DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS = '[EmployeeBulkEmail] Delete EmployeeBulkEmail Success', 
	DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL = '[EmployeeBulkEmail] Delete EmployeeBulkEmail Fail',
}

export class GetEmployeeBulkEmail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkEmailSuccess implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkEmailFail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkEmailList implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkEmailListSuccess implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkEmailListFail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkEmail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkEmailSuccess implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkEmailFail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkEmailTemplate implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkEmailTemplateSuccess implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkEmailTemplateFail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.SAVE_EMPLOYEE_BULK_EMAIL_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeBulkEmail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION;
	constructor(public payload: any) { }
}

export class EditEmployeeBulkEmailSuccess implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeBulkEmailFail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.EDIT_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeBulkEmail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION;
	constructor(public payload: any) { }
}

export class DeleteEmployeeBulkEmailSuccess implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeBulkEmailFail implements Action {
	public readonly type = EmployeeBulkEmailActionTypes.DELETE_EMPLOYEE_BULK_EMAIL_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeBulkEmailAction =
	GetEmployeeBulkEmail
|	GetEmployeeBulkEmailSuccess
|  	GetEmployeeBulkEmailFail
|   GetEmployeeBulkEmailList
|   GetEmployeeBulkEmailListSuccess
|   GetEmployeeBulkEmailListFail
|	SaveEmployeeBulkEmail
|	SaveEmployeeBulkEmailSuccess
|	SaveEmployeeBulkEmailFail
|	SaveEmployeeBulkEmailTemplate
|	SaveEmployeeBulkEmailTemplateSuccess
|	SaveEmployeeBulkEmailTemplateFail
|	EditEmployeeBulkEmail
|	EditEmployeeBulkEmailSuccess
|	EditEmployeeBulkEmailFail
|	DeleteEmployeeBulkEmail
|	DeleteEmployeeBulkEmailSuccess
|	DeleteEmployeeBulkEmailFail;



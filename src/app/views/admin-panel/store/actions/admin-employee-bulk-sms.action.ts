import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_BULK_SMS_NOTIFICATION  
*/
export const enum EmployeeBulkSMSActionTypes {
	GET_EMPLOYEE_BULK_SMS_NOTIFICATION = '[EmployeeBulkSMS] Get EmployeeBulkSMS', 
	GET_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS = '[EmployeeBulkSMS] Get EmployeeBulkSMS Success', 
	GET_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL = '[EmployeeBulkSMS] Get EmployeeBulkSMS Fail', 

    GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST = '[EmployeeBulkSMS] Get EmployeeBulkSMS list', 
	GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST_SUCCESS = '[EmployeeBulkSMS] Get EmployeeBulkSMS list Success', 
	GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST_FAIL = '[EmployeeBulkSMS] Get EmployeeBulkSMS list Fail',

	SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION = '[EmployeeBulkSMS] Save EmployeeBulkSMS', 
	SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS = '[EmployeeBulkSMS] Save EmployeeBulkSMS Success', 
	SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL = '[EmployeeBulkSMS] Save EmployeeBulkSMS Fail',
	
	SAVE_EMPLOYEE_BULK_SMS_TEMPLATE = '[EmployeeBulkSMS] Save EmployeeBulkSMS Template', 
	SAVE_EMPLOYEE_BULK_SMS_TEMPLATE_SUCCESS = '[EmployeeBulkSMS] Save EmployeeBulkSMS Template Success', 
	SAVE_EMPLOYEE_BULK_SMS_TEMPLATE_FAIL = '[EmployeeBulkSMS] Save EmployeeBulkSMS Template Fail',
	

	EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION = '[EmployeeBulkSMS] Edit EmployeeBulkSMS', 
	EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS = '[EmployeeBulkSMS] Edit EmployeeBulkSMS Success', 
	EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL = '[EmployeeBulkSMS] Edit EmployeeBulkSMS Fail',

	DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION = '[EmployeeBulkSMS] Delete EmployeeBulkSMS', 
	DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS = '[EmployeeBulkSMS] Delete EmployeeBulkSMS Success', 
	DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL = '[EmployeeBulkSMS] Delete EmployeeBulkSMS Fail',
}

export class GetEmployeeBulkSMS implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkSMSSuccess implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkSMSFail implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkSMSList implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkSMSListSuccess implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmployeeBulkSMSListFail implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkSMS implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkSMSSuccess implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkSMSFail implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkSMSTemplate implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkSMSTemplateSuccess implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveEmployeeBulkSMSTemplateFail implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.SAVE_EMPLOYEE_BULK_SMS_TEMPLATE_FAIL;
	constructor(public payload: any) { }
}

export class EditEmployeeBulkSMS implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION;
	constructor(public payload: any) { }
}

export class EditEmployeeBulkSMSSuccess implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class EditEmployeeBulkSMSFail implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.EDIT_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class DeleteEmployeeBulkSMS implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION;
	constructor(public payload: any) { }
}

export class DeleteEmployeeBulkSMSSuccess implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteEmployeeBulkSMSFail implements Action {
	public readonly type = EmployeeBulkSMSActionTypes.DELETE_EMPLOYEE_BULK_SMS_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export type EmployeeBulkSMSAction =
	GetEmployeeBulkSMS
|	GetEmployeeBulkSMSSuccess
|  	GetEmployeeBulkSMSFail
|   GetEmployeeBulkSMSList
|   GetEmployeeBulkSMSListSuccess
|   GetEmployeeBulkSMSListFail
|	SaveEmployeeBulkSMS
|	SaveEmployeeBulkSMSSuccess
|	SaveEmployeeBulkSMSFail
|	SaveEmployeeBulkSMSTemplate
|	SaveEmployeeBulkSMSTemplateSuccess
|	SaveEmployeeBulkSMSTemplateFail
|	EditEmployeeBulkSMS
|	EditEmployeeBulkSMSSuccess
|	EditEmployeeBulkSMSFail
|	DeleteEmployeeBulkSMS
|	DeleteEmployeeBulkSMSSuccess
|	DeleteEmployeeBulkSMSFail;



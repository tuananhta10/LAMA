import { Action } from '@ngrx/store';

/* FOR INVOICE  
*/
export const enum InvoiceActionTypes {
	GET_INVOICE = '[Invoice] Get Invoice', 
	GET_INVOICE_SUCCESS = '[Invoice] Get Invoice Success', 
	GET_INVOICE_FAIL = '[Invoice] Get Invoice Fail', 

    GET_INVOICE_LIST = '[Invoice] Get Invoice list', 
	GET_INVOICE_LIST_SUCCESS = '[Invoice] Get Invoice list Success', 
	GET_INVOICE_LIST_FAIL = '[Invoice] Get Invoice list Fail',

	SAVE_INVOICE = '[Invoice] Save Invoice', 
	SAVE_INVOICE_SUCCESS = '[Invoice] Save Invoice Success', 
	SAVE_INVOICE_FAIL = '[Invoice] Save Invoice Fail',
	
	EDIT_INVOICE = '[Invoice] Edit Invoice', 
	EDIT_INVOICE_SUCCESS = '[Invoice] Edit Invoice Success', 
	EDIT_INVOICE_FAIL = '[Invoice] Edit Invoice Fail',

	DELETE_INVOICE = '[Invoice] Delete Invoice', 
	DELETE_INVOICE_SUCCESS = '[Invoice] Delete Invoice Success', 
	DELETE_INVOICE_FAIL = '[Invoice] Delete Invoice Fail',
}

export class GetInvoice implements Action {
	public readonly type = InvoiceActionTypes.GET_INVOICE;
	constructor(public payload: any) { }
}

export class GetInvoiceSuccess implements Action {
	public readonly type = InvoiceActionTypes.GET_INVOICE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetInvoiceFail implements Action {
	public readonly type = InvoiceActionTypes.GET_INVOICE_FAIL;
	constructor(public payload: any) { }
}

export class GetInvoiceList implements Action {
	public readonly type = InvoiceActionTypes.GET_INVOICE_LIST;
	constructor(public payload: any) { }
}

export class GetInvoiceListSuccess implements Action {
	public readonly type = InvoiceActionTypes.GET_INVOICE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetInvoiceListFail implements Action {
	public readonly type = InvoiceActionTypes.GET_INVOICE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveInvoice implements Action {
	public readonly type = InvoiceActionTypes.SAVE_INVOICE;
	constructor(public payload: any) { }
}

export class SaveInvoiceSuccess implements Action {
	public readonly type = InvoiceActionTypes.SAVE_INVOICE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveInvoiceFail implements Action {
	public readonly type = InvoiceActionTypes.SAVE_INVOICE_FAIL;
	constructor(public payload: any) { }
}

export class EditInvoice implements Action {
	public readonly type = InvoiceActionTypes.EDIT_INVOICE;
	constructor(public payload: any) { }
}

export class EditInvoiceSuccess implements Action {
	public readonly type = InvoiceActionTypes.EDIT_INVOICE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditInvoiceFail implements Action {
	public readonly type = InvoiceActionTypes.EDIT_INVOICE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteInvoice implements Action {
	public readonly type = InvoiceActionTypes.DELETE_INVOICE;
	constructor(public payload: any) { }
}

export class DeleteInvoiceSuccess implements Action {
	public readonly type = InvoiceActionTypes.DELETE_INVOICE_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteInvoiceFail implements Action {
	public readonly type = InvoiceActionTypes.DELETE_INVOICE_FAIL;
	constructor(public payload: any) { }
}

export type InvoiceAction =
	GetInvoice
|	GetInvoiceSuccess
|  	GetInvoiceFail
|   GetInvoiceList
|   GetInvoiceListSuccess
|   GetInvoiceListFail
|	SaveInvoice
|	SaveInvoiceSuccess
|	SaveInvoiceFail
|	EditInvoice
|	EditInvoiceSuccess
|	EditInvoiceFail
|   DeleteInvoice
|   DeleteInvoiceSuccess
|   DeleteInvoiceFail;



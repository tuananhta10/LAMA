import { Action } from '@ngrx/store';

/* FOR CLIENT_INVOICE
*/
export const enum ClientInvoiceActionTypes {
  GET_CLIENT_INVOICE = '[ClientInvoice] Get ClientInvoice',
  GET_CLIENT_INVOICE_SUCCESS = '[ClientInvoice] Get ClientInvoice Success',
  GET_CLIENT_INVOICE_FAIL = '[ClientInvoice] Get ClientInvoice Fail',

  GET_CLIENT_INVOICE_REFERRENCE = '[ClientInvoice] Get ClientInvoice Referrence',
  GET_CLIENT_INVOICE_REFERRENCE_SUCCESS = '[ClientInvoice] Get ClientInvoice Referrence Success',
  GET_CLIENT_INVOICE_REFERRENCE_FAIL = '[ClientInvoice] Get ClientInvoice Referrence Fail',
/*
  GET_CLIENT_INVOICE_CLAIM_LIST = '[ClientInvoice] Get ClientInvoice Claim List',
  GET_CLIENT_INVOICE_CLAIM_LIST_SUCCESS = '[ClientInvoice] Get ClientInvoice Claim List Success',
  GET_CLIENT_INVOICE_CLAIM_LIST_FAIL = '[ClientInvoice] Get ClientInvoice Claim List Fail',
*/
  GET_CLIENT_INVOICE_LIST = '[ClientInvoice] Get ClientInvoice list',
  GET_CLIENT_INVOICE_LIST_SUCCESS = '[ClientInvoice] Get ClientInvoice list Success',
  GET_CLIENT_INVOICE_LIST_FAIL = '[ClientInvoice] Get ClientInvoice list Fail',

  SAVE_CLIENT_INVOICE = '[ClientInvoice] Save ClientInvoice',
  SAVE_CLIENT_INVOICE_SUCCESS = '[ClientInvoice] Save ClientInvoice Success',
  SAVE_CLIENT_INVOICE_FAIL = '[ClientInvoice] Save ClientInvoice Fail',

  EDIT_CLIENT_INVOICE = '[ClientInvoice] Edit ClientInvoice',
  EDIT_CLIENT_INVOICE_SUCCESS = '[ClientInvoice] Edit ClientInvoice Success',
  EDIT_CLIENT_INVOICE_FAIL = '[ClientInvoice] Edit ClientInvoice Fail',

  DELETE_CLIENT_INVOICE = '[ClientInvoice] Delete ClientInvoice',
  DELETE_CLIENT_INVOICE_SUCCESS = '[ClientInvoice] Delete ClientInvoice Success',
  DELETE_CLIENT_INVOICE_FAIL = '[ClientInvoice] Delete ClientInvoice Fail',
}

// client invoice
export class GetClientInvoice implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE;
  constructor(public payload: any) { }
}

export class GetClientInvoiceSuccess implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientInvoiceFail implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_FAIL;
  constructor(public payload: any) { }
}

// client invoice reference
export class GetClientInvoiceReferrence implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE;
  constructor(public payload: any) { }
}

export class GetClientInvoiceReferrenceSuccess implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientInvoiceReferrenceFail implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE_FAIL;
  constructor(public payload: any) { }
}

// invoice claims
/*export class GetClientInvoiceClaim implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_CLAIM_LIST;
  constructor(public payload: any) { }
}

export class GetClientInvoiceClaimSuccess implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_CLAIM_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientInvoiceClaimFail implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_CLAIM_LIST_FAIL;
  constructor(public payload: any) { }
}*/

// invoice list
export class GetClientInvoiceList implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST;
  constructor(public payload: any) { }
}

export class GetClientInvoiceListSuccess implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientInvoiceListFail implements Action {
  public readonly type = ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST_FAIL;
  constructor(public payload: any) { }
}

// save client invoice
export class SaveClientInvoice implements Action {
  public readonly type = ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE;
  constructor(public payload: any) { }
}

export class SaveClientInvoiceSuccess implements Action {
  public readonly type = ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveClientInvoiceFail implements Action {
  public readonly type = ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE_FAIL;
  constructor(public payload: any) { }
}

// edit invoice
export class EditClientInvoice implements Action {
  public readonly type = ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE;
  constructor(public payload: any) { }
}

export class EditClientInvoiceSuccess implements Action {
  public readonly type = ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE_SUCCESS;
  constructor(public payload: any) { }
}

export class EditClientInvoiceFail implements Action {
  public readonly type = ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE_FAIL;
  constructor(public payload: any) { }
}

// delete invoice
export class DeleteClientInvoice implements Action {
  public readonly type = ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE;
  constructor(public payload: any) { }
}

export class DeleteClientInvoiceSuccess implements Action {
  public readonly type = ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteClientInvoiceFail implements Action {
  public readonly type = ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE_FAIL;
  constructor(public payload: any) { }
}

export type ClientInvoiceAction =
  GetClientInvoice
  | GetClientInvoiceSuccess
  | GetClientInvoiceFail
  | GetClientInvoiceReferrence
  | GetClientInvoiceReferrenceSuccess
  | GetClientInvoiceReferrenceFail
  | GetClientInvoiceList
  | GetClientInvoiceListSuccess
  | GetClientInvoiceListFail
  | SaveClientInvoice
  | SaveClientInvoiceSuccess
  | SaveClientInvoiceFail
  | EditClientInvoice
  | EditClientInvoiceSuccess
  | EditClientInvoiceFail
  | DeleteClientInvoice
  | DeleteClientInvoiceSuccess
  | DeleteClientInvoiceFail;



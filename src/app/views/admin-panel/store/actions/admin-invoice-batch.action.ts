import { Action } from '@ngrx/store';

/* FOR INVOICE_BATCH
*/
export const enum InvoiceBatchActionTypes {
  GET_INVOICE_BATCH = '[InvoiceBatch] Get InvoiceBatch',
  GET_INVOICE_BATCH_SUCCESS = '[InvoiceBatch] Get InvoiceBatch Success',
  GET_INVOICE_BATCH_FAIL = '[InvoiceBatch] Get InvoiceBatch Fail',

  GET_INVOICE_BATCH_LIST = '[InvoiceBatch] Get InvoiceBatch list',
  GET_INVOICE_BATCH_LIST_SUCCESS = '[InvoiceBatch] Get InvoiceBatch list Success',
  GET_INVOICE_BATCH_LIST_FAIL = '[InvoiceBatch] Get InvoiceBatch list Fail',

  SAVE_INVOICE_BATCH = '[InvoiceBatch] Save InvoiceBatch',
  SAVE_INVOICE_BATCH_SUCCESS = '[InvoiceBatch] Save InvoiceBatch Success',
  SAVE_INVOICE_BATCH_FAIL = '[InvoiceBatch] Save InvoiceBatch Fail',

  EDIT_INVOICE_BATCH = '[InvoiceBatch] Edit InvoiceBatch',
  EDIT_INVOICE_BATCH_SUCCESS = '[InvoiceBatch] Edit InvoiceBatch Success',
  EDIT_INVOICE_BATCH_FAIL = '[InvoiceBatch] Edit InvoiceBatch Fail',

  DELETE_INVOICE_BATCH = '[InvoiceBatch] Delete InvoiceBatch',
  DELETE_INVOICE_BATCH_SUCCESS = '[InvoiceBatch] Delete InvoiceBatch Success',
  DELETE_INVOICE_BATCH_FAIL = '[InvoiceBatch] Delete InvoiceBatch Fail',
}

export class GetInvoiceBatch implements Action {
  public readonly type = InvoiceBatchActionTypes.GET_INVOICE_BATCH;
  constructor(public payload: any) { }
}

export class GetInvoiceBatchSuccess implements Action {
  public readonly type = InvoiceBatchActionTypes.GET_INVOICE_BATCH_SUCCESS;
  constructor(public payload: any) { }
}

export class GetInvoiceBatchFail implements Action {
  public readonly type = InvoiceBatchActionTypes.GET_INVOICE_BATCH_FAIL;
  constructor(public payload: any) { }
}

export class GetInvoiceBatchList implements Action {
  public readonly type = InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST;
  constructor(public payload: any) { }
}

export class GetInvoiceBatchListSuccess implements Action {
  public readonly type = InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetInvoiceBatchListFail implements Action {
  public readonly type = InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SaveInvoiceBatch implements Action {
  public readonly type = InvoiceBatchActionTypes.SAVE_INVOICE_BATCH;
  constructor(public payload: any) { }
}

export class SaveInvoiceBatchSuccess implements Action {
  public readonly type = InvoiceBatchActionTypes.SAVE_INVOICE_BATCH_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveInvoiceBatchFail implements Action {
  public readonly type = InvoiceBatchActionTypes.SAVE_INVOICE_BATCH_FAIL;
  constructor(public payload: any) { }
}

export class EditInvoiceBatch implements Action {
  public readonly type = InvoiceBatchActionTypes.EDIT_INVOICE_BATCH;
  constructor(public payload: any) { }
}

export class EditInvoiceBatchSuccess implements Action {
  public readonly type = InvoiceBatchActionTypes.EDIT_INVOICE_BATCH_SUCCESS;
  constructor(public payload: any) { }
}

export class EditInvoiceBatchFail implements Action {
  public readonly type = InvoiceBatchActionTypes.EDIT_INVOICE_BATCH_FAIL;
  constructor(public payload: any) { }
}

export class DeleteInvoiceBatch implements Action {
  public readonly type = InvoiceBatchActionTypes.DELETE_INVOICE_BATCH;
  constructor(public payload: any) { }
}

export class DeleteInvoiceBatchSuccess implements Action {
  public readonly type = InvoiceBatchActionTypes.DELETE_INVOICE_BATCH_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteInvoiceBatchFail implements Action {
  public readonly type = InvoiceBatchActionTypes.DELETE_INVOICE_BATCH_FAIL;
  constructor(public payload: any) { }
}

export type InvoiceBatchAction =
  GetInvoiceBatch
  | GetInvoiceBatchSuccess
  | GetInvoiceBatchFail
  | GetInvoiceBatchList
  | GetInvoiceBatchListSuccess
  | GetInvoiceBatchListFail
  | SaveInvoiceBatch
  | SaveInvoiceBatchSuccess
  | SaveInvoiceBatchFail
  | EditInvoiceBatch
  | EditInvoiceBatchSuccess
  | EditInvoiceBatchFail
  | DeleteInvoiceBatch
  | DeleteInvoiceBatchSuccess
  | DeleteInvoiceBatchFail;



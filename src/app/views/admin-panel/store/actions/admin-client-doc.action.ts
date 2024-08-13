import { Action } from '@ngrx/store';

/* FOR CLIENT_DOC
*/
export const enum ClientDocActionTypes {
  GET_CLIENT_DOC = '[ClientDoc] Get ClientDoc',
  GET_CLIENT_DOC_SUCCESS = '[ClientDoc] Get ClientDoc Success',
  GET_CLIENT_DOC_FAIL = '[ClientDoc] Get ClientDoc Fail',

  GET_CLIENT_DOC_LIST = '[ClientDoc] Get ClientDoc list',
  GET_CLIENT_DOC_LIST_SUCCESS = '[ClientDoc] Get ClientDoc list Success',
  GET_CLIENT_DOC_LIST_FAIL = '[ClientDoc] Get ClientDoc list Fail',

  SAVE_CLIENT_DOC = '[ClientDoc] Save ClientDoc',
  SAVE_CLIENT_DOC_SUCCESS = '[ClientDoc] Save ClientDoc Success',
  SAVE_CLIENT_DOC_FAIL = '[ClientDoc] Save ClientDoc Fail',

  EDIT_CLIENT_DOC = '[ClientDoc] Edit ClientDoc',
  EDIT_CLIENT_DOC_SUCCESS = '[ClientDoc] Edit ClientDoc Success',
  EDIT_CLIENT_DOC_FAIL = '[ClientDoc] Edit ClientDoc Fail',

  DELETE_CLIENT_DOC = '[ClientDoc] Delete ClientDoc',
  DELETE_CLIENT_DOC_SUCCESS = '[ClientDoc] Delete ClientDoc Success',
  DELETE_CLIENT_DOC_FAIL = '[ClientDoc] Delete ClientDoc Fail',
}

export class GetClientDoc implements Action {
  public readonly type = ClientDocActionTypes.GET_CLIENT_DOC;
  constructor(public payload: any) { }
}

export class GetClientDocSuccess implements Action {
  public readonly type = ClientDocActionTypes.GET_CLIENT_DOC_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientDocFail implements Action {
  public readonly type = ClientDocActionTypes.GET_CLIENT_DOC_FAIL;
  constructor(public payload: any) { }
}

export class GetClientDocList implements Action {
  public readonly type = ClientDocActionTypes.GET_CLIENT_DOC_LIST;
  constructor(public payload: any) { }
}

export class GetClientDocListSuccess implements Action {
  public readonly type = ClientDocActionTypes.GET_CLIENT_DOC_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientDocListFail implements Action {
  public readonly type = ClientDocActionTypes.GET_CLIENT_DOC_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SaveClientDoc implements Action {
  public readonly type = ClientDocActionTypes.SAVE_CLIENT_DOC;
  constructor(public payload: any) { }
}

export class SaveClientDocSuccess implements Action {
  public readonly type = ClientDocActionTypes.SAVE_CLIENT_DOC_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveClientDocFail implements Action {
  public readonly type = ClientDocActionTypes.SAVE_CLIENT_DOC_FAIL;
  constructor(public payload: any) { }
}

export class EditClientDoc implements Action {
  public readonly type = ClientDocActionTypes.EDIT_CLIENT_DOC;
  constructor(public payload: any) { }
}

export class EditClientDocSuccess implements Action {
  public readonly type = ClientDocActionTypes.EDIT_CLIENT_DOC_SUCCESS;
  constructor(public payload: any) { }
}

export class EditClientDocFail implements Action {
  public readonly type = ClientDocActionTypes.EDIT_CLIENT_DOC_FAIL;
  constructor(public payload: any) { }
}

export class DeleteClientDoc implements Action {
  public readonly type = ClientDocActionTypes.DELETE_CLIENT_DOC;
  constructor(public payload: any) { }
}

export class DeleteClientDocSuccess implements Action {
  public readonly type = ClientDocActionTypes.DELETE_CLIENT_DOC_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteClientDocFail implements Action {
  public readonly type = ClientDocActionTypes.DELETE_CLIENT_DOC_FAIL;
  constructor(public payload: any) { }
}

export type ClientDocAction =
  GetClientDoc
  | GetClientDocSuccess
  | GetClientDocFail
  | GetClientDocList
  | GetClientDocListSuccess
  | GetClientDocListFail
  | SaveClientDoc
  | SaveClientDocSuccess
  | SaveClientDocFail
  | EditClientDoc
  | EditClientDocSuccess
  | EditClientDocFail
  | DeleteClientDoc
  | DeleteClientDocSuccess
  | DeleteClientDocFail;;



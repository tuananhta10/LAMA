import { Action } from '@ngrx/store';

/* FOR CLIENT_FUNDING
*/
export const enum ClientFundingActionTypes {
  GET_CLIENT_FUNDING = '[ClientFunding] Get ClientFunding Details',
  GET_CLIENT_FUNDING_SUCCESS = '[ClientFunding] Get ClientFunding Success',
  GET_CLIENT_FUNDING_FAIL = '[ClientFunding] Get ClientFunding Fail',

  GET_CLIENT_FUNDING_LIST = '[ClientFunding] Get ClientFunding list',
  GET_CLIENT_FUNDING_LIST_SUCCESS = '[ClientFunding] Get ClientFunding list Success',
  GET_CLIENT_FUNDING_LIST_FAIL = '[ClientFunding] Get ClientFunding list Fail',

  GET_CLIENT_BY_FUNDING_ITEM = '[ClientFunding] Get Client list By Funding Item',
  GET_CLIENT_BY_FUNDING_ITEM_SUCCESS = '[ClientFunding] Get Client list By Funding Item Success',
  GET_CLIENT_BY_FUNDING_ITEM_FAIL = '[ClientFunding] Get Client list By Funding Item Fail',

  SAVE_CLIENT_FUNDING = '[ClientFunding] Save ClientFunding',
  SAVE_CLIENT_FUNDING_SUCCESS = '[ClientFunding] Save ClientFunding Success',
  SAVE_CLIENT_FUNDING_FAIL = '[ClientFunding] Save ClientFunding Fail',

  EDIT_CLIENT_FUNDING = '[ClientFunding] Edit ClientFunding',
  EDIT_CLIENT_FUNDING_SUCCESS = '[ClientFunding] Edit ClientFunding Success',
  EDIT_CLIENT_FUNDING_FAIL = '[ClientFunding] Edit ClientFunding Fail',

  DELETE_CLIENT_FUNDING = '[ClientFunding] Delete ClientFunding',
  DELETE_CLIENT_FUNDING_SUCCESS = '[ClientFunding] Delete ClientFunding Success',
  DELETE_CLIENT_FUNDING_FAIL = '[ClientFunding] Delete ClientFunding Fail',

  	
	UPLOAD_CLIENT_FUNDING = '[Client] Upload client funding', 
	UPLOAD_CLIENT_FUNDING_SUCCESS = '[Client] Upload client funding Success', 
	UPLOAD_CLIENT_FUNDING_FAIL = '[Client] Upload client funding Fail', 
}

export class GetClientFunding implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_FUNDING;
  constructor(public payload: any) { }
}

export class GetClientFundingSuccess implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_FUNDING_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientFundingFail implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_FUNDING_FAIL;
  constructor(public payload: any) { }
}

export class GetClientFundingList implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST;
  constructor(public payload: any) { }
}

export class GetClientFundingListSuccess implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientFundingListFail implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_FUNDING_LIST_FAIL;
  constructor(public payload: any) { }
}

export class GetClientByFundingItem implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM;
  constructor(public payload: any) { }
}

export class GetClientByFundingItemSuccess implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientByFundingItemFail implements Action {
  public readonly type = ClientFundingActionTypes.GET_CLIENT_BY_FUNDING_ITEM_FAIL;
  constructor(public payload: any) { }
}

export class SaveClientFunding implements Action {
  public readonly type = ClientFundingActionTypes.SAVE_CLIENT_FUNDING;
  constructor(public payload: any) { }
}

export class SaveClientFundingSuccess implements Action {
  public readonly type = ClientFundingActionTypes.SAVE_CLIENT_FUNDING_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveClientFundingFail implements Action {
  public readonly type = ClientFundingActionTypes.SAVE_CLIENT_FUNDING_FAIL;
  constructor(public payload: any) { }
}

export class EditClientFunding implements Action {
  public readonly type = ClientFundingActionTypes.EDIT_CLIENT_FUNDING;
  constructor(public payload: any) { }
}

export class EditClientFundingSuccess implements Action {
  public readonly type = ClientFundingActionTypes.EDIT_CLIENT_FUNDING_SUCCESS;
  constructor(public payload: any) { }
}

export class EditClientFundingFail implements Action {
  public readonly type = ClientFundingActionTypes.EDIT_CLIENT_FUNDING_FAIL;
  constructor(public payload: any) { }
}

export class DeleteClientFunding implements Action {
  public readonly type = ClientFundingActionTypes.DELETE_CLIENT_FUNDING;
  constructor(public payload: any) { }
}

export class DeleteClientFundingSuccess implements Action {
  public readonly type = ClientFundingActionTypes.DELETE_CLIENT_FUNDING_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteClientFundingFail implements Action {
  public readonly type = ClientFundingActionTypes.DELETE_CLIENT_FUNDING_FAIL;
  constructor(public payload: any) { }
}

export class UploadClientFunding implements Action {
	public readonly type = ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING;
	constructor(public payload: any) { }
}

export class UploadClientFundingSuccess implements Action {
	public readonly type = ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING_SUCCESS;
	constructor(public payload: any) { }
}

export class UploadClientFundingFail implements Action {
	public readonly type = ClientFundingActionTypes.UPLOAD_CLIENT_FUNDING_FAIL;
	constructor(public payload: any) { }
}


export type ClientFundingAction =
  GetClientFunding
  | GetClientFundingSuccess
  | GetClientFundingFail
  | GetClientFundingList
  | GetClientFundingListSuccess
  | GetClientFundingListFail
  | GetClientByFundingItem
  | GetClientByFundingItemSuccess
  | GetClientByFundingItemFail
  | SaveClientFunding
  | SaveClientFundingSuccess
  | SaveClientFundingFail
  | EditClientFunding
  | EditClientFundingSuccess
  | EditClientFundingFail
  | DeleteClientFunding
  | DeleteClientFundingSuccess
  | DeleteClientFundingFail
  | UploadClientFunding
  | UploadClientFundingSuccess
  | UploadClientFundingFail;



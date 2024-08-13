import { Action } from '@ngrx/store';

/* FOR FUNDING_SOURCE
*/
export const enum FundingSourceActionTypes {
  GET_FUNDING_SOURCE = '[FundingSource] Get FundingSource',
  GET_FUNDING_SOURCE_SUCCESS = '[FundingSource] Get FundingSource Success',
  GET_FUNDING_SOURCE_FAIL = '[FundingSource] Get FundingSource Fail',

  GET_FUNDING_SOURCE_LIST = '[FundingSource] Get FundingSource list',
  GET_FUNDING_SOURCE_LIST_SUCCESS = '[FundingSource] Get FundingSource list Success',
  GET_FUNDING_SOURCE_LIST_FAIL = '[FundingSource] Get FundingSource list Fail',

  SAVE_FUNDING_SOURCE = '[FundingSource] Save FundingSource',
  SAVE_FUNDING_SOURCE_SUCCESS = '[FundingSource] Save FundingSource Success',
  SAVE_FUNDING_SOURCE_FAIL = '[FundingSource] Save FundingSource Fail',

  EDIT_FUNDING_SOURCE = '[FundingSource] Edit FundingSource',
  EDIT_FUNDING_SOURCE_SUCCESS = '[FundingSource] Edit FundingSource Success',
  EDIT_FUNDING_SOURCE_FAIL = '[FundingSource] Edit FundingSource Fail',

  DELETE_FUNDING_SOURCE = '[FundingSource] Delete FundingSource',
  DELETE_FUNDING_SOURCE_SUCCESS = '[FundingSource] Delete FundingSource Success',
  DELETE_FUNDING_SOURCE_FAIL = '[FundingSource] Delete FundingSource Fail',

  UPLOAD_CLIENT_FUNDING = '[FundingSource] Upload funding source', 
  UPLOAD_CLIENT_FUNDING_SUCCESS = '[FundingSource] Upload funding source Success', 
  UPLOAD_CLIENT_FUNDING_FAIL = '[FundingSource] Upload funding source Fail', 
}

export class GetFundingSource implements Action {
  public readonly type = FundingSourceActionTypes.GET_FUNDING_SOURCE;
  constructor(public payload: any) { }
}

export class GetFundingSourceSuccess implements Action {
  public readonly type = FundingSourceActionTypes.GET_FUNDING_SOURCE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetFundingSourceFail implements Action {
  public readonly type = FundingSourceActionTypes.GET_FUNDING_SOURCE_FAIL;
  constructor(public payload: any) { }
}

export class GetFundingSourceList implements Action {
  public readonly type = FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST;
  constructor(public payload: any) { }
}

export class GetFundingSourceListSuccess implements Action {
  public readonly type = FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetFundingSourceListFail implements Action {
  public readonly type = FundingSourceActionTypes.GET_FUNDING_SOURCE_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SaveFundingSource implements Action {
  public readonly type = FundingSourceActionTypes.SAVE_FUNDING_SOURCE;
  constructor(public payload: any) { }
}

export class SaveFundingSourceSuccess implements Action {
  public readonly type = FundingSourceActionTypes.SAVE_FUNDING_SOURCE_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveFundingSourceFail implements Action {
  public readonly type = FundingSourceActionTypes.SAVE_FUNDING_SOURCE_FAIL;
  constructor(public payload: any) { }
}

export class EditFundingSource implements Action {
  public readonly type = FundingSourceActionTypes.EDIT_FUNDING_SOURCE;
  constructor(public payload: any) { }
}

export class EditFundingSourceSuccess implements Action {
  public readonly type = FundingSourceActionTypes.EDIT_FUNDING_SOURCE_SUCCESS;
  constructor(public payload: any) { }
}

export class EditFundingSourceFail implements Action {
  public readonly type = FundingSourceActionTypes.EDIT_FUNDING_SOURCE_FAIL;
  constructor(public payload: any) { }
}

export class DeleteFundingSource implements Action {
  public readonly type = FundingSourceActionTypes.DELETE_FUNDING_SOURCE;
  constructor(public payload: any) { }
}

export class DeleteFundingSourceSuccess implements Action {
  public readonly type = FundingSourceActionTypes.DELETE_FUNDING_SOURCE_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteFundingSourceFail implements Action {
  public readonly type = FundingSourceActionTypes.DELETE_FUNDING_SOURCE_FAIL;
  constructor(public payload: any) { }
}

export class UploadClientFunding implements Action {
  public readonly type = FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING;
  constructor(public payload: any) { }
}

export class UploadClientFundingSuccess implements Action {
  public readonly type = FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING_SUCCESS;
  constructor(public payload: any) { }
}

export class UploadClientFundingFail implements Action {
  public readonly type = FundingSourceActionTypes.UPLOAD_CLIENT_FUNDING_FAIL;
  constructor(public payload: any) { }
}


export type FundingSourceAction =
  GetFundingSource
  | GetFundingSourceSuccess
  | GetFundingSourceFail
  | GetFundingSourceList
  | GetFundingSourceListSuccess
  | GetFundingSourceListFail
  | SaveFundingSource
  | SaveFundingSourceSuccess
  | SaveFundingSourceFail
  | EditFundingSource
  | EditFundingSourceSuccess
  | EditFundingSourceFail
  | DeleteFundingSource
  | DeleteFundingSourceSuccess
  | DeleteFundingSourceFail
  | UploadClientFunding
  | UploadClientFundingSuccess
  | UploadClientFundingFail;



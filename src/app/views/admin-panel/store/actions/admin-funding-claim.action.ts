import { Action } from '@ngrx/store';

/* FOR FUNDING_CLAIM
*/
export const enum FundingClaimActionTypes {
  GET_FUNDING_CLAIM = '[FundingClaim] Get FundingClaim',
  GET_FUNDING_CLAIM_SUCCESS = '[FundingClaim] Get FundingClaim Success',
  GET_FUNDING_CLAIM_FAIL = '[FundingClaim] Get FundingClaim Fail',

  GET_FUNDING_CLAIM_LIST = '[FundingClaim] Get FundingClaim list',
  GET_FUNDING_CLAIM_LIST_SUCCESS = '[FundingClaim] Get FundingClaim list Success',
  GET_FUNDING_CLAIM_LIST_FAIL = '[FundingClaim] Get FundingClaim list Fail',

  SAVE_FUNDING_CLAIM = '[FundingClaim] Save FundingClaim',
  SAVE_FUNDING_CLAIM_SUCCESS = '[FundingClaim] Save FundingClaim Success',
  SAVE_FUNDING_CLAIM_FAIL = '[FundingClaim] Save FundingClaim Fail',

  EDIT_FUNDING_CLAIM = '[FundingClaim] Edit FundingClaim',
  EDIT_FUNDING_CLAIM_SUCCESS = '[FundingClaim] Edit FundingClaim Success',
  EDIT_FUNDING_CLAIM_FAIL = '[FundingClaim] Edit FundingClaim Fail',

  DELETE_FUNDING_CLAIM = '[FundingClaim] Delete FundingClaim',
  DELETE_FUNDING_CLAIM_SUCCESS = '[FundingClaim] Delete FundingClaim Success',
  DELETE_FUNDING_CLAIM_FAIL = '[FundingClaim] Delete FundingClaim Fail',
}

export class GetFundingClaim implements Action {
  public readonly type = FundingClaimActionTypes.GET_FUNDING_CLAIM;
  constructor(public payload: any) { }
}

export class GetFundingClaimSuccess implements Action {
  public readonly type = FundingClaimActionTypes.GET_FUNDING_CLAIM_SUCCESS;
  constructor(public payload: any) { }
}

export class GetFundingClaimFail implements Action {
  public readonly type = FundingClaimActionTypes.GET_FUNDING_CLAIM_FAIL;
  constructor(public payload: any) { }
}

export class GetFundingClaimList implements Action {
  public readonly type = FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST;
  constructor(public payload: any) { }
}

export class GetFundingClaimListSuccess implements Action {
  public readonly type = FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetFundingClaimListFail implements Action {
  public readonly type = FundingClaimActionTypes.GET_FUNDING_CLAIM_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SaveFundingClaim implements Action {
  public readonly type = FundingClaimActionTypes.SAVE_FUNDING_CLAIM;
  constructor(public payload: any) { }
}

export class SaveFundingClaimSuccess implements Action {
  public readonly type = FundingClaimActionTypes.SAVE_FUNDING_CLAIM_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveFundingClaimFail implements Action {
  public readonly type = FundingClaimActionTypes.SAVE_FUNDING_CLAIM_FAIL;
  constructor(public payload: any) { }
}

export class EditFundingClaim implements Action {
  public readonly type = FundingClaimActionTypes.EDIT_FUNDING_CLAIM;
  constructor(public payload: any) { }
}

export class EditFundingClaimSuccess implements Action {
  public readonly type = FundingClaimActionTypes.EDIT_FUNDING_CLAIM_SUCCESS;
  constructor(public payload: any) { }
}

export class EditFundingClaimFail implements Action {
  public readonly type = FundingClaimActionTypes.EDIT_FUNDING_CLAIM_FAIL;
  constructor(public payload: any) { }
}

export class DeleteFundingClaim implements Action {
  public readonly type = FundingClaimActionTypes.DELETE_FUNDING_CLAIM;
  constructor(public payload: any) { }
}

export class DeleteFundingClaimSuccess implements Action {
  public readonly type = FundingClaimActionTypes.DELETE_FUNDING_CLAIM_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteFundingClaimFail implements Action {
  public readonly type = FundingClaimActionTypes.DELETE_FUNDING_CLAIM_FAIL;
  constructor(public payload: any) { }
}

export type FundingClaimAction =
  GetFundingClaim
  | GetFundingClaimSuccess
  | GetFundingClaimFail
  | GetFundingClaimList
  | GetFundingClaimListSuccess
  | GetFundingClaimListFail
  | SaveFundingClaim
  | SaveFundingClaimSuccess
  | SaveFundingClaimFail
  | EditFundingClaim
  | EditFundingClaimSuccess
  | EditFundingClaimFail
  | DeleteFundingClaim
  | DeleteFundingClaimSuccess
  | DeleteFundingClaimFail;



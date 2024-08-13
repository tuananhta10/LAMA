import { Action } from '@ngrx/store';

/* FOR PAY_RATE
*/
export const enum PayRateActionTypes {
  GET_PAY_RATE = '[PayRate] Get PayRate',
  GET_PAY_RATE_SUCCESS = '[PayRate] Get PayRate Success',
  GET_PAY_RATE_FAIL = '[PayRate] Get PayRate Fail',

  GET_PAY_RATE_LIST = '[PayRate] Get PayRate list',
  GET_PAY_RATE_LIST_SUCCESS = '[PayRate] Get PayRate list Success',
  GET_PAY_RATE_LIST_FAIL = '[PayRate] Get PayRate list Fail',

  SAVE_PAY_RATE = '[PayRate] Save PayRate',
  SAVE_PAY_RATE_SUCCESS = '[PayRate] Save PayRate Success',
  SAVE_PAY_RATE_FAIL = '[PayRate] Save PayRate Fail',

  EDIT_PAY_RATE = '[PayRate] Edit PayRate',
  EDIT_PAY_RATE_SUCCESS = '[PayRate] Edit PayRate Success',
  EDIT_PAY_RATE_FAIL = '[PayRate] Edit PayRate Fail',

  DELETE_PAY_RATE = '[PayRate] Delete PayRate',
  DELETE_PAY_RATE_SUCCESS = '[PayRate] Delete PayRate Success',
  DELETE_PAY_RATE_FAIL = '[PayRate] Delete PayRate Fail',
}

export class GetPayRate implements Action {
  public readonly type = PayRateActionTypes.GET_PAY_RATE;
  constructor(public payload: any) { }
}

export class GetPayRateSuccess implements Action {
  public readonly type = PayRateActionTypes.GET_PAY_RATE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetPayRateFail implements Action {
  public readonly type = PayRateActionTypes.GET_PAY_RATE_FAIL;
  constructor(public payload: any) { }
}

export class GetPayRateList implements Action {
  public readonly type = PayRateActionTypes.GET_PAY_RATE_LIST;
  constructor(public payload: any) { }
}

export class GetPayRateListSuccess implements Action {
  public readonly type = PayRateActionTypes.GET_PAY_RATE_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetPayRateListFail implements Action {
  public readonly type = PayRateActionTypes.GET_PAY_RATE_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SavePayRate implements Action {
  public readonly type = PayRateActionTypes.SAVE_PAY_RATE;
  constructor(public payload: any) { }
}

export class SavePayRateSuccess implements Action {
  public readonly type = PayRateActionTypes.SAVE_PAY_RATE_SUCCESS;
  constructor(public payload: any) { }
}

export class SavePayRateFail implements Action {
  public readonly type = PayRateActionTypes.SAVE_PAY_RATE_FAIL;
  constructor(public payload: any) { }
}

export class EditPayRate implements Action {
  public readonly type = PayRateActionTypes.EDIT_PAY_RATE;
  constructor(public payload: any) { }
}

export class EditPayRateSuccess implements Action {
  public readonly type = PayRateActionTypes.EDIT_PAY_RATE_SUCCESS;
  constructor(public payload: any) { }
}

export class EditPayRateFail implements Action {
  public readonly type = PayRateActionTypes.EDIT_PAY_RATE_FAIL;
  constructor(public payload: any) { }
}

export class DeletePayRate implements Action {
  public readonly type = PayRateActionTypes.DELETE_PAY_RATE;
  constructor(public payload: any) { }
}

export class DeletePayRateSuccess implements Action {
  public readonly type = PayRateActionTypes.DELETE_PAY_RATE_SUCCESS;
  constructor(public payload: any) { }
}

export class DeletePayRateFail implements Action {
  public readonly type = PayRateActionTypes.DELETE_PAY_RATE_FAIL;
  constructor(public payload: any) { }
}

export type PayRateAction =
  GetPayRate
  | GetPayRateSuccess
  | GetPayRateFail
  | GetPayRateList
  | GetPayRateListSuccess
  | GetPayRateListFail
  | SavePayRate
  | SavePayRateSuccess
  | SavePayRateFail
  | EditPayRate
  | EditPayRateSuccess
  | EditPayRateFail
  | DeletePayRate
  | DeletePayRateSuccess
  | DeletePayRateFail;;



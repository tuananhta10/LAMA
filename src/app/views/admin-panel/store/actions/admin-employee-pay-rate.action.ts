import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_PAY_RATE
*/
export const enum EmployeePayRateActionTypes {
  GET_EMPLOYEE_PAY_RATE = '[EmployeePayRate] Get EmployeePayRate',
  GET_EMPLOYEE_PAY_RATE_SUCCESS = '[EmployeePayRate] Get EmployeePayRate Success',
  GET_EMPLOYEE_PAY_RATE_FAIL = '[EmployeePayRate] Get EmployeePayRate Fail',

  GET_EMPLOYEE_PAY_RATE_LIST = '[EmployeePayRate] Get EmployeePayRate list',
  GET_EMPLOYEE_PAY_RATE_LIST_SUCCESS = '[EmployeePayRate] Get EmployeePayRate list Success',
  GET_EMPLOYEE_PAY_RATE_LIST_FAIL = '[EmployeePayRate] Get EmployeePayRate list Fail',

  SAVE_EMPLOYEE_PAY_RATE = '[EmployeePayRate] Save EmployeePayRate',
  SAVE_EMPLOYEE_PAY_RATE_SUCCESS = '[EmployeePayRate] Save EmployeePayRate Success',
  SAVE_EMPLOYEE_PAY_RATE_FAIL = '[EmployeePayRate] Save EmployeePayRate Fail',

  EDIT_EMPLOYEE_PAY_RATE = '[EmployeePayRate] Edit EmployeePayRate',
  EDIT_EMPLOYEE_PAY_RATE_SUCCESS = '[EmployeePayRate] Edit EmployeePayRate Success',
  EDIT_EMPLOYEE_PAY_RATE_FAIL = '[EmployeePayRate] Edit EmployeePayRate Fail',

  DELETE_EMPLOYEE_PAY_RATE = '[EmployeePayRate] Delete EmployeePayRate',
  DELETE_EMPLOYEE_PAY_RATE_SUCCESS = '[EmployeePayRate] Delete EmployeePayRate Success',
  DELETE_EMPLOYEE_PAY_RATE_FAIL = '[EmployeePayRate] Delete EmployeePayRate Fail',

  UPLOAD_EMPLOYEE_POSITION = '[Employee] Upload Payrate', 
  UPLOAD_EMPLOYEE_POSITION_SUCCESS = '[Employee] Upload Payrate Success', 
  UPLOAD_EMPLOYEE_POSITION_FAIL = '[Employee] Upload Payrate Fail', 
}

export class GetEmployeePayRate implements Action {
  public readonly type = EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateSuccess implements Action {
  public readonly type = EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateFail implements Action {
  public readonly type = EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_FAIL;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateList implements Action {
  public readonly type = EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateListSuccess implements Action {
  public readonly type = EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateListFail implements Action {
  public readonly type = EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SaveEmployeePayRate implements Action {
  public readonly type = EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE;
  constructor(public payload: any) { }
}

export class SaveEmployeePayRateSuccess implements Action {
  public readonly type = EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveEmployeePayRateFail implements Action {
  public readonly type = EmployeePayRateActionTypes.SAVE_EMPLOYEE_PAY_RATE_FAIL;
  constructor(public payload: any) { }
}

export class EditEmployeePayRate implements Action {
  public readonly type = EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE;
  constructor(public payload: any) { }
}

export class EditEmployeePayRateSuccess implements Action {
  public readonly type = EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE_SUCCESS;
  constructor(public payload: any) { }
}

export class EditEmployeePayRateFail implements Action {
  public readonly type = EmployeePayRateActionTypes.EDIT_EMPLOYEE_PAY_RATE_FAIL;
  constructor(public payload: any) { }
}

export class DeleteEmployeePayRate implements Action {
  public readonly type = EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE;
  constructor(public payload: any) { }
}

export class DeleteEmployeePayRateSuccess implements Action {
  public readonly type = EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteEmployeePayRateFail implements Action {
  public readonly type = EmployeePayRateActionTypes.DELETE_EMPLOYEE_PAY_RATE_FAIL;
  constructor(public payload: any) { }
}

export class UploadEmployeePosition implements Action {
  public readonly type = EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION;
  constructor(public payload: any) { }
}

export class UploadEmployeePositionSuccess implements Action {
  public readonly type = EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION_SUCCESS;
  constructor(public payload: any) { }
}

export class UploadEmployeePositionFail implements Action {
  public readonly type = EmployeePayRateActionTypes.UPLOAD_EMPLOYEE_POSITION_FAIL;
  constructor(public payload: any) { }
}

export type EmployeePayRateAction =
  GetEmployeePayRate
  | GetEmployeePayRateSuccess
  | GetEmployeePayRateFail
  | GetEmployeePayRateList
  | GetEmployeePayRateListSuccess
  | GetEmployeePayRateListFail
  | SaveEmployeePayRate
  | SaveEmployeePayRateSuccess
  | SaveEmployeePayRateFail
  | EditEmployeePayRate
  | EditEmployeePayRateSuccess
  | EditEmployeePayRateFail
  | DeleteEmployeePayRate
  | DeleteEmployeePayRateSuccess
  | DeleteEmployeePayRateFail
  | UploadEmployeePosition
  | UploadEmployeePositionSuccess
  | UploadEmployeePositionFail;



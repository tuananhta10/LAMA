import { Action } from '@ngrx/store';

/* FOR EMPLOYEE_PAY_RATE_LOADING
*/
export const enum EmployeePayRateLoadingActionTypes {
  GET_EMPLOYEE_PAY_RATE_LOADING = '[EmployeePayRateLoading] Get EmployeePayRateLoading',
  GET_EMPLOYEE_PAY_RATE_LOADING_SUCCESS = '[EmployeePayRateLoading] Get EmployeePayRateLoading Success',
  GET_EMPLOYEE_PAY_RATE_LOADING_FAIL = '[EmployeePayRateLoading] Get EmployeePayRateLoading Fail',

  GET_EMPLOYEE_PAY_RATE_LOADING_LIST = '[EmployeePayRateLoading] Get EmployeePayRateLoading list',
  GET_EMPLOYEE_PAY_RATE_LOADING_LIST_SUCCESS = '[EmployeePayRateLoading] Get EmployeePayRateLoading list Success',
  GET_EMPLOYEE_PAY_RATE_LOADING_LIST_FAIL = '[EmployeePayRateLoading] Get EmployeePayRateLoading list Fail',

  SAVE_EMPLOYEE_PAY_RATE_LOADING = '[EmployeePayRateLoading] Save EmployeePayRateLoading',
  SAVE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS = '[EmployeePayRateLoading] Save EmployeePayRateLoading Success',
  SAVE_EMPLOYEE_PAY_RATE_LOADING_FAIL = '[EmployeePayRateLoading] Save EmployeePayRateLoading Fail',

  EDIT_EMPLOYEE_PAY_RATE_LOADING = '[EmployeePayRateLoading] Edit EmployeePayRateLoading',
  EDIT_EMPLOYEE_PAY_RATE_LOADING_SUCCESS = '[EmployeePayRateLoading] Edit EmployeePayRateLoading Success',
  EDIT_EMPLOYEE_PAY_RATE_LOADING_FAIL = '[EmployeePayRateLoading] Edit EmployeePayRateLoading Fail',

  DELETE_EMPLOYEE_PAY_RATE_LOADING = '[EmployeePayRateLoading] Delete EmployeePayRateLoading',
  DELETE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS = '[EmployeePayRateLoading] Delete EmployeePayRateLoading Success',
  DELETE_EMPLOYEE_PAY_RATE_LOADING_FAIL = '[EmployeePayRateLoading] Delete EmployeePayRateLoading Fail',

  UPLOAD_EMPLOYEE_PAYRATE_LOADING = '[Employee] Upload Payrate loading', 
  UPLOAD_EMPLOYEE_PAYRATE_LOADING_SUCCESS = '[Employee] Upload Payrate loading Success', 
  UPLOAD_EMPLOYEE_PAYRATE_LOADING_FAIL = '[Employee] Upload Payrate loading Fail', 
}

export class GetEmployeePayRateLoading implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateLoadingSuccess implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_SUCCESS;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateLoadingFail implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_FAIL;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateLoadingList implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateLoadingListSuccess implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetEmployeePayRateLoadingListFail implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SaveEmployeePayRateLoading implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING;
  constructor(public payload: any) { }
}

export class SaveEmployeePayRateLoadingSuccess implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveEmployeePayRateLoadingFail implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.SAVE_EMPLOYEE_PAY_RATE_LOADING_FAIL;
  constructor(public payload: any) { }
}

export class EditEmployeePayRateLoading implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING;
  constructor(public payload: any) { }
}

export class EditEmployeePayRateLoadingSuccess implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING_SUCCESS;
  constructor(public payload: any) { }
}

export class EditEmployeePayRateLoadingFail implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.EDIT_EMPLOYEE_PAY_RATE_LOADING_FAIL;
  constructor(public payload: any) { }
}

export class DeleteEmployeePayRateLoading implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING;
  constructor(public payload: any) { }
}

export class DeleteEmployeePayRateLoadingSuccess implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteEmployeePayRateLoadingFail implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.DELETE_EMPLOYEE_PAY_RATE_LOADING_FAIL;
  constructor(public payload: any) { }
}

export class UploadEmployeePayrateLoading implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING;
  constructor(public payload: any) { }
}

export class UploadEmployeePayrateLoadingSuccess implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING_SUCCESS;
  constructor(public payload: any) { }
}

export class UploadEmployeePayrateLoadingFail implements Action {
  public readonly type = EmployeePayRateLoadingActionTypes.UPLOAD_EMPLOYEE_PAYRATE_LOADING_FAIL;
  constructor(public payload: any) { }
}

export type EmployeePayRateLoadingAction =
  GetEmployeePayRateLoading
  | GetEmployeePayRateLoadingSuccess
  | GetEmployeePayRateLoadingFail
  | GetEmployeePayRateLoadingList
  | GetEmployeePayRateLoadingListSuccess
  | GetEmployeePayRateLoadingListFail
  | SaveEmployeePayRateLoading
  | SaveEmployeePayRateLoadingSuccess
  | SaveEmployeePayRateLoadingFail
  | EditEmployeePayRateLoading
  | EditEmployeePayRateLoadingSuccess
  | EditEmployeePayRateLoadingFail
  | DeleteEmployeePayRateLoading
  | DeleteEmployeePayRateLoadingSuccess
  | DeleteEmployeePayRateLoadingFail
  | UploadEmployeePayrateLoading
  | UploadEmployeePayrateLoadingSuccess
  | UploadEmployeePayrateLoadingFail;



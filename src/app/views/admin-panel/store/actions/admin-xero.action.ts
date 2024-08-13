import { Action } from '@ngrx/store';

export const enum SyncToXeroActionTypes {
  SYNC_TO_XERO_LIST = '[SyncToXero] Get Sync To Xero Progress',
  SYNC_TO_XERO_LIST_SUCCESS = '[SyncToXero] Get Sync To Xero Progress Success',
  SYNC_TO_XERO_LIST_FAIL = '[SyncToXero] Get Sync To Xero Progress Fail',

  SYNC_TO_XERO = '[SyncToXero] Get Sync To Xero',
  SYNC_TO_XERO_SUCCESS = '[SyncToXero] Get Sync To Xero Success',
  SYNC_TO_XERO_FAIL = '[SyncToXero] Get Sync To Xero Fail',

  GET_XERO_PAYROLL_CALENDAR = '[SyncToXero] Get Payroll Calendar',
  GET_XERO_PAYROLL_CALENDAR_SUCCESS = '[SyncToXero] Get Payroll Calendar Success',
  GET_XERO_PAYROLL_CALENDAR_FAIL = '[SyncToXero] Get Payroll Calendar Fail',

  GET_MYOB_SETTINGS = '[SyncToXero] Get MYOB Settings',
  GET_MYOB_SETTINGS_SUCCESS = '[SyncToXero] Get MYOB Settings Success',
  GET_MYOB_SETTINGS_FAIL = '[SyncToXero] Get MYOB Settings Fail',
  
  GET_MYOB_COMPANY_FILE = '[SyncToXero] Get MYOB COMPANY_FILE',
  GET_MYOB_COMPANY_FILE_SUCCESS = '[SyncToXero] Get MYOB COMPANY_FILE Success',
  GET_MYOB_COMPANY_FILE_FAIL = '[SyncToXero] Get MYOB COMPANY_FILE Fail',
}

export class SyncToXeroList implements Action {
  public readonly type = SyncToXeroActionTypes.SYNC_TO_XERO_LIST;
  constructor(public payload: any) { }
}

export class SyncToXeroSuccessList implements Action {
  public readonly type = SyncToXeroActionTypes.SYNC_TO_XERO_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class SyncToXeroFailList implements Action {
  public readonly type = SyncToXeroActionTypes.SYNC_TO_XERO_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SyncToXero implements Action {
  public readonly type = SyncToXeroActionTypes.SYNC_TO_XERO;
  constructor(public payload: any) { }
}

export class SyncToXeroSuccess implements Action {
  public readonly type = SyncToXeroActionTypes.SYNC_TO_XERO_SUCCESS;
  constructor(public payload: any) { }
}

export class SyncToXeroFail implements Action {
  public readonly type = SyncToXeroActionTypes.SYNC_TO_XERO_FAIL;
  constructor(public payload: any) { }
}

export class GetPayrollCalendar implements Action {
  public readonly type = SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR;
  constructor(public payload: any) { }
}

export class GetPayrollCalendarSuccess implements Action {
  public readonly type = SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR_SUCCESS;
  constructor(public payload: any) { }
}

export class GetPayrollCalendarFail implements Action {
  public readonly type = SyncToXeroActionTypes.GET_XERO_PAYROLL_CALENDAR_FAIL;
  constructor(public payload: any) { }
}

export class GetMYOBSettings implements Action {
  public readonly type = SyncToXeroActionTypes.GET_MYOB_SETTINGS;
  constructor(public payload: any) { }
}

export class GetMYOBSettingsSuccess implements Action {
  public readonly type = SyncToXeroActionTypes.GET_MYOB_SETTINGS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetMYOBSettingsFail implements Action {
  public readonly type = SyncToXeroActionTypes.GET_MYOB_SETTINGS_FAIL;
  constructor(public payload: any) { }
}

export class GetMYOBCompanyFile implements Action {
  public readonly type = SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE;
  constructor(public payload: any) { }
}

export class GetMYOBCompanyFileSuccess implements Action {
  public readonly type = SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetMYOBCompanyFileFail implements Action {
  public readonly type = SyncToXeroActionTypes.GET_MYOB_COMPANY_FILE_FAIL;
  constructor(public payload: any) { }
}

export type SyncToXeroAction =
  SyncToXeroList
  | SyncToXeroSuccessList
  | SyncToXeroFailList
  | SyncToXero
  | SyncToXeroSuccess
  | SyncToXeroFail
  | GetPayrollCalendar
  | GetPayrollCalendarSuccess
  | GetPayrollCalendarFail
  | GetMYOBSettings
  | GetMYOBSettingsSuccess
  | GetMYOBSettingsFail
  | GetMYOBCompanyFile
  | GetMYOBCompanyFileSuccess
  | GetMYOBCompanyFileFail



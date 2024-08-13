import { Action } from '@ngrx/store';

/* FOR PUBLIC_HOLIDAY
*/
export const enum PublicHolidayActionTypes {
  GET_PUBLIC_HOLIDAY = '[PublicHoliday] Get PublicHoliday',
  GET_PUBLIC_HOLIDAY_SUCCESS = '[PublicHoliday] Get PublicHoliday Success',
  GET_PUBLIC_HOLIDAY_FAIL = '[PublicHoliday] Get PublicHoliday Fail',

  GET_PUBLIC_HOLIDAY_LIST = '[PublicHoliday] Get PublicHoliday list',
  GET_PUBLIC_HOLIDAY_LIST_SUCCESS = '[PublicHoliday] Get PublicHoliday list Success',
  GET_PUBLIC_HOLIDAY_LIST_FAIL = '[PublicHoliday] Get PublicHoliday list Fail',

  SAVE_PUBLIC_HOLIDAY = '[PublicHoliday] Save PublicHoliday',
  SAVE_PUBLIC_HOLIDAY_SUCCESS = '[PublicHoliday] Save PublicHoliday Success',
  SAVE_PUBLIC_HOLIDAY_FAIL = '[PublicHoliday] Save PublicHoliday Fail',

  EDIT_PUBLIC_HOLIDAY = '[PublicHoliday] Edit PublicHoliday',
  EDIT_PUBLIC_HOLIDAY_SUCCESS = '[PublicHoliday] Edit PublicHoliday Success',
  EDIT_PUBLIC_HOLIDAY_FAIL = '[PublicHoliday] Edit PublicHoliday Fail',

  DELETE_PUBLIC_HOLIDAY = '[PublicHoliday] Delete PublicHoliday',
  DELETE_PUBLIC_HOLIDAY_SUCCESS = '[PublicHoliday] Delete PublicHoliday Success',
  DELETE_PUBLIC_HOLIDAY_FAIL = '[PublicHoliday] Delete PublicHoliday Fail',
}

export class GetPublicHoliday implements Action {
  public readonly type = PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY;
  constructor(public payload: any) { }
}

export class GetPublicHolidaySuccess implements Action {
  public readonly type = PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_SUCCESS;
  constructor(public payload: any) { }
}

export class GetPublicHolidayFail implements Action {
  public readonly type = PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_FAIL;
  constructor(public payload: any) { }
}

export class GetPublicHolidayList implements Action {
  public readonly type = PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST;
  constructor(public payload: any) { }
}

export class GetPublicHolidayListSuccess implements Action {
  public readonly type = PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetPublicHolidayListFail implements Action {
  public readonly type = PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SavePublicHoliday implements Action {
  public readonly type = PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY;
  constructor(public payload: any) { }
}

export class SavePublicHolidaySuccess implements Action {
  public readonly type = PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY_SUCCESS;
  constructor(public payload: any) { }
}

export class SavePublicHolidayFail implements Action {
  public readonly type = PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY_FAIL;
  constructor(public payload: any) { }
}

export class EditPublicHoliday implements Action {
  public readonly type = PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY;
  constructor(public payload: any) { }
}

export class EditPublicHolidaySuccess implements Action {
  public readonly type = PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY_SUCCESS;
  constructor(public payload: any) { }
}

export class EditPublicHolidayFail implements Action {
  public readonly type = PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY_FAIL;
  constructor(public payload: any) { }
}

export class DeletePublicHoliday implements Action {
  public readonly type = PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY;
  constructor(public payload: any) { }
}

export class DeletePublicHolidaySuccess implements Action {
  public readonly type = PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY_SUCCESS;
  constructor(public payload: any) { }
}

export class DeletePublicHolidayFail implements Action {
  public readonly type = PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY_FAIL;
  constructor(public payload: any) { }
}

export type PublicHolidayAction =
  GetPublicHoliday
  | GetPublicHolidaySuccess
  | GetPublicHolidayFail
  | GetPublicHolidayList
  | GetPublicHolidayListSuccess
  | GetPublicHolidayListFail
  | SavePublicHoliday
  | SavePublicHolidaySuccess
  | SavePublicHolidayFail
  | EditPublicHoliday
  | EditPublicHolidaySuccess
  | EditPublicHolidayFail
  | DeletePublicHoliday
  | DeletePublicHolidaySuccess
  | DeletePublicHolidayFail;



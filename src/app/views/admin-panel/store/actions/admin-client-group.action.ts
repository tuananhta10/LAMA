import { Action } from '@ngrx/store';

/* FOR CLIENT_GROUP
*/
export const enum ClientGroupActionTypes {
  GET_CLIENT_GROUP = '[ClientGroup] Get ClientGroup',
  GET_CLIENT_GROUP_SUCCESS = '[ClientGroup] Get ClientGroup Success',
  GET_CLIENT_GROUP_FAIL = '[ClientGroup] Get ClientGroup Fail',

  GET_CLIENT_GROUP_SCHEDULE = '[ClientGroup] Get ClientGroup Schedule',
  GET_CLIENT_GROUP_SCHEDULE_SUCCESS = '[ClientGroup] Get ClientGroup Schedule Success',
  GET_CLIENT_GROUP_SCHEDULE_FAIL = '[ClientGroup] Get ClientGroup Schedule Fail',

  GET_CLIENT_GROUP_LIST = '[ClientGroup] Get ClientGroup list',
  GET_CLIENT_GROUP_LIST_SUCCESS = '[ClientGroup] Get ClientGroup list Success',
  GET_CLIENT_GROUP_LIST_FAIL = '[ClientGroup] Get ClientGroup list Fail',

  SAVE_CLIENT_GROUP = '[ClientGroup] Save ClientGroup',
  SAVE_CLIENT_GROUP_SUCCESS = '[ClientGroup] Save ClientGroup Success',
  SAVE_CLIENT_GROUP_FAIL = '[ClientGroup] Save ClientGroup Fail',

  EDIT_CLIENT_GROUP = '[ClientGroup] Edit ClientGroup',
  EDIT_CLIENT_GROUP_SUCCESS = '[ClientGroup] Edit ClientGroup Success',
  EDIT_CLIENT_GROUP_FAIL = '[ClientGroup] Edit ClientGroup Fail',

  DELETE_CLIENT_GROUP = '[ClientGroup] Delete ClientGroup',
  DELETE_CLIENT_GROUP_SUCCESS = '[ClientGroup] Delete ClientGroup Success',
  DELETE_CLIENT_GROUP_FAIL = '[ClientGroup] Delete ClientGroup Fail',
}

export class GetClientGroup implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP;
  constructor(public payload: any) { }
}

export class GetClientGroupSuccess implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientGroupFail implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP_FAIL;
  constructor(public payload: any) { }
}

export class GetClientGroupSchedule implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE;
  constructor(public payload: any) { }
}

export class GetClientGroupScheduleSuccess implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientGroupScheduleFail implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP_SCHEDULE_FAIL;
  constructor(public payload: any) { }
}


export class GetClientGroupList implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP_LIST;
  constructor(public payload: any) { }
}

export class GetClientGroupListSuccess implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetClientGroupListFail implements Action {
  public readonly type = ClientGroupActionTypes.GET_CLIENT_GROUP_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SaveClientGroup implements Action {
  public readonly type = ClientGroupActionTypes.SAVE_CLIENT_GROUP;
  constructor(public payload: any) { }
}

export class SaveClientGroupSuccess implements Action {
  public readonly type = ClientGroupActionTypes.SAVE_CLIENT_GROUP_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveClientGroupFail implements Action {
  public readonly type = ClientGroupActionTypes.SAVE_CLIENT_GROUP_FAIL;
  constructor(public payload: any) { }
}

export class EditClientGroup implements Action {
  public readonly type = ClientGroupActionTypes.EDIT_CLIENT_GROUP;
  constructor(public payload: any) { }
}

export class EditClientGroupSuccess implements Action {
  public readonly type = ClientGroupActionTypes.EDIT_CLIENT_GROUP_SUCCESS;
  constructor(public payload: any) { }
}

export class EditClientGroupFail implements Action {
  public readonly type = ClientGroupActionTypes.EDIT_CLIENT_GROUP_FAIL;
  constructor(public payload: any) { }
}

export class DeleteClientGroup implements Action {
  public readonly type = ClientGroupActionTypes.DELETE_CLIENT_GROUP;
  constructor(public payload: any) { }
}

export class DeleteClientGroupSuccess implements Action {
  public readonly type = ClientGroupActionTypes.DELETE_CLIENT_GROUP_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteClientGroupFail implements Action {
  public readonly type = ClientGroupActionTypes.DELETE_CLIENT_GROUP_FAIL;
  constructor(public payload: any) { }
}

export type ClientGroupAction =
  GetClientGroup
  | GetClientGroupSuccess
  | GetClientGroupFail
  | GetClientGroupSchedule
  | GetClientGroupScheduleSuccess
  | GetClientGroupScheduleFail
  | GetClientGroupList
  | GetClientGroupListSuccess
  | GetClientGroupListFail
  | SaveClientGroup
  | SaveClientGroupSuccess
  | SaveClientGroupFail
  | EditClientGroup
  | EditClientGroupSuccess
  | EditClientGroupFail
  | DeleteClientGroup
  | DeleteClientGroupSuccess
  | DeleteClientGroupFail;;



import { Action } from '@ngrx/store';

/* FOR SCHEDULE_BOARD
*/
export const enum ScheduleBoardActionTypes {
  GET_SCHEDULE_BOARD = '[ScheduleBoard] Get ScheduleBoard',
  GET_SCHEDULE_BOARD_SUCCESS = '[ScheduleBoard] Get ScheduleBoard Success',
  GET_SCHEDULE_BOARD_FAIL = '[ScheduleBoard] Get ScheduleBoard Fail',

  GET_SCHEDULE_BOARD_LIST = '[ScheduleBoard] Get ScheduleBoard list',
  GET_SCHEDULE_BOARD_LIST_SUCCESS = '[ScheduleBoard] Get ScheduleBoard list Success',
  GET_SCHEDULE_BOARD_LIST_FAIL = '[ScheduleBoard] Get ScheduleBoard list Fail',

  SAVE_SCHEDULE_BOARD = '[ScheduleBoard] Save ScheduleBoard',
  SAVE_SCHEDULE_BOARD_SUCCESS = '[ScheduleBoard] Save ScheduleBoard Success',
  SAVE_SCHEDULE_BOARD_FAIL = '[ScheduleBoard] Save ScheduleBoard Fail',

  EDIT_SCHEDULE_BOARD = '[ScheduleBoard] Edit ScheduleBoard',
  EDIT_SCHEDULE_BOARD_SUCCESS = '[ScheduleBoard] Edit ScheduleBoard Success',
  EDIT_SCHEDULE_BOARD_FAIL = '[ScheduleBoard] Edit ScheduleBoard Fail',

  DELETE_SCHEDULE_BOARD = '[ScheduleBoard] Delete ScheduleBoard',
  DELETE_SCHEDULE_BOARD_SUCCESS = '[ScheduleBoard] Delete ScheduleBoard Success',
  DELETE_SCHEDULE_BOARD_FAIL = '[ScheduleBoard] Delete ScheduleBoard Fail',

  ASSIGN_EMPLOYEE = '[ScheduleBoard] Assign employee',
  ASSIGN_EMPLOYEE_SUCCESS = '[ScheduleBoard] Assign employee Success',
  ASSIGN_EMPLOYEE_FAIL = '[ScheduleBoard] Assign employee Fail',

  GET_VACANT_EMPLOYEE = '[ScheduleBoard] Get vacant employee',
  GET_VACANT_EMPLOYEE_SUCCESS = '[ScheduleBoard] Get vacant employeed Success',
  GET_VACANT_EMPLOYEE_FAIL = '[ScheduleBoard] Get vacant employee Fail',

  GET_SCHEDULE_PARTICIPANT = '[ScheduleBoard] Get SCHEDULE PARTICIPANT',
  GET_SCHEDULE_PARTICIPANT_SUCCESS = '[ScheduleBoard] Get SCHEDULE PARTICIPANT Success',
  GET_SCHEDULE_PARTICIPANT_FAIL = '[ScheduleBoard] Get SCHEDULE PARTICIPANT Fail',
}

export class GetScheduleBoard implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_BOARD;
  constructor(public payload: any) { }
}

export class GetScheduleBoardSuccess implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_SUCCESS;
  constructor(public payload: any) { }
}

export class GetScheduleBoardFail implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_FAIL;
  constructor(public payload: any) { }
}

export class GetScheduleBoardList implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST;
  constructor(public payload: any) { }
}

export class GetScheduleBoardListSuccess implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetScheduleBoardListFail implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST_FAIL;
  constructor(public payload: any) { }
}

export class SaveScheduleBoard implements Action {
  public readonly type = ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD;
  constructor(public payload: any) { }
}

export class SaveScheduleBoardSuccess implements Action {
  public readonly type = ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveScheduleBoardFail implements Action {
  public readonly type = ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD_FAIL;
  constructor(public payload: any) { }
}

export class EditScheduleBoard implements Action {
  public readonly type = ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD;
  constructor(public payload: any) { }
}

export class EditScheduleBoardSuccess implements Action {
  public readonly type = ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD_SUCCESS;
  constructor(public payload: any) { }
}

export class EditScheduleBoardFail implements Action {
  public readonly type = ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD_FAIL;
  constructor(public payload: any) { }
}

export class DeleteScheduleBoard implements Action {
  public readonly type = ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD;
  constructor(public payload: any) { }
}

export class DeleteScheduleBoardSuccess implements Action {
  public readonly type = ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteScheduleBoardFail implements Action {
  public readonly type = ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD_FAIL;
  constructor(public payload: any) { }
}

export class AssignEmployee implements Action {
  public readonly type = ScheduleBoardActionTypes.ASSIGN_EMPLOYEE;
  constructor(public payload: any) { }
}

export class AssignEmployeeSuccess implements Action {
  public readonly type = ScheduleBoardActionTypes.ASSIGN_EMPLOYEE_SUCCESS;
  constructor(public payload: any) { }
}

export class AssignEmployeeFail implements Action {
  public readonly type = ScheduleBoardActionTypes.ASSIGN_EMPLOYEE_FAIL;
  constructor(public payload: any) { }
}

export class GetVacantEmployee implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE;
  constructor(public payload: any) { }
}

export class GetVacantEmployeeSuccess implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetVacantEmployeeFail implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE_FAIL;
  constructor(public payload: any) { }
}

export class GetScheduleParcitipant implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT;
  constructor(public payload: any) { }
}

export class GetScheduleParcitipantSuccess implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT_SUCCESS;
  constructor(public payload: any) { }
}

export class GetScheduleParcitipantFail implements Action {
  public readonly type = ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT_FAIL;
  constructor(public payload: any) { }
}

export type ScheduleBoardAction =
  GetScheduleBoard
  | GetScheduleBoardSuccess
  | GetScheduleBoardFail
  | GetScheduleBoardList
  | GetScheduleBoardListSuccess
  | GetScheduleBoardListFail
  | SaveScheduleBoard
  | SaveScheduleBoardSuccess
  | SaveScheduleBoardFail
  | EditScheduleBoard
  | EditScheduleBoardSuccess
  | EditScheduleBoardFail
  | DeleteScheduleBoard
  | DeleteScheduleBoardSuccess
  | DeleteScheduleBoardFail
  | AssignEmployee
  | AssignEmployeeSuccess
  | AssignEmployeeFail
  | GetVacantEmployee
  | GetVacantEmployeeSuccess
  | GetVacantEmployeeFail
  | GetScheduleParcitipant
  | GetScheduleParcitipantSuccess
  | GetScheduleParcitipantFail;



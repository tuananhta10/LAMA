import {
    ScheduleBoardAction,
    ScheduleBoardActionTypes
  
  } from '../actions/admin-schedule-board.action';
  
  // Create new interface for reducer
  export interface ScheduleBoardState {
    scheduleBoard: any;
    scheduleBoardList: any;
    vacantEmployees: any;
    pendingSchedule: any;
    pendingVacantEmployees:any;
    singleSchedules:any;
    pendingSingleSchedules:any;
    error: any;
    success: any;
  }
  
  // Set initial state of the data
  export const SCHEDULE_BOARD_INITIAL_STATE: ScheduleBoardState = {
    scheduleBoard: {},
    scheduleBoardList: [],
    vacantEmployees: [],
    singleSchedules:[],
    pendingSchedule: false,
    pendingVacantEmployees: false,
    pendingSingleSchedules: false,
    error: null,
    success: null
  }
  
  
  /*
    Create Reducer
    Take 2 Parameter: from ScheduleBoard
    @param
      state: value (scheduleBoard, pendingSchedule, error)
      action: from action type
  */
  export const ScheduleBoardReducer = (
    state: ScheduleBoardState = SCHEDULE_BOARD_INITIAL_STATE,
    action: ScheduleBoardAction,
  ): ScheduleBoardState => {
    switch (action.type) {
  
      case ScheduleBoardActionTypes.GET_SCHEDULE_BOARD:
        return { ...state, pendingSchedule: true, scheduleBoard: [] };
  
      case ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_SUCCESS:
        return { ...state, scheduleBoard: action.payload, pendingSchedule: false }
  
      case ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_FAIL:
        return { ...state, pendingSchedule: false, error: action.payload }
  
      case ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST:
        return { ...state, pendingSchedule: true, scheduleBoardList: [] };
  
      case ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST_SUCCESS:
        return { ...state, scheduleBoardList: action.payload, pendingSchedule: false }
  
      case ScheduleBoardActionTypes.GET_SCHEDULE_BOARD_LIST_FAIL:
        return { ...state, pendingSchedule: false, error: action.payload }
  
      case ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD:
        return { ...state, pendingSchedule: true };
  
      case ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD_SUCCESS:
        return { ...state, success: action.payload.message, pendingSchedule: false }
  
      case ScheduleBoardActionTypes.SAVE_SCHEDULE_BOARD_FAIL:
        return { ...state, pendingSchedule: false, error: action.payload }
  
      case ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD:
        return { ...state, pendingSchedule: true };
  
      case ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD_SUCCESS:
        return { ...state, success: action.payload.message, pendingSchedule: false }
  
      case ScheduleBoardActionTypes.EDIT_SCHEDULE_BOARD_FAIL:
        return { ...state, pendingSchedule: false, error: action.payload }
  
      case ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD:
        return { ...state, pendingSchedule: true };
  
      case ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD_SUCCESS:
        return { ...state, success: action.payload.message, pendingSchedule: false }
  
      case ScheduleBoardActionTypes.DELETE_SCHEDULE_BOARD_FAIL:
        return { ...state, pendingSchedule: false, error: action.payload }

      case ScheduleBoardActionTypes.ASSIGN_EMPLOYEE:
        return { ...state, pendingSchedule: true };
  
      case ScheduleBoardActionTypes.ASSIGN_EMPLOYEE_SUCCESS:
        return { ...state, success: action.payload.message, pendingSchedule: false }
  
      case ScheduleBoardActionTypes.ASSIGN_EMPLOYEE_FAIL:
        return { ...state, pendingSchedule: false, error: action.payload }

      case ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE:
        return { ...state, pendingVacantEmployees: true, vacantEmployees: [] };
  
      case ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE_SUCCESS:
        return { ...state, vacantEmployees: action.payload, pendingVacantEmployees: false }
  
      case ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE_FAIL:
        return { ...state, pendingVacantEmployees: false, error: action.payload }

      case ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT:
        return { ...state, pendingSingleSchedules: true, singleSchedules: [] };
  
      case ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT_SUCCESS:
        return { ...state, singleSchedules: action.payload, pendingSingleSchedules: false }
  
      case ScheduleBoardActionTypes.GET_SCHEDULE_PARTICIPANT_FAIL:
        return { ...state, pendingSingleSchedules: false, error: action.payload }
  
      default:
        return state;
    }
  }
  
  
import {
  PublicHolidayAction,
  PublicHolidayActionTypes

} from '../actions/admin-public-holiday.action';

// Create new interface for reducer
export interface PublicHolidayState {
  publicHoliday: any;
  publicHolidayList: any;
  pending: any;
  error: any;
  success: any;
}

// Set initial state of the data
export const PUBLIC_HOLIDAY_INITIAL_STATE: PublicHolidayState = {
  publicHoliday: {},
  publicHolidayList: [],
  pending: false,
  error: null,
  success: null
}


/*
  Create Reducer
  Take 2 Parameter: from PublicHoliday
  @param
    state: value (publicHoliday, pending, error)
    action: from action type
*/
export const PublicHolidayReducer = (
  state: PublicHolidayState = PUBLIC_HOLIDAY_INITIAL_STATE,
  action: PublicHolidayAction,
): PublicHolidayState => {
  switch (action.type) {

    case PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY:
      return { ...state, pending: true, publicHoliday: {} };

    case PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_SUCCESS:
      return { ...state, publicHoliday: action.payload, pending: false }

    case PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_FAIL:
      return { ...state, pending: false, error: action.payload }

    case PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST:
      return { ...state, pending: true, publicHolidayList: [] };

    case PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST_SUCCESS:
      return { ...state, publicHolidayList: action.payload, pending: false }

    case PublicHolidayActionTypes.GET_PUBLIC_HOLIDAY_LIST_FAIL:
      return { ...state, pending: false, error: action.payload }

    case PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY:
      return { ...state, pending: true };

    case PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY_FAIL:
      return { ...state, pending: false, error: action.payload }

    case PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY:
      return { ...state, pending: true };

    case PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY_FAIL:
      return { ...state, pending: false, error: action.payload }

    case PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY:
      return { ...state, pending: true };

    case PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case PublicHolidayActionTypes.DELETE_PUBLIC_HOLIDAY_FAIL:
      return { ...state, pending: false, error: action.payload }

    default:
      return state;
  }
}


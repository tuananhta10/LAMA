import {
	ClientServiceScheduleAction,
	ClientServiceScheduleActionTypes

} from '../actions/admin-client-service-schedule.action';

// Create new interface for reducer
export interface ClientServiceScheduleState {
	clientServiceSchedule: any;
    clientServiceScheduleList: any;
	pending: any;
	pendingDetails: any;
	error: any;
	success: any;
	successEdit: any;
}

// Set initial state of the data
export const CLIENT_SERVICE_SCHEDULE_INITIAL_STATE: ClientServiceScheduleState = {
	clientServiceSchedule: {},
    clientServiceScheduleList: [],
	pending: false,
	pendingDetails: false,
	error: null,
	success: null,
	successEdit: null
}


/*
	Create Reducer
	Take 2 Parameter: from ClientServiceSchedule
	@param
		state: value (clientServiceSchedule, pending, error)
		action: from action type
*/
export const ClientServiceScheduleReducer = (
	state: ClientServiceScheduleState = CLIENT_SERVICE_SCHEDULE_INITIAL_STATE,
	action: ClientServiceScheduleAction,
	): ClientServiceScheduleState => {
		switch (action.type){

			case ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE:
			return { ...state, pendingDetails: true, clientServiceSchedule: {} };

			case ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_SUCCESS:
			return { ...state, clientServiceSchedule: action.payload, pendingDetails: false }

			case ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_FAIL:
			return { ...state, pendingDetails: false, error: action.payload }

            case ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST:
            return { ...state, pending: true };

            case ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST_SUCCESS:
            return { ...state, clientServiceScheduleList: action.payload, pending: false }

            /* SAVE REGULAR SCHEDULE */

            case ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE:
			return { ...state, pending: true };

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_FAIL:
			return { ...state, pending: false, error: action.payload }

			/* SAVE RECURRING SCHEDULE */

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING:
			return { ...state, pending: true };

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE:
			return { ...state, pending: true };

			case ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE_SUCCESS:
			return { ...state, success: action.payload, pending: false }

			case ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientServiceScheduleActionTypes.RESCHEDULE_SCHEDULE_EMPLOYEE:
			return { ...state, pending: true };

			case ClientServiceScheduleActionTypes.RESCHEDULE_SCHEDULE_EMPLOYEE_SUCCESS:
			return { ...state, success: action.payload, pending: false }

			case ClientServiceScheduleActionTypes.RESCHEDULE_SCHEDULE_EMPLOYEE_FAIL:
			return { ...state, pending: false, error: action.payload }

			/* END OF RECURRING SCHEDULE */

			/* SAVE GROUP SCHEDULE */

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP:
			return { ...state, pending: true };

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP:
			return { ...state, pending: true };

			case ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP_FAIL:
			return { ...state, pending: false, error: action.payload }

			/* END OF GROUP SCHEDULE */

			case ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE:
			return { ...state, pending: true };

			case ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_FAIL:
			return { ...state, pending: false, error: action.payload }

      		case ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE:
			return { ...state, pending: true };

			case ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}


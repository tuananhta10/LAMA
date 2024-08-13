import { 
	NotificationAction,
	NotificationActionTypes
	
} from '../actions/admin-notification.action';

// Create new interface for reducer
export interface NotificationState {
	notification: any;
    notificationList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const NOTIFICATION_INITIAL_STATE: NotificationState = {
	notification: {},
    notificationList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Notification 
	@param 
		state: value (notification, pending, error)
		action: from action type
*/
export const NotificationReducer = (
	state: NotificationState = NOTIFICATION_INITIAL_STATE,
	action: NotificationAction,
	): NotificationState => {
		switch (action.type){

			case NotificationActionTypes.GET_NOTIFICATION:
			return { ...state, pending: true };

			case NotificationActionTypes.GET_NOTIFICATION_SUCCESS:
			return { ...state, notification: action.payload, pending: false }

			case NotificationActionTypes.GET_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

            case NotificationActionTypes.GET_NOTIFICATION_LIST:
            return { ...state, pending: true };

            case NotificationActionTypes.GET_NOTIFICATION_LIST_SUCCESS:
            return { ...state, notificationList: action.payload, pending: false }

            case NotificationActionTypes.GET_NOTIFICATION_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case NotificationActionTypes.SAVE_NOTIFICATION:
			return { ...state, pending: true };

			case NotificationActionTypes.SAVE_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case NotificationActionTypes.SAVE_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case NotificationActionTypes.EDIT_NOTIFICATION:
			return { ...state, pending: true };

			case NotificationActionTypes.EDIT_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case NotificationActionTypes.EDIT_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			case NotificationActionTypes.DELETE_NOTIFICATION:
			return { ...state, pending: true };

			case NotificationActionTypes.DELETE_NOTIFICATION_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case NotificationActionTypes.DELETE_NOTIFICATION_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

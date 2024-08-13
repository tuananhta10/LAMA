import { Action } from '@ngrx/store';

/* FOR NOTIFICATION  
*/
export const enum NotificationActionTypes {
	GET_NOTIFICATION = '[Notification] Get Notification', 
	GET_NOTIFICATION_SUCCESS = '[Notification] Get Notification Success', 
	GET_NOTIFICATION_FAIL = '[Notification] Get Notification Fail', 

    GET_NOTIFICATION_LIST = '[Notification] Get Notification list', 
	GET_NOTIFICATION_LIST_SUCCESS = '[Notification] Get Notification list Success', 
	GET_NOTIFICATION_LIST_FAIL = '[Notification] Get Notification list Fail',

	SAVE_NOTIFICATION = '[Notification] Save Notification', 
	SAVE_NOTIFICATION_SUCCESS = '[Notification] Save Notification Success', 
	SAVE_NOTIFICATION_FAIL = '[Notification] Save Notification Fail',
	
	EDIT_NOTIFICATION = '[Notification] Edit Notification', 
	EDIT_NOTIFICATION_SUCCESS = '[Notification] Edit Notification Success', 
	EDIT_NOTIFICATION_FAIL = '[Notification] Edit Notification Fail',

	DELETE_NOTIFICATION = '[Notification] Delete Notification', 
	DELETE_NOTIFICATION_SUCCESS = '[Notification] Delete Notification Success', 
	DELETE_NOTIFICATION_FAIL = '[Notification] Delete Notification Fail',
}

export class GetNotification implements Action {
	public readonly type = NotificationActionTypes.GET_NOTIFICATION;
	constructor(public payload: any) { }
}

export class GetNotificationSuccess implements Action {
	public readonly type = NotificationActionTypes.GET_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class GetNotificationFail implements Action {
	public readonly type = NotificationActionTypes.GET_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class GetNotificationList implements Action {
	public readonly type = NotificationActionTypes.GET_NOTIFICATION_LIST;
	constructor(public payload: any) { }
}

export class GetNotificationListSuccess implements Action {
	public readonly type = NotificationActionTypes.GET_NOTIFICATION_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetNotificationListFail implements Action {
	public readonly type = NotificationActionTypes.GET_NOTIFICATION_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveNotification implements Action {
	public readonly type = NotificationActionTypes.SAVE_NOTIFICATION;
	constructor(public payload: any) { }
}

export class SaveNotificationSuccess implements Action {
	public readonly type = NotificationActionTypes.SAVE_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveNotificationFail implements Action {
	public readonly type = NotificationActionTypes.SAVE_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class EditNotification implements Action {
	public readonly type = NotificationActionTypes.EDIT_NOTIFICATION;
	constructor(public payload: any) { }
}

export class EditNotificationSuccess implements Action {
	public readonly type = NotificationActionTypes.EDIT_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class EditNotificationFail implements Action {
	public readonly type = NotificationActionTypes.EDIT_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export class DeleteNotification implements Action {
	public readonly type = NotificationActionTypes.DELETE_NOTIFICATION;
	constructor(public payload: any) { }
}

export class DeleteNotificationSuccess implements Action {
	public readonly type = NotificationActionTypes.DELETE_NOTIFICATION_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteNotificationFail implements Action {
	public readonly type = NotificationActionTypes.DELETE_NOTIFICATION_FAIL;
	constructor(public payload: any) { }
}

export type NotificationAction =
	GetNotification
|	GetNotificationSuccess
|  	GetNotificationFail
|   GetNotificationList
|   GetNotificationListSuccess
|   GetNotificationListFail
|	SaveNotification
|	SaveNotificationSuccess
|	SaveNotificationFail
|	EditNotification
|	EditNotificationSuccess
|	EditNotificationFail
|   DeleteNotification
|   DeleteNotificationSuccess
|   DeleteNotificationFail;



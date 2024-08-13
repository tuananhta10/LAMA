import { Action } from '@ngrx/store';

/* FOR CLIENT_SERVICE_SCHEDULE
*/
export const enum ClientServiceScheduleActionTypes {
	GET_CLIENT_SERVICE_SCHEDULE = '[ClientServiceSchedule] Get ClientServiceSchedule',
	GET_CLIENT_SERVICE_SCHEDULE_SUCCESS = '[ClientServiceSchedule] Get ClientServiceSchedule Success',
	GET_CLIENT_SERVICE_SCHEDULE_FAIL = '[ClientServiceSchedule] Get ClientServiceSchedule Fail',

    GET_CLIENT_SERVICE_SCHEDULE_LIST = '[ClientServiceSchedule] Get ClientServiceSchedule list',
	GET_CLIENT_SERVICE_SCHEDULE_LIST_SUCCESS = '[ClientServiceSchedule] Get ClientServiceSchedule list Success',
	GET_CLIENT_SERVICE_SCHEDULE_LIST_FAIL = '[ClientServiceSchedule] Get ClientServiceSchedule list Fail',

	SAVE_CLIENT_SERVICE_SCHEDULE = '[ClientServiceSchedule] Save ClientServiceSchedule',
	SAVE_CLIENT_SERVICE_SCHEDULE_SUCCESS = '[ClientServiceSchedule] Save ClientServiceSchedule Success',
	SAVE_CLIENT_SERVICE_SCHEDULE_FAIL = '[ClientServiceSchedule] Save ClientServiceSchedule Fail',

	SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING = '[ClientServiceSchedule] Save Recurring ClientServiceSchedule',
	SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING_SUCCESS = '[ClientServiceSchedule] Save Recurring ClientServiceSchedule Success',
	SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING_FAIL = '[ClientServiceSchedule] Save Recurring ClientServiceSchedule Fail',

	UPDATE_BULK_SERVICE_SCHEDULE = '[UpdateServiceSchedule] Update Service Schedule Bulk',
	UPDATE_BULK_SERVICE_SCHEDULE_SUCCESS = '[UpdateServiceSchedule] Update Service Schedule Bulk',
	UPDATE_BULK_SERVICE_SCHEDULE_FAIL = '[UpdateServiceSchedule] Update Service Schedule Bulk',

	RESCHEDULE_SCHEDULE_EMPLOYEE = '[RescheduleScheduleEmployee] Reschedule ScheduleE mployee',
	RESCHEDULE_SCHEDULE_EMPLOYEE_SUCCESS = '[RescheduleScheduleEmployee] Reschedule Schedule Employee',
	RESCHEDULE_SCHEDULE_EMPLOYEE_FAIL = '[RescheduleScheduleEmployee] Reschedule Schedule Employee',

	SAVE_CLIENT_SERVICE_SCHEDULE_GROUP = '[ClientServiceSchedule] Save Group ClientServiceSchedule',
	SAVE_CLIENT_SERVICE_SCHEDULE_GROUP_SUCCESS = '[ClientServiceSchedule] Save Group ClientServiceSchedule Success',
	SAVE_CLIENT_SERVICE_SCHEDULE_GROUP_FAIL = '[ClientServiceSchedule] Save Group ClientServiceSchedule Fail',

	EDIT_CLIENT_SERVICE_SCHEDULE_GROUP = '[ClientServiceSchedule] Edit Group ClientServiceSchedule',
	EDIT_CLIENT_SERVICE_SCHEDULE_GROUP_SUCCESS = '[ClientServiceSchedule] Edit Group ClientServiceSchedule Success',
	EDIT_CLIENT_SERVICE_SCHEDULE_GROUP_FAIL = '[ClientServiceSchedule] Edit Group ClientServiceSchedule Fail',

	EDIT_CLIENT_SERVICE_SCHEDULE = '[ClientServiceSchedule] Edit ClientServiceSchedule',
	EDIT_CLIENT_SERVICE_SCHEDULE_SUCCESS = '[ClientServiceSchedule] Edit ClientServiceSchedule Success',
	EDIT_CLIENT_SERVICE_SCHEDULE_FAIL = '[ClientServiceSchedule] Edit ClientServiceSchedule Fail',

  	DELETE_CLIENT_SERVICE_SCHEDULE = '[ClientServiceSchedule] Delete ClientServiceSchedule',
	DELETE_CLIENT_SERVICE_SCHEDULE_SUCCESS = '[ClientServiceSchedule] Delete ClientServiceSchedule Success',
	DELETE_CLIENT_SERVICE_SCHEDULE_FAIL = '[ClientServiceSchedule] Delete ClientServiceSchedule Fail',
}

export class GetClientServiceSchedule implements Action {
	public readonly type = ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE;
	constructor(public payload: any) { }
}

export class GetClientServiceScheduleSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientServiceScheduleFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_FAIL;
	constructor(public payload: any) { }
}

export class GetClientServiceScheduleList implements Action {
	public readonly type = ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST;
	constructor(public payload: any) { }
}

export class GetClientServiceScheduleListSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientServiceScheduleListFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.GET_CLIENT_SERVICE_SCHEDULE_LIST_FAIL;
	constructor(public payload: any) { }
}

// SINGLE CLIENT SERVICE SCHEDULE
export class SaveClientServiceSchedule implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE;
	constructor(public payload: any) { }
}

export class SaveClientServiceScheduleSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveClientServiceScheduleFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_FAIL;
	constructor(public payload: any) { }
}

// RECURRING CLIENT SERVICE SCHEDULE
export class SaveRecurringClientServiceSchedule implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING;
	constructor(public payload: any) { }
}

export class SaveRecurringClientServiceScheduleSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveRecurringClientServiceScheduleFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_RECURRING_FAIL;
	constructor(public payload: any) { }
}

export class UpdateBulkServiceSchedule implements Action {
	public readonly type = ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE;
	constructor(public payload: any) { }
}

export class UpdateBulkServiceScheduleSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE_SUCCESS;
	constructor(public payload: any) { }
}

export class UpdateBulkServiceScheduleFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE_FAIL;
	constructor(public payload: any) { }
}

export class RescheduleScheduleEmployee implements Action {
	public readonly type = ClientServiceScheduleActionTypes.RESCHEDULE_SCHEDULE_EMPLOYEE;
	constructor(public payload: any) { }
}

export class RescheduleScheduleEmployeeSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.RESCHEDULE_SCHEDULE_EMPLOYEE_SUCCESS;
	constructor(public payload: any) { }
}

export class RescheduleScheduleEmployeeFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.RESCHEDULE_SCHEDULE_EMPLOYEE_FAIL;
	constructor(public payload: any) { }
}

// GROUP CLIENT SERVICE SCHEDULE
export class SaveGroupClientServiceSchedule implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP;
	constructor(public payload: any) { }
}

export class SaveGroupClientServiceScheduleSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveGroupClientServiceScheduleFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.SAVE_CLIENT_SERVICE_SCHEDULE_GROUP_FAIL;
	constructor(public payload: any) { }
}

// GROUP CLIENT SERVICE SCHEDULE
export class EditGroupClientServiceSchedule implements Action {
	public readonly type = ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP;
	constructor(public payload: any) { }
}

export class EditGroupClientServiceScheduleSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP_SUCCESS;
	constructor(public payload: any) { }
}

export class EditGroupClientServiceScheduleFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_GROUP_FAIL;
	constructor(public payload: any) { }
}

export class EditClientServiceSchedule implements Action {
	public readonly type = ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE;
	constructor(public payload: any) { }
}

export class EditClientServiceScheduleSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditClientServiceScheduleFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.EDIT_CLIENT_SERVICE_SCHEDULE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteClientServiceSchedule implements Action {
	public readonly type = ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE;
	constructor(public payload: any) { }
}

export class DeleteClientServiceScheduleSuccess implements Action {
	public readonly type = ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteClientServiceScheduleFail implements Action {
	public readonly type = ClientServiceScheduleActionTypes.DELETE_CLIENT_SERVICE_SCHEDULE_FAIL;
	constructor(public payload: any) { }
}

export type ClientServiceScheduleAction =
	GetClientServiceSchedule
|	GetClientServiceScheduleSuccess
|  	GetClientServiceScheduleFail
|   GetClientServiceScheduleList
|   GetClientServiceScheduleListSuccess
|   GetClientServiceScheduleListFail
|	SaveClientServiceSchedule
|	SaveClientServiceScheduleSuccess
|	SaveClientServiceScheduleFail
// recurring service schedule
|	SaveRecurringClientServiceSchedule
|	SaveRecurringClientServiceScheduleSuccess
|	SaveRecurringClientServiceScheduleFail
| 	UpdateBulkServiceSchedule
| 	UpdateBulkServiceScheduleSuccess
| 	UpdateBulkServiceScheduleFail
// group service schedule
|	SaveGroupClientServiceSchedule
|	SaveGroupClientServiceScheduleSuccess
|	SaveGroupClientServiceScheduleFail
|	EditGroupClientServiceSchedule
|	EditGroupClientServiceScheduleSuccess
|	EditGroupClientServiceScheduleFail
// edit schedule
|	EditClientServiceSchedule
|	EditClientServiceScheduleSuccess
|	EditClientServiceScheduleFail
|	DeleteClientServiceSchedule
|	DeleteClientServiceScheduleSuccess
|	DeleteClientServiceScheduleFail
// new rescheduling api on employee tab
|	RescheduleScheduleEmployee
|	RescheduleScheduleEmployeeSuccess
|	RescheduleScheduleEmployeeFail;




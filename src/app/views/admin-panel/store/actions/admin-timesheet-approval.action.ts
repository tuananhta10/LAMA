import { Action } from '@ngrx/store';

/* FOR TIMESHEET_APPROVAL  
*/
export const enum TimesheetApprovalActionTypes {
	GET_TIMESHEET_APPROVAL = '[TimesheetApproval] Get TimesheetApproval', 
	GET_TIMESHEET_APPROVAL_SUCCESS = '[TimesheetApproval] Get TimesheetApproval Success', 
	GET_TIMESHEET_APPROVAL_FAIL = '[TimesheetApproval] Get TimesheetApproval Fail', 

    GET_TIMESHEET_APPROVAL_LIST = '[TimesheetApproval] Get TimesheetApproval list', 
	GET_TIMESHEET_APPROVAL_LIST_SUCCESS = '[TimesheetApproval] Get TimesheetApproval list Success', 
	GET_TIMESHEET_APPROVAL_LIST_FAIL = '[TimesheetApproval] Get TimesheetApproval list Fail',

	SAVE_TIMESHEET_APPROVAL = '[TimesheetApproval] Save TimesheetApproval', 
	SAVE_TIMESHEET_APPROVAL_SUCCESS = '[TimesheetApproval] Save TimesheetApproval Success', 
	SAVE_TIMESHEET_APPROVAL_FAIL = '[TimesheetApproval] Save TimesheetApproval Fail',
	
	EDIT_TIMESHEET_APPROVAL = '[TimesheetApproval] Edit TimesheetApproval', 
	EDIT_TIMESHEET_APPROVAL_SUCCESS = '[TimesheetApproval] Edit TimesheetApproval Success', 
	EDIT_TIMESHEET_APPROVAL_FAIL = '[TimesheetApproval] Edit TimesheetApproval Fail',

	APPROVE_DECLINE_TIMESHEET = '[TimesheetApproval] Approve Decline Timesheet', 
	APPROVE_DECLINE_TIMESHEET_SUCCESS = '[TimesheetApproval] Approve Decline Timesheet Success', 
	APPROVE_DECLINE_TIMESHEET_FAIL = '[TimesheetApproval] Approve Decline Timesheet Fail',

	GET_APPROVED_TIMESHEET = '[TimesheetApproval] Get Approved Timesheet', 
	GET_APPROVED_TIMESHEET_SUCCESS = '[TimesheetApproval] Get Approved Timesheet Success', 
	GET_APPROVED_TIMESHEET_FAIL = '[TimesheetApproval] Get Approved Timesheet Fail', 

	GENERATE_CLAIM = '[TimesheetApproval] GENERATE CLAIM', 
	GENERATE_CLAIM_SUCCESS = '[TimesheetApproval] GENERATE CLAIM Success', 
	GENERATE_CLAIM_FAIL = '[TimesheetApproval] GENERATE CLAIM Fail', 

	GENERATE_INVOICE_BATCH = '[TimesheetApproval] GENERATE INVOICE BATCH', 
	GENERATE_INVOICE_BATCH_SUCCESS = '[TimesheetApproval] GENERATE INVOICE BATCH Success', 
	GENERATE_INVOICE_BATCH_FAIL = '[TimesheetApproval] GENERATE INVOICE BATCH Fail', 
}

export class GetTimesheetApproval implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL;
	constructor(public payload: any) { }
}

export class GetTimesheetApprovalSuccess implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_SUCCESS;
	constructor(public payload: any) { }
}

export class GetTimesheetApprovalFail implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_FAIL;
	constructor(public payload: any) { }
}

export class GetTimesheetApprovalList implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST;
	constructor(public payload: any) { }
}

export class GetTimesheetApprovalListSuccess implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetTimesheetApprovalListFail implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveTimesheetApproval implements Action {
	public readonly type = TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL;
	constructor(public payload: any) { }
}

export class SaveTimesheetApprovalSuccess implements Action {
	public readonly type = TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveTimesheetApprovalFail implements Action {
	public readonly type = TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_FAIL;
	constructor(public payload: any) { }
}

export class EditTimesheetApproval implements Action {
	public readonly type = TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL;
	constructor(public payload: any) { }
}

export class EditTimesheetApprovalSuccess implements Action {
	public readonly type = TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_SUCCESS;
	constructor(public payload: any) { }
}

export class EditTimesheetApprovalFail implements Action {
	public readonly type = TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_FAIL;
	constructor(public payload: any) { }
}

export class ApproveDeclineTimesheet implements Action {
	public readonly type = TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET;
	constructor(public payload: any) { }
}

export class ApproveDeclineTimesheetSuccess implements Action {
	public readonly type = TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET_SUCCESS;
	constructor(public payload: any) { }
}

export class ApproveDeclineTimesheetFail implements Action {
	public readonly type = TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET_FAIL;
	constructor(public payload: any) { }
}

export class GetApprovedTimesheets implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET;
	constructor(public payload: any) { }
}

export class GetApprovedTimesheetsSuccess implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET_SUCCESS;
	constructor(public payload: any) { }
}

export class GetApprovedTimesheetsFail implements Action {
	public readonly type = TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET_FAIL;
	constructor(public payload: any) { }
}

export class GenerateClaim implements Action {
	public readonly type = TimesheetApprovalActionTypes.GENERATE_CLAIM;
	constructor(public payload: any) { }
}

export class GenerateClaimSuccess implements Action {
	public readonly type = TimesheetApprovalActionTypes.GENERATE_CLAIM_SUCCESS;
	constructor(public payload: any) { }
}

export class GenerateClaimFail implements Action {
	public readonly type = TimesheetApprovalActionTypes.GENERATE_CLAIM_FAIL;
	constructor(public payload: any) { }
}

export type TimesheetApprovalAction =
	GetTimesheetApproval
|	GetTimesheetApprovalSuccess
|  	GetTimesheetApprovalFail
|   GetTimesheetApprovalList
|   GetTimesheetApprovalListSuccess
|   GetTimesheetApprovalListFail
|	SaveTimesheetApproval
|	SaveTimesheetApprovalSuccess
|	SaveTimesheetApprovalFail
|	EditTimesheetApproval
|	EditTimesheetApprovalSuccess
|	EditTimesheetApprovalFail
|	ApproveDeclineTimesheet
|	ApproveDeclineTimesheetSuccess
|	ApproveDeclineTimesheetFail
| 	GetApprovedTimesheets
| 	GetApprovedTimesheetsSuccess
| 	GetApprovedTimesheetsFail
|	GenerateClaim
|	GenerateClaimSuccess
|	GenerateClaimFail;



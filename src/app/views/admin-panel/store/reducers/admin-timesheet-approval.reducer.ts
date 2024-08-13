import { 
	TimesheetApprovalAction,
	TimesheetApprovalActionTypes
	
} from '../actions/admin-timesheet-approval.action';

// Create new interface for reducer
export interface TimesheetApprovalState {
	timesheetApproval: any;
    timesheetApprovalList: any;
	approvedTimesheets: any;
	generated_claim: any[];
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const TIMESHEET_APPROVAL_INITIAL_STATE: TimesheetApprovalState = {
	timesheetApproval: {},
    timesheetApprovalList: null,
	approvedTimesheets: [],
	generated_claim:[],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from TimesheetApproval 
	@param 
		state: value (timesheetApproval, pending, error)
		action: from action type
*/
export const TimesheetApprovalReducer = (
	state: TimesheetApprovalState = TIMESHEET_APPROVAL_INITIAL_STATE,
	action: TimesheetApprovalAction,
	): TimesheetApprovalState => {
		switch (action.type){

			case TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL:
			return { ...state, pending: true, success: null, generated_claim: [] };

			case TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_SUCCESS:
			return { ...state, timesheetApproval: action.payload, pending: false }

			case TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_FAIL:
			return { ...state, pending: false, error: action.payload }

            case TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST:
            return { ...state, pending: true, timesheetApprovalList: [] };

            case TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_SUCCESS:
            return { ...state, timesheetApprovalList: action.payload, pending: false }

            case TimesheetApprovalActionTypes.GET_TIMESHEET_APPROVAL_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL:
			return { ...state, pending: true };

			case TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case TimesheetApprovalActionTypes.SAVE_TIMESHEET_APPROVAL_FAIL:
			return { ...state, pending: false, error: action.payload }

			case TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL:
			return { ...state, pending: true };

			case TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case TimesheetApprovalActionTypes.EDIT_TIMESHEET_APPROVAL_FAIL:
			return { ...state, pending: false, error: action.payload }

			case TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET:
			return { ...state, pending: true };

			case TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case TimesheetApprovalActionTypes.APPROVE_DECLINE_TIMESHEET_FAIL:
			return { ...state, pending: false, error: action.payload }

			case TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET:
            return { ...state, pending: true, approvedTimesheets: [] };

            case TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET_SUCCESS:
            return { ...state, approvedTimesheets: action.payload, pending: false }

            case TimesheetApprovalActionTypes.GET_APPROVED_TIMESHEET_FAIL:
            return { ...state, pending: false, error: action.payload }

			case TimesheetApprovalActionTypes.GENERATE_CLAIM:
			return { ...state, pending: true, generated_claim: [] };

			case TimesheetApprovalActionTypes.GENERATE_CLAIM_SUCCESS:
			return { ...state, generated_claim: action.payload, pending: false }

			case TimesheetApprovalActionTypes.GENERATE_CLAIM_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	

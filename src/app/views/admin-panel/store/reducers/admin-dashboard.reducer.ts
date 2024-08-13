import {
  DashboardAction,
  DashboardActionTypes,
} from '../actions/admin-dashboard.action';

// Create new interface for reducer
export interface DashboardState {
  statistics: any;
  leavePeriod: any;
  pendingLeave: boolean;

  incident: any;
  intake: any;
  task: any;
  employeeShift: any;
  employeeLeaveStatus: any;

  referrals: any;
  pending: any;
  pendingShift: boolean;
  taskPending: boolean;

  clientSummary: any;  
  clientPending: boolean;

  incidentMetric: any;
  incidentMetricPending: boolean;  

  SupportWorkerMetric: any;  
  SupportWorkerMetricPending: boolean;

  error: any;
  success: any;
}

// Set initial state of the data
export const DASHBOARD_INITIAL_STATE: DashboardState = {
  statistics: {},
  leavePeriod: {},
  pendingLeave: false,

  incident: {},
  intake: {},
  task: {},
  employeeShift: {},
  employeeLeaveStatus: {},
  referrals: {},
  pendingShift: false,
  pending: false,
  taskPending: false,

  clientSummary: {},  
  clientPending: false,

  incidentMetric: {},
  incidentMetricPending: false,  

  SupportWorkerMetric: {},  
  SupportWorkerMetricPending: false,

  error: null,
  success: null,
};

/*
	Create Reducer
	Take 2 Parameter: from Dashboard 
	@param 
		state: value (interest, pending, error)
		action: from action type
*/
export const DashboardReducer = (
  state: DashboardState = DASHBOARD_INITIAL_STATE,
  action: DashboardAction
): DashboardState => {
  switch (action.type) {
    case DashboardActionTypes.GET_DASHBOARD_STATISTIC:
      return { ...state, pending: true };

    case DashboardActionTypes.GET_DASHBOARD_STATISTIC_SUCCESS:
      return { ...state, statistics: action.payload, pending: false };

    case DashboardActionTypes.GET_DASHBOARD_STATISTIC_FAIL:
      return { ...state, pending: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD:
      return { ...state, pendingLeave: true };

    case DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD_SUCCESS:
      return { ...state, leavePeriod: action.payload, pendingLeave: false };

    case DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD_FAIL:
      return { ...state, pendingLeave: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_INCIDENT:
      return { ...state, pending: true };

    case DashboardActionTypes.GET_DASHBOARD_INCIDENT_SUCCESS:
      return { ...state, incident: action.payload, pending: false };

    case DashboardActionTypes.GET_DASHBOARD_INCIDENT_FAIL:
      return { ...state, pending: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_INTAKE:
      return { ...state, pending: true };

    case DashboardActionTypes.GET_DASHBOARD_INTAKE_SUCCESS:
      return { ...state, intake: action.payload, pending: false };

    case DashboardActionTypes.GET_DASHBOARD_INTAKE_FAIL:
      return { ...state, pending: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_TASK:
      return { ...state, taskPending: true };

    case DashboardActionTypes.GET_DASHBOARD_TASK_SUCCESS:
      return { ...state, task: action.payload, taskPending: false };

    case DashboardActionTypes.GET_DASHBOARD_TASK_FAIL:
      return { ...state, taskPending: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT:
      return { ...state, pendingShift: true };

    case DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT_SUCCESS:
      return { ...state, employeeShift: action.payload, pendingShift: false };

    case DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT_FAIL:
      return { ...state, pendingShift: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_REFERRALS:
      return { ...state, pending: true };

    case DashboardActionTypes.GET_DASHBOARD_REFERRALS_SUCCESS:
      return { ...state, referrals: action.payload, pending: false };

    case DashboardActionTypes.GET_DASHBOARD_REFERRALS_FAIL:
      return { ...state, pending: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS:
      return { ...state, pending: true };

    case DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS_SUCCESS:
      return { ...state, employeeLeaveStatus: action.payload, pending: false };

    case DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS_FAIL:
      return { ...state, pending: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS:
      return { ...state, clientPending: true };

    case DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS_SUCCESS:
      return { ...state, clientSummary: action.payload, clientPending: false };

    case DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS_FAIL:
      return { ...state, clientPending: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS:
      return { ...state, incidentMetricPending: true };

    case DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS_SUCCESS:
      return { ...state, incidentMetric: action.payload, incidentMetricPending: false };

    case DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS_FAIL:
      return { ...state, incidentMetricPending: false, error: action.payload };

    case DashboardActionTypes.GET_DASHBOARD_SW_METRICS:
      return { ...state, SupportWorkerMetricPending: true };

    case DashboardActionTypes.GET_DASHBOARD_SW_METRICS_SUCCESS:
      return { ...state, SupportWorkerMetric: action.payload, SupportWorkerMetricPending: false };

    case DashboardActionTypes.GET_DASHBOARD_SW_METRICS_FAIL:
      return { ...state, SupportWorkerMetricPending: false, error: action.payload };

    default:
      return state;
  }
};

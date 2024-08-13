import { Action } from '@ngrx/store';

/* FOR Statistic
 */
export const enum DashboardActionTypes {
  GET_DASHBOARD_STATISTIC = '[Dashboard] Get Statistic',
  GET_DASHBOARD_STATISTIC_SUCCESS = '[Dashboard] Get Statistic Success',
  GET_DASHBOARD_STATISTIC_FAIL = '[Dashboard] Get Statistic Fail',

  GET_DASHBOARD_LEAVE_PERIOD = '[Dashboard] Get Leave Period',
  GET_DASHBOARD_LEAVE_PERIOD_SUCCESS = '[Dashboard] Get Leave Period Success',
  GET_DASHBOARD_LEAVE_PERIOD_FAIL = '[Dashboardd] Get Leave Period Fail',

  GET_DASHBOARD_INCIDENT = '[Dashboard] Get Incident',
  GET_DASHBOARD_INCIDENT_SUCCESS = '[Dashboard] Get Incident Success',
  GET_DASHBOARD_INCIDENT_FAIL = '[Dashboard] Get Incident Fail',

  GET_DASHBOARD_INCIDENT_METRICS = '[Dashboard] Get Incident Metrics',
  GET_DASHBOARD_INCIDENT_METRICS_SUCCESS = '[Dashboard] Get Incident Metrics Success',
  GET_DASHBOARD_INCIDENT_METRICS_FAIL = '[Dashboard] Get Incident Metrics Fail',

  GET_DASHBOARD_SW_METRICS = '[Dashboard] Get Support Worker Metrics',
  GET_DASHBOARD_SW_METRICS_SUCCESS = '[Dashboard] Get Support Worker Metrics Success',
  GET_DASHBOARD_SW_METRICS_FAIL = '[Dashboard] Get Support Worker Metrics Fail',

  GET_DASHBOARD_INTAKE = '[Dashboard] Get Intake',
  GET_DASHBOARD_INTAKE_SUCCESS = '[Dashboard] Get Intake Success',
  GET_DASHBOARD_INTAKE_FAIL = '[Dashboard] Get Intake Fail',

  GET_DASHBOARD_TASK = '[Dashboard] Get Task',
  GET_DASHBOARD_TASK_SUCCESS = '[Dashboard] Get Task Success',
  GET_DASHBOARD_TASK_FAIL = '[Dashboard] Get Task Fail',

  GET_DASHBOARD_EMPLOYEE_SHIFT = '[Dashboard] Get Employee Shift',
  GET_DASHBOARD_EMPLOYEE_SHIFT_SUCCESS = '[Dashboard] Get Employee Shift Success',
  GET_DASHBOARD_EMPLOYEE_SHIFT_FAIL = '[Dashboard] Get Employee Shift Fail',

  GET_DASHBOARD_REFERRALS = '[Dashboard] Get Referrals',
  GET_DASHBOARD_REFERRALS_SUCCESS = '[Dashboard] Get Referrals Success',
  GET_DASHBOARD_REFERRALS_FAIL = '[Dashboard] Get Referrals Fail',

  GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS = '[Dashboard] Get Employee Leave Status',
  GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS_SUCCESS = '[Dashboard] Get Employee Leave Status Success',
  GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS_FAIL = '[Dashboard] Get Employee Leave Status Fail',

  GET_DASHBOARD_CLIENT_SUMMARY_STATUS = '[Dashboard] Get Client Summary Status',
  GET_DASHBOARD_CLIENT_SUMMARY_STATUS_SUCCESS = '[Dashboard] Get Client Summary Status Success',
  GET_DASHBOARD_CLIENT_SUMMARY_STATUS_FAIL = '[Dashboard] Get Client Summary Status Fail',
}

export class GetStatistic implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_STATISTIC;
  constructor(public payload: any) {}
}

export class GetStatisticSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_STATISTIC_SUCCESS;
  constructor(public payload: any) {}
}

export class GetStatisticFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_STATISTIC_FAIL;
  constructor(public payload: any) {}
}

export class GetLeavePeriod implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD;
  constructor(public payload: any) {}
}

export class GetLeavePeriodSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD_SUCCESS;
  constructor(public payload: any) {}
}

export class GetLeavePeriodFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD_FAIL;
  constructor(public payload: any) {}
}

export class GetIncident implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INCIDENT;
  constructor(public payload: any) {}
}

export class GetIncidentSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INCIDENT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetIncidentFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INCIDENT_FAIL;
  constructor(public payload: any) {}
}

export class GetIncidentMetric implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS;
  constructor(public payload: any) {}
}

export class GetIncidentMetricSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetIncidentMetricFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS_FAIL;
  constructor(public payload: any) {}
}

export class GetSupportWorkerMetric implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_SW_METRICS;
  constructor(public payload: any) {}
}

export class GetSupportWorkerMetricSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_SW_METRICS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetSupportWorkerMetricFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_SW_METRICS_FAIL;
  constructor(public payload: any) {}
}

export class GetIntake implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INTAKE;
  constructor(public payload: any) {}
}

export class GetIntakeSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INTAKE_SUCCESS;
  constructor(public payload: any) {}
}

export class GetIntakeFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_INTAKE_FAIL;
  constructor(public payload: any) {}
}

export class GetTask implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_TASK;
  constructor(public payload: any) {}
}

export class GetTaskSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_TASK_SUCCESS;
  constructor(public payload: any) {}
}

export class GetTaskFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_TASK_FAIL;
  constructor(public payload: any) {}
}

export class GetEmployeeShift implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT;
  constructor(public payload: any) {}
}

export class GetEmployeeShiftSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetEmployeeShiftFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT_FAIL;
  constructor(public payload: any) {}
}

export class GetReferrals implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_REFERRALS;
  constructor(public payload: any) {}
}

export class GetReferralsSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_REFERRALS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetReferralsFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_REFERRALS_FAIL;
  constructor(public payload: any) {}
}

export class GetEmployeeLeaveStatus implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS;
  constructor(public payload: any) {}
}

export class GetEmployeeLeaveStatusSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetEmployeeLeaveStatusFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS_FAIL;
  constructor(public payload: any) {}
}

export class GetClientSummaryStatus implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS;
  constructor(public payload: any) {}
}

export class GetClientSummaryStatusSuccess implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetClientSummaryStatusFail implements Action {
  public readonly type = DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS_FAIL;
  constructor(public payload: any) {}
}

export type DashboardAction =
  | GetStatistic
  | GetStatisticSuccess
  | GetStatisticFail
  | GetLeavePeriod
  | GetLeavePeriodSuccess
  | GetLeavePeriodFail
  | GetIncident
  | GetIncidentSuccess
  | GetIncidentFail
  | GetIntake
  | GetIntakeSuccess
  | GetIntakeFail
  | GetTask
  | GetTaskSuccess
  | GetTaskFail
  | GetEmployeeShift
  | GetEmployeeShiftSuccess
  | GetEmployeeShiftFail
  | GetReferrals
  | GetReferralsSuccess
  | GetReferralsFail
  | GetEmployeeLeaveStatus
  | GetEmployeeLeaveStatusSuccess
  | GetEmployeeLeaveStatusFail
  | GetClientSummaryStatus
  | GetClientSummaryStatusSuccess
  | GetClientSummaryStatusFail
  | GetIncidentMetric
  | GetIncidentMetricSuccess
  | GetIncidentMetricFail
  | GetSupportWorkerMetric
  | GetSupportWorkerMetricSuccess
  | GetSupportWorkerMetricFail;

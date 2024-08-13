// THIS FILE IS FOR MAPPING REDUCER AND ACTION

import * as reducers from './reducers/admin-profile.reducer';
import * as adminClientReducers from './reducers/admin-clients.reducer';
import * as adminEmployeesReducers from './reducers/admin-employees.reducer';
import * as adminClientCareworker from './reducers/admin-client-careworker.reducer';
import * as adminEnums from './reducers/admin-enums.reducer';
import * as client from './reducers/admin-client.reducer';
import * as employee from './reducers/admin-employee.reducer'
import * as registerOrganization from './reducers/admin-register-organization.reducer'
import * as employeePosition from './reducers/admin-employee-position.reducer'
import * as expenseType from './reducers/admin-expense-type.reducer'
import * as cancellationPolicy from './reducers/admin-cancellation-policy.reducers'
import * as interest from './reducers/admin-interest.reducer'
import * as priceList from './reducers/admin-pirce-list.reducer'
import * as branch from './reducers/admin-branch.reducer'
import * as organization from './reducers/admin-organization.reducer'
import * as language from './reducers/admin-language.reducer'
import * as qualification from './reducers/admin-qualification.reducer'
import * as fundingSource from './reducers/admin-funding-source.reducer'
import * as payRate from './reducers/admin-pay-rate.reducer'
import * as formTemplate from './reducers/admin-form-template.reducer'
import * as goalTemplate from './reducers/admin-goal-template.reducer'
import * as publicHoliday from './reducers/admin-public-holiday.reducer'
import * as serviceType from './reducers/admin-service-type.reducer'
import * as clientChecklist from './reducers/admin-client-checklist.reducer'
import * as employeeTask from './reducers/admin-employee-task.reducer'
import * as employeeShift from './reducers/admin-employee-shift.reducer'
import * as employeeTimesheet from './reducers/admin-employee-timesheet.reducer'
import * as clientServiceSchdule from './reducers/admin-client-service-schedule.reducer'
import * as incident from './reducers/admin-incident.reducer'
import * as employeeLeave from './reducers/admin-employee-leave.reducer'
import * as clientFunding from './reducers/admin-client-funding.reducer'
import * as employeeCertificate from './reducers/admin-employee-certificate.reducer'
import * as scheduleBoard from './reducers/admin-schedule-board.reducer'
import * as employeeDoc from './reducers/admin-employee-doc.reducer'
import * as clientDoc from './reducers/admin-client-doc.reducer'
import * as emergencyNumber from './reducers/admin-emergency-number.reducer'
import * as dashboard from './reducers/admin-dashboard.reducer'
import * as referral from './reducers/admin-referral.reducer'
import * as clientGroup from './reducers/admin-client-group.reducer'
import * as invoice from './reducers/admin-invoice.reducers'
import * as timesheetApproval from './reducers/admin-timesheet-approval.reducer'
import * as invoiceBatch from './reducers/admin-invoice-batch.reducer'
import * as fundingClaim from './reducers/admin-funding-claim.reducer'
import * as clientInvoice from './reducers/admin-client-invoice.reducer'
import * as notification from './reducers/admin-notification.reducer'
import * as employeePayRate from './reducers/admin-employee-pay-rate.reducer'
import * as employeePayRateLoading from './reducers/admin-employee-pay-rate-loading.reducer';
import * as xeroSync from './reducers/admin-xero.reducer';

import * as gender from './reducers/admin-gender.reducer';
import * as skills from './reducers/admin-skills.reducer';
import * as hobbies from './reducers/admin-hobbies.reducer';
import * as jobtypes from './reducers/admin-job-types.reducer';

import * as communicationGroup from './reducers/admin-bulk-communication-group.reducer';
import * as communicationTemplate from './reducers/admin-communication-template.reducer';
import * as employeeBulkEmail from './reducers/admin-employee-bulk-email.reducer';
import * as employeeBulkSMS from './reducers/admin-employee-bulk-sms.reducer';
import * as externalProvider from './reducers/admin-external-provider.reducer'
import * as sendPasswordReset from './reducers/admin-send-password-reset.reducer'
import { ActionReducerMap } from '@ngrx/store';
import { EmployeeTimesheet } from '../pages/employees/employee-timesheet/utils/employee-timesheet-model-interface';

// generate app state interface
export interface AdminProfileState {
	// set initial state of admin profile
	adminProfile: reducers.AdminProfileState, 
  clientList: adminClientReducers.ClientListState,
  employeeList: adminEmployeesReducers.EmployeeListState,
  adminEnums: adminEnums.AdminEnumsState,
  client: client.ClientState,
  clientCareworker: adminClientCareworker.ClientCareworkerState,
  employee: employee.EmployeeState,
  registerOrganization: registerOrganization.RegisterOrganizationState,
  employeePosition: employeePosition.EmployeePositionState,
  expenseType: expenseType.ExpenseTypeState,
  cancellationPolicy: cancellationPolicy.CancellationPolicyState,
  interest: interest.InterestState,
  priceList: priceList.PriceListState,
  branch: branch.BranchState
  organization: organization.OrganizationState,
  language: language.LanguageState,
  qualification: qualification.QualificationState
  fundingSource: fundingSource.FundingSourceState,
  payRate: payRate.PayRateState,
  formTemplate: formTemplate.FormTemplateState,
  goalTemplate: goalTemplate.GoalTemplateState,
  publicHoliday: publicHoliday.PublicHolidayState,
  serviceType: serviceType.ServiceTypeState,
  clientChecklist: clientChecklist.ClientChecklistState,
  employeeTask: employeeTask.EmployeeTaskState,
  employeeShift: employeeShift.EmployeeShiftState,
  employeeTimesheet: employeeTimesheet.EmployeeTimesheetState,
  clientServiceSchdule: clientServiceSchdule.ClientServiceScheduleState,
  incident: incident.IncidentState,
  employeeLeave: employeeLeave.EmployeeLeaveState,
  clientFunding: clientFunding.ClientFundingState,
  employeeCertificate: employeeCertificate.EmployeeCertificateState,
  scheduleBoard: scheduleBoard.ScheduleBoardState,
  clientDoc: clientDoc.ClientDocState,
  employeeDoc: employeeDoc.EmployeeDocState,
  emergencyNumber: emergencyNumber.EmergencyNumberState
  dashboard: dashboard.DashboardState,
  referral: referral.ReferralState,
  clientGroup: clientGroup.ClientGroupState,
  invoice: invoice.InvoiceState
  timesheetApproval: timesheetApproval.TimesheetApprovalState,
  invoiceBatch: invoiceBatch.InvoiceBatchState,
  fundingClaim: fundingClaim.FundingClaimState,
  clientInvoice: clientInvoice.ClientInvoiceState,
  notification: notification.NotificationState,
  employeePayRate: employeePayRate.EmployeePayRateState
  employeePayRateLoading: employeePayRateLoading.EmployeePayRateLoadingState,
  syncToXero: xeroSync.SyncToXeroState
  communicationGroup: communicationGroup.CommunicationGroupState,  
  communicationTemplate: communicationTemplate.CommunicationTemplateState,  
  employeeBulkEmail: employeeBulkEmail.EmployeeBulkEmailState,
  employeeBulkSMS: employeeBulkSMS.EmployeeBulkSMSState,
  externalProvider: externalProvider.ExternalProviderState,
  sendPasswordReset:sendPasswordReset.SendPasswordResetState
};

// set initial state
export const INITIAL_STATE: AdminProfileState = {
	adminProfile: reducers.ADMIN_PROFILE_INITIAL_STATE,
  clientList: adminClientReducers.CLIENT_LIST_INITIAL_STATE,
  employeeList: adminEmployeesReducers.EMPLOYEE_LIST_INITIAL_STATE,
  adminEnums: adminEnums.ADMIN_ENUMS_INITIAL_STATE,
  client: client.CLIENT_INITIAL_STATE,
  clientCareworker: adminClientCareworker.CLIENT_CAREWORKER_INITIAL_STATE,
  employee: employee.EMPLOYEE_INITIAL_STATE,
  registerOrganization: registerOrganization.REGISTER_ORGANIZATION_INITIAL_STATE,
  employeePosition: employeePosition.EMPLOYEE_POSITION_INITIAL_STATE,
  expenseType: expenseType.EXPENSE_TYPE_INITIAL_STATE,
  cancellationPolicy: cancellationPolicy.CANCELLATION_POLICY_INITIAL_STATE,
  interest: interest.INTEREST_INITIAL_STATE,
  priceList: priceList.PRICE_LIST_INITIAL_STATE,
  branch: branch.BRANCH_INITIAL_STATE,
  organization: organization.ORGANIZATION_INITIAL_STATE,
  language: language.LANGUAGE_INITIAL_STATE,
  qualification: qualification.QUALIFICATION_INITIAL_STATE,
  fundingSource: fundingSource.FUNDING_SOURCE_INITIAL_STATE,
  payRate: payRate.PAY_RATE_INITIAL_STATE,
  formTemplate: formTemplate.FORM_TEMPLATE_INITIAL_STATE,
  goalTemplate: goalTemplate.GOAL_TEMPLATE_INITIAL_STATE,
  publicHoliday: publicHoliday.PUBLIC_HOLIDAY_INITIAL_STATE,
  serviceType: serviceType.SERVICE_TYPE_INITIAL_STATE,
  clientChecklist: clientChecklist.CLIENT_CHECKLIST_INITIAL_STATE,
  employeeTask: employeeTask.EMPLOYEE_TASK_INITIAL_STATE,
  employeeShift: employeeShift.EMPLOYEE_SHIFT_INITIAL_STATE,
  employeeTimesheet: employeeTimesheet.EMPLOYEE_TIMESHEET_INITIAL_STATE,
  clientServiceSchdule: clientServiceSchdule.CLIENT_SERVICE_SCHEDULE_INITIAL_STATE,
  incident: incident.INCIDENT_INITIAL_STATE,
  employeeLeave: employeeLeave.EMPLOYEE_LEAVE_INITIAL_STATE,
  clientFunding: clientFunding.CLIENT_FUNDING_INITIAL_STATE,
  employeeCertificate: employeeCertificate.EMPLOYEE_CERTIFICATE_INITIAL_STATE,
  scheduleBoard: scheduleBoard.SCHEDULE_BOARD_INITIAL_STATE,
  employeeDoc: employeeDoc.EMPLOYEE_DOC_INITIAL_STATE,
  clientDoc: clientDoc.CLIENT_DOC_INITIAL_STATE,
  emergencyNumber: emergencyNumber.EMERGENCY_NUMBER_INITIAL_STATE,
  dashboard: dashboard.DASHBOARD_INITIAL_STATE,
  referral: referral.REFERRAL_INITIAL_STATE,
  clientGroup: clientGroup.CLIENT_GROUP_INITIAL_STATE,
  invoice: invoice.INVOICE_INITIAL_STATE,
  timesheetApproval: timesheetApproval.TIMESHEET_APPROVAL_INITIAL_STATE,
  fundingClaim: fundingClaim.FUNDING_CLAIM_INITIAL_STATE,
  invoiceBatch: invoiceBatch.INVOICE_BATCH_INITIAL_STATE,
  clientInvoice: clientInvoice.CLIENT_INVOICE_INITIAL_STATE,
  notification: notification.NOTIFICATION_INITIAL_STATE,
  employeePayRate: employeePayRate.EMPLOYEE_PAY_RATE_INITIAL_STATE,
  employeePayRateLoading: employeePayRateLoading.EMPLOYEE_PAY_RATE_LOADING_INITIAL_STATE,
  syncToXero: xeroSync.SYNC_TO_XERO_INITIAL_STATE,
  communicationGroup: communicationGroup.COMMUNICATION_GROUP_INITIAL_STATE,
  communicationTemplate: communicationTemplate.COMMUNICATION_TEMPLATE_INITIAL_STATE,
  employeeBulkEmail: employeeBulkEmail.EMPLOYEE_BULK_EMAIL_NOTIFICATION_INITIAL_STATE,
  employeeBulkSMS: employeeBulkSMS.EMPLOYEE_BULK_SMS_NOTIFICATION_INITIAL_STATE,
  externalProvider: externalProvider.EXTERNAL_PROVIDER_INITIAL_STATE,
  sendPasswordReset:sendPasswordReset.SEND_PASSWORD_RESET_INITIAL_STATE
}

// create action reducer map
// add appstate type any
/*export const appReducer: ActionReducerMap<AdminProfileState, any> = {
	adminProfile: reducers.AdminProfileReducer,
  clientList: adminClientReducers.ClientListReducer
};
*/

// Clear state
export function clearState(reducer: any) {
  return function(state: any, action: any) {
    // if (action.type === AuthActionTypes.LOGOUT) {
    //   state = INITIAL_STATE;
    // }

    return reducer(state, action);
  };
}

export const routerStateConfig = {
  stateKey: 'router', // state-slice name for routing state
};
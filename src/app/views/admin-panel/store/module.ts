import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// import services or api files here as well
import { AdminProfileEffect } from './effects/admin-profile.effect';
import { AdminProfileReducer } from './reducers/admin-profile.reducer';

import { ClientListEffect } from './effects/admin-clients.effect';
import { ClientListReducer } from './reducers/admin-clients.reducer';

import { EmployeeListEffect } from './effects/admin-employees.effect';
import { EmployeeListReducer } from './reducers/admin-employees.reducer';

import { AdminEnumsEffect } from './effects/admin-enums.effects';
import { AdminEnumsReducer } from './reducers/admin-enums.reducer';

import { ClientReducer } from './reducers/admin-client.reducer';
import { ClientEffect } from './effects/admin-client.effect';

import { EmployeeReducer } from './reducers/admin-employee.reducer';
import { EmployeeEffect } from './effects/admin-employee.effect';

import { RegisterOrganizationReducer } from './reducers/admin-register-organization.reducer';
import { RegisterOrganizationEffect } from './effects/admin-register-organization.effect';
import { EmployeePositionReducer } from './reducers/admin-employee-position.reducer';
import { EmployeePositionEffect } from './effects/admin-employee-position.effect';
import { ExpenseTypeReducer } from './reducers/admin-expense-type.reducer';
import { ExpenseTypeEffect } from './effects/admin-expense-type.effect';
import { CancellationPolicyReducer } from './reducers/admin-cancellation-policy.reducers';
import { CancellationPolicyEffect } from './effects/admin-cancellation-policy.effect';
import { InterestReducer } from './reducers/admin-interest.reducer';
import { PriceListReducer } from './reducers/admin-pirce-list.reducer';
import { InterestEffect } from './effects/admin-interest.effects';
import { PriceListEffect } from './effects/admin-price-list.effect';
import { BranchReducer } from './reducers/admin-branch.reducer';
import { BranchEffect } from './effects/admin-branch.effect';
import { OrganizationReducer } from './reducers/admin-organization.reducer';
import { OrganizationEffect } from './effects/admin-organization.effect';
import { LanguageReducer } from './reducers/admin-language.reducer';
import { QualificationReducer } from './reducers/admin-qualification.reducer';
import { LanguageEffect } from './effects/admin-language.effect';
import { QualificationEffect } from './effects/admin-qualification.effect';
import { FundingSourceReducer } from './reducers/admin-funding-source.reducer';
import { FundingSourceEffect } from './effects/admin-funding-source.effect';
import { PayRateReducer } from './reducers/admin-pay-rate.reducer';
import { PayRateEffect } from './effects/admin-pay-rate.effect';
import { FormTemplateReducer } from './reducers/admin-form-template.reducer';
import { GoalTemplateReducer } from './reducers/admin-goal-template.reducer';
import { FormTemplateEffect } from './effects/admin-form-template.effect';
import { GoalTemplateEffect } from './effects/admin-goal-template.effect';
import { PublicHolidayReducer } from './reducers/admin-public-holiday.reducer';
import { PublicHolidayEffect } from './effects/admin-public-holiday.effect';
import { ServiceTypeReducer } from './reducers/admin-service-type.reducer';
import { ServiceTypeEffect } from './effects/admin-service-type.effect';
import { ClientChecklistReducer } from './reducers/admin-client-checklist.reducer';
import { ClientChecklistEffect } from './effects/admin-client-checklist.effect';
import { EmployeeTaskReducer } from './reducers/admin-employee-task.reducer';
import { EmployeeTaskEffect } from './effects/admin-employee-task.effect';
import { EmployeeShiftReducer } from './reducers/admin-employee-shift.reducer';
import { EmployeeShiftEffect } from './effects/admin-employee-shift.effect';
import { EmployeeTimesheetReducer } from './reducers/admin-employee-timesheet.reducer';
import { EmployeeTimesheetEffect } from './effects/admin-employee-timesheet.effect';
import { ClientServiceScheduleReducer } from './reducers/admin-client-service-schedule.reducer';
import { ClientServiceScheduleEffect } from './effects/admin-client-service-schedule.effect';
import { IncidentReducer } from './reducers/admin-incident.reducer';
import { IncidentEffect } from './effects/admin-incident.effect';
import { EmployeeLeaveReducer } from './reducers/admin-employee-leave.reducer';
import { EmployeeLeaveEffect } from './effects/admin-employee-leave.effect';
import { ClientFundingReducer } from './reducers/admin-client-funding.reducer';
import { ClientFundingEffect } from './effects/admin-client-funding.effect';

import { ClientCareworkerEffect } from './effects/admin-client-careworker.effect';
import { ClientCareworkerReducer } from './reducers/admin-client-careworker.reducer';
import { EmployeeCertificateReducer } from './reducers/admin-employee-certificate.reducer';
import { EmployeeCertificateEffect } from './effects/admin-employee-certificate.effect';
import { ScheduleBoardReducer } from './reducers/admin-schedule-board.reducer';
import { ScheduleBoardEffect } from './effects/admin-schedule-board.effect';
import { EmployeeDocReducer } from './reducers/admin-employee-doc.reducer';
import { ClientDocReducer } from './reducers/admin-client-doc.reducer';
import { EmployeeDocEffect } from './effects/admin-employee-doc.effect';
import { ClientDocEffect } from './effects/admin-client-doc.effect';
import { EmergencyNumberReducer } from './reducers/admin-emergency-number.reducer';
import { EmergencyNumberEffect } from './effects/admin-emergency-number';
import { DashboardReducer } from './reducers/admin-dashboard.reducer';
import { DashboardEffect } from './effects/admin-dashboard-effect';
import { ReferralReducer } from './reducers/admin-referral.reducer';
import { ReferralEffect } from './effects/admin-referral.effect';
import { ClientGroupReducer } from './reducers/admin-client-group.reducer';
import { ClientGroupEffect } from './effects/admin-client-group.effect';
import { InvoiceEffect } from './effects/admin-invoice.effect';
import { InvoiceReducer } from './reducers/admin-invoice.reducers';
import { TimesheetApprovalReducer } from './reducers/admin-timesheet-approval.reducer';
import { TimesheetApprovalEffect } from './effects/admin-timesheet-approval.effect';
import { InvoiceBatchReducer } from './reducers/admin-invoice-batch.reducer';
import { FundingClaimReducer } from './reducers/admin-funding-claim.reducer';
import { InvoiceBatchEffect } from './effects/admin-invoice-batch.effect';
import { FundingClaimEffect } from './effects/admin-funding-claim.effect';
import { ClientInvoiceReducer } from './reducers/admin-client-invoice.reducer';
import { ClientInvoiceEffect } from './effects/admin-client-invoice.effect';
import { NotificationReducer } from './reducers/admin-notification.reducer';
import { NotificationEffect } from './effects/admin-notification.effect';
import { EmployeePayRateReducer } from './reducers/admin-employee-pay-rate.reducer';
import { EmployeePayRateEffect } from './effects/admin-employee-pay-rate.effect';
import { EmployeePayRateLoadingReducer } from './reducers/admin-employee-pay-rate-loading.reducer';
import { EmployeePayRateLoadingEffect } from './effects/admin-employee-pay-rate-loading.effect';
import { CommunicationGroupReducer } from './reducers/admin-bulk-communication-group.reducer';
import { CommunicationGroupEffect } from './effects/admin-bulk-communication-group.effect';
import { CommunicationTemplateReducer } from './reducers/admin-communication-template.reducer';
import { CommunicationTemplateEffect } from './effects/admin-communication-template.effect';
import { EmployeeBulkEmailReducer } from './reducers/admin-employee-bulk-email.reducer';
import { EmployeeBulkEmailEffect } from './effects/admin-employee-bulk-email.efffect';

import { EmployeeBulkSMSReducer } from './reducers/admin-employee-bulk-sms.reducer';
import { EmployeeBulkSMSEffect } from './effects/admin-employee-bulk-sms.effect';


import { SyncToXeroReducer } from './reducers/admin-xero.reducer';  
import { SyncToXeroEffect } from './effects/admin-xero.effect';

import { ExternalProviderReducer } from './reducers/admin-external-provider.reducer'
import { ExternalProviderEffect } from './effects/admin-external-provider.effect'
import { SendPasswordResetEffect } from './effects/admin-send-password-reset.effect';
import { SendPasswordResetReducer } from './reducers/admin-send-password-reset.reducer';

@NgModule({
    imports: [
        StoreModule.forFeature('admin', AdminProfileReducer), // admin profile
        StoreModule.forFeature('clients', ClientListReducer), // admin client list table
        StoreModule.forFeature('employees', EmployeeListReducer), // admin employee list table
        StoreModule.forFeature('adminEnums', AdminEnumsReducer), // admin client create/edit enums
        StoreModule.forFeature('client', ClientReducer), // client manager client list
        StoreModule.forFeature('clientCareworker', ClientCareworkerReducer),
        StoreModule.forFeature('employee', EmployeeReducer),
        StoreModule.forFeature('registerOrganization', RegisterOrganizationReducer),
        StoreModule.forFeature('employeePosition', EmployeePositionReducer),
        StoreModule.forFeature('expenseType', ExpenseTypeReducer),
        StoreModule.forFeature('cancellationPolicy', CancellationPolicyReducer),
        StoreModule.forFeature('interest', InterestReducer),
        StoreModule.forFeature('priceList', PriceListReducer),
        StoreModule.forFeature('branch', BranchReducer),
        StoreModule.forFeature('organization', OrganizationReducer),
        StoreModule.forFeature('language', LanguageReducer),
        StoreModule.forFeature('qualification', QualificationReducer),
        StoreModule.forFeature('fundingSource', FundingSourceReducer),
        StoreModule.forFeature('payRate', PayRateReducer),
        StoreModule.forFeature('formTemplate', FormTemplateReducer),
        StoreModule.forFeature('goalTemplate', GoalTemplateReducer),
        StoreModule.forFeature('publicHoliday', PublicHolidayReducer),
        StoreModule.forFeature('serviceType', ServiceTypeReducer),
        StoreModule.forFeature('clientChecklist', ClientChecklistReducer),
        StoreModule.forFeature('employeeTask', EmployeeTaskReducer),
        StoreModule.forFeature('employeeShift', EmployeeShiftReducer),
        StoreModule.forFeature('employeeTimesheet', EmployeeTimesheetReducer),
        StoreModule.forFeature('clientServiceSchdule', ClientServiceScheduleReducer),
        StoreModule.forFeature('incident', IncidentReducer),
        StoreModule.forFeature('employeeLeave', EmployeeLeaveReducer),
        StoreModule.forFeature('employeeShift', EmployeeShiftReducer),
        StoreModule.forFeature('clientFunding', ClientFundingReducer),
        StoreModule.forFeature('employeeCertificate', EmployeeCertificateReducer),
        StoreModule.forFeature('scheduleBoard', ScheduleBoardReducer),
        StoreModule.forFeature('employeeDoc', EmployeeDocReducer),
        StoreModule.forFeature('clientDoc', ClientDocReducer),
        StoreModule.forFeature('emergencyNumber', EmergencyNumberReducer),
        StoreModule.forFeature('dashboard', DashboardReducer),
        StoreModule.forFeature('referral', ReferralReducer),
        StoreModule.forFeature('clientGroup', ClientGroupReducer),
        StoreModule.forFeature('invoice', InvoiceReducer),
        StoreModule.forFeature('timesheetApproval', TimesheetApprovalReducer),
        StoreModule.forFeature('invoiceBatch', InvoiceBatchReducer),
        StoreModule.forFeature('fundingClaim', FundingClaimReducer),
        StoreModule.forFeature('clientInvoice', ClientInvoiceReducer),
        StoreModule.forFeature('notification', NotificationReducer),
        StoreModule.forFeature('employeePayRate', EmployeePayRateReducer),
        StoreModule.forFeature('employeePayRateLoading', EmployeePayRateLoadingReducer),
        StoreModule.forFeature('syncToXero', SyncToXeroReducer),
        StoreModule.forFeature('communicationGroup', CommunicationGroupReducer),
        StoreModule.forFeature('communicationTemplate', CommunicationTemplateReducer),
        StoreModule.forFeature('employeeBulkEmail', EmployeeBulkEmailReducer),
        StoreModule.forFeature('employeeBulkSMS', EmployeeBulkSMSReducer),
        StoreModule.forFeature('externalProvider', ExternalProviderReducer),
        StoreModule.forFeature('sendPasswordReset', SendPasswordResetReducer),
        
        EffectsModule.forFeature([
            AdminProfileEffect,
            ClientListEffect,
            EmployeeListEffect,
            AdminEnumsEffect,
            ClientEffect,
            EmployeeEffect,
            RegisterOrganizationEffect,
            EmployeePositionEffect,
            ExpenseTypeEffect,
            CancellationPolicyEffect,
            InterestEffect,
            PriceListEffect,
            BranchEffect,
            OrganizationEffect,
            LanguageEffect,
            QualificationEffect,
            FundingSourceEffect,
            PayRateEffect,
            FormTemplateEffect,
            GoalTemplateEffect,
            PublicHolidayEffect,
            ServiceTypeEffect,
            ClientChecklistEffect,
            EmployeeTaskEffect,
            ClientServiceScheduleEffect,
            IncidentEffect,
            EmployeeLeaveEffect,
            EmployeeShiftEffect,
            EmployeeTimesheetEffect,
            ClientFundingEffect,
            ClientCareworkerEffect,
            EmployeeCertificateEffect,
            ScheduleBoardEffect,
            EmployeeDocEffect,
            ClientDocEffect,
            EmergencyNumberEffect,
            DashboardEffect,
            ReferralEffect,
            ClientGroupEffect,
            InvoiceEffect,
            TimesheetApprovalEffect,
            InvoiceBatchEffect,
            FundingClaimEffect,
            ClientInvoiceEffect,
            NotificationEffect,
            EmployeePayRateEffect,
            EmployeePayRateLoadingEffect,
            SyncToXeroEffect,
            CommunicationGroupEffect,
            CommunicationTemplateEffect,
            EmployeeBulkEmailEffect,
            EmployeeBulkSMSEffect,
            ExternalProviderEffect,
            SendPasswordResetEffect
        ])
    ],
    providers: [
        // services/injectables
    ]
})

export class AdminProfilePublicModule {
    public static forRoot(): ModuleWithProviders<AdminProfilePublicModule> {
        return {
            ngModule: AdminProfilePublicModule,
            providers: [
                //services/injectables
            ]
        }
    }
}